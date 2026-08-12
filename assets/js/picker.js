var PICKER = {
  appliance: { name: "家用电器", safety: ["IEC 60335-1 / GB 4706.1", "IEC 60335-2 系列"], emc: ["CISPR 14-1 / -2"], env: ["RoHS", "WEEE", "ErP 能效"] },
  itav: { name: "音视频 / IT", safety: ["IEC 62368-1 / GB 4943.1"], emc: ["CISPR 32 / 35"], env: ["RoHS", "WEEE", "ErP"] },
  lighting: { name: "灯具照明", safety: ["IEC 60598-1 / GB 7000.1", "IEC 61347（驱动）", "IEC 62471（光生物）"], emc: ["CISPR 15", "IEC 61000-3-2"], env: ["RoHS", "ErP 能效"] },
  power: { name: "电源与充电器", safety: ["IEC 62368-1 / GB 4943.1"], emc: ["CISPR 32", "IEC 61000-3-2 / -3-3"], env: ["RoHS", "ErP", "WEEE"] },
  battery: { name: "电池", safety: ["IEC 62133 / GB 31241", "UN 38.3（运输）"], emc: ["—"], env: ["EU 电池法规 2023/1542", "RoHS（如适用）"] },
  wireless: { name: "无线设备", safety: ["IEC 62368-1", "RED（射频）"], emc: ["RED / CISPR 32", "EN 300 328 等"], env: ["RoHS", "WEEE"] },
  medical: { name: "医疗设备", safety: ["IEC 60601-1 / GB 9706.1", "IEC 60601-1-2（EMC）"], emc: ["IEC 60601-1-2"], env: ["RoHS（医疗豁免按法规）"] },
  machinery: { name: "工业机械", safety: ["IEC 60204-1 / GB 5226.1", "机械指令/法规"], emc: ["IEC 61000-6-2 / -6-4"], env: ["—"] },
  tools: { name: "电动工具", safety: ["IEC 62841 / GB 3883"], emc: ["CISPR 14-1 / -2"], env: ["RoHS"] }
};
var PICKER_MARKET = {
  global: "全球通用（按目标国核对标志）", cn: "中国（CCC/CQC + GB 标准）", eu: "欧盟（CE + EN 标准）", us: "美国（FCC + UL 渠道）",
  jp: "日本（PSE + JIS）", kr: "韩国（KC）", in: "印度（BIS）", sa: "沙特（SASO/IECEE）", au: "澳大利亚（RCM）"
};

function $(id) { return document.getElementById(id); }
function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

function initPicker() {
  var sel = $("spProduct");
  Object.keys(PICKER).forEach(function (k) {
    var o = document.createElement("option");
    o.value = k;
    o.textContent = PICKER[k].name;
    sel.appendChild(o);
  });
  sel.addEventListener("change", renderPicker);
  $("spMarket").addEventListener("change", renderPicker);
  renderPicker();
}

function block(title, items) {
  return '<div class="card"><h3>' + title + '</h3><p>' + items.map(esc).join("　·　") + "</p></div>";
}

function renderPicker() {
  var p = PICKER[$("spProduct").value];
  var m = PICKER_MARKET[$("spMarket").value];
  $("spResult").innerHTML =
    '<div class="callout callout-info"><strong>目标市场：' + esc(m) + "</strong><p>以下为教学参考清单，正式项目以标准原文和认证机构确认为准。</p></div>" +
    '<div class="grid grid-2">' +
      block("🛡️ 安全标准", p.safety) +
      block("📡 EMC 标准", p.emc) +
      block("🌱 环保/能效", p.env) +
      '<div class="card"><h3>✅ 下一步</h3><p><a href="./standards.html">标准文件入口</a> · <a href="./wizard.html">认证向导</a> · <a href="./tools.html">计算工具</a></p></div>' +
    "</div>";
}

initPicker();
