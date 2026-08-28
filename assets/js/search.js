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
  { t: "答题测验", d: "158 题精选 + 自动生成题库，按模块即时切换", u: "pages/quiz.html", k: "测验 quiz 自测 题目" },
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
  { t: "案例库", d: "25 个整改案例，按危害筛选", u: "pages/cases.html", k: "案例 整改 失效 分析 召回" },
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
  { t: "新行业：IoT/机器人/充电桩/无人机/电动车", d: "智能家居、AGV、充电桩、无人机、电动自行车", u: "pages/industries.html", k: "IoT 机器人 AGV 充电桩 无人机 电动车 滑板车" },
  { t: "欧盟 ErP 能效指令专题", d: "ErP 生态设计：30 秒读懂、CE 三张入场券、按产品速查、待机/空载/平均效率数字、65W 演算、合规路径与 FAQ", u: "pages/erp.html", k: "ErP 能效 生态设计 2009/125 2019/1782 2023/826 待机功耗 空载 平均效率 ESPR 数字产品护照 DPP 外部电源 适配器 能效标签 灯具 照明 光源 2019/2020 2019/2015 EPREL LED" },
  { t: "外贸合规速查（业务员版）", d: "10 个目标市场准入速查：需要的认证、周期费用、样机数量与常见坑；RoHS/REACH/WEEE 链接、电池指令（EU 2023/1542 电池护照）与包装指令（PPWR）详解", u: "pages/export-compliance.html", k: "外贸 合规 出口 业务员 市场 认证 周期 费用 样机 CCC CE FCC PSE KC RoHS REACH SVHC WEEE 电池指令 电池法规 2023/1542 电池护照 包装指令 PPWR 包装 环保 EPR" },
  { t: "中国出口数据查询（官方平台 + HS 编码速查）", d: "直达海关统计数据在线查询平台等官方渠道：按 HS 编码 + 目的国查产品出口数量与金额；附 8 大品类 HS 编码速查与三步查询教程", u: "pages/export-data.html", k: "出口 数据 查询 数量 金额 HS 编码 海关 官方 平台 选品 灯具 家电 电池 电源 目的国 贸易" },
  { t: "结构设计安规检查表", d: "6 类 29 项结构自查：可触及/绝缘/防火/机械/距离，可打勾导出", u: "pages/structural-checklist.html", k: "结构 检查表 自查 可触及 绝缘 防火 机械 间距 导出" },
  { t: "电路设计安规检查表", d: "6 类 24 项电路自查：保险丝/隔离/Y电容/限流/泄放，可打勾导出", u: "pages/circuit-checklist.html", k: "电路 检查表 自查 保险丝 隔离 Y电容 限流 泄放 导出" },
  { t: "电源设计安规专题", d: "初次级隔离链路、变压器/Y 电容、浪涌三级防护、保险丝 I²t、宽压设计、隔离 vs 非隔离 LED 驱动选型与常见坑", u: "pages/power-design.html", k: "电源 设计 隔离 非隔离 变压器 Y电容 浪涌 三级防护 保险丝 I2t 宽压 LED 驱动 灯具" },
  { t: "65W 适配器完整计算案例", d: "间隙 4.0 / 爬电 6.4 / 耐压 3000V AC / 保险丝 1.25-1.6A / Y≤3.3nF 八步推导 + 结果汇总", u: "pages/case-65w.html", k: "65W 适配器 计算 案例 间隙 爬电 耐压 保险丝 Y电容 电源" },
  { t: "美标体系 vs CE（UL / FCC / DOE）", d: "美国认证体系（FCC 强制/UL·ETL 市场准入/DOE 能效/加州65）与 CE 的差异：体系哲学、标准对照、120V vs 230V 测试差异、同一产品欧标/美标标准表", u: "pages/us-standards.html", k: "美标 UL ETL FCC DOE NRTL 美国认证 CE 对比 120V 62368 60335 Part15 加州65 标准对照" },
  { t: "CE 六大核心指令（LVD/EMC/RED/MD/RoHS/ErP）", d: "CE 不只是 LVD：低电压、电磁兼容、无线电、机械、有害物质、能效六大指令——范围、适用标准、符合性程序、按产品选型与技术文件全解", u: "pages/ce-directives.html", k: "CE 指令 LVD EMC RED MD RoHS ErP 2014/35 2014/30 2014/53 2006/42 2011/65 2009/125 欧盟 自我声明 公告机构 技术文件 DoC" },
  { t: "PPWR 合规实操知识库", d: "欧盟包装与包装废弃物法规（EU 2025/40）完整知识库：生效时间线、要求分类、豁免判定、模板速查与测验刷题", u: "pages/ppwr.html", k: "PPWR 包装 包装法规 2025/40 94/62 可回收 重复使用 重金属 100mg 豁免 时间线 电商" },
  { t: "可触及性与工具防护（Access）", d: "带电部件不可徒手触及：试指/试具判定、工具打开外壳、用户可拆件与服务件分离", u: "pages/knowledge.html#access", k: "可触及 工具 防护 试指 试具 带电部件 外壳" },
  { t: "产品类别（I / II / III 类）", d: "防触电结构类别：I 类基本绝缘+接地、II 类双重/加强绝缘、III 类 SELV 供电，判定清单与测试重点", u: "pages/knowledge.html#productclass", k: "产品类别 I类 II类 III类 防触电 接地 双重绝缘 SELV 铭牌 回字" },
  { t: "过电压类别（OVC Ⅰ–Ⅳ）", d: "按安装位置分 OVC Ⅰ–Ⅳ：进线/固定/插头/SPD 后，决定冲击耐受与电气间隙查表档位", u: "pages/knowledge.html#ovc", k: "过电压类别 OVC 冲击耐受 安装位置 电气间隙 2500V 4000V 6000V" },
  { t: "额定电压 / 工作电压 / 系统电压", d: "三个电压怎么区分：额定标称、工作电压定爬电、系统电压定间隙，两条查表链别混", u: "pages/knowledge.html#working-voltage", k: "额定电压 工作电压 系统电压 爬电 间隙 电压区分" },
  { t: "防火设计与选材", d: "从起火链到结构落地：识别起火源、断起火链、选材（阻燃/灼热丝/球压联动）", u: "pages/knowledge.html#fire-design", k: "防火设计 起火链 选材 阻燃 V-0 灼热丝 结构" },
  { t: "IK 抗冲击等级", d: "IK01–IK10 冲击能量对照：弹簧冲击锤/摆锤试验机、冲击点选择、试验后复测（IEC 62262）", u: "pages/knowledge.html#ik", k: "IK 抗冲击 冲击等级 IK08 IK10 弹簧锤 摆锤 62262 能量" },
  { t: "环境与可靠性试验", d: "试验总览（低温/高温/温循/湿热/振动/冲击/盐雾/IP）、NSS/ASS/CASS 盐雾三类型、选型与复测规则", u: "pages/knowledge.html#environment", k: "环境试验 可靠性 湿热 温循 振动 盐雾 NSS ASS CASS 跌落 IK 复测" },
  { t: "自由跌落试验（Drop Test）", d: "高度按重量分档、面/棱/角跌落顺序、判定与复测（IEC 60068-2-31、60335 手持 1.0m、包装 ISTA/GB 4857.5）", u: "pages/knowledge.html#drop", k: "跌落 drop 自由跌落 高度 重量 分档 包装 ISTA 手持" },
  { t: "IP/IK 判定工具", d: "IP 防尘防水 + IK 抗冲击等级速查与判定（含 K 系列 IP69K）", u: "pages/tools.html#tool-ik", k: "IP IK 防护等级 判定 工具 IP69K" },
  { t: "IP69K 高温高压防护（K 系列防水）", d: "IPX4K/6K/9K：加压摆管、高速水流、80°C 100bar 高温高压清洗（ISO 20653 / DIN 40050-9），食品/制药行业", u: "pages/knowledge.html#ip", k: "IP69K IPX9K IPX6K IPX4K 高温高压 清洗 食品 制药 ISO20653 DIN40050-9 防护等级" },
  { t: "技术文件模板（CDF/DoC/铭牌）", d: "CDF 关键元器件清单可编辑（增删行/导出 CSV/自动保存）、CE DoC 符合性声明、铭牌实时预览、送样与技术文件包清单，可打印", u: "pages/templates.html", k: "模板 CDF DoC 符合性声明 铭牌 技术文件 送样 清单 打印 关键元器件 编辑" },
  /* ---- 测试 SOP（62 项，批量） ---- */
  { t: "测试中心（测试与 SOP 入口）", d: "测试中心：执行用 SOP、计划用可靠性中心、工具用计算器", u: "pages/testing.html", k: "测试中心 测试 SOP 入口" },
  { t: "可靠性测试计划中心", d: "按行业筛选 + 按测试类别归类的可靠性试验计划", u: "pages/reliability.html", k: "可靠性 测试计划 中心 试验" },
  { t: "测试设备与工具", d: "安规与可靠性测试所需设备清单与选型参考", u: "pages/test-equipment.html", k: "测试设备 工具 选型" },
  { t: "产品品类安规知识库", d: "九大品类的标准、测试、设计重点与认证路径", u: "pages/product-categories.html", k: "产品品类 品类 知识库 家电 灯具 电源" },
  { t: "绝缘配合指南", d: "工作电压到污染到CTI材料组到爬电；系统电压到OVC到冲击到间隙到海拔", u: "pages/insulation-guide.html", k: "绝缘配合 指南 污染等级 材料组 CTI 海拔" },
  { t: "标准差异矩阵（IEC 与 GB 对比）", d: "不同标准体系条款差异对比，转证与国家差异核对", u: "pages/standard-diffs.html", k: "标准差异 矩阵 IEC GB 对比 转证" },
  { t: "球压试验（测试 SOP）", d: "验证非金属材料在高温下不过度变形，防止带电件位移和间距减小。", u: "pages/sop-ball-pressure.html", k: "球压试验 SOP 验证非金属材料在高温下不过度变形，防止带电件位移和间距减小。" },
  { t: "电池跌落（测试 SOP）", d: "按标准执行电池跌落，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-battery-drop.html", k: "电池跌落 SOP 按标准执行电池跌落，验证产品在对应条件下满足安全/性能要求。" },
  { t: "电池外部短路测试（测试 SOP）", d: "验证电池在外部短路时不起火、不爆炸、不泄漏。", u: "pages/sop-battery-short.html", k: "电池外部短路测试 SOP 验证电池在外部短路时不起火、不爆炸、不泄漏。" },
  { t: "过充 / 过放（测试 SOP）", d: "按标准执行过充 / 过放，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-charge-discharge.html", k: "过充 / 过放 SOP 按标准执行过充 / 过放，验证产品在对应条件下满足安全/性能" },
  { t: "低温试验（测试 SOP）", d: "按标准执行低温试验，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-cold.html", k: "低温试验 SOP 按标准执行低温试验，验证产品在对应条件下满足安全/性能要求。" },
  { t: "传导发射（测试 SOP）", d: "按标准执行传导发射，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-conducted-emission.html", k: "传导发射 SOP 按标准执行传导发射，验证产品在对应条件下满足安全/性能要求。" },
  { t: "射频传导抗扰（测试 SOP）", d: "按标准执行射频传导抗扰，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-conducted-immunity.html", k: "射频传导抗扰 SOP 按标准执行射频传导抗扰，验证产品在对应条件下满足安全/性能要" },
  { t: "挤压（测试 SOP）", d: "按标准执行挤压，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-crush.html", k: "挤压 SOP 按标准执行挤压，验证产品在对应条件下满足安全/性能要求。" },
  { t: "CTI / PTI 漏电起痕（测试 SOP）", d: "按标准执行CTI / PTI 漏电起痕，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-cti-test.html", k: "CTI / PTI 漏电起痕 SOP 按标准执行CTI / PTI 漏电起痕，验证产品在对应条件下" },
  { t: "网络安全（测试 SOP）", d: "按标准执行网络安全，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-cybersecurity.html", k: "网络安全 SOP 按标准执行网络安全，验证产品在对应条件下满足安全/性能要求。" },
  { t: "交变湿热（测试 SOP）", d: "按标准执行交变湿热，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-damp-heat-cyclic.html", k: "交变湿热 SOP 按标准执行交变湿热，验证产品在对应条件下满足安全/性能要求。" },
  { t: "稳态湿热（测试 SOP）", d: "按标准执行稳态湿热，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-damp-heat-steady.html", k: "稳态湿热 SOP 按标准执行稳态湿热，验证产品在对应条件下满足安全/性能要求。" },
  { t: "电压暂降 / 短时中断（测试 SOP）", d: "按标准执行电压暂降 / 短时中断，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-dips.html", k: "电压暂降 / 短时中断 SOP 按标准执行电压暂降 / 短时中断，验证产品在对应条件下满足安" },
  { t: "自由跌落（测试 SOP）", d: "按标准执行自由跌落，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-drop.html", k: "自由跌落 SOP 按标准执行自由跌落，验证产品在对应条件下满足安全/性能要求。" },
  { t: "高温试验（测试 SOP）", d: "按标准执行高温试验，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-dry-heat.html", k: "高温试验 SOP 按标准执行高温试验，验证产品在对应条件下满足安全/性能要求。" },
  { t: "EFT / 电快速瞬变（测试 SOP）", d: "按标准执行EFT / 电快速瞬变，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-eft.html", k: "EFT / 电快速瞬变 SOP 按标准执行EFT / 电快速瞬变，验证产品在对应条件下满足安" },
  { t: "老化 / 耐久（测试 SOP）", d: "按标准执行老化 / 耐久，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-endurance.html", k: "老化 / 耐久 SOP 按标准执行老化 / 耐久，验证产品在对应条件下满足安全/性能" },
  { t: "静电放电抗扰度测试（ESD）（测试 SOP）", d: "验证设备对接触和空气放电的耐受能力。", u: "pages/sop-esd.html", k: "静电放电抗扰度测试（ESD） SOP 验证设备对接触和空气放电的耐受能力。" },
  { t: "强制放电（测试 SOP）", d: "按标准执行强制放电，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-forced-discharge.html", k: "强制放电 SOP 按标准执行强制放电，验证产品在对应条件下满足安全/性能要求。" },
  { t: "功能安全验证（测试 SOP）", d: "按标准执行功能安全验证，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-functional-safety.html", k: "功能安全验证 SOP 按标准执行功能安全验证，验证产品在对应条件下满足安全/性能要" },
  { t: "灼热丝试验（GWT）（测试 SOP）", d: "模拟接触不良、过载等局部高温，验证材料自熄且不滴落引燃。", u: "pages/sop-glow-wire.html", k: "灼热丝试验（GWT） SOP 模拟接触不良、过载等局部高温，验证材料自熄且不滴落引燃。" },
  { t: "接地连续性 / 接地阻抗测试（测试 SOP）", d: "验证 I 类产品保护接地回路低阻、连续、可靠。", u: "pages/sop-grounding.html", k: "接地连续性 / 接地阻抗测试 SOP 验证 I 类产品保护接地回路低阻、连续、可靠。" },
  { t: "灼热丝起燃温度（GWIT）（测试 SOP）", d: "按标准执行灼热丝起燃温度（GWIT），验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-gwit.html", k: "灼热丝起燃温度（GWIT） SOP 按标准执行灼热丝起燃温度（GWIT），验证产品在对应条件下满" },
  { t: "HAI 高电流电弧引燃（测试 SOP）", d: "按标准执行HAI 高电流电弧引燃，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-hai.html", k: "HAI 高电流电弧引燃 SOP 按标准执行HAI 高电流电弧引燃，验证产品在对应条件下满足安" },
  { t: "谐波 / 闪烁（测试 SOP）", d: "按标准执行谐波 / 闪烁，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-harmonic-flicker.html", k: "谐波 / 闪烁 SOP 按标准执行谐波 / 闪烁，验证产品在对应条件下满足安全/性能" },
  { t: "过温（测试 SOP）", d: "按标准执行过温，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-high-temp-battery.html", k: "过温 SOP 按标准执行过温，验证产品在对应条件下满足安全/性能要求。" },
  { t: "耐压 / 介电强度测试（测试 SOP）", d: "验证绝缘系统在规定的试验电压下不发生击穿或闪络。", u: "pages/sop-hipot.html", k: "耐压 / 介电强度测试 SOP 验证绝缘系统在规定的试验电压下不发生击穿或闪络。" },
  { t: "HWI 热丝引燃（测试 SOP）", d: "按标准执行HWI 热丝引燃，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-hwi.html", k: "HWI 热丝引燃 SOP 按标准执行HWI 热丝引燃，验证产品在对应条件下满足安全/性" },
  { t: "IK 冲击试验（测试 SOP）", d: "验证外壳抵抗外部机械冲击的能力。", u: "pages/sop-ik.html", k: "IK 冲击试验 SOP 验证外壳抵抗外部机械冲击的能力。" },
  { t: "撞击 / 针刺（测试 SOP）", d: "按标准执行撞击 / 针刺，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-impact-puncture.html", k: "撞击 / 针刺 SOP 按标准执行撞击 / 针刺，验证产品在对应条件下满足安全/性能" },
  { t: "绝缘涂层验证（测试 SOP）", d: "按标准执行绝缘涂层验证，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-insulation-coating.html", k: "绝缘涂层验证 SOP 按标准执行绝缘涂层验证，验证产品在对应条件下满足安全/性能要" },
  { t: "绝缘电阻测试（测试 SOP）", d: "验证绝缘在直流电压下保持足够的电阻，间接反映绝缘受潮或老化状态。", u: "pages/sop-insulation-resistance.html", k: "绝缘电阻测试 SOP 验证绝缘在直流电压下保持足够的电阻，间接反映绝缘受潮或老化状" },
  { t: "IP 防尘 / 防水试验（测试 SOP）", d: "验证外壳对固体异物和水的防护能力。", u: "pages/sop-ip.html", k: "IP 防尘 / 防水试验 SOP 验证外壳对固体异物和水的防护能力。" },
  { t: "泄漏 / 接触电流测试（测试 SOP）", d: "验证正常工作和单一故障条件下，流过人体接触路径的电流不超过安全限值。", u: "pages/sop-leakage.html", k: "泄漏 / 接触电流测试 SOP 验证正常工作和单一故障条件下，流过人体接触路径的电流不超过安" },
  { t: "机械强度（推力/拉力）（测试 SOP）", d: "按标准执行机械强度（推力/拉力），验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-mechanical-strength.html", k: "机械强度（推力/拉力） SOP 按标准执行机械强度（推力/拉力），验证产品在对应条件下满足安" },
  { t: "针焰试验（测试 SOP）", d: "模拟小火焰引燃后材料不持续燃烧、不蔓延。", u: "pages/sop-needle-flame.html", k: "针焰试验 SOP 模拟小火焰引燃后材料不持续燃烧、不蔓延。" },
  { t: "噪声（测试 SOP）", d: "按标准执行噪声，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-noise.html", k: "噪声 SOP 按标准执行噪声，验证产品在对应条件下满足安全/性能要求。" },
  { t: "光生物安全（测试 SOP）", d: "按标准执行光生物安全，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-photobiological.html", k: "光生物安全 SOP 按标准执行光生物安全，验证产品在对应条件下满足安全/性能要求" },
  { t: "振动/冲击后安规复测（测试 SOP）", d: "按标准执行振动/冲击后安规复测，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-post-env-safety.html", k: "振动/冲击后安规复测 SOP 按标准执行振动/冲击后安规复测，验证产品在对应条件下满足安全" },
  { t: "工频磁场（测试 SOP）", d: "按标准执行工频磁场，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-power-frequency-field.html", k: "工频磁场 SOP 按标准执行工频磁场，验证产品在对应条件下满足安全/性能要求。" },
  { t: "保护阻抗 / 限流元件（测试 SOP）", d: "按标准执行保护阻抗 / 限流元件，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-protective-impedance.html", k: "保护阻抗 / 限流元件 SOP 按标准执行保护阻抗 / 限流元件，验证产品在对应条件下满足安" },
  { t: "辐射发射（测试 SOP）", d: "按标准执行辐射发射，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-radiated-emission.html", k: "辐射发射 SOP 按标准执行辐射发射，验证产品在对应条件下满足安全/性能要求。" },
  { t: "射频辐射抗扰（测试 SOP）", d: "按标准执行射频辐射抗扰，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-radiated-immunity.html", k: "射频辐射抗扰 SOP 按标准执行射频辐射抗扰，验证产品在对应条件下满足安全/性能要" },
  { t: "残余电压 / 插头放电（测试 SOP）", d: "按标准执行残余电压 / 插头放电，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-residual-voltage.html", k: "残余电压 / 插头放电 SOP 按标准执行残余电压 / 插头放电，验证产品在对应条件下满足安" },
  { t: "RTI 长期热老化（测试 SOP）", d: "按标准执行RTI 长期热老化，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-rti.html", k: "RTI 长期热老化 SOP 按标准执行RTI 长期热老化，验证产品在对应条件下满足安全/" },
  { t: "盐雾（测试 SOP）", d: "按标准执行盐雾，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-salt-mist.html", k: "盐雾 SOP 按标准执行盐雾，验证产品在对应条件下满足安全/性能要求。" },
  { t: "SAR 射频暴露（测试 SOP）", d: "按标准执行SAR 射频暴露，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-sar.html", k: "SAR 射频暴露 SOP 按标准执行SAR 射频暴露，验证产品在对应条件下满足安全/性" },
  { t: "机械冲击（测试 SOP）", d: "按标准执行机械冲击，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-shock.html", k: "机械冲击 SOP 按标准执行机械冲击，验证产品在对应条件下满足安全/性能要求。" },
  { t: "爬电 / 电气间隙测量（测试 SOP）", d: "确认带电部件之间、带电与可触及部件之间的空气距离和表面距离满足标准。", u: "pages/sop-spacing.html", k: "爬电 / 电气间隙测量 SOP 确认带电部件之间、带电与可触及部件之间的空气距离和表面距离满" },
  { t: "稳定性 / 倾倒（测试 SOP）", d: "按标准执行稳定性 / 倾倒，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-stability.html", k: "稳定性 / 倾倒 SOP 按标准执行稳定性 / 倾倒，验证产品在对应条件下满足安全/性" },
  { t: "浪涌抗扰度测试（测试 SOP）", d: "验证设备在雷击/电网浪涌下性能不降级或能自恢复。", u: "pages/sop-surge.html", k: "浪涌抗扰度测试 SOP 验证设备在雷击/电网浪涌下性能不降级或能自恢复。" },
  { t: "温度循环 / 温度冲击（测试 SOP）", d: "按标准执行温度循环 / 温度冲击，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-temp-cycling.html", k: "温度循环 / 温度冲击 SOP 按标准执行温度循环 / 温度冲击，验证产品在对应条件下满足安" },
  { t: "高低温工作（测试 SOP）", d: "按标准执行高低温工作，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-temperature-operation.html", k: "高低温工作 SOP 按标准执行高低温工作，验证产品在对应条件下满足安全/性能要求" },
  { t: "温升测试（测试 SOP）", d: "验证产品在额定和异常负载下，各部件温升不超过材料与安全限值。", u: "pages/sop-temperature-rise.html", k: "温升测试 SOP 验证产品在额定和异常负载下，各部件温升不超过材料与安全限值。" },
  { t: "热失控扩散（测试 SOP）", d: "按标准执行热失控扩散，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-thermal-runaway.html", k: "热失控扩散 SOP 按标准执行热失控扩散，验证产品在对应条件下满足安全/性能要求" },
  { t: "热冲击（测试 SOP）", d: "按标准执行热冲击，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-thermal-shock-battery.html", k: "热冲击 SOP 按标准执行热冲击，验证产品在对应条件下满足安全/性能要求。" },
  { t: "5VA / 5VB 燃烧（测试 SOP）", d: "按标准执行5VA / 5VB 燃烧，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-ul94-5v.html", k: "5VA / 5VB 燃烧 SOP 按标准执行5VA / 5VB 燃烧，验证产品在对应条件下满足" },
  { t: "UL 94 垂直 / 水平燃烧试验（测试 SOP）", d: "评价塑料材料在标准火焰下的燃烧、自熄和滴落行为。", u: "pages/sop-ul94.html", k: "UL 94 垂直 / 水平燃烧试验 SOP 评价塑料材料在标准火焰下的燃烧、自熄和滴落行为。" },
  { t: "UN 38.3 全套（测试 SOP）", d: "按标准执行UN 38.3 全套，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-un383.html", k: "UN 38.3 全套 SOP 按标准执行UN 38.3 全套，验证产品在对应条件下满足安全" },
  { t: "随机振动（测试 SOP）", d: "按标准执行随机振动，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-vibration-random.html", k: "随机振动 SOP 按标准执行随机振动，验证产品在对应条件下满足安全/性能要求。" },
  { t: "正弦振动（测试 SOP）", d: "按标准执行正弦振动，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-vibration-sine.html", k: "正弦振动 SOP 按标准执行正弦振动，验证产品在对应条件下满足安全/性能要求。" },
  { t: "线材 VW-1 / FT1（测试 SOP）", d: "按标准执行线材 VW-1 / FT1，验证产品在对应条件下满足安全/性能要求。", u: "pages/sop-wire-flame.html", k: "线材 VW-1 / FT1 SOP 按标准执行线材 VW-1 / FT1，验证产品在对应条件下满" },
];;

function syncSearchActive() {
  var b = document.getElementById("searchResults");
  if (b) document.body.classList.toggle("search-active", !b.hidden);
}

var searchInput = document.getElementById("siteSearch");
var searchBox = document.getElementById("searchResults");
if (searchInput && searchBox) {
  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { searchBox.hidden = true; syncSearchActive(); }
    if (e.key === "Enter") { var v = searchInput.value.trim(); if (v) saveHistory(v); }
  });
  document.addEventListener("click", function (e) {
    var hit = e.target.closest ? e.target.closest(".search-results a") : null;
    if (hit) { var v = searchInput.value.trim(); if (v) saveHistory(v); }
    if (!e.target.closest(".site-search")) { searchBox.hidden = true; syncSearchActive(); }
  });
}

var SEARCH_HISTORY_KEY = "angui-search-history";
function searchGroup(u) {
  if (u.indexOf("pages/tools.html") !== -1) return "工具";
  if (u.indexOf("pages/industries.html") !== -1 || u.indexOf("pages/standards") !== -1 || u.indexOf("pages/voltage.html") !== -1 || u.indexOf("pages/certification.html") !== -1 || u.indexOf("pages/materials.html") !== -1 || u.indexOf("pages/glossary.html") !== -1 || u.indexOf("pages/wizard.html") !== -1 || u.indexOf("pages/refs.html") !== -1 || u.indexOf("pages/verification.html") !== -1 || u.indexOf("pages/feedback.html") !== -1 || u.indexOf("pages/data.html") !== -1 || u.indexOf("pages/erp.html") !== -1 || u.indexOf("pages/export-data.html") !== -1 || u.indexOf("pages/export-compliance.html") !== -1 || u.indexOf("pages/templates.html") !== -1 || u.indexOf("pages/labels.html") !== -1) return "认证 / 参考";
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
}