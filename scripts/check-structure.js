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


// ---- 3) 版本一致性：页脚版本 == sw.js CACHE_NAME ----
try {
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  const cacheV = (sw.match(/safety-reliability-v(\d+\.\d+\.\d+)/) || [])[1];
  const footerVs = new Set();
  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, "utf8");
    const m = c.match(/版本 v(\d+\.\d+\.\d+)/);
    if (m) footerVs.add(m[1]);
  }
  if (cacheV && footerVs.size === 1 && [...footerVs][0] === cacheV) {
    console.log("版本一致性: 页脚 v" + cacheV + " == sw.js CACHE_NAME v" + cacheV);
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
