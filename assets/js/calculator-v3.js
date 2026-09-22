// ===== 简化教学数据（正式设计请查标准原文） =====
var VOLT_POINTS = [50, 125, 250, 400, 600];

var CREEPAGE_DATA = {
  50: {
    1: { ALL: 0.18 },
    2: { I: 0.6, II: 0.85, IIIa: 1.2, IIIb: 1.2 },
    3: { I: 1.5, II: 1.7, IIIa: 1.9, IIIb: 1.9 }
  },
  125: {
    1: { ALL: 0.28 },
    2: { I: 0.75, II: 1.05, IIIa: 1.5, IIIb: 1.5 },
    3: { I: 1.9, II: 2.1, IIIa: 2.4, IIIb: 2.4 }
  },
  250: {
    1: { ALL: 0.56 },
    2: { I: 1.25, II: 1.8, IIIa: 2.5, IIIb: 2.5 },
    3: { I: 3.2, II: 3.6, IIIa: 4.0, IIIb: 4.0 }
  },
  400: {
    1: { ALL: 1.0 },
    2: { I: 2.0, II: 2.8, IIIa: 4.0, IIIb: 4.0 },
    3: { I: 5.0, II: 5.6, IIIa: 6.3, IIIb: 6.3 }
  },
  600: {
    1: { ALL: 1.8 },
    2: { I: 3.2, II: 4.5, IIIa: 6.3, IIIb: 6.3 },
    3: { I: 8.0, II: 9.0, IIIa: 10.0, IIIb: 10.0 }
  }
};

// IEC 60664-1 表 F.2 / GB/T 16935.1 表2：额定冲击电压 → 最小电气间隙（基本绝缘，污染等级 2）
var CLEARANCE_DATA = {
  330: 0.01, 400: 0.02, 500: 0.04, 600: 0.06, 800: 0.13, 1000: 0.26, 1200: 0.42,
  1500: 0.5, 2000: 1.0, 2500: 1.5, 3000: 2.0, 4000: 3.0, 5000: 4.0,
  6000: 5.5, 8000: 8.0, 10000: 11.0, 12000: 14.0
};

var IMPULSE_DATA = {
  120: { I: 800, II: 1500, III: 2500, IV: 4000 },
  230: { I: 1500, II: 2500, III: 4000, IV: 6000 },
  400: { I: 2500, II: 4000, III: 6000, IV: 8000 }
};

var ALTITUDE_DATA = {
  2000: 1.0, 3000: 1.14, 4000: 1.29, 5000: 1.48,
  6000: 1.7, 7000: 1.95, 8000: 2.25, 9000: 2.62, 10000: 3.0
};

var INSUL_MULT = {
  functional: 0.8,
  basic: 1,
  supplementary: 1,
  reinforced: 2
};


var PD_INFO = {
  1: "污染等级 1：无污染或只有干燥非导电污染。典型：密封 / 灌封内部。注意：外壳密封不等于自动 1 级，还要看工艺残留与凝露。",
  2: "污染等级 2：一般只有非导电污染，偶尔凝结导电。典型：普通室内电子产品（最常用）。",
  3: "污染等级 3：存在导电污染，或干燥非导电污染但会凝结。典型：工业现场、户外无防护、粉尘环境。"
};

var SYS_INFO = {
  120: "系统电压 120V：美国 / 加拿大 / 日本等市场。过电压类别 II 的冲击耐受约 1500V，间隙比 230V 市场宽松。",
  230: "系统电压 230V：中国 / 欧盟 / 英国等市场。过电压类别 II 的冲击耐受约 2500V，最常用。",
  400: "系统电压 400V：三相工业配电。过电压类别 II 冲击耐受约 4000V，固定安装（III/IV）更高。"
};

var VOLT_INFO = "工作电压（RMS 有效值）：爬电距离查表用；峰值 ≈ 1.414 × 有效值，但电气间隙不看峰值，而是看系统电压 + 过电压类别推出的冲击耐受。宽压产品（100–240V）按 250V 档查表，不按 240V 插值。";

var GP_INFO = {
  I: "材料组 Ⅰ：CTI ≥ 600，抗漏电起痕最强，允许的爬电距离最短。典型：陶瓷、云母、部分玻纤增强工程塑料。",
  II: "材料组 Ⅱ：400 ≤ CTI < 600。典型：部分 PA66 / PBT 牌号。",
  IIIa: "材料组 Ⅲa：175 ≤ CTI < 400。典型：PC、ABS 等最常见低成本材料，多数消费电子外壳。",
  IIIb: "材料组 Ⅲb：100 ≤ CTI < 175。抗漏电起痕弱，爬电距离要求最大，设计上要谨慎；阻燃剂常把材料拉到这里。"
};
var INSUL_LABEL = {
  functional: "功能绝缘（教学简化按 0.8×，标准中需按失效后果单独查表）",
  basic: "基本绝缘",
  supplementary: "附加绝缘（数值与基本绝缘相同）",
  reinforced: "加强绝缘（按 2× 基本绝缘）"
};

var MATERIAL_GROUP = {
  PC: "IIIa", ABS: "II", PCABS: "IIIa", PMMA: "II",
  PA66: "II", PA66GF: "II", PBT: "II", PBTGF: "II", CERAMIC: "I",
  FR4: "IIIa", FR4HT: "IIIa", FR4CTI: "II", FR4HF: "IIIa",
  CEM: "IIIa", PI: "II", AL: "IIIa", ANODIZD: "I"
};

var CLS_INFO = {
  I: { label: "I 类（接地保护）", note: "结构：保护接地（PE）+ 基本绝缘。逻辑：即使基本绝缘失效，故障电流经接地回流触发保护，外壳不会长时间带电。关键测试：接地连续性、泄漏电流、耐压。典型：金属外壳家电、路灯、工业设备。" },
  II: { label: "II 类（双重绝缘）", note: "结构：基本 + 附加绝缘，或加强绝缘，不依赖保护接地。逻辑：任何单层绝缘失效后仍有第二道防护。关键测试：双重/加强绝缘耐压、泄漏电流。典型：塑料外壳充电器、适配器、电动工具。" },
  III: { label: "III 类（SELV）", note: "结构：由安全特低电压（SELV）供电，设备本身不接市电。逻辑：危险电压在适配器/电源侧被隔离，设备本体可触及。注意：SELV 定义必须成立（隔离 + 限压），否则 III 类名不副实。关键测试：适配器隔离、SELV 电压验证。" }
};

var INSUL_INFO = {
  functional: "功能绝缘：只保证设备正常工作，不提供防触电保护。教学简化按 0.8×；若功能绝缘失效会导致触电（如隔离作用），应提高到基本绝缘要求查表。",
  basic: "基本绝缘：防触电的第一道屏障，直接与带电部件接触，是查表的基准。",
  supplementary: "附加绝缘：基本绝缘失效后的第二道屏障，数值与基本绝缘相同。",
  reinforced: "加强绝缘：单层结构同时承担基本 + 附加的保护，工程上按 2× 基本绝缘；标准有专门表格时以专门表格为准。"
};

var MARKET_DATA = {
  cn: { label: "中国", v: 220, sys: 230, freq: "50Hz", plug: "A/C/I" },
  us: { label: "美国", v: 120, sys: 120, freq: "60Hz", plug: "A/B" },
  jp: { label: "日本", v: 100, sys: 120, freq: "50/60Hz", plug: "A/B" },
  eu: { label: "欧盟", v: 230, sys: 230, freq: "50Hz", plug: "C/E/F" },
  uk: { label: "英国", v: 230, sys: 230, freq: "50Hz", plug: "G" },
  au: { label: "澳大利亚", v: 230, sys: 230, freq: "50Hz", plug: "I" },
  kr: { label: "韩国", v: 220, sys: 230, freq: "60Hz", plug: "C/F" },
  in: { label: "印度", v: 230, sys: 230, freq: "50Hz", plug: "C/D" },
  br: { label: "巴西", v: 127, sys: 120, freq: "60Hz", plug: "C/N" },
  mx: { label: "墨西哥", v: 127, sys: 120, freq: "60Hz", plug: "A/B" },
  ca: { label: "加拿大", v: 120, sys: 120, freq: "60Hz", plug: "A/B" },
  ru: { label: "俄罗斯", v: 230, sys: 230, freq: "50Hz", plug: "C/F" },
  za: { label: "南非", v: 230, sys: 230, freq: "50Hz", plug: "M/N" },
  sg: { label: "新加坡", v: 230, sys: 230, freq: "50Hz", plug: "G" },
  sa: { label: "沙特", v: 230, sys: 230, freq: "60Hz", plug: "G" },
  custom: { label: "自定义", v: 0, sys: 0, freq: "", plug: "" }
};

// ===== 适用标准：灯具 / 医疗（两套产品标准，表格与判定逻辑都不同） =====
var STD_INFO = {
  luminaire: {
    key: "luminaire",
    name: "灯具",
    code: "GB 7000.1-2015 / IEC 60598-1",
    clause: "第 11 章 爬电距离和电气间隙",
    note: "灯具走产品标准自己的表：工作电压 + 绝缘类型（基本 / 附加 / 加强）+ 材料 PTI（≥600 / <600）+ 灯具 IP 分类 → 查表11.1（一般灯具，污染等级 2）或表11.2（IPX1 及以上，污染等级 3）。灯具表不按系统电压 / 过电压类别推算间隙，也不做海拔修正；表11.3 另给“正弦或非正弦脉冲电压”下的最小电气间隙。"
  },
  medical: {
    key: "medical",
    name: "医疗",
    code: "GB 9706.1-2020 / IEC 60601-1",
    clause: "8.7.3 电气间隙与爬电距离（表11 / 表12）",
    note: "医疗按“防护方式（MOPP / MOOP）+ 工作电压”查表：间隙不看系统电压与过电压类别，爬电也不是“通用表 ×2 倍”的算法。本工具按污染等级 2、材料组 IIIb（最不利）、海拔 ≤2000m 取 ≤250V 档（标准允许直接取上一档，偏保守）；工作电压 >250V 需按表11 / 表12 续档查表。"
  }
};

// 灯具：GB 7000.1 第 11 章（等同 IEC 60598-1）
// high = PTI ≥ 600（材料组 Ⅰ）；low = PTI < 600（175 ≤ PTI < 600）
var LUM_VOLT = [50, 150, 250, 500, 750, 1000];
var LUM_TABLE = {
  general: {
    name: "表11.1", scene: "一般灯具（污染等级 2）",
    creep: {
      high: { basic: [0.6, 1.4, 1.7, 3, 4, 5.5], supp: [null, 3.2, 3.6, 4.8, 6, 8], rein: [null, 5.5, 6.5, 9, 12, 14] },
      low: { basic: [1.2, 1.6, 2.5, 5, 8, 10], supp: [null, 3.2, 3.6, 5, 8, 10], rein: [null, 5.5, 6.5, 9, 12, 14] }
    },
    clear: { basic: [0.2, 1.4, 1.7, 3, 4, 5.5], supp: [null, 3.2, 3.6, 4.8, 6, 8], rein: [null, 5.5, 6.5, 9, 12, 14] }
  },
  ipx1: {
    name: "表11.2", scene: "IPX1 及以上灯具（污染等级 3）",
    creep: {
      high: { basic: [1.5, 2, 3.2, 6.3, 10, 12.5], supp: [null, 3.2, 4, 8, 12.5, 16], rein: [null, 5.5, 6.5, 9, 12.5, 16] },
      low: { basic: [1.9, 2.5, 4, 8, 12.5, 16], supp: [null, 3.2, 4, 8, 12.5, 16], rein: [null, 5.5, 6.5, 9, 12.5, 16] }
    },
    clear: { basic: [0.8, 1.5, 3, 4, 5.5, 8], supp: [null, 3.2, 3.6, 4.8, 6, 8], rein: [null, 5.5, 6.5, 9, 12, 14] }
  }
};
var INS_LUM_LABEL = {
  functional: "功能绝缘（按基本绝缘从严）",
  basic: "基本绝缘",
  supplementary: "附加绝缘",
  reinforced: "加强绝缘"
};
var INS_LUM_KEY = { functional: "basic", basic: "basic", supplementary: "supp", reinforced: "rein" };

// 医疗：GB 9706.1 / IEC 60601-1 表11（间隙）/ 表12（爬电）
// 取值条件：工作电压 ≤250V、污染等级 2、材料组 IIIb、海拔 ≤2000m
var MED_MOP = {
  "1MOOP": { label: "1 × MOOP（操作者基本防护）", creep: 2.5, clear: 2.0, iso: "1500 V AC" },
  "2MOOP": { label: "2 × MOOP（操作者双重防护）", creep: 5.0, clear: 4.0, iso: "3000 V AC" },
  "1MOPP": { label: "1 × MOPP（患者基本防护）", creep: 4.0, clear: 2.5, iso: "1500 V AC" },
  "2MOPP": { label: "2 × MOPP（患者双重 / 加强防护）", creep: 8.0, clear: 5.0, iso: "4000 V AC" }
};
// 2 × MOPP 高工作电压参考点（材料组 IIIb、污染等级 2），用于提示 >250V 时的量级
var MED_CREEP_REF = [3.4, 4.0, 6.0, 8.0, 16.0, 21.0];
var MED_CREEP_REF_V = [12, 30, 125, 250, 500, 660];

var PRESETS = {
  luminaire: { std: "luminaire", v: 250, ip: "general", gp: "IIIa", ins: "basic", alt: 2000, cls: "I", mkt: "custom" },
  medical: { std: "medical", v: 250, mop: "2MOPP", gp: "IIIb", ins: "reinforced", alt: 2000, cls: "I", mkt: "custom" }
};


function $(id) {
  return document.getElementById(id);
}

function fmt(val) {
  return (Math.round(val * 100) / 100).toFixed(val >= 10 ? 1 : 2);
}

function getActive(containerId, attr) {
  var el = document.querySelector("#" + containerId + " .opt-btn.active");
  return el ? el.getAttribute(attr) : null;
}

// 参数组可能被隐藏或移除：取不到时用默认值，避免读到 null
function optVal(containerId, attr, fallback) {
  var v = getActive(containerId, attr);
  return (v === null || v === undefined) ? fallback : v;
}

function setActive(containerId, attr, value) {
  document.querySelectorAll("#" + containerId + " .opt-btn").forEach(function (btn) {
    var on = btn.getAttribute(attr) === value;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function bindGroup(containerId, attr) {
  document.querySelectorAll("#" + containerId + " .opt-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setActive(containerId, attr, btn.getAttribute(attr));
      updateAll();
    });
  });
}

function creepageValue(voltage, pollution, group) {
  function at(v) {
    var row = CREEPAGE_DATA[v][pollution];
    return pollution === 1 ? row.ALL : row[group];
  }
  if (voltage <= VOLT_POINTS[0]) return at(VOLT_POINTS[0]);
  if (voltage >= VOLT_POINTS[VOLT_POINTS.length - 1]) return at(VOLT_POINTS[VOLT_POINTS.length - 1]);
  for (var i = 0; i < VOLT_POINTS.length - 1; i++) {
    var a = VOLT_POINTS[i];
    var b = VOLT_POINTS[i + 1];
    if (voltage >= a && voltage <= b) {
      var t = (voltage - a) / (b - a);
      return at(a) + (at(b) - at(a)) * t;
    }
  }
  return at(250);
}

function currentState() {
  return {
    std: getActive("stdGroup", "data-std") || "luminaire",
    ip: getActive("ipGroup", "data-ip") || "general",
    lumMode: getActive("lumModeGroup", "data-lummode") || "std",
    lumPd: getActive("lumPdGroup", "data-lumpd") || "2",
    mop: getActive("mopGroup", "data-mop") || "2MOPP",
    v: Number($("vSlider").value),
    gp: optVal("gpGroup", "data-gp", "IIIa"),
    ins: optVal("insGroup", "data-ins", "basic"),
    alt: Number($("altSlider").value),
    cls: getActive("clsGroup", "data-cls") || "I",
    mkt: $("marketSelect").value
  };
}

function applyState(s) {
  if (s.std) setActive("stdGroup", "data-std", s.std);
  if (s.ip) setActive("ipGroup", "data-ip", s.ip);
  setActive("lumModeGroup", "data-lummode", s.lumMode || "std");
  setActive("lumPdGroup", "data-lumpd", s.lumPd || "2");
  if (s.mop) setActive("mopGroup", "data-mop", s.mop);
  if (s.gp) setActive("gpGroup", "data-gp", s.gp);
  if (s.ins) setActive("insGroup", "data-ins", s.ins);
  if (s.cls) setActive("clsGroup", "data-cls", s.cls);
  $("vSlider").value = s.v;
  $("altSlider").value = s.alt;
  if (s.mkt) $("marketSelect").value = s.mkt;
  var mq = $("materialQuick"); if (mq) mq.value = "";
  applyStdUI();
  updateAll();
}

// ===== 灯具查表（GB 7000.1 第 11 章）=====
function lumColumn(v) {
  for (var i = 0; i < LUM_VOLT.length; i++) { if (v <= LUM_VOLT[i]) return i; }
  return LUM_VOLT.length - 1;
}

// 表格档位之间“取不小于工作电压的最小档”；该档为空时向后顺延
function lumPick(series, i) {
  for (var k = i; k < series.length; k++) {
    if (series[k] !== null && series[k] !== undefined) return { val: series[k], v: LUM_VOLT[k] };
  }
  for (var j = i - 1; j >= 0; j--) {
    if (series[j] !== null && series[j] !== undefined) return { val: series[j], v: LUM_VOLT[j] };
  }
  return { val: null, v: null };
}

// 选表：标准做法按灯具分类；高级模式按手动指定的污染等级映射
function lumTableKey(s) {
  if (s.lumMode === "manual") return (s.lumPd === "3" || s.lumPd === "4") ? "ipx1" : "general";
  return s.ip === "ipx1" ? "ipx1" : "general";
}

function calcLuminaire(s) {
  var tableKey = lumTableKey(s);
  var t = LUM_TABLE[tableKey];
  var pti = s.gp === "I" ? "high" : "low";
  var ptiLabel = s.gp === "I" ? "PTI ≥ 600（材料组 Ⅰ）" : "PTI < 600（材料组 " + s.gp + "）";
  var insKey = INS_LUM_KEY[s.ins] || "basic";
  var col = lumColumn(s.v);
  var cr = lumPick(t.creep[pti][insKey], col);
  var cl = lumPick(t.clear[insKey], col);
  var basis = s.lumMode === "manual"
    ? "选表方式：高级 · 按污染等级手动指定 PD" + (s.lumPd || "2") + " → " + t.name
    : "选表方式：按灯具分类 = " + (tableKey === "ipx1" ? "IPX1 及以上" : "一般灯具") + " → " + t.name;
  var warn = "";
  if (s.v > 1000) warn = "工作电压超过 1000V，超出表11.1 / 表11.2 范围，需按标准特殊评估。";
  if (s.gp === "IIIb") warn = "材料组 Ⅲb（100 ≤ CTI < 175）：多数灯具标准要求支撑带电部件的绝缘件通过第 13.4 条耐起痕试验（175V），该材料可能不满足，选材前请先核对。" + (warn ? " " + warn : "");
  if (s.lumMode === "manual") {
    var pdm = s.lumPd || "2";
    var modeWarn = "🔴 当前为「按污染等级」手动选表（PD" + pdm + " → " + t.name + "）：GB 7000.1 第 11 章要求按灯具分类选表（一般灯具 → 表11.1，IPX1 及以上 → 表11.2），手动方式属自行判断，认证时须回到标准做法并在技术文件中说明依据。";
    if (pdm === "1") modeWarn += " 表11.1 / 表11.2 都没有 PD1 列，此处仍按表11.1 取值，不能作为按 PD1 放宽的依据。";
    if (pdm === "4") modeWarn += " 表11.1 / 表11.2 都没有 PD4 列，此处按表11.2 取值仍不足以覆盖持久导电污染，必须先降低绝缘处的污染。";
    warn = modeWarn + (warn ? " " + warn : "");
  }
  return {
    std: "luminaire",
    cr: cr.val,
    cl: cl.val,
    crBadge: "GB 7000.1 " + t.name,
    clBadge: "GB 7000.1 " + t.name,
    crNote: "查表：GB 7000.1 / IEC 60598-1 " + t.name + "（" + t.scene + "）· " + basis + " · 爬电距离 · " + INS_LUM_LABEL[s.ins] + " · " + ptiLabel + " · 工作电压 " + s.v + "V → 取 " + cr.v + "V 档 = " + fmt(cr.val) + " mm。",
    clNote: "查表：GB 7000.1 / IEC 60598-1 " + t.name + " · " + basis + " · 电气间隙 · " + INS_LUM_LABEL[s.ins] + " · 工作电压 " + s.v + "V → 取 " + cl.v + "V 档 = " + fmt(cl.val) + " mm（灯具表按表格固定条件，不做海拔修正）。",
    warn: warn
  };
}

// ===== 医疗查表（GB 9706.1 8.7.3）=====
function calcMedical(s) {
  var m = MED_MOP[s.mop] || MED_MOP["2MOPP"];
  var factor = ALTITUDE_DATA[s.alt] || 1;
  var cl = m.clear * factor;
  var warn = "";
  if (s.v > 250) {
    warn = "工作电压 " + s.v + "V 超过 250V 档：此处按 ≤250V 档给出的是下限参考，请按 GB 9706.1 表11 / 表12 续档查表并向上取整。参考点（2×MOPP、材料组 Ⅲb、污染等级 2）：500V 爬电 16.0mm、660V 爬电 21.0mm、590V 间隙 12.0mm。";
  }
  var lowRef = (s.mop === "2MOPP" && s.v < 250)
    ? "（2×MOPP 其它工作电压档参考：12V 爬电 3.4mm、30V 4.0mm、125V 6.0mm）"
    : "";
  return {
    std: "medical",
    cr: m.creep,
    cl: cl,
    crBadge: "GB 9706.1 表12",
    clBadge: "GB 9706.1 表11",
    crNote: "查表：GB 9706.1 / IEC 60601-1 表12（最小爬电距离）· " + m.label + " · 工作电压 " + s.v + "V → 取 ≤250V 档（250V 行）· 污染等级 2 · 材料组 Ⅲb → " + fmt(m.creep) + " mm" + lowRef + "。",
    clNote: "查表：GB 9706.1 / IEC 60601-1 表11（最小电气间隙）· " + m.label + " · 工作电压 " + s.v + "V → 取 ≤250V 档 → " + fmt(m.clear) + " mm" + (factor > 1 ? " × 海拔系数 " + fmt(factor) + " = " + fmt(cl) + " mm" : "（海拔 ≤2000m，不修正）") + "。",
    warn: warn
  };
}

// 当前计算结果（供 PCB 判定、对比、复制、导出共用）
var currentCalc = null;
var SPACING_STD = "luminaire";

// ===== 与“污染等级判定器”联动：读环境判定结果，提示与所用表格是否匹配 =====
function envPd() {
  try {
    var raw = localStorage.getItem("angui-pd");
    if (!raw) return null;
    var o = JSON.parse(raw);
    if (!o || typeof o.pd !== "number" || o.pd < 1 || o.pd > 4) return null;
    return o;
  } catch (e) { return null; }
}

function envMatchText(env, isMed, s) {
  if (!env) return "";
  if (isMed) {
    if (env.pd <= 2) return "与医疗表（污染等级 2）匹配 ✓";
    return "⚠ 高于医疗表的取值条件（污染等级 2）";
  }
  var key = lumTableKey(s);
  if (key === "ipx1") {
    if (env.pd <= 3) return "与表11.2（污染等级 3）匹配 ✓";
    return "⚠ PD4 超出表格范围";
  }
  if (env.pd <= 2) return "与表11.1（污染等级 2）匹配 ✓";
  return "⚠ 与表11.1（污染等级 2）不匹配，应改查表11.2";
}

function envWarnText(env, isMed, s) {
  if (!env) return "";
  if (isMed) {
    if (env.pd >= 3) return "环境判定为 PD" + env.pd + "：GB 9706.1 表11 / 表12 的取值条件是污染等级 2；实际环境更严时，必须先用外壳 / 密封把绝缘处的微观环境降到 2 级，或按标准的特殊条款评估。";
    if (env.pd === 1) return "环境判定为 PD1：GB 9706.1 表11 / 表12 按污染等级 2 给出，能否按 PD1 放宽须核对标准相应条款；本工具仍按 PD2 取值（偏保守）。";
    return "";
  }
  if (lumTableKey(s) === "general") {
    if (env.pd >= 3) return "环境判定为 PD" + env.pd + "：该环境应把灯具分类做到 IPX1 及以上并查表11.2（污染等级 3）；结构做不到时，需用密封 / 涂覆等把绝缘处的微观环境降下来（IEC 60664-3）。";
    return "";
  }
  if (env.pd >= 4) return "环境判定为 PD4（持久导电污染）：灯具表不提供 PD4 数值，必须先降低绝缘处的污染再查表。";
  return "";
}

// 单独刷新“环境判定”一行：污染等级判定器改选后立即回显（不必等下次拖动滑块）
function renderEnvPdNote() {
  var env = envPd();
  var s = currentState();
  var isMed = SPACING_STD === "medical";

  var el = $("envPdNote");
  if (el) {
    el.innerHTML = env
      ? "🔍 环境判定：<b>PD" + env.pd + "</b>（污染等级判定器） · <a href=\"./tools.html#tool-pd\" data-goto-tool=\"pd\">重新判定 →</a><br>" + envMatchText(env, isMed, s)
      : "🔍 使用环境属于几级污染？先做 <a href=\"./tools.html#tool-pd\" data-goto-tool=\"pd\">污染等级判定（PD1–PD4）→</a>，判定结果会自动联动到这里。";
  }

  // 灯具：把“环境判定 → 该查哪张表”写在选表按钮下面
  var ipEl = $("ipMatchNote");
  if (ipEl) ipEl.innerHTML = ipMatchHtml(env, s);

  // 医疗：环境判定与表11 / 表12 取值条件是否一致
  var mopEl = $("mopMatchNote");
  if (mopEl) mopEl.innerHTML = isMed ? mopMatchHtml(env, s) : "";
}

function ipMatchHtml(env, s) {
  if (s.lumMode === "manual") {
    var key = lumTableKey(s);
    var base = "🔴 已启用高级模式：按污染等级 PD" + (s.lumPd || "2") + " 手动选表 → " + LUM_TABLE[key].name + "（灯具分类按钮已停用）。";
    if (env) {
      var envKey = env.pd >= 3 ? "ipx1" : "general";
      base += envKey === key
        ? " 与环境判定 PD" + env.pd + " 一致。"
        : " ⚠ 但环境判定为 PD" + env.pd + "（对应 " + LUM_TABLE[envKey].name + "），与手动选择不一致，建议按更严者取值。";
    } else {
      base += " 建议先做环境判定，便于交叉核对。";
    }
    return base;
  }
  if (!env) {
    return "🔍 还没做环境判定：<a href=\"./tools.html#tool-pd\" data-goto-tool=\"pd\">先判污染等级 →</a>，判定结果会建议该按表11.1 还是表11.2。";
  }
  if (env.pd >= 4) {
    return "🔍 环境判定 <b>PD4</b>：超出表11.1 / 表11.2 的范围（标准只给到污染等级 3）——必须先用密封腔、灌封、排水、除湿等把绝缘处的污染降到 PD3 及以下，再查表。";
  }
  if (env.pd === 3) {
    if (s.ip === "ipx1") return "🔍 环境判定 <b>PD3</b> → 与表11.2（污染等级 3）一致 ✓";
    return "🔍 环境判定 <b>PD3</b> → 应查表11.2（污染等级 3）：需把灯具分类做到 IPX1 及以上。<a href=\"#\" data-pd-apply-ip=\"ipx1\">按判定改用表11.2 →</a>";
  }
  if (s.ip === "general") return "🔍 环境判定 <b>PD" + env.pd + "</b> → 与表11.1（污染等级 2）一致 ✓";
  return "🔍 环境判定 <b>PD" + env.pd + "</b> → 表11.1（污染等级 2）已足够；当前用的是表11.2（更保守）。<a href=\"#\" data-pd-apply-ip=\"general\">按判定改用表11.1 →</a>";
}

function mopMatchHtml(env, s) {
  if (!env) return "";
  if (env.pd >= 3) return "🔍 环境判定 <b>PD" + env.pd + "</b>：高于表11 / 表12 的取值条件（污染等级 2）——需先用外壳 / 密封把绝缘处的微观环境降到 PD2，或按标准的特殊条款评估。";
  if (env.pd === 1) return "🔍 环境判定 <b>PD1</b>：能否按 PD1 放宽须核对标准相应条款；当前按 PD2 取值（偏保守）。";
  return "🔍 环境判定 <b>PD2</b> → 与表11 / 表12 的取值条件一致 ✓";
}

// 按标准显示 / 隐藏只对某一标准有意义的参数
function applyStdUI() {
  var med = currentState().std === "medical";
  function show(id, on) {
    var el = document.getElementById(id);
    if (el) el.style.display = on ? "" : "none";
  }
  show("tool-lum-ip", !med);
  show("tool-med-mop", med);
  show("tool-cti", !med);
  show("tool-insulation", !med);
  show("tool-altitude", med);
}

// 高级模式（按污染等级手动选表）的界面联动
function syncLumModeUI() {
  var s = currentState();
  var manual = s.lumMode === "manual";
  var wrap = document.getElementById("lumManualWrap");
  if (wrap) wrap.style.display = manual ? "" : "none";
  var adv = document.getElementById("lumAdvanced");
  if (adv && manual) adv.open = true;
  // 手动模式下停用“灯具分类”按钮，避免两个互相冲突的输入同时生效
  document.querySelectorAll("#ipGroup .opt-btn").forEach(function (b) {
    b.disabled = manual;
    b.style.opacity = manual ? "0.45" : "";
  });
  var noteEl = document.getElementById("lumModeNote");
  if (noteEl) {
    noteEl.innerHTML = manual
      ? "⚠ 当前：<b>高级 · 按污染等级手动选表</b>（PD" + (s.lumPd || "2") + " → " + LUM_TABLE[lumTableKey(s)].name + "）——偏离 GB 7000.1 的选表规则，仅用于方案比较 / 早期估算。"
      : "";
  }
  var pdNoteEl = document.getElementById("lumPdNote");
  if (pdNoteEl) {
    var env = envPd();
    pdNoteEl.textContent = "映射：PD1 / PD2 → 表11.1（污染等级 2）；PD3 / PD4 → 表11.2（污染等级 3）。表里没有 PD1 与 PD4 列，选这两项会按更保守的表取值并给出风险提示。" +
      (env ? " 当前环境判定：PD" + env.pd + "。" : "");
  }
}

function updateAll() {
  var s = currentState();
  SPACING_STD = s.std === "medical" ? "medical" : "luminaire";
  var isMed = SPACING_STD === "medical";
  var info = STD_INFO[SPACING_STD];
  var res = isMed ? calcMedical(s) : calcLuminaire(s);
  currentCalc = res;

  var stdNoteEl = $("stdNote");
  if (stdNoteEl) stdNoteEl.innerHTML = "<b>" + info.code + " · " + info.clause + "</b><br>" + info.note;

  // 污染等级判定器的联动（环境判定 → 与当前表格是否匹配）
  var env = envPd();
  var envWarn = envWarnText(env, isMed, s);
  if (envWarn) res.warn = res.warn ? envWarn + "　" + res.warn : envWarn;
  renderEnvPdNote();

  $("vValue").textContent = s.v + " V";
  var vInputEl = $("vInput"); if (vInputEl) vInputEl.value = s.v;
  $("vPeak").textContent = isMed
    ? "医疗表11 / 表12 按工作电压（交流有效值或直流值）查表；不按峰值换算。"
    : "峰值 ≈ " + Math.round(s.v * Math.SQRT2) + " V；表11.1 / 表11.2 按正弦有效值查表，峰值不直接参与（脉冲电压另见表11.3）。";
  $("altValue").textContent = s.alt + " m";
  var altInputEl = $("altInput"); if (altInputEl) altInputEl.value = s.alt;
  var vInfoEl = $("vInfo");
  if (vInfoEl) vInfoEl.textContent = isMed
    ? "医疗：按 GB 9706.1 8.7.3 查表11（电气间隙）/ 表12（爬电距离），表值按工作电压与 MOPP / MOOP 数量分档。"
    : "灯具：按 GB 7000.1 第 11 章查表11.1 / 表11.2，表值按工作电压、绝缘类型与材料 PTI 分栏。";

  $("clsNote").textContent = CLS_INFO[s.cls] ? CLS_INFO[s.cls].note : "";

  var gpNoteEl = $("gpNote");
  if (gpNoteEl) {
    gpNoteEl.textContent = s.gp === "I"
      ? "材料组 Ⅰ（CTI ≥ 600）→ 灯具表按 PTI ≥ 600 一栏取值。"
      : "材料组 " + s.gp + " → 灯具表按 PTI < 600 一栏取值（灯具表只有 PTI ≥ 600 与 PTI < 600 两栏）。";
  }
  var insNoteEl = $("insNote");
  if (insNoteEl) insNoteEl.textContent = INSUL_INFO[s.ins] || "";

  var ipNoteEl = $("lumIpNote");
  if (ipNoteEl) {
    ipNoteEl.textContent = s.ip === "ipx1"
      ? "按 IPX1 及以上灯具查表11.2：污染等级 3，所有绝缘按过电压类别 Ⅱ。"
      : "按一般灯具查表11.1：污染等级 2，基本绝缘按过电压类别 Ⅰ，附加 / 加强按 Ⅱ。";
  }
  var mopNoteEl = $("mopNote");
  if (mopNoteEl) {
    var m = MED_MOP[s.mop] || MED_MOP["2MOPP"];
    mopNoteEl.textContent = m.label + "：工作电压 ≤250V 时爬电 " + fmt(m.creep) + " mm / 间隙 " + fmt(m.clear) + " mm；对应绝缘耐压 " + m.iso + "。";
  }
  var sysNoteEl = $("sysNote"); if (sysNoteEl) sysNoteEl.textContent = "";

  var market = MARKET_DATA[s.mkt];
  if (market && s.mkt !== "custom") {
    $("mktNote").textContent =
      "目标市场：" + market.label + " " + market.v + "V / " + market.freq + "（插头 " + market.plug + "）→ 工作电压取 " + market.v + "V。";
  } else {
    $("mktNote").textContent = "自定义：手动拖动工作电压；结果按“取不小于工作电压的最小表格档”给出，比插值保守。";
  }

  var isIII = s.cls === "III";
  var extra = isIII && !isMed ? "　·　Ⅲ 类由 SELV 供电：SELV 内部电路豁免，此处为到危险电路侧的参考距离。" : "";
  if ($("crBadge")) $("crBadge").textContent = res.crBadge;
  if ($("clBadge")) $("clBadge").textContent = res.clBadge;
  $("crValue").textContent = fmt(res.cr);
  $("clValue").textContent = fmt(res.cl);
  var milEl = document.getElementById("crMil");
  if (milEl) milEl.textContent = "≈ " + Math.round(res.cr * 39.3701) + " mil";
  var clMil = document.getElementById("clMil");
  if (clMil) clMil.textContent = "≈ " + Math.round(res.cl * 39.3701) + " mil";
  $("crNote").innerHTML = res.crNote + extra +
    (res.warn ? '<br><b style="color:var(--danger,#c0392b)">⚠ ' + res.warn + "</b>" : "");
  $("clNote").textContent = res.clNote;

  var req = Math.max(res.cr, res.cl);
  $("crBar").style.width = Math.min(100, (res.cr / req) * 100) + "%";
  $("clBar").style.width = Math.min(100, (res.cl / req) * 100) + "%";
  $("crBarLabel").textContent = "爬电距离 " + fmt(res.cr) + " mm";
  $("clBarLabel").textContent = "电气间隙 " + fmt(res.cl) + " mm";
  $("governLabel").textContent = info.name + "要求同时满足，当前由" + (res.cr >= res.cl ? "爬电距离" : "电气间隙") + "决定";

  renderCompareTable(s, res);
  syncLumModeUI();
  renderPcb(res.cr, res.cl);
  updateStatus();
  updateUrl();
}

// 同屏对比表：灯具按绝缘类型，医疗按 MOPP / MOOP 数量
function renderCompareTable(s, res) {
  var head = document.getElementById("insCompareHead");
  var body = document.getElementById("insCompareBody");
  if (!head || !body) return;
  var noteEl = document.getElementById("insCompareNote");
  if (SPACING_STD === "medical") {
    head.innerHTML = "<tr><th>防护方式</th><th>爬电距离</th><th>电气间隙</th><th>绝缘耐压示例</th></tr>";
    body.innerHTML = ["1MOPP", "2MOPP", "1MOOP", "2MOOP"].map(function (k) {
      var m = MED_MOP[k];
      var on = k === s.mop;
      return "<tr" + (on ? ' style="font-weight:700"' : "") + "><td>" + (on ? "▶ " : "") + m.label + "</td><td>" + fmt(m.creep) + " mm</td><td>" + fmt(m.clear) + " mm</td><td>" + m.iso + "</td></tr>";
    }).join("");
    if (noteEl) noteEl.textContent = "医疗同屏对比按 GB 9706.1 / IEC 60601-1 表11 / 表12（工作电压 ≤250V、污染等级 2、材料组 Ⅲb）；实际工作电压与材料组不同时以标准原文表格为准。";
    return;
  }
  head.innerHTML = "<tr><th>绝缘类型</th><th>爬电距离</th><th>电气间隙</th><th>说明</th></tr>";
  var t = LUM_TABLE[lumTableKey(s)];
  var pti = s.gp === "I" ? "high" : "low";
  var col = lumColumn(s.v);
  var rows = [
    { k: "basic", label: "基本绝缘", d: "第一道防触电" },
    { k: "supp", label: "附加绝缘", d: "基本绝缘失效后的第二道" },
    { k: "rein", label: "加强绝缘", d: "一层顶两道（标准另给数值，不是 2 倍）" }
  ];
  body.innerHTML = rows.map(function (r) {
    var cr = lumPick(t.creep[pti][r.k], col);
    var cl = lumPick(t.clear[r.k], col);
    var on = INS_LUM_KEY[s.ins] === r.k;
    return "<tr" + (on ? ' style="font-weight:700"' : "") + "><td>" + (on ? "▶ " : "") + "<b>" + r.label + "</b></td><td>" + fmt(cr.val) + " mm</td><td>" + fmt(cl.val) + " mm</td><td>" + r.d + "</td></tr>";
  }).join("");
  if (noteEl) noteEl.textContent = "灯具同屏对比按 GB 7000.1 " + t.name + "（" + t.scene + "）" + (s.lumMode === "manual" ? "（高级：按污染等级 PD" + (s.lumPd || "2") + " 手动选表）" : "") + "，" + (s.gp === "I" ? "PTI ≥ 600" : "PTI < 600") + " 一栏；数值为标准表格档位值，正式设计以标准原文为准。";
}


function renderPcb(cr, cl) {
  var req = Math.max(cr, cl);
  var scale = Math.min(70, 260 / req);
  var gap = req * scale;
  var left = 70;
  var top = 78;
  var padW = 130;
  var padH = 110;
  var right = left + padW + gap;
  var x1 = left + padW;
  var x2 = right;
  var midY = top + padH / 2;

  var actual = parseFloat($("actualInput").value);
  var status = actualStatus(cr, cl, actual);
  var lineClass = actual === null || isNaN(actual) ? "" : status.cls;

  var svg =
    '<svg viewBox="0 0 640 260" role="img" aria-label="PCB 间距可视化">' +
      '<rect x="' + left + '" y="' + top + '" width="' + padW + '" height="' + padH + '" rx="10" class="pad"></rect>' +
      '<text x="' + (left + padW / 2) + '" y="' + (midY + 5) + '" text-anchor="middle">走线 A</text>' +
      '<rect x="' + right + '" y="' + top + '" width="' + padW + '" height="' + padH + '" rx="10" class="pad"></rect>' +
      '<text x="' + (right + padW / 2) + '" y="' + (midY + 5) + '" text-anchor="middle">走线 B</text>' +
      '<line x1="' + x1 + '" y1="' + midY + '" x2="' + x2 + '" y2="' + midY + '" class="gap-line ' + lineClass + '"></line>' +
      '<polygon points="' + x1 + ',' + midY + ' ' + (x1 + 10) + ',' + (midY - 5) + ' ' + (x1 + 10) + ',' + (midY + 5) + '" fill="currentColor" style="color:var(--accent)"></polygon>' +
      '<polygon points="' + x2 + ',' + midY + ' ' + (x2 - 10) + ',' + (midY - 5) + ' ' + (x2 - 10) + ',' + (midY + 5) + '" fill="currentColor" style="color:var(--accent)"></polygon>' +
      '<text x="' + ((x1 + x2) / 2) + '" y="' + (midY - 12) + '" text-anchor="middle">≥ ' + fmt(req) + ' mm</text>' +
      '<text x="' + ((x1 + x2) / 2) + '" y="' + (midY + 24) + '" text-anchor="middle" class="label">爬电 ' + fmt(cr) + ' / 间隙 ' + fmt(cl) + '，取最大</text>';

  if (!isNaN(actual)) {
    var ax = left + padW + Math.min(actual, req * 2) * scale;
    svg +=
      '<line x1="' + ax + '" y1="' + (top - 12) + '" x2="' + ax + '" y2="' + (top + padH + 12) + '" class="actual-line"></line>' +
      '<text x="' + ax + '" y="' + (top - 20) + '" text-anchor="middle" class="label">实际 ' + fmt(actual) + ' mm</text>';
  }

  svg += "</svg>";
  $("pcbSvg").innerHTML = svg;
}

function actualStatus(cr, cl, actual) {
  var req = Math.max(cr, cl);
  if (actual === null || isNaN(actual)) {
    return { cls: "", text: "在下方输入你的实际间距，自动判断是否达标。" };
  }
  if (actual < req) {
    return {
      cls: "bad",
      text: "不足：实际 " + fmt(actual) + " mm < 要求 " + fmt(req) + " mm。建议开槽/加挡墙、换高 CTI 材料或重新布局增大间距。"
    };
  }
  if (actual < req * 1.1) {
    return {
      cls: "warn",
      text: "临界：仅高于要求 " + fmt(actual) + " / " + fmt(req) + " mm，建议留 10% 以上余量，覆盖公差与工艺偏差。"
    };
  }
  return {
    cls: "ok",
    text: "达标：实际 " + fmt(actual) + " mm ≥ " + fmt(req) + " mm（含 10% 余量）。正式设计仍请核对标准原文。"
  };
}

function updateStatus() {
  var res = currentCalc || { cr: 0, cl: 0 };
  var st = actualStatus(res.cr, res.cl, parseFloat($("actualInput").value));
  var box = $("statusBox");
  box.className = "status-box" + (st.cls ? " " + st.cls : "");
  box.textContent = st.text;
}

function currentShareUrl() {
  var s = currentState();
  var q = new URLSearchParams({
    std: s.std, v: s.v, ip: s.ip, lm: s.lumMode, lpd: s.lumPd, mop: s.mop, gp: s.gp,
    ins: s.ins, alt: s.alt, cls: s.cls, mkt: s.mkt
  });
  var path = location.pathname + "?" + q.toString() + (location.hash || "");
  var base = /^https?:/.test(location.protocol) ? location.origin : "";
  return base + path;
}

function updateUrl() {
  // 仅同步地址栏（分享/刷新可还原参数），不再把网址常显到页面
  var s = currentState();
  var q = new URLSearchParams({
    std: s.std, v: s.v, ip: s.ip, lm: s.lumMode, lpd: s.lumPd, mop: s.mop, gp: s.gp,
    ins: s.ins, alt: s.alt, cls: s.cls, mkt: s.mkt
  });
  var path = location.pathname + "?" + q.toString() + (location.hash || "");
  try {
    history.replaceState(null, "", path);
  } catch (e) {
    // file:// 等场景下忽略
  }
}

function copyLink() {
  var text = currentShareUrl();
  function done() {
    var btn = $("copyBtn");
    btn.textContent = "已复制";
    setTimeout(function () { btn.textContent = "复制参数链接"; }, 1800);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    done();
  }
}

function applyPreset(key) {
  var p = PRESETS[key];
  if (!p) return;
  applyState({
    std: p.std, v: p.v, ip: p.ip, lumMode: "std", lumPd: "2", mop: p.mop, gp: p.gp,
    ins: p.ins, alt: p.alt, cls: p.cls, mkt: p.mkt
  });
}

function initFromUrl() {
  var q = new URLSearchParams(location.search);
  var state = currentState();
  if (q.has("std") && STD_INFO[q.get("std")]) state.std = q.get("std");
  if (q.has("ip") && LUM_TABLE[q.get("ip")]) state.ip = q.get("ip");
  if (q.has("lm") && ["std", "manual"].indexOf(q.get("lm")) !== -1) state.lumMode = q.get("lm");
  if (q.has("lpd") && ["1", "2", "3", "4"].indexOf(q.get("lpd")) !== -1) state.lumPd = q.get("lpd");
  if (q.has("mop") && MED_MOP[q.get("mop")]) state.mop = q.get("mop");
  if (q.has("v")) state.v = Math.min(600, Math.max(50, Number(q.get("v"))));
  if (q.has("gp") && ["I", "II", "IIIa", "IIIb"].indexOf(q.get("gp")) !== -1) state.gp = q.get("gp");
  if (q.has("ins") && ["functional", "basic", "supplementary", "reinforced"].indexOf(q.get("ins")) !== -1) state.ins = q.get("ins");
  if (q.has("alt") && ALTITUDE_DATA[Number(q.get("alt"))]) state.alt = Number(q.get("alt"));
  if (q.has("cls") && ["I", "II", "III"].indexOf(q.get("cls")) !== -1) state.cls = q.get("cls");
  if (q.has("mkt") && MARKET_DATA[q.get("mkt")]) state.mkt = q.get("mkt");
  applyState(state);
}

// 事件绑定
$("vSlider").addEventListener("input", function () { updateAll(); });
var vInputEl2 = $("vInput");
if (vInputEl2) vInputEl2.addEventListener("input", function () {
  var v = Number(this.value);
  if (isNaN(v)) return;
  $("vSlider").value = Math.min(600, Math.max(50, v));
  updateAll();
});
$("altSlider").addEventListener("input", function () { updateAll(); });
var altInputEl2 = $("altInput");
if (altInputEl2) altInputEl2.addEventListener("input", function () {
  var a = Number(this.value);
  if (isNaN(a)) return;
  $("altSlider").value = Math.min(10000, Math.max(2000, a));
  updateAll();
});
$("actualInput").addEventListener("input", function () {
  var res = currentCalc || { cr: 0, cl: 0 };
  renderPcb(res.cr, res.cl);
  updateStatus();
});

document.querySelectorAll("[data-v]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    $("vSlider").value = btn.getAttribute("data-v");
    updateAll();
  });
});

bindGroup("gpGroup", "data-gp");
bindGroup("insGroup", "data-ins");
bindGroup("ipGroup", "data-ip");
bindGroup("mopGroup", "data-mop");
bindGroup("lumPdGroup", "data-lumpd");

// 选表方式切换：按灯具分类（标准）↔ 按污染等级（高级）
document.querySelectorAll("#lumModeGroup .opt-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    setActive("lumModeGroup", "data-lummode", btn.getAttribute("data-lummode"));
    updateAll();
  });
});

// 联动：从间距工具跳到“污染等级判定器”；或按环境判定直接改用对应表格
document.addEventListener("click", function (e) {
  if (!e.target || !e.target.closest) return;
  var go = e.target.closest("[data-goto-tool]");
  if (go) {
    e.preventDefault();
    if (typeof switchTool === "function") switchTool(go.getAttribute("data-goto-tool"));
    return;
  }
  var apply = e.target.closest("[data-pd-apply-ip]");
  if (apply) {
    e.preventDefault();
    setActive("ipGroup", "data-ip", apply.getAttribute("data-pd-apply-ip"));
    applyStdUI();
    updateAll();
  }
});

// 切换适用标准：显示 / 隐藏只对某一标准有意义的参数
document.querySelectorAll("#stdGroup .opt-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    setActive("stdGroup", "data-std", btn.getAttribute("data-std"));
    applyStdUI();
    updateAll();
  });
});

// 产品类别特殊联动
document.querySelectorAll("#clsGroup .opt-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var cls = btn.getAttribute("data-cls");
    setActive("clsGroup", "data-cls", cls);
    if (cls === "III") {
      $("vSlider").value = 50;
    }
    if (cls === "II" && getActive("insGroup", "data-ins") === "basic" && currentState().std !== "medical") {
      setActive("insGroup", "data-ins", "reinforced");
    }
    updateAll();
  });
});

// 目标市场联动：只带入工作电压（系统电压/OVC 不参与灯具/医疗查表）
$("marketSelect").addEventListener("change", function () {
  var m = MARKET_DATA[this.value];
  if (m && this.value !== "custom") {
    $("vSlider").value = Math.min(600, Math.max(50, m.v));
  }
  updateAll();
});

document.querySelectorAll("[data-preset]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    applyPreset(btn.getAttribute("data-preset"));
  });
});

$("materialQuick").addEventListener("change", function () {
  var g = MATERIAL_GROUP[this.value];
  if (g) setActive("gpGroup", "data-gp", g);
  updateAll();
});

$("copyBtn").addEventListener("click", copyLink);

// ===== 输入悬浮说明 =====
var HELP = {
  "tool-standard": "灯具与医疗是两套不同的产品标准：表格与判定逻辑都不同，先选标准再填参数",
  "tool-product-class": "I 类：接地 + 基本绝缘；II 类：双重/加强绝缘；III 类：SELV 供电",
  "tool-working-voltage": "绝缘实际承受的最高持续电压（交流有效值；医疗也允许按直流值查表）",
  "tool-lum-ip": "一般灯具查表11.1（污染等级 2）；IPX1 及以上查表11.2（污染等级 3）",
  "tool-med-mop": "医疗按 MOPP / MOOP 数量查表11（电气间隙）与表12（爬电距离）",
  "tool-market-voltage": "目标市场只用来快速带入工作电压；系统电压 / 过电压类别不参与本工具",
  "tool-cti": "灯具表只有 PTI ≥ 600 与 PTI < 600 两栏：材料组 Ⅰ → ≥600，其余 → <600",
  "tool-insulation": "灯具对基本 / 附加 / 加强绝缘分别给值，不能按 2 倍估算",
  "tool-altitude": "仅医疗：电气间隙按海拔修正（爬电距离不修正）；灯具表不修正"
};
document.querySelectorAll(".param-block").forEach(function (sec) {
  var tip = HELP[sec.id];
  if (!tip) return;
  var h2 = sec.querySelector("h2");
  if (h2) h2.setAttribute("title", tip + "（数值以标准原文表格为准）");
});

// ===== 设计选型历史对比 =====
var spacingHistory = [];
function addCompare() {
  var s = currentState();
  var res = currentCalc || (SPACING_STD === "medical" ? calcMedical(s) : calcLuminaire(s));
  var params;
  if (SPACING_STD === "medical") {
    var m = MED_MOP[s.mop] || MED_MOP["2MOPP"];
    params = "医疗 · " + m.label + " · " + s.v + "V · 海拔 " + s.alt + "m";
  } else {
    var t = LUM_TABLE[lumTableKey(s)];
    params = "灯具 " + t.name + " · " + s.v + "V · " + (INS_LUM_LABEL[s.ins] || s.ins) + " · " + (s.gp === "I" ? "PTI≥600" : "PTI<600") + (s.lumMode === "manual" ? " · 高级:PD" + (s.lumPd || "2") + "手动选表" : "");
  }
  spacingHistory.push({ params: params, cr: res.cr, cl: res.cl });
  renderCompare();
}
function renderCompare() {
  var wrap = document.getElementById("compareWrap");
  var body = document.getElementById("compareBody");
  if (!wrap || !body) return;
  if (!spacingHistory.length) { wrap.hidden = true; return; }
  wrap.hidden = false;
  body.innerHTML = spacingHistory.map(function (h, i) {
    return "<tr><td>" + (i + 1) + "</td><td>" + h.params + "</td><td>" + fmt(h.cr) + " mm</td><td>" + fmt(h.cl) + " mm</td></tr>";
  }).join("");
}
function clearCompare() { spacingHistory = []; renderCompare(); }
var cmpAdd = document.getElementById("compareAddBtn");
if (cmpAdd) cmpAdd.addEventListener("click", addCompare);
var cmpClear = document.getElementById("compareClearBtn");
if (cmpClear) cmpClear.addEventListener("click", clearCompare);

initFromUrl();
