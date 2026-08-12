var SITE_MAP = [
  { key: "index", name: "首页", url: "../index.html", group: "入口", d: "七大安全因素与三大认证" },
  { key: "learn", name: "学习地图", url: "pages/learn.html", group: "学习", d: "按危害组织的学习路径" },
  { key: "clearance", name: "电气间隙", url: "pages/clearance.html", group: "学习", d: "空气击穿、过电压类别、查表" },
  { key: "creepage", name: "爬电距离", url: "pages/creepage.html", group: "学习", d: "表面路径、污染、CTI、查表" },
  { key: "surge", name: "雷击浪涌", url: "pages/surge.html", group: "学习", d: "波形、SPD、多级防护" },
  { key: "hipot", name: "耐压测试", url: "pages/hipot.html", group: "学习", d: "绝缘体系、5 步法、模板" },
  { key: "emc", name: "EMC 系统课程", url: "pages/emc.html", group: "学习", d: "发射/抗扰项目与整改" },
  { key: "knowledge", name: "补充知识速览", url: "pages/knowledge.html", group: "学习", d: "七大因素分组知识卡" },
  { key: "quiz", name: "小测验", url: "pages/quiz.html", group: "学习", d: "44 题题库与错题本" },
  { key: "tools", name: "计算工具", url: "pages/tools.html", group: "工具", d: "15 个工具：间距/耐压/防火等" },
  { key: "industries", name: "行业筛选", url: "pages/industries.html", group: "参考", d: "27 个行业与安全因素" },
  { key: "standards", name: "标准文件入口", url: "pages/standards.html", group: "参考", d: "官方渠道与标准清单" },
  { key: "standards-compare", name: "标准差异矩阵", url: "pages/standards-compare.html", group: "参考", d: "五标准条款/数值对照" },
  { key: "voltage", name: "全球电压速查", url: "pages/voltage.html", group: "参考", d: "60+ 国家电压/插头" },
  { key: "certification", name: "全球认证速查", url: "pages/certification.html", group: "参考", d: "按国家/产品查认证" },
  { key: "materials", name: "材料库", url: "pages/materials.html", group: "参考", d: "CTI/阻燃/RTI 与黄卡" },
  { key: "glossary", name: "术语表", url: "pages/glossary.html", group: "参考", d: "术语与英文对照" },
  { key: "wizard", name: "认证向导", url: "pages/wizard.html", group: "参考", d: "国家×产品一键清单" },
  { key: "refs", name: "参考中心", url: "pages/refs.html", group: "参考", d: "标准/电压/认证/材料入口" },
  { key: "hazard-energy", name: "能量危险深度页", url: "pages/hazard-energy.html", group: "资源专题", d: "ES 分级、限能、电弧" },
  { key: "hazard-fire", name: "防火深度页", url: "pages/hazard-fire.html", group: "资源专题", d: "起火链、防火结构" },
  { key: "hazard-thermal", name: "热量危险深度页", url: "pages/hazard-thermal.html", group: "资源专题", d: "温升、热失控" },
  { key: "hazard-mechanical", name: "机械危险深度页", url: "pages/hazard-mechanical.html", group: "资源专题", d: "防护、联锁、急停" },
  { key: "hazard-radiation", name: "辐射危险深度页", url: "pages/hazard-radiation.html", group: "资源专题", d: "光、激光、SAR、电离" },
  { key: "hazard-chemical", name: "化学危险深度页", url: "pages/hazard-chemical.html", group: "资源专题", d: "RoHS/REACH/供应链" },
  { key: "cases", name: "案例库", url: "pages/cases.html", group: "资源专题", d: "25 个整改案例" },
  { key: "faq", name: "常见问题 FAQ", url: "pages/faq.html", group: "资源专题", d: "高频疑问速答" },
  { key: "roles", name: "岗位化学习路径", url: "pages/roles.html", group: "资源专题", d: "硬件/认证/结构/设计" },
  { key: "designer-guide", name: "设计师必知安规", url: "pages/designer-guide.html", group: "资源专题", d: "开孔、CMF、标签" },
  { key: "pcb-guidelines", name: "PCB 安规设计指南", url: "pages/pcb-guidelines.html", group: "资源专题", d: "间距落地与评审" },
  { key: "components", name: "元器件安全专题", url: "pages/components.html", group: "资源专题", d: "保险丝/变压器/连接器" },
  { key: "environment-tests", name: "环境与可靠性试验", url: "pages/environment-tests.html", group: "资源专题", d: "湿热/温循/盐雾" },
  { key: "labels", name: "标签与说明书", url: "pages/labels.html", group: "资源专题", d: "CE/CCC 规范" },
  { key: "product-classes", name: "产品类别结构图", url: "pages/product-classes.html", group: "资源专题", d: "I/II/III 类剖面" },
  { key: "standard-picker", name: "标准选择器", url: "pages/standard-picker.html", group: "资源专题", d: "产品+市场→标准" },
  { key: "poster", name: "速查海报", url: "pages/poster.html", group: "资源专题", d: "一页纸可打印" },
  { key: "standards-updates", name: "标准更新追踪", url: "pages/standards-updates.html", group: "资源专题", d: "IEC/GB 改版怎么跟" },
  { key: "resources", name: "学习资源中心", url: "pages/resources.html", group: "资源专题", d: "全部资源入口" },
  { key: "changelog", name: "更新日志", url: "pages/changelog.html", group: "资源专题", d: "版本记录" },
  { key: "verification", name: "数值核对表", url: "pages/verification.html", group: "资源专题", d: "数值来源与可信度" },
  { key: "mopp-moop", name: "MOPP / MOOP", url: "pages/mopp-moop.html", group: "资源专题", d: "医疗防护方式判定" },
  { key: "double-insulation", name: "双重绝缘判定", url: "pages/double-insulation.html", group: "资源专题", d: "一层/两层与桥接" },
  { key: "cybersecurity", name: "IoT 网络安全", url: "pages/cybersecurity.html", group: "资源专题", d: "EN 303 645 与安全设计" },
  { key: "workshop", name: "项目工坊", url: "pages/workshop.html", group: "资源专题", d: "虚拟产品全流程" },
  { key: "feedback", name: "纠错反馈", url: "pages/feedback.html", group: "资源专题", d: "提交内容错误" },
  { key: "data", name: "数据备份", url: "pages/data.html", group: "资源专题", d: "进度/笔记/错题导出" },
  { key: "en", name: "English Overview", url: "en/index.html", group: "资源专题", d: "英文核心速览" }
];
var SITE_RECENT_KEY = "angui-site-recent";


function normSite(u) {
  if (u.indexOf("pages/") === 0 || u.indexOf("en/") === 0) return "../" + u;
  return u;
}
function $(id) { return document.getElementById(id); }

function siteRecord(key) {
  try {
    var arr = JSON.parse(localStorage.getItem(SITE_RECENT_KEY)) || [];
    arr = arr.filter(function (x) { return x !== key; });
    arr.unshift(key);
    arr = arr.slice(0, 5);
    localStorage.setItem(SITE_RECENT_KEY, JSON.stringify(arr));
    siteRenderRecent();
  } catch (e) { /* ignore */ }
}

function siteBind() {
  document.querySelectorAll("[data-site-key]").forEach(function (b) {
    b.addEventListener("click", function () {
      siteRecord(b.getAttribute("data-site-key"));
    });
  });
}

function siteRenderMap() {
  var box = document.getElementById("siteMap");
  if (!box) return;
  var q = (document.getElementById("siteMapSearch") || { value: "" }).value.trim().toLowerCase();
  var list = SITE_MAP.filter(function (m) {
    return !q || (m.name + m.d + m.group).toLowerCase().indexOf(q) !== -1;
  });
  var groups = {};
  list.forEach(function (m) {
    if (!groups[m.group]) groups[m.group] = [];
    groups[m.group].push(m);
  });
  var html = Object.keys(groups).map(function (g) {
    return '<h3 class="map-group-title">' + g + "</h3><div class=\"map-grid\">" +
      groups[g].map(function (m) {
        return '<a class="map-card" href="' + normSite(m.url) + '" data-site-key="' + m.key + '">' +
          "<b>" + m.name + '</b><span>' + m.group + "</span><small>" + m.d + "</small></a>";
      }).join("") + "</div>";
  }).join("");
  box.innerHTML = html || '<p class="peak-note">没有匹配页面，换个关键词试试。</p>';
  siteBind();
}

function siteRenderRecent() {
  var box = document.getElementById("siteRecent");
  if (!box) return;
  var arr = [];
  try { arr = JSON.parse(localStorage.getItem(SITE_RECENT_KEY)) || []; } catch (e) { /* ignore */ }
  box.innerHTML = arr.length
    ? arr.map(function (key) {
        var m = SITE_MAP.filter(function (x) { return x.key === key; })[0];
        return m ? '<a class="btn" href="' + normSite(m.url) + '" data-site-key="' + key + '">' + m.name + "</a>" : "";
      }).join("")
    : '<span class="peak-note">还没有访问记录。</span>';
  siteBind();
}

var searchBox = document.getElementById("siteMapSearch");
if (searchBox) searchBox.addEventListener("input", siteRenderMap);

// 记录当前页面
var curPath = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";
var cur = SITE_MAP.filter(function (m) { return m.url.split("/").pop() === curPath; })[0];
if (cur) siteRecord(cur.key);

siteRenderMap();
siteRenderRecent();
