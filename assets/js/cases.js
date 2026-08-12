
var CASE_PRODUCT_MAP = {
  "": [],
  power: ["电源", "适配器", "充电", "驱动器"],
  outdoor: ["户外"],
  battery: ["电池"],
  industrial: ["工业", "控制器"],
  comm: ["网络", "通信", "机顶盒"],
  consumer: ["音箱", "风扇", "蓝牙"],
  lighting: ["LED", "台灯", "灯具"],
  mechanical: ["机械", "搅拌机"]
};
function caseProductMatch(c, key) {
  var keys = CASE_PRODUCT_MAP[key];
  if (!key || !keys) return true;
  var hay = c.product + " " + c.title;
  return keys.some(function (k) { return hay.indexOf(k) !== -1; });
}
var CASES = [
  { hazard: "shock", title: "耐压打不过：助焊剂残留惹的祸", product: "开关电源", symptom: "高压初次级之间耐压闪络、泄漏电流超标", root: "PCB 清洗不彻底，助焊剂残留吸水形成导电膜", fix: "改进清洗工艺 + 关键区域三防漆 + 产线耐压全检", lesson: "耐压失败先看工艺，再看设计" },
  { hazard: "shock", title: "雷雨天批量退货：通信口没防雷", product: "户外网络设备", symptom: "雷雨后网口芯片成批损坏", root: "通信口没有 SPD，浪涌从网线进入", fix: "网口加 TVS/TSS 防护 + PCB 泄放路径 + 接地", lesson: "信号口和电源口一样要防浪涌" },
  { hazard: "shock", title: "USB 口打火：充电口到内部间距不足", level: "进阶", product: "消费电子", symptom: "插拔充电器时打火、耐压不过", root: "USB 口与内部高压走线爬电/间隙不足", fix: "重新布局 + 开槽 + 换高 CTI 材料", lesson: "端口隔离在设计阶段就要查间距" },
  { hazard: "shock", title: "接地端子生锈：I 类设备接地失效", product: "电热水壶", symptom: "接地连续性测试超限", root: "接地端子镀层不足、螺丝松动", fix: "换防腐镀层端子 + 防松垫圈 + 工艺扭力规范", lesson: "接地不是“接上就行”，是长期可靠性" },
  { hazard: "shock", title: "SELV 名不副实：适配器隔离不足", level: "进阶", product: "充电适配器", symptom: "输出端可触及却有危险电压", root: "适配器隔离距离不足，SELV 定义不成立", fix: "加强初次级隔离 + 重新做耐压与距离验证", lesson: "低压不等于安全，隔离才是 SELV 的灵魂" },
  { hazard: "energy", title: "保险丝不断，MOS 先炸", product: "AC-DC 电源", symptom: "过流时 MOS 管炸裂、保险丝完好", root: "保险丝额定值/动作时间与 MOS 不匹配", fix: "按 I²t 重新选保险丝，位置放在输入最前端", lesson: "保险丝要保护最薄弱器件，不是“能通就行”" },
  { hazard: "energy", title: "断电后插头仍带电：电容没泄放", product: "电源适配器", symptom: "拔插头后残留电压超限", root: "X 电容无泄放电阻或泄放太慢", fix: "并联泄放电阻并验证 1 秒内降到安全电压", lesson: "储能元件必须有可控的泄放路径" },
  { hazard: "energy", title: "电池包短路：保护板缺失", level: "进阶", product: "便携风扇", symptom: "电池短路起火", root: "无保护板，过流/过温无保护", fix: "加 PCM 四重保护 + 外壳防火隔离", lesson: "电池产品保护板不是可选项" },
  { hazard: "fire", title: "外壳 V-0 也烧穿：开孔位置错了", product: "充电器", symptom: "内部短路后火焰从散热孔喷出", root: "散热孔正对起火源，火焰沿开孔传播", fix: "开孔改到侧面 + 内部加 V-0 挡板", lesson: "材料等级和结构开孔要一起设计" },
  { hazard: "fire", title: "灼热丝不过：V-0 厚度不够", product: "电源外壳", symptom: "灼热丝试验持续燃烧", root: "材料标称 V-0 但样件厚度低于认证厚度", fix: "加厚外壳或换更高等级材料", lesson: "阻燃等级与厚度绑定，不是材料名决定" },
  { hazard: "fire", title: "针焰一烧就蔓延：PCB 基材选错", level: "进阶", product: "LED 驱动器", symptom: "针焰试验火焰沿基材蔓延", root: "PCB 基材阻燃等级不足（非 FR-4）", fix: "换阻燃基材 + 关键区域加挡板", lesson: "内部基材也是防火链的一环" },
  { hazard: "thermal", title: "球压压痕超标：外壳热变形", product: "台灯外壳", symptom: "球压试验压痕 > 2mm", root: "材料耐温不足，受热变软", fix: "换 RTI 更高的材料或加厚支撑", lesson: "热塑外壳要同时看耐温和阻燃" },
  { hazard: "thermal", title: "热机后才超标：只测了额定状态", product: "LED 驱动器", symptom: "常温测试合格，高温老化后温升超限", root: "测试只在额定电压下做，忽略了最低电压大电流工况", fix: "按最不利输入电压/负载复测 + 降额", lesson: "温升测试要覆盖最坏工况" },
  { hazard: "thermal", title: "变压器绕组超温：散热设计不足", level: "进阶", product: "适配器", symptom: "满载绕组温升超限", root: "骨架/磁芯热阻大、风道设计不合理", fix: "加散热片、改进绕线工艺、降额", lesson: "温升是热设计问题，不是换材料就能解决" },
  { hazard: "mechanical", title: "防护罩开口“看着够小”却伸得进手指", product: "工业设备", symptom: "结构评审未发现风险，安全距离不足", root: "没有按 ISO 13857 开口尺寸查表", fix: "按开口-距离表重新设计防护罩", lesson: "机械安全距离是查表算出来的" },
  { hazard: "mechanical", title: "急停被旁路：安全回路失效", level: "进阶", product: "包装机械", symptom: "急停按下后设备仍运行", root: "安全回路被维修时旁路且未恢复", fix: "回路设计防旁路 + 验证失效安全 + 管理流程", lesson: "急停是系统工程，不是装个按钮" },
  { hazard: "mechanical", title: "跌落开裂：带电件可触及", product: "搅拌机", symptom: "1m 跌落后外壳破裂", root: "结构卡扣强度不足、材料太脆", fix: "加强卡扣 + 换韧性材料 + 跌落验证", lesson: "跌落试验是防触电的结构保障" },
  { hazard: "radiation", title: "儿童台灯蓝光超标被召回", product: "LED 台灯", symptom: "光生物安全 RG2 超标", root: "高色温 + 大驱动电流，未做 IEC 62471 评估", fix: "降色温、加扩散/滤光、重新分级并标注", lesson: "光生物安全要做测量，不是选好 LED 就安全" },
  { hazard: "radiation", title: "激光笔无联锁：Class 3B 危险", level: "进阶", product: "激光教具", symptom: "防护罩可拆卸，激光直射", root: "未按 IEC 60825 分级设计防护", fix: "加联锁 + 警告标签 + 限制等级", lesson: "激光设备先分级，再谈设计" },
  { hazard: "chemical", title: "出口欧盟被抽检：SVHC 超标", product: "蓝牙音箱", symptom: "外壳材料检出 SVHC 超阈值", root: "供应商未告知阻燃剂变更", fix: "供应链声明机制 + 变更通知 + 更换材料", lesson: "材料合规靠供应链管理，不是一次检测" },
  { hazard: "chemical", title: "焊料铅超标：RoHS 不合格", product: "控制器", symptom: "批量抽检铅超标", root: "使用了非无铅焊料或来料污染", fix: "换无铅焊料 + 来料检测 + 工艺隔离", lesson: "RoHS 要管到焊料和辅料" },
  { hazard: "emc", title: "传导发射超标：输入滤波不足", level: "进阶", product: "开关电源", symptom: "150kHz–30MHz 多个频点超标", root: "输入 π 滤波参数不匹配，共模路径未处理", fix: "调 X/Y 电容 + 共模电感 + 布局优化", lesson: "传导发射先分差模/共模再整改" },
  { hazard: "emc", title: "辐射发射超标：线缆当天线", level: "进阶", product: "机顶盒", symptom: "30MHz+ 辐射超标", root: "I/O 线缆共模电流大、屏蔽接地不当", fix: "线缆加磁环/共模扼流 + 接口滤波 + 接地", lesson: "辐射超标先怀疑线缆，再怀疑环路" },
  { hazard: "emc", title: "ESD 打复位：缝隙进电", level: "进阶", product: "智能音箱", symptom: "空气放电后 MCU 复位", root: "按键/缝隙下方有复位走线", fix: "敏感走线远离缝隙 + 加 TVS + 软件看门狗", lesson: "ESD 是物理路径问题，不是软件问题" },
  { hazard: "emc", title: "EFT 通信掉线：脉冲串干扰", level: "进阶", product: "工业控制器", symptom: "EFT 试验时 RS-485 频繁掉线", root: "通信线未滤波、电源口缺共模电感", fix: "电源滤波 + 信号 TVS/共模电感 + 协议重试", lesson: "EFT 要硬件滤波和软件兜底一起上" }
];


var CASE_REL = {
  "耐压打不过：助焊剂残留惹的祸": { std: "std-62368", sop: "hipot", tool: "tool-hipot", card: "hipot" },
  "雷雨天批量退货：通信口没防雷": { std: "std-62368", sop: "surge", card: "transient" },
  "USB 口打火：充电口到内部间距不足": { std: "std-62368", sop: "spacing", tool: "tool-spacing", card: "productclass" },
  "接地端子生锈：I 类设备接地失效": { std: "std-60335", sop: "grounding", tool: "tool-grounding", card: "grounding" },
  "SELV 名不副实：适配器隔离不足": { std: "std-61140", sop: "hipot", tool: "tool-selv", card: "selv" },
  "保险丝不断，MOS 先炸": { std: "std-60127", tool: "tool-fuse", card: "components" },
  "断电后插头仍带电：电容没泄放": { std: "std-62368", sop: "residual-voltage", tool: "tool-discharge", card: "energy" },
  "电池包短路：保护板缺失": { std: "std-62133", sop: "battery-short", tool: "tool-battery", card: "battery" },
  "外壳 V-0 也烧穿：开孔位置错了": { std: "std-62368", sop: "ul94", tool: "tool-fire-manual", card: "fire-design" },
  "灼热丝不过：V-0 厚度不够": { std: "std-60695211", sop: "glow-wire", tool: "tool-glow-wire", card: "firetests" },
  "针焰一烧就蔓延：PCB 基材选错": { std: "std-6069522", sop: "needle-flame", tool: "tool-needle-flame", card: "firetests" },
  "球压压痕超标：外壳热变形": { std: "std-60695102", sop: "ball-pressure", tool: "tool-ball-pressure", card: "firetests" },
  "热机后才超标：只测了额定状态": { std: "std-61347", sop: "temperature-rise", tool: "tool-thermal", card: "temperature" },
  "变压器绕组超温：散热设计不足": { std: "std-62368", sop: "temperature-rise", tool: "tool-thermal", card: "temperature" },
  "防护罩开口“看着够小”却伸得进手指": { sop: "mechanical-strength", tool: "tool-mechanical", card: "mechanical" },
  "急停被旁路：安全回路失效": { std: "std-13849", sop: "functional-safety", card: "functional" },
  "跌落开裂：带电件可触及": { std: "std-60335", sop: "drop", tool: "tool-mechanical", card: "mechanical" },
  "儿童台灯蓝光超标被召回": { std: "std-62471", sop: "photobiological", card: "optical" },
  "激光笔无联锁：Class 3B 危险": { std: "std-60825", card: "radhaz" },
  "出口欧盟被抽检：SVHC 超标": { card: "rohs" },
  "焊料铅超标：RoHS 不合格": { card: "rohs" },
  "传导发射超标：输入滤波不足": { std: "std-55032", sop: "conducted-emission", tool: "tool-emcwave", card: "emc" },
  "辐射发射超标：线缆当天线": { std: "std-55032", sop: "radiated-emission", tool: "tool-emcwave", card: "emc" },
  "ESD 打复位：缝隙进电": { std: "std-6100042", sop: "esd", tool: "tool-emcwave", card: "emc" },
  "EFT 通信掉线：脉冲串干扰": { std: "std-6100044", sop: "eft", tool: "tool-emcwave", card: "emc" }
};

var CASE_LABEL = { shock: "防电击", energy: "能量", fire: "防火", thermal: "热量", mechanical: "机械", radiation: "辐射", chemical: "化学", emc: "EMC" };

function $(id) { return document.getElementById(id); }

function renderCases() {
  var h = $("cHazard").value;
  var q = $("cSearch").value.trim().toLowerCase();
  var list = CASES.filter(function (c) {
    if (h !== "all" && c.hazard !== h) return false;
    if (!caseProductMatch(c, $("cProduct").value)) return false;
    if (q && (c.title + c.product + c.root + c.lesson).toLowerCase().indexOf(q) === -1) return false;
    return true;
  });
  $("cList").innerHTML = list.length ? list.map(function (c, i) {
    var lv = c.level || "入门";
    return '<details class="case-card">' +
      '<summary><span class="case-no">' + (i + 1) + '</span> ' + c.title +
      ' <span class="tag">' + CASE_LABEL[c.hazard] + '</span><span class="tag">' + lv + "</span>" +
      "<br><span class=\"case-symptom\">现象：" + c.symptom + "（点击查看根因与整改）</span></summary>" +
      '<div class="case-body">' +
      '<p><b>产品：</b>' + c.product + "</p>" +
      '<p><b>根因：</b>' + c.root + "</p>" +
      '<p><b>整改：</b>' + c.fix + "</p>" +
      '<p class="lesson"><b>启示：</b>' + c.lesson + "</p>" +
      (function () {
        var r = CASE_REL[c.title];
        if (!r) return "";
        var links = [];
        if (r.std) links.push('<a href="./standards.html#' + r.std + '">标准条款</a>');
        if (r.sop) links.push('<a href="./sop-' + r.sop + '.html">SOP</a>');
        if (r.tool) links.push('<a href="./tools.html#' + r.tool + '">工具</a>');
        if (r.card) links.push('<a href="./knowledge.html#' + r.card + '">知识卡</a>');
        return links.length ? '<p class="lesson" style="margin-top:8px"><b>闭环学习：</b>' + links.join(" · ") + "</p>" : "";
      })() +
      "</div></details>";
  }).join("") : '<div class="card"><p>没有匹配案例，换个关键词试试。</p></div>';
  $("cCount").textContent = "显示 " + list.length + " / " + CASES.length + " 个案例";
}

document.querySelectorAll("[data-case-hazard]").forEach(function (b) {
  b.addEventListener("click", function () {
    $("cHazard").value = b.getAttribute("data-case-hazard");
    document.querySelectorAll("[data-case-hazard]").forEach(function (x) {
      var on = x === b;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderCases();
  });
});
$("cSearch").addEventListener("input", renderCases);
$("cProduct").addEventListener("change", renderCases);
renderCases();
