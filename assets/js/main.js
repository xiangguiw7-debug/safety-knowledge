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
    navigator.serviceWorker.register(swPath, { updateViaCache: "none" }).catch(function () {
      /* 注册失败不影响浏览 */
    });
  });
}

/* ===== 点击头像放大（灯箱，不再跳首页——导航栏已有首页入口） ===== */
(function () {
  "use strict";
  function iconSrc() {
    var p = location.pathname || "";
    var base = (p.indexOf("/pages/") !== -1 || p.indexOf("/en/") !== -1) ? "../assets/icons/" : "assets/icons/";
    return base + "icon-512.png";
  }
  function ensureStyle() {
    if (document.getElementById("logoLightboxStyle")) return;
    var st = document.createElement("style");
    st.id = "logoLightboxStyle";
    st.textContent =
      ".logo-lightbox{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.82);cursor:zoom-out}" +
      ".logo-lightbox.open{display:flex}" +
      ".logo-lightbox img{max-width:min(88vw,640px);max-height:82vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.6);cursor:default}" +
      ".logo-lightbox .lb-close{position:absolute;top:14px;right:22px;font-size:36px;line-height:1;color:#fff;cursor:pointer;background:none;border:none;font-family:inherit;z-index:2}" +
      ".logo-lightbox .lb-tip{position:absolute;bottom:14px;left:0;right:0;text-align:center;color:rgba(255,255,255,.65);font-size:13px}";
    document.head.appendChild(st);
  }
  function openLightbox() {
    ensureStyle();
    var box = document.getElementById("logoLightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "logoLightbox";
      box.className = "logo-lightbox";
      box.innerHTML = '<button type="button" class="lb-close" aria-label="关闭">×</button>' +
        '<img src="' + iconSrc() + '" alt="站点头像">' +
        '<p class="lb-tip">点击任意处或按 Esc 关闭</p>';
      document.body.appendChild(box);
      function close() { box.classList.remove("open"); }
      box.addEventListener("click", close);
      box.querySelector(".lb-close").addEventListener("click", function (e) { e.stopPropagation(); close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }
    box.classList.add("open");
  }
  document.addEventListener("click", function (e) {
    var img = e.target && e.target.closest ? e.target.closest(".logo-img") : null;
    if (img) {
      e.preventDefault();
      e.stopPropagation();
      openLightbox();
    }
  });
})();
