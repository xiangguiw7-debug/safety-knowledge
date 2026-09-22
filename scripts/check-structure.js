// 结构完整性检查：HTML 标签平衡 + 知识卡/导航一致性
// 用法：node scripts/check-structure.js
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const EXCLUDE = new Set(["backup", ".git", "node_modules"]);
let bad = 0;
function fail(msg) { console.log("FAIL: " + msg); bad++; }

// ---- 1) HTML 标签平衡 ----
const htmlFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!EXCLUDE.has(e.name)) walk(full); }
    else if (e.name.endsWith(".html")) htmlFiles.push(full);
  }
}
walk(ROOT);
for (const f of htmlFiles) {
  const c = fs.readFileSync(f, "utf8");
  for (const tag of ["section", "div", "a", "p", "table", "ul", "tr", "td", "h1", "h2", "h3"]) {
    const open = (c.match(new RegExp("<" + tag + "\\b", "g")) || []).length;
    const close = (c.match(new RegExp("<\\/" + tag + ">", "g")) || []).length;
    if (open !== close) fail(path.relative(ROOT, f) + " <" + tag + "> 不平衡: " + open + " vs " + close);
  }
  const heads = (c.match(/<head>/g) || []).length, headEnds = (c.match(/<\/head>/g) || []).length;
  if (heads !== 1 || headEnds !== 1) fail(path.relative(ROOT, f) + " <head> 结构异常");
}

// ---- 2) 知识卡一致性：knowledge.html 卡片 == KNOWLEDGE_DETAILS 键 == 顺序数组 ----
try {
  const kh = fs.readFileSync(path.join(ROOT, "pages", "knowledge.html"), "utf8");
  const kd = fs.readFileSync(path.join(ROOT, "assets", "js", "knowledge-detail-data.js"), "utf8");
  const km = fs.readFileSync(path.join(ROOT, "assets", "js", "knowledge-meta.js"), "utf8");
  const cardsInHtml = [...kh.matchAll(/<section class="card" id="([^"]+)" data-hazard="([^"]+)">/g)].map(x => x[1]);
  const cardsInHtmlSet = new Set(cardsInHtml);
  const detailKeys = [...new Set([...kd.matchAll(/(?:^|[\s,{])"?([a-z0-9\-]+)"?\s*:\s*\{/g)].map(x => x[1]))];
  const ko = [...kd.match(/var KNOWLEDGE_ORDER = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
  const ro = [...km.match(/var RECOMMENDED_ORDER = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
  const validHazards = new Set(["framework","shock","energy","fire","thermal","mechanical","radiation","chemical","emc","medical","cert","general"]);
  for (const m of kh.matchAll(/<section class="card" id="([^"]+)" data-hazard="([^"]+)">/g)) {
    if (!validHazards.has(m[2])) fail("knowledge.html 卡片 " + m[1] + " 的 data-hazard 非法: " + m[2]);
  }
  for (const id of cardsInHtml) if (!detailKeys.includes(id)) fail("knowledge.html 卡片 " + id + " 未在 KNOWLEDGE_DETAILS 登记");
  for (const id of detailKeys) if (!cardsInHtmlSet.has(id)) fail("KNOWLEDGE_DETAILS 键 " + id + " 在 knowledge.html 无对应卡片");
  if (JSON.stringify(ko) !== JSON.stringify(ro)) fail("KNOWLEDGE_ORDER 与 RECOMMENDED_ORDER 不一致");
  if (ko.length !== cardsInHtml.length || ko.some((id, i) => id !== cardsInHtml[i])) fail("KNOWLEDGE_ORDER 与 knowledge.html 卡片顺序不一致");
  console.log("知识卡一致性: " + cardsInHtml.length + " 张卡，顺序与数据一致");
} catch (e) {
  fail("知识卡审计异常: " + e.message);
}


// ---- 3) 版本一致性：页脚版本（中英文两种写法）== sw.js CACHE_NAME == 脚本版本参数 == 更新日志最新条目 ==
//        并检查「内容核对 YYYY-MM」与更新日志日期对得上，避免出现「版本升了、日期没动」的错位
try {
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  const cacheV = (sw.match(/safety-reliability-v(\d+\.\d+\.\d+)/) || [])[1];
  const VERSIONED = "main|search|voltage|certification|calculator-v3|calculator-extra|pollution-degree";

  // 3.1 页脚版本：中文「版本 vX.Y.Z」+ 英文「· vX.Y.Z ·」，全站必须同一个版本
  const footerVs = new Set();
  const badPages = [];
  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, "utf8");
    const vs = [];
    const m1 = c.match(/版本 v(\d+\.\d+\.\d+)/);
    if (m1) vs.push(m1[1]);
    for (const m of c.matchAll(/· v(\d+\.\d+\.\d+) ·/g)) vs.push(m[1]);
    vs.forEach(v => footerVs.add(v));
    if (vs.some(v => v !== cacheV)) badPages.push(path.relative(ROOT, f) + "(v" + vs.join("/v") + ")");
  }

  // 3.2 资源版本参数：HTML 里「所有」本地 css/js 引用 与 sw.js CORE_ASSETS 都必须写当前版本。
  //     漏掉任何一处，那个文件就会被浏览器 HTTP 缓存 / SW 缓存留着，出现「HTML 是新的、样式脚本是旧的」。
  const badScripts = [];
  const ASSET_HTML = /(?:href|src)="((?:\.\.\/|\.\/)?assets\/[^"?#]+\.(?:css|js))(\?v=(\d+\.\d+\.\d+))?"/g;
  const ASSET_SW = /"\.\/(assets\/[^"?#]+\.(?:css|js))(\?v=(\d+\.\d+\.\d+))?"/g;
  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, "utf8");
    for (const m of c.matchAll(ASSET_HTML)) {
      if (!m[2]) badScripts.push(path.relative(ROOT, f) + " → " + m[1] + " 缺 ?v=");
      else if (m[3] !== cacheV) badScripts.push(path.relative(ROOT, f) + " → " + m[1] + "?v=" + m[3]);
    }
  }
  for (const m of sw.matchAll(ASSET_SW)) {
    if (!m[2]) badScripts.push("sw.js CORE_ASSETS → " + m[1] + " 缺 ?v=");
    else if (m[3] !== cacheV) badScripts.push("sw.js CORE_ASSETS → " + m[1] + "?v=" + m[3]);
  }
  // HTML 里带到 ?v= 的资源，必须也在 sw.js 预缓存清单里（否则离线首次打开取不到它）
  const swAssets = new Set([...sw.matchAll(ASSET_SW)].map(m => m[1]));
  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, "utf8");
    const dir = path.posix.dirname(path.relative(ROOT, f).replace(/\\/g, "/"));
    for (const m of c.matchAll(ASSET_HTML)) {
      const p = path.posix.normalize(path.posix.join(dir, m[1]));
      if (!swAssets.has(p)) badScripts.push(path.relative(ROOT, f) + " → " + p + " 未进 sw.js 预缓存清单");
    }
  }

  // 3.3 更新日志：最新条目版本要等于当前版本、要有日期，日期不得倒挂，且月份与页脚「内容核对」一致
  const ch = fs.readFileSync(path.join(ROOT, "pages", "changelog.html"), "utf8");
  const entries = [...ch.matchAll(/<h2>v(\d+\.\d+\.\d+)(?:（([^）]*)）)?<\/h2>/g)]
    .map(m => ({ v: m[1], raw: m[2] || "", date: (m[2] || "").match(/(\d{4}-\d{2}-\d{2})/)?.[1] || null }));
  const chProblems = [];
  if (!entries.length) chProblems.push("changelog 未解析到版本条目");
  else {
    if (entries[0].v !== cacheV) chProblems.push("最新条目 v" + entries[0].v + " ≠ 当前版本 v" + cacheV);
    if (!entries[0].date) chProblems.push("最新条目 v" + entries[0].v + " 缺日期（应写 v" + cacheV + "（YYYY-MM-DD ...））");
    entries.forEach((e, i) => {
      if (i < entries.length - 1 && !e.date) chProblems.push("v" + e.v + " 缺日期");
    });
    const dated = entries.filter(e => e.date);
    for (let i = 1; i < dated.length; i++) {
      if (dated[i].date > dated[i - 1].date) chProblems.push("日期倒挂: v" + dated[i - 1].v + " " + dated[i - 1].date + " < v" + dated[i].v + " " + dated[i].date);
    }
  }
  if (!/更新日志：v\d+\.\d+\.\d+/.test(ch)) chProblems.push("changelog meta description 缺版本号");
  else {
    const mv = ch.match(/更新日志：v(\d+\.\d+\.\d+)/)[1];
    if (mv !== cacheV) chProblems.push("changelog meta description 版本 v" + mv + " ≠ v" + cacheV);
  }

  // 3.4 页脚「内容核对 YYYY-MM」= 更新日志最新条目所在月份
  const months = new Set();
  const monthProblems2 = [];
  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, "utf8");
    const m = c.match(/内容核对 (\d{4}-\d{2})/);
    if (m) months.add(m[1]);
    // head 里的 site-version 标记（前端“是不是旧版本”探针用它比对）
    if (/assets\/js\/main\.js/.test(c)) {
      const sv = c.match(/<meta name="site-version" content="([^"]*)">/);
      if (!sv) monthProblems2.push(path.relative(ROOT, f) + " 缺 <meta name=\"site-version\">");
      else if (sv[1] !== cacheV) monthProblems2.push(path.relative(ROOT, f) + " site-version=" + sv[1]);
    }
  }
  const newestMonth = entries[0] && entries[0].date ? entries[0].date.slice(0, 7) : null;
  const monthProblems = [].concat(monthProblems2);
  if (months.size > 1) monthProblems.push("页脚核对月份不统一: " + JSON.stringify([...months]));
  if (newestMonth && [...months][0] !== newestMonth) monthProblems.push("页脚核对 " + [...months][0] + " ≠ 最新条目月份 " + newestMonth);
  const ss = fs.readFileSync(path.join(ROOT, "assets", "js", "standard-status.js"), "utf8");
  const ssM = ss.match(/核对 (\d{4}-\d{2})/);
  if (ssM && newestMonth && ssM[1] !== newestMonth) monthProblems.push("standard-status.js 核对 " + ssM[1] + " ≠ " + newestMonth);

  // 3.5 version.json（版本探针）必须与当前版本、核对月份一致
  try {
    const vj = JSON.parse(fs.readFileSync(path.join(ROOT, "version.json"), "utf8"));
    if (vj.version !== cacheV) monthProblems.push("version.json version " + vj.version + " ≠ v" + cacheV);
    if (newestMonth && vj.month && vj.month !== newestMonth) monthProblems.push("version.json month " + vj.month + " ≠ " + newestMonth);
  } catch (e) { monthProblems.push("version.json 缺失或不是合法 JSON: " + e.message); }

  const problems = [].concat(badPages, badScripts, chProblems, monthProblems);
  if (problems.length) fail("版本 / 日期 / 缓存参数不一致：" + problems.slice(0, 12).join("; ") + (problems.length > 12 ? " …(共 " + problems.length + " 处)" : ""));
  else if (cacheV && footerVs.size === 1 && [...footerVs][0] === cacheV) {
    console.log("版本一致性: 页脚 v" + cacheV + " == sw.js CACHE_NAME v" + cacheV + " == 更新日志最新条目 v" + entries[0].v + "(" + entries[0].date + ")");
    console.log("日期一致性: 页脚内容核对 " + newestMonth + " == 更新日志最新日期月份 == version.json");
    console.log("缓存一致性: 全站本地资源 ?v=" + cacheV + "（HTML 引用与 sw.js 预缓存清单双向一致），head 均带 site-version 标记");
  } else {
    fail("版本不一致：页脚 " + JSON.stringify([...footerVs]) + " vs sw.js " + cacheV);
  }
} catch (e) { fail("版本一致性检查异常: " + e.message); }

// ---- 4) 知识卡详细度门槛 ----
try {
  const kd2 = fs.readFileSync(path.join(ROOT, "assets", "js", "knowledge-detail-data.js"), "utf8");
  const cardRe2 = /"([a-z0-9\-]+)":\s*\{\s*"title":\s*"([^"]+)",\s*"hazard":\s*"([^"]+)",\s*"html":\s*"([\s\S]*?)"\s*\},?\n/g;
  let cm2, thin = [];
  while ((cm2 = cardRe2.exec(kd2)) !== null) {
    const html = cm2[4].replace(/\\"/g, '"').replace(/\\n/g, "\n");
    const okShi = /是什么/.test(html);
    const okStd = /class="std"/.test(html);
    const okRel = /class="rel"/.test(html);
    const okHow = /class="howto"/.test(html);
    if (!(okShi && okStd && okRel && okHow) || html.length < 1200) {
      thin.push(cm2[1] + "(len=" + html.length + ", 是什么=" + okShi + " 标准=" + okStd + " 关联=" + okRel + " 提醒=" + okHow + ")");
    }
  }
  if (thin.length) fail("知识卡详细度不足: " + thin.join("; "));
  else console.log("知识卡详细度: 全部达标（共 " + Object.keys(cardRe2).length + " 张）");
} catch (e) { fail("知识卡详细度检查异常: " + e.message); }

console.log(bad === 0 ? "check-structure: PASS" : "check-structure: " + bad + " 处问题");
process.exit(bad ? 1 : 0);
