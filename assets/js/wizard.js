var W_HAZARDS = {
  appliance: ["shock", "fire", "thermal"],
  itav: ["shock", "emc", "fire"],
  lighting: ["shock", "thermal", "radiation"],
  power: ["shock", "energy", "fire", "thermal"],
  battery: ["energy", "fire", "chemical", "thermal"],
  wireless: ["emc", "radiation", "shock"],
  medical: ["shock", "radiation", "chemical"],
  machinery: ["mechanical", "shock", "energy"],
  tools: ["mechanical", "shock", "energy", "fire"]
};
var W_HAZARD_LABEL = {
  shock: "防电击", energy: "能量", fire: "防火", thermal: "热量",
  mechanical: "机械", radiation: "辐射", chemical: "化学", emc: "EMC"
};

// 行业 -> 产品分类（自动带入）
var INDUSTRY_PRODUCT = {
  lighting: "lighting", consumer: "itav", appliance: "appliance", medical: "medical",
  machinery: "machinery", tools: "tools", power: "power", battery: "battery",
  iot: "wireless", robotics: "machinery", charging: "machinery", drone: "wireless",
  escooter: "battery", solar: "power", "portable-power": "power", beauty: "appliance",
  cleaning: "appliance", security: "wireless", wearable: "wireless", server: "itav",
  automation: "machinery", powerbank: "battery"
};

function $(id) { return document.getElementById(id); }

function findVoltage(countryName) {
  var c = COUNTRIES.filter(function (x) { return x.name === countryName; })[0];
  if (c) return c;
  if (countryName.indexOf("欧盟") === 0) return { name: "欧盟", v: "230V", freq: "50Hz", plug: "C/E/F", note: "欧盟通用（各国插头略有差异）" };
  if (countryName.indexOf("北欧") === 0) return { name: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "N 标志体系" };
  if (countryName.indexOf("欧亚") === 0) return { name: "欧亚经济联盟", v: "230V", freq: "50Hz", plug: "C/F", note: "EAC 体系" };
  return { name: countryName, v: "—", freq: "—", plug: "—", note: "电压信息待补充" };
}

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function initWizard() {
  var countrySel = $("wCountry");
  CERT_COUNTRIES.forEach(function (c) {
    var o = document.createElement("option");
    o.value = c.name;
    o.textContent = c.name + "（" + c.mark + "）";
    countrySel.appendChild(o);
  });
  var prodSel = $("wProduct");
  CERT_PRODUCTS.forEach(function (p) {
    var o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.icon + " " + p.name;
    prodSel.appendChild(o);
  });
  var indSel = $("wIndustry");
  if (indSel && typeof INDUSTRIES !== "undefined") {
    var empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "不指定行业";
    indSel.appendChild(empty);
    INDUSTRIES.forEach(function (x) {
      var o = document.createElement("option");
      o.value = x.id;
      o.textContent = x.icon + " " + x.name;
      indSel.appendChild(o);
    });
  }
  countrySel.addEventListener("change", renderWizard);
  prodSel.addEventListener("change", renderWizard);
  if (indSel) indSel.addEventListener("change", onIndustryChange);
  renderWizard();
}

function onIndustryChange() {
  var ind = $("wIndustry").value;
  var mapped = INDUSTRY_PRODUCT[ind];
  if (mapped) {
    $("wProduct").value = mapped;
    if (window.AnGuiUX) window.AnGuiUX.toast("已按行业带入产品分类");
  }
  renderWizard();
}

function stdAnchor(token) {
  if (typeof STANDARDS_DATA === "undefined") return null;
  var hit = STANDARDS_DATA.filter(function (s) { return s.code.indexOf(token) === 0; })[0];
  return hit ? "standards.html#" + hit.id : null;
}

function renderStandards() {
  var box = document.getElementById("wStandards");
  if (!box) return;
  var ind = $("wIndustry").value;
  if (!ind || typeof INDUSTRIES === "undefined") { box.innerHTML = ""; return; }
  var item = INDUSTRIES.filter(function (x) { return x.id === ind; })[0];
  if (!item) { box.innerHTML = ""; return; }
  box.innerHTML = '<div class="card"><h3>📚 该行业适用标准</h3><p>' +
    item.standards.map(function (s) {
      var token = s.split("（")[0].split(" / ")[0].trim();
      var a = stdAnchor(token);
      return a ? '<a class="tag" href="' + a + '">' + esc(token) + "</a>" : '<span class="tag">' + esc(token) + "</span>";
    }).join(" ") +
    '</p><p class="peak-note">点击标准编号可到标准速查表查看官方入口；完整 66 条见<a href="./standards.html">标准文件</a>。</p></div>';
}

function renderWizard() {
  var countryName = $("wCountry").value;
  var prodId = $("wProduct").value;
  var country = CERT_COUNTRIES.filter(function (c) { return c.name === countryName; })[0];
  var product = CERT_PRODUCTS.filter(function (p) { return p.id === prodId; })[0];
  if (!country || !product) return;
  var volt = findVoltage(countryName);
  var entries = product.entries.filter(function (e) {
    return e.c === countryName || (countryName === "欧盟" && e.c === "欧盟") || (countryName === "北欧四国（瑞典/挪威/丹麦/芬兰）" && e.c === "北欧四国（瑞典/挪威/丹麦/芬兰）") || (countryName === "德国" && e.c === "德国");
  });
  var hazards = (W_HAZARDS[prodId] || []).map(function (h) {
    return '<a class="tag" href="./knowledge.html#hazard-' + h + '">' + W_HAZARD_LABEL[h] + "</a>";
  }).join("");

  $("wResult").innerHTML =
    '<div class="grid grid-2">' +
      '<div class="card"><h3>🌍 ' + esc(countryName) + " 电网信息</h3>" +
        "<p>标称电压：" + esc(volt.v) + " · 频率：" + esc(volt.freq) + " · 插头：" + esc(volt.plug) + "</p>" +
        "<p class=\"note\" style=\"color:var(--muted);font-size:13px\">" + esc(volt.note || "") + "</p>" +
        '<p><a class="btn" href="./voltage.html">全球电压速查</a></p></div>' +
      '<div class="card"><h3>🛡️ 认证要求</h3>' +
        "<p>体系：" + esc(country.system) + " · 标志：" + esc(country.mark) + "</p>" +
        "<p><b>强制范围：</b>" + esc(country.scope) + "</p>" +
        "<p><b>标准依据：</b>" + esc(country.standards) + "</p>" +
        '<p><a class="btn" href="' + country.url + '" target="_blank" rel="noopener">' + esc(country.urlLabel) + "</a></p></div>" +
      '<div class="card"><h3>📦 产品：' + product.icon + " " + esc(product.name) + "</h3>" +
        "<p>" + esc(product.summary) + "</p>" +
        "<p><b>主要安全因素：</b>" + hazards + "</p>" +
        (entries.length
          ? "<p><b>本产品在该国的要求：</b>" + entries.map(function (e) { return esc(e.mark) + "（" + esc(e.note) + "）"; }).join("；") + "</p>"
          : "<p class=\"note\" style=\"color:var(--muted)\">该产品分类暂未收录此国家的具体条目，请按国家卡片核对。</p>") +
        '<p><a class="btn" href="./industries.html">行业筛选</a> <a class="btn" href="./standards.html">标准入口</a></p></div>' +
      '<div class="card"><h3>✅ 下一步</h3>' +
        "<ol style=\"font-size:14px;padding-left:20px\">" +
        "<li>核对电压/插头与宽窄压（<a href=\"./voltage.html\">电压速查</a>）；</li>" +
        "<li>确认认证路径（<a href=\"./certification.html\">认证速查</a>）；</li>" +
        "<li>用<a href=\"./tools.html\">计算工具</a>估算爬电/间隙/耐压；</li>" +
        "<li>按<a href=\"./learn.html\">学习地图</a>补对应危害知识。</li></ol></div>" +
    "</div>";
  renderStandards();
}

initWizard();
