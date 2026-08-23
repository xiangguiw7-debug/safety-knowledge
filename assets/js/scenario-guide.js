/* 场景向导 + 决策助手（tools.html）
 * ⑦ 产品 → 推荐工具 / 知识卡 / SOP
 * ⑧ 决策树：绝缘配合选参、认证路径选择
 */
(function () {
  "use strict";
  // ---- ⑦ 产品场景 → 推荐 ----
  var SCENARIOS = {
    power:   { name: "电源 / 充电器", tools: ["tool-spacing","tool-hipot","tool-leakage","tool-discharge","tool-fuse"], cards: ["protection","components","energy","ovc"], sops: ["sop-hipot","sop-leakage","sop-spacing"], quiz: "shock" },
    lighting:{ name: "LED 灯具 / 照明", tools: ["tool-ip","tool-spacing","tool-hipot","tool-glow-wire"], cards: ["ip","ovc","firetests","optical"], sops: ["sop-ip","sop-glow-wire","sop-photobiological"], quiz: "shock" },
    appliance:{ name: "家用电器", tools: ["tool-spacing","tool-hipot","tool-thermal","tool-glow-wire","tool-leakage"], cards: ["protection","temperature","flame","leakage"], sops: ["sop-temperature-rise","sop-glow-wire","sop-leakage"], quiz: "shock" },
    medical: { name: "医疗设备", tools: ["tool-spacing","tool-hipot","tool-leakage"], cards: ["risk","software","biocompat","protection"], sops: ["sop-functional-safety","sop-hipot"], quiz: "medical" },
    itav:    { name: "IT / 网络 / 音视频", tools: ["tool-spacing","tool-hipot","tool-emcwave"], cards: ["protection","emc","transient"], sops: ["sop-hipot","sop-surge","sop-esd"], quiz: "emc" },
    battery: { name: "电池 / 储能", tools: ["tool-battery","tool-thermal","tool-spacing"], cards: ["battery","energy","transient"], sops: ["sop-battery-short","sop-thermal-runaway","sop-battery-drop"], quiz: "battery" },
    powertools:{ name: "电动工具", tools: ["tool-spacing","tool-hipot","tool-mech","tool-drop"], cards: ["mechanical","protection","drop"], sops: ["sop-mechanical-strength","sop-drop","sop-hipot"], quiz: "mechanical" },
    industrial:{ name: "工业 / 机械", tools: ["tool-spacing","tool-hipot","tool-mech"], cards: ["mechanical","functional","ovc"], sops: ["sop-functional-safety","sop-hipot"], quiz: "mechanical" },
    wireless:{ name: "物联网 / 无线", tools: ["tool-ip","tool-spacing","tool-emcwave"], cards: ["radhaz","emc","ip"], sops: ["sop-sar","sop-esd","sop-radiated-emission"], quiz: "radiation" },
    automotive:{ name: "汽车电子", tools: ["tool-spacing","tool-hipot","tool-emcwave"], cards: ["transient","temperature","battery"], sops: ["sop-temperature-rise","sop-hipot"], quiz: "emc" }
  };
  var CARD_IDS = { protection:1, productclass:1, access:1, cti:1, ovc:1, leakage:1, grounding:1, selv:1, energy:1, components:1, "fire-design":1, flame:1, firetests:1, temperature:1, battery:1, mechanical:1, functional:1, optical:1, radhaz:1, rohs:1, explosion:1, emc:1, dmcm:1, harmonic:1, transient:1, ip:1, ik:1, environment:1, drop:1, biocompat:1, risk:1, software:1, certprocess:1, stdguide:1 };
  function cardTitle(id) {
    if (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[id]) return KNOWLEDGE_DETAILS[id].title;
    return id;
  }

  function renderScenario(key) {
    var box = document.getElementById("scenOut");
    var s = SCENARIOS[key];
    if (!box || !s) return;
    var html = "";
    html += '<div class="card" style="margin-top:12px"><h3>🎯 ' + s.name + ' · 推荐学习包</h3>';
    html += '<p><b>🧮 计算工具：</b>' + s.tools.map(function (t) { return '<a class="tag" href="./tools.html#' + t + '">' + (document.getElementById(t) && document.getElementById(t).querySelector("h2") ? document.getElementById(t).querySelector("h2").textContent.replace(/<[^>]+>/g, "").slice(0, 14) : t.replace("tool-", "")) + "</a>"; }).join(" ") + "</p>";
    html += '<p><b>📇 知识卡：</b>' + s.cards.map(function (c) { return '<a class="tag" href="./knowledge-detail.html?id=' + c + '">' + cardTitle(c).slice(0, 14) + "</a>"; }).join(" ") + "</p>";
    html += '<p><b>📋 SOP：</b>' + s.sops.map(function (sop) { return '<a class="tag" href="./' + sop + '.html">' + sop.replace("sop-", "") + "</a>"; }).join(" ") + "</p>";
    html += '<p><b>✅ 自测：</b><a class="btn" href="./quiz.html?module=' + s.quiz + '">去答 ' + s.quiz + ' 模块</a></p></div>';
    box.innerHTML = html;
  }

  // ---- ⑧ 决策树 ----
  var DECIDE_INS = {
    q: [
      { k: "cls", t: "产品类别", opts: [["I", "I 类（接地保护）"], ["II", "II 类（双重绝缘）"], ["III", "III 类（SELV 供电）"]] },
      { k: "v", t: "工作电压", opts: [["50", "≤ 50 V"], ["125", "50–125 V"], ["250", "125–250 V（宽压按 250V）"], ["400", "> 250 V"]] },
      { k: "pd", t: "污染等级", opts: [["1", "1（密封/干燥）"], ["2", "2（一般室内）"], ["3", "3（工业/潮湿）"]] },
      { k: "gp", t: "材料组（CTI）", opts: [["I", "Ⅰ（CTI ≥ 600）"], ["II", "Ⅱ（400–600）"], ["IIIa", "Ⅲa（175–400）"], ["IIIb", "Ⅲb（100–175）"]] },
      { k: "ins", t: "绝缘类型", opts: [["basic", "基本绝缘"], ["supplementary", "附加绝缘"], ["reinforced", "加强绝缘"]] }
    ],
    out: function (a) {
      var hints = [];
      hints.push("爬电距离查表：工作电压 " + (a.v || "?") + "V → 污染 " + (a.pd || "?") + " → 材料组 " + (a.gp || "?") + " → 基准 × " + (a.ins === "reinforced" ? "2（加强≈2×）" : "1"));
      hints.push("电气间隙查表：系统电压 + 过电压类别（OVC）→ 冲击耐受 → 基准 × 海拔系数 × 绝缘系数（去计算工具里选）");
      if (a.cls === "III") hints.push("III 类由 SELV 供电：SELV 内部电路豁免，到危险电路侧的参考距离仍需满足");
      return hints;
    }
  };
  var DECIDE_CERT = {
    q: [
      { k: "mkt", t: "目标市场", opts: [["cn", "中国"], ["eu", "欧盟"], ["us", "美国"], ["jp", "日本"], ["global", "多国/全球"]] },
      { k: "prod", t: "产品", opts: [["appliance", "家电"], ["power", "电源/充电器"], ["lighting", "灯具"], ["medical", "医疗"], ["itav", "IT/网络"], ["wireless", "无线设备"], ["battery", "电池/储能"]] }
    ],
    out: function (a) {
      var m = { cn: "CCC：型式试验 + 工厂检查 + 监督（关键件一致性/变更控制）", eu: "CE：技术文件 + DoC（特定指令需公告机构）；RED 需 RF/EMC 评估", us: "FCC（SDoC 或认证）+ UL（常为渠道要求）", jp: "PSE（特定用品认证/非特定自我符合，菱形/圆形区分）", global: "建议 CB 测试证书 + 各国转证（注意国家差异）" };
      var p = { appliance: "IEC 60335-1（+ 2-x 特殊要求）", power: "IEC 62368-1（或 60950-1 旧版）", lighting: "IEC 60598-1（+ 61347 驱动）", medical: "IEC 60601-1（+ 风险管理 14971 / 软件 62304）", itav: "IEC 62368-1", wireless: "RED / FCC Part 15 + SAR", battery: "IEC 62133 / UN 38.3（运输）" };
      return ['目标市场 → ' + (m[a.mkt] || '按目标国分别核对'), '产品标准 → ' + (p[a.prod] || '按品类核对'), '建议：用<a href="./wizard.html">认证向导</a>按国家×产品生成完整清单，用<a href="./certification.html">认证速查</a>核对标志'];
    }
  };
  var DECIDES = { ins: { title: "绝缘配合 · 查距参数怎么选", def: DECIDE_INS }, cert: { title: "认证路径 · 怎么走", def: DECIDE_CERT } };

  function renderDecision(id) {
    var box = document.getElementById("decide" + id);
    var box2 = document.getElementById("decideOut" + id);
    if (!box || !box2) return;
    var d = DECIDES[id].def;
    var html = "";
    d.q.forEach(function (qq, i) {
      html += '<p style="margin:8px 0 4px"><b>' + (i + 1) + '. ' + qq.t + '：</b></p>';
      html += '<select id="dec_' + id + '_' + qq.k + '" data-decide="' + id + '" data-key="' + qq.k + '" style="padding:6px 10px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--fg);font-family:inherit">' +
        '<option value="">请选择…</option>' + qq.opts.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + "</option>"; }).join("") + "</select>";
    });
    box.innerHTML = html;
    box2.innerHTML = '<p style="color:var(--muted);margin:10px 0 0">选完上面的条件，这里会给出结论与下一步。</p>';
    box.querySelectorAll("[data-decide]").forEach(function (sel) {
      sel.addEventListener("change", function () { evalDecision(this.getAttribute("data-decide")); });
    });
  }
  function evalDecision(id) {
    var box = document.getElementById("decideOut" + id);
    var d = DECIDES[id].def;
    var a = {};
    var done = true;
    d.q.forEach(function (qq) {
      var sel = document.getElementById("dec_" + id + "_" + qq.k);
      var v = sel ? sel.value : "";
      a[qq.k] = v;
      if (!v) done = false;
    });
    if (!done) { box.innerHTML = '<p style="color:var(--muted);margin:10px 0 0">请选择全部条件，再查看结论。</p>'; return; }
    box.innerHTML = '<div class="card" style="margin-top:10px"><p style="margin:0">' + d.out(a).map(function (h) { return "· " + h; }).join("<br>") + "</p></div>";
  }

  function init() {
    var sel = document.getElementById("scenSel");
    if (sel) {
      sel.innerHTML = '<option value="">选择你的产品类型…</option>' + Object.keys(SCENARIOS).map(function (k) { return '<option value="' + k + '">' + SCENARIOS[k].name + "</option>"; }).join("");
      sel.addEventListener("change", function () { renderScenario(this.value); });
    }
    Object.keys(DECIDES).forEach(renderDecision);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
