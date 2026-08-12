(function () {
  "use strict";
  var path = location.pathname || "";
  var prefix = path.indexOf("/pages/") !== -1 ? "." : (path.indexOf("/en/") !== -1 ? ".." : "pages");
  function link(file) {
    if (prefix === ".") return "./" + file.replace(/^pages\//, "");
    if (prefix === "..") return "../" + file;
    return file;
  }
  function home() {
    if (prefix === ".") return "./index.html";
    if (prefix === "..") return "../index.html";
    return "index.html";
  }
  var file = path.split("/").pop() || "index.html";
  var page = document.querySelector(".page-head");
  if (!page) return;
  var h1 = page.querySelector("h1");
  var name = h1 ? h1.textContent.trim() : (document.title || file).replace(/ - .*/, "");

  var map = [
    { file: "learn.html", group: "学习", hub: link("pages/learn.html"), label: "学习地图" },
    { file: "knowledge.html", group: "学习", hub: link("pages/learn.html"), label: "知识卡片库" },
    { file: "testing.html", group: "测试", hub: link("pages/testing.html"), label: "测试中心" },
    { file: "sop-", group: "测试", hub: link("pages/testing.html"), label: "SOP 中心" },
    { file: "sop.html", group: "测试", hub: link("pages/testing.html"), label: "SOP 中心" },
    { file: "reliability.html", group: "测试", hub: link("pages/testing.html"), label: "可靠性测试计划中心" },
    { file: "test-equipment.html", group: "测试", hub: link("pages/testing.html"), label: "测试设备与工具" },
    { file: "environment-tests.html", group: "测试", hub: link("pages/testing.html"), label: "环境试验概念页" },
    { file: "tools.html", group: "测试", hub: link("pages/testing.html"), label: "计算工具" },
    { file: "certification.html", group: "认证", hub: link("pages/certification.html"), label: "全球认证" },
    { file: "standards.html", group: "认证", hub: link("pages/certification.html"), label: "标准文件" },
    { file: "industries.html", group: "认证", hub: link("pages/certification.html"), label: "行业筛选" },
    { file: "product-categories.html", group: "认证", hub: link("pages/certification.html"), label: "品类知识" },
    { file: "voltage.html", group: "认证", hub: link("pages/certification.html"), label: "全球电压" },
    { file: "wizard.html", group: "认证", hub: link("pages/certification.html"), label: "认证向导" },
    { file: "refs.html", group: "认证", hub: link("pages/certification.html"), label: "参考中心" }
  ];

  var entry = null;
  for (var i = 0; i < map.length; i++) {
    if (file.indexOf(map[i].file) === 0) { entry = map[i]; break; }
  }
  if (!entry) entry = { group: "资源", hub: link("pages/resources.html") };

  var crumb = page.querySelector(".crumb");
  var html = '<a href=home()>首页</a> / <a href="' + entry.hub + '">' + entry.group + "</a>";
  if (entry.label) html += ' / ' + entry.label;
  html += ' / ' + name;
  if (crumb) {
    crumb.innerHTML = html;
  } else {
    var p = document.createElement("p");
    p.className = "crumb";
    p.innerHTML = html;
    page.insertBefore(p, page.firstChild);
  }
})();
