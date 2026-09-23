// 间距表「与标准原文逐格比对」工具
// ---------------------------------------------------------------------------
// 用途：把 assets/js/calculator-v3.js 里的灯具间距表，与标准原文网页里解析出来的
//       表格数值逐格比对（表11.1 / 附录 U 表 U.1 / 表11.2）。
// 用法：
//   1) 用浏览器打开标准原文页面（IEC 60598-1 的 IDT 文本），另存为 HTML：
//        https://star-pro.ru/gost/iec-60598-1-2017          （= IEC 60598-1:2014）
//        https://meganorm.ru/Data2/1/4293793/4293793987.htm （= IEC 60598-1:2008，用于交叉复核）
//   2) node scripts/verify-spacing-vs-source.js <保存的页面.html>
// 说明：脚本只做解析与比对，不联网；医疗表（GB 9706.1 表11/表12）暂未纳入，
//       拿到可解析的原文后可照同样方式扩展。
// 解析要点：① 单元格文本去掉上标脚注（如 “3,2 d)”）后必须正好是纯数字才算数据格；
//          ② 表11.1 / 表 U.1 的表头是电压行（50…1000），数据在其后；③ 表11.2 的 kV 行本身就是数据行。
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

function cells(file) {
  const html = fs.readFileSync(file, "utf8");
  const out = [];
  (html.match(/<table[\s\S]*?<\/table>/gi) || []).forEach(function (tb) {
    (tb.match(/<tr[\s\S]*?<\/tr>/gi) || []).forEach(function (tr) {
      (tr.match(/<t[dh][\s\S]*?<\/t[dh]>/gi) || []).forEach(function (cell) {
        let t = cell
          .replace(/<sup[\s\S]*?<\/sup>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/\s+/g, " ")
          .trim();
        t = t.replace(/\s*[a-d]\)\s*$/i, "").trim();
        if (/^[-–]$/.test(t)) out.push(null);
        else if (/^\d+(?:[.,]\d+)?$/.test(t)) out.push(Number(t.replace(",", ".")));
      });
    });
  });
  return out;
}
function findAt(list, header, from) {
  for (let i = from || 0; i + header.length <= list.length; i++) {
    let ok = true;
    for (let j = 0; j < header.length; j++) if (list[i + j] !== header[j]) { ok = false; break; }
    if (ok) return i;
  }
  return -1;
}
function rows8(list) {
  const keys = ["creep.high.basic", "creep.low.basic", "creep.high.supp", "creep.low.supp", "creep.rein", "clear.basic", "clear.supp", "clear.rein"];
  const out = {};
  keys.forEach(function (k, i) { out[k] = list.slice(i * 6, i * 6 + 6); });
  return out;
}

const V = [50, 150, 250, 500, 750, 1000];
const IMP_KV = [2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100];
const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.log("用法: node scripts/verify-spacing-vs-source.js <标准原文页面.html>"); process.exit(2); }
const all = cells(file);

const at1 = findAt(all, V, 0);
const atU = findAt(all, V, at1 + 60);
const atI = findAt(all, IMP_KV, 0);
if (at1 < 0 || atU < 0 || atI < 0) { console.log("解析失败 at1=" + at1 + " atU=" + atU + " atI=" + atI); process.exit(1); }
const t111 = rows8(all.slice(at1 + V.length, at1 + V.length + 48));
const tU1 = rows8(all.slice(atU + V.length, atU + V.length + 48));
const kv = IMP_KV;
const mm = all.slice(atI + IMP_KV.length, atI + IMP_KV.length + 18);

console.log("===== 标准原文解析结果（" + path.basename(file) + "）解析结果 =====\n");
function showTable(name, t) {
  console.log("【" + name + "】");
  console.log("  工作电压(V)        " + V.map(function (v) { return String(v).padStart(7); }).join(""));
  [["爬电 基本 PTI≥600", "creep.high.basic"], ["爬电 基本 PTI<600", "creep.low.basic"],
   ["爬电 附加 PTI≥600", "creep.high.supp"], ["爬电 附加 PTI<600", "creep.low.supp"],
   ["爬电 加强（单列） ", "creep.rein"], ["间隙 基本         ", "clear.basic"],
   ["间隙 附加         ", "clear.supp"], ["间隙 加强         ", "clear.rein"]].forEach(function (l) {
    console.log("  " + l[0] + "  " + t[l[1]].map(function (x) { return String(x === null ? "—" : x).padStart(7); }).join(""));
  });
  console.log("");
}
showTable("表11.1（OVC II / PD2 / ≤2000 m）", t111);
showTable("附录 U 表 U.1（OVC III / PD2）", tU1);
console.log("【表11.2（额定脉冲电压 → 最小电气间隙）】");
console.log("  kV: " + kv.join(", "));
console.log("  mm: " + mm.join(", "));

const stub = function () {
  return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, addEventListener: function () {},
    setAttribute: function () {}, getAttribute: function () { return null; }, appendChild: function () {}, insertAdjacentHTML: function () {},
    querySelector: function () { return null; }, querySelectorAll: function () { return []; }, textContent: "", innerHTML: "", value: "",
    checked: false, hidden: false, disabled: false, children: [], options: [] };
};
const shim = { readyState: "complete", addEventListener: function () {}, querySelectorAll: function () { return []; },
  getElementById: stub, querySelector: stub, createElement: stub, head: stub(), body: stub() };
const win = { addEventListener: function () {}, localStorage: { getItem: function () { return null; }, setItem: function () {} } };
const api = new Function("document", "window", "localStorage", "location",
  fs.readFileSync(path.join(ROOT, "assets", "js", "calculator-v3.js"), "utf8") +
  "\nreturn { LUM_TABLE: LUM_TABLE, LUM_IMPULSE: LUM_IMPULSE };")(
  shim, win, win.localStorage, { search: "", hash: "", pathname: "/pages/tools.html" });

console.log("\n===== 与 calculator-v3.js 逐格比对 =====");
let bad = 0;
function cmp(label, actual, expect) {
  const a = JSON.stringify(actual), e = JSON.stringify(expect);
  if (a !== e) { console.log("  ✗ " + label + "\n      代码 " + a + "\n      标准 " + e); bad++; }
  else console.log("  ✓ " + label);
}
const T = api.LUM_TABLE;
cmp("表11.1 爬电基本 PTI≥600", T.general.creep.high.basic, t111["creep.high.basic"]);
cmp("表11.1 爬电基本 PTI<600", T.general.creep.low.basic, t111["creep.low.basic"]);
cmp("表11.1 爬电附加 PTI≥600", T.general.creep.high.supp, t111["creep.high.supp"]);
cmp("表11.1 爬电附加 PTI<600", T.general.creep.low.supp, t111["creep.low.supp"]);
cmp("表11.1 爬电加强", T.general.creep.high.rein, t111["creep.rein"]);
cmp("表11.1 爬电加强(PTI<600 同列)", T.general.creep.low.rein, t111["creep.rein"]);
cmp("表11.1 间隙基本", T.general.clear.basic, t111["clear.basic"]);
cmp("表11.1 间隙附加", T.general.clear.supp, t111["clear.supp"]);
cmp("表11.1 间隙加强", T.general.clear.rein, t111["clear.rein"]);
cmp("表 U.1 爬电基本 PTI≥600", T.ovc3.creep.high.basic, tU1["creep.high.basic"]);
cmp("表 U.1 爬电基本 PTI<600", T.ovc3.creep.low.basic, tU1["creep.low.basic"]);
cmp("表 U.1 爬电附加 PTI≥600", T.ovc3.creep.high.supp, tU1["creep.high.supp"]);
cmp("表 U.1 爬电附加 PTI<600", T.ovc3.creep.low.supp, tU1["creep.low.supp"]);
cmp("表 U.1 爬电加强", T.ovc3.creep.high.rein, tU1["creep.rein"]);
cmp("表 U.1 爬电加强(PTI<600 同列)", T.ovc3.creep.low.rein, tU1["creep.rein"]);
cmp("表 U.1 间隙基本", T.ovc3.clear.basic, tU1["clear.basic"]);
cmp("表 U.1 间隙附加", T.ovc3.clear.supp, tU1["clear.supp"]);
cmp("表 U.1 间隙加强", T.ovc3.clear.rein, tU1["clear.rein"]);
cmp("表11.2 脉冲电压档位", api.LUM_IMPULSE.kv, kv);
cmp("表11.2 最小电气间隙", api.LUM_IMPULSE.mm, mm);
console.log(bad === 0 ? "\n结果：代码与标准原文逐格一致 ✓（20 组比对全部通过）" : "\n结果：" + bad + " 组不一致 ✗");
