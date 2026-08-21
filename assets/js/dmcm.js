(function () {
  var DMCM_CAPTIONS = {
    dm: "差模：电流在 L-N 之间一来一回，干扰源在两根线之间；主要用 X 电容（跨 L-N）、差模电感抑制。",
    cm: "共模：L 和 N 上的电流同方向，经地（PE/机壳）回流；主要用 Y 电容（对地）、共模电感抑制。"
  };

  function applyMode(btn) {
    var mode = btn.getAttribute("data-mode");
    var visual = document.getElementById("dmcmVisual");
    var caption = document.getElementById("dmcmCaption");
    if (visual) {
      visual.classList.toggle("dm", mode === "dm");
      visual.classList.toggle("cm", mode === "cm");
    }
    document.querySelectorAll(".dmcm-mode button").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (caption) caption.textContent = DMCM_CAPTIONS[mode];
  }

  // 事件委托：详情内容由 JS 动态渲染，直接绑定会因渲染时机错过按钮，改为 document 级监听
  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".dmcm-mode button") : null;
    if (btn) applyMode(btn);
  });
})();
