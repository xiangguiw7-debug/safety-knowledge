// ===== 污染等级判定器（PD1–PD4）：IEC 60664-1 / GB/T 16935.1 =====
// 判定对象是“绝缘表面的微观环境”，不是房间/厂区的宏观环境；结果可联动间距工具。
(function () {
  "use strict";

  var KEY = "angui-pd";

  var PD_INFO = {
    1: {
      name: "PD1",
      title: "污染等级 1 · 洁净干燥",
      sub: "绝缘表面无有效污染，或只有干燥的非导电污染。",
      desc: "无污染，或仅有干燥的非导电污染且无影响",
      action: "可按最清洁条件取值，但先确认产品标准是否提供这一档：灯具 GB 7000.1 第 11 章只按污染等级 2（表11.1）与 3（表11.2）给出数值，没有 PD1 列；医疗 GB 9706.1 表11 / 表12 按污染等级 2 给出，能否按 PD1 放宽要看标准相应条款（本工具仍按 PD2，偏保守）；通用 IEC 60664-1 表另有 PD1 列，数值更小。"
    },
    2: {
      name: "PD2",
      title: "污染等级 2 · 以非导电污染为主",
      sub: "干燥粉尘 + 偶尔凝露，短暂导电后恢复干燥。",
      desc: "一般只有非导电污染；必须预期到凝露会偶尔发生短暂的导电性污染",
      action: "最常用的取值条件：灯具 → 一般灯具查表11.1；医疗 → 表11 / 表12 的常规取值；通用 IEC 60664-1 → 按 PD2 列查爬电表。"
    },
    3: {
      name: "PD3",
      title: "污染等级 3 · 导电污染 / 反复受潮",
      sub: "污染本身导电，或反复受潮使干燥沉积物变导电。",
      desc: "存在导电性污染，或因预期的凝露使干燥的非导电污染变为导电性污染",
      action: "灯具：需把灯具分类做到 IPX1 及以上并查表11.2（污染等级 3）。医疗：标准表按污染等级 2 给出，需先用外壳 / 密封把微观环境降到 2 级，或按标准特殊条款评估。通用：按 PD3 列查表（数值最大）。"
    },
    4: {
      name: "PD4",
      title: "污染等级 4 · 持久导电",
      sub: "雨淋、持续水膜或导电尘埃使表面可能长期导电。",
      desc: "污染造成持久导电（导电尘埃、雨、雪、持续水膜）",
      action: "标准爬电 / 间隙表不提供 PD4 数值：必须先靠外壳密封、灌封、涂覆、排水、加热除湿等把绝缘处降到 PD3 及以下再查表；或按产品标准的专门结构与方法评估。"
    }
  };

  // 快速开始：典型场景（示例起点，采用前需逐项复核）
  var QUICK = {
    clean: { q1: "clean", q2: "dry", q3: "enclosure" },
    indoor: { q1: "dry", q2: "occasional", q3: "none" },
    cabinet: { q1: "dry", q2: "recurring", q3: "none" },
    outdoor: { q1: "conductive", q2: "wet", q3: "none" }
  };

  var Q1_TEXT = {
    clean: "到达绝缘表面的污染：洁净干燥（无尘、无残留）",
    dry: "到达绝缘表面的污染：干燥粉尘 / 残留（干燥时不导电）",
    conductive: "到达绝缘表面的污染：导电性污染（金属屑、盐、碳粉、离子残留）"
  };
  var Q2_TEXT = {
    dry: "潮气：始终干燥，不预期凝露",
    occasional: "潮气：偶尔凝露，短暂变潮后干",
    recurring: "潮气：反复受潮",
    wet: "潮气：雨淋或持续水膜"
  };
  var Q3_TEXT = {
    none: "防护：无专门防护",
    enclosure: "防护：受控外壳或空调环境（未按 IEC 60664-3 验证）",
    qualified: "防护：已认证的涂覆 / 灌封（按 IEC 60664-3 验证）"
  };

  function $(id) { return document.getElementById(id); }

  function activeAttr(groupId, attr, fallback) {
    var el = document.querySelector("#" + groupId + " .opt-btn.active");
    var v = el ? el.getAttribute(attr) : null;
    return v === null ? fallback : v;
  }

  function setActive(groupId, attr, value) {
    document.querySelectorAll("#" + groupId + " .opt-btn").forEach(function (b) {
      var on = b.getAttribute(attr) === value;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function state() {
    return {
      q1: activeAttr("pdQ1", "data-pd1", "dry"),
      q2: activeAttr("pdQ2", "data-pd2", "occasional"),
      q3: activeAttr("pdQ3", "data-pd3", "none")
    };
  }

  // 判定规则（保守筛选）：
  //   雨淋/持续水膜 → PD4
  //   导电性污染 或 反复受潮 → PD3
  //   干燥粉尘 或 偶尔凝露 → PD2
  //   洁净干燥 → PD1
  function computePd(s) {
    if (s.q2 === "wet") return 4;
    if (s.q1 === "conductive" || s.q2 === "recurring") return 3;
    if (s.q1 === "dry" || s.q2 === "occasional") return 2;
    return 1;
  }

  function whyText(s, pd) {
    var reason;
    if (s.q2 === "wet") reason = "因为存在雨淋或持续水膜，绝缘表面可能长期保持导电 → PD4。";
    else if (s.q1 === "conductive") reason = "因为导电性污染（金属屑 / 盐 / 碳粉 / 离子残留）能到达绝缘表面 → PD3。";
    else if (s.q2 === "recurring") reason = "因为反复受潮会把干燥的非导电污染变成导电污染 → PD3。";
    else if (s.q1 === "dry") reason = "污染本身不导电，凝露也只是短暂出现 → PD2。";
    else if (s.q2 === "occasional") reason = "绝缘处洁净，但偶尔凝露会短暂导电 → PD2。";
    else reason = "绝缘处洁净干燥，无有效污染 → PD1。";
    return Q1_TEXT[s.q1] + "　·　" + Q2_TEXT[s.q2] + "　·　" + Q3_TEXT[s.q3] + "。" + reason;
  }

  function protectionText(s) {
    if (s.q3 === "qualified") {
      return "已认证的涂覆 / 灌封：IEC 60664-3 对涂层 / 灌封的材料、覆盖范围、工艺与试验有要求；满足时受保护区域可按更清洁的微观环境取值（须有试验证据）。注意未覆盖处（元件引脚根部、端子、开孔边缘、修补处）仍按环境判定。";
    }
    if (s.q3 === "enclosure") {
      return "受控外壳或空调环境：能限制粉尘与水的进入，但标准不据此直接把污染等级降一级；最终等级仍由凝露、导电沉积、开孔与维护方式决定。注意 IP 等级与污染等级没有直接换算关系。";
    }
    return "无专门防护：按绝缘表面的实际环境取值，并留出工艺与老化余量。";
  }

  function note(msg) {
    var el = $("pdLinkNote");
    if (el) el.innerHTML = msg || "";
  }

  function render() {
    var s = state();
    var pd = computePd(s);
    var info = PD_INFO[pd];
    // 顶部实时结果
    var chipEl = $("pdLiveChip");
    if (chipEl) chipEl.textContent = info.name;
    var liveTitleEl = $("pdLiveTitle");
    if (liveTitleEl) liveTitleEl.textContent = info.title;
    var liveSubEl = $("pdLiveSub");
    if (liveSubEl) liveSubEl.textContent = info.sub + "调整下面三组条件，结果立即更新。";
    // 四等级刻度条高亮
    document.querySelectorAll("#pdScale [data-pdscale]").forEach(function (box) {
      box.classList.toggle("on", Number(box.getAttribute("data-pdscale")) === pd);
    });
    // 结果详情
    var resEl = $("pdResult");
    if (resEl) resEl.textContent = info.name;
    var titleEl = $("pdTitle");
    if (titleEl) titleEl.textContent = info.title + "：" + info.desc + "。";
    var whyEl = $("pdWhy");
    if (whyEl) whyEl.textContent = "判定依据：" + whyText(s, pd);
    var actEl = $("pdAction");
    if (actEl) actEl.innerHTML = "<b>怎么用：</b>" + info.action;
    var protEl = $("pdProtected");
    if (protEl) protEl.textContent = protectionText(s);
    if ($("pdLinkNote")) {
      note("当前判定 " + info.name + "：可以用下面的按钮直接带到间距工具（灯具 / 医疗 / 通用反查）。判定为设计筛选，产品标准另有规定的以产品标准为准。");
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ pd: pd, q1: s.q1, q2: s.q2, q3: s.q3, at: Date.now() }));
    } catch (e) { /* ignore */ }
    // 立即回显到间距工具的“环境判定”一行（若间距工具已加载）
    if (typeof renderEnvPdNote === "function") {
      try { renderEnvPdNote(); } catch (e) { /* ignore */ }
    }
    if (window.AnguiPD) {
      window.AnguiPD.pd = pd;
      window.AnguiPD.state = s;
      window.AnguiPD.compute = computePd;
      window.AnguiPD.info = PD_INFO;
      window.AnguiPD.options = { q1: Q1_TEXT, q2: Q2_TEXT, q3: Q3_TEXT };
    }
  }

  function applyToSpacing(kind) {
    var s = state();
    var pd = computePd(s);
    if (typeof switchTool === "function") switchTool("spacing");
    if (typeof switchCalcMode === "function") switchCalcMode("forward");
    if (typeof currentState === "function" && typeof applyState === "function") {
      var st = currentState();
      st.lumMode = "std";
      if (kind === "medical") {
        st.std = "medical";
      } else {
        st.std = "luminaire";
        st.ip = kind === "ipx1" ? "ipx1" : "general";
      }
      applyState(st);
    }
    if (pd >= 4) {
      note("⚠ 判定为 PD4：已带入间距工具，但灯具 / 医疗标准表都不提供持久导电污染的数值——必须先用外壳密封 / 灌封 / 排水 / 除湿把绝缘处的污染降到 PD3 及以下，再按表取值。");
    } else if (pd === 3 && kind === "general") {
      note("⚠ 判定为 PD3：一般灯具查的是表11.1（污染等级 2），与环境不匹配——请把灯具分类做到 IPX1 及以上后改查表11.2，或先用密封 / 涂覆降低微观环境。");
    } else {
      note("已带入间距工具：标准 = " + (kind === "medical" ? "医疗（GB 9706.1 表11 / 表12）" : (kind === "ipx1" ? "灯具 · IPX1 及以上（表11.2，污染等级 3）" : "灯具 · 一般灯具（表11.1，污染等级 2）")) + "。");
    }
  }

  function applyToReverse() {
    var pd = computePd(state());
    var usePd = pd >= 4 ? 3 : pd;
    if (typeof switchTool === "function") switchTool("spacing");
    if (typeof switchCalcMode === "function") switchCalcMode("reverse");
    var sel = $("rvPd");
    if (sel) sel.value = String(usePd);
    if (typeof updateReverse === "function") updateReverse();
    note(pd >= 4
      ? "⚠ PD4 不能直接查表：已按最严的 PD3 带入通用反查（IEC 60664-1），请先降低绝缘处的污染。"
      : "已带入通用反查（IEC 60664-1）：污染等级 = PD" + usePd + "。");
  }

  function copyResult() {
    var s = state();
    var pd = computePd(s);
    var text = "污染等级判定（IEC 60664-1 / GB/T 16935.1）\n判定结果：" + PD_INFO[pd].name +
      "（" + PD_INFO[pd].desc + "）\n" + Q1_TEXT[s.q1] + "\n" + Q2_TEXT[s.q2] + "\n" + Q3_TEXT[s.q3] +
      "\n怎么用：" + PD_INFO[pd].action;
    if (typeof copyText === "function") copyText(text, $("pdCopyBtn"));
    else if (navigator.clipboard) navigator.clipboard.writeText(text);
  }

  function resetCommon() { applyQuick("indoor"); }

  // 快速开始：套用典型场景
  function applyQuick(key) {
    var q = QUICK[key];
    if (!q) return;
    setActive("pdQ1", "data-pd1", q.q1);
    setActive("pdQ2", "data-pd2", q.q2);
    setActive("pdQ3", "data-pd3", q.q3);
    render();
  }

  // 判定方法与依据：滚动到底部说明并短暂高亮
  function showMethod() {
    var el = $("pdMethodNote");
    if (!el) return;
    if (el.scrollIntoView) el.scrollIntoView({ block: "center", behavior: "smooth" });
    var old = el.style.background;
    el.style.transition = "background 0.3s";
    el.style.background = "var(--accent-soft)";
    setTimeout(function () { el.style.background = old || ""; }, 1400);
  }

  function bindGroup(groupId, attr) {
    document.querySelectorAll("#" + groupId + " .opt-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActive(groupId, attr, btn.getAttribute(attr));
        render();
      });
    });
  }

  function init() {
    if (!$("tool-pd")) return;
    // 恢复上次判定（同一次会话 / 同设备）
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.q1) setActive("pdQ1", "data-pd1", o.q1);
        if (o && o.q2) setActive("pdQ2", "data-pd2", o.q2);
        if (o && o.q3) setActive("pdQ3", "data-pd3", o.q3);
      }
    } catch (e) { /* ignore */ }

    bindGroup("pdQ1", "data-pd1");
    bindGroup("pdQ2", "data-pd2");
    bindGroup("pdQ3", "data-pd3");

    document.querySelectorAll("[data-pdquick]").forEach(function (btn) {
      btn.addEventListener("click", function () { applyQuick(btn.getAttribute("data-pdquick")); });
    });

    var b;
    if ((b = $("pdToLumGeneral"))) b.addEventListener("click", function () { applyToSpacing("general"); });
    if ((b = $("pdToLumIpx1"))) b.addEventListener("click", function () { applyToSpacing("ipx1"); });
    if ((b = $("pdToMedical"))) b.addEventListener("click", function () { applyToSpacing("medical"); });
    if ((b = $("pdToReverse"))) b.addEventListener("click", applyToReverse);
    if ((b = $("pdCopyBtn"))) b.addEventListener("click", copyResult);
    if ((b = $("pdResetBtn"))) b.addEventListener("click", resetCommon);
    if ((b = $("pdMethodBtn"))) b.addEventListener("click", showMethod);

    render();
  }

  window.AnguiPD = window.AnguiPD || {};

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
