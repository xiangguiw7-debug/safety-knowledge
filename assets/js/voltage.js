var COUNTRIES = [
  { name: "中国", region: "东亚", v: "220V", freq: "50Hz", plug: "A/C/I", note: "" },
  { name: "香港", region: "东亚", v: "220V", freq: "50Hz", plug: "G", note: "英式插头" },
  { name: "台湾", region: "东亚", v: "110V", freq: "60Hz", plug: "A/B", note: "窄压" },
  { name: "日本", region: "东亚", v: "100V", freq: "50/60Hz", plug: "A/B", note: "东部 50Hz / 西部 60Hz" },
  { name: "韩国", region: "东亚", v: "220V", freq: "60Hz", plug: "C/F", note: "" },
  { name: "蒙古", region: "东亚", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "新加坡", region: "东南亚", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "马来西亚", region: "东南亚", v: "240V", freq: "50Hz", plug: "G", note: "" },
  { name: "泰国", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C", note: "" },
  { name: "越南", region: "东南亚", v: "220V", freq: "50Hz", plug: "A/C", note: "" },
  { name: "印度尼西亚", region: "东南亚", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "菲律宾", region: "东南亚", v: "220V", freq: "60Hz", plug: "A/B/C", note: "" },
  { name: "缅甸", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C/D/G", note: "" },
  { name: "柬埔寨", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C/G", note: "" },
  { name: "印度", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "巴基斯坦", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "孟加拉国", region: "南亚", v: "220V", freq: "50Hz", plug: "A/C/D", note: "" },
  { name: "斯里兰卡", region: "南亚", v: "230V", freq: "50Hz", plug: "D/G", note: "" },
  { name: "尼泊尔", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "沙特阿拉伯", region: "中东", v: "230V", freq: "60Hz", plug: "G", note: "" },
  { name: "阿联酋", region: "中东", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "以色列", region: "中东", v: "230V", freq: "50Hz", plug: "C/H", note: "" },
  { name: "土耳其", region: "中东", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "伊朗", region: "中东", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "伊拉克", region: "中东", v: "230V", freq: "50Hz", plug: "C/D/G", note: "" },
  { name: "科威特", region: "中东", v: "240V", freq: "50Hz", plug: "G", note: "" },
  { name: "卡塔尔", region: "中东", v: "240V", freq: "50Hz", plug: "G", note: "" },
  { name: "约旦", region: "中东", v: "230V", freq: "50Hz", plug: "C/D/F/G", note: "" },
  { name: "欧盟（德/法/西/意等）", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E/F", note: "各国有细微插头差异" },
  { name: "英国", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "爱尔兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "瑞士", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "J", note: "" },
  { name: "挪威", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "瑞典", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "丹麦", region: "北欧", v: "230V", freq: "50Hz", plug: "C/E/K", note: "" },
  { name: "芬兰", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "俄罗斯", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "乌克兰", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "波兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "捷克", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "荷兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "比利时", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "法国", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "德国", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "意大利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F/L", note: "" },
  { name: "西班牙", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "葡萄牙", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "希腊", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "匈牙利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "奥地利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "美国", region: "北美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "窄压；大功率设备另用 240V" },
  { name: "加拿大", region: "北美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "窄压" },
  { name: "墨西哥", region: "北美洲", v: "127V", freq: "60Hz", plug: "A/B", note: "窄压" },
  { name: "巴西", region: "南美洲", v: "127V / 220V", freq: "60Hz", plug: "C/N", note: "不同州电压不同" },
  { name: "阿根廷", region: "南美洲", v: "220V", freq: "50Hz", plug: "C/I", note: "" },
  { name: "智利", region: "南美洲", v: "220V", freq: "50Hz", plug: "C/L", note: "" },
  { name: "哥伦比亚", region: "南美洲", v: "110V", freq: "60Hz", plug: "A/B", note: "窄压" },
  { name: "秘鲁", region: "南美洲", v: "220V", freq: "60Hz", plug: "A/C", note: "" },
  { name: "委内瑞拉", region: "南美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "窄压" },
  { name: "澳大利亚", region: "大洋洲", v: "230V", freq: "50Hz", plug: "I", note: "" },
  { name: "新西兰", region: "大洋洲", v: "230V", freq: "50Hz", plug: "I", note: "" },
  { name: "南非", region: "非洲", v: "230V", freq: "50Hz", plug: "M/N", note: "" },
  { name: "埃及", region: "非洲", v: "220V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "尼日利亚", region: "非洲", v: "230V", freq: "50Hz", plug: "D/G", note: "" },
  { name: "肯尼亚", region: "非洲", v: "240V", freq: "50Hz", plug: "G", note: "" },
  { name: "摩洛哥", region: "非洲", v: "220V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "阿尔及利亚", region: "非洲", v: "230V", freq: "50Hz", plug: "C/F", note: "" }
];

var PLUG_LEGEND = {
  A: "美式两扁", B: "美式三扁（接地）", C: "欧式两圆", D: "印式三圆",
  E: "法式两圆+接地针", F: "德式两圆+夹片", G: "英式三方", H: "以色列三扁",
  I: "澳式三扁", J: "瑞士三圆", K: "丹麦两圆", L: "意大利三扁",
  M: "南非大圆三脚", N: "巴西两圆+接地"
};

function $(id) {
  return document.getElementById(id);
}

var currentRegion = "all";
var currentRange = "wide";

function nominalVoltages(c) {
  var nums = c.v.match(/\d+/g) || [];
  return nums.map(Number);
}

function isCovered(c, range) {
  var vals = nominalVoltages(c);
  if (range === "wide") return true;
  if (range === "220") return vals.some(function (v) { return v >= 220 && v <= 240; });
  if (range === "110") return vals.some(function (v) { return v >= 100 && v <= 127; });
  return false;
}

function plugHtml(c) {
  return c.plug.split("/").map(function (p) {
    var tip = PLUG_LEGEND[p] ? " (" + PLUG_LEGEND[p] + ")" : "";
    return '<span title="' + p + tip + '">' + p + "</span>";
  }).join("/");
}

function renderVoltage() {
  var q = $("vSearch").value.trim().toLowerCase();
  var rows = COUNTRIES.filter(function (c) {
    if (currentRegion !== "all" && c.region !== currentRegion) return false;
    if (!q) return true;
    var hay = (c.name + " " + c.region + " " + c.v + " " + c.freq + " " + c.plug + " " + (c.note || "")).toLowerCase();
    return hay.indexOf(q) !== -1;
  });

  if (rows.length === 0) {
    $("vBody").innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted)">没有匹配结果，试试搜“230”“50Hz”或插头代码“G”。</td></tr>';
  } else {
    $("vBody").innerHTML = rows.map(function (c) {
      var ok = isCovered(c, currentRange);
      return "<tr>" +
        "<td>" + c.name + (c.note ? ' <span class="v-note">· ' + c.note + "</span>" : "") + "</td>" +
        "<td>" + c.region + "</td>" +
        "<td class=\"num\">" + c.v + "</td>" +
        "<td class=\"num\">" + c.freq + "</td>" +
        "<td>" + plugHtml(c) + "</td>" +
        "<td class=\"num\">" + (ok ? '<span class="ok-mark">✓</span>' : '<span class="no-mark">✗</span>') + "</td>" +
      "</tr>";
    }).join("");
  }

  $("vCount").textContent = "显示 " + rows.length + " / " + COUNTRIES.length + " 个国家和地区";
}

function updateChipCounts() {
  document.querySelectorAll("[data-region]").forEach(function (btn) {
    var label = btn.getAttribute("data-label") || btn.textContent;
    var n = label === "全部" ? COUNTRIES.length : COUNTRIES.filter(function (c) { return c.region === label; }).length;
    btn.textContent = label + " " + n;
  });
}

document.querySelectorAll("[data-region]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentRegion = btn.getAttribute("data-region");
    document.querySelectorAll("[data-region]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderVoltage();
  });
});

document.querySelectorAll("[data-range]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentRange = btn.getAttribute("data-range");
    document.querySelectorAll("[data-range]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderVoltage();
  });
});

$("vSearch").addEventListener("input", renderVoltage);
updateChipCounts();
renderVoltage();
