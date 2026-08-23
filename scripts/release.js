// 版本发布脚本：一键升级全站版本号
// 用法：node scripts/release.js 1.4.2
// 自动：页脚版本（全部 HTML）、sw.js CACHE_NAME、导出文本版本、changelog meta
// 手动：在 pages/changelog.html 顶部补一条 changelog 条目，再提交推送
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const V = (process.argv[2] || "").trim();
if (!/^\d+\.\d+\.\d+$/.test(V)) {
  console.error("用法: node scripts/release.js 1.4.2（x.y.z）");
  process.exit(1);
}
console.log("== 升级版本号 → v" + V + " ==");

let changed = 0;
// 1. 页脚版本：全部 HTML
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "backup" && e.name !== ".git") walk(full); }
    else if (e.name.endsWith(".html")) {
      let c = fs.readFileSync(full, "utf8");
      const m = c.match(/版本 v\d+\.\d+\.\d+/);
      if (m) {
        c = c.replace(/版本 v\d+\.\d+\.\d+/, "版本 v" + V);
        fs.writeFileSync(full, c, "utf8");
        changed++;
      }
    }
  }
}
walk(ROOT);
console.log("  页脚版本已更新: " + changed + " 个文件");

// 2. sw.js CACHE_NAME
const swPath = path.join(ROOT, "sw.js");
let sw = fs.readFileSync(swPath, "utf8");
const swm = sw.match(/safety-reliability-v\d+\.\d+\.\d+/);
if (swm) {
  sw = sw.replace(/safety-reliability-v\d+\.\d+\.\d+/, "safety-reliability-v" + V);
  fs.writeFileSync(swPath, sw, "utf8");
  console.log("  sw.js CACHE_NAME → safety-reliability-v" + V);
}

// 3. calculator-extra.js 导出文本版本
const cePath = path.join(ROOT, "assets", "js", "calculator-extra.js");
let ce = fs.readFileSync(cePath, "utf8");
if (/安规知识课堂 v\d+\.\d+\.\d+/.test(ce)) {
  ce = ce.replace(/安规知识课堂 v\d+\.\d+\.\d+/, "安规知识课堂 v" + V);
  fs.writeFileSync(cePath, ce, "utf8");
  console.log("  导出文本版本已更新");
}

// 4. changelog meta description
const chPath = path.join(ROOT, "pages", "changelog.html");
let ch = fs.readFileSync(chPath, "utf8");
if (/更新日志：v\d+\.\d+\.\d+/.test(ch)) {
  ch = ch.replace(/更新日志：v\d+\.\d+\.\d+/, "更新日志：v" + V);
  fs.writeFileSync(chPath, ch, "utf8");
  console.log("  changelog meta 已更新");
}

// 5. 脚本版本参数（main.js / search.js 全站 html + sw.js CORE_ASSETS）——避免旧 PWA 缓存导致新逻辑不生效
var scriptRefs = [swPath];
(function walkHtml(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "backup" && e.name !== "node_modules" && e.name !== ".git") walkHtml(full); }
    else if (e.name.endsWith(".html")) scriptRefs.push(full);
  }
})(ROOT);
scriptRefs.forEach(function (f) {
  var c = fs.readFileSync(f, "utf8");
  if (/(main|search)\.js\?v=\d+\.\d+\.\d+/.test(c)) {
    c = c.replace(/(main|search)\.js\?v=\d+\.\d+\.\d+/g, "$1.js?v=" + V);
    fs.writeFileSync(f, c, "utf8");
    console.log("  " + path.basename(f) + " 脚本版本参数 → " + V);
  }
});

console.log("\n完成。请记得：");
console.log("  1) 在 pages/changelog.html 顶部补 v" + V + " 条目；");
console.log("  2) node scripts/check-structure.js && node scripts/check-links.js 验证；");
console.log("  3) git add -A && git commit && git push。");