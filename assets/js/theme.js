(function () {
  var KEY = "angui-theme";
  var themes = ["auto", "light", "dark"];

  var LIGHT = {
    "--bg": "#f5f5f7", "--fg": "#1d1d1f", "--card": "rgba(255,255,255,0.86)", "--card-2": "#f5f5f7",
    "--border": "rgba(0,0,0,0.08)", "--muted": "#86868b", "--accent": "#0071e3", "--accent-2": "#0a84ff",
    "--accent-soft": "rgba(0,113,227,0.10)", "--hero-from": "#081430", "--hero-to": "#0b2c5f",
    "--hero-ink": "#f5f5f7", "--hero-tag-bg": "rgba(255,255,255,0.1)", "--hero-tag-border": "rgba(255,255,255,0.18)",
    "--shadow": "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
    "--hairline": "rgba(0,0,0,0.08)"
  };
  var DARK = {
    "--bg": "#000000", "--fg": "#f5f5f7", "--card": "rgba(28,28,30,0.86)", "--card-2": "#1c1c1e",
    "--border": "rgba(255,255,255,0.12)", "--muted": "#98989d", "--accent": "#0a84ff", "--accent-2": "#409cff",
    "--accent-soft": "rgba(10,132,255,0.18)", "--hero-from": "#000000", "--hero-to": "#0b1e3f",
    "--hero-ink": "#f5f5f7", "--hero-tag-bg": "rgba(255,255,255,0.08)", "--hero-tag-border": "rgba(255,255,255,0.16)",
    "--shadow": "0 1px 2px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.45)",
    "--hairline": "rgba(255,255,255,0.1)"
  };

  function buildCss() {
    var light = Object.keys(LIGHT).map(function (k) { return k + ":" + LIGHT[k] + ";"; }).join("");
    var dark = Object.keys(DARK).map(function (k) { return k + ":" + DARK[k] + ";"; }).join("");
    return "html[data-theme=\"light\"]{" + light + "}" +
      "html[data-theme=\"dark\"]{" + dark + "}" +
      "html[data-theme=\"light\"] .site-header{background:rgba(255,255,255,0.72);}" +
      "html[data-theme=\"light\"] .nav a:hover{background:rgba(0,0,0,0.05);}" +
      "html[data-theme=\"dark\"] .site-header{background:rgba(22,22,23,0.72);}" +
      "html[data-theme=\"dark\"] .nav a:hover{background:rgba(255,255,255,0.1);}" +
      "html[data-theme=\"dark\"] tbody tr:hover{background:rgba(10,132,255,0.1);}";
  }

  var style = document.createElement("style");
  style.id = "theme-overrides";
  style.textContent = buildCss();
  document.head.appendChild(style);

  function apply(theme) {
    var root = document.documentElement;
    if (theme === "auto") { delete root.dataset.theme; }
    else { root.dataset.theme = theme; }
    var btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "auto" ? "🌓" : theme === "light" ? "☀️" : "🌙";
    try { localStorage.setItem(KEY, theme); } catch (e) { /* ignore */ }
  }

  function current() {
    try { return localStorage.getItem(KEY) || "auto"; } catch (e) { return "auto"; }
  }

  var btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var i = themes.indexOf(current());
      apply(themes[(i + 1) % themes.length]);
    });
  }
  apply(current());
})();
