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
  function preview(html) {
    var t = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    var i = t.indexOf("是什么：");
    var s = i >= 0 ? t.slice(i + 4) : t;
    s = s.replace(/^[：: ]+/, "");
    return s.slice(0, 46) + (s.length > 46 ? "…" : "");
  }
  document.querySelectorAll(".knowledge-grid section.card[id]").forEach(function (card) {
    var id = card.id;
    var d = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[id]) || {};
    var h = card.getAttribute("data-hazard") || "general";
    var title = (card.querySelector("h2") || { textContent: id }).textContent.trim();
    var pv = preview(d.html);
    card.setAttribute("data-search", (title + " " + pv).toLowerCase());
    card.innerHTML = '<a class="kc-card-link" href="knowledge-detail.html?id=' + encodeURIComponent(id) + '">' +
      '<span class="kc-emoji">' + (EMOJI[h] || "📄") + "</span>" +
      '<span class="kc-title">' + esc(title) + "</span>" +
      (pv ? '<span class="kc-preview">' + esc(pv) + "</span>" : "") +
      '<span class="kc-go">打开详情 →</span></a>';
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
  hashRedirect();
})();
