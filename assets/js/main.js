// 移动端导航开关
var navToggle = document.getElementById("navToggle");
var nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 页脚年份
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = String(new Date().getFullYear());
});

// PWA 离线缓存（file:// 下不注册）
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener("load", function () {
    var swPath = location.pathname.indexOf("/pages/") !== -1 || location.pathname.indexOf("/en/") !== -1 ? "../sw.js" : "./sw.js";
    navigator.serviceWorker.register(swPath).catch(function () {
      /* 注册失败不影响浏览 */
    });
  });
}
