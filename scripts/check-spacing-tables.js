// 间距表数据自检：把 calculator-v3.js 里的表格与标准原文数值逐格比对
// 用法：node scripts/check-spacing-tables.js
// 数据来源（已按标准原文逐格核对）：
//   IEC 60598-1:2014 / GB 7000.1-2015 第 11 章
//     表11.1        —— 正弦交流电压下的最小距离（海拔 ≤2000 m、污染等级 2、过电压类别 II）
//     附录 U 表 U.1 —— 同上结构，过电压类别 III
//     表11.2        —— 额定脉冲电压 → 最小电气间隙（IEC 60664-1 表2 情形 A）
//   GB 9706.1-2020 / IEC 60601-1 8.7.3 表11（间隙）/ 表12（爬电），条件 ≤250 V、PD2、材料组 Ⅲb
//   IEC 60664-1 / GB/T 16935.1 绝缘配合（灯具"查表依据 = IEC 60664-1"时使用）：
//     爬电距离表（表 F.4）PD1 / PD2 / PD3 三列 + 额定冲击电压 → 最小电气间隙（表 2 情形 A）
//     + 额定冲击电压（表 1：系统电压 × 过电压类别）+ 海拔修正（附录 A.2）
//     注：间隙表已用 IEC 60598-1 表11.2（与 60664-1 表2 同源）机器解析交叉验证；PD4 列本工具未收录。
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

// ---- 标准原文数值（改动前请先核对标准原文）----
const EXPECT = {
  creep60664: {
    50: { 1: { ALL: 0.18 }, 2: { I: 0.6, II: 0.85, IIIa: 1.2, IIIb: 1.2 }, 3: { I: 1.5, II: 1.7, IIIa: 1.9, IIIb: 1.9 } },
    125: { 1: { ALL: 0.28 }, 2: { I: 0.75, II: 1.05, IIIa: 1.5, IIIb: 1.5 }, 3: { I: 1.9, II: 2.1, IIIa: 2.4, IIIb: 2.4 } },
    250: { 1: { ALL: 0.56 }, 2: { I: 1.25, II: 1.8, IIIa: 2.5, IIIb: 2.5 }, 3: { I: 3.2, II: 3.6, IIIa: 4.0, IIIb: 4.0 } },
    400: { 1: { ALL: 1.0 }, 2: { I: 2.0, II: 2.8, IIIa: 4.0, IIIb: 4.0 }, 3: { I: 5.0, II: 5.6, IIIa: 6.3, IIIb: 6.3 } },
    600: { 1: { ALL: 1.8 }, 2: { I: 3.2, II: 4.5, IIIa: 6.3, IIIb: 6.3 }, 3: { I: 8.0, II: 9.0, IIIa: 10.0, IIIb: 10.0 } }
  },
  clearance60664: {
    330: 0.01, 400: 0.02, 500: 0.04, 600: 0.06, 800: 0.13, 1000: 0.26, 1200: 0.42,
    1500: 0.5, 2000: 1.0, 2500: 1.5, 3000: 2.0, 4000: 3.0, 5000: 4.0,
    6000: 5.5, 8000: 8.0, 10000: 11.0, 12000: 14.0
  },
  impulse60664: {
    120: { I: 800, II: 1500, III: 2500, IV: 4000 },
    230: { I: 1500, II: 2500, III: 4000, IV: 6000 },
    400: { I: 2500, II: 4000, III: 6000, IV: 8000 }
  },
  altitude60664: { 2000: 1.0, 3000: 1.14, 4000: 1.29, 5000: 1.48 }, // 仅校验这一段（6000–10000 m 档未机器核对原文）
  general: { // 表11.1
    creepHigh: { basic: [0.6, 0.8, 1.5, 3, 4, 5.5], supp: [null, 0.8, 1.5, 3, 4, 5.5], rein: [null, 3.2, 5, 6, 8, 11] },
    creepLow: { basic: [1.2, 1.6, 2.5, 5, 8, 10], supp: [null, 1.6, 2.5, 5, 8, 10], rein: [null, 3.2, 5, 6, 8, 11] },
    clear: { basic: [0.2, 0.8, 1.5, 3, 4, 5.5], supp: [null, 0.8, 1.5, 3, 4, 5.5], rein: [null, 1.6, 3, 6, 8, 11] }
  },
  ovc3: { // 附录 U 表 U.1
    creepHigh: { basic: [0.6, 1.5, 3, 4, 5.5, 8], supp: [null, 1.5, 3, 4, 5.5, 8], rein: [null, 3.2, 6, 8, 11, 16] },
    creepLow: { basic: [1.2, 1.6, 3, 5, 8, 10], supp: [null, 1.6, 3, 5, 8, 10], rein: [null, 3.2, 6, 8, 11, 16] },
    clear: { basic: [0.2, 1.5, 3, 4, 5.5, 8], supp: [null, 1.5, 3, 4, 5.5, 8], rein: [null, 3, 6, 8, 11, 16] }
  },
  impulse: { // 表11.2
    kv: [2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100],
    mm: [1, 1.5, 2, 3, 4, 5.5, 8, 11, 14, 18, 25, 33, 40, 60, 75, 90, 130, 170]
  },
  medical: { // GB 9706.1 表11 / 表12（≤250 V）
    "1MOOP": { creep: 2.5, clear: 2.0 },
    "2MOOP": { creep: 5.0, clear: 4.0 },
    "1MOPP": { creep: 4.0, clear: 2.5 },
    "2MOPP": { creep: 8.0, clear: 5.0 }
  }
};

// ---- 以最小 DOM 垫片加载计算脚本，取出表格 ----
function stubEl() {
  return {
    style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} },
    addEventListener: function () {}, setAttribute: function () {}, getAttribute: function () { return null; },
    appendChild: function () {}, insertAdjacentHTML: function () {}, querySelector: function () { return null; },
    querySelectorAll: function () { return []; }, textContent: "", innerHTML: "", value: "", checked: false,
    hidden: false, disabled: false, children: [], options: []
  };
}
const shim = {
  readyState: "complete", addEventListener: function () {}, querySelectorAll: function () { return []; },
  getElementById: function () { return stubEl(); }, querySelector: function () { return stubEl(); },
  createElement: function () { return stubEl(); }, head: stubEl(), body: stubEl()
};
const win = { addEventListener: function () {}, localStorage: { getItem: function () { return null; }, setItem: function () {} } };
const code = fs.readFileSync(path.join(ROOT, "assets", "js", "calculator-v3.js"), "utf8");
const api = new Function("document", "window", "localStorage", "location", code +
  "\nreturn { LUM_TABLE: LUM_TABLE, LUM_IMPULSE: LUM_IMPULSE, MED_MOP: MED_MOP, CREEPAGE_DATA: CREEPAGE_DATA, CLEARANCE_DATA: CLEARANCE_DATA, IMPULSE_DATA: IMPULSE_DATA, ALTITUDE_DATA: ALTITUDE_DATA };")(
  shim, win, win.localStorage, { search: "", hash: "", pathname: "/pages/tools.html" });

let bad = 0;
function cmp(label, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { console.log("  ✗ " + label + "\n      实际 " + a + "\n      应为 " + e); bad++; }
  else console.log("  ✓ " + label);
}

console.log("== 灯具表11.1（OVC II）==");
cmp("爬电 · PTI ≥ 600", api.LUM_TABLE.general.creep.high, EXPECT.general.creepHigh);
cmp("爬电 · PTI < 600", api.LUM_TABLE.general.creep.low, EXPECT.general.creepLow);
cmp("电气间隙", api.LUM_TABLE.general.clear, EXPECT.general.clear);

console.log("== 附录 U 表 U.1（OVC III）==");
cmp("爬电 · PTI ≥ 600", api.LUM_TABLE.ovc3.creep.high, EXPECT.ovc3.creepHigh);
cmp("爬电 · PTI < 600", api.LUM_TABLE.ovc3.creep.low, EXPECT.ovc3.creepLow);
cmp("电气间隙", api.LUM_TABLE.ovc3.clear, EXPECT.ovc3.clear);

console.log("== 表11.2（脉冲电压 → 最小电气间隙）==");
cmp("脉冲电压档位", api.LUM_IMPULSE.kv, EXPECT.impulse.kv);
cmp("最小电气间隙", api.LUM_IMPULSE.mm, EXPECT.impulse.mm);

console.log("== IEC 60664-1 绝缘配合（灯具查表依据 = IEC 60664-1 时使用）==");
console.log("  来源说明：爬电列 PD1/PD2/PD3 与冲击电压表、间隙表与 60664-1 表 F.4 / 表1 / 表2 一致；");
console.log("            间隙表另经 IEC 60598-1 表11.2（与 60664-1 表2 同源）机器解析交叉验证；PD4 列本工具未收录。");
cmp("爬电距离表（PD1 / PD2 / PD3）", api.CREEPAGE_DATA, EXPECT.creep60664);
cmp("电气间隙表（额定冲击电压 → mm）", api.CLEARANCE_DATA, EXPECT.clearance60664);
cmp("额定冲击电压表（系统电压 × OVC）", api.IMPULSE_DATA, EXPECT.impulse60664);
(function () {
  const bad = [];
  Object.keys(EXPECT.altitude60664).forEach(function (k) {
    if (api.ALTITUDE_DATA[k] !== EXPECT.altitude60664[k]) bad.push(k + "m: 代码 " + api.ALTITUDE_DATA[k] + " / 标准 " + EXPECT.altitude60664[k]);
  });
  if (bad.length) { console.log("  ✗ 海拔修正系数（≤5000 m）—— " + bad.join("；")); fails++; }
  else console.log("  ✓ 海拔修正系数（≤5000 m；6000–10000 m 档保留在代码中，未机器核对）");
})();

console.log("== 医疗表11 / 表12（≤250 V）==");
Object.keys(EXPECT.medical).forEach(function (k) {
  const m = api.MED_MOP[k] || {};
  cmp(k, { creep: m.creep, clear: m.clear }, EXPECT.medical[k]);
});

// 附加体检：爬电列不能是间隙列的副本（这正是本次修复的缺陷类型）
const t = api.LUM_TABLE.general;
["basic", "supp", "rein"].forEach(function (ins) {
  const creep = t.creep.low[ins].join(",");
  const clear = t.clear[ins].join(",");
  if (creep === clear) { console.log("  ✗ 表11.1 PTI<600 的 " + ins + " 爬电列与间隙列完全相同（疑似抄错）"); bad++; }
});
if (bad === 0) console.log("\ncheck-spacing-tables: PASS（灯具与医疗间距表与标准原文一致）");
else console.log("\ncheck-spacing-tables: " + bad + " 处不一致");
process.exit(bad ? 1 : 0);
