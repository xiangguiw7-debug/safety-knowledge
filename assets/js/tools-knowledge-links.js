(function () {
  "use strict";
  var MAP = [
    { match: "产品类别", href: "knowledge.html#productclass", depth: "insulation-coordination.html" },
    { match: "工作电压", href: "voltage.html", depth: "insulation-coordination.html" },
    { match: "目标市场与系统电压", href: "voltage.html", depth: "insulation-coordination.html" },
    { match: "污染等级", href: "knowledge.html#cti", depth: "insulation-coordination.html" },
    { match: "材料组（CTI）", href: "knowledge.html#cti", depth: "insulation-coordination.html" },
    { match: "绝缘类型", href: "double-insulation.html", depth: "insulation-coordination.html" },
    { match: "使用海拔", href: "clearance.html", depth: "insulation-coordination.html" },
    { match: "反查：我只有这么多间距", href: "creepage.html", depth: "insulation-coordination.html" },
    { match: "耐压试验电压速查器", href: "hipot.html", depth: "hipot.html" },
    { match: "泄漏电流估算器", href: "knowledge.html#leakage", depth: "leakage.html" },
    { match: "RC 放电时间计算器", href: "knowledge.html#selv" },
    { match: "标准差异一键对照", href: "standards-compare.html", depth: "insulation-coordination.html" },
    { match: "接地连续性估算器", href: "knowledge.html#grounding", depth: "grounding.html" },
    { match: "SELV 限值速查", href: "knowledge.html#selv", depth: "selv.html" },
    { match: "绝缘层数检查清单", href: "double-insulation.html", depth: "selv.html" },
    { match: "温升估算器", href: "knowledge.html#temperature" },
    { match: "工程单位换算", href: "map.html" },
    { match: "测试项目清单生成器", href: "knowledge.html#certprocess" },
    { match: "保险丝选型速查", href: "knowledge.html#components" },
    { match: "防火试验手册", href: "knowledge.html#firetests" },
    { match: "灼热丝档位向导", href: "knowledge.html#firetests" },
    { match: "针焰施加时间速查", href: "knowledge.html#firetests" },
    { match: "球压试验温度速查", href: "knowledge.html#firetests" },
    { match: "防火试验决策助手", href: "knowledge.html#firetests" },
    { match: "电池能量计算", href: "knowledge.html#battery" },
    { match: "环境试验参数速查", href: "knowledge.html#environment" },
    { match: "工具地图", href: "map.html" },
    { match: "EMC 波形对比生成器", href: "knowledge.html#emc" },
    { match: "机械安全距离计算器", href: "knowledge.html#mechanical" },
    { match: "危险电压 / ES 等级判定", href: "knowledge.html#energy" }
  ];

  function run() {
    var style = document.createElement("style");
    style.textContent = ".tool-knowledge-link{margin:4px 0 10px;font-size:12.5px}.tool-knowledge-link a{color:var(--accent);text-decoration:none;margin-right:10px}";
    document.head.appendChild(style);
    document.querySelectorAll("section.param-block h2").forEach(function (h) {
      var text = h.textContent.trim();
      var hit = MAP.filter(function (m) { return text.indexOf(m.match) !== -1; })[0];
      if (!hit) return;
      if (h.parentNode.querySelector(".tool-knowledge-link")) return;
      var p = document.createElement("p");
      p.className = "tool-knowledge-link";
      p.innerHTML = "📖 规则不清楚？<a href=\"" + hit.href + "\">查看知识卡</a>" + (hit.depth ? "<a href=\"" + hit.depth + "\">📘 深度页</a>" : "");
      h.insertAdjacentElement("afterend", p);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
