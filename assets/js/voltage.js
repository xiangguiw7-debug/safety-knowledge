// ===== 全球市电合规数据库：数据 + 条件筛选 + 市场详情 =====
// 结构参考“筛选式数据库”布局（条件区 → 结果区 → 工程风险提示），数据为本站整理。

var COUNTRIES = [
  { name: "中国", region: "东亚", v: "220V", freq: "50Hz", plug: "A/C/I", note: "" },
  { name: "香港", region: "东亚", v: "220V", freq: "50Hz", plug: "G", note: "英式插头；家用电器须符合《电气产品（安全）规例》" },
  { name: "台湾", region: "东亚", v: "110V", freq: "60Hz", plug: "A/B", note: "110V 窄压市场" },
  { name: "日本", region: "东亚", v: "100V", freq: "50/60Hz", plug: "A/B", note: "东部 50Hz / 西部 60Hz，全国两种频率" },
  { name: "韩国", region: "东亚", v: "220V", freq: "60Hz", plug: "C/F", note: "" },
  { name: "蒙古", region: "东亚", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "新加坡", region: "东南亚", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "马来西亚", region: "东南亚", v: "240V", freq: "50Hz", plug: "G", note: "240V 档" },
  { name: "泰国", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C", note: "" },
  { name: "越南", region: "东南亚", v: "220V", freq: "50Hz", plug: "A/C", note: "" },
  { name: "印度尼西亚", region: "东南亚", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "菲律宾", region: "东南亚", v: "220V", freq: "60Hz", plug: "A/B/C", note: "230V 档电压、60Hz 频率" },
  { name: "缅甸", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C/D/G", note: "" },
  { name: "柬埔寨", region: "东南亚", v: "230V", freq: "50Hz", plug: "A/C/G", note: "" },
  { name: "印度", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "巴基斯坦", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "孟加拉国", region: "南亚", v: "220V", freq: "50Hz", plug: "A/C/D", note: "" },
  { name: "斯里兰卡", region: "南亚", v: "230V", freq: "50Hz", plug: "D/G", note: "" },
  { name: "尼泊尔", region: "南亚", v: "230V", freq: "50Hz", plug: "C/D", note: "" },
  { name: "沙特阿拉伯", region: "中东", v: "230V", freq: "60Hz", plug: "G", note: "60Hz 频率" },
  { name: "阿联酋", region: "中东", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "以色列", region: "中东", v: "230V", freq: "50Hz", plug: "C/H", note: "H 型专用插头" },
  { name: "土耳其", region: "中东", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "伊朗", region: "中东", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "伊拉克", region: "中东", v: "230V", freq: "50Hz", plug: "C/D/G", note: "" },
  { name: "科威特", region: "中东", v: "240V", freq: "50Hz", plug: "G", note: "240V 档" },
  { name: "卡塔尔", region: "中东", v: "240V", freq: "50Hz", plug: "G", note: "240V 档" },
  { name: "约旦", region: "中东", v: "230V", freq: "50Hz", plug: "C/D/F/G", note: "" },
  { name: "欧盟（德/法/西/意等）", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E/F", note: "各国插头有细微差异（E/F/L/J 等）" },
  { name: "英国", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "爱尔兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "G", note: "" },
  { name: "瑞士", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "J", note: "J 型专用插头" },
  { name: "挪威", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "瑞典", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "丹麦", region: "北欧", v: "230V", freq: "50Hz", plug: "C/E/K", note: "K 型插头（丹麦）" },
  { name: "芬兰", region: "北欧", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "俄罗斯", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "C/F", note: "欧亚经济联盟（EAC）体系" },
  { name: "乌克兰", region: "欧洲其他", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "波兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "捷克", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "荷兰", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "比利时", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "法国", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/E", note: "E 型（法式）" },
  { name: "德国", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "F 型（德式）" },
  { name: "意大利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F/L", note: "L 型（意大利）" },
  { name: "西班牙", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "葡萄牙", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "希腊", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "匈牙利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "奥地利", region: "欧盟", v: "230V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "美国", region: "北美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "120V 窄压；大功率设备另用 240V 两相" },
  { name: "加拿大", region: "北美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "120V 窄压" },
  { name: "墨西哥", region: "北美洲", v: "127V", freq: "60Hz", plug: "A/B", note: "127V 窄压" },
  { name: "巴西", region: "南美洲", v: "127V / 220V", freq: "60Hz", plug: "C/N", note: "不同州电压不同（127V 或 220V），必须宽压" },
  { name: "阿根廷", region: "南美洲", v: "220V", freq: "50Hz", plug: "C/I", note: "I 型插头，L/N 极性与常规相反" },
  { name: "智利", region: "南美洲", v: "220V", freq: "50Hz", plug: "C/L", note: "" },
  { name: "哥伦比亚", region: "南美洲", v: "110V", freq: "60Hz", plug: "A/B", note: "110V 窄压" },
  { name: "秘鲁", region: "南美洲", v: "220V", freq: "60Hz", plug: "A/C", note: "60Hz 频率" },
  { name: "委内瑞拉", region: "南美洲", v: "120V", freq: "60Hz", plug: "A/B", note: "120V 窄压" },
  { name: "澳大利亚", region: "大洋洲", v: "230V", freq: "50Hz", plug: "I", note: "" },
  { name: "新西兰", region: "大洋洲", v: "230V", freq: "50Hz", plug: "I", note: "" },
  { name: "南非", region: "非洲", v: "230V", freq: "50Hz", plug: "M/N", note: "" },
  { name: "埃及", region: "非洲", v: "220V", freq: "50Hz", plug: "C/F", note: "" },
  { name: "尼日利亚", region: "非洲", v: "230V", freq: "50Hz", plug: "D/G", note: "" },
  { name: "肯尼亚", region: "非洲", v: "240V", freq: "50Hz", plug: "G", note: "240V 档" },
  { name: "摩洛哥", region: "非洲", v: "220V", freq: "50Hz", plug: "C/E", note: "" },
  { name: "阿尔及利亚", region: "非洲", v: "230V", freq: "50Hz", plug: "C/F", note: "" }
];

var PLUG_LEGEND = {
  A: "美式两扁", B: "美式三扁（接地）", C: "欧式两圆", D: "印式三圆",
  E: "法式两圆+接地针", F: "德式两圆+夹片", G: "英式三方", H: "以色列三扁",
  I: "澳式三扁", J: "瑞士三圆", K: "丹麦两圆", L: "意大利三扁",
  M: "南非大圆三脚", N: "巴西两圆+接地"
};

// 典型认证标志：取自本站认证数据库（assets/js/certification.js 的 CERT_COUNTRIES），
// 认证库更新后请同步本表；出口认证详情见 certification.html（可用 ?c=国家 直接定位）。
var CERT_MARK = {
  "中国": "CCC", "香港": "EMSD 符合性", "台湾": "BSMI", "日本": "PSE", "韩国": "KC", "蒙古": "MNS",
  "新加坡": "Safety Mark", "马来西亚": "SIRIM", "泰国": "TISI", "越南": "CR",
  "印度尼西亚": "SNI", "菲律宾": "PS / ICC", "缅甸": "PTD", "柬埔寨": "ISC",
  "印度": "ISI / CRS", "巴基斯坦": "PSQCA", "孟加拉": "BSTI", "斯里兰卡": "SLSI", "尼泊尔": "NS",
  "沙特阿拉伯": "SASO", "阿联酋": "ECAS", "以色列": "SII", "土耳其": "CE",
  "伊朗": "ISIRI", "伊拉克": "COSQC", "科威特": "KUCAS", "卡塔尔": "QS", "约旦": "JSMO",
  "欧盟": "CE", "英国": "UKCA", "爱尔兰": "NSAI", "瑞士": "S+",
  "北欧四国（瑞典/挪威/丹麦/芬兰）": "N", "欧亚经济联盟（俄/白俄/哈）": "EAC", "乌克兰": "UA TR",
  "波兰": "B", "捷克": "EZÚ", "荷兰": "KEMA-Keur", "比利时": "CEBEC",
  "法国": "NF", "德国": "VDE / GS", "意大利": "IMQ", "西班牙": "N",
  "葡萄牙": "CERTIF", "希腊": "CE", "匈牙利": "MEEI", "奥地利": "ÖVE",
  "美国": "FCC / UL", "加拿大": "ISED / cUL", "墨西哥": "NOM",
  "巴西": "ANATEL / INMETRO", "阿根廷": "S-Mark", "智利": "SEC",
  "哥伦比亚": "RETIE", "秘鲁": "INACAL", "委内瑞拉": "COVENIN / SENCAMER",
  "澳大利亚 / 新西兰": "RCM",
  "南非": "LOA", "埃及": "EOS", "尼日利亚": "SONCAP", "肯尼亚": "PVOC",
  "摩洛哥": "IMANOR", "阿尔及利亚": "IANOR"
};

// 本表国家名 → 认证库条目名（认证库里有按区域合并的条目，如“北欧四国”“澳大利亚 / 新西兰”）
var CERT_ALIAS = {
  "孟加拉国": "孟加拉",
  "新西兰": "澳大利亚 / 新西兰",
  "俄罗斯": "欧亚经济联盟（俄/白俄/哈）",
  "欧盟（德/法/西/意等）": "欧盟",
  "挪威": "北欧四国（瑞典/挪威/丹麦/芬兰）",
  "瑞典": "北欧四国（瑞典/挪威/丹麦/芬兰）",
  "丹麦": "北欧四国（瑞典/挪威/丹麦/芬兰）",
  "芬兰": "北欧四国（瑞典/挪威/丹麦/芬兰）"
};

// 欧盟 / 欧洲经济区国家：CE 为强制要求，表中国别标志为当地常见自愿 / 行业标志
var EU_EEA = ["欧盟（德/法/西/意等）", "爱尔兰", "波兰", "捷克", "荷兰", "比利时", "法国", "德国",
  "意大利", "西班牙", "葡萄牙", "希腊", "匈牙利", "奥地利", "挪威", "瑞典", "丹麦", "芬兰"];

// 解析认证库条目名：先查别名，再精确匹配，最后按“包含关系”匹配合并条目
function certKeyOf(c) {
  var key = CERT_ALIAS[c.name] || c.name;
  if (CERT_MARK[key] !== undefined) return key;
  var hit = Object.keys(CERT_MARK).filter(function (k) {
    return k.indexOf(c.name) !== -1 || c.name.indexOf(k) !== -1;
  })[0];
  return hit || "";
}

// 认证库完整条目（页面同时加载 certification.js 时可直接取 system / regulator / url 等字段）
function certEntry(c) {
  if (typeof window === "undefined" || !window.CERT_COUNTRIES) return null;
  var list = window.CERT_COUNTRIES;
  var key = CERT_ALIAS[c.name] || c.name;
  var hit = list.filter(function (x) { return x.name === key; })[0];
  if (!hit) {
    hit = list.filter(function (x) {
      return x.name.indexOf(c.name) !== -1 || c.name.indexOf(x.name) !== -1;
    })[0];
  }
  return hit || null;
}

function certOf(c) {
  var entry = certEntry(c);
  var key = certKeyOf(c);
  var mark = entry ? entry.mark : (key ? CERT_MARK[key] : "");
  if (EU_EEA.indexOf(c.name) !== -1) return (mark && mark !== "CE") ? "CE · " + mark : (mark || "CE");
  return mark;
}

// 认证库详情链接（certification.html 支持 ?c=关键词 直接定位）
function certLink(c) {
  var mark = certOf(c);
  if (!mark) return '<a href="./certification.html?c=' + encodeURIComponent(c.name) + '">见认证库</a>';
  return '<a href="./certification.html?c=' + encodeURIComponent(c.name) + '" title="' + mark + ' 认证库详情">' + mark + "</a>";
}

function nominalVoltages(c) {
  return (c.v.match(/\d+/g) || []).map(Number);
}

// 建议方案：双电压市场必须宽压；单电压市场可用窄压版，但宽压能覆盖更多市场
function planOf(c) {
  var vals = nominalVoltages(c);
  var low = vals.some(function (v) { return v <= 127; });
  var high = vals.some(function (v) { return v >= 220; });
  if (low && high) return { key: "wide", label: "宽压 Wide（必需）", short: "宽压 Wide" };
  if (high) return { key: "high", label: "220–240V 窄压版（宽压更通用）", short: "220–240V 窄压" };
  return { key: "low", label: "110–120V 窄压版（宽压更通用）", short: "110–120V 窄压" };
}

// 产品输入范围 → 该市场是否可覆盖
function coveredBy(c, range) {
  var vals = nominalVoltages(c);
  if (range === "wide") return true;
  if (range === "220") return vals.some(function (v) { return v >= 220 && v <= 240; });
  if (range === "110") return vals.some(function (v) { return v >= 100 && v <= 127; });
  return false;
}

function freqMatches(c, f) {
  if (!f) return true;
  if (f === "both") return c.freq.indexOf("/") !== -1;
  return c.freq.indexOf(f) !== -1;
}

// 插脚图标：引用页面内的 SVG 符号（#plug-A … #plug-N）
function plugIcon(p, cls) {
  if (!PLUG_LEGEND[p]) return "";
  return '<svg class="' + (cls || "") + '" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><use href="#plug-' + p + '"></use></svg>';
}

function plugHtml(c) {
  return c.plug.split("/").map(function (p) {
    var tip = p + (PLUG_LEGEND[p] ? " " + PLUG_LEGEND[p] : "");
    return '<span class="v-plug" title="' + tip + '">' + plugIcon(p) + "<i>" + p + "</i></span>";
  }).join('<span class="v-plug-sep">/</span>');
}

function $(id) { return document.getElementById(id); }

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
  });
}

// ===== 状态 =====
var VSTATE = { country: "", volt: "", freq: "", plan: "", cert: "", plug: "", range: "wide", active: false, autoDerived: false };

// 选择国家后，把该国的电压 / 频率 / 建议方案 / 认证（单一插脚时才带插脚）带入其余条件字段
function fillFromCountry(c) {
  var vals = nominalVoltages(c);
  var volt = vals.length === 1 ? String(vals[0]) : "";
  var freq = c.freq.indexOf("/") !== -1 ? "both" : (c.freq.indexOf("60") !== -1 ? "60" : "50");
  var plan = planOf(c).key;
  var cert = certOf(c);
  var plugs = c.plug.split("/");
  var plug = plugs.length === 1 ? plugs[0] : "";

  var vSel = $("vVolt"); if (vSel) vSel.value = volt;
  var fSel = $("vFreq"); if (fSel) fSel.value = freq;
  var pSel = $("vPlan"); if (pSel) pSel.value = plan;
  var cSel = $("vCert"); if (cSel) cSel.value = cert;
  var gSel = $("vPlug"); if (gSel) gSel.value = plug;

  VSTATE.volt = volt;
  VSTATE.freq = freq;
  VSTATE.plan = plan;
  VSTATE.cert = cert;
  VSTATE.plug = plug;
  VSTATE.autoDerived = true;
}

// 清空由“国家”带出来的条件（用户手动改过的条件不动）
function clearDerived() {
  if (!VSTATE.autoDerived) return;
  ["vVolt", "vFreq", "vPlan", "vCert", "vPlug"].forEach(function (id) {
    var el = $(id); if (el) el.value = "";
  });
  VSTATE.volt = ""; VSTATE.freq = ""; VSTATE.plan = ""; VSTATE.cert = ""; VSTATE.plug = "";
  VSTATE.autoDerived = false;
}

// ===== 下拉选项 =====
function buildFilters() {
  // 国家 / 地区：按区域分组
  var regions = [];
  COUNTRIES.forEach(function (c) { if (regions.indexOf(c.region) === -1) regions.push(c.region); });
  var sel = $("vCountry");
  if (sel) {
    sel.innerHTML = '<option value="">全部国家 / 地区</option>' + regions.map(function (r) {
      return '<optgroup label="' + esc(r) + '">' + COUNTRIES.filter(function (c) { return c.region === r; }).map(function (c) {
        return '<option value="' + esc(c.name) + '">' + esc(c.name) + "</option>";
      }).join("") + "</optgroup>";
    }).join("");
  }

  // 电压：数据里出现过的标称电压
  var volts = [];
  COUNTRIES.forEach(function (c) {
    nominalVoltages(c).forEach(function (v) { if (volts.indexOf(v) === -1) volts.push(v); });
  });
  volts.sort(function (a, b) { return a - b; });
  var vSel = $("vVolt");
  if (vSel) {
    vSel.innerHTML = '<option value="">全部电压</option>' + volts.map(function (v) {
      return '<option value="' + v + '">' + v + " V</option>";
    }).join("");
  }

  // 典型认证：按出现次数排序（常见体系排前面）
  var counts = {};
  COUNTRIES.forEach(function (c) {
    var m = certOf(c);
    if (!m) return;
    counts[m] = (counts[m] || 0) + 1;
  });
  var marks = Object.keys(counts).sort(function (a, b) {
    return counts[b] - counts[a] || a.localeCompare(b);
  });
  var cSel = $("vCert");
  if (cSel) {
    cSel.innerHTML = '<option value="">全部认证体系</option>' + marks.map(function (m) {
      return '<option value="' + esc(m) + '">' + esc(m) + "（" + counts[m] + "）</option>";
    }).join("");
  }
}

// ===== 静态文案：市场数量 / “显示全部”按钮 =====
function initStatics() {
  var c = $("vMarketCount");
  if (c) c.textContent = COUNTRIES.length;
  var s = $("vShowAll");
  if (s) s.textContent = "显示全部 " + COUNTRIES.length + " 个市场";
}

// ===== 筛选 =====
function filtered() {
  var q = ($("vSearch") ? $("vSearch").value.trim().toLowerCase() : "");
  return COUNTRIES.filter(function (c) {
    if (VSTATE.country && c.name !== VSTATE.country) return false;
    if (VSTATE.volt && nominalVoltages(c).indexOf(Number(VSTATE.volt)) === -1) return false;
    if (!freqMatches(c, VSTATE.freq)) return false;
    if (VSTATE.plan && planOf(c).key !== VSTATE.plan) return false;
    if (VSTATE.cert && certOf(c) !== VSTATE.cert) return false;
    if (VSTATE.plug && c.plug.split("/").indexOf(VSTATE.plug) === -1) return false;
    if (!q) return true;
    var hay = (c.name + " " + c.region + " " + c.v + " " + c.freq + " " + c.plug + " " + certOf(c) + " " + (c.note || "")).toLowerCase();
    return hay.indexOf(q) !== -1;
  });
}

// ===== 市场详情卡 =====
function detailNotes(c) {
  var out = [];
  var vals = nominalVoltages(c);
  if (c.freq.indexOf("/") !== -1) out.push("频率同时存在 50Hz 与 60Hz（日本东部 / 西部），产品需同时适配两种频率。");
  else if (c.freq.indexOf("60") !== -1) out.push("60Hz 市场：变压器 / 电感等磁性元件要按 60Hz 复核饱和与温升，电机类产品转速与温升也会变化。");
  if (vals.length > 1) out.push("同一国家存在两种标称电压（" + c.v + "），只能做宽压方案。");
  else if (vals[0] <= 127) out.push("110–120V 窄压市场：电气间隙 / 爬电距离按产品标准查表时，工作电压档位通常比 230V 市场宽松（如 125V 档）。");
  else out.push("220–240V 市场：按工作电压最高档（如 250V 档）查爬电 / 间隙表。");
  var cert = certOf(c);
  var entry = certEntry(c);
  if (cert) {
    out.push("典型认证体系：" + cert +
      (entry ? "｜" + entry.system + "（" + entry.regulator + "）" : "") +
      " —— 插头类型不代表认证要求，出口还需满足当地安全 / EMC / 无线要求。");
  } else {
    out.push("认证数据库未收录该市场的强制体系，出口前请单独确认目标市场准入要求。");
  }
  if (c.note) out.push("备注：" + c.note + "。");
  return out;
}

function renderDetail(rows) {
  var box = $("vDetail");
  if (!box) return;
  var c = VSTATE.country ? COUNTRIES.filter(function (x) { return x.name === VSTATE.country; })[0] : null;
  if (!c) { box.innerHTML = ""; box.hidden = true; return; }
  box.hidden = false;
  var ok = coveredBy(c, VSTATE.range);
  box.innerHTML =
    '<div class="v-card">' +
      '<div class="v-card-head">' +
        "<h3>" + esc(c.name) + "</h3>" +
        '<span class="v-chip">' + esc(c.region) + "</span>" +
        '<span class="v-chip ' + (ok ? "ok" : "bad") + '">' + (ok ? "当前输入范围可覆盖 ✓" : "当前输入范围覆盖不了 ✗") + "</span>" +
        '<button type="button" class="v-clear" id="vDetailClear">清除选择</button>' +
      "</div>" +
      '<div class="v-facts">' +
        "<div><b>" + esc(c.v) + "</b><span>标称电压</span></div>" +
        "<div><b>" + esc(c.freq) + "</b><span>频率</span></div>" +
        "<div><b>" + plugHtml(c) + "</b><span>插脚型号（IEC）</span></div>" +
        "<div><b>" + (certOf(c) ? certLink(c) : "—") + "</b><span>典型认证</span></div>" +
      "</div>" +
      '<p class="v-plan"><b>建议方案：</b>' + esc(planOf(c).label) + "</p>" +
      '<ul class="v-notes">' + detailNotes(c).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<p class="v-notes" style="margin-top:8px"><a href="./certification.html?c=' + encodeURIComponent(c.name) + '">→ 在认证数据库中查看 ' + esc(c.name) + " 的认证体系详情</a></p>" +
    "</div>";
  var btn = $("vDetailClear");
  if (btn) btn.addEventListener("click", function () {
    VSTATE.country = "";
    var sel = $("vCountry"); if (sel) sel.value = "";
    render();
  });
  return rows;
}

// ===== 渲染 =====
function hasFilter() {
  return !!(VSTATE.country || VSTATE.volt || VSTATE.freq || VSTATE.plan || VSTATE.cert || VSTATE.plug ||
    ($("vSearch") && $("vSearch").value.trim()));
}

function render() {
  // “等待选择…”状态：未选任何条件时只显示占位（与参考站一致）
  if (!VSTATE.active && !hasFilter()) VSTATE.active = false;
  var emptyEl = $("vEmptyState");
  var boxEl = $("vResultBox");
  if (emptyEl) emptyEl.hidden = VSTATE.active;
  if (boxEl) boxEl.hidden = !VSTATE.active;
  if (!VSTATE.active) return;

  var rows = filtered();

  // 结果条
  var titleEl = $("vResultTitle");
  if (titleEl) titleEl.textContent = VSTATE.country ? "市场详情" : "匹配市场";

  var countEl = $("vCount");
  if (countEl) {
    var bits = ["匹配 " + rows.length + " / " + COUNTRIES.length + " 个市场"];
    if (VSTATE.country) bits.push("国家：" + VSTATE.country);
    if (VSTATE.volt) bits.push("电压：" + VSTATE.volt + " V");
    if (VSTATE.freq) bits.push("频率：" + (VSTATE.freq === "both" ? "50 + 60" : VSTATE.freq) + " Hz");
    if (VSTATE.plan) bits.push("建议方案：" + ({ wide: "Wide 宽压", high: "220–240V 窄压版", low: "110–120V 窄压版" }[VSTATE.plan]));
    if (VSTATE.cert) bits.push("认证：" + VSTATE.cert);
    if (VSTATE.plug) bits.push("插脚：" + VSTATE.plug + " 型（" + (PLUG_LEGEND[VSTATE.plug] || "") + "）");
    var q = $("vSearch") ? $("vSearch").value.trim() : "";
    if (q) bits.push("关键词：" + q);
    countEl.textContent = bits.join(" · ");
  }

  renderDetail(rows);

  var body = $("vBody");
  if (body) {
    body.innerHTML = rows.length ? rows.map(function (c) {
      var ok = coveredBy(c, VSTATE.range);
      return "<tr>" +
        "<td><b>" + esc(c.name) + "</b>" + (c.note ? ' <span class="v-note">· ' + esc(c.note) + "</span>" : "") + "</td>" +
        "<td>" + esc(c.region) + "</td>" +
        '<td class="num">' + esc(c.v) + "</td>" +
        '<td class="num">' + esc(c.freq) + "</td>" +
        "<td>" + plugHtml(c) + "</td>" +
        "<td>" + esc(planOf(c).short) + "</td>" +
        "<td>" + (certOf(c) ? certLink(c) : '<span class="v-note">—</span>') + "</td>" +
        '<td class="num">' + (ok ? '<span class="ok-mark">✓</span>' : '<span class="no-mark">✗</span>') + "</td>" +
      "</tr>";
    }).join("") : '<tr><td colspan="8" class="v-empty-row">没有匹配结果：试试放宽电压 / 频率条件，或点“重置”重新选择。</td></tr>';
  }
}

function resetFilters() {
  VSTATE = { country: "", volt: "", freq: "", plan: "", cert: "", plug: "", range: VSTATE.range, active: false, autoDerived: false };
  ["vCountry", "vVolt", "vFreq", "vPlan", "vCert", "vPlug", "vSearch"].forEach(function (id) {
    var el = $(id); if (el) el.value = "";
  });
  render();
}

// ===== 事件 =====
[
  ["vCountry", "country"], ["vVolt", "volt"], ["vFreq", "freq"],
  ["vPlan", "plan"], ["vCert", "cert"], ["vPlug", "plug"]
].forEach(function (pair) {
  var el = $(pair[0]);
  if (!el) return;
  el.addEventListener("change", function () {
    VSTATE[pair[1]] = el.value;
    VSTATE.active = true;
    if (pair[1] === "country") {
      // 选中国家：带入该国的电压 / 频率 / 建议方案 / 认证；清空选择：撤掉带入的值
      if (el.value) {
        var c = COUNTRIES.filter(function (x) { return x.name === el.value; })[0];
        if (c) fillFromCountry(c);
      } else {
        clearDerived();
      }
    } else {
      // 用户手动改了条件：此后不再随国家清空
      VSTATE.autoDerived = false;
    }
    render();
  });
});

if ($("vSearch")) $("vSearch").addEventListener("input", function () {
  if ($("vSearch").value.trim()) VSTATE.active = true;
  render();
});
if ($("vReset")) $("vReset").addEventListener("click", resetFilters);
if ($("vShowAll")) $("vShowAll").addEventListener("click", function () {
  VSTATE.active = true;
  render();
});

document.querySelectorAll("[data-range]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    VSTATE.range = btn.getAttribute("data-range");
    document.querySelectorAll("[data-range]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    render();
  });
});

if ($("vBody")) {
  buildFilters();
  initStatics();

  // 深链：?c=国家 / 地区名（“全球认证合规数据库”的互链用它）
  var qc = (new URLSearchParams(location.search).get("c") || "").trim();
  if (qc) {
    var name = decodeURIComponent(qc);
    var hit = COUNTRIES.filter(function (c) { return c.name === name; })[0] ||
      COUNTRIES.filter(function (c) { return c.name.indexOf(name) !== -1 || name.indexOf(c.name) !== -1; })[0];
    if (hit) {
      VSTATE.country = hit.name;
      VSTATE.active = true;
      var cs = $("vCountry"); if (cs) cs.value = hit.name;
      fillFromCountry(hit);
    } else {
      var kEl = $("vSearch"); if (kEl) { kEl.value = name; VSTATE.active = true; }
    }
  }
  render();
}
