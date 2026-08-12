var WS_PRODUCTS = {
  charger: { name: "5V/2A USB 充电器", icon: "🔌", safety: "IEC 62368-1 / GB 4943.1", emc: "CISPR 32 + IEC 61000-3-2", env: "RoHS / ErP", v: 250, pd: 2, gp: "IIIa", ins: "reinforced", creep: 6.4, clear: 4.0, hipot: "3000 V AC（加强，示例）", tests: ["耐压", "泄漏电流", "温升", "传导/辐射发射", "谐波", "浪涌", "RoHS"] },
  lamp: { name: "LED 台灯", icon: "💡", safety: "IEC 60598-1 + IEC 61347 + IEC 62471", emc: "CISPR 15 + IEC 61000-3-2", env: "RoHS / ErP", v: 250, pd: 2, gp: "IIIa", ins: "basic", creep: 3.2, clear: 2.0, hipot: "按标准表格（示例 1500 V AC 基本）", tests: ["耐压", "泄漏电流", "温升", "IP 防护", "光生物安全", "谐波", "传导发射"] },
  speaker: { name: "智能音箱", icon: "🔊", safety: "IEC 62368-1 + RED", emc: "CISPR 32 / 35 + RED", env: "RoHS / WEEE", v: 250, pd: 2, gp: "IIIa", ins: "basic", creep: 3.2, clear: 2.0, hipot: "1500 V AC（基本，示例）", tests: ["耐压", "泄漏电流", "温升", "无线射频", "SAR", "ESD", "辐射发射"] },
  bpm: { name: "电子血压计", icon: "🩺", safety: "IEC 60601-1 + IEC 60601-1-2", emc: "IEC 60601-1-2", env: "RoHS（按豁免）", v: 250, pd: 2, gp: "I", ins: "reinforced", creep: 4.0, clear: 4.0, hipot: "2 MOPP 示例 4000 V AC", tests: ["患者漏电流", "耐压", "接地阻抗", "风险管理", "EMC 全套"] },
  evcc: { name: "充电桩控制器", icon: "🔋", safety: "IEC 61851 / GB/T 18487", emc: "IEC 61000-6 系列", env: "RoHS", v: 400, pd: 3, gp: "IIIa", ins: "basic", creep: 8.0, clear: 5.5, hipot: "按高压标准", tests: ["高压绝缘耐压", "温升", "IP 防护", "浪涌", "连接器寿命"] },
  cleaning: { name: "洗地机", icon: "🧹", safety: "IEC 60335-1 + 2-2 / 2-10 等", emc: "CISPR 14", env: "RoHS", v: 250, pd: 2, gp: "IIIa", ins: "basic", creep: 3.2, clear: 2.0, hipot: "按 60335 表格（示例 1500 V AC 基本）", tests: ["泄漏电流", "耐压", "异常运行", "IP", "电池"] },
  security: { name: "智能门锁", icon: "📹", safety: "IEC 62368-1 + PoE + EN 303 645", emc: "CISPR 32", env: "RoHS", v: 250, pd: 2, gp: "IIIa", ins: "basic", creep: 3.2, clear: 2.0, hipot: "1500 V AC（基本，示例）", tests: ["耐压", "浪涌", "IP", "网络安全", "电池"] }
};
var WS_MARKETS = {
  cn: { name: "中国", cert: "CCC / CQC + GB 标准", note: "型式试验 + 工厂检查" },
  eu: { name: "欧盟", cert: "CE（LVD + EMC + RED 等）", note: "技术文件 + 自我声明" },
  us: { name: "美国", cert: "FCC + UL（渠道）", note: "FCC 强制、UL 常为渠道要求" },
  global: { name: "全球", cert: "按目标国分别核对", note: "建议用认证向导逐国生成" }
};

// 自定义产品教学查表（与计算工具一致）
var CUSTOM_CREEP = {
  50: { 1: { ALL: 0.6 }, 2: { I: 0.8, II: 1.0, IIIa: 1.2, IIIb: 1.2 }, 3: { I: 1.2, II: 1.4, IIIa: 1.6, IIIb: 1.6 } },
  125: { 1: { ALL: 0.8 }, 2: { I: 1.2, II: 1.5, IIIa: 2.0, IIIb: 2.0 }, 3: { I: 2.0, II: 2.5, IIIa: 3.2, IIIb: 3.2 } },
  250: { 1: { ALL: 1.0 }, 2: { I: 2.0, II: 2.5, IIIa: 3.2, IIIb: 3.2 }, 3: { I: 3.2, II: 4.0, IIIa: 5.0, IIIb: 5.0 } },
  400: { 1: { ALL: 1.4 }, 2: { I: 3.2, II: 4.0, IIIa: 5.0, IIIb: 5.0 }, 3: { I: 5.0, II: 6.3, IIIa: 8.0, IIIb: 8.0 } },
  600: { 1: { ALL: 2.0 }, 2: { I: 5.0, II: 6.0, IIIa: 8.0, IIIb: 8.0 }, 3: { I: 8.0, II: 10.0, IIIa: 12.5, IIIb: 12.5 } }
};
var CUSTOM_VOLTS = [50, 125, 250, 400, 600];
var CUSTOM_CLEAR = { 500: 0.2, 800: 0.5, 1000: 0.8, 1500: 1.0, 2000: 1.5, 2500: 2.0, 3000: 2.5, 4000: 3.0, 5000: 4.0, 6000: 5.5, 8000: 8.0, 10000: 11.0, 12000: 14.0 };
var CUSTOM_IMPULSE = { 120: { I: 800, II: 1500, III: 2500, IV: 4000 }, 230: { I: 1500, II: 2500, III: 4000, IV: 6000 }, 400: { I: 2500, II: 4000, III: 6000, IV: 8000 } };
var CUSTOM_MULT = { functional: 0.8, basic: 1, supplementary: 1, reinforced: 2 };

var INDUSTRY_TO_WS = {
  power: "charger", powerbank: "charger", "portable-power": "charger",
  lighting: "lamp",
  consumer: "speaker", iot: "speaker", wearable: "speaker", server: "speaker", ict: "speaker", drone: "speaker", toy: "speaker",
  cleaning: "cleaning", security: "security",
  medical: "bpm",
  charging: "evcc", solar: "evcc", machinery: "evcc", automation: "evcc", robotics: "evcc", "low-voltage": "evcc", escooter: "evcc", battery: "evcc"
};

function $(id) { return document.getElementById(id); }
function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

var wsState = { product: "charger", market: "cn", step: 0, custom: false };
var WS_STEPS = ["选型与市场", "标准确定", "间距设计", "耐压与绝缘", "测试清单", "认证要求", "项目报告"];

function customCreep() {
  var v = Number($("wsV").value) || 250;
  var pd = Number($("wsPd").value) || 2;
  var gp = $("wsGp").value;
  var mult = CUSTOM_MULT[$("wsIns").value] || 1;
  function at(x) { var r = CUSTOM_CREEP[x][pd]; return (pd === 1 ? r.ALL : r[gp]) * mult; }
  if (v <= CUSTOM_VOLTS[0]) return at(CUSTOM_VOLTS[0]);
  if (v >= CUSTOM_VOLTS[CUSTOM_VOLTS.length - 1]) return at(CUSTOM_VOLTS[CUSTOM_VOLTS.length - 1]);
  for (var i = 0; i < CUSTOM_VOLTS.length - 1; i++) {
    if (v >= CUSTOM_VOLTS[i] && v <= CUSTOM_VOLTS[i + 1]) {
      var t = (v - CUSTOM_VOLTS[i]) / (CUSTOM_VOLTS[i + 1] - CUSTOM_VOLTS[i]);
      return at(CUSTOM_VOLTS[i]) + (at(CUSTOM_VOLTS[i + 1]) - at(CUSTOM_VOLTS[i])) * t;
    }
  }
  return at(250);
}

function customClear() {
  var sys = Number($("wsSys").value) || 230;
  var ovc = $("wsOvc").value || "II";
  var mult = CUSTOM_MULT[$("wsIns").value] || 1;
  var imp = CUSTOM_IMPULSE[sys][ovc];
  return { imp: imp, clear: CUSTOM_CLEAR[imp] * mult };
}

function wsProductInfo() {
  if (wsState.custom) {
    var cr = customCreep();
    var cl = customClear();
    var ins = $("wsIns").value;
    return {
      name: $("wsName").value || "自定义产品",
      icon: "🛠️",
      safety: "自定义：请用标准选择器确定（安全标准）",
      emc: "自定义：请用标准选择器确定（EMC 标准）",
      env: "自定义：请按目标市场核对环保要求",
      v: Number($("wsV").value) || 250,
      pd: Number($("wsPd").value) || 2,
      gp: $("wsGp").value,
      ins: ins,
      sys: Number($("wsSys").value) || 230,
      ovc: $("wsOvc").value,
      creep: cr,
      clear: cl.clear,
      hipot: ins === "reinforced" ? "按耐压速查器确定（62368 示例 3000 V AC 加强）" : "按耐压速查器确定（示例 1500 V AC 基本）",
      tests: ["耐压", "泄漏电流", "温升", "EMC 发射/抗扰", "环保合规"],
      custom: true
    };
  }
  return WS_PRODUCTS[wsState.product];
}

function wsRender() {
  var info = wsProductInfo();
  var m = WS_MARKETS[wsState.market];
  var box = $("wsContent");
  var html = "";

  if (wsState.step === 0) {
    html = '<p class="lead">选一个行业（可选）、虚拟产品或自定义参数，以及目标市场，系统带你走完“标准 → 间距 → 耐压 → 测试 → 认证 → 报告”全流程。</p>';
  } else if (wsState.step === 1) {
    if (info.custom) {
      html = '<div class="card"><h3>📚 自定义产品的标准怎么定</h3><p>先到<a href="./standard-picker.html">标准选择器</a>按产品分类选择安全 / EMC / 环保标准；需要行业参考时，用<a href="./industries.html">行业筛选</a>看该行业适用标准。</p></div>';
    } else {
      html = '<div class="grid grid-2">' +
        '<div class="card"><h3>🛡️ 安全标准</h3><p>' + info.safety + "</p></div>" +
        '<div class="card"><h3>📡 EMC 标准</h3><p>' + info.emc + "</p></div>" +
        '<div class="card"><h3>🌱 环保/能效</h3><p>' + info.env + "</p></div>" +
        '<div class="card"><h3>✅ 下一步</h3><p>到<a href="./standard-picker.html">标准选择器</a>核对细节。</p></div></div>';
    }
  } else if (wsState.step === 2) {
    var cond = info.custom
      ? "条件：工作电压 " + info.v + "V · 污染 " + info.pd + " · 材料组 " + info.gp + " · " + info.ins + "绝缘 · 系统 " + info.sys + "V · OVC " + info.ovc
      : "条件：工作电压 " + info.v + "V · 污染 " + info.pd + " · 材料组 " + info.gp + " · " + (info.ins === "reinforced" ? "加强" : "基本") + "绝缘";
    html = '<div class="grid grid-2">' +
      '<div class="card"><h3>📏 爬电距离</h3><p>' + cond + '</p><p class="value" style="font-size:30px;color:var(--accent)">≥ ' + info.creep.toFixed(1) + ' mm</p></div>' +
      '<div class="card"><h3>📏 电气间隙</h3><p>含过电压类别与海拔修正（教学值）</p><p class="value" style="font-size:30px;color:var(--accent)">≥ ' + info.clear.toFixed(1) + ' mm</p></div>' +
      '<div class="card"><h3>🧮 自己算一遍</h3><p>在<a href="./tools.html">计算工具</a>输入同样条件复现，并用反查模式验证。</p></div>' +
      '<div class="card"><h3>📐 结构落地</h3><p>参考<a href="./pcb-guidelines.html">PCB 安规设计指南</a>与<a href="./product-classes.html">类别结构图</a>。</p></div></div>';
  } else if (wsState.step === 3) {
    html = '<div class="grid grid-2">' +
      '<div class="card"><h3>⚡ 试验电压</h3><p>' + info.hipot + '</p><p>判据：无击穿/闪络，泄漏不超限；用<a href="./hipot.html">5 步法</a>核对。</p></div>' +
      '<div class="card"><h3>🧱 绝缘体系</h3><p>确认' + (info.ins === "reinforced" ? "加强/双重绝缘" : "基本绝缘") + '结构，检查层数与桥接（<a href="./double-insulation.html">判定页</a>）。</p></div></div>';
  } else if (wsState.step === 4) {
    html = '<div class="card"><h3>✅ 建议测试清单（' + info.name + "）</h3><p>" + info.tests.map(esc).join(" · ") + '</p><p class="peak-note">正式清单用<a href="./tools.html">测试清单生成器</a>按产品分类生成。</p></div>';
  } else if (wsState.step === 5) {
    html = '<div class="grid grid-2">' +
      '<div class="card"><h3>🌍 目标市场：' + m.name + "</h3><p>认证：<b>" + m.cert + "</b></p><p>" + m.note + '</p></div>' +
      '<div class="card"><h3>🔗 生成完整清单</h3><p>用<a href="./wizard.html">认证向导</a>生成国家 × 产品清单，用<a href="./certification.html">认证速查</a>核对标志。</p></div></div>';
  } else {
    html = '<div class="card" id="wsReport"><h3>📄 项目报告</h3>' +
      "<table><tr><th>产品</th><td>" + info.icon + " " + info.name + "</td></tr><tr><th>目标市场</th><td>" + m.name + "（" + m.cert + "）</td></tr>" +
      "<tr><th>安全标准</th><td>" + info.safety + "</td></tr><tr><th>EMC / 环保</th><td>" + info.emc + " / " + info.env + "</td></tr>" +
      "<tr><th>爬电 / 间隙</th><td>≥ " + info.creep.toFixed(1) + " / ≥ " + info.clear.toFixed(1) + " mm</td></tr><tr><th>耐压</th><td>" + info.hipot + "</td></tr>" +
      "<tr><th>测试清单</th><td>" + info.tests.join("、") + "</td></tr></table>" +
      '<p class="peak-note">教学项目报告，正式设计以标准原文和认证机构意见为准。</p></div>' +
      '<p><button type="button" class="btn btn-primary" onclick="window.print()">打印项目报告</button></p>';
  }
  box.innerHTML = html;
  $("wsStepLabel").textContent = "步骤 " + (wsState.step + 1) + " / " + WS_STEPS.length + "：" + WS_STEPS[wsState.step] + (info.custom ? "（自定义）" : "");
  $("wsBar").style.width = ((wsState.step + 1) / WS_STEPS.length * 100) + "%";
  $("wsPrev").disabled = wsState.step === 0;
  $("wsNext").textContent = wsState.step === WS_STEPS.length - 1 ? "完成" : "下一步 →";
}

function wsGo(delta) {
  wsState.step = Math.max(0, Math.min(WS_STEPS.length - 1, wsState.step + delta));
  wsRender();
}

function wsToggleCustom() {
  wsState.custom = $("wsCustom").checked;
  var fields = document.getElementById("wsCustomFields");
  if (fields) fields.hidden = !wsState.custom;
  if (wsState.custom && window.AnGuiUX) window.AnGuiUX.toast("已切换到自定义产品模式");
  wsState.step = 0;
  wsRender();
}

$("wsProduct").addEventListener("change", function () { wsState.product = this.value; wsState.step = 0; wsRender(); });
$("wsMarket").addEventListener("change", function () { wsState.market = this.value; wsState.step = 0; wsRender(); });
$("wsPrev").addEventListener("click", function () { wsGo(-1); });
$("wsNext").addEventListener("click", function () { if (wsState.step === WS_STEPS.length - 1) { wsGo(0); } else { wsGo(1); } });
var wsCustom = document.getElementById("wsCustom");
if (wsCustom) wsCustom.addEventListener("change", wsToggleCustom);
["wsName", "wsV", "wsPd", "wsGp", "wsIns", "wsSys", "wsOvc"].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) el.addEventListener("input", function () { if (wsState.custom) wsRender(); });
});

var wsIndSel = document.getElementById("wsIndustry");
if (wsIndSel && typeof INDUSTRIES !== "undefined") {
  INDUSTRIES.forEach(function (x) {
    var o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.icon + " " + x.name;
    wsIndSel.appendChild(o);
  });
  wsIndSel.addEventListener("change", function () {
    var mapped = INDUSTRY_TO_WS[this.value];
    if (mapped && !wsState.custom) {
      wsState.product = mapped;
      $("wsProduct").value = mapped;
      if (window.AnGuiUX) window.AnGuiUX.toast("已按行业带入虚拟产品");
    }
    wsState.step = 0;
    wsRender();
  });
  var qs = new URLSearchParams(location.search);
  var ind = qs.get("ind");
  if (ind && INDUSTRY_TO_WS[ind]) {
    wsIndSel.value = ind;
    wsState.product = INDUSTRY_TO_WS[ind];
    $("wsProduct").value = wsState.product;
  }
}
wsRender();
