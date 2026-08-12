var dmcmVisual = document.getElementById("dmcmVisual");
var dmcmCaption = document.getElementById("dmcmCaption");

var DMCM_CAPTIONS = {
  dm: "差模：电流在 L-N 之间一来一回，干扰源在两根线之间；主要用 X 电容（跨 L-N）、差模电感抑制。",
  cm: "共模：L 和 N 上的电流同方向，经地（PE/机壳）回流；主要用 Y 电容（对地）、共模电感抑制。"
};

document.querySelectorAll(".dmcm-mode button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var mode = btn.getAttribute("data-mode");
    dmcmVisual.classList.toggle("dm", mode === "dm");
    dmcmVisual.classList.toggle("cm", mode === "cm");
    document.querySelectorAll(".dmcm-mode button").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (dmcmCaption) dmcmCaption.textContent = DMCM_CAPTIONS[mode];
  });
});
