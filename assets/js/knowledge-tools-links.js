(function () {
  "use strict";
  // 知识卡 → 计算工具 / 深度页 / 相关概念 的桥
  var MAP = {
    "protection": "./tools.html#tool-spacing",
    "productclass": "./tools.html#tool-product-class",
    "cti": "./tools.html#tool-cti",
    "energy": "./tools.html#tool-es",
    "leakage": "./tools.html#tool-leakage",
    "grounding": "./tools.html#tool-grounding",
    "temperature": "./tools.html#tool-thermal",
    "firetests": "./tools.html#tool-fire-manual",
    "battery": "./tools.html#tool-battery",
    "environment": "./tools.html#tool-drop",
    "selv": "./tools.html#tool-selv",
    "emc": "./tools.html#tool-emcwave",
    "mechanical": "./tools.html#tool-mechanical",
    "components": "./tools.html#tool-fuse",
    "certprocess": "./tools.html#tool-testlist",
    "flame": "./tools.html#tool-fire-manual",
    "fire-design": "./tools.html#tool-fire-decision",
    "ip": "./tools.html#tool-ip",
    "ik": "./tools.html#tool-ik"
  };
  var DEPTH = {
    "protection": "./insulation-coordination.html",
    "productclass": "./insulation-coordination.html",
    "cti": "./insulation-coordination.html",
    "access": "./leakage.html",
    "leakage": "./leakage.html",
    "grounding": "./grounding.html",
    "selv": "./selv.html"
  };
  // 相关概念（网状关联）：概念互相决定，不是线性前/后置
  var RELATED = {
    "protection": ["productclass", "cti", "leakage", "grounding", "selv"],
    "productclass": ["protection", "cti", "grounding", "selv"],
    "cti": ["protection", "productclass"],
    "leakage": ["grounding", "selv", "protection"],
    "grounding": ["leakage", "selv"],
    "selv": ["protection", "leakage"],
    "temperature": ["firetests", "battery"],
    "firetests": ["flame", "fire-design"],
    "flame": ["firetests", "fire-design"],
    "fire-design": ["flame", "firetests", "battery"],
    "battery": ["energy", "temperature"],
    "energy": ["battery", "components"],
    "components": ["energy", "firetests"],
    "ip": ["ik", "environment"],
    "ik": ["ip", "mechanical"],
    "mechanical": ["functional", "ik"],
    "functional": ["mechanical", "risk"],
    "risk": ["functional", "software"],
    "software": ["risk"],
    "emc": ["dmcm", "harmonic", "transient"],
    "dmcm": ["emc", "harmonic"],
    "harmonic": ["emc", "transient"],
    "transient": ["emc"],
    "rohs": ["explosion", "biocompat"],
    "environment": ["ip", "ik"]
  };
  function run() {
    var style = document.createElement("style");
    style.textContent = ".knowledge-tool-link{font-size:12.5px;margin-top:8px}.knowledge-tool-link a{color:var(--accent);text-decoration:none;margin-right:10px}";
    document.head.appendChild(style);
    document.querySelectorAll("section.card").forEach(function (card) {
      var href = MAP[card.id];
      var depth = DEPTH[card.id];
      var related = RELATED[card.id];
      if (!href && !depth && !related) return;
      var rel = card.querySelector(".rel");
      var wrap = document.createElement("div");
      wrap.className = "knowledge-tool-link";
      var html = "";
      if (href) html += '<a href="' + href + '">🧰 去计算工具试试</a>';
      if (depth) html += '<a href="' + depth + '">📘 深度页</a>';
      if (related && related.length) {
        html += '<span>🔗 相关概念：' + related.map(function (rid) {
          var t = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[rid] && KNOWLEDGE_DETAILS[rid].title) || rid;
          return '<a href="knowledge-detail.html?id=' + encodeURIComponent(rid) + '">' + t + "</a>";
        }).join("") + "</span>";
      }
      wrap.innerHTML = html;
      if (rel && rel.parentNode) {
        rel.parentNode.insertBefore(wrap, rel.nextSibling);
      } else {
        card.appendChild(wrap);
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
