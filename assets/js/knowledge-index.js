(function () {
  "use strict";
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function hashRedirect() {
    var h = decodeURIComponent(location.hash || "");
    if (!h || h === "#") return;
    var hid = h.slice(1);
    if (document.getElementById(hid) || (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[hid])) {
      location.replace("knowledge-detail.html?id=" + encodeURIComponent(hid));
    }
  }
  var EMOJI = { framework: "📋", shock: "⚡", electric: "⚡", energy: "💥", fire: "🔥", thermal: "🌡️", mechanical: "⚙️", radiation: "☢️", chemical: "🧪", emc: "📡", medical: "🏥", cert: "📄", general: "📦" };
  var DIFF = (typeof DIFF_LABEL !== "undefined") ? DIFF_LABEL : { 1: "入门", 2: "进阶", 3: "拔高" };
  function preview(html) {
    var t = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    var i = t.indexOf("是什么：");
    var s = i >= 0 ? t.slice(i + 4) : t;
    s = s.replace(/^[：: ]+/, "");
    return s.slice(0, 46) + (s.length > 46 ? "…" : "");
  }
  function cardTitle(id) {
    return (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[id] && KNOWLEDGE_DETAILS[id].title) || id;
  }

  document.querySelectorAll(".knowledge-grid section.card[id]").forEach(function (card) {
    var id = card.id;
    var d = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[id]) || {};
    var h = card.getAttribute("data-hazard") || "general";
    var title = (card.querySelector("h2") || { textContent: id }).textContent.trim();
    var pv = preview(d.html);
    var meta = (window.CARD_META && CARD_META[id]) || {};
    var nb = (typeof mainLineNeighbors === "function") ? mainLineNeighbors(id) : { prev: null, next: null };
    var badges = "";
    if (meta.diff) badges += '<span class="kc-badge d' + meta.diff + '">' + (DIFF[meta.diff] || "入门") + "</span>";
    if (meta.time) badges += '<span class="kc-badge">⏱ ' + meta.time + " 分钟</span>";
    var rel = "";
    if (nb.prev || nb.next) {
      rel = '<span class="kc-rel-row">';
      if (nb.prev) rel += '<a class="kc-rel" href="knowledge-detail.html?id=' + encodeURIComponent(nb.prev) + '">← ' + esc(cardTitle(nb.prev)) + "</a>";
      if (nb.next) rel += '<a class="kc-rel" href="knowledge-detail.html?id=' + encodeURIComponent(nb.next) + '">' + esc(cardTitle(nb.next)) + " →</a>";
      rel += "</span>";
    }
    card.setAttribute("data-search", (title + " " + pv).toLowerCase());
    card.innerHTML = '<a class="kc-card-link" href="knowledge-detail.html?id=' + encodeURIComponent(id) + '">' +
      '<span class="kc-emoji">' + (EMOJI[h] || "📄") + "</span>" +
      '<span class="kc-title">' + esc(title) + "</span>" +
      (badges ? '<span class="kc-badges">' + badges + "</span>" : "") +
      (pv ? '<span class="kc-preview">' + esc(pv) + "</span>" : "") +
      '<span class="kc-go">打开详情 →</span></a>' +
      rel;
  });

  var box = document.getElementById("knowledgeSearch");
  function applyFilter() {
    var q = box ? box.value.trim().toLowerCase() : "";
    document.querySelectorAll(".knowledge-grid section.card[id]").forEach(function (card) {
      card.style.display = (!q || (card.getAttribute("data-search") || "").indexOf(q) !== -1) ? "" : "none";
    });
    var active = document.querySelector(".hazard-chips button.active");
    var gid = active ? active.getAttribute("data-hgroup") : "all";
    document.querySelectorAll(".hazard-group").forEach(function (sec) {
      var any = Array.prototype.some.call(sec.querySelectorAll(".card"), function (c) { return c.style.display !== "none"; });
      if (q && !any) { sec.style.display = "none"; return; }
      sec.style.display = (gid === "all" || sec.getAttribute("data-hgroup") === gid) ? "" : "none";
    });
  }
  if (box) box.addEventListener("input", applyFilter);
  document.querySelectorAll(".hazard-chips button").forEach(function (b) { b.addEventListener("click", applyFilter); });

  /* ===== 随主线学习 ===== */
  function updateMainlineProgress() {
    var read = {};
    try { read = JSON.parse(localStorage.getItem("angui-mainline-read") || "{}"); } catch (e) { read = {}; }
    var done = (window.RECOMMENDED_ORDER || []).filter(function (id) { return read[id]; }).length;
    var el = document.getElementById("mlProgress");
    if (el) el.textContent = done + " / " + (window.RECOMMENDED_ORDER || []).length;
  }
  function renderMainline() {
    var box2 = document.getElementById("mainlineStudy");
    if (!box2 || !window.RECOMMENDED_ORDER) return;
    var read = {};
    try { read = JSON.parse(localStorage.getItem("angui-mainline-read") || "{}"); } catch (e) { read = {}; }
    box2.innerHTML = window.RECOMMENDED_ORDER.map(function (id, i) {
      var d = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[id]) || {};
      var meta = (window.CARD_META && CARD_META[id]) || {};
      var on = !!read[id];
      return '<label class="ml-item' + (on ? " done" : "") + '">' +
        '<input type="checkbox" data-ml-check="' + id + '"' + (on ? " checked" : "") + "> " +
        '<span class="ml-idx">' + (i + 1) + "</span>" +
        '<a href="knowledge-detail.html?id=' + encodeURIComponent(id) + '">' + esc(d.title || id) + "</a>" +
        (meta.diff ? ' <span class="kc-badge d' + meta.diff + '">' + (DIFF[meta.diff] || "") + "</span>" : "") +
        (meta.time ? ' <span class="kc-badge">' + meta.time + " 分</span>" : "") +
        "</label>";
    }).join("");
    box2.querySelectorAll("[data-ml-check]").forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = this.getAttribute("data-ml-check");
        var read2 = {};
        try { read2 = JSON.parse(localStorage.getItem("angui-mainline-read") || "{}"); } catch (e) { read2 = {}; }
        read2[id] = this.checked;
        try { localStorage.setItem("angui-mainline-read", JSON.stringify(read2)); } catch (e) { /* ignore */ }
        this.closest(".ml-item").classList.toggle("done", this.checked);
        updateMainlineProgress();
      });
    });
    updateMainlineProgress();
  }
  renderMainline();

  /* ===== 学习主线（顶部可切换标签） ===== */
  function renderMainlineTabs() {
    var tabsBox = document.getElementById("mlTabs");
    var panel = document.getElementById("mlPanel");
    if (!tabsBox || !panel || !window.MAIN_LINES) return;
    tabsBox.innerHTML = window.MAIN_LINES.map(function (ml) {
      return '<button type="button" class="ml-tab" data-ml="' + ml.id + '" style="--hc:' + ml.color + '">' + ml.emoji + " " + ml.title + "</button>";
    }).join("");
    function renderPanel(id) {
      var ml = window.MAIN_LINES.filter(function (x) { return x.id === id; })[0];
      if (!ml) return;
      tabsBox.querySelectorAll(".ml-tab").forEach(function (b) {
        var on = b.getAttribute("data-ml") === id;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      var parts = [];
      ml.steps.forEach(function (s, i) {
        parts.push('<a class="ml-step" href="' + s.href + '">' +
          '<span class="ml-num">' + (i + 1) + "</span>" +
          "<h3>" + esc(s.t) + "</h3>" +
          (s.d ? "<p>" + esc(s.d) + "</p>" : "") +
          "</a>");
        if (i < ml.steps.length - 1) parts.push('<span class="ml-arrow">→</span>');
      });
      panel.innerHTML =
        '<p class="ml-question">💡 核心问题：<b>' + esc(ml.question) + "</b></p>" +
        '<div class="ml-flow">' + parts.join("") + "</div>" +
        '<p class="ml-memo">📌 一句话记住：' + esc(ml.memo) + "</p>";
    }
    tabsBox.addEventListener("click", function (e) {
      var b = e.target.closest(".ml-tab");
      if (b) renderPanel(b.getAttribute("data-ml"));
    });
    renderPanel("shock");
  }
  renderMainlineTabs();

  hashRedirect();
})();
