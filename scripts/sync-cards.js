// 知识卡单一数据源同步器 v2：从 KNOWLEDGE_DETAILS + KNOWLEDGE_ORDER 重建 knowledge.html 卡片网格
// 用法：node scripts/sync-cards.js
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const KD = fs.readFileSync(path.join(ROOT, "assets", "js", "knowledge-detail-data.js"), "utf8");
let kh = fs.readFileSync(path.join(ROOT, "pages", "knowledge.html"), "utf8");

// 解析数据
const cardRe = /"([a-z0-9\-]+)":\s*\{\s*"title":\s*"([^"]+)",\s*"hazard":\s*"([^"]+)",\s*"html":\s*"([\s\S]*?)"\s*\},?\n/g;
const data = {};
let m;
while ((m = cardRe.exec(KD)) !== null) data[m[1]] = { hazard: m[3], html: m[4].replace(/\\"/g, '"').replace(/\\n/g, "\n") };
const order = [...KD.match(/var KNOWLEDGE_ORDER = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);

// 定位网格容器（闭合 = </main> 前最后一个 </div>）
const gridOpen = '<div class="knowledge-grid">';
const gs = kh.indexOf(gridOpen);
const mainClose = kh.lastIndexOf('</main>');
const gridDivClose = kh.lastIndexOf('</div>', mainClose) + 6;
if (gs < 0) { console.error("未找到 .knowledge-grid"); process.exit(1); }
if (gridDivClose < 6) { console.error("网格未闭合"); process.exit(1); }

// 按 KNOWLEDGE_ORDER 重建卡片区块
const orderIds = order.filter(function (id) { return !!data[id]; });
const cards = orderIds.map(function (id) {
  return '      <section class="card" id="' + id + '" data-hazard="' + data[id].hazard + '">' + data[id].html + '\n      </section>';
}).join("\n");
const missing = order.filter(function (id) { return !data[id]; });
if (missing.length) console.log("警告：KNOWLEDGE_ORDER 中有数据缺失: " + missing.join(", "));

kh = kh.slice(0, gs) + gridOpen + "\n" + cards + "\n    </div>" + kh.slice(gridDivClose);
fs.writeFileSync(path.join(ROOT, "pages", "knowledge.html"), kh, "utf8");
console.log("sync-cards v2 完成：重建 " + orderIds.length + " 张卡（顺序与 KNOWLEDGE_ORDER 一致）");
