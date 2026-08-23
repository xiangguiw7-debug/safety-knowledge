/* 出口数据速查（业务员/选品用）
 * 数据为「教学参考量级 + 常见热门市场排名」，非精确海关统计；
 * 正式选品/报价请以海关总署实时出口数据与目标市场法规为准。
 */
var EXPORT_DATA = {
  disclaimer: "教学参考：金额为常见公开报道的量级，市场排名为近年常见口径；正式数据请查海关总署 / 关务平台实时统计。",
  categories: [
    {
      id: "lighting", name: "LED 灯具 / 照明装置", icon: "💡", hs: "HS 9405",
      scale: "年出口金额数百亿美元量级（照明装置整体）",
      markets: [
        { m: "美国", note: "家居/商业照明最大单一市场，渠道认 UL/ETL、DLC" },
        { m: "德国", note: "欧盟能效最严市场：CE + ErP + 能效标签" },
        { m: "荷兰", note: "欧洲转口枢纽，订单常发往全欧" },
        { m: "英国", note: "UKCA/CE 双轨期，能效标签沿用" },
        { m: "阿联酋", note: "中东工程照明（酒店/商场）采购集中地" }
      ],
      compliance: "UL/ETL + DLC（美）、CE（LVD+EMC）+ ErP 能效（欧）、SASO（沙特）",
      tip: "LED 球泡/筒灯/面板灯走欧美家居渠道；路灯/投光灯走中东、拉美工程渠道——两类市场的认证组合完全不同。",
      cert: "erp.html#lighting-erp"
    },
    {
      id: "consumer", name: "消费电子（手机/耳机）", icon: "📱", hs: "HS 8517 / 8518",
      scale: "手机千亿美元量级；TWS 耳机数百亿美元量级",
      markets: [
        { m: "美国", note: "品牌+白牌耳机/配件走线上平台" },
        { m: "荷兰", note: "欧洲电商集散中心" },
        { m: "日本", note: "对品质与认证要求高（PSE）" },
        { m: "印度", note: "关税与本地化组装政策影响大" },
        { m: "阿联酋", note: "转口中东非洲" }
      ],
      compliance: "FCC（美）、CE（RED）+ RoHS/REACH（欧）、PSE（日）、BIS（印）",
      tip: "蓝牙产品出口欧盟走 RED 指令；电池内置件另需 UN 38.3 与电池安规。",
      cert: "export-compliance.html"
    },
    {
      id: "appliance", name: "家用电器", icon: "🏠", hs: "HS 8508 / 8509 / 8516",
      scale: "数百亿美元量级（吸尘器/电热器具/厨房小电）",
      markets: [
        { m: "美国", note: "小家电走大卖场与线上，UL/ETL 常见" },
        { m: "德国", note: "GS 标志加分，能效要求严" },
        { m: "英国", note: "UKCA/CE 双轨" },
        { m: "俄罗斯", note: "EAC 认证（欧亚经济联盟）" },
        { m: "越南", note: "东南亚组装与本地消费并重" }
      ],
      compliance: "UL/ETL（美）、CE + ErP（欧）、EAC（俄/中亚）、SASO（沙特）",
      tip: "小家电的能效（待机/额定功耗）与安规（防触电/温升/防火）要一起规划，别等出货前才发现漏项。",
      cert: "erp.html"
    },
    {
      id: "power", name: "电源 / 适配器 / 充电器", icon: "🔌", hs: "HS 8504",
      scale: "数百亿美元量级（含电源适配器与充电器）",
      markets: [
        { m: "美国", note: "DOE VI 能效是硬门槛，UL/ETL 常见" },
        { m: "德国", note: "CE + ErP 外部电源法规" },
        { m: "荷兰", note: "欧洲分拨中心" },
        { m: "日本", note: "PSE 圆形/菱形标志" },
        { m: "印度", note: "BIS 注册，市场增长快" }
      ],
      compliance: "UL/ETL + DOE VI（美）、CE（LVD+EMC）+ ErP 2019/1782（欧）、PSE（日）、BIS（印）",
      tip: "适配器是 ErP 外部电源法规直接覆盖品类：空载 ≤0.1W、四档负载平均效率要提前设计进去。",
      cert: "erp.html"
    },
    {
      id: "battery", name: "锂离子电池", icon: "🔋", hs: "HS 8507",
      scale: "千亿美元量级（全球动力+消费电池；中国出口数百亿美元量级）",
      markets: [
        { m: "美国", note: "储能/消费电池需求大，UL 1642/UL 2054 常见" },
        { m: "韩国", note: "动力电池供应链枢纽" },
        { m: "德国", note: "欧盟新电池法规（2023/1542）+ 数字护照试点" },
        { m: "越南", note: "组装转移目的地" },
        { m: "印度", note: "本地化制造政策推进中" }
      ],
      compliance: "UN 38.3（运输）+ IEC 62133/GB 31241 + 欧盟电池法规 2023/1542 + 数字产品护照（未来）",
      tip: "电池出口三件事：UN 38.3 运输报告、产品安全标准、回收与护照信息——欧盟新电池法规是 2025 年后的重点。",
      cert: "export-compliance.html"
    },
    {
      id: "tools", name: "电动工具", icon: "🔧", hs: "HS 8467",
      scale: "数百亿美元量级（含锂电工具）",
      markets: [
        { m: "美国", note: "DIY+专业渠道并存，UL/CSA 常见" },
        { m: "德国", note: "GS + CE，欧洲最严格市场之一" },
        { m: "澳大利亚", note: "RCM 认证" },
        { m: "英国", note: "UKCA/CE 双轨" },
        { m: "巴西", note: "INMETRO 认证，增长快" }
      ],
      compliance: "UL/CSA（美）、CE（机械+EMC+RED 无线部分）（欧）、RCM（澳）、INMETRO（巴）",
      tip: "电动工具涉及机械安全（ISO 12100 风险）、电池安全与无线（蓝牙）RED——认证组合比纯电器复杂。",
      cert: "export-compliance.html"
    },
    {
      id: "camera", name: "安防监控摄像头", icon: "📷", hs: "HS 8525（以实际归类为准）",
      scale: "数百亿美元量级（安防设备整体）",
      markets: [
        { m: "美国", note: "家庭安防量大，FCC/UL 常见，注意网络与数据法规" },
        { m: "巴西", note: "安防需求快速增长" },
        { m: "阿联酋", note: "中东工程安防集中采购" },
        { m: "德国", note: "数据隐私（GDPR）与网络安全要求" },
        { m: "英国", note: "UKCA 与网络安全（PSTI）" }
      ],
      compliance: "FCC（美）、CE（RED）+ 网络安全 EN 303 645 / CRA（欧）、INMETRO（巴）",
      tip: "智能摄像头出口欧盟，2024 年起网络安全（CRA/EN 303 645）是新增重点，和安规一起做更划算。",
      cert: "export-compliance.html"
    },
    {
      id: "auto", name: "汽车零部件", icon: "🚗", hs: "HS 8708",
      scale: "千亿美元量级（汽车零部件整体）",
      markets: [
        { m: "美国", note: "售后市场大，SAE/UL 等标准常见" },
        { m: "墨西哥", note: "北美组装配套，近岸转移受益" },
        { m: "日本", note: "配套体系严格，供应商认证门槛高" },
        { m: "德国", note: "Tier1 配套，IATF 16949 常见" },
        { m: "泰国", note: "东南亚汽车组装中心" }
      ],
      compliance: "目标主机厂规范 + IATF 16949 + 电磁兼容（ISO 7637/16750 抛负载等）",
      tip: "车规件的门槛不在认证而在体系（IATF）与 EMC 波形要求（抛负载/瞬态），先确认目标客户规范再谈认证。",
      cert: "industries.html"
    }
  ]
};
