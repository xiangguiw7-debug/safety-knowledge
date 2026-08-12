// ===== 简化教学数据（正式设计请查标准原文） =====
var VOLT_POINTS = [50, 125, 250, 400, 600];

var CREEPAGE_DATA = {
  50: {
    1: { ALL: 0.6 },
    2: { I: 0.8, II: 1.0, IIIa: 1.2, IIIb: 1.2 },
    3: { I: 1.2, II: 1.4, IIIa: 1.6, IIIb: 1.6 }
  },
  125: {
    1: { ALL: 0.8 },
    2: { I: 1.2, II: 1.5, IIIa: 2.0, IIIb: 2.0 },
    3: { I: 2.0, II: 2.5, IIIa: 3.2, IIIb: 3.2 }
  },
  250: {
    1: { ALL: 1.0 },
    2: { I: 2.0, II: 2.5, IIIa: 3.2, IIIb: 3.2 },
    3: { I: 3.2, II: 4.0, IIIa: 5.0, IIIb: 5.0 }
  },
  400: {
    1: { ALL: 1.4 },
    2: { I: 3.2, II: 4.0, IIIa: 5.0, IIIb: 5.0 },
    3: { I: 5.0, II: 6.3, IIIa: 8.0, IIIb: 8.0 }
  },
  600: {
    1: { ALL: 2.0 },
    2: { I: 5.0, II: 6.0, IIIa: 8.0, IIIb: 8.0 },
    3: { I: 8.0, II: 10.0, IIIa: 12.5, IIIb: 12.5 }
  }
};

var CLEARANCE_DATA = {
  500: 0.2, 800: 0.5, 1000: 0.8, 1500: 1.0, 2000: 1.5,
  2500: 2.0, 3000: 2.5, 4000: 3.0, 5000: 4.0, 6000: 5.5,
  8000: 8.0, 10000: 11.0, 12000: 14.0
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
  PA66: "II", PA66GF: "II", PBT: "II", PBTGF: "II", CERAMIC: "I"
};

var CLS_INFO = {
  I: { label: "I 类（接地保护）", note: "结构：保护接地（PE）+ 基本绝缘。逻辑：即使基本绝缘失效，故障电流经接地回流触发保护，外壳不会长时间带电。关键测试：接地连续性、泄漏电流、耐压。典型：金属外壳家电、路灯、工业设备。" },
  II: { label: "II 类（双重绝缘）", note: "结构：基本 + 附加绝缘，或加强绝缘，不依赖保护接地。逻辑：任何单层绝缘失效后仍有第二道防护。关键测试：双重/加强绝缘耐压、泄漏电流。典型：塑料外壳充电器、适配器、电动工具。" },
  III: { label: "III 类（SELV）", note: "结构：由安全特低电压（SELV）供电，设备本身不接市电。逻辑：危险电压在适配器/电源侧被隔离，设备本体可触及。注意：SELV 定义必须成立（隔离 + 限压），否则 III 类名不副实。关键测试：适配器隔离、SELV 电压验证。" }
};

var INSUL_INFO = {
  functional: "功能绝缘：只保证设备正常工作，不提供防触电保护。数值可按失效后果单独确定（本站教学简化按 0.8×）。",
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

var PRESETS = {
  smps: { label: "230V 电源初次级", v: 250, sys: 230, ovc: "II", pd: 2, gp: "IIIa", ins: "reinforced", alt: 2000, cls: "II", mkt: "custom" },
  outdoor: { label: "户外路灯", v: 250, sys: 230, ovc: "III", pd: 3, gp: "IIIa", ins: "basic", alt: 2000, cls: "I", mkt: "custom" },
  medical: { label: "医疗外壳（MOPP）", v: 250, sys: 230, ovc: "II", pd: 2, gp: "I", ins: "reinforced", alt: 2000, cls: "II", mkt: "custom" },
  industrial: { label: "工业现场 400V", v: 400, sys: 400, ovc: "III", pd: 3, gp: "IIIa", ins: "basic", alt: 2000, cls: "I", mkt: "custom" },
  automotive: { label: "车规 48V 低压", v: 50, sys: 120, ovc: "III", pd: 3, gp: "IIIa", ins: "basic", alt: 5000, cls: "III", mkt: "custom" }
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
    v: Number($("vSlider").value),
    sys: Number(getActive("sysGroup", "data-sys")),
    ovc: getActive("ovcGroup", "data-ovc"),
    pd: Number(getActive("pdGroup", "data-pd")),
    gp: getActive("gpGroup", "data-gp"),
    ins: getActive("insGroup", "data-ins"),
    alt: Number($("altSlider").value),
    cls: getActive("clsGroup", "data-cls"),
    mkt: $("marketSelect").value
  };
}

function applyState(s) {
  $("vSlider").value = s.v;
  $("altSlider").value = s.alt;
  setActive("sysGroup", "data-sys", String(s.sys));
  setActive("ovcGroup", "data-ovc", s.ovc);
  setActive("pdGroup", "data-pd", String(s.pd));
  setActive("gpGroup", "data-gp", s.gp);
  setActive("insGroup", "data-ins", s.ins);
  setActive("clsGroup", "data-cls", s.cls);
  $("marketSelect").value = s.mkt;
  $("materialQuick").value = "";
  updateAll();
}

function updateAll() {
  var s = currentState();
  var mult = INSUL_MULT[s.ins] || 1;
  var clsNote = CLS_INFO[s.cls] ? CLS_INFO[s.cls].note : "";
  var isIII = s.cls === "III";

  $("vValue").textContent = s.v + " V";
  $("vPeak").textContent = "峰值 ≈ " + Math.round(s.v * Math.SQRT2) + " V（间隙按峰值/冲击查表）";
  $("altValue").textContent = s.alt + " m";
  var pNoteEl = $("pNote"); if (pNoteEl) pNoteEl.textContent = PD_INFO[s.pd] || "";
  var sysNoteEl = $("sysNote"); if (sysNoteEl) sysNoteEl.textContent = SYS_INFO[s.sys] || "";
  var vInfoEl = $("vInfo"); if (vInfoEl) vInfoEl.textContent = VOLT_INFO;
  var gpNoteEl = $("gpNote"); if (gpNoteEl) gpNoteEl.textContent = GP_INFO[s.gp] || "";
  $("clsNote").textContent = clsNote;
  var insNoteEl = $("insNote");
  if (insNoteEl) insNoteEl.textContent = INSUL_INFO[s.ins] || "";

  var market = MARKET_DATA[s.mkt];
  if (market && s.mkt !== "custom") {
    $("mktNote").textContent =
      "目标市场：" + market.label + " " + market.v + "V / " + market.freq + "（插头 " + market.plug + "）→ 系统按 " + market.sys + "V 档";
  } else {
    $("mktNote").textContent = "自定义：手动选择系统电压与工作电压。";
  }

  var exact = VOLT_POINTS.indexOf(s.v) !== -1;
  var crBase = creepageValue(s.v, s.pd, s.gp);
  var cr = crBase * mult;
  $("crValue").textContent = fmt(cr);
  $("crNote").textContent =
    (exact ? "查表值" : "相邻档位线性插值估算") +
    "：" + fmt(crBase) + " mm × " + fmt(mult) + "（" + INSUL_LABEL[s.ins] + "）" +
    " · 污染等级 " + s.pd + " · 材料组 " + s.gp +
    (isIII ? "；III 类设备此值仅作参考" : "");

  var impulse = IMPULSE_DATA[s.sys][s.ovc];
  var clBase = CLEARANCE_DATA[impulse];
  var factor = ALTITUDE_DATA[s.alt];
  var cl = clBase * mult * factor;
  $("clImpulse").textContent = impulse;
  $("clValue").textContent = fmt(cl);
  $("clNote").textContent =
    s.sys + " V 系统 · 过电压类别 " + s.ovc + " → 冲击耐受 " + impulse + " V；" +
    "海拔 " + s.alt + " m 系数 " + fmt(factor) + "，基准 " + fmt(clBase) + " mm × " + fmt(mult) +
    (isIII ? "；III 类设备此值仅作参考" : "");

  var req = Math.max(cr, cl);
  $("crBar").style.width = Math.min(100, (cr / req) * 100) + "%";
  $("clBar").style.width = Math.min(100, (cl / req) * 100) + "%";
  $("crBarLabel").textContent = "爬电距离 " + fmt(cr) + " mm";
  $("clBarLabel").textContent = "电气间隙 " + fmt(cl) + " mm";
  $("governLabel").textContent = "设计必须同时满足，当前由" + (cr >= cl ? "爬电距离" : "电气间隙") + "决定";

  renderPcb(cr, cl);
  updateStatus();
  updateUrl();
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
  var s = currentState();
  var mult = INSUL_MULT[s.ins] || 1;
  var cr = creepageValue(s.v, s.pd, s.gp) * mult;
  var cl = CLEARANCE_DATA[IMPULSE_DATA[s.sys][s.ovc]] * mult * ALTITUDE_DATA[s.alt];
  var st = actualStatus(cr, cl, parseFloat($("actualInput").value));
  var box = $("statusBox");
  box.className = "status-box" + (st.cls ? " " + st.cls : "");
  box.textContent = st.text;
}

function updateUrl() {
  var s = currentState();
  var q = new URLSearchParams({
    v: s.v, sys: s.sys, ovc: s.ovc, pd: s.pd, gp: s.gp,
    ins: s.ins, alt: s.alt, cls: s.cls, mkt: s.mkt
  });
  var path = location.pathname + "?" + q.toString() + (location.hash || "");
  try {
    history.replaceState(null, "", path);
  } catch (e) {
    // file:// 等场景下忽略
  }
  var base = /^https?:/.test(location.protocol) ? location.origin : "";
  $("shareUrl").textContent = base + path;
}

function copyLink() {
  var text = $("shareUrl").textContent;
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
  applyState({
    v: p.v, sys: p.sys, ovc: p.ovc, pd: p.pd, gp: p.gp,
    ins: p.ins, alt: p.alt, cls: p.cls, mkt: p.mkt
  });
}

function initFromUrl() {
  var q = new URLSearchParams(location.search);
  var state = currentState();
  if (q.has("v")) state.v = Math.min(600, Math.max(50, Number(q.get("v"))));
  if (q.has("sys") && IMPULSE_DATA[Number(q.get("sys"))]) state.sys = Number(q.get("sys"));
  if (q.has("ovc") && ["I", "II", "III", "IV"].indexOf(q.get("ovc")) !== -1) state.ovc = q.get("ovc");
  if (q.has("pd") && [1, 2, 3].indexOf(Number(q.get("pd"))) !== -1) state.pd = Number(q.get("pd"));
  if (q.has("gp") && ["I", "II", "IIIa", "IIIb"].indexOf(q.get("gp")) !== -1) state.gp = q.get("gp");
  if (q.has("ins") && ["functional", "basic", "supplementary", "reinforced"].indexOf(q.get("ins")) !== -1) state.ins = q.get("ins");
  if (q.has("alt") && ALTITUDE_DATA[Number(q.get("alt"))]) state.alt = Number(q.get("alt"));
  if (q.has("cls") && ["I", "II", "III"].indexOf(q.get("cls")) !== -1) state.cls = q.get("cls");
  if (q.has("mkt") && MARKET_DATA[q.get("mkt")]) state.mkt = q.get("mkt");
  applyState(state);
}

// 事件绑定
$("vSlider").addEventListener("input", function () { updateAll(); });
$("altSlider").addEventListener("input", function () { updateAll(); });
$("actualInput").addEventListener("input", function () {
  var s = currentState();
  var mult = INSUL_MULT[s.ins] || 1;
  renderPcb(
    creepageValue(s.v, s.pd, s.gp) * mult,
    CLEARANCE_DATA[IMPULSE_DATA[s.sys][s.ovc]] * mult * ALTITUDE_DATA[s.alt]
  );
  updateStatus();
});

document.querySelectorAll("[data-v]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    $("vSlider").value = btn.getAttribute("data-v");
    updateAll();
  });
});

bindGroup("sysGroup", "data-sys");
bindGroup("ovcGroup", "data-ovc");
bindGroup("pdGroup", "data-pd");
bindGroup("gpGroup", "data-gp");
bindGroup("insGroup", "data-ins");

// 产品类别特殊联动
document.querySelectorAll("#clsGroup .opt-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var cls = btn.getAttribute("data-cls");
    setActive("clsGroup", "data-cls", cls);
    if (cls === "III") {
      $("vSlider").value = 50;
    }
    if (cls === "II" && getActive("insGroup", "data-ins") === "basic") {
      setActive("insGroup", "data-ins", "reinforced");
    }
    updateAll();
  });
});

// 目标市场联动
$("marketSelect").addEventListener("change", function () {
  var m = MARKET_DATA[this.value];
  if (m && this.value !== "custom") {
    setActive("sysGroup", "data-sys", String(m.sys));
    $("vSlider").value = m.v;
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

initFromUrl();
