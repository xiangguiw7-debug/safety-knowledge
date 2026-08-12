// 标准编号 -> 行业页速查表锚点
var STANDARD_ANCHORS = {
  "IEC 60601-1-2": "std-6060112",
  "IEC 60664-1": "std-60664",
  "IEC 60335-1": "std-60335",
  "IEC 60335-2": "std-60335",
  "IEC 62368-1": "std-62368",
  "IEC 60598-1": "std-60598",
  "IEC 61347": "std-61347",
  "IEC 62471": "std-62471",
  "IEC 60529": "std-60529",
  "IEC 60601-1": "std-60601",
  "ISO 14971": "std-14971",
  "ISO 10993": "std-10993",
  "IEC 62304": "std-62304",
  "IEC 62366": "std-62366",
  "IEC 60204-1": "std-60204",
  "ISO 13849": "std-13849",
  "IEC 62061": "std-62061",
  "IEC 60079": "std-60079",
  "IEC 62841": "std-62841",
  "IEC 62133": "std-62133",
  "UN 38.3": "std-un383",
  "GB/T 36276": "std-36276",
  "UL 9540A": "std-9540a",
  "ISO 16750": "std-16750",
  "ISO 26262": "std-26262",
  "ISO 6469": "std-6469",
  "CISPR 25": "std-55025",
  "AEC-Q100": "std-aecq",
  "ITU-T K.21": "std-k21",
  "IEC 61000-4-5": "std-6100045",
  "GB/T 17626.5": "std-6100045",
  "IEC 61000-3-2": "std-6100032",
  "IEC 60990": "std-60990",
  "CISPR 32": "std-55032",
  "EN 55032": "std-55032",
  "IEC 60695": "std-60695",
  "IEC 60127": "std-60127",
  "IEC 60384-14": "std-6038414",
  "IEC 61140": "std-61140"
};

var HAZARD_LABEL = { shock: "防电击", energy: "能量", fire: "防火", thermal: "热量", mechanical: "机械", radiation: "辐射", chemical: "化学", emc: "EMC" };

var INDUSTRIES = [
  {
    id: "lighting",
    name: "灯具照明",
    icon: "💡",
    summary: "从通用灯具到 LED 驱动、户外路灯，核心是防触电、温升、防尘防水与光生物安全。",
    hazards: ["shock","thermal","radiation"],
    standards: [
      "IEC 60598-1 / GB 7000.1（灯具通用安全要求）",
      "IEC 61347 / GB 19510（灯控制装置，含 LED 驱动）",
      "IEC 62471 / GB/T 20145（光生物安全）",
      "IEC 60529 / GB/T 4208（防护等级 IP）"
    ],
    topics: [
      { text: "电气间隙（隔离驱动初次级）", href: "clearance.html" },
      { text: "爬电距离（隔离驱动初次级）", href: "creepage.html" },
      { text: "耐压与泄漏电流", href: "hipot.html" },
      { text: "户外灯具的雷击浪涌防护", href: "surge.html" },
      { text: "温升与材料耐热耐燃", href: "knowledge.html#temperature" },
      { text: "防尘防水等级（IP）", href: "knowledge.html#ip" },
      { text: "蓝光 / 紫外光生物安全", href: "knowledge.html#optical" }
    ],
    tests: ["介电强度", "泄漏电流", "温升", "IP 测试", "浪涌", "光生物安全"],
    pitfalls: [
      "隔离型 LED 驱动初次级间距不足，耐压或浪涌时打火",
      "户外灯具没有 SPD，雷击浪涌损坏驱动",
      "儿童灯具忽视蓝光危害与可触及部件温升"
    ],
    links: [["电气间隙", "clearance.html"], ["爬电距离", "creepage.html"], ["雷击浪涌", "surge.html"], ["耐压测试", "hipot.html"]]
  },
  {
    id: "consumer",
    name: "消费电子",
    icon: "📱",
    summary: "手机周边、音箱、耳机等，关注充电安全、电池、防火外壳与机械滥用。",
    hazards: ["shock","energy","fire","chemical"],
    standards: [
      "IEC 62368-1 / GB 4943.1（音视频与 IT 设备）",
      "IEC 62133 / GB 31241（便携式电池）",
      "GB/T 17626.5（浪涌抗扰度）",
      "EN 55032 / GB/T 9254（辐射与传导骚扰）"
    ],
    topics: [
      { text: "充电口到内部带电部件的爬电距离", href: "creepage.html" },
      { text: "耐压与绝缘系统", href: "hipot.html" },
      { text: "电池过充、短路与热失控保护", href: "knowledge.html#battery" },
      { text: "防火外壳与 V-0 材料", href: "knowledge.html#flame" },
      { text: "跌落、挤压等机械滥用", href: "knowledge.html#mechanical" },
      { text: "儿童误用与可触及危险", href: "knowledge.html#mechanical" }
    ],
    tests: ["温升", "耐压", "电池短路/过充", "跌落", "防火", "浪涌"],
    pitfalls: [
      "USB 口与内部高压走线间距不足",
      "锂电池保护板缺失导致热失控",
      "外壳阻燃等级不达标，内部起火后烧穿"
    ],
    links: [["爬电距离", "creepage.html"], ["耐压测试", "hipot.html"], ["雷击浪涌", "surge.html"]]
  },
  {
    id: "appliance",
    name: "家用电器",
    icon: "🏠",
    summary: "最经典的安规领域：电机、加热元件、潮湿环境，处处考验泄漏电流与异常工作保护。",
    hazards: ["shock","fire","thermal"],
    standards: [
      "IEC 60335-1 / GB 4706.1（家电通用安全）",
      "IEC 60335-2 系列 / GB 4706.x（各类器具特殊要求）",
      "GB/T 17626.5（浪涌抗扰度）"
    ],
    topics: [
      { text: "泄漏电流与接触电流", href: "knowledge.html#leakage" },
      { text: "温升与异常工作（堵转、短路）", href: "knowledge.html#temperature" },
      { text: "接地连续性与接地端子", href: "knowledge.html#grounding" },
      { text: "潮湿环境下的爬电距离", href: "creepage.html" },
      { text: "电机与发热元件的耐压", href: "hipot.html" }
    ],
    tests: ["耐压", "泄漏电流", "温升", "异常运行", "机械强度", "湿热试验"],
    pitfalls: [
      "按干燥环境设计，湿热试验后爬电不够",
      "接地端子松动或接触电阻过大",
      "电机堵转无热保护，温升超标"
    ],
    links: [["爬电距离", "creepage.html"], ["耐压测试", "hipot.html"], ["电气间隙", "clearance.html"]]
  },
  {
    id: "medical",
    name: "医疗设备",
    icon: "🏥",
    summary: "安规要求最严的行业之一：患者漏电流、MOPP/MOOP、风险管理与生物相容性缺一不可。",
    hazards: ["shock","radiation","chemical"],
    standards: [
      "IEC 60601-1 / GB 9706.1（医用电气设备安全）",
      "IEC 60601-1-2（医用 EMC）",
      "ISO 14971 / GB/T 42062（风险管理）",
      "ISO 10993（生物相容性）",
      "IEC 62304（医疗器械软件）"
    ],
    topics: [
      { text: "患者漏电流与电击防护（MOPP/MOOP）", href: "knowledge.html#leakage" },
      { text: "爬电距离与电气间隙（单一故障仍安全）", href: "creepage.html" },
      { text: "耐压与接地阻抗", href: "hipot.html" },
      { text: "风险管理文档与可用性", href: "knowledge.html#risk" },
      { text: "EMC 抗扰（ESD、浪涌、工频磁场）", href: "knowledge.html#emc" },
      { text: "接触患者材料的生物相容性", href: "knowledge.html#biocompat" }
    ],
    tests: ["患者/外壳漏电流", "介电强度", "接地阻抗", "EMC", "温升", "跌落"],
    pitfalls: [
      "漏电流限值远严于家电，设计余量不足",
      "接触患者部件未做生物相容性评估",
      "爬电距离只按正常工作算，单一故障时失守"
    ],
    links: [["爬电距离", "creepage.html"], ["电气间隙", "clearance.html"], ["耐压测试", "hipot.html"]]
  },
  {
    id: "machinery",
    name: "工业机械",
    icon: "🏭",
    summary: "除了电气安全，还要懂机械防护、功能安全等级，现场污染等级通常按 3 设计。",
    hazards: ["mechanical","shock","energy"],
    standards: [
      "IEC 60204-1 / GB 5226.1（机械电气设备）",
      "ISO 13849 / GB/T 16855（控制系统安全）",
      "IEC 62061（功能安全）",
      "IEC 60079 / GB 3836（防爆）"
    ],
    topics: [
      { text: "安全距离、防护罩与联锁", href: "knowledge.html#mechanical" },
      { text: "急停与安全回路（PL/SIL 等级）", href: "knowledge.html#functional" },
      { text: "污染等级 3 下的爬电距离与间隙", href: "creepage.html" },
      { text: "现场浪涌与电网质量", href: "surge.html" },
      { text: "危险区域的防爆设计", href: "knowledge.html#explosion" }
    ],
    tests: ["介电强度", "接地连续性", "EMC", "功能安全验证", "急停响应", "IP 防护"],
    pitfalls: [
      "防护罩开口过大，手指/工具可伸入",
      "急停被旁路或复位逻辑不安全",
      "现场粉尘潮湿却按污染等级 2 设计"
    ],
    links: [["电气间隙", "clearance.html"], ["爬电距离", "creepage.html"], ["雷击浪涌", "surge.html"]]
  },
  {
    id: "tools",
    name: "电动工具",
    icon: "🔧",
    summary: "双重绝缘结构 + 电池保护 + 机械耐久，是电动工具的三座大山。",
    hazards: ["mechanical","shock","energy","fire"],
    standards: [
      "IEC 62841 / GB 3883（手持式电动工具）",
      "IEC 62133（工具电池包）"
    ],
    topics: [
      { text: "双重绝缘结构（基本 + 附加）", href: "hipot.html" },
      { text: "电池过流、过温与短路保护", href: "knowledge.html#battery" },
      { text: "粉尘与水分侵入防护", href: "knowledge.html#ip" },
      { text: "振动、噪声与耐久", href: "knowledge.html#mechanical" },
      { text: "换向器火花与可燃粉尘隔离", href: "knowledge.html#flame" }
    ],
    tests: ["双重绝缘耐压", "温升", "耐久", "跌落", "防尘防水", "电池充放电"],
    pitfalls: [
      "外壳开孔破坏双重绝缘结构",
      "电池包只有过充保护，没有过温保护",
      "换向器火花引燃粉尘环境"
    ],
    links: [["耐压测试", "hipot.html"], ["爬电距离", "creepage.html"]]
  },
  {
    id: "power",
    name: "电源与充电器",
    icon: "🔌",
    summary: "开关电源是爬电间隙、浪涌、安规电容和保险丝知识的综合考场。",
    hazards: ["shock","energy","fire","thermal"],
    standards: [
      "IEC 62368-1 / GB 4943.1（电源安全）",
      "IEC 61000-3-2（谐波电流）",
      "GB/T 17626.5（浪涌抗扰度）",
      "能效要求（DOE / CoC / 中国能效）"
    ],
    topics: [
      { text: "隔离变压器初次级爬电距离与间隙", href: "creepage.html" },
      { text: "X/Y 安规电容与保险丝选型", href: "knowledge.html#components" },
      { text: "雷击浪涌与多级防护", href: "surge.html" },
      { text: "温升、降额与寿命", href: "knowledge.html#temperature" },
      { text: "I 类产品的接地与泄漏电流", href: "knowledge.html#grounding" },
      { text: "谐波电流与 PFC", href: "knowledge.html#harmonic" }
    ],
    tests: ["耐压", "泄漏电流", "温升", "浪涌", "谐波", "异常短路", "能效"],
    pitfalls: [
      "初次级间距不足却指望 Y 电容兜底",
      "保险丝额定值与被保护器件不匹配",
      "户外充电器没有浪涌防护"
    ],
    links: [["爬电距离", "creepage.html"], ["电气间隙", "clearance.html"], ["雷击浪涌", "surge.html"], ["耐压测试", "hipot.html"]]
  },
  {
    id: "battery",
    name: "电池与储能",
    icon: "🔋",
    summary: "从便携式锂电池到储能柜，热失控、运输安全和高压绝缘是重点。",
    hazards: ["energy","fire","chemical","thermal"],
    standards: [
      "IEC 62133 / GB 31241（便携式电池）",
      "UN 38.3（运输安全）",
      "GB/T 36276（电力储能电池）",
      "UL 9540A（储能热失控）"
    ],
    topics: [
      { text: "热失控与热扩散抑制", href: "knowledge.html#battery" },
      { text: "过充、过放、短路与温度保护", href: "knowledge.html#battery" },
      { text: "跌落、挤压、热冲击等滥用试验", href: "knowledge.html#battery" },
      { text: "运输安全（UN 38.3）", href: "knowledge.html#battery" },
      { text: "储能柜高压系统的爬电与间隙", href: "creepage.html" },
      { text: "BMS 功能安全", href: "knowledge.html#functional" }
    ],
    tests: ["过充", "外部短路", "跌落", "挤压", "热冲击", "针刺", "热失控传播"],
    pitfalls: [
      "只做过充保护测试，忽略热失控传播",
      "运输鉴定（UN 38.3）被遗漏",
      "高压储能柜按低污染等级设计"
    ],
    links: [["爬电距离", "creepage.html"], ["电气间隙", "clearance.html"], ["雷击浪涌", "surge.html"]]
  },
  {
    id: "automotive",
    name: "汽车电子",
    icon: "🚗",
    summary: "电源瞬态、抛负载、高低温振动、功能安全 ASIL，与消费电子完全是两个世界。",
    hazards: ["shock","mechanical","energy","emc"],
    standards: [
      "ISO 16750（电气电子设备环境条件）",
      "ISO 26262（功能安全）",
      "CISPR 25（车载 EMC）",
      "AEC-Q100 / Q200（元器件认证）",
      "ISO 6469 / GB/T 18384（高压系统）"
    ],
    topics: [
      { text: "12V/48V 电源波动与抛负载瞬态", href: "knowledge.html#transient" },
      { text: "高压（≥60V DC）绝缘与爬电间隙", href: "creepage.html" },
      { text: "车载浪涌与 ISO 7637 瞬态", href: "surge.html" },
      { text: "功能安全 ASIL 等级落地", href: "knowledge.html#functional" },
      { text: "温度冲击、振动与盐雾", href: "knowledge.html#mechanical" }
    ],
    tests: ["抛负载", "绝缘耐压", "浪涌", "ESD", "温度循环", "振动", "功能安全分析"],
    pitfalls: [
      "把消费级器件直接用在车载环境",
      "抛负载瞬态没有防护",
      "高压接插件爬电/间隙不足，雨天打火"
    ],
    links: [["电气间隙", "clearance.html"], ["爬电距离", "creepage.html"], ["雷击浪涌", "surge.html"]]
  },
  {
    id: "ict",
    name: "IT 与通信设备",
    icon: "🌐",
    summary: "SELV/TNV 隔离、PoE 供电、通信端口防雷，是无线路由器、交换机等的常见考点。",
    hazards: ["shock","emc","fire"],
    standards: [
      "IEC 62368-1 / GB 4943.1（ICT/AV 设备）",
      "ITU-T K.21（通信端口防雷）",
      "GB/T 17626.5（浪涌抗扰度）",
      "RED / SRRC（无线设备）"
    ],
    topics: [
      { text: "SELV 与 TNV 电路的隔离", href: "knowledge.html#selv" },
      { text: "PoE 供电端口的绝缘与间距", href: "creepage.html" },
      { text: "通信端口浪涌（10/700μs）", href: "surge.html" },
      { text: "防火外壳与 V-0 材料", href: "knowledge.html#flame" },
      { text: "天线端口的 ESD 防护", href: "knowledge.html#emc" }
    ],
    tests: ["耐压", "浪涌（电源+通信口）", "温升", "防火", "EMC", "SAR"],
    pitfalls: [
      "通信口没有防雷器件，雷雨天批量损坏",
      "PoE 端口隔离不足",
      "天线端口缺 ESD 保护"
    ],
    links: [["雷击浪涌", "surge.html"], ["爬电距离", "creepage.html"], ["电气间隙", "clearance.html"], ["耐压测试", "hipot.html"]]
  },
  {
    id: "iot",
    name: "智能家居 / IoT",
    icon: "🏠",
    summary: "联网设备把安规、无线、网络安全叠在一起，认证链路更长。",
    hazards: ["shock", "emc", "fire"],
    standards: [
      "IEC 62368-1 / GB 4943.1（安全）",
      "RED / SRRC（无线）",
      "IEC 62133（电池，如适用）"
    ],
    topics: [
      { text: "无线射频与 SAR 评估", href: "hazard-radiation.html" },
      { text: "网络安全与安规的交叉", href: "knowledge.html#software" },
      { text: "电池供电产品的能量管理", href: "knowledge.html#battery" },
      { text: "电源口的爬电与间隙", href: "creepage.html" }
    ],
    tests: ["安全耐压", "无线射频", "EMC", "电池", "网络安全"],
    pitfalls: [
      "只做安规忘了无线认证",
      "IoT 固件更新引入安全风险",
      "电池小家电按玩具/家电边界不清"
    ],
    links: [["辐射危险", "hazard-radiation.html"], ["EMC", "emc.html"]]
  },
  {
    id: "robotics",
    name: "机器人 / AGV",
    icon: "🤖",
    summary: "功能安全、机械防护、电池与自动导航叠加，是复合型安规考卷。",
    hazards: ["mechanical", "energy", "shock"],
    standards: [
      "IEC 60204-1（电气设备）",
      "ISO 10218 / ISO 3691-4（机器人安全）",
      "ISO 13849 / IEC 62061（功能安全）",
      "IEC 62133（电池）"
    ],
    topics: [
      { text: "安全距离与防护罩", href: "hazard-mechanical.html" },
      { text: "功能安全等级 PL/SIL", href: "knowledge.html#functional" },
      { text: "自动与手动模式切换", href: "knowledge.html#mechanical" },
      { text: "电池与充电站能量管理", href: "knowledge.html#battery" }
    ],
    tests: ["功能安全验证", "机械防护", "急停", "电池", "EMC"],
    pitfalls: [
      "安全回路没有失效安全设计",
      "人机协作距离计算错误",
      "充电站与机器人接口间距不足"
    ],
    links: [["机械危险", "hazard-mechanical.html"], ["功能安全", "knowledge.html#functional"]]
  },
  {
    id: "charging",
    name: "充电桩 / 电动车",
    icon: "🔋",
    summary: "大功率、高压、户外环境，防电击和热管理都是高难度。",
    hazards: ["shock", "energy", "thermal", "fire"],
    standards: [
      "IEC 61851 / GB/T 18487（充电系统）",
      "GB/T 20234（充电接口）",
      "ISO 6469 / GB/T 18384（高压安全）"
    ],
    topics: [
      { text: "高压绝缘与爬电间隙", href: "creepage.html" },
      { text: "大功率散热与热管理", href: "hazard-thermal.html" },
      { text: "户外 IP 防护与浪涌", href: "knowledge.html#ip" },
      { text: "充电连接器的电弧防护", href: "hazard-energy.html" }
    ],
    tests: ["高压绝缘耐压", "温升", "IP 防护", "浪涌", "连接器寿命"],
    pitfalls: [
      "高压接插件雨天爬电不足",
      "充电枪带电拔插电弧",
      "户外设备浪涌防护缺失"
    ],
    links: [["热量危险", "hazard-thermal.html"], ["能量危险", "hazard-energy.html"]]
  },
  {
    id: "drone",
    name: "无人机 / 玩具",
    icon: "🚁",
    summary: "高速旋转件 + 电池 + 无线 + 儿童可及，安全和玩具法规叠加。",
    hazards: ["mechanical", "energy", "radiation"],
    standards: [
      "无人机专用法规（民航局/欧盟）",
      "IEC 62133 / GB 31241（电池）",
      "EN 71 / GB 6675（玩具，如适用）",
      "RED / SRRC（无线）"
    ],
    topics: [
      { text: "螺旋桨防护与跌落", href: "hazard-mechanical.html" },
      { text: "电池能量与热失控", href: "knowledge.html#battery" },
      { text: "无线射频与 SAR", href: "hazard-radiation.html" },
      { text: "儿童误用场景", href: "knowledge.html#mechanical" }
    ],
    tests: ["螺旋桨防护", "跌落", "电池短路/过充", "无线", "玩具机械强度"],
    pitfalls: [
      "螺旋桨裸露被儿童触及",
      "电池包无保护板",
      "玩具/无人机分类边界不清"
    ],
    links: [["机械危险", "hazard-mechanical.html"], ["电池", "knowledge.html#battery"]]
  },
  {
    id: "escooter",
    name: "电动自行车 / 滑板车",
    icon: "🛴",
    summary: "人车一体的产品：机械强度、电池防火和骑行安全缺一不可。",
    hazards: ["mechanical", "energy", "fire"],
    standards: [
      "GB 17761（电动自行车）",
      "IEC 62133（电池）",
      "ISO 4210（自行车安全，参考）"
    ],
    topics: [
      { text: "车架强度与折叠机构", href: "hazard-mechanical.html" },
      { text: "电池防火与热失控", href: "hazard-fire.html" },
      { text: "充电器与接口安全", href: "knowledge.html#components" },
      { text: "骑行稳定性与制动", href: "hazard-mechanical.html" }
    ],
    tests: ["车架强度", "制动", "电池热失控", "充电器耐压", "防尘防水"],
    pitfalls: [
      "电池仓无隔热导致热失控烧车",
      "折叠锁扣强度不足",
      "充电接口进水短路"
    ],
    links: [["防火", "hazard-fire.html"], ["机械危险", "hazard-mechanical.html"]]
  },
  {
    id: "lab",
    name: "实验室与测量仪器",
    icon: "🧪",
    summary: "按测量类别与污染等级设计，过电压类别选错是常见问题。",
    hazards: ["shock", "thermal"],
    standards: ["IEC 61010-1 / GB 4793.1（测量、控制与实验室设备）"],
    topics: [
      { text: "测量类别与过电压", href: "clearance.html" },
      { text: "端口绝缘与爬电间隙", href: "creepage.html" },
      { text: "耐压与泄漏电流", href: "hipot.html" }
    ],
    tests: ["耐压", "泄漏电流", "温升", "EMC"],
    pitfalls: ["测量类别选错导致间隙不足", "测试端口绝缘距离不够"],
    links: [["防电击", "hazard-radiation.html"], ["标准对照", "standards-compare.html"]]
  },
  {
    id: "solar",
    name: "光伏逆变器与储能",
    icon: "☀️",
    summary: "高压直流 + 直流电弧 + 户外环境，是能量危险的教科书场景。",
    hazards: ["shock", "energy", "thermal"],
    standards: ["IEC 62109-1/-2（光伏逆变器安全）", "IEC 62477（电力电子变换系统）", "储能电池标准"],
    topics: [
      { text: "高压直流绝缘与爬电", href: "creepage.html" },
      { text: "直流电弧防护", href: "hazard-energy.html" },
      { text: "热管理与降额", href: "hazard-thermal.html" },
      { text: "并网与防孤岛", href: "emc.html" }
    ],
    tests: ["高压耐压", "直流电弧", "温升", "浪涌", "防孤岛"],
    pitfalls: ["直流拉弧被忽视", "高压直流侧爬电不足", "户外逆变器防潮不足"],
    links: [["能量危险", "hazard-energy.html"], ["热量危险", "hazard-thermal.html"]]
  },
  {
    id: "portable-power",
    name: "便携储能 / 户外电源",
    icon: "⛺",
    summary: "电池 + 逆变器 + 户外使用的组合，热失控和 AC 输出间距是重点。",
    hazards: ["energy", "fire", "thermal", "shock"],
    standards: ["IEC 62368-1", "IEC 62133 / GB 31241", "UN 38.3"],
    topics: [
      { text: "电池热失控隔离", href: "knowledge.html#battery" },
      { text: "AC 输出爬电与间隙", href: "creepage.html" },
      { text: "户外 IP 防护", href: "knowledge.html#ip" },
      { text: "充电安全", href: "knowledge.html#components" }
    ],
    tests: ["电池", "耐压", "温升", "IP", "浪涌"],
    pitfalls: ["电池仓无隔热", "AC 插座间距不足", "户外接口进水"],
    links: [["电池", "knowledge.html#battery"], ["防火", "hazard-fire.html"]]
  },
  {
    id: "beauty",
    name: "个人护理与美容仪",
    icon: "✨",
    summary: "皮肤接触 + 电池 + 潮湿环境，加热和金属件是安全重点。",
    hazards: ["shock", "thermal", "chemical"],
    standards: ["IEC 60335-1（适用部分）", "皮肤接触材料要求", "电池标准"],
    topics: [
      { text: "皮肤接触材料安全", href: "knowledge.html#biocompat" },
      { text: "加热头温控", href: "hazard-thermal.html" },
      { text: "潮湿环境 IP 与泄漏", href: "knowledge.html#ip" },
      { text: "电池保护", href: "knowledge.html#battery" }
    ],
    tests: ["耐压", "泄漏电流", "温升", "IP", "电池"],
    pitfalls: ["加热头温控失效烫伤", "金属件接触带电部件", "充电口进水"],
    links: [["热量危险", "hazard-thermal.html"], ["化学危险", "hazard-chemical.html"]]
  },
  {
    id: "cleaning",
    name: "清洁电器（吸尘器/洗地机）",
    icon: "🧹",
    summary: "湿环境 + 电机 + 电池，泄漏电流和异常运行是主战场。",
    hazards: ["shock", "thermal", "fire"],
    standards: ["IEC 60335-1 + 2-2 / 2-10 等（吸尘器/洗地机）"],
    topics: [
      { text: "湿手使用的泄漏电流", href: "knowledge.html#leakage" },
      { text: "电机堵转与异常运行", href: "hipot.html" },
      { text: "尘杯静电与毛刷缠绕", href: "knowledge.html#mechanical" },
      { text: "电池安全", href: "knowledge.html#battery" }
    ],
    tests: ["泄漏电流", "耐压", "异常运行", "IP", "电池"],
    pitfalls: ["洗地机湿手泄漏超标", "电机堵转无保护", "毛刷缠绕温升"],
    links: [["泄漏电流", "knowledge.html#leakage"], ["防火", "hazard-fire.html"]]
  },
  {
    id: "security",
    name: "安防监控与智能门锁",
    icon: "📹",
    summary: "户外安装 + PoE 供电 + 联网，浪涌和网络安全缺一不可。",
    hazards: ["shock", "emc", "fire"],
    standards: ["IEC 62368-1", "PoE 相关要求", "EN 303 645（IoT 安全）"],
    topics: [
      { text: "PoE 端口隔离", href: "knowledge.html#selv" },
      { text: "户外浪涌防护", href: "surge.html" },
      { text: "IoT 网络安全", href: "cybersecurity.html" },
      { text: "门锁电池仓防火", href: "hazard-fire.html" }
    ],
    tests: ["耐压", "浪涌", "IP", "网络安全", "电池"],
    pitfalls: ["户外摄像头浪涌防护不足", "门锁电池仓无防火隔离", "默认口令未强制修改"],
    links: [["网络安全", "cybersecurity.html"], ["浪涌", "surge.html"]]
  },
  {
    id: "wearable",
    name: "智能穿戴（手表/耳机）",
    icon: "⌚",
    summary: "贴身使用：电池、SAR、皮肤接触和充电触点一个都不能少。",
    hazards: ["energy", "radiation", "chemical"],
    standards: ["IEC 62368-1", "IEC 62133", "RED（无线）", "SAR 评估"],
    topics: [
      { text: "小容量电池安全", href: "knowledge.html#battery" },
      { text: "SAR 射频暴露", href: "hazard-radiation.html" },
      { text: "皮肤接触材料", href: "knowledge.html#biocompat" },
      { text: "充电触点防水", href: "knowledge.html#ip" }
    ],
    tests: ["电池", "SAR", "耐压", "IP", "跌落"],
    pitfalls: ["耳戴产品 SAR 评估遗漏", "充电触点腐蚀", "表带材料致敏"],
    links: [["辐射危险", "hazard-radiation.html"], ["电池", "knowledge.html#battery"]]
  },
  {
    id: "server",
    name: "服务器与数据中心设备",
    icon: "🖥️",
    summary: "高功率密度 + 冗余 + 防火，热设计和 5VA 外壳是重点。",
    hazards: ["thermal", "fire", "shock"],
    standards: ["IEC 62368-1", "防火外壳（5VA）", "IEC 62040（UPS 参考）"],
    topics: [
      { text: "高功率散热设计", href: "hazard-thermal.html" },
      { text: "防火外壳与 5VA", href: "hazard-fire.html" },
      { text: "冗余电源与热插拔", href: "hazard-energy.html" },
      { text: "机架接地", href: "knowledge.html#grounding" }
    ],
    tests: ["温升", "防火", "耐压", "EMC"],
    pitfalls: ["高密度散热不足", "热插拔电弧", "机架接地不规范"],
    links: [["热量危险", "hazard-thermal.html"], ["防火", "hazard-fire.html"]]
  },
  {
    id: "automation",
    name: "工业自动化（PLC/变频器）",
    icon: "⚙️",
    summary: "功能安全 + EMC 抗扰 + 粉尘环境，变频器是 EMC 大户。",
    hazards: ["mechanical", "shock", "emc"],
    standards: ["IEC 60204-1", "ISO 13849 / IEC 62061", "IEC 61000-6 系列"],
    topics: [
      { text: "功能安全等级", href: "knowledge.html#functional" },
      { text: "变频器 EMC 整改", href: "emc.html" },
      { text: "端子爬电与污染", href: "creepage.html" },
      { text: "安全回路防旁路", href: "hazard-mechanical.html" }
    ],
    tests: ["功能安全", "EMC", "耐压", "温升"],
    pitfalls: ["安全回路被旁路", "变频器传导发射超标", "粉尘环境按污染 2 设计"],
    links: [["功能安全", "knowledge.html#functional"], ["EMC", "emc.html"]]
  },
  {
    id: "low-voltage",
    name: "低压电器（断路器/接触器）",
    icon: "🔌",
    summary: "分断能力、温升和电弧是低压电器的安规灵魂。",
    hazards: ["energy", "fire", "thermal"],
    standards: ["IEC 60947 系列 / GB/T 14048"],
    topics: [
      { text: "分断能力与电弧", href: "hazard-energy.html" },
      { text: "温升与寿命", href: "hazard-thermal.html" },
      { text: "绝缘耐压", href: "hipot.html" }
    ],
    tests: ["分断", "温升", "耐压", "寿命"],
    pitfalls: ["分断能力不足", "触点电弧烧蚀", "绝缘爬电不足"],
    links: [["能量危险", "hazard-energy.html"], ["耐压", "hipot.html"]]
  },
  {
    id: "toy",
    name: "玩具",
    icon: "🧸",
    summary: "儿童可及 + 小零件 + 电池仓，安全和玩具法规叠加。",
    hazards: ["mechanical", "energy", "chemical"],
    standards: ["EN 71 / GB 6675", "IEC 62115（电玩具）", "电池标准"],
    topics: [
      { text: "小零件与可触及性", href: "hazard-mechanical.html" },
      { text: "电池仓固定", href: "knowledge.html#battery" },
      { text: "电玩具耐压与温升", href: "hipot.html" },
      { text: "材料化学安全", href: "hazard-chemical.html" }
    ],
    tests: ["机械", "小零件", "电池", "耐压", "温升"],
    pitfalls: ["小零件吞咽风险", "电池仓无螺丝固定", "电玩具温升超标"],
    links: [["机械危险", "hazard-mechanical.html"], ["化学危险", "hazard-chemical.html"]]
  },
  {
    id: "powerbank",
    name: "充电宝与移动电源",
    icon: "🔋",
    summary: "高密度电池 + 快充 + 随身携带，热失控是头号风险。",
    hazards: ["energy", "fire", "thermal"],
    standards: ["GB 4943.1（3C）", "GB 31241", "UN 38.3"],
    topics: [
      { text: "电池热失控", href: "knowledge.html#battery" },
      { text: "过充/过放/过流保护", href: "hazard-energy.html" },
      { text: "快充协议保护", href: "knowledge.html#components" },
      { text: "跌落与结构", href: "hazard-mechanical.html" }
    ],
    tests: ["电池", "耐压", "温升", "跌落", "过充"],
    pitfalls: ["电芯一致性差", "快充保护缺失", "外壳阻燃不足"],
    links: [["电池", "knowledge.html#battery"], ["防火", "hazard-fire.html"]]
  }
];

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderCards() {
  var list = document.getElementById("industryList");
  if (!list) return;
  list.innerHTML = INDUSTRIES.map(function (item) {
    var standards = item.standards.map(function (s) {
      var label = escapeHtml(s);
      var anchor = null;
      Object.keys(STANDARD_ANCHORS).sort(function (a, b) { return b.length - a.length; }).forEach(function (key) {
        if (anchor === null && s.indexOf(key) === 0) anchor = STANDARD_ANCHORS[key];
      });
      return "<li>" + (anchor ? '<a href="standards.html#' + anchor + '">' + label + "</a>" : label) + "</li>";
    }).join("");

    var topics = item.topics.map(function (t) {
      var label = escapeHtml(t.text);
      return "<li>" + (t.href ? '<a href="' + t.href + '">' + label + "</a>" : label) + "</li>";
    }).join("");

    var tests = item.tests.map(function (t) {
      return "<span>" + escapeHtml(t) + "</span>";
    }).join("");

    var pitfalls = item.pitfalls.map(function (p) {
      return "· " + p;
    }).join("<br>");

    var links = item.links.map(function (l) {
      return '<a class="btn" href="' + l[1] + '">' + escapeHtml(l[0]) + "</a>";
    }).join(" ");

    return (
      '<article class="industry-card" id="' + item.id + '" data-industry="' + item.id + '">' +
        '<h3>' + item.icon + " " + escapeHtml(item.name) + "</h3>" +
        '<p class="summary">' + escapeHtml(item.summary) + "</p>" +
        '<p class="meta">主要安全因素</p>' +
        '<p>' + (item.hazards || []).map(function (h) { return '<a class="tag" href="./knowledge.html#hazard-' + h + '">' + HAZARD_LABEL[h] + "</a>"; }).join(" ") + "</p>" +
        '<p class="meta">适用标准</p>' +
        '<ul class="std-list">' + standards + "</ul>" +
        '<p class="meta">重点学习模块</p>' +
        '<ul class="topic-list">' + topics + "</ul>" +
        '<p class="meta">典型测试项目</p>' +
        '<div class="test-chips">' + tests + "</div>" +
        '<div class="callout callout-warn pitfall"><strong>常见坑：</strong><br>' + pitfalls + "</div>" +
        '<p style="margin-top:12px"><a class="btn" href="workshop.html?ind=' + item.id + '">🏭 去工坊做项目</a></p>' +
        '<div class="link-row" style="margin-top:auto;padding-top:14px">' + links + "</div>" +
      "</article>"
    );
  }).join("");
}

function applyFilter(id) {
  if (!document.getElementById("industryList")) return;
  window.industryFilter = id;
  var matchName = INDUSTRIES.filter(function (x) { return x.id === id; })[0];
  window.industryFilterName = matchName ? matchName.name : "";
  var cards = document.querySelectorAll(".industry-card");
  var shown = 0;

  cards.forEach(function (card) {
    var match = id === "all" || card.dataset.industry === id;
    card.classList.toggle("hidden", !match);
    if (match) shown += 1;
  });

  document.querySelectorAll(".filter-chip").forEach(function (chip) {
    var active = chip.dataset.filter === id;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.getElementById("filterCount").textContent = "当前显示 " + shown + " / " + INDUSTRIES.length + " 个行业";
  if (window.renderStdQuick) window.renderStdQuick();
}

document.querySelectorAll(".filter-chip").forEach(function (chip) {
  chip.addEventListener("click", function () {
    applyFilter(chip.dataset.filter);
  });
});

renderCards();
applyFilter("all");
