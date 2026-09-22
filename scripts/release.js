// 版本发布脚本：一键升级全站版本号 + 刷新全站资源缓存参数
// 用法：node scripts/release.js 1.4.5 [2026-09]
// 自动：
//   1) 页脚版本：中文「版本 vX.Y.Z」+ 英文「· vX.Y.Z ·」，以及页脚「内容核对 YYYY-MM」
//   2) 每页 head 里的 <meta name="site-version" content="X.Y.Z">（供前端比对“是不是旧版本”）
//   3) sw.js CACHE_NAME
//   4) 导出文本版本、changelog meta description 版本号
//   5) 全站本地资源版本参数（所有 assets/**/*.css|js，HTML 的 href/src 与 sw.js CORE_ASSETS 两边同步）
//   6) version.json（版本探针：浏览器打开即比对，发现新版本会提示刷新）
// 手动：
//   - pages/changelog.html 顶部补一条条目标题（格式：<h2>vX.Y.Z（YYYY-MM-DD ...）</h2>）并写实际内容说明
//   - node scripts/check-structure.js && node scripts/check-links.js 验证后提交
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const V = (process.argv[2] || "").trim();
// 用本地日期，不用 toISOString（UTC 会在跨月/跨日的夜里取到前一天）
function localDate(d) {
  d = d || new Date();
  var p = function (n) { return String(n).padStart(2, "0"); };
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
const MONTH = (process.argv[3] || "").trim() || localDate().slice(0, 7);
if (!/^\d+\.\d+\.\d+$/.test(V)) {
  console.error("用法: node scripts/release.js 1.4.5 [2026-09]（x.y.z，可选目标核对月份 YYYY-MM）");
  process.exit(1);
}
if (!/^\d{4}-\d{2}$/.test(MONTH)) {
  console.error("核对月份格式应为 YYYY-MM，收到: " + MONTH);
  process.exit(1);
}
console.log("== 升级版本号 → v" + V + "（页脚核对月份 → " + MONTH + "）==");

const EXCLUDE = new Set(["backup", ".git", "node_modules", ".tmp-chrome"]);
function eachHtml(dir, fn) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!EXCLUDE.has(e.name)) eachHtml(full, fn); }
    else if (e.name.endsWith(".html")) fn(full);
  }
}

// 1) 页脚版本 + 核对月份 + head 版本标记
let changed = 0;
eachHtml(ROOT, function (full) {
  let c = fs.readFileSync(full, "utf8");
  const before = c;
  // 中文页脚「版本 vX.Y.Z」与英文页脚「· vX.Y.Z ·」两种写法都要覆盖（en/ 曾因此停在 v1.2.2）
  c = c.replace(/版本 v\d+\.\d+\.\d+/g, "版本 v" + V);
  c = c.replace(/· v\d+\.\d+\.\d+ ·/g, "· v" + V + " ·");
  c = c.replace(/(内容核对 )\d{4}-\d{2}/g, "$1" + MONTH);
  // head 里的站点版本标记：老页面补上，已有则更新（前端用它判断“我打开的是哪一版”）
  if (/<meta name="site-version"/.test(c)) {
    c = c.replace(/<meta name="site-version" content="[^"]*">/, '<meta name="site-version" content="' + V + '">');
  } else if (/<meta name="theme-color"[^>]*>/.test(c)) {
    c = c.replace(/(<meta name="theme-color"[^>]*>)/, '$1\n  <meta name="site-version" content="' + V + '">');
  } else if (/<meta name="viewport"[^>]*>/.test(c)) {
    c = c.replace(/(<meta name="viewport"[^>]*>)/, '$1\n  <meta name="site-version" content="' + V + '">');
  }
  if (c !== before) { fs.writeFileSync(full, c, "utf8"); changed++; }
});
console.log("  页脚版本 / 核对月份 / site-version 标记: " + changed + " 个页面");

// 2) sw.js CACHE_NAME
const swPath = path.join(ROOT, "sw.js");
let sw = fs.readFileSync(swPath, "utf8");
if (/safety-reliability-v\d+\.\d+\.\d+/.test(sw)) {
  sw = sw.replace(/safety-reliability-v\d+\.\d+\.\d+/, "safety-reliability-v" + V);
  fs.writeFileSync(swPath, sw, "utf8");
  console.log("  sw.js CACHE_NAME → safety-reliability-v" + V);
}

// 3) calculator-extra.js 导出文本版本
const cePath = path.join(ROOT, "assets", "js", "calculator-extra.js");
let ce = fs.readFileSync(cePath, "utf8");
if (/安规知识课堂 v\d+\.\d+\.\d+/.test(ce)) {
  ce = ce.replace(/安规知识课堂 v\d+\.\d+\.\d+/, "安规知识课堂 v" + V);
  fs.writeFileSync(cePath, ce, "utf8");
  console.log("  导出文本版本已更新");
}

// 4) changelog meta description（只改版本号；描述内容需人工写本版实际变化）
const chPath = path.join(ROOT, "pages", "changelog.html");
let ch = fs.readFileSync(chPath, "utf8");
if (/更新日志：v\d+\.\d+\.\d+/.test(ch)) {
  ch = ch.replace(/更新日志：v\d+\.\d+\.\d+/, "更新日志：v" + V);
  fs.writeFileSync(chPath, ch, "utf8");
  console.log("  changelog meta 版本号已更新");
}

// 5) 全站本地资源版本参数：所有 assets/**/*.css|js
//    为什么必须是「全部」而不是少数几个脚本：未带参数的 CSS/JS 会被浏览器 HTTP 缓存和
//    Service Worker 缓存（cache-first）留着，于是出现「HTML 是新的、样式脚本还是旧的」。
//    HTML 的 href/src 与 sw.js 预缓存清单必须写同一个参数，否则离线时预缓存的 URL 对不上。
const ASSET_RE_HTML = /((?:href|src)=")((?:\.\.\/|\.\/)?assets\/[^"?#]+\.(?:css|js))(\?v=[\d.]+)?(")/g;
const ASSET_RE_SW = /"(\.\/assets\/[^"?#]+\.(?:css|js))(\?v=[\d.]+)?"/g;
let assetHtml = 0, assetSw = 0;
eachHtml(ROOT, function (full) {
  const c = fs.readFileSync(full, "utf8");
  const out = c.replace(ASSET_RE_HTML, function (m, a, url, _q, z) { return a + url + "?v=" + V + z; });
  if (out !== c) { fs.writeFileSync(full, out, "utf8"); assetHtml++; }
});
let swNow = fs.readFileSync(swPath, "utf8");
const swOut = swNow.replace(ASSET_RE_SW, function (m, url) { return '"' + url + "?v=" + V + '"'; });
if (swOut !== swNow) { fs.writeFileSync(swPath, swOut, "utf8"); assetSw = 1; }
console.log("  资源版本参数: HTML " + assetHtml + " 个文件, sw.js 预缓存清单 " + (assetSw ? "已同步" : "无变化") + " → ?v=" + V);

// 6) version.json：浏览器打开页面时用它比对线上最新版本（必须永远直连网络，不能进缓存）
const vj = { version: V, month: MONTH, updated: localDate() };
fs.writeFileSync(path.join(ROOT, "version.json"), JSON.stringify(vj, null, 2) + "\n", "utf8");
console.log("  version.json → " + JSON.stringify(vj));

console.log("\n完成。请记得：");
console.log("  1) 在 pages/changelog.html 顶部补 v" + V + " 条目（标题格式：<h2>v" + V + "（" + MONTH + "-XX ...）</h2>）；");
console.log("  2) 更新 pages/changelog.html 的 meta description（要写本版实际内容，别只改版本号）；");
console.log("  3) node scripts/check-structure.js && node scripts/check-links.js 验证；");
console.log("  4) git add -A && git commit && git push（推送后浏览器最多 10 分钟、通常刷新一次即可看到新版）。");
