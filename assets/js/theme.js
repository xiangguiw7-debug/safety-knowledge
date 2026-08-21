(function () {
  var KEY = "angui-theme";
  var themes = ["auto", "light", "dark"];

  var LIGHT = {
    "--bg": "#f6f4ef", "--fg": "#1c1b18", "--card": "#fffefb", "--card-2": "#efece3",
    "--border": "rgba(28,27,24,0.13)", "--muted": "#7d7a72", "--accent": "#9e2b25", "--accent-2": "#b3453f",
    "--accent-soft": "rgba(158,43,37,0.08)", "--hero-from": "#f6f4ef", "--hero-to": "#e9e4d8",
    "--hero-ink": "#1c1b18", "--hero-tag-bg": "rgba(28,27,24,0.05)", "--hero-tag-border": "rgba(28,27,24,0.16)",
    "--shadow": "0 1px 2px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.04)",
    "--hairline": "rgba(28,27,24,0.1)"
  };
  var DARK = {
    "--bg": "#191816", "--fg": "#e8e4da", "--card": "rgba(36,33,30,0.92)", "--card-2": "#26231e",
    "--border": "rgba(232,228,218,0.12)", "--muted": "#9c978c", "--accent": "#c0534c", "--accent-2": "#d06a63",
    "--accent-soft": "rgba(192,83,76,0.16)", "--hero-from": "#191816", "--hero-to": "#2a251c",
    "--hero-ink": "#e8e4da", "--hero-tag-bg": "rgba(232,228,218,0.07)", "--hero-tag-border": "rgba(232,228,218,0.16)",
    "--shadow": "0 1px 2px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)",
    "--hairline": "rgba(232,228,218,0.1)"
  };

  function buildCss() {
    var light = Object.keys(LIGHT).map(function (k) { return k + ":" + LIGHT[k] + ";"; }).join("");
    var dark = Object.keys(DARK).map(function (k) { return k + ":" + DARK[k] + ";"; }).join("");
    return "html[data-theme=\"light\"]{" + light + "}" +
      "html[data-theme=\"dark\"]{" + dark + "}" +
      "html[data-theme=\"light\"] .site-header{background:rgba(246,244,239,0.88);}" +
      "html[data-theme=\"light\"] .nav a:hover{background:rgba(28,27,24,0.05);}" +
      "html[data-theme=\"dark\"] .site-header{background:rgba(25,24,22,0.9);}" +
      "html[data-theme=\"dark\"] .nav a:hover{background:rgba(232,228,218,0.1);}" +
      "html[data-theme=\"dark\"] tbody tr:hover{background:rgba(192,83,76,0.12);}";
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
