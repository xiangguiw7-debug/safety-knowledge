(function () {
  "use strict";
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
    "environment": "./tools.html#tool-envparams",
    "selv": "./tools.html#tool-selv",
    "emc": "./tools.html#tool-emcwave",
    "mechanical": "./tools.html#tool-mechanical",
    "components": "./tools.html#tool-fuse",
    "certprocess": "./tools.html#tool-testlist",
    "flame": "./tools.html#tool-fire-manual",
    "fire-design": "./tools.html#tool-fire-decision"
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
  function run() {
    var style = document.createElement("style");
    style.textContent = ".knowledge-tool-link{font-size:12.5px;margin-top:8px}.knowledge-tool-link a{color:var(--accent);text-decoration:none;margin-right:10px}";
    document.head.appendChild(style);
    document.querySelectorAll("section.card").forEach(function (card) {
      var href = MAP[card.id];
      var depth = DEPTH[card.id];
      if (!href && !depth) return;
      var rel = card.querySelector(".rel");
      var span = document.createElement("span");
      span.className = "knowledge-tool-link";
      if (href) {
        var a = document.createElement("a");
        a.href = href;
        a.textContent = "🧰 去计算工具试试";
        span.appendChild(a);
      }
      if (depth) {
        var d = document.createElement("a");
        d.href = depth;
        d.textContent = "📘 深度页";
        span.appendChild(d);
      }
      if (rel) {
        rel.appendChild(document.createTextNode(" · "));
        rel.appendChild(span);
      } else {
        card.appendChild(span);
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
