(function () {
  "use strict";
  var nav = document.getElementById("nav");
  if (!nav) return;
  var path = location.pathname || "";
  var prefix = path.indexOf("/pages/") !== -1 ? "." : (path.indexOf("/en/") !== -1 ? ".." : "pages");
  function link(file) {
    if (prefix === ".") return "./" + file.replace(/^pages\//, "");
    if (prefix === "..") return "../" + file;
    return file;
  }
  var file = path.split("/").pop() || "index.html";

  var groups = [
    { name: "学习", href: link("pages/learn.html"), active: ["learn.html", "knowledge.html", "hazard-", "clearance.html", "creepage.html", "hipot.html", "surge.html", "emc", "leakage.html", "grounding.html", "selv.html", "insulation-coordination.html", "mopp-moop.html", "double-insulation.html", "cybersecurity.html", "product-classes.html", "quiz.html"] },
    { name: "测试", href: link("pages/testing.html"), active: ["testing.html", "sop", "reliability.html", "test-equipment.html", "environment-tests.html", "tools.html"] },
    { name: "认证", href: link("pages/certification.html"), active: ["certification.html", "standards", "industries.html", "product-categories.html", "voltage.html", "wizard.html", "refs.html", "verification.html", "labels.html"] },
    { name: "资源", href: link("pages/resources.html"), active: ["resources.html", "map.html", "glossary.html", "materials.html", "cases.html", "roles.html", "designer-guide.html", "poster.html", "faq.html", "feedback.html", "changelog.html", "data.html", "workshop.html", "index.html"] }
  ];

  var active = "资源";
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    var hit = g.active.some(function (key) { return file.indexOf(key) === 0; });
    if (hit) { active = g.name; break; }
  }

  nav.innerHTML = groups.map(function (g) {
    var on = g.name === active;
    return '<a href="' + g.href + '"' + (on ? ' class="active"' : "") + ">" + g.name + "</a>";
  }).join("");
})();
