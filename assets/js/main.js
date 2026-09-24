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
  var hadController = !!navigator.serviceWorker.controller; // 首次访问没有旧 SW，不要弹提示
  window.addEventListener("load", function () {
    var swPath = location.pathname.indexOf("/pages/") !== -1 || location.pathname.indexOf("/en/") !== -1 ? "../sw.js" : "./sw.js";
    navigator.serviceWorker.register(swPath, { updateViaCache: "none" }).then(function (reg) {
      // 每次打开都主动问一次服务器有没有新版本（默认浏览器可能隔 24h 才查）
      if (reg && reg.update) { try { reg.update(); } catch (e) {} }
      reg.addEventListener("updatefound", function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener("statechange", function () {
          if (nw.state === "installed" && navigator.serviceWorker.controller) {
            // 新 SW 已装好并会立即接管（skipWaiting）：页面刚打开就自动刷一次，否则给提示条
            if (!autoReloadOnce("sw")) showUpdateBar("已发布新版本，点此立即更新");
          }
        });
      });
    }).catch(function () {
      /* 注册失败不影响浏览 */
    });
    // 新 Service Worker 接管后（配合 skipWaiting），页面本身还是旧的：自动刷一次或提示
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (!hadController || updateBarShown) return;
      if (!autoReloadOnce("sw")) showUpdateBar("缓存已更新，点此刷新页面");
    });
  });
}

/* ===== “打开的是旧版本？”提示条 ==========================================
   旧版本问题一般来自四层缓存：浏览器 HTTP 缓存 / Service Worker 缓存 /
   GitHub Pages 的 CDN（HTML max-age=600）/ 已安装的 PWA 外壳。
   这里做两件事：① 用 version.json（永远直连网络）比对线上最新版本；
   ② 给一个“一键清除本站缓存并刷新”的按钮，用户自己就能修好。 */
var updateBarShown = false;
// 自动更新：页面刚打开、用户还没操作时，静默清一次本站缓存并重载；
// 每个原因在同一会话里只自动做一次（sessionStorage 记标记），避免来回刷新。
function autoReloadOnce(reason) {
  var key = "angui-auto-updated:" + reason;
  var early = true, quiet = true;
  try { early = !sessionStorage.getItem(key); } catch (e) {}
  if (!early) return false;
  if (window.__anguiInteracted) quiet = false;          // 用户已经开始操作 → 不打扰
  if (window.performance && performance.now && performance.now() > 10000) quiet = false; // 打开超过 10 秒
  if (!quiet) return false;
  try { sessionStorage.setItem(key, "1"); } catch (e) {}
  clearSiteCacheThenReload();
  return true;
}
function siteVersion() {
  var m = document.querySelector('meta[name="site-version"]');
  if (m && m.getAttribute("content")) return m.getAttribute("content");
  var t = (document.body ? document.body.textContent : "").match(/版本 v(\d+\.\d+\.\d+)/);
  return t ? t[1] : "";
}
function clearSiteCacheThenReload() {
  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    var base = location.href.split("#")[0].split("?")[0];
    location.replace(base + "?fresh=" + Date.now());
  }
  // 兜底：清缓存 API 在个别情况下会慢或挂住（例如 SW 正在安装、Cache Storage 被占用），
  // 1.2 秒内无论如何都要重载，避免“点了没反应”。
  setTimeout(finish, 1200);
  try {
    if (window.caches && caches.keys) {
      caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      }).then(finish, finish);
    } else { finish(); }
  } catch (e) { finish(); }
  try {
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      navigator.serviceWorker.getRegistrations().then(function (rs) {
        return Promise.all(rs.map(function (r) { return r.unregister(); }));
      }).then(finish, finish);
    } else { finish(); }
  } catch (e) { finish(); }
}
function showUpdateBar(text) {
  if (updateBarShown || document.getElementById("updateBar")) return;
  updateBarShown = true;
  var bar = document.createElement("div");
  bar.id = "updateBar";
  bar.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:9998;max-width:min(94vw,560px);" +
    "display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px;border-radius:14px;" +
    "background:var(--card,#fff);color:var(--fg,#1c1a17);border:1px solid var(--border,#e2ddd3);" +
    "box-shadow:0 12px 34px rgba(0,0,0,.18);font-size:13.5px;line-height:1.5";
  var msg = document.createElement("span");
  msg.textContent = "🔄 " + (text || "有新版本可用");
  var go = document.createElement("button");
  go.textContent = "清除缓存并更新";
  go.style.cssText = "margin-left:auto;padding:7px 14px;border-radius:999px;border:1px solid transparent;cursor:pointer;" +
    "background:var(--accent,#9e2b25);color:#fff;font-family:inherit;font-size:13px;font-weight:600";
  go.addEventListener("click", function () {
    go.textContent = "正在更新…";
    clearSiteCacheThenReload();
  });
  var more = document.createElement("a");
  more.textContent = "还是旧的？";
  more.href = location.pathname.indexOf("/pages/") !== -1
    ? "cache-help.html"
    : (location.pathname.indexOf("/en/") !== -1 ? "../pages/cache-help.html" : "pages/cache-help.html");
  more.style.cssText = "color:var(--muted,#6b6558);font-size:12.5px";
  var close = document.createElement("button");
  close.textContent = "✕";
  close.setAttribute("aria-label", "关闭提示");
  close.style.cssText = "background:none;border:0;color:var(--muted,#6b6558);cursor:pointer;font-size:14px;font-family:inherit";
  close.addEventListener("click", function () { bar.remove(); });
  bar.appendChild(msg); bar.appendChild(go); bar.appendChild(more); bar.appendChild(close);
  document.body.appendChild(bar);
}
// 探针：version.json 不缓存，拿到的是线上最新版本；和本页版本不一致就自动更新或提示
(function () {
  if (!/^https?:$/.test(location.protocol)) return;
  var mine = siteVersion();
  if (!mine) return;
  var url = (location.pathname.indexOf("/pages/") !== -1 || location.pathname.indexOf("/en/") !== -1 ? "../" : "./") + "version.json";

  // 用户是否已经和页面交互过（滚动、点击、按键…）：交互过就不自动刷新，避免打断阅读
  var interacted = false;
  ["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, function () { interacted = true; window.__anguiInteracted = true; }, { passive: true, once: true });
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      fetch(url + "?t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d || !d.version || d.version === mine) return;
          var newer = d.version.split(".").map(Number), cur = mine.split(".").map(Number);
          var isNewer = false;
          for (var i = 0; i < 3; i++) {
            if ((newer[i] || 0) > (cur[i] || 0)) { isNewer = true; break; }
            if ((newer[i] || 0) < (cur[i] || 0)) break;
          }
          if (!isNewer) return;
          window.__anguiInteracted = interacted;
          // ① 页面刚打开、用户还没开始操作 → 静默自愈（清一次本站缓存并重载，每会话一次）
          if (autoReloadOnce("version-" + d.version)) return;
          // ② 否则给出提示条，一键更新
          showUpdateBar("线上已更新到 v" + d.version + "，你打开的是 v" + mine);
        })
        .catch(function () { /* 离线或探针不可用就静默跳过 */ });
    }, 700);
  });
})();

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

/* ===== 回到顶部浮动按钮（长页面用） ===== */
(function () {
  "use strict";
  if (document.getElementById("backTop")) return;
  var btn = document.createElement("button");
  btn.id = "backTop";
  btn.type = "button";
  btn.textContent = "↑ 顶部";
  btn.setAttribute("aria-label", "回到顶部");
  btn.style.cssText = "position:fixed;right:16px;bottom:66px;z-index:900;display:none;padding:9px 15px;border:none;border-radius:999px;background:var(--accent,#9e2b25);color:#fff;font-size:13px;font-family:inherit;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.25)";
  document.body.appendChild(btn);
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      btn.style.display = window.scrollY > 500 ? "block" : "none";
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
