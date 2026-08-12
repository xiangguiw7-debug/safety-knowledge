(function () {
  "use strict";
  var CODES = {
    "IEC 61140": "std-61140", "IEC 60990": "std-60990", "IEC 60335-1": "std-60335",
    "IEC 62368-1": "std-62368", "IEC 60601-1": "std-60601", "IEC 60601-1-2": "std-6060112",
    "IEC 60601-1-3": "std-6060113", "IEC 60598-1": "std-60598", "IEC 61347": "std-61347",
    "IEC 62471": "std-62471", "IEC 60529": "std-60529", "IEC 60664-1": "std-60664",
    "IEC 60112": "std-60112", "IEC 60695-2-2": "std-6069522", "IEC 60695-2-11": "std-60695211",
    "IEC 60695-10-2": "std-60695102", "IEC 60695": "std-60695", "IEC 60204-1": "std-60204",
    "IEC 61010-1": "std-61010", "IEC 62133": "std-62133", "UN 38.3": "std-un383",
    "ISO 14971": "std-14971", "ISO 10993": "std-10993", "ISO 13849-1": "std-13849",
    "ISO 26262": "std-26262", "ISO 16750": "std-16750", "IEC 62304": "std-62304",
    "IEC 62366-1": "std-62366", "IEC 60079": "std-60079", "IEC 62841": "std-62841",
    "IEC 62061": "std-62061", "IEC 61000-4-5": "std-6100045", "IEC 61000-4-2": "std-6100042",
    "IEC 61000-4-4": "std-6100044", "IEC 61000-4-8": "std-6100048", "IEC 61000-4-11": "std-61000411",
    "IEC 61000-3-2": "std-6100032", "CISPR 32": "std-55032", "CISPR 25": "std-55025",
    "CISPR 14": "std-cispr14", "CISPR 15": "std-cispr15", "IEC 60127": "std-60127",
    "IEC 60384-14": "std-6038414", "IEC 60825-1": "std-60825", "IEC 61643-11": "std-61643",
    "IEC 62109": "std-62109", "IEC 61851": "std-61851", "IEC 60947": "std-60947",
    "IEC 62115": "std-62115", "EN 71": "std-6675", "IEC 62619": "std-62619",
    "IEC 62477": "std-62477", "EN 303 645": "std-en303645", "ISO/SAE 21434": "std-21434",
    "UL 9540A": "std-9540a", "GB/T 36276": "std-36276", "AEC-Q100": "std-aecq",
    "ITU-T K.21": "std-k21", "IEC 62209": "std-62209", "IEC 60479-1": ""
  };
  var TOOL_STD = {
    "tool-product-class": { l: "IEC 61140", s: "std-61140" },
    "tool-working-voltage": { l: "IEC 60664-1", s: "std-60664" },
    "tool-market-voltage": { l: "IEC 60664-1", s: "std-60664" },
    "tool-pollution": { l: "IEC 60664-1", s: "std-60664" },
    "tool-cti": { l: "IEC 60112", s: "std-60112" },
    "tool-insulation": { l: "IEC 61140", s: "std-61140" },
    "tool-altitude": { l: "IEC 60664-1", s: "std-60664" },
    "tool-reverse": { l: "IEC 60664-1", s: "std-60664" },
    "tool-hipot": { l: "IEC 62368-1 / 60335-1 / 60601-1 / 60204-1", s: "std-62368" },
    "tool-leakage": { l: "IEC 60990", s: "std-60990" },
    "tool-discharge": { l: "IEC 62368-1", s: "std-62368" },
    "tool-compare": { l: "IEC 60664-1", s: "std-60664" },
    "tool-grounding": { l: "IEC 61140", s: "std-61140" },
    "tool-selv": { l: "IEC 61140", s: "std-61140" },
    "tool-insulation-check": { l: "IEC 61140", s: "std-61140" },
    "tool-thermal": { l: "IEC 60335-1", s: "std-60335" },
    "tool-units": { l: "工程换算", s: "" },
    "tool-testlist": { l: "产品标准组合", s: "" },
    "tool-fuse": { l: "IEC 60127", s: "std-60127" },
    "tool-fire-manual": { l: "IEC 60695 系列", s: "std-60695" },
    "tool-glow-wire": { l: "IEC 60695-2-11", s: "std-60695211" },
    "tool-needle-flame": { l: "IEC 60695-2-2", s: "std-6069522" },
    "tool-ball-pressure": { l: "IEC 60695-10-2", s: "std-60695102" },
    "tool-fire-decision": { l: "产品标准防火条款", s: "std-60695" },
    "tool-battery": { l: "IEC 62133", s: "std-62133" },
    "tool-envparams": { l: "IEC 60068 / 产品标准", s: "" },
    "tool-map": { l: "", s: "" },
    "tool-emcwave": { l: "IEC 61000-4 系列", s: "std-6100042" },
    "tool-mechanical": { l: "ISO 13857", s: "" },
    "tool-es": { l: "IEC 62368-1", s: "std-62368" }
  };
  function style() {
    var st = document.createElement("style");
    st.textContent = ".std-status{margin:4px 0 10px;font-size:12.5px;color:var(--muted)}.std-status a{color:var(--accent);text-decoration:none}";
    document.head.appendChild(st);
  }
  function badge(label, id) {
    var p = document.createElement("p");
    p.className = "std-status";
    var href = "standards.html" + (id ? "#" + id : "");
    p.innerHTML = "📌 教学参考 · 依据 " + label + " · 核对 2026-08 · <a href=\"" + href + "\">标准入口</a>";
    return p;
  }
  function findId(text) {
    var keys = Object.keys(CODES);
    for (var i = 0; i < keys.length; i++) {
      if (text.indexOf(keys[i]) !== -1) return CODES[keys[i]];
    }
    return null;
  }
  function injectCards() {
    document.querySelectorAll("section.card").forEach(function (card) {
      if (!card.id || card.querySelector(".std-status")) return;
      var stdP = card.querySelector(".std");
      var label = "IEC 标准体系";
      var id = null;
      if (stdP) {
        var txt = stdP.textContent;
        var keys = Object.keys(CODES);
        for (var i = 0; i < keys.length; i++) {
          if (txt.indexOf(keys[i]) !== -1) { label = keys[i]; id = CODES[keys[i]]; break; }
        }
        if (!id && /60695/.test(txt)) { label = "IEC 60695 系列"; id = "std-60695"; }
      }
      var h = card.querySelector("h2");
      if (h) h.insertAdjacentElement("afterend", badge(label, id));
    });
  }
  function injectTools() {
    document.querySelectorAll("section.param-block[id]").forEach(function (sec) {
      if (sec.querySelector(".std-status")) return;
      var m = TOOL_STD[sec.id];
      if (!m || !m.l) return;
      var h = sec.querySelector("h2");
      if (h) h.insertAdjacentElement("afterend", badge(m.l, m.s));
    });
  }
  function run() {
    style();
    if (document.querySelector(".knowledge-grid")) injectCards();
    if (document.querySelector("[data-tool-panel]")) injectTools();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
