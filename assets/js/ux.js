(function () {
  function toast(msg) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, 1800);
  }

  function backBtn() {
    var b = document.querySelector(".backbtn");
    if (b) return;
    b = document.createElement("button");
    b.className = "backbtn";
    b.textContent = "←";
    b.setAttribute("aria-label", "返回上一页");
    b.title = "返回上一页";
    document.body.appendChild(b);
    b.addEventListener("click", function () {
      if (history.length > 1) {
        history.back();
        return;
      }
      // 无历史记录：若是脚本打开的新标签页，关闭并回到来源页；否则回首页
      try {
        if (window.opener && !window.opener.closed) { window.close(); return; }
      } catch (e) { /* ignore */ }
      var path = location.pathname || "";
      if (path.indexOf("/pages/") !== -1 || path.indexOf("/en/") !== -1) location.href = "../index.html";
      else location.href = "./index.html";
    });
  }

  function backTop() {
    var b = document.querySelector(".backtop");
    if (!b) {
      b = document.createElement("button");
      b.className = "backtop";
      b.textContent = "↑";
      b.setAttribute("aria-label", "回到顶部");
      document.body.appendChild(b);
      b.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    window.addEventListener("scroll", function () {
      b.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
  }

  function reveal() {
    var els = document.querySelectorAll(".card, .diagram, .path-item");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("visible"); });
      return;
    }
    // 已在首屏（或已滚过）的元素直接显示，避免“可见 → 隐藏 → 淡入”的闪烁；
    // 仅对首屏以下的元素做滚动淡入动画。
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.05 });
    els.forEach(function (e) {
      var rect = e.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        e.classList.add("visible");
      } else {
        e.classList.add("reveal");
        io.observe(e);
      }
    });
  }

  window.AnGuiUX = { toast: toast };
  backBtn();
  backTop();
  reveal();
})();

(function () {
  var current = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";
  document.querySelectorAll(".bottom-nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0].split("/").pop();
    if (href === current) a.classList.add("active");
  });
})();