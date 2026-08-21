var HAZARD_GROUPS = [
  { id: "framework", title: "📋 框架与通用", hint: "先读这两张，建立标准思维。" },
  { id: "shock", title: "⚡ 防电击", hint: "距离、绝缘、接地、限压。" },
  { id: "energy", title: "💥 能量危险", hint: "限能、保险丝、电池、电弧。" },
  { id: "fire", title: "🔥 防火", hint: "阻燃材料与防火结构。" },
  { id: "thermal", title: "🌡️ 热量危险", hint: "温升、耐温、热失控。" },
  { id: "mechanical", title: "⚙️ 机械危险", hint: "联锁、防护、功能安全。" },
  { id: "radiation", title: "☢️ 辐射危险", hint: "光生物、射频、激光。" },
  { id: "chemical", title: "🧪 化学危险", hint: "有害物质与环保合规。" },
  { id: "emc", title: "📡 EMC 与认证", hint: "浪涌、谐波、共模差模。" },
  { id: "medical", title: "🏥 医疗专项", hint: "风险管理与软件安全。" },
  { id: "cert", title: "📄 认证流程", hint: "测试、技术文件、CB 转证、工厂检查。" },
  { id: "general", title: "📦 通用环境", hint: "IP 防护等通用要求。" }
];

function $(id) { return document.getElementById(id); }

var source = document.querySelector(".knowledge-grid");
if (source) {
  var cards = Array.prototype.slice.call(source.querySelectorAll(".card[data-hazard]"));
  var byGroup = {};
  HAZARD_GROUPS.forEach(function (g) { byGroup[g.id] = []; });
  cards.forEach(function (card) {
    var h = card.getAttribute("data-hazard");
    if (byGroup[h]) byGroup[h].push(card);
  });

  var wrap = document.createElement("div");
  wrap.id = "hazardGroups";

  var chips = document.createElement("div");
  chips.className = "hazard-chips";
  chips.setAttribute("role", "group");
  chips.setAttribute("aria-label", "按安全因素筛选");
  var totalCards = cards.length;
  var allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "active";
  allBtn.setAttribute("data-hgroup", "all");
  allBtn.innerHTML = "<span class=\"hchip-emoji\">🗂️</span><span class=\"hchip-label\">全部</span><span class=\"hchip-count\">" + totalCards + "</span>";
  chips.appendChild(allBtn);
  HAZARD_GROUPS.forEach(function (g) {
    var parts = g.title.split(/\s+/);
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("data-hgroup", g.id);
    b.innerHTML = "<span class=\"hchip-emoji\">" + (parts[0] || "📄") + "</span><span class=\"hchip-label\">" + (parts.slice(1).join(" ") || g.title) + "</span><span class=\"hchip-count\">" + (byGroup[g.id] ? byGroup[g.id].length : 0) + "</span>";
    chips.appendChild(b);
  });
  wrap.appendChild(chips);

  HAZARD_GROUPS.forEach(function (g) {
    if (!byGroup[g.id].length) return;
    var sec = document.createElement("section");
    sec.className = "hazard-group";
    sec.id = "hazard-" + g.id;
    sec.setAttribute("data-hgroup", g.id);
    var h2 = document.createElement("h2");
    var parts = g.title.split(/\s+/);
    h2.setAttribute("data-emoji", parts[0] || "📄");
    h2.textContent = parts.slice(1).join(" ") || g.title;
    var cnt = document.createElement("span");
    cnt.className = "hazard-count";
    cnt.textContent = byGroup[g.id].length;
    h2.appendChild(cnt);
    sec.appendChild(h2);
    var hint = document.createElement("p");
    hint.className = "section-sub";
    hint.textContent = g.hint;
    sec.appendChild(hint);
    var grid = document.createElement("div");
    grid.className = "knowledge-grid";
    byGroup[g.id].forEach(function (card) { grid.appendChild(card); });
    sec.appendChild(grid);
    wrap.appendChild(sec);
  });

  source.parentNode.insertBefore(wrap, source);
  source.remove();

  var oldChips = document.querySelector('p.section-sub a.tag[href="#stdguide"]');
  if (oldChips) {
    var p = oldChips.closest("p");
    if (p && p.className.indexOf("section-sub") !== -1) p.remove();
  }

  function applyGroup(id) {
    document.querySelectorAll(".hazard-group").forEach(function (sec) {
      sec.style.display = id === "all" || sec.getAttribute("data-hgroup") === id ? "" : "none";
    });
    document.querySelectorAll(".hazard-chips button").forEach(function (b) {
      var on = b.getAttribute("data-hgroup") === id;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  document.querySelectorAll(".hazard-chips button").forEach(function (b) {
    b.addEventListener("click", function () { applyGroup(b.getAttribute("data-hgroup")); });
  });
}
