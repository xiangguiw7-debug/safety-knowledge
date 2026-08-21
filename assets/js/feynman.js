/* ============================================================
 * 费曼学习法（quiz.html 模式二）
 * 四步：① 抽一张知识卡 ② 不看内容、用自己的话讲 ③ 对照参考找卡壳点 ④ 复盘保存
 * 参考对照为启发式关键词提示，不评判对错——真正的判断标准是"能不能讲给自己听"。
 * 数据：知识卡（KNOWLEDGE_DETAILS），记录存 localStorage（可经数据备份页导出）。
 * ============================================================ */
(function () {
  "use strict";
  var KEY = "angui-feynman-v1";
  var DRAFT_KEY = "angui-feynman-draft-v1";
  var STATE_KEY = "angui-feynman-state-v1";
  var GROUP_NAMES = {
    framework: "框架与通用", shock: "防电击", energy: "能量危险", fire: "防火",
    thermal: "热量危险", mechanical: "机械危险", radiation: "辐射危险", chemical: "化学危险",
    emc: "EMC 与认证", medical: "医疗专项", cert: "认证流程", general: "通用环境"
  };
  // 安规领域术语（用于对照参考讲解，找"卡壳点"）
  var TERMS = [
    "SELV", "PELV", "MOPP", "MOOP", "SPD", "MOV", "GDT", "TVS", "TSS", "ESD", "EFT",
    "RoHS", "REACH", "WEEE", "SVHC", "CTI", "RTI", "HWI", "HAI", "GWFI", "GWIT",
    "OVC", "PFC", "SAR", "LPL", "CB", "RED", "LVD", "Hipot", "UL 94", "V-0", "5VA",
    "UN 38.3", "IP68", "IPX7", "基本绝缘", "附加绝缘", "加强绝缘", "双重绝缘", "功能绝缘",
    "保护阻抗", "接地连续性", "等电位", "接触电流", "患者漏电流", "泄漏电流", "可触及",
    "污染等级", "材料组", "过电压类别", "冲击电压", "工作电压", "系统电压", "海拔",
    "间隙", "爬电", "耐压", "浪涌", "温升", "阻燃", "接地", "限能", "保险丝",
    "电池", "热失控", "联锁", "急停", "防护罩", "光生物", "激光", "射频", "电离",
    "防爆", "生物相容", "风险管理", "过充", "过放", "短路", "泄放", "钳位",
    "暂降", "谐波", "功率因数", "电弧", "电弧闪光", "起痕", "滴液", "压痕", "蔓延",
    "热扩散", "泄压", "降额", "老化", "盐雾", "湿热", "温循", "振动", "跌落", "冲击",
    "防尘", "防水", "灼热丝", "针焰", "球压", "均质", "豁免", "工厂检查", "技术文件",
    "共模", "差模", "抛负载", "脉冲群", "抗扰", "发射", "传导", "辐射发射", "滤波器",
    "静电", "放电", "保持时间", "恢复时间"
  ];
  var STOP = new Set([
    "安全", "保护", "设计", "要求", "测试", "标准", "使用", "进行", "可以", "需要",
    "通过", "是否", "什么", "所有", "其他", "相关", "常见", "主要", "基本", "附加",
    "加强", "双重", "正常", "故障", "产品", "设备", "电路", "部件", "材料", "表面",
    "方式", "过程", "结果", "功能", "结构", "风险", "管理", "系统", "环境", "等级",
    "类别", "类型", "项目", "内容", "情况", "条件", "方法", "步骤", "流程", "原则",
    "逻辑", "概念", "定义", "作用", "目的", "一个", "不能", "不会", "没有", "必须",
    "应该", "以及", "其中", "属于", "分为", "按照", "根据", "对于", "如果", "那么",
    "这个", "那个", "如何", "怎么", "之后", "之前", "同时", "另外", "就要", "就是",
    "是指", "称为", "叫作", "代表", "决定", "影响", "保证", "防止", "避免"
  ]);

  function $(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  function strip(h) {
    return String(h || "").replace(/<[^>]+>/g, " ").replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&#?w+;/g, " ").replace(/\s+/g, " ").trim();
  }
  function cards() { return window.KNOWLEDGE_DETAILS || {}; }
  function order() { return window.KNOWLEDGE_ORDER || Object.keys(cards()); }

  // ---- 参考讲解：取卡片"是什么"段 ----
  function introOf(card) {
    var html = card.html || "";
    var m = html.match(/<b>是什么[：:]\s*<\/b>([\s\S]*?)<\/p>/);
    if (m) return strip(m[1]);
    var first = (html.match(/<p>([\s\S]*?)<\/p>/) || [])[1];
    return first ? strip(first) : strip(html).slice(0, 200);
  }
  // ---- 关键词：术语表命中（标题 + 首段 + 卡片全文）+ 卡片加粗短语 ----
  function keywordsOf(card) {
    var pool = (card.title + " " + introOf(card) + " " + strip(card.html)).toLowerCase();
    var kw = TERMS.filter(function (t) { return pool.indexOf(t.toLowerCase()) !== -1; });
    (String(card.html).match(/<b>([^<]+)<\/b>/g) || []).forEach(function (b) {
      var s = strip(b);
      if (s.length >= 2 && s.length <= 5 && !STOP.has(s) && kw.indexOf(s) === -1 && kw.length < 14) kw.push(s);
    });
    return kw.sort(function (a, b) { return b.length - a.length; }).slice(0, 14);
  }
  function markRef(reference, hits, input) {
    var html = esc(reference);
    var norm = (input || "").toLowerCase();
    hits.forEach(function (t) {
      if (norm.indexOf(t.toLowerCase()) !== -1) {
        html = html.split(t).join('<mark class="feyn-hit">' + t + "</mark>");
      }
    });
    return html;
  }

  // ---- localStorage ----
  function getRecs() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveRecs(r) { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch (e) { /* ignore */ } }
  function getDraft() { try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch (e) { return {}; } }
  function saveDraft(d) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ } }

  // ---- 状态 ----
  var currentId = null;
  var currentMisses = [];

  function toast(msg) { if (window.AnGuiUX) window.AnGuiUX.toast(msg); }

  function pick(id, keepText) {
    var c = cards()[id];
    if (!c) return;
    currentId = id;
    currentMisses = [];
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ id: id })); } catch (e) { /* ignore */ }
    $("feynTitle").textContent = c.title;
    $("feynDetailLink").href = "knowledge-detail.html?id=" + encodeURIComponent(id);
    if (!keepText) $("feynExplain").value = getDraft()[id] || "";
    $("feynCompare").disabled = ($("feynExplain").value || "").trim().length < 8;
    $("feynResult").hidden = true;
    $("feynResult").innerHTML = "";
    $("feynSaveArea").hidden = true;
    $("feynProgress").hidden = true;
    $("feynAnalog").value = "";
    $("feynWork").hidden = false;
    $("feynExplain").focus();
    window.scrollTo({ top: $("feynWork").getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }

  function resetWork() {
    $("feynWork").hidden = true;
    $("feynResult").hidden = true;
    $("feynSaveArea").hidden = true;
    currentId = null;
  }

  function currentGroup() { return $("feynGroup").value || null; }

  function pickRandom() {
    var g = currentGroup();
    var pool = order().filter(function (id) {
      if (!cards()[id]) return false;
      if (g) return cards()[id].hazard === g;
      return true;
    });
    if (!pool.length) { toast("该分组暂无知识卡"); return; }
    var id = pool[Math.floor(Math.random() * pool.length)];
    pick(id);
  }

  function compare() {
    if (!currentId) return;
    var input = $("feynExplain").value || "";
    if (input.trim().length < 8) { toast("先写下你的讲解（至少一句话）再对照"); return; }
    var d = getDraft(); d[currentId] = input; saveDraft(d);
    var card = cards()[currentId];
    var kw = keywordsOf(card);
    var norm = input.toLowerCase();
    var hits = kw.filter(function (t) { return norm.indexOf(t.toLowerCase()) !== -1; });
    currentMisses = kw.filter(function (t) { return norm.indexOf(t.toLowerCase()) === -1; });
    var html = "";
    html += '<p class="feyn-label"><b>参考讲解（来自知识卡）：</b></p>';
    html += '<div class="feyn-ref">' + markRef(introOf(card), hits, input) + "</div>";
    html += '<p class="feyn-label"><b>卡壳点' + (currentMisses.length ? "（参考里有、你的讲解没提到）" : "") + '：</b></p>';
    if (currentMisses.length) {
      html += '<div class="feyn-gaps">' + currentMisses.map(function (t) { return '<span class="feyn-gap">' + esc(t) + "</span>"; }).join("") + "</div>";
      html += '<p class="feyn-hint">把卡壳点讲清楚，再复述一遍会更牢；可点上方"查看知识卡详情"补课。</p>';
    } else if (hits.length) {
      html += '<p class="feyn-ok">参考里的关键点你都讲到了，很棒！🎉 试着再加一个生活类比，让小白也记住。</p>';
    } else {
      html += '<p class="feyn-hint">这篇参考讲解较简短，直接对照上面内容自查即可；也可点"查看知识卡详情"看完整规则。</p>';
    }
    $("feynResult").innerHTML = html;
    $("feynResult").hidden = false;
    $("feynSaveArea").hidden = false;
  }

  function saveRecord() {
    if (!currentId) return;
    var card = cards()[currentId];
    var prev = getRecs().filter(function (r) { return r.id === currentId; })[0];
    var prevGaps = prev ? (prev.gaps || []) : null;
    var rec = {
      id: currentId,
      title: card.title,
      date: new Date().toISOString().slice(0, 10),
      text: $("feynExplain").value || "",
      gaps: currentMisses.slice(),
      analog: ($("feynAnalog").value || "").trim()
    };
    var recs = getRecs();
    recs.unshift(rec);
    saveRecs(recs);
    renderRecords();
    var times = recs.filter(function (r) { return r.id === currentId; }).length;
    renderProgress(prevGaps, currentMisses.slice(), times);
    toast("费曼记录已保存");
    var pr = $("feynProgress");
    if (pr) window.scrollTo({ top: pr.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }

  // 复习对比：上次卡壳点 vs 本次卡壳点
  function renderProgress(prevGaps, curGaps, times) {
    var box = $("feynProgress");
    if (!box) return;
    var html = '<div class="feyn-progress">';
    html += '<h3 style="margin:0 0 6px">📈 复习对比 · 第 ' + times + ' 次讲这张卡</h3>';
    if (!prevGaps) {
      html += '<p style="margin:4px 0">首次讲解，已记录' + (curGaps.length ? ' ' + curGaps.length + ' 个卡壳点' : '') + '。下次讲之前，先点"查看知识卡详情"把卡壳点补上。</p>';
    } else {
      var solved = prevGaps.filter(function (g) { return curGaps.indexOf(g) === -1; });
      var still = prevGaps.filter(function (g) { return curGaps.indexOf(g) !== -1; });
      var newly = curGaps.filter(function (g) { return prevGaps.indexOf(g) === -1; });
      if (solved.length) html += '<p style="margin:4px 0"><span class="feyn-solved">✓ 已攻克 ' + solved.length + '</span>：' + solved.map(esc).join("、") + "</p>";
      if (still.length) html += '<p style="margin:4px 0"><span class="feyn-still">↻ 仍卡住 ' + still.length + '</span>：' + still.map(esc).join("、") + "</p>";
      if (newly.length) html += '<p style="margin:4px 0"><span class="feyn-new">+ 本次新增 ' + newly.length + '</span>：' + newly.map(esc).join("、") + "</p>";
      var verdict = solved.length === 0 && prevGaps.length
        ? "这轮还没有补上上一轮的卡壳点，对照参考再讲一遍试试。"
        : "进步可见：上一轮 " + prevGaps.length + " 个卡壳点，已攻克 " + solved.length + " 个。";
      html += '<p style="margin:6px 0 0;color:var(--muted);font-size:12.5px">' + verdict + ' 点「换一张」继续，或「复习 →」回到知识卡详情。</p>';
    }
    html += "</div>";
    box.innerHTML = html;
    box.hidden = false;
  }

  // ---- 记录区 ----
  function renderRecords() {
    var box = $("feynRecords");
    var recs = getRecs();
    var cnt = $("feynCount");
    if (cnt) cnt.textContent = recs.length;
    if (!box) return;
    var seen = {};
    box.innerHTML = recs.length
      ? recs.map(function (r, i) {
          seen[r.id] = (seen[r.id] || 0) + 1;
          return '<div class="feyn-rec">' +
            "<p><b>" + (i + 1) + '. ' + esc(r.title) + "</b>" +
            '<span style="color:var(--muted);font-size:12px;margin-left:8px">' + esc(r.date) + " · 第 " + seen[r.id] + " 次</span>" +
            '<a style="margin-left:8px;font-size:12px" href="knowledge-detail.html?id=' + encodeURIComponent(r.id) + '" >复习 →</a></p>' +
            (r.gaps && r.gaps.length ? '<p style="font-size:12.5px;color:var(--muted)">卡壳点：<span class="feyn-gap">' + r.gaps.map(esc).join("</span> <span class='feyn-gap'>") + "</span></p>" : "") +
            (r.analog ? '<p style="font-size:12.5px;color:var(--accent)">💡 ' + esc(r.analog) + "</p>" : "") +
            '<button type="button" class="btn feyn-del" data-idx="' + i + '" style="font-size:12px;padding:2px 10px">删除</button>' +
            "</div>";
        }).join("")
      : '<p style="color:var(--muted);margin:0">还没有费曼记录：抽一张知识卡，讲一遍，对照找卡壳点，保存复盘。</p>';
    box.querySelectorAll(".feyn-del").forEach(function (b) {
      b.addEventListener("click", function () {
        var recs2 = getRecs();
        recs2.splice(parseInt(this.getAttribute("data-idx"), 10), 1);
        saveRecs(recs2);
        renderRecords();
      });
    });
  }

  function exportText() {
    var recs = getRecs();
    if (!recs.length) { toast("还没有费曼记录"); return; }
    var txt = "费曼学习法记录（安规知识课堂）\n共 " + recs.length + " 条\n\n" +
      recs.map(function (r, i) {
        return (i + 1) + '. ' + r.title + "（" + r.date + "）\n" +
          "讲解：" + r.text + "\n" +
          (r.gaps.length ? "卡壳点：" + r.gaps.join("、") + "\n" : "") +
          (r.analog ? "一句话类比：" + r.analog + "\n" : "");
      }).join("\n\n");
    function fin() { toast("记录已复制"); }
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(fin).catch(fin); }
    else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); fin(); }
  }

  // ---- 模式切换：自测 / 费曼 ----
  function applyMode(mode) {
    var isQuiz = mode === "quiz";
    var chips = document.querySelector(".quiz-chips");
    var count = $("quizCount");
    var app = $("quizApp");
    var extras = $("quizExtras");
    var feyn = $("feynmanApp");
    if (chips) chips.style.display = isQuiz ? "" : "none";
    if (count) count.style.display = isQuiz ? "" : "none";
    if (app) app.style.display = isQuiz ? "" : "none";
    if (extras) extras.style.display = isQuiz ? "" : "none";
    if (feyn) feyn.hidden = isQuiz;
  }
  function bindModeToggle() {
    document.querySelectorAll("[data-qmode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = this.getAttribute("data-qmode");
        document.querySelectorAll("[data-qmode]").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        applyMode(mode);
        // 用 URL 锚点记住模式：从详情页返回（浏览器后退）时能恢复费曼界面
        try {
          var base = window.location.pathname + window.location.search;
          history.replaceState(null, "", mode === "feynman" ? base + "#feynman" : base);
        } catch (e) { /* ignore */ }
      });
    });
  }

  // ---- 样式（功能局部） ----
  function injectStyle() {
    if (document.getElementById("feynmanStyle")) return;
    var st = document.createElement("style");
    st.id = "feynmanStyle";
    st.textContent =
      ".quiz-mode{display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap}" +
      ".quiz-mode button{border:1px solid var(--border);background:var(--card);color:var(--fg);border-radius:999px;padding:6px 16px;font-size:14px;cursor:pointer;font-family:inherit}" +
      ".quiz-mode button.active{background:var(--accent);border-color:var(--accent);color:#fff}" +
      ".feyn-ref{background:var(--card-2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;font-size:14px;line-height:1.7;margin:6px 0 12px}" +
      ".feyn-ref mark.feyn-hit{background:rgba(52,199,89,.18);color:inherit;padding:0 2px;border-radius:3px}" +
      ".feyn-label{margin:10px 0 6px}" +
      ".feyn-gaps{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}" +
      ".feyn-gap{background:rgba(255,149,0,.12);border:1px solid rgba(255,149,0,.35);color:var(--fg);border-radius:999px;padding:2px 10px;font-size:12.5px}" +
      ".feyn-ok{color:var(--ok-fg);font-size:14px}" +
      ".feyn-hint{color:var(--muted);font-size:12.5px;margin:4px 0 0}" +
      ".feyn-rec{border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin:8px 0}" +
      ".feyn-rec p{margin:4px 0}" +
      ".feyn-progress{border:1px solid var(--accent);background:var(--accent-soft);border-radius:10px;padding:10px 14px;margin:12px 0;font-size:13.5px;line-height:1.6}" +
      ".feyn-solved{color:var(--ok-fg);font-weight:600}" +
      ".feyn-still{color:var(--warn-fg);font-weight:600}" +
      ".feyn-new{color:var(--accent);font-weight:600}";
    document.head.appendChild(st);
  }

  // ---- 初始化 ----
  function restoreSession() {
    // 从 URL 锚点恢复费曼模式（浏览器后退/刷新后回到原界面）
    if (window.location.hash === "#feynman") {
      document.querySelectorAll("[data-qmode]").forEach(function (b) {
        var on = b.getAttribute("data-qmode") === "feynman";
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      applyMode("feynman");
      // 恢复上次讲解的卡片（草稿已自动保存）
      var st = null;
      try { st = JSON.parse(localStorage.getItem(STATE_KEY)) || null; } catch (e) { st = null; }
      if (st && st.id && cards()[st.id]) pick(st.id, true);
    }
  }

  function init() {
    injectStyle();
    bindModeToggle();
    restoreSession();
    var pickBtn = $("feynPick"), pickGroupBtn = $("feynPickGroup"), groupSel = $("feynGroup");
    if (!pickBtn) return;
    var opts = ["<option value=\"\">按分组抽…</option>"].concat(
      Object.keys(GROUP_NAMES).map(function (g) { return '<option value="' + g + '">' + GROUP_NAMES[g] + "</option>"; })
    ).join("");
    groupSel.innerHTML = opts;
    pickBtn.addEventListener("click", pickRandom);
    pickGroupBtn.addEventListener("click", function () {
      if (!currentGroup()) { toast("请先在上方选择分组"); return; }
      pickRandom();
    });
    $("feynAgain").addEventListener("click", pickRandom);
    $("feynCompare").addEventListener("click", compare);
    $("feynSave").addEventListener("click", saveRecord);
    $("feynExplain").addEventListener("input", function () {
      var v = this.value;
      $("feynCompare").disabled = v.trim().length < 8;
      if (currentId) { var d = getDraft(); d[currentId] = v; saveDraft(d); }
    });
    var ex = $("feynExport");
    if (ex) ex.addEventListener("click", exportText);
    var cl = $("feynClear");
    if (cl) cl.addEventListener("click", function () {
      if (!getRecs().length) { toast("还没有费曼记录"); return; }
      saveRecs([]);
      renderRecords();
      toast("费曼记录已清空");
    });
    renderRecords();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
