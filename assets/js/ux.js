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
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.05 });
    els.forEach(function (e) {
      e.classList.add("reveal");
      io.observe(e);
    });
  }

  window.AnGuiUX = { toast: toast };
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