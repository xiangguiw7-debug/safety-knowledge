// ===== 工具 Tab 切换（记忆上次选择） =====
var TOOL_TAB_KEY = "angui-tool-tab";
var TOOL_TABS = ["spacing", "hipot", "leakage", "discharge", "compare", "grounding", "selv", "thermal", "units", "testlist", "fuse", "glowwire", "battery", "envparams", "emcwave", "mech", "es", "toolmap"];
var TOOL_META = [
  { id: "spacing", name: "爬电 / 间隙", g: "防电击与绝缘", d: "正向、反查与双曲线图表" },
  { id: "hipot", name: "耐压速查", g: "防电击与绝缘", d: "多标准试验电压" },
  { id: "selv", name: "SELV / 绝缘", g: "防电击与绝缘", d: "限值判定与层数清单" },
  { id: "grounding", name: "接地连续性", g: "防电击与绝缘", d: "R=V/I 目标电阻" },
  { id: "discharge", name: "放电时间", g: "能量·热量·防火", d: "RC 泄放与插头预设" },
  { id: "thermal", name: "温升估算", g: "能量·热量·防火", d: "热阻 / 散热面积" },
  { id: "fuse", name: "保险丝选型", g: "能量·热量·防火", d: "1.25–1.5× 建议" },
  { id: "glowwire", name: "灼热丝档位", g: "能量·热量·防火", d: "550–850°C 向导" },
  { id: "battery", name: "电池能量", g: "能量·热量·防火", d: "Wh 计算" },
  { id: "leakage", name: "泄漏电流", g: "EMC · 环保 · 认证", d: "Y 电容正算与反算" },
  { id: "compare", name: "标准对照", g: "EMC · 环保 · 认证", d: "五标准一键对比" },
  { id: "testlist", name: "测试清单", g: "EMC · 环保 · 认证", d: "安全/EMC/环保项目" },
  { id: "units", name: "单位换算", g: "工程与试验", d: "mm/mil、dBµV、温度" },
  { id: "envparams", name: "试验参数", g: "工程与试验", d: "湿热/温循/盐雾" }
];
var RECENT_KEY = "angui-tool-recent";

function recordTab(tab) {
  if (tab === "toolmap") return;
  try {
    var arr = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    arr = arr.filter(function (x) { return x !== tab; });
    arr.unshift(tab);
    arr = arr.slice(0, 3);
    localStorage.setItem(RECENT_KEY, JSON.stringify(arr));
    renderRecent();
  } catch (e) { /* ignore */ }
}

function bindMap() {
  document.querySelectorAll("[data-open-tool]").forEach(function (b) {
    b.addEventListener("click", function () {
      switchTool(b.getAttribute("data-open-tool"));
    });
  });
}

function renderRecent() {
  var box = document.getElementById("recentTools");
  if (!box) return;
  var arr = [];
  try { arr = JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { /* ignore */ }
  box.innerHTML = arr.length
    ? arr.map(function (id) {
        var m = TOOL_META.filter(function (x) { return x.id === id; })[0];
        return m ? '<button type="button" class="btn" data-open-tool="' + id + '">' + m.name + "</button>" : "";
      }).join("")
    : '<span class="peak-note">还没有使用记录，点几个工具试试。</span>';
  bindMap();
}

function renderToolMap() {
  var box = document.getElementById("toolMap");
  if (!box) return;
  var q = (document.getElementById("toolSearch") || { value: "" }).value.trim().toLowerCase();
  var list = TOOL_META.filter(function (m) {
    return !q || (m.name + m.d + m.g).toLowerCase().indexOf(q) !== -1;
  });
  box.innerHTML = list.map(function (m) {
    return '<button type="button" class="map-card" data-open-tool="' + m.id + '">' +
      "<b>" + m.name + '</b><span>' + m.g + "</span><small>" + m.d + "</small></button>";
  }).join("");
  bindMap();
}

function switchTool(tab) {
  document.querySelectorAll("[data-tool-panel]").forEach(function (p) {
    p.hidden = p.getAttribute("data-tool-panel") !== tab;
  });
  document.querySelectorAll("[data-tool-tab]").forEach(function (b) {
    var on = b.getAttribute("data-tool-tab") === tab;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  recordTab(tab);
  try { localStorage.setItem(TOOL_TAB_KEY, tab); } catch (e) { /* ignore */ }
}

document.querySelectorAll("[data-tool-tab]").forEach(function (b) {
  b.addEventListener("click", function () {
    switchTool(b.getAttribute("data-tool-tab"));
  });
});

// ===== 正向 / 反查模式 =====
function switchCalcMode(mode) {
  var fwd = document.getElementById("forwardPanel");
  var rev = document.getElementById("reversePanel");
  if (fwd) fwd.hidden = mode !== "forward";
  if (rev) rev.hidden = mode !== "reverse";
  document.querySelectorAll("[data-calc-mode]").forEach(function (b) {
    var on = b.getAttribute("data-calc-mode") === mode;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.querySelectorAll("[data-calc-mode]").forEach(function (b) {
  b.addEventListener("click", function () {
    switchCalcMode(b.getAttribute("data-calc-mode"));
  });
});

// ===== 反查 =====
function reverseCreepage(d, pd, gp, ins) {
  var mult = INSUL_MULT[ins] || 1;
  var pts = VOLT_POINTS;
  var minV = creepageValue(pts[0], pd, gp) * mult;
  var maxV = creepageValue(pts[pts.length - 1], pd, gp) * mult;
  if (d < minV) return { v: null, msg: "距离不足：连 " + pts[0] + "V 档（" + fmt(minV) + " mm）都不满足。" };
  if (d >= maxV) return { v: pts[pts.length - 1], msg: "已达到教学表上限 " + pts[pts.length - 1] + "V 档（" + fmt(maxV) + " mm）。" };
  for (var i = 0; i < pts.length - 1; i++) {
    var a = pts[i], b = pts[i + 1];
    var da = creepageValue(a, pd, gp) * mult;
    var db = creepageValue(b, pd, gp) * mult;
    if (d >= da && d <= db) {
      var t = (d - da) / (db - da);
      var v = a + (b - a) * t;
      return { v: Math.round(v / 5) * 5, msg: "按相邻档位线性插值反查（教学简化）。" };
    }
  }
  return { v: null, msg: "无法反查，请检查输入。" };
}

function reverseClearance(d, alt, ins) {
  var mult = INSUL_MULT[ins] || 1;
  var factor = ALTITUDE_DATA[alt];
  var limit = d / (factor * mult);
  var keys = Object.keys(CLEARANCE_DATA).map(Number).sort(function (a, b) { return a - b; });
  var last = null;
  keys.forEach(function (k) { if (CLEARANCE_DATA[k] <= limit) last = k; });
  return last;
}

function factorOf(alt) { return ALTITUDE_DATA[alt] || 1; }

// ===== 反查图表：爬电 + 间隙双曲线 =====
var RV_SCENARIOS = [
  { label: "120V 消费电子 · 基本绝缘", v: 125, mult: 1 },
  { label: "230V 家电 · 基本绝缘", v: 250, mult: 1 },
  { label: "230V 电源初次级 · 加强绝缘", v: 250, mult: 2 },
  { label: "400V 工业 · 基本绝缘", v: 400, mult: 1 },
  { label: "600V 工业 · 基本绝缘", v: 600, mult: 1 }
];

function buildReverseChart(d, pd, gp, ins, alt, cr) {
  var svg = document.getElementById("rvChart");
  if (!svg) return;
  var mult = INSUL_MULT[ins] || 1;
  var factor = factorOf(alt);
  var req600 = creepageValue(600, pd, gp) * mult;
  var clearMax = 12000 * factor * mult;
  var maxD = Math.max(15, req600 * 1.15, d * 1.5, clearMax * 0.12);
  maxD = Math.ceil(maxD / 5) * 5;
  var maxV = 650;
  var maxI = 13000;
  var L = 46, B = 30, T = 14, R = 14;
  var W = 520, H = 260;
  var plotW = W - L - R;
  var plotH = H - T - B;
  function sx(mm) { return L + (mm / maxD) * plotW; }
  function sy(v) { return T + plotH - (v / maxV) * plotH; }

  var creepPts = [];
  for (var v = 0; v <= 600; v += 10) {
    var req = creepageValue(v, pd, gp) * mult;
    creepPts.push(sx(req).toFixed(1) + "," + sy(v).toFixed(1));
  }
  var clearPts = [];
  Object.keys(CLEARANCE_DATA).map(Number).sort(function (a, b) { return a - b; }).forEach(function (k) {
    var req = CLEARANCE_DATA[k] * factor * mult;
    clearPts.push(sx(req).toFixed(1) + "," + sy(k * 0.05).toFixed(1));
  });

  var yLabels = [0, 125, 250, 400, 600];
  var yGrid = yLabels.map(function (vv) {
    return '<line x1="' + L + '" y1="' + sy(vv) + '" x2="' + (W - R) + '" y2="' + sy(vv) + '" stroke="var(--border)" stroke-width="1"></line>' +
      '<text x="' + (L - 6) + '" y="' + (sy(vv) + 4) + '" text-anchor="end" class="label">' + vv + "</text>";
  }).join("");
  var xLabels = [];
  for (var x = 0; x <= maxD; x += 5) {
    xLabels.push('<text x="' + sx(x) + '" y="' + (H - 8) + '" text-anchor="middle" class="label">' + x + "</text>");
  }

  var cur = cr && cr.v !== null ? cr.v : 0;
  var curX = sx(d), curY = sy(cur);
  var mark = '<line x1="' + curX + '" y1="' + T + '" x2="' + curX + '" y2="' + (H - B) + '" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 4"></line>' +
    '<circle cx="' + curX + '" cy="' + curY + '" r="5" fill="var(--accent)"></circle>' +
    '<text x="' + curX + '" y="' + (curY - 10) + '" text-anchor="middle" class="label">当前 ' + fmt(d) + " mm → ≈ " + cur + " V</text>";

  var scenarios = RV_SCENARIOS.map(function (s) {
    var req = creepageValue(s.v, pd, gp) * s.mult;
    if (req > maxD) return "";
    return '<circle cx="' + sx(req) + '" cy="' + sy(s.v) + '" r="3.5" fill="var(--accent-2)"></circle>';
  }).join("");

  svg.innerHTML =
    '<line x1="' + L + '" y1="' + (H - B) + '" x2="' + (W - R) + '" y2="' + (H - B) + '" stroke="var(--border)" stroke-width="1.5"></line>' +
    '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (H - B) + '" stroke="var(--border)" stroke-width="1.5"></line>' +
    yGrid + xLabels.join("") +
    '<text x="' + (L + plotW / 2) + '" y="' + (H - 2) + '" text-anchor="middle" class="label">间距 (mm)</text>' +
    '<text x="16" y="' + (T + plotH / 2) + '" text-anchor="middle" class="label" transform="rotate(-90 16 ' + (T + plotH / 2) + ')">电压 (V / 冲击 1/20)</text>' +
    '<polyline points="' + creepPts.join(" ") + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"></polyline>' +
    '<polyline points="' + clearPts.join(" ") + '" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-dasharray="6 5" stroke-linejoin="round"></polyline>' +
    '<text x="' + (W - R) + '" y="' + (sy(430) - 4) + '" text-anchor="end" class="label">爬电（工作电压）</text>' +
    '<text x="' + (W - R) + '" y="' + (sy(300) - 2) + '" text-anchor="end" class="label">间隙（冲击×1/20）</text>' +
    scenarios + mark;
}

function renderScenarios(d, pd, gp, ins) {
  var box = document.getElementById("rvScenarios");
  if (!box) return;
  var mult = INSUL_MULT[ins] || 1;
  box.innerHTML = RV_SCENARIOS.map(function (s) {
    var req = creepageValue(s.v, pd, gp) * s.mult;
    var ok = d >= req;
    return '<div class="scenario-item ' + (ok ? "ok" : "no") + '">' +
      (ok ? "✓" : "✗") + " " + s.label + "：需要 " + fmt(req) + " mm" +
      (ok ? "（当前满足）" : "（差 " + fmt(req - d) + " mm）") + "</div>";
  }).join("");
}

function updateReverse() {
  var d = Number($("rvDist").value) || 0;
  var pd = Number($("rvPd").value);
  var gp = $("rvGp").value;
  var ins = $("rvIns").value;
  var alt = Number($("rvAlt").value);
  var sys = Number($("rvSys").value);
  var mult = INSUL_MULT[ins] || 1;
  var cr = reverseCreepage(d, pd, gp, ins);
  var imp = reverseClearance(d, alt, ins);
  var ovc = null;
  if (imp !== null) {
    ["IV", "III", "II", "I"].forEach(function (o) {
      if (IMPULSE_DATA[sys][o] <= imp && ovc === null) ovc = o;
    });
  }
  $("rvCreep").textContent = cr.v === null ? "--" : cr.v + " V";
  $("rvClear").textContent = imp === null ? "--" : imp + " V";
  $("rvOvc").textContent = ovc === null ? "--" : "类别 " + ovc;
  $("rvNote").textContent =
    "爬电：最大工作电压 " + (cr.v === null ? "不满足" : cr.v + " V") +
    "（" + cr.msg + "）　·　间隙：最大冲击耐受 " + (imp === null ? "不满足" : imp + " V") +
    "（含海拔 ×" + fmt(factorOf(alt)) + "、绝缘 ×" + fmt(mult) + "）" +
    (ovc ? "　·　" + sys + "V 系统下最多允许 " + ovc + "。" : "");
  buildReverseChart(d, pd, gp, ins, alt, cr);
  renderScenarios(d, pd, gp, ins);
}

// ===== 标准对照 =====
var COMPARE_STDS = [
  { id: "60335", label: "IEC 60335-1（家电）", clause: "第 29 章" },
  { id: "62368", label: "IEC 62368-1（IT/AV）", clause: "第 5.4 节" },
  { id: "60601", label: "IEC 60601-1（医疗）", clause: "第 8.7 节" },
  { id: "61010", label: "IEC 61010-1（测量控制）", clause: "对应表格" },
  { id: "60204", label: "IEC 60204-1（机械）", clause: "引用 IEC 60664-1" }
];

function updateCompare() {
  var v = Number($("cmpVolt").value);
  var pd = Number($("cmpPd").value);
  var gp = $("cmpGp").value;
  var ins = $("cmpIns").value;
  var sys = Number($("cmpSys").value);
  var ovc = $("cmpOvc").value;
  var mult = INSUL_MULT[ins] || 1;
  var creep = creepageValue(v, pd, gp) * mult;
  var impulse = IMPULSE_DATA[sys][ovc];
  var clear = CLEARANCE_DATA[impulse] * mult;
  $("cmpBody").innerHTML = COMPARE_STDS.map(function (s) {
    return "<tr><td>" + s.label + "</td><td>" + s.clause + "</td>" +
      '<td class="num">' + fmt(creep) + " mm</td><td class=\"num\">" + fmt(clear) + " mm</td>" +
      "<td>教学对照：按 IEC 60664-1 逻辑计算；正式设计以该标准表格为准</td></tr>";
  }).join("");
  $("cmpCond").textContent = "条件：工作电压 " + v + "V · 污染等级 " + pd + " · 材料组 " + gp +
    " · " + (ins === "reinforced" ? "加强绝缘" : ins === "supplementary" ? "附加绝缘" : ins === "functional" ? "功能绝缘（0.8×）" : "基本绝缘") +
    " · 系统 " + sys + "V · 过电压类别 " + ovc + "（冲击 " + impulse + "V）";
}

// ===== 接地 / SELV / 绝缘 =====
function updateGrounding() {
  var i = Number($("gndI").value) || 0;
  var v = Number($("gndV").value) || 0;
  var r = i > 0 ? v / i : 0;
  $("gndR").textContent = r.toFixed(r < 1 ? 3 : 2);
  var gndWarn = r > 0.1 ? " ⚠ 已超常见 0.1Ω 量级目标，正式按标准条款核对。" : (r > 0.05 ? " ⚠ 接近常见 0.1Ω 限值，建议留余量。" : "");
  $("gndNote").textContent = "目标电阻 = 允许电压降 / 测试电流 = " + v + "V / " + i + "A = " + r.toFixed(3) + " Ω。常见目标 0.1Ω 量级（教学示例，以标准条款为准）。" + gndWarn;
}

function updateSelv() {
  var type = $("selvType").value;
  var v = Number($("selvV").value) || 0;
  var limit = type === "ac" ? 50 : 120;
  var ok = v <= limit;
  $("selvResult").textContent = ok ? "在限值内" : "超出限值";
  $("selvResult").style.color = ok ? "var(--ok-fg)" : "var(--danger-fg)";
  var selvWarn = ok && v > limit * 0.9 ? " ⚠ 接近限值，注意纹波、容差与单一故障条件。" : "";
  $("selvNote").textContent = (type === "ac" ? "交流" : "直流") + " " + v + "V vs SELV 限值 " + limit + "V（教学参考，IEC 61140 思路）。电压不超只是必要条件：还必须有隔离变压器/等效隔离、与危险电路的绝缘距离、限压不破坏隔离。" + selvWarn;
}

var INSUL_ITEMS = 7;
function updateInsulChecklist() {
  var done = 0;
  var missing = [];
  var labels = [
    "已确定产品类别（I / II / III）", "已画出带电部件到可触及表面的绝缘路径",
    "每层绝缘的材料、厚度、耐压数据齐全", "基本与附加绝缘之间无导电桥接（螺钉/金属件）",
    "加强绝缘按 2× 基本或专门表格核对", "外壳开孔/缝隙不会短路绝缘路径",
    "绝缘材料 CTI、耐温、阻燃已确认"
  ];
  for (var i = 1; i <= INSUL_ITEMS; i++) {
    var el = document.getElementById("chk" + i);
    if (el && el.checked) { done += 1; } else { missing.push(labels[i - 1]); }
  }
  $("insulDone").textContent = done;
  $("insulNote").textContent = done === INSUL_ITEMS ? "清单全部完成：可以进入耐压与距离验证。" : "还缺：" + missing.join("；") + "。";
}

// ===== 泄漏电流：正算 + Y 电容反算 =====
function updateLeakage() {
  var cap = Number($("lkCap").value) || 0;
  var v = Number($("lkV").value) || 0;
  var f = Number($("lkF").value) || 0;
  var iMa = 2 * Math.PI * f * (cap * 1e-12) * v * 1000;
  $("lkResult").textContent = iMa.toFixed(iMa >= 10 ? 1 : 2);
  var lkWarn = iMa > 3.5 ? " ⚠ 已超 3.5mA 量级（常见异常/Ⅰ类固定式上限），正式按标准核对。" : (iMa > 0.5 ? " ⚠ 已超 0.5mA 量级（常见正常条件上限），正式按标准核对。" : "");
  $("lkNote").textContent = cap + " pF × " + v + " V × " + f + " Hz → 对地电流 ≈ " + iMa.toFixed(2) + " mA。教学估算（I = 2πfCV）；正式限值按 IEC 60990 与产品标准。" + lkWarn;
}

function updateYCap() {
  var limit = Number($("ycLimit").value) || 0;
  var v = Number($("ycV").value) || 0;
  var f = Number($("ycF").value) || 0;
  var c = f > 0 && v > 0 ? (limit / 1000) / (2 * Math.PI * f * v) * 1e12 : 0;
  $("ycResult").textContent = c >= 1000 ? (c / 1000).toFixed(2) + " nF" : c.toFixed(0) + " pF";
  $("ycNote").textContent = "按限值 " + limit + " mA 反推：最大 Y 电容总容量 ≈ " + c.toFixed(0) + " pF（教学估算，忽略测量网络与容差）。";
}

// ===== 温升估算 =====
function updateThermal() {
  var mode = $("thMode").value;
  var p = Number($("thP").value) || 0;
  var dT = 0;
  if (mode === "rth") {
    var rth = Number($("thRth").value) || 0;
    dT = p * rth;
  } else {
    var area = (Number($("thArea").value) || 0) / 10000;
    var h = 10;
    dT = area > 0 ? p / (h * area) : 0;
  }
  $("thResult").textContent = dT.toFixed(1);
  var thBase = Number($("thBase").value) || 25;
  var thWarn = dT > 60 ? " ⚠ 已超 60K，多数产品标准会判不合格，正式按条款核对。" : (dT > 40 ? " ⚠ 超过 40K 常见限值量级，正式按标准核对。" : "");
  $("thNote").textContent = (mode === "rth"
    ? "ΔT = P × Rth = " + p + " W × " + (Number($("thRth").value) || 0) + " K/W = " + dT.toFixed(1) + " K。"
    : "ΔT ≈ P / (h·A)，自然对流 h≈10 W/(m²·K)，面积 " + ((Number($("thArea").value) || 0) / 10000).toFixed(3) + " m² → " + dT.toFixed(1) + " K。") + " 基准环境 " + thBase + "°C → 教学换算部件温度约 " + (thBase + dT).toFixed(1) + "°C（正式以标准限值条款为准）。教学估算，正式以温升试验为准。" + thWarn;
}

// ===== 工程单位换算 =====
var uLock = false;
function unitFrom(id) {
  if (uLock) return;
  uLock = true;
  try {
    var v = Number($(id).value);
    if (id === "uMm") $("uMil").value = (v * 39.3701).toFixed(2);
    if (id === "uMil") $("uMm").value = (v / 39.3701).toFixed(3);
    if (id === "uUv") $("uDb").value = v > 0 ? (20 * Math.log10(v)).toFixed(1) : "";
    if (id === "uDb") $("uUv").value = (Math.pow(10, v / 20)).toFixed(1);
    if (id === "uC") $("uF").value = (v * 9 / 5 + 32).toFixed(1);
    if (id === "uF") $("uC").value = ((v - 32) * 5 / 9).toFixed(1);
  } finally { uLock = false; }
}

// ===== 测试项目清单生成器 =====
var TEST_MAP = {
  appliance: { name: "家用电器", safety: ["耐压", "泄漏电流", "温升", "接地连续性（Ⅰ类）", "异常运行"], emc: ["传导发射", "辐射发射", "ESD", "浪涌", "EFT"], env: ["RoHS", "REACH", "WEEE", "能效"] },
  itav: { name: "音视频 / IT", safety: ["耐压", "泄漏电流", "温升", "防火外壳"], emc: ["传导发射", "辐射发射", "ESD", "浪涌", "EFT"], env: ["RoHS", "WEEE", "ErP"] },
  lighting: { name: "灯具照明", safety: ["耐压", "泄漏电流", "温升", "IP 防护", "光生物安全"], emc: ["CISPR 15 传导", "辐射发射", "谐波", "ESD", "浪涌"], env: ["RoHS", "ErP 能效"] },
  power: { name: "电源充电器", safety: ["耐压", "泄漏电流", "温升", "异常短路"], emc: ["传导发射", "辐射发射", "谐波", "浪涌", "EFT"], env: ["RoHS", "ErP", "WEEE"] },
  battery: { name: "电池", safety: ["过充/过放", "外部短路", "跌落/挤压", "热冲击"], emc: ["—"], env: ["UN 38.3", "电池法规", "RoHS（如适用）"] },
  wireless: { name: "无线设备", safety: ["耐压", "SAR 评估", "射频合规"], emc: ["RED 发射", "RED 抗扰", "ESD", "浪涌"], env: ["RoHS", "WEEE"] },
  medical: { name: "医疗设备", safety: ["患者漏电流", "耐压", "接地阻抗", "风险管理"], emc: ["IEC 60601-1-2 全套"], env: ["RoHS（按豁免）"] },
  machinery: { name: "工业机械", safety: ["耐压", "接地连续性", "功能安全验证", "机械防护"], emc: ["IEC 61000-6-2/-6-4"], env: ["—"] },
  tools: { name: "电动工具", safety: ["耐压", "温升", "耐久", "机械防护"], emc: ["CISPR 14 传导/辐射", "ESD"], env: ["RoHS"] }
};
var tlIndex = 0;
function renderTestList() {
  var p = TEST_MAP[$("tlProduct").value];
  if (!p) return;
  var groups = [["🛡️ 安全", p.safety], ["📡 EMC", p.emc], ["🌱 环保", p.env]];
  var html = "";
  tlIndex = 0;
  groups.forEach(function (g) {
    html += '<p class="peak-note" style="font-weight:600">' + g[0] + "</p>";
    g[1].forEach(function (item) {
      tlIndex += 1;
      html += '<label class="insul-item"><input type="checkbox" id="tl' + tlIndex + '" data-test-item="1"> ' + item + "</label>";
    });
  });
  $("tlBody").innerHTML = html;
  updateTestCount();
}

function updateTestCount() {
  var all = document.querySelectorAll("#tlBody input[type=checkbox]");
  var done = document.querySelectorAll("#tlBody input[type=checkbox]:checked").length;
  $("tlCount").textContent = "已勾选 " + done + " / " + all.length;
}

function copyTestList() {
  var lines = [];
  document.querySelectorAll("#tlBody input[type=checkbox]").forEach(function (c) {
    lines.push((c.checked ? "☑ " : "☐ ") + c.parentNode.textContent.trim());
  });
  var text = "测试项目清单（教学参考）\n" + lines.join("\n");
  function done() { if (window.AnGuiUX) window.AnGuiUX.toast("清单已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else {
    var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta); done();
  }
}

// ===== 保险丝选型速查 =====
function updateFuse() {
  var i = Number($("fuseI").value) || 0;
  var lo = i * 1.25, hi = i * 1.5;
  $("fuseLo").textContent = lo.toFixed(2);
  $("fuseHi").textContent = hi.toFixed(2);
  $("fuseNote").textContent = "教学建议：稳态电流的 1.25–1.5×（浪涌大取高、温升高取高）；正式选型还要核对 I²t、分断能力和认证。";
}

// ===== 灼热丝档位向导 =====
function updateGlowwire() {
  var pos = $("gwPos").value;
  var map = {
    inlet: { t: "750°C", note: "电源入口/主回路附近，起火概率高" },
    hot: { t: "850°C", note: "内部高功率发热件附近（最高档）" },
    shell: { t: "650°C", note: "外壳/通风口，火焰传播路径" },
    support: { t: "550°C", note: "绝缘支撑件/线夹等低风险位置" }
  };
  var m = map[pos];
  $("gwResult").textContent = m.t;
  $("gwNote").textContent = "教学建议：灼热丝 " + m.t + "（" + m.note + "）。正式档位由产品标准条款决定。";
}


// ===== 针焰 / 球压速查 =====
function updateNeedleFlame() {
  var map = {
    low: { t: "5 s", note: "绝缘支撑件 / 线夹等低风险位置（教学建议）" },
    mid: { t: "10 s", note: "PCB 基材 / 内部部件（教学建议）" },
    high: { t: "30 s", note: "外壳内部表面等火焰传播路径（教学建议）" }
  };
  var m = map[$("nfPos").value];
  $("nfResult").textContent = m.t;
  $("nfNote").textContent = "针焰施加时间 " + m.t + "（" + m.note + "）。针焰是 IEC/EN 体系（欧标常用）；美标体系没有直接对应试验，通常用 UL 94 + HWI/HAI。正式时间由产品标准规定。";
}

function updateBallPressure() {
  var map = {
    touch: { t: "125°C", note: "可触及热塑外壳，防烫伤后变形导致带电件位移" },
    support: { t: "75°C", note: "内部绝缘支撑件（不与带电件直接接触）" },
    contact: { t: "125°C", note: "与带电件接触的支撑件，受热短路风险最高" }
  };
  var m = map[$("bpPos").value];
  $("bpResult").textContent = m.t;
  $("bpNote").textContent = "球压试验温度 " + m.t + "（" + m.note + "）。方法：5mm 钢球、约 20N、保持 1h，判据压痕直径 ≤ 2mm。教学参考，正式以标准为准。";
}

// ===== 防火试验决策助手 =====
function updateFireDecision() {
  var map = {
    appliance: { combo: "灼热丝 650–750°C（按部件）· 针焰 30s（外壳）· 球压 125°C · UL94 V-0", basis: "IEC 60335-1 第 30 章（耐热耐燃）" },
    itav: { combo: "灼热丝 750°C / GWFI 750 · 针焰 10–30s · 球压 125°C · V-0 或 5VA", basis: "IEC 62368-1 防火章节（PS 分级）" },
    lighting: { combo: "灼热丝 650–750°C · 针焰 10s · 球压 125°C", basis: "IEC 60598-1 耐热耐燃条款" },
    power: { combo: "灼热丝 750–850°C（发热件附近取高）· 针焰 30s · 球压 125°C · V-0", basis: "IEC 62368-1 / GB 4943.1" },
    battery: { combo: "外壳 V-0 / 5VA · 球压 125°C · 热失控隔离（非灼热丝主线）", basis: "电池法规 + 产品安全标准" },
    tools: { combo: "灼热丝 750°C · 针焰 10–30s · 球压 125°C", basis: "IEC 62841 耐热耐燃条款" }
  };
  var m = map[$("ftProduct").value];
  $("ftResult").textContent = m.combo;
  $("ftNote").textContent = "推荐组合为教学参考（" + m.basis + "）。正式要求以产品标准条款和认证机构意见为准。";
}
// ===== 电池能量 =====
function updateBattery() {
  var v = Number($("batV").value) || 0;
  var ah = Number($("batAh").value) || 0;
  var wh = v * ah;
  $("batWh").textContent = wh.toFixed(1);
  var batWarn = wh > 100 ? " ⚠ 超过 100Wh，空运需按危险品规则批准。" : (wh > 20 ? " ⚠ 超过 20Wh 量级，便携/运输限制需按产品标准与法规核对。" : "");
  $("batNote").textContent = "能量 = " + v + "V × " + ah + "Ah = " + wh.toFixed(1) + " Wh。运输（UN 38.3）、产品安全（IEC 62133/GB 31241）与回收法规都要按 Wh 申报。" + batWarn;
}

// ===== 放电时间 + 预设 =====
function updateDischarge() {
  var v0 = Number($("dcV0").value) || 0;
  var c = Number($("dcC").value) || 0;
  var r = Number($("dcR").value) || 0;
  var tau = r * c;
  function tTo(vt) { return v0 > vt ? tau * Math.log(v0 / vt) : 0; }
  $("dcTau").textContent = tau.toFixed(tau >= 10 ? 0 : 1);
  $("dcT60").textContent = v0 > 60 ? tTo(60).toFixed(0) : "--";
  $("dcT30").textContent = v0 > 30 ? tTo(30).toFixed(0) : "--";
  var dcWarn = (v0 > 60 && tTo(60) > 1000) ? " ⚠ 降到 60V 超过 1s，常见插头放电要求可能不满足，正式按标准核对。" : "";
  $("dcNote").textContent = "τ = " + tau.toFixed(1) + " ms；降到 60V 约 " + (v0 > 60 ? tTo(60).toFixed(0) : "已低于 60V") + " ms，降到 30V 约 " + (v0 > 30 ? tTo(30).toFixed(0) : "已低于 30V") + " ms。教学估算。" + dcWarn;
}

function applyDischargePreset(key) {
  var presets = {
    plug: { v0: 230, c: 0.1, r: 1000, label: "插头放电（X 电容 100nF + 1MΩ）" },
    hv: { v0: 400, c: 100, r: 100, label: "高压电容（400V / 100µF / 100kΩ）" },
    tiny: { v0: 24, c: 10, r: 10, label: "低压小电容（24V / 10µF / 10kΩ）" }
  };
  var p = presets[key];
  if (!p) return;
  $("dcV0").value = p.v0;
  $("dcC").value = p.c;
  $("dcR").value = p.r;
  updateDischarge();
  if (window.AnGuiUX) window.AnGuiUX.toast("已载入：" + p.label);
}



// ===== EMC 波形对比生成器 =====
function renderEmcWave() {
  var svg = document.getElementById("emcWaveSvg");
  if (!svg) return;
  var type = $("emcWaveType").value;
  var W = 520, H = 240, L = 46, B = 28, T = 12, R = 14;
  var pw = W - L - R, ph = H - T - B;
  var info = {
    esd: { name: "ESD（IEC 61000-4-2）", t: "上升 <1ns，持续约 30–60ns", e: "能量极小", d: "亚纳秒上升沿，最伤数字电路" },
    eft: { name: "EFT（IEC 61000-4-4）", t: "单脉冲 5/50ns，脉冲串 15ms/300ms", e: "能量小但重复", d: "脉冲串易触发复位/误动作" },
    surge: { name: "浪涌（IEC 61000-4-5）", t: "1.2/50μs 电压波、8/20μs 电流波", e: "焦耳级，最大", d: "高能量，需 MOV/GDT/TVS 多级" }
  };
  var d = "";
  if (type === "esd") {
    d = "M" + L + "," + (T + ph) + " L" + (L + pw * 0.02) + "," + (T + ph) + " L" + (L + pw * 0.06) + "," + (T + ph * 0.05) + " L" + (L + pw * 0.2) + "," + (T + ph * 0.2) + " L" + (L + pw * 0.55) + "," + (T + ph * 0.62) + " L" + (L + pw) + "," + (T + ph * 0.9);
  } else if (type === "eft") {
    var bursts = "";
    for (var i = 0; i < 6; i++) {
      var x = L + pw * (0.08 + i * 0.14);
      bursts += " M" + x + "," + (T + ph) + " L" + (x + pw * 0.01) + "," + (T + ph) + " L" + (x + pw * 0.03) + "," + (T + ph * 0.08) + " L" + (x + pw * 0.05) + "," + (T + ph * 0.45) + " L" + (x + pw * 0.07) + "," + (T + ph) + " L" + (x + pw * 0.12) + "," + (T + ph);
    }
    d = bursts;
  } else {
    d = "M" + L + "," + (T + ph) + " C" + (L + pw * 0.04) + "," + (T + ph * 0.12) + " " + (L + pw * 0.1) + "," + (T + ph * 0.05) + " " + (L + pw * 0.16) + "," + (T + ph * 0.05) + " C" + (L + pw * 0.28) + "," + (T + ph * 0.18) + " " + (L + pw * 0.5) + "," + (T + ph * 0.55) + " " + (L + pw) + "," + (T + ph * 0.88);
  }
  var m = info[type];
  svg.innerHTML =
    '<line x1="' + L + '" y1="' + (T + ph) + '" x2="' + (W - R) + '" y2="' + (T + ph) + '" stroke="var(--border)" stroke-width="1.5"></line>' +
    '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + ph) + '" stroke="var(--border)" stroke-width="1.5"></line>' +
    '<path d="' + d + '" fill="none" stroke="var(--accent)" stroke-width="2.5"></path>' +
    '<text x="' + (W / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="label">时间（示意）</text>';
  $("emcWaveInfo").textContent = m.name + "：波形 " + m.t + " · 能量 " + m.e + " · " + m.d;
}

// ===== 机械安全距离（ISO 13857 教学查表） =====
var MECH_DIST = [
  { e: 4, d: 2, part: "指尖" },
  { e: 6, d: 10, part: "指尖" },
  { e: 8, d: 20, part: "手指" },
  { e: 10, d: 80, part: "手指" },
  { e: 12, d: 100, part: "手指" },
  { e: 20, d: 120, part: "手 / 手臂" },
  { e: 30, d: 850, part: "手臂" }
];
function renderMech() {
  var e = Number($("mechOpen").value) || 0;
  var hit = null;
  for (var i = 0; i < MECH_DIST.length; i++) {
    if (e <= MECH_DIST[i].e) { hit = MECH_DIST[i]; break; }
  }
  if (!hit) hit = { e: ">30", d: 850, part: "手臂" };
  $("mechDist").textContent = hit.d;
  $("mechNote").textContent = "开口 " + e + " mm → 安全距离 ≥ " + hit.d + " mm（可达部位：" + hit.part + "）。ISO 13857 教学参考，正式设计以标准原文与风险分析为准。";
}

// ===== ES 危险等级判定（IEC 62368-1 教学简化） =====
function renderEs() {
  var u = Number($("esU").value) || 0;
  var i = Number($("esI").value) || 0;
  var c = Number($("esC").value) || 0;
  var tier, note;
  if (u <= 30 && c <= 10 && i <= 0.5) {
    tier = "ES1（教学）";
    note = "低能量可触及源，一般无需额外防护；仍需按标准核对限值。";
  } else if (u <= 60 || c <= 1000 || i <= 5) {
    tier = "ES2（教学）";
    note = "需要防护或警示：限能电路、外壳防护、警示标识。";
  } else {
    tier = "ES3（教学）";
    note = "高危险能量，必须可靠隔离；请按 IEC 62368-1 能源分级条款核对。";
  }
  $("esResult").textContent = tier;
  $("esNote").textContent = note + " 输入：电压 " + u + " V · 电流 " + i + " A · 电容 " + c + " µF（教学判定，正式以标准表格为准）。";
}
// ===== 导出计算报告 =====
function exportReport() {
  var s = currentState();
  var actual = $("actualInput") ? $("actualInput").value : "";
  var html = "<!doctype html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\"><title>安规计算报告</title><style>body{font-family:-apple-system,'PingFang SC',sans-serif;padding:36px;color:#1d1d1f}h1{font-size:22px}.muted{color:#86868b}table{border-collapse:collapse;width:100%;margin-top:12px}td,th{border:1px solid #d9d9d9;padding:8px 10px;text-align:left;font-size:14px}</style></head><body>" +
    "<h1>安规计算报告（教学参考）</h1>" +
    "<p class=\"muted\">生成时间：" + new Date().toLocaleString() + " · 安规知识课堂 v1.1.2</p>" +
    "<table><tr><th>条件</th><td>工作电压 " + s.v + "V · 污染 " + s.pd + " · 材料组 " + s.gp + " · 绝缘 " + s.ins + " · 系统 " + s.sys + "V · OVC " + s.ovc + " · 海拔 " + s.alt + "m</td></tr>" +
    "<tr><th>爬电距离</th><td>≥ " + $("crValue").textContent + " mm</td></tr>" +
    "<tr><th>电气间隙</th><td>≥ " + $("clValue").textContent + " mm</td></tr>" +
    "<tr><th>冲击耐受</th><td>" + $("clImpulse").textContent + " V</td></tr>" +
    (actual ? "<tr><th>实际间距</th><td>" + actual + " mm（" + $("statusBox").textContent + "）</td></tr>" : "") +
    "</table><p class=\"muted\">免责声明：本报告为教学估算，不能替代标准原文或作为认证依据。</p></body></html>";
  var w = window.open("", "_blank");
  if (!w) { if (window.AnGuiUX) window.AnGuiUX.toast("请允许弹窗后再导出"); return; }
  w.document.write(html);
  w.document.close();
  w.print();
}
// ===== 复制 / 重置 =====
function copySummary() {
  var s = currentState();
  var text = "安规计算摘要（教学参考）\n爬电距离 ≥ " + $("crValue").textContent + " mm；电气间隙 ≥ " + $("clValue").textContent + " mm\n条件：工作电压 " + s.v + "V · 污染 " + s.pd + " · 材料组 " + s.gp + " · 绝缘 " + s.ins + " · 系统 " + s.sys + "V · OVC " + s.ovc + " · 海拔 " + s.alt + "m";
  function done() { if (window.AnGuiUX) window.AnGuiUX.toast("结果已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
}

function resetSpacing() {
  applyState({ v: 250, sys: 230, ovc: "II", pd: 2, gp: "IIIa", ins: "basic", alt: 2000, cls: "I", mkt: "custom" });
  if (window.AnGuiUX) window.AnGuiUX.toast("参数已重置");
}

// ===== 事件绑定 =====
[["lkCap", updateLeakage], ["lkV", updateLeakage], ["lkF", updateLeakage],
 ["ycLimit", updateYCap], ["ycV", updateYCap], ["ycF", updateYCap],
 ["thMode", updateThermal], ["thBase", updateThermal], ["thP", updateThermal], ["thRth", updateThermal], ["thArea", updateThermal],
 ["uMm", unitFrom], ["uMil", unitFrom], ["uUv", unitFrom], ["uDb", unitFrom], ["uC", unitFrom], ["uF", unitFrom],
 ["dcV0", updateDischarge], ["dcC", updateDischarge], ["dcR", updateDischarge],
 ["rvDist", updateReverse], ["rvPd", updateReverse], ["rvGp", updateReverse], ["rvIns", updateReverse], ["rvAlt", updateReverse], ["rvSys", updateReverse],
 ["cmpVolt", updateCompare], ["cmpPd", updateCompare], ["cmpGp", updateCompare], ["cmpIns", updateCompare], ["cmpSys", updateCompare], ["cmpOvc", updateCompare],
 ["gndI", updateGrounding], ["gndV", updateGrounding],
 ["selvType", updateSelv], ["selvV", updateSelv],
 ["fuseI", updateFuse], ["gwPos", updateGlowwire], ["nfPos", updateNeedleFlame], ["bpPos", updateBallPressure], ["ftProduct", updateFireDecision], ["batV", updateBattery], ["batAh", updateBattery],
 ["tlProduct", renderTestList], ["tlMarket", renderTestList],
["emcWaveType", renderEmcWave],
["mechOpen", renderMech], ["esU", renderEs], ["esI", renderEs], ["esC", renderEs]
].forEach(function (pair) {
  var el = $(pair[0]);
  if (el) el.addEventListener("input", pair[1]);
});
document.querySelectorAll("#tlBody").forEach(function (b) {
  b.addEventListener("change", updateTestCount);
});
document.querySelectorAll("[data-discharge-preset]").forEach(function (b) {
  b.addEventListener("click", function () { applyDischargePreset(b.getAttribute("data-discharge-preset")); });
});
for (var i = 1; i <= INSUL_ITEMS; i++) {
  var chk = document.getElementById("chk" + i);
  if (chk) chk.addEventListener("change", updateInsulChecklist);
}
var copyBtn = document.getElementById("copySummaryBtn");
if (copyBtn) copyBtn.addEventListener("click", copySummary);
var resetBtn = document.getElementById("resetSpacingBtn");
if (resetBtn) resetBtn.addEventListener("click", resetSpacing);
var exportBtn = document.getElementById("exportReportBtn");
if (exportBtn) exportBtn.addEventListener("click", exportReport);
var tlCopy = document.getElementById("tlCopyBtn");
if (tlCopy) tlCopy.addEventListener("click", copyTestList);

// 初始化
var savedTab = "";
try { savedTab = localStorage.getItem(TOOL_TAB_KEY) || ""; } catch (e) { /* ignore */ }
switchTool(TOOL_TABS.indexOf(savedTab) !== -1 ? savedTab : "spacing");
switchCalcMode("forward");
updateLeakage(); updateYCap(); updateThermal(); updateDischarge();
updateReverse(); updateCompare(); updateGrounding(); updateSelv(); updateInsulChecklist();
updateFuse(); updateGlowwire(); updateNeedleFlame(); updateBallPressure(); updateFireDecision(); updateBattery(); renderTestList();
renderToolMap(); renderRecent(); renderEmcWave(); renderMech(); renderEs();

// ===== 深链：从搜索/知识卡直达工具（自动打开所在面板并滚动） =====
function openToolFromHash() {
  var hash = location.hash;
  if (!hash || hash === "#") return;
  var id = hash.slice(1);
  var el = document.getElementById(id);
  if (!el) return;
  var panel = el.closest ? el.closest("[data-tool-panel]") : null;
  if (panel && typeof switchTool === "function") {
    switchTool(panel.getAttribute("data-tool-panel"));
  }
  setTimeout(function () {
    var t = document.getElementById(id);
    if (t && t.scrollIntoView) t.scrollIntoView({ block: "start", behavior: "smooth" });
  }, 80);
}
function tryOpenToolHash() {
  if (!location.hash || location.hash === "#") return;
  openToolFromHash();
}
document.addEventListener("DOMContentLoaded", tryOpenToolHash);
window.addEventListener("load", tryOpenToolHash);
if (document.readyState !== "loading") tryOpenToolHash();
