var SEARCH_INDEX = [
  { t: "电气间隙（Clearance）", d: "空气最短直线距离，冲击电压与海拔修正", u: "pages/clearance.html", k: "间隙 clearance 空气 击穿 峰值 过电压类别 海拔" },
  { t: "爬电距离（Creepage）", d: "沿绝缘表面的距离，污染等级与 CTI 材料组", u: "pages/creepage.html", k: "爬电 creepage 污染等级 CTI 材料组 绝缘 开槽" },
  { t: "雷击浪涌", d: "1.2/50 波形、试验等级、MOV/GDT/TVS、多级防护", u: "pages/surge.html", k: "浪涌 surge 雷击 SPD MOV TVS GDT 61000-4-5 波形" },
  { t: "耐压测试", d: "绝缘体系、AC/DC、5 步法确定试验电压", u: "pages/hipot.html", k: "耐压 hipot 介电强度 泄漏 绝缘 交流 直流 1500 3000" },
  { t: "计算工具", d: "爬电/间隙计算器：产品类别、目标市场、耐压速查", u: "pages/tools.html", k: "计算器 工具 爬电 间隙 耐压 产品类别 I类 II类 III类 宽压" },
  { t: "泄漏电流估算器", d: "Y 电容对地泄漏电流 I=2πfCV", u: "pages/tools.html", k: "泄漏 电流 估算 Y电容 对地 计算" },
  { t: "RC 放电时间计算器", d: "泄放电阻 τ 与降到安全电压时间", u: "pages/tools.html", k: "放电 泄放 RC 时间常数 电容 安全电压" },
  { t: "SELV 限值速查", d: "AC≤50V / DC≤120V 与隔离条件", u: "pages/tools.html", k: "SELV 限值 特低电压 隔离 61140" },
  { t: "绝缘层数检查清单", d: "7 项自检：路径、桥接、加强绝缘", u: "pages/tools.html", k: "绝缘 层数 检查 清单 双重绝缘 加强" },
  { t: "反查图表", d: "距离→最大电压曲线与多场景建议", u: "pages/tools.html", k: "反查 图表 距离 电压 曲线 场景" },
  { t: "温升估算器", d: "ΔT=P×Rth 或自然对流面积估算", u: "pages/tools.html", k: "温升 估算 热阻 散热 功耗" },
  { t: "工程单位换算", d: "mm↔mil、dBµV↔µV、℃↔℉", u: "pages/tools.html", k: "单位 换算 mm mil dBuV 温度" },
  { t: "测试项目清单生成器", d: "产品+市场生成安全/EMC/环保清单", u: "pages/tools.html", k: "测试 清单 生成 项目 安规 EMC 环保" },
  { t: "保险丝选型速查", d: "稳态电流 1.25–1.5× 建议", u: "pages/tools.html", k: "保险丝 选型 额定电流 I2t" },
  { t: "灼热丝档位向导", d: "部件位置 → 550/650/750/850°C 档位", u: "pages/tools.html#tool-glow-wire", k: "灼热丝 档位 550 650 750 850 防火" },
  { t: "针焰试验", d: "火焰 12mm±1mm、45° 施加、铺底层 200mm、判定 30s（IEC 60695-2-2）", u: "pages/knowledge.html#needleflame-detail", k: "针焰 60695-2-2 5169.5 火焰 引燃 欧标 美标 12mm 45度 200mm" },
  { t: "球压试验", d: "5mm 钢球、20N、1h、压痕 ≤2mm（IEC 60695-10-2）", u: "pages/knowledge.html#ballpressure-detail", k: "球压 60695-10-2 5169.21 变形 压痕 20N" },
  { t: "针焰施加时间速查（工具）", d: "按部件类型建议 5/10/20/30s 施加时间", u: "pages/tools.html#tool-needle-flame", k: "针焰 工具 施加时间 速查" },
  { t: "灼热丝试验（知识卡）", d: "GWFI/GWIT、0.8–1.2N、30s 完整参数", u: "pages/knowledge.html#glowwire-detail", k: "灼热丝 知识卡 GWT GWFI GWIT 60695-2-11" },
  { t: "球压试验温度速查（工具）", d: "75/125°C 档位速查", u: "pages/tools.html#tool-ball-pressure", k: "球压 工具 温度 速查" },
  { t: "防火试验三件套", d: "灼热丝/针焰/球压的原理与分工", u: "pages/knowledge.html#firetests", k: "防火 试验 灼热丝 针焰 球压 GWFI GWIT" },
  { t: "电池能量计算", d: "Wh=V×Ah 与运输/法规提示", u: "pages/tools.html", k: "电池 能量 Wh 容量 电压" },
  { t: "环境试验参数速查", d: "湿热/温循/高温/盐雾典型值", u: "pages/tools.html", k: "环境 试验 湿热 温循 盐雾 参数" },
  { t: "工具地图", d: "17 个计算工具分组导航与最近使用", u: "pages/tools.html", k: "工具 地图 分组 最近 使用 导航" },
  { t: "答题测验", d: "95 题精选 + 自动生成题库，按模块即时切换", u: "pages/quiz.html", k: "测验 quiz 自测 题目" },
  { t: "标准结构导读", d: "IEC 标准怎么读：范围、定义、条款、附录", u: "pages/knowledge.html#stdguide", k: "标准 结构 导读 IEC 条款 附录" },
  { t: "防触电的通用逻辑", d: "SELV、绝缘分级、距离、保护元件、外壳五道防线", u: "pages/knowledge.html#protection", k: "防触电 电击 防线 SELV I类 II类 III类" },
  { t: "泄漏电流与接触电流", d: "概念、测量网络、Y 电容影响、限值差异", u: "pages/knowledge.html#leakage", k: "泄漏电流 接触电流 患者漏电流 60990 Y电容" },
  { t: "泄漏电流深度页", d: "IEC 60990 测量网络、人体反应、产品限值", u: "pages/leakage.html", k: "泄漏 接触电流 60990 测量网络 限值 深度页" },
  { t: "接地与等电位深度页", d: "接地连续性、等电位、SPD 泄放路径", u: "pages/grounding.html", k: "接地 等电位 连续性 端子 SPD 深度页" },
  { t: "SELV 深度页", d: "SELV 成立条件、限值、隔离与验证", u: "pages/selv.html", k: "SELV TNV 隔离 限值 深度页" },
  { t: "绝缘配合深度页", d: "电压/污染/CTI/海拔如何决定爬电与间隙", u: "pages/insulation-coordination.html", k: "绝缘配合 爬电 间隙 60664 深度页" },
  { t: "接地与等电位连接", d: "接地连续性、端子要求、浪涌泄放路径", u: "pages/knowledge.html#grounding", k: "接地 等电位 连续性 接地阻抗 PE" },
  { t: "温升与材料耐热", d: "限值、热电偶/电阻法、球压与灼热丝", u: "pages/knowledge.html#temperature", k: "温升 发热 耐热 球压 灼热丝 降额 基准环境温度 40°C 25°C 换算" },
  { t: "防火与阻燃材料", d: "UL94 V-0/5VA、灼热丝、外壳开孔", u: "pages/knowledge.html#flame", k: "防火 阻燃 UL94 V0 灼热丝 60695 外壳" },
  { t: "电池保护与热失控", d: "过充/过放/短路/过温、UN 38.3、热扩散", u: "pages/knowledge.html#battery", k: "电池 锂电池 热失控 UN38.3 62133 31241 BMS" },
  { t: "IP 防护等级", d: "防尘防水代码、IEC 60529 试验、户外产品", u: "pages/knowledge.html#ip", k: "IP 防护 防尘 防水 IP65 60529" },
  { t: "光生物安全", d: "RG0-RG3、蓝光危害、IEC 62471", u: "pages/knowledge.html#optical", k: "光生物 蓝光 紫外 62471 RG0 RG3 灯具" },
  { t: "生物相容性", d: "ISO 10993、接触分类、细胞毒性", u: "pages/knowledge.html#biocompat", k: "生物相容 10993 细胞毒性 致敏 医疗" },
  { t: "风险管理", d: "ISO 14971 流程、风险矩阵、残余风险", u: "pages/knowledge.html#risk", k: "风险管理 14971 医疗 风险矩阵 残余风险" },
  { t: "功能安全", d: "PL/SIL/ASIL、安全回路、诊断覆盖率", u: "pages/knowledge.html#functional", k: "功能安全 PL SIL ASIL 13849 26262 急停" },
  { t: "机械防护与安全联锁", d: "安全距离、防护罩、联锁、急停复位", u: "pages/knowledge.html#mechanical", k: "机械 防护 联锁 安全距离 急停 13857" },
  { t: "防爆", d: "危险区域、Ex 型式、温度组别、IEC 60079", u: "pages/knowledge.html#explosion", k: "防爆 危险区域 Ex 本安 隔爆 60079" },
  { t: "SELV / TNV 与隔离", d: "安全特低电压、隔离变压器、PoE", u: "pages/knowledge.html#selv", k: "SELV TNV 特低电压 隔离 PoE 61140" },
  { t: "共模与差模", d: "电流走向动画：线间干扰 vs 线地干扰", u: "pages/knowledge.html#dmcm", k: "共模 差模 common mode differential EMC X电容 Y电容" },
  { t: "EMC 基础", d: "发射与抗扰、ESD/浪涌/EFT、与安规的交叉", u: "pages/knowledge.html#emc", k: "EMC 电磁兼容 发射 抗扰 ESD EFT 传导 辐射" },
  { t: "谐波与电能质量", d: "IEC 61000-3-2 类别、PFC", u: "pages/knowledge.html#harmonic", k: "谐波 PFC 61000-3-2 电能质量 LED驱动" },
  { t: "抛负载与车载瞬态", d: "ISO 16750/7637 脉冲、TVS 选型", u: "pages/knowledge.html#transient", k: "抛负载 load dump 车载 16750 7637 TVS 瞬态" },
  { t: "安规元件：保险丝与 X/Y 电容", d: "认证元件、失效模式、替换原则", u: "pages/knowledge.html#components", k: "保险丝 X电容 Y电容 60127 60384 安规电容" },
  { t: "软件安全与可用性", d: "IEC 62304 等级、追溯、62366 可用性", u: "pages/knowledge.html#software", k: "软件 62304 可用性 62366 医疗软件 追溯" },
  { t: "行业筛选", d: "灯具、消费电子、医疗、汽车等 27 个行业", u: "pages/industries.html", k: "行业 灯具 医疗 家电 汽车 工业 筛选" },
  { t: "标准文件入口", d: "66 个标准清单与官方渠道", u: "pages/standards.html", k: "标准文件 IEC ISO GB 官方 下载 原文" },
  { t: "全球电压速查", d: "各国电压/频率/插头，宽压窄压判断", u: "pages/voltage.html", k: "电压 频率 插头 宽压 窄压 100-240 120 230" },
  { t: "全球认证速查", d: "真实地图 + 国家/产品视图：CCC、CE、FCC、UL、PSE、KC、VDE 等", u: "pages/certification.html", k: "认证 CCC CE FCC UL PSE KC VDE EAC 出口 真实地图 地图 标记 离线世界地图" },
  { t: "学习地图", d: "按角色选择学习入口", u: "pages/learn.html", k: "学习 路径 地图 新人 工程师 出口" },
  { t: "参考中心", d: "行业/标准/电压/认证统一入口", u: "pages/refs.html", k: "参考 中心 出口合规 链路" },
  { t: "CTI 与材料组", d: "漏电起痕指数、PC/ABS/PA66/PBT 典型值、UL 黄卡", u: "pages/knowledge.html#cti", k: "CTI 材料组 漏电起痕 60112 PC ABS PA66 PBT PMMA 黄卡" },
  { t: "材料数据库", d: "CTI/材料组/阻燃/RTI 查询、UL 黄卡指南、供应商清单", u: "pages/materials.html", k: "材料 数据库 CTI 黄卡 阻燃 V0 PC ABS PA66 PBT PMMA 供应商" },
  { t: "术语表", d: "CTI/MOPP/SELV/SPD/RoHS 等 45+ 术语速查", u: "pages/glossary.html", k: "术语 缩写 CTI MOPP SELV SPD RoHS REACH 词典 解释" },
  { t: "认证向导", d: "国家×产品一键生成电压/插头/认证/标准/测试清单", u: "pages/wizard.html", k: "认证 向导 出口 合规 国家 产品 电压 插头 清单" },
  { t: "认证流程", d: "五阶段、CB 转证、技术文件、工厂检查", u: "pages/knowledge.html#certprocess", k: "认证 流程 CB 转证 技术文件 工厂检查 CDF 符合性声明" },
  { t: "辐射危险", d: "激光分级、射频暴露 SAR、电离辐射", u: "pages/knowledge.html#radhaz", k: "辐射 激光 60825 SAR 射频 电离 60601-1-3" },
  { t: "标准差异矩阵", d: "60335/62368/60601/61010/60204 条款与数值对照", u: "pages/standards-compare.html", k: "标准 差异 矩阵 对照 60335 62368 60601 61010 60204" },
  { t: "EMC 系统课程", d: "EMI（电磁干扰）/ EMS（电磁敏感度）两大分支、发射与抗扰项目、滤波接地、整改清单", u: "pages/emc.html", k: "EMC 课程 EMI EMS 发射 抗扰 ESD EFT 浪涌 RS CS 传导 辐射 滤波 整改 61000-4" },
  { t: "传导发射（CE）", d: "频段限值、差模共模来源、滤波整改", u: "pages/emc-ce.html", k: "传导 发射 CE LISN 差模 共模 滤波 CISPR" },
  { t: "辐射发射（RE）", d: "天线机理、环路最小化、屏蔽展频", u: "pages/emc-re.html", k: "辐射 发射 RE 暗室 环路 共模 屏蔽 展频" },
  { t: "ESD 静电放电", d: "波形等级、失效机理、硬件软件整改", u: "pages/emc-esd.html", k: "ESD 静电 61000-4-2 TVS 放电 整改" },
  { t: "EFT 电快速瞬变", d: "脉冲群、等级、滤波与复位兜底", u: "pages/emc-eft.html", k: "EFT 瞬变 脉冲群 61000-4-4 滤波 整改" },
  { t: "射频辐射抗扰（RS）", d: "暗室扫频 80MHz–6GHz、3–10V/m、屏蔽与线缆整改", u: "pages/emc.html#rs", k: "RS 辐射抗扰 61000-4-3 暗室 场强 射频" },
  { t: "射频传导抗扰（CS）", d: "CDN 注入 150kHz–80MHz、3–10V、共模扼流与滤波", u: "pages/emc.html#cs", k: "CS 传导抗扰 61000-4-6 CDN 注入 射频" },
  { t: "工频磁场抗扰", d: "等级、磁敏元件、屏蔽与布局", u: "pages/emc-magnetic.html", k: "工频 磁场 61000-4-8 霍尔 屏蔽" },
  { t: "电压暂降与中断", d: "hold-up、欠压检测与软件恢复", u: "pages/emc-dips.html", k: "电压暂降 中断 61000-4-11 hold-up 复位" },
  { t: "能量危险", d: "限能电路、电池能量、电弧闪光", u: "pages/knowledge.html#energy", k: "能量 限能 电弧 电池 保险丝 ES1 ES2 ES3" },
  { t: "化学与环保合规", d: "RoHS/REACH/WEEE、无卤、电池指令", u: "pages/knowledge.html#rohs", k: "RoHS REACH WEEE 环保 无卤 加州65 电池指令" }
,
  { t: "能量危险深度页", d: "ES 分级、限能、泄放、电弧", u: "pages/hazard-energy.html", k: "能量 ES 限能 泄放 电弧" },
  { t: "防火深度页", d: "起火链、灼热丝档位、防火结构", u: "pages/hazard-fire.html", k: "防火 灼热丝 V0 5VA 挡板" },
  { t: "热量危险深度页", d: "可触及温度、温升、热失控", u: "pages/hazard-thermal.html", k: "热量 温升 表面温度 热失控 RTI" },
  { t: "机械危险深度页", d: "防护、联锁、急停、跌落", u: "pages/hazard-mechanical.html", k: "机械 防护罩 联锁 急停 安全距离" },
  { t: "辐射危险深度页", d: "光生物、激光、SAR、电离辐射", u: "pages/hazard-radiation.html", k: "辐射 激光 60825 SAR 电离" },
  { t: "化学危险深度页", d: "RoHS/REACH/WEEE、供应链", u: "pages/hazard-chemical.html", k: "化学 RoHS REACH SVHC WEEE 供应链" },
  { t: "案例库", d: "8 个整改案例，按危害筛选", u: "pages/cases.html", k: "案例 整改 失效 分析 召回" },
  { t: "PCB 安规设计指南", d: "间距落地、开槽、布局评审", u: "pages/pcb-guidelines.html", k: "PCB 布局 间距 开槽 走线 高压" },
  { t: "元器件安全专题", d: "保险丝、X/Y 电容、变压器、连接器", u: "pages/components.html", k: "元器件 保险丝 X电容 Y电容 变压器 连接器" },
  { t: "环境与可靠性试验", d: "湿热、温循、振动、盐雾", u: "pages/environment-tests.html", k: "环境 湿热 温循 振动 盐雾 老化" },
  { t: "标签与说明书", d: "CE/CCC 标志、铭牌、警示语", u: "pages/labels.html", k: "标签 标志 CE CCC 铭牌 说明书" },
  { t: "标准更新追踪", d: "IEC/GB 改版怎么跟", u: "pages/standards-updates.html", k: "标准 更新 版本 追踪 过渡期" },
  { t: "常见问题 FAQ", d: "10 个高频疑问", u: "pages/faq.html", k: "FAQ 常见问题 疑问 阻焊层 DC耐压" },
  { t: "岗位化学习路径", d: "硬件/认证/结构/设计师", u: "pages/roles.html", k: "岗位 路径 硬件 认证 结构 设计师" },
  { t: "设计师必知安规", d: "开孔、CMF、标签、交互", u: "pages/designer-guide.html", k: "设计师 CMF 开孔 标签 外观 结构" },
  { t: "产品类别结构图", d: "I/II/III 类剖面与测试", u: "pages/product-classes.html", k: "产品类别 I类 II类 III类 结构 剖面" },
  { t: "标准选择器", d: "产品+市场 → 标准清单", u: "pages/standard-picker.html", k: "标准 选择器 清单 市场 产品" },
  { t: "速查海报", d: "一页纸安规速查，可打印", u: "pages/poster.html", k: "海报 速查 打印 一页" },
  { t: "资源中心", d: "深度页/案例/FAQ/工具统一入口", u: "pages/resources.html", k: "资源 中心 入口 深度 案例" },
  { t: "全站地图", d: "43 个页面分组导航与最近访问", u: "pages/resources.html", k: "全站 地图 导航 搜索 最近 访问" },
  { t: "项目工坊", d: "虚拟产品走完标准/间距/耐压/认证全流程", u: "pages/workshop.html", k: "项目 工坊 虚拟 产品 流程 报告" },
  { t: "纠错反馈", d: "提交内容错误与建议", u: "pages/feedback.html", k: "纠错 反馈 错误 建议 提交" },
  { t: "数据备份", d: "导出/导入进度、笔记、错题", u: "pages/data.html", k: "数据 备份 导出 导入 恢复" },
  { t: "English Overview", d: "核心概念英文速览", u: "en/index.html", k: "English 英文 overview core" },
  { t: "EMC 波形生成器", d: "ESD/EFT/浪涌波形对比", u: "pages/tools.html", k: "EMC 波形 ESD EFT 浪涌 对比 生成" },
  { t: "数值核对表", d: "全站数值来源与可信度追踪", u: "pages/verification.html", k: "数值 核对 可信度 版本 追踪" },
  { t: "MOPP / MOOP", d: "医疗患者/操作者防护方式判定", u: "pages/mopp-moop.html", k: "MOPP MOOP 医疗 防护 患者 操作者" },
  { t: "双重绝缘判定", d: "一层/两层、桥接与加强绝缘", u: "pages/double-insulation.html", k: "双重绝缘 层数 桥接 加强绝缘" },
  { t: "IoT 网络安全", d: "EN 303 645、CRA 与安全设计", u: "pages/cybersecurity.html", k: "IoT 网络安全 EN303645 CRA SBOM 固件" },
  { t: "更新日志", d: "版本记录 v1.0/v1.1/v1.1.2", u: "pages/changelog.html", k: "更新 日志 版本 记录 changelog" },
  { t: "新行业：IoT/机器人/充电桩/无人机/电动车", d: "智能家居、AGV、充电桩、无人机、电动自行车", u: "pages/industries.html", k: "IoT 机器人 AGV 充电桩 无人机 电动车 滑板车" }
];

function syncSearchActive() {
  var b = document.getElementById("searchResults");
  if (b) document.body.classList.toggle("search-active", !b.hidden);
}

function runSearch() {
  var input = document.getElementById("siteSearch");
  var box = document.getElementById("searchResults");
  if (!input || !box) return;
  var q = input.value.trim().toLowerCase();
  if (!q) {
    box.hidden = true;
    return;
  }
  var hits = SEARCH_INDEX.filter(function (item) {
    return (item.t + " " + item.d + " " + item.k).toLowerCase().indexOf(q) !== -1;
  }).slice(0, 8);

  box.innerHTML = hits.length
    ? hits.map(function (h) {
        return '<a href="' + h.u + '"><span class="t">' + h.t + '</span><span class="d">' + h.d + "</span></a>";
      }).join("")
    : '<div class="empty">没有匹配结果，换个关键词试试（如 爬电、CCC、UN 38.3）。</div>';
  box.hidden = false;
}

var searchInput = document.getElementById("siteSearch");
var searchBox = document.getElementById("searchResults");
if (searchInput && searchBox) {
  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { searchBox.hidden = true; syncSearchActive(); }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".site-search")) { searchBox.hidden = true; syncSearchActive(); }
  });
}

var SEARCH_HISTORY_KEY = "angui-search-history";
function searchGroup(u) {
  if (u.indexOf("pages/tools.html") !== -1) return "工具";
  if (u.indexOf("pages/industries.html") !== -1 || u.indexOf("pages/standards") !== -1 || u.indexOf("pages/voltage.html") !== -1 || u.indexOf("pages/certification.html") !== -1 || u.indexOf("pages/materials.html") !== -1 || u.indexOf("pages/glossary.html") !== -1 || u.indexOf("pages/wizard.html") !== -1 || u.indexOf("pages/refs.html") !== -1 || u.indexOf("pages/verification.html") !== -1 || u.indexOf("pages/feedback.html") !== -1 || u.indexOf("pages/data.html") !== -1) return "参考";
  if (u.indexOf("pages/resources.html") !== -1 || u.indexOf("pages/changelog.html") !== -1) return "资源";
  return "学习";
}
function highlight(text, q) {
  if (!q) return text;
  var i = text.toLowerCase().indexOf(q);
  if (i === -1) return text;
  return text.slice(0, i) + "<mark>" + text.slice(i, i + q.length) + "</mark>" + text.slice(i + q.length);
}
function searchHistory() { try { return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || []; } catch (e) { return []; } }
function saveHistory(q) {
  try {
    var arr = searchHistory().filter(function (x) { return x !== q; });
    arr.unshift(q);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(arr.slice(0, 5)));
  } catch (e) { /* ignore */ }
}
function renderHistory() {
  var box = document.getElementById("searchResults");
  var input = document.getElementById("siteSearch");
  if (!box || !input) return;
  if (input.value.trim()) return;
  var arr = searchHistory();
  if (!arr.length) { box.hidden = true; syncSearchActive(); return; }
  box.innerHTML = '<div class="empty">最近搜索：' + arr.map(function (q) {
    return '<button type="button" class="history-chip" data-q="' + q + '">' + q + "</button>";
  }).join("") + "</div>";
  box.hidden = false;
  syncSearchActive();
}
function runSearch() {
  var input = document.getElementById("siteSearch");
  var box = document.getElementById("searchResults");
  if (!input || !box) return;
  var q = input.value.trim().toLowerCase();
  if (!q) { renderHistory(); return; }
  var hits = SEARCH_INDEX.filter(function (item) {
    return (item.t + " " + item.d + " " + (item.k || "")).toLowerCase().indexOf(q) !== -1;
  }).slice(0, 20);
  var groups = {};
  hits.forEach(function (h) {
    var g = searchGroup(h.u);
    if (!groups[g]) groups[g] = [];
    groups[g].push(h);
  });
  box.innerHTML = hits.length
    ? Object.keys(groups).map(function (g) {
        return '<div class="search-group-title">' + g + "</div>" + groups[g].map(function (h) {
          return '<a href="' + h.u + '"><span class="t">' + highlight(h.t, q) + '</span><span class="d">' + highlight(h.d, q) + "</span></a>";
        }).join("");
      }).join("")
    : '<div class="empty">没有匹配结果，换个关键词试试（如 爬电、CCC、UN 38.3）。</div>';
  box.hidden = false;
  syncSearchActive();
  saveHistory(q);
}
var si2 = document.getElementById("siteSearch");
if (si2) {
  si2.addEventListener("focus", renderHistory);
  document.addEventListener("click", function (e) {
    var chip = e.target.closest ? e.target.closest(".history-chip") : null;
    if (chip && si2) { si2.value = chip.getAttribute("data-q"); runSearch(); }
  });
}
function normSearch(u) {
  var inPages = /\/pages\//.test(location.pathname);
  if (inPages && (u.indexOf("pages/") === 0 || u.indexOf("en/") === 0)) return "../" + u;
  return u;
}
function runSearch() {
  var input = document.getElementById("siteSearch");
  var box = document.getElementById("searchResults");
  if (!input || !box) return;
  var q = input.value.trim().toLowerCase();
  if (!q) { renderHistory(); return; }
  var hits = SEARCH_INDEX.map(function (item) {
    var t = (item.t || "").toLowerCase();
    var d = (item.d || "").toLowerCase();
    var k = (item.k || "").toLowerCase();
    var score = -1;
    if (t === q) score = 0;
    else if (t.indexOf(q) === 0) score = 1;
    else if (t.indexOf(q) !== -1) score = 2;
    else if (d.indexOf(q) !== -1) score = 3;
    else if (k.indexOf(q) !== -1) score = 4;
    if (score < 0) return null;
    return { h: item, score: score };
  }).filter(Boolean)
    .sort(function (a, b) { return a.score - b.score; })
    .slice(0, 20)
    .map(function (x) { return x.h; });
  var groups = {};
  hits.forEach(function (h) {
    var g = searchGroup(h.u);
    if (!groups[g]) groups[g] = [];
    groups[g].push(h);
  });
  box.innerHTML = hits.length
    ? Object.keys(groups).map(function (g) {
        return '<div class="search-group-title">' + g + "</div>" + groups[g].map(function (h) {
          return '<a href="' + normSearch(h.u) + '"><span class="t">' + highlight(h.t, q) + '</span><span class="d">' + highlight(h.d, q) + "</span></a>";
        }).join("");
      }).join("")
    : '<div class="empty">没有匹配结果，换个关键词试试（如 爬电、CCC、UN 38.3）。</div>';
  box.hidden = false;
  syncSearchActive();
  saveHistory(q);
}
