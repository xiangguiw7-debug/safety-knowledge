// ===== 工具 Tab 切换（分组手风琴 + 最近使用 + 搜索） =====
var TOOL_TAB_KEY = "angui-tool-tab";
var RECENT_KEY = "angui-tool-recent";

var TOOL_GROUPS = [
  { id: "shock", label: "⚡ 防电击与绝缘", tools: ["spacing", "hipot", "selv", "grounding", "ovc", "altcorr", "pesize"] },
  { id: "energy", label: "🔥 能量 · 热量 · 防火", tools: ["discharge", "thermal", "fuse", "glowwire", "battery"] },
  { id: "emc", label: "📡 EMC · 环保 · 认证", tools: ["leakage", "compare", "testlist"] },
  { id: "enclosure", label: "🛡️ 外壳防护", tools: ["ip", "ik"] },
  { id: "mech_env", label: "⚙️ 机械 · 环境 · 可靠性", tools: ["mech", "es", "drop", "envparams"] },
  { id: "eng", label: "📐 工程速查", tools: ["units", "emcwave", "acdc"] }
];

var TOOL_META = {
  spacing: { name: "爬电 / 间隙", d: "正向、反查与双曲线图表" },
  hipot: { name: "耐压速查", d: "多标准试验电压" },
  selv: { name: "SELV / 绝缘", d: "限值判定与层数清单" },
  grounding: { name: "接地连续性", d: "R=V/I 目标电阻" },
  discharge: { name: "放电时间", d: "RC 泄放与插头预设" },
  thermal: { name: "温升估算", d: "热阻 / 散热面积" },
  fuse: { name: "保险丝选型", d: "1.25–1.5× 建议" },
  glowwire: { name: "灼热丝档位", d: "550–850°C 向导" },
  battery: { name: "电池能量", d: "Wh 计算" },
  leakage: { name: "泄漏电流", d: "Y 电容正算与反算" },
  compare: { name: "标准对照", d: "五标准一键对比" },
  testlist: { name: "测试清单", d: "安全/EMC/环保项目" },
  ip: { name: "IP 判定", d: "防尘防水等级" },
  ik: { name: "IK 判定", d: "抗冲击等级" },
  mech: { name: "机械距离", d: "ISO 13857 安全距离" },
  es: { name: "ES 判定", d: "能量分级" },
  drop: { name: "跌落判定", d: "高度/方向/次数" },
  envparams: { name: "试验参数", d: "湿热/温循/盐雾" },
  units: { name: "单位换算", d: "电学/长度/温度" },
  emcwave: { name: "EMC 波形", d: "波形对比生成" },
  ovc: { name: "过电压类别", d: "OVC → 冲击耐受" },
  altcorr: { name: "海拔修正", d: "2000m 以上间隙系数" },
  pesize: { name: "PE 线径", d: "保护导体截面速查" },
  acdc: { name: "AC/DC 耐压", d: "峰值等效换算" }
};

var TOOL_TABS = [];
TOOL_GROUPS.forEach(function (g) { g.tools.forEach(function (t) { TOOL_TABS.push(t); }); });

function groupOf(tab) {
  for (var i = 0; i < TOOL_GROUPS.length; i++) {
    if (TOOL_GROUPS[i].tools.indexOf(tab) !== -1) return TOOL_GROUPS[i];
  }
  return null;
}

function recordTab(tab) {
  try {
    var arr = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    arr = arr.filter(function (x) { return x !== tab; });
    arr.unshift(tab);
    arr = arr.slice(0, 4);
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
  arr = arr.filter(function (id) { return TOOL_META[id]; });
  box.innerHTML = arr.length
    ? arr.map(function (id) {
        return '<button type="button" class="btn" data-open-tool="' + id + '">' + TOOL_META[id].name + "</button>";
      }).join("")
    : "";
  bindMap();
}

function renderToolMap() {
  var box = document.getElementById("toolMapGrid");
  if (!box) return;
  box.innerHTML = TOOL_GROUPS.map(function (g) {
    var btns = g.tools.map(function (id) {
      return '<button type="button" class="btn" data-open-tool="' + id + '" style="margin:2px 4px 2px 0">' + TOOL_META[id].name + "</button>";
    }).join("");
    return '<div style="flex:1 1 100%;margin-bottom:2px"><b style="font-size:12.5px;color:var(--muted)">' + g.label + "</b><br>" + btns + "</div>";
  }).join("");
  bindMap();
}
var toolMapToggle = document.getElementById("toolMapToggle");
if (toolMapToggle) toolMapToggle.addEventListener("click", function () {
  var box = document.getElementById("toolMapGrid");
  if (!box) return;
  box.hidden = !box.hidden;
  this.textContent = box.hidden ? "🗺️ 全部工具一览" : "🗺️ 收起工具一览";
});

function renderToolTabs() {
  var box = document.getElementById("toolTabs");
  if (!box) return;
  box.innerHTML = TOOL_GROUPS.map(function (g) {
    var btns = g.tools.map(function (id) {
      var cred = TOOL_CRED[id];
      var mark = cred === "y" ? "🟡 " : (cred === "r" ? "🔴 " : "");
      return '<button type="button" class="tool-tab-btn" data-tool-tab="' + id + '">' + mark + TOOL_META[id].name + "</button>";
    }).join("");
    return '<div class="tool-group-acc" data-tgroup="' + g.id + '">' +
      '<button type="button" class="tool-group-head" data-tgroup-head="' + g.id + '">' + g.label + '<span class="chev">▾</span></button>' +
      '<div class="tool-group-body">' + btns + "</div></div>";
  }).join("");
  box.querySelectorAll("[data-tgroup-head]").forEach(function (h) {
    h.addEventListener("click", function () {
      var gid = h.getAttribute("data-tgroup-head");
      var el = box.querySelector('[data-tgroup="' + gid + '"]');
      var open = el.classList.contains("open");
      box.querySelectorAll(".tool-group-acc").forEach(function (g) { g.classList.remove("open"); });
      if (!open) el.classList.add("open");
    });
  });
  box.querySelectorAll("[data-tool-tab]").forEach(function (b) {
    b.addEventListener("click", function () {
      switchTool(b.getAttribute("data-tool-tab"));
    });
  });
}

function switchTool(tab) {
  document.querySelectorAll("[data-tool-panel]").forEach(function (p) {
    p.hidden = p.getAttribute("data-tool-panel") !== tab;
  });
  document.querySelectorAll("#toolTabs [data-tool-tab]").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-tool-tab") === tab);
  });
  var g = groupOf(tab);
  if (g) {
    document.querySelectorAll(".tool-group-acc").forEach(function (el) {
      el.classList.toggle("open", el.getAttribute("data-tgroup") === g.id);
    });
  }
  recordTab(tab);
  try { localStorage.setItem(TOOL_TAB_KEY, tab); } catch (e) { /* ignore */ }
  var panel = document.querySelector('[data-tool-panel="' + tab + '"]');
  if (panel && panel.scrollIntoView) {
    setTimeout(function () { panel.scrollIntoView({ block: "start", behavior: "smooth" }); }, 30);
  }
}

function applyToolSearch() {
  var q = (document.getElementById("toolSearchTop") || { value: "" }).value.trim().toLowerCase();
  document.querySelectorAll("#toolTabs .tool-group-acc").forEach(function (g) {
    var any = false;
    g.querySelectorAll("[data-tool-tab]").forEach(function (b) {
      var id = b.getAttribute("data-tool-tab");
      var m = TOOL_META[id] || {};
      var hit = !q || (m.name + " " + (m.d || "")).toLowerCase().indexOf(q) !== -1;
      b.classList.toggle("dim", !hit);
      if (hit) any = true;
    });
    if (q) g.classList.toggle("open", any);
  });
}

// ===== 可信度三档（落实到每个工具结果） =====
var TOOL_CRED = {
  spacing: "g", hipot: "y", selv: "g", grounding: "g",
  discharge: "g", thermal: "y", fuse: "g", glowwire: "g", battery: "g",
  leakage: "g", compare: "y", testlist: "g",
  ip: "g", ik: "g", mech: "g", es: "y", drop: "y", envparams: "g",
  units: "g", emcwave: "g",
  ovc: "g", altcorr: "g", pesize: "y", acdc: "g"
};
var CRED_LABELS = { g: "🟢 教学参考", y: "🟡 需核对", r: "🔴 查标准" };
function injectCred() {
  Object.keys(TOOL_CRED).forEach(function (id) {
    var panel = document.querySelector('[data-tool-panel="' + id + '"]');
    if (!panel) return;
    panel.querySelectorAll(".result").forEach(function (el) {
      if (el.querySelector(".cred-tag")) return;
      var tag = document.createElement("span");
      tag.className = "cred-tag " + TOOL_CRED[id];
      tag.textContent = CRED_LABELS[TOOL_CRED[id]];
      el.appendChild(tag);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn cred-copy";
      btn.textContent = "复制结果";
      btn.addEventListener("click", function () {
        var text = (TOOL_META[id] ? TOOL_META[id].name + "\n" : "") + el.textContent.replace(/\s+/g, " ").trim();
        copyText(text, btn);
      });
      el.appendChild(btn);
    });
  });
}

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
  var mktEl = $("rvMarket");
  if (mktEl) {
    if (imp === null) {
      mktEl.textContent = "";
    } else {
      mktEl.textContent = "覆盖市场（按间隙）：" + [120, 230, 400].map(function (sv) {
        var o = null;
        ["IV", "III", "II", "I"].forEach(function (c) {
          if (IMPULSE_DATA[sv][c] <= imp && o === null) o = c;
        });
        return sv + "V→" + (o ? "类别 " + o : "不满足");
      }).join("　·　");
    }
  }
  buildReverseChart(d, pd, gp, ins, alt, cr);
  renderScenarios(d, pd, gp, ins);
}

// 统一复制：结果文本进剪贴板，并给按钮短暂反馈
function copyText(text, btn) {
  function done() {
    if (btn) { var old = btn.textContent; btn.textContent = "已复制"; setTimeout(function () { btn.textContent = old; }, 1600); }
    if (window.AnGuiUX) window.AnGuiUX.toast("已复制到剪贴板");
  }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
}

function copyReverse() {
  var text = "反查结果（安规计算工具）\n" +
    "实际间距：" + $("rvDist").value + " mm\n" +
    "最大工作电压（爬电）：" + $("rvCreep").textContent + "\n" +
    "最大冲击耐受（间隙）：" + $("rvClear").textContent + " · " + $("rvOvc").textContent + "\n" +
    $("rvNote").textContent + "\n" + $("rvMarket").textContent;
  copyText(text, $("rvCopyBtn"));
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
function uFmt(v) {
  if (!isFinite(v)) return "";
  return parseFloat(v.toFixed(6)).toString();
}
// 线性单位组：每个单位「1 单位 = factor × 基准单位」，基准系数为 1
var LINEAR_GROUPS = {
  len: { units: { uKm: 1e3, uM: 1, uCm: 1e-2, uMm: 1e-3, uUm: 1e-6, uMil: 2.54e-5, uInch: 2.54e-2 } },
  cur: { units: { uA: 1, uAm: 1e-3, uAu: 1e-6, uAn: 1e-9 } },
  vol: { units: { uVk: 1e3, uV: 1, uVm: 1e-3 } },
  frq: { units: { uGHz: 1e9, uMHz: 1e6, uKHz: 1e3, uHz: 1 } },
  tim: { units: { uSec: 1, uMs: 1e-3, uUs: 1e-6, uNs: 1e-9 } }
};
var GROUP_INDEX = {};
Object.keys(LINEAR_GROUPS).forEach(function (g) {
  Object.keys(LINEAR_GROUPS[g].units).forEach(function (f) { GROUP_INDEX[f] = g; });
});

function linearConvert(srcId) {
  var g = LINEAR_GROUPS[GROUP_INDEX[srcId]];
  if (!g) return;
  var v = Number($(srcId).value);
  if (isNaN(v)) v = 0;
  var base = v * g.units[srcId];
  Object.keys(g.units).forEach(function (f) {
    if (f !== srcId) $(f).value = uFmt(base / g.units[f]);
  });
}

function unitFrom(id) {
  if (uLock) return;
  uLock = true;
  try {
    var v = Number($(id).value);
    if (isNaN(v)) v = 0;
    if (GROUP_INDEX[id]) linearConvert(id);
    else if (id === "uUv") $("uDb").value = v > 0 ? (20 * Math.log10(v)).toFixed(1) : "";
    else if (id === "uDb") $("uUv").value = (Math.pow(10, v / 20)).toFixed(1);
    else if (id === "uC") $("uF").value = (v * 9 / 5 + 32).toFixed(1);
    else if (id === "uF") $("uC").value = ((v - 32) * 5 / 9).toFixed(1);
    else if (id === "uJ") $("uWh").value = uFmt(v / 3600);
    else if (id === "uWh") $("uJ").value = uFmt(v * 3600);
  } finally { uLock = false; }
}

// ===== 电学换算：欧姆定律 V = I·R，功率 P = V·I =====
var ohmSrc = []; // 最近编辑的两个字段作为“已知”
function ohmSet(id) {
  var v = parseFloat($(id).value);
  ohmSrc = ohmSrc.filter(function (x) { return x !== id; });
  if (isFinite(v)) { ohmSrc.push(id); if (ohmSrc.length > 2) ohmSrc.shift(); }
  computeOhm();
}
function ohmVal(id) { var v = parseFloat($(id).value); return isFinite(v) ? v : NaN; }
function computeOhm() {
  if (ohmSrc.length < 2) return;
  var V = ohmVal("uOhmV"), I = ohmVal("uOhmI"), R = ohmVal("uOhmR"), P = ohmVal("uOhmP");
  var kn = {}; ohmSrc.forEach(function (f) { kn[f] = true; });
  function set(id, val) { if (!kn[id]) $(id).value = uFmt(val); }
  var hv = kn.uOhmV, hi = kn.uOhmI, hr = kn.uOhmR, hp = kn.uOhmP;
  if (hv && hi) { set("uOhmR", V / I); set("uOhmP", V * I); }
  else if (hv && hr) { set("uOhmI", V / R); set("uOhmP", V * V / R); }
  else if (hv && hp) { set("uOhmI", P / V); set("uOhmR", V * V / P); }
  else if (hi && hr) { set("uOhmV", I * R); set("uOhmP", I * I * R); }
  else if (hi && hp) { set("uOhmV", P / I); set("uOhmR", P / (I * I)); }
  else if (hr && hp) { set("uOhmV", Math.sqrt(P * R)); set("uOhmI", Math.sqrt(P / R)); }
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

// ===== 新增：过电压类别 / 海拔修正 / PE 线径 / AC-DC 换算 =====
function updateOvc() {
  var sys = Number($("ovcSys").value);
  var cls = $("ovcClass").value;
  var imp = (IMPULSE_DATA[sys] && IMPULSE_DATA[sys][cls]) || null;
  if (!imp) { $("ovcResult").textContent = "--"; $("ovcNote").textContent = ""; return; }
  $("ovcResult").textContent = imp;
  $("ovcNote").textContent = sys + "V 系统、" + cls + " 类（" + (cls === "I" ? "SPD 后" : cls === "II" ? "插头连接" : cls === "III" ? "固定安装" : "进线") + "）的额定冲击耐受 " + imp + "V。电气间隙查表以该冲击值 + 海拔修正为准。";
}
function updateAltCorr() {
  var alt = Number($("altcAlt").value);
  var gap = parseFloat($("altcGap").value);
  var f = ALTITUDE_DATA[alt] || 1;
  $("altcFactor").textContent = f;
  $("altcResult").textContent = isNaN(gap) || gap <= 0 ? "--" : uFmt(gap * f);
  $("altcNote").textContent = alt + "m 修正系数 " + f + "；修正后间隙 = " + (isNaN(gap) || gap <= 0 ? "--" : uFmt(gap * f) + "mm") + "（仅修正电气间隙，爬电距离不随海拔修正）。";
}
function updatePeSize() {
  var s = parseFloat($("peS").value);
  if (isNaN(s) || s <= 0) { $("peResult").textContent = "--"; $("peNote").textContent = "请输入有效的相线截面（mm²）。"; return; }
  var pe, rule;
  if (s <= 16) { pe = s; rule = "S ≤ 16mm² → PE = S（同截面）"; }
  else if (s <= 35) { pe = 16; rule = "16 < S ≤ 35mm² → PE = 16mm²"; }
  else { pe = s / 2; rule = "S > 35mm² → PE = S/2"; }
  $("peResult").textContent = (Math.round(pe * 10) / 10);
  $("peNote").textContent = "规则（IEC 60364-5-54 表 54.2 教学简化）：" + rule + "。正式设计还需按 54.2.4 校核故障电流与断开时间。";
}
function updateAcDc(id) {
  if (id === "acdcAc") {
    var ac = parseFloat($("acdcAc").value);
    if (isNaN(ac)) { $("acdcDc").value = ""; $("acdcNote").textContent = ""; return; }
    $("acdcDc").value = Math.round(ac * Math.SQRT2);
    $("acdcNote").textContent = "DC ≈ AC × √2 = " + ac + " × 1.414 = " + Math.round(ac * Math.SQRT2) + "V（峰值等效）";
  } else {
    var dc = parseFloat($("acdcDc").value);
    if (isNaN(dc)) { $("acdcAc").value = ""; $("acdcNote").textContent = ""; return; }
    $("acdcAc").value = Math.round(dc / Math.SQRT2);
    $("acdcNote").textContent = "AC ≈ DC ÷ √2 = " + dc + " ÷ 1.414 = " + Math.round(dc / Math.SQRT2) + "V";
  }
}

// ===== 新工具复制 =====
// ===== 示例填充（预设） =====
var TOOL_PRESETS = {
  thermal_adapter: { set: { thMode: "rth", thBase: "40", thP: "5", thRth: "15" }, fn: updateThermal, label: "电源适配器（5W / 热阻 15K/W / 40°C）" },
  thermal_led: { set: { thMode: "rth", thBase: "40", thP: "10", thRth: "8" }, fn: updateThermal, label: "LED 驱动（10W / 热阻 8K/W / 40°C）" },
  fuse_power: { set: { fuseI: "2" }, fn: updateFuse, label: "电源（2A 稳态电流）" },
  fuse_charger: { set: { fuseI: "1" }, fn: updateFuse, label: "充电器（1A 稳态电流）" },
  ycap_charger: { set: { lkCap: "1000", lkV: "230", lkF: "50" }, fn: updateLeakage, label: "充电器（Y 电容 1000pF）" },
  ycap_common: { set: { lkCap: "4700", lkV: "230", lkF: "50" }, fn: updateLeakage, label: "通用电源（Y 电容 4700pF）" },
  battery_18650: { set: { batV: "3.7", batAh: "3" }, fn: updateBattery, label: "18650 电池（3.7V / 3000mAh）" },
  battery_tool: { set: { batV: "20", batAh: "2" }, fn: updateBattery, label: "电动工具电池（20V / 2Ah）" },
  gnd_25a: { set: { gndI: "25", gndV: "2.5" }, fn: updateGrounding, label: "I 类 25A 测试（目标 0.1Ω）" },
  gnd_10a: { set: { gndI: "10", gndV: "1" }, fn: updateGrounding, label: "便携 10A 测试（目标 0.1Ω）" }
};
function applyToolPreset(key) {
  var p = TOOL_PRESETS[key];
  if (!p) return;
  Object.keys(p.set).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = p.set[id];
  });
  if (p.fn) p.fn();
  if (window.AnGuiUX) window.AnGuiUX.toast("已载入：" + p.label);
}
function copyOvc() { copyText("过电压类别速查（安规计算工具）\n冲击耐受：" + $("ovcResult").textContent + "V\n" + $("ovcNote").textContent, $("ovcCopyBtn")); }
function copyAltCorr() { copyText("海拔修正（安规计算工具）\n海拔 " + $("altcAlt").value + "m → 系数 " + $("altcFactor").textContent + "\n修正后间隙：" + $("altcResult").textContent + "mm", $("altcCopyBtn")); }
function copyPeSize() { copyText("PE 线径速查（安规计算工具）\n相线 " + $("peS").value + "mm² → PE " + $("peResult").textContent + "mm²\n" + $("peNote").textContent, $("peCopyBtn")); }
function copyAcDc() { copyText("AC/DC 耐压换算（安规计算工具）\n" + $("acdcNote").textContent, $("acdcCopyBtn")); }



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

// ===== IP 等级判定（完整版） =====
var IP_SOLID = {
  0: { n: "无防护", d: "不承诺任何固体防护" },
  1: { n: "直径 ≥ 50mm", d: "50mm 球体、约 50N，手背不能进入" },
  2: { n: "直径 ≥ 12.5mm", d: "铰接试指、约 10N，手指不能进入" },
  3: { n: "直径 ≥ 2.5mm", d: "2.5mm 钢棒、约 3N，常用工具不能进入" },
  4: { n: "直径 ≥ 1.0mm", d: "1.0mm 钢线、约 1N，细线不能进入" },
  5: { n: "防尘", d: "粉尘箱 8h + 负压，允许少量粉尘进入但不影响运行" },
  6: { n: "尘密", d: "粉尘箱 8h + 负压，试验后无粉尘进入" }
};
var IP_WATER = {
  0: { n: "无防护", d: "不承诺防水" },
  1: { n: "垂直滴水", d: "垂直落下的水滴无有害影响" },
  2: { n: "15° 倾斜滴水", d: "外壳倾斜 15° 时滴水无有害影响" },
  3: { n: "淋水", d: "与垂直成 ±60° 淋水无有害影响" },
  4: { n: "溅水", d: "任意方向溅水无有害影响" },
  5: { n: "喷水", d: "任意方向喷水无有害影响" },
  6: { n: "强力喷水", d: "任意方向强力喷水无有害影响" },
  7: { n: "短时浸水", d: "1m 深浸水 30min 无有害影响" },
  8: { n: "持续浸水", d: "按约定更深/更久浸水无有害影响" }
};
var IP_SCENES = [
  { id: "internal", label: "内部模块", s: 0, w: 0, note: "封装在设备/机柜内部，外壳不直接暴露。" },
  { id: "hand", label: "大件防护", s: 1, w: 0, note: "大型设备，只需防手背（≥50mm）进入。" },
  { id: "tool", label: "工具防护", s: 3, w: 0, note: "工业控制柜/配电箱，防工具（≥2.5mm）进入。" },
  { id: "indoor_dry", label: "室内干燥", s: 2, w: 0, note: "办公室/卧室：防手指接触即可，无需防水。" },
  { id: "condense", label: "冷凝滴水", s: 2, w: 1, note: "室内偶有冷凝水滴落（冷藏设备/管道附近）。" },
  { id: "tilt", label: "倾斜滴水", s: 2, w: 2, note: "倾斜安装，15° 滴水无有害影响。" },
  { id: "rain_light", label: "户外小雨", s: 5, w: 3, note: "户外轻微淋雨（60° 淋水）。" },
  { id: "indoor_wet", label: "室内潮湿", s: 4, w: 4, note: "厨房/卫浴：防细线 + 防溅水。" },
  { id: "outdoor", label: "户外一般", s: 5, w: 4, note: "路灯/庭院：防尘 + 防溅水。" },
  { id: "rain", label: "户外淋雨", s: 6, w: 5, note: "直接淋雨：尘密 + 防喷水。" },
  { id: "dust", label: "工业粉尘", s: 6, w: 0, note: "粉尘环境：尘密，防水按现场再定。" },
  { id: "wash", label: "喷淋冲洗", s: 6, w: 6, note: "洗车/喷水：尘密 + 强力喷水。" },
  { id: "dip", label: "短时浸水", s: 5, w: 7, note: "可能短时浸水：防尘 + 短时浸水。" },
  { id: "sub", label: "持续浸水", s: 6, w: 8, note: "水下使用：尘密 + 持续浸水（更深更久按约定）。" }
];
var IP_AUX = { "": "无", A: "A · 手背", B: "B · 手指", C: "C · 工具", D: "D · 金属线" };
var IP_SUPP = { "": "无", H: "H · 高压设备", M: "M · 防水试验时运动", S: "S · 防水试验时静止", W: "W · 特定气候" };
function updateIp() {
  var s = Number($("ipSolid").value);
  var w = Number($("ipWater").value);
  var aux = $("ipAux") ? $("ipAux").value : "";
  var supp = $("ipSupp") ? $("ipSupp").value : "";
  $("ipResult").textContent = "IP" + s + w + aux + supp;
  $("ipSolidNote").textContent = "第一位（防固体）：" + IP_SOLID[s].n + "：" + IP_SOLID[s].d;
  $("ipWaterNote").textContent = "第二位（防水）：" + IP_WATER[w].n + "：" + IP_WATER[w].d;
  var an = $("ipAuxNote"); if (an) an.textContent = "附加字母：" + IP_AUX[aux || ""] + "（可选）";
  var sn = $("ipSuppNote"); if (sn) sn.textContent = "补充字母：" + IP_SUPP[supp || ""] + "（可选）";
  var matched = IP_SCENES.filter(function (x) { return x.s === s && x.w === w; });
  var sceneNote = matched.length ? "对应典型场景：" + matched.map(function (x) { return x.label; }).join("、") : "自定义组合：两位数字的含义已在上方分别说明，可直接对照选用。";
  $("ipNote").innerHTML = sceneNote + "<br>注意：IP 只描述外壳密封，不替代电气间隙、爬电距离与污染等级。" +
    '　<a href="./knowledge-detail.html?id=ip">IP 知识卡 →</a>　<a href="./sop-ip.html">IP 试验 SOP →</a>' +
    '<br>相关行业：<a href="./industries.html#lighting">灯具</a> · <a href="./industries.html#charging">充电桩</a> · <a href="./industries.html#tools">电动工具</a> · <a href="./industries.html#appliance">家电</a>';
}
function copyIp() {
  var text = "IP 判定（安规计算工具）\n" +
    "建议等级：" + $("ipResult").textContent + "\n" +
    $("ipSolidNote").textContent + "\n" +
    $("ipWaterNote").textContent + "\n" +
    ($("ipAuxNote") ? $("ipAuxNote").textContent + "\n" : "") +
    ($("ipSuppNote") ? $("ipSuppNote").textContent + "\n" : "");
  copyText(text, $("ipCopyBtn"));
}
function applyIpScene(id) {
  var m = IP_SCENES.filter(function (x) { return x.id === id; })[0];
  if (!m) return;
  $("ipSolid").value = m.s;
  $("ipWater").value = m.w;
  document.querySelectorAll("[data-ip-scene]").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-ip-scene") === id);
  });
  updateIp();
}

// ===== IK 等级判定（完整版） =====
var IK_LEVELS = [
  { ik: "IK00", e: "无防护", env: "完全受保护：装在柜内/面板后/不可触及，基本无冲击风险" },
  { ik: "IK01", e: "0.14 J", env: "嵌入式/高处：天花板凹槽、高处固定，基本碰不到" },
  { ik: "IK02", e: "0.2 J", env: "室内高处固定：高挂灯具、贴墙高处" },
  { ik: "IK03", e: "0.35 J", env: "室内一般固定：普通灯具、探测器" },
  { ik: "IK04", e: "0.5 J", env: "室内固定：墙面开关、插座、普通设备" },
  { ik: "IK05", e: "0.7 J", env: "半户外/公共：走廊、大堂" },
  { ik: "IK06", e: "1 J", env: "公共区域：商店、学校" },
  { ik: "IK07", e: "2 J", env: "户外灯具、充电桩外壳" },
  { ik: "IK08", e: "5 J", env: "户外公共设施：灯杆、配电箱、防破坏灯具" },
  { ik: "IK09", e: "10 J", env: "防破坏/工业重型外壳" },
  { ik: "IK10", e: "20 J", env: "极高防破坏：地铁、户外终端" }
];
var IK_SCENES = [
  { id: "protected", lv: 0, label: "完全保护" },
  { id: "recessed", lv: 1, label: "嵌入/高处" },
  { id: "highwall", lv: 2, label: "高处固定" },
  { id: "indoor", lv: 3, label: "室内一般" },
  { id: "indoor_fixed", lv: 4, label: "室内固定" },
  { id: "semi_public", lv: 5, label: "半户外" },
  { id: "public", lv: 6, label: "公共区域" },
  { id: "outdoor", lv: 7, label: "户外灯具" },
  { id: "outdoor_public", lv: 8, label: "户外公共" },
  { id: "vandal", lv: 9, label: "防破坏" },
  { id: "high_vandal", lv: 10, label: "极高防破坏" }
];
function updateIk() {
  var lv = Number($("ikLevel").value);
  var m = IK_LEVELS[lv];
  $("ikResult").textContent = m.ik;
  $("ikEnergy").textContent = m.e;
  $("ikMethod").textContent = lv === 0 ? "—" : (lv <= 6 ? "弹簧冲击锤" : "摆锤冲击（或等效垂直落锤）");
  var envEl = $("ikEnv");
  if (envEl) envEl.textContent = m.env;
  $("ikNote").innerHTML = "IK 只考核外壳抗冲击，不替代内部结构强度与防触电距离；冲击后要复测外观、功能与安规。" +
    '　<a href="./knowledge-detail.html?id=ik">IK 知识卡 →</a>　<a href="./sop-ik.html">IK 试验 SOP →</a>' +
    '<br>相关行业：<a href="./industries.html#charging">充电桩</a> · <a href="./industries.html#machinery">工业机械</a> · <a href="./industries.html#tools">电动工具</a> · <a href="./industries.html#security">安防</a>';
}
function copyIk() {
  var text = "IK 判定（安规计算工具）\n" +
    "建议等级：" + $("ikResult").textContent + "\n" +
    "冲击能量：" + $("ikEnergy").textContent + "\n" +
    "试验方法：" + $("ikMethod").textContent;
  copyText(text, $("ikCopyBtn"));
}
function applyIkScene(id) {
  var m = IK_SCENES.filter(function (x) { return x.id === id; })[0];
  if (!m) return;
  $("ikLevel").value = m.lv;
  document.querySelectorAll("[data-ik-scene]").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-ik-scene") === id);
  });
  updateIk();
}

// ===== 跌落判定（标准版） =====
var DROP_RULES = {
  "60068_general": { std: "IEC 60068-2-31", clause: "自由跌落（Ec）", dir: "最不利姿态（姿态/次数/高度由产品标准规定）", times: "通常 1–3 次", surface: "混凝土或硬木地板", weightBased: true, stdId: "60068", judge: "外观/功能正常，带电件不可触及，绝缘与间距不受损" },
  "60335_handheld": { std: "IEC 60335-1", clause: "第 20 章", dir: "最不利方向", times: "3 次", surface: "硬木地板（≥13mm，铺于水泥地）", weightBased: false, fixedH: "1.0 m", stdId: "60335", judge: "外壳不得破损到可触及带电件，绝缘与间距不得受损" },
  "60335_portable": { std: "IEC 60335-1", clause: "第 20 章", dir: "正常使用姿态", times: "按标准", surface: "硬木地板", weightBased: true, stdId: "60335", judge: "复测外观、功能与安规" },
  "62368_handheld": { std: "IEC 62368-1", clause: "机械强度", dir: "最不利方向", times: "按标准", surface: "硬木地板", weightBased: false, fixedH: "1.0 m", stdId: "62368", judge: "外壳不得破裂到可触及危险部件" },
  "62368_portable": { std: "IEC 62368-1", clause: "机械强度", dir: "最不利方向", times: "按标准", surface: "硬木地板", weightBased: true, stdId: "62368", judge: "外壳不得破裂到可触及危险部件" },
  "60601_handheld": { std: "IEC 60601-1", clause: "机械强度", dir: "最不利方向", times: "按标准", surface: "硬木地板", weightBased: false, fixedH: "1.0 m", stdId: "60601", judge: "外壳不得破损到可触及危险部件，绝缘与间距不受损" },
  "60601_portable": { std: "IEC 60601-1", clause: "机械强度", dir: "最不利方向", times: "按标准", surface: "硬木地板", weightBased: true, stdId: "60601", judge: "复测外观、功能、耐压、泄漏" },
  "62133_battery": { std: "IEC 62133", clause: "跌落（1m 自由跌落）", dir: "最不利方向", times: "按标准（常见 3 次）", surface: "混凝土或钢面", weightBased: false, fixedH: "1.0 m", stdId: "62133", judge: "不起火、不泄漏、不爆炸，电压/内阻正常" },
  "ista_package": { std: "ISTA 1A", clause: "跌落试验", dir: "一角三棱六面（最脆弱角→3条棱→6个面）", times: "10 次（角1+棱3+面6）", surface: "混凝土或钢板", weightBased: true, stdId: "ista", judge: "包装与产品完好，产品功能正常" },
  "ista2a_package": { std: "ISTA 2A", clause: "跌落（部分模拟运输）", dir: "一角三棱六面（同 1A）", times: "10 次（角1+棱3+面6）", surface: "混凝土或钢板", weightBased: true, stdId: "ista", judge: "包装与产品完好，产品功能正常" },
  "ista3a_package": { std: "ISTA 3A", clause: "跌落（小包裹，分4类形态）", dir: "标准件一角三棱六面；小/扁平/长件按形态", times: "标准 10 次，其余 8–9 次", surface: "混凝土或钢板", weightBased: true, stdId: "ista", judge: "包装与产品完好，产品功能正常" },
  "gb4857_road": { std: "GB/T 4857.5", clause: "包装跌落 · 公路运输", dir: "面/棱/角", times: "按标准", surface: "混凝土或钢板", weightBased: true, stdId: "gb4857_road", judge: "包装与产品完好" },
  "gb4857_rail": { std: "GB/T 4857.5", clause: "包装跌落 · 铁路运输", dir: "面/棱/角", times: "按标准", surface: "混凝土或钢板", weightBased: true, stdId: "gb4857_rail", judge: "包装与产品完好" },
  "gb4857_air": { std: "GB/T 4857.5", clause: "包装跌落 · 航空运输", dir: "面/棱/角", times: "按标准", surface: "混凝土或钢板", weightBased: true, stdId: "gb4857_air", judge: "包装与产品完好" },
  "gb2423_drop": { std: "GB/T 2423.7", clause: "自由跌落（等效 IEC 60068-2-31）", dir: "最不利姿态（同 60068-2-31）", times: "通常 1–3 次", surface: "混凝土或硬木地板", weightBased: true, stdId: "gb2423", judge: "外观/功能正常，带电件不可触及" }
};
function dropHeightByWeight(w, stdId) {
  if (isNaN(w) || w < 0) return null;
  if (stdId === "ista") {
    if (w < 9.5) return "0.76 m";
    if (w < 18.6) return "0.61 m";
    if (w < 27.7) return "0.46 m";
    if (w < 45.4) return "0.31 m";
    if (w <= 68) return "0.20 m";
    return "超出 68kg（按标准）";
  }
  if (stdId === "gb4857_road" || stdId === "gb4857_rail" || stdId === "gb4857_air") {
    var air = stdId === "gb4857_air";
    var t = air
      ? [[10, "1.0"], [20, "0.8"], [30, "0.6"], [40, "0.5"], [50, "0.4"], [Infinity, "0.3"]]
      : [[10, "0.8"], [20, "0.6"], [30, "0.5"], [40, "0.4"], [50, "0.3"], [Infinity, "0.2"]];
    for (var i = 0; i < t.length; i++) { if (w < t[i][0]) return t[i][1] + " m"; }
    return t[t.length - 1][1] + " m";
  }
  if (w < 1) return "1.0 m";
  if (w < 5) return "0.8 m";
  if (w < 10) return "0.5 m";
  return "0.25 m";
}
var DROP_SURFACES = {
  default: "按标准默认",
  concrete: "混凝土",
  hardwood: "硬木地板（≥13mm 铺水泥地）",
  steel: "钢板",
  marble: "大理石"
};
function updateDrop() {
  var key = $("dropType").value;
  var m = DROP_RULES[key];
  if (!m) return;
  var w = parseFloat($("dropWeight").value);
  var h = m.weightBased ? (dropHeightByWeight(w, m.stdId) || "输入重量") : m.fixedH;
  $("dropResult").textContent = h;
  $("dropStdLabel").textContent = m.std + " · " + m.clause;
  var surfEl = $("dropSurfaceSel");
  var surf = surfEl && surfEl.value !== "default" ? DROP_SURFACES[surfEl.value] : m.surface;
  $("dropSurface").textContent = surf;
  $("dropDir").textContent = m.dir;
  $("dropTimes").textContent = m.times;
  $("dropJudge").textContent = m.judge;
  var wNote;
  if (m.weightBased) {
    if (m.stdId === "ista") {
      wNote = "　·　ISTA 分档：≤9.5kg→0.76m、≤18.6kg→0.61m、≤27.7kg→0.46m、≤45.4kg→0.31m、≤68kg→0.20m";
    } else if (m.stdId === "gb4857_air") {
      wNote = "　·　GB/T 4857.5 航空分档：≤10kg→1.0m、≤20kg→0.8m、≤30kg→0.6m、≤40kg→0.5m、≤50kg→0.4m、&gt;50kg→0.3m";
    } else if (m.stdId === "gb4857_road" || m.stdId === "gb4857_rail") {
      wNote = "　·　GB/T 4857.5 公路/铁路分档：≤10kg→0.8m、≤20kg→0.6m、≤30kg→0.5m、≤40kg→0.4m、≤50kg→0.3m、&gt;50kg→0.2m";
    } else {
      wNote = "　·　重量分档：&lt;1kg→1.0m、1–5kg→0.8m、5–10kg→0.5m、&gt;10kg→0.25m";
    }
  } else {
    wNote = "　·　固定高度，不按重量";
  }
  $("dropNote").innerHTML = wNote +
    '　<a href="./sop-drop.html">跌落 SOP →</a>　<a href="./knowledge-detail.html?id=environment">环境可靠性知识卡 →</a>' +
    '<br>相关行业：<a href="./industries.html#battery">电池</a> · <a href="./industries.html#appliance">家电</a> · <a href="./industries.html#ict">IT/通信</a> · <a href="./industries.html#medical">医疗</a>';
}
function copyDrop() {
  var text = "跌落判定（安规计算工具）\n" +
    $("dropStdLabel").textContent + "\n" +
    "建议跌落高度：" + $("dropResult").textContent + "\n" +
    "跌落表面：" + $("dropSurface").textContent + "\n" +
    "方向：" + $("dropDir").textContent + "\n" +
    "次数：" + $("dropTimes").textContent + "\n" +
    "判定：" + $("dropJudge").textContent;
  copyText(text, $("dropCopyBtn"));
}

// ===== 事件绑定 =====
[["lkCap", updateLeakage], ["lkV", updateLeakage], ["lkF", updateLeakage],
 ["ycLimit", updateYCap], ["ycV", updateYCap], ["ycF", updateYCap],
 ["thMode", updateThermal], ["thBase", updateThermal], ["thP", updateThermal], ["thRth", updateThermal], ["thArea", updateThermal],
 ["uKm", unitFrom], ["uM", unitFrom], ["uCm", unitFrom], ["uMm", unitFrom], ["uUm", unitFrom], ["uMil", unitFrom], ["uInch", unitFrom],
 ["uUv", unitFrom], ["uDb", unitFrom], ["uC", unitFrom], ["uF", unitFrom],
 ["uA", unitFrom], ["uAm", unitFrom], ["uAu", unitFrom], ["uAn", unitFrom], ["uV", unitFrom], ["uVm", unitFrom], ["uVk", unitFrom],
 ["uGHz", unitFrom], ["uHz", unitFrom], ["uKHz", unitFrom], ["uMHz", unitFrom], ["uSec", unitFrom], ["uMs", unitFrom], ["uUs", unitFrom], ["uNs", unitFrom], ["uJ", unitFrom], ["uWh", unitFrom],
 ["uOhmV", ohmSet], ["uOhmI", ohmSet], ["uOhmR", ohmSet], ["uOhmP", ohmSet],
 ["dcV0", updateDischarge], ["dcC", updateDischarge], ["dcR", updateDischarge],
 ["rvDist", updateReverse], ["rvPd", updateReverse], ["rvGp", updateReverse], ["rvIns", updateReverse], ["rvAlt", updateReverse], ["rvSys", updateReverse],
 ["cmpVolt", updateCompare], ["cmpPd", updateCompare], ["cmpGp", updateCompare], ["cmpIns", updateCompare], ["cmpSys", updateCompare], ["cmpOvc", updateCompare],
 ["gndI", updateGrounding], ["gndV", updateGrounding],
 ["selvType", updateSelv], ["selvV", updateSelv],
 ["fuseI", updateFuse], ["gwPos", updateGlowwire], ["nfPos", updateNeedleFlame], ["bpPos", updateBallPressure], ["ftProduct", updateFireDecision], ["batV", updateBattery], ["batAh", updateBattery],
 ["tlProduct", renderTestList], ["tlMarket", renderTestList],
["emcWaveType", renderEmcWave],
["mechOpen", renderMech], ["esU", renderEs], ["esI", renderEs], ["esC", renderEs],
["ipSolid", updateIp], ["ipWater", updateIp], ["ipAux", updateIp], ["ipSupp", updateIp], ["ikLevel", updateIk], ["dropType", updateDrop], ["dropWeight", updateDrop], ["dropSurfaceSel", updateDrop],
["ovcSys", updateOvc], ["ovcClass", updateOvc], ["altcAlt", updateAltCorr], ["altcGap", updateAltCorr], ["peS", updatePeSize], ["acdcAc", updateAcDc], ["acdcDc", updateAcDc]
].forEach(function (pair) {
  var el = $(pair[0]);
  if (el) el.addEventListener("input", function () { pair[1](pair[0]); });
});
document.querySelectorAll("[data-ip-scene]").forEach(function (b) {
  b.addEventListener("click", function () { applyIpScene(b.getAttribute("data-ip-scene")); });
});
document.querySelectorAll("[data-ik-scene]").forEach(function (b) {
  b.addEventListener("click", function () { applyIkScene(b.getAttribute("data-ik-scene")); });
});
document.querySelectorAll("#tlBody").forEach(function (b) {
  b.addEventListener("change", updateTestCount);
});
document.querySelectorAll("[data-discharge-preset]").forEach(function (b) {
  b.addEventListener("click", function () { applyDischargePreset(b.getAttribute("data-discharge-preset")); });
});
document.querySelectorAll("[data-tool-preset]").forEach(function (b) {
  b.addEventListener("click", function () { applyToolPreset(b.getAttribute("data-tool-preset")); });
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
var rvCopy = document.getElementById("rvCopyBtn");
if (rvCopy) rvCopy.addEventListener("click", copyReverse);
var dropCopy = document.getElementById("dropCopyBtn");
if (dropCopy) dropCopy.addEventListener("click", copyDrop);
var ipCopy = document.getElementById("ipCopyBtn");
if (ipCopy) ipCopy.addEventListener("click", copyIp);
var ikCopy = document.getElementById("ikCopyBtn");
if (ikCopy) ikCopy.addEventListener("click", copyIk);
var ovcCopy = document.getElementById("ovcCopyBtn");
if (ovcCopy) ovcCopy.addEventListener("click", copyOvc);
var altcCopy = document.getElementById("altcCopyBtn");
if (altcCopy) altcCopy.addEventListener("click", copyAltCorr);
var peCopy = document.getElementById("peCopyBtn");
if (peCopy) peCopy.addEventListener("click", copyPeSize);
var acdcCopy = document.getElementById("acdcCopyBtn");
if (acdcCopy) acdcCopy.addEventListener("click", copyAcDc);
var gotoHipot = document.getElementById("gotoHipotBtn");
if (gotoHipot) gotoHipot.addEventListener("click", function () { switchTool("hipot"); });

// 初始化
var savedTab = "";
try { savedTab = localStorage.getItem(TOOL_TAB_KEY) || ""; } catch (e) { /* ignore */ }
renderToolTabs();
renderToolMap();
switchTool(TOOL_TABS.indexOf(savedTab) !== -1 ? savedTab : "spacing");
switchCalcMode("forward");
updateLeakage(); updateYCap(); updateThermal(); updateDischarge();
updateReverse(); updateCompare(); updateGrounding(); updateSelv(); updateInsulChecklist();
updateFuse(); updateGlowwire(); updateNeedleFlame(); updateBallPressure(); updateFireDecision(); updateBattery(); renderTestList();
renderRecent(); renderEmcWave(); renderMech(); renderEs();
updateIp(); updateIk(); updateDrop();
updateOvc(); updateAltCorr(); updatePeSize(); updateAcDc("acdcAc");
injectCred();
var toolSearchTop = document.getElementById("toolSearchTop");
if (toolSearchTop) toolSearchTop.addEventListener("input", applyToolSearch);

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
