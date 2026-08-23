/* 出口数据查询辅助（HS 编码速查 + 官方平台指引）
 * 实时出口数量/金额请到官方平台查询（海关统计数据在线查询平台等），本站不提供实时数据。
 */
var EXPORT_DATA = {
  channels: [
    { name: "海关统计数据在线查询平台", url: "https://stats.customs.gov.cn", icon: "🏛️", desc: "海关总署官方统计查询：按 HS 编码 + 贸易伙伴国 + 时间范围，查出口数量与金额（人民币/美元），免费免登录（部分功能需注册）。查出口数量/金额的第一入口。", tag: "官方 · 免费" },
    { name: "海关总署官网 · 统计数据", url: "https://www.customs.gov.cn", icon: "📊", desc: "首页「统计数据」栏目发布月度/年度进出口统计快报与月报，可下载 PDF/Excel 原文。", tag: "官方" },
    { name: "ITC Trade Map", url: "https://www.trademap.org", icon: "🌐", desc: "联合国 ITC 免费贸易统计：全球视角看中国出口到各国某品类的数量/金额/占比，适合横向比市场。", tag: "国际 · 免费" },
    { name: "UN Comtrade", url: "https://comtradeplus.un.org", icon: "📦", desc: "联合国商品贸易统计库：按 HS 6 位编码查双边贸易量额，可导出数据做分析。", tag: "国际 · 免费" },
    { name: "中国国际贸易单一窗口", url: "https://www.singlewindow.cn", icon: "🧾", desc: "企业报关与关务数据平台（需企业账号），可查本企业历史报关的品类与数量。", tag: "企业账号" },
    { name: "中国贸易救济信息网", url: "https://cacs.mofcom.gov.cn", icon: "🛡️", desc: "商务部下属：贸易救济（反倾销/反补贴）动态与部分贸易数据，出口受限品类先看这里。", tag: "官方" }
  ],
  categories: [
    { id: "lighting", name: "LED 灯具 / 照明装置", icon: "💡", hs: "HS 9405", markets: "美国 / 德国 / 荷兰 / 阿联酋 / 越南", compliance: "UL/ETL + DLC（美）、CE（LVD+EMC）+ ErP 能效（欧）、SASO（沙特）", tip: "LED 球泡/筒灯走欧美家居渠道，路灯/投光灯走中东、拉美工程渠道——两类渠道认证组合不同。", cert: "erp.html#lighting-erp" },
    { id: "consumer", name: "消费电子（手机/耳机）", icon: "📱", hs: "HS 8517 / 8518", markets: "美国 / 荷兰 / 日本 / 印度 / 阿联酋", compliance: "FCC（美）、CE（RED）+ RoHS/REACH（欧）、PSE（日）、BIS（印）", tip: "蓝牙产品出口欧盟走 RED 指令；内置电池另需 UN 38.3 与电池安规。", cert: "export-compliance.html" },
    { id: "appliance", name: "家用电器", icon: "🏠", hs: "HS 8508 / 8509 / 8516", markets: "美国 / 德国 / 英国 / 俄罗斯 / 越南", compliance: "UL/ETL（美）、CE + ErP（欧）、EAC（俄/中亚）、SASO（沙特）", tip: "小家电能效（待机/额定功耗）与安规（防触电/温升/防火）一起规划。", cert: "erp.html" },
    { id: "power", name: "电源 / 适配器 / 充电器", icon: "🔌", hs: "HS 8504", markets: "美国 / 德国 / 荷兰 / 日本 / 印度", compliance: "UL/ETL + DOE VI（美）、CE + ErP 2019/1782（欧）、PSE（日）、BIS（印）", tip: "适配器是 ErP 外部电源法规直接覆盖品类：空载 ≤0.1W、四档负载平均效率要提前设计。", cert: "erp.html" },
    { id: "battery", name: "锂离子电池", icon: "🔋", hs: "HS 8507", markets: "美国 / 韩国 / 德国 / 越南 / 印度", compliance: "UN 38.3（运输）+ IEC 62133/GB 31241 + 欧盟电池法规 2023/1542 + 数字产品护照（未来）", tip: "电池出口三件事：UN 38.3 运输报告、产品安全标准、回收与护照信息。", cert: "export-compliance.html" },
    { id: "tools", name: "电动工具", icon: "🔧", hs: "HS 8467", markets: "美国 / 德国 / 澳大利亚 / 英国 / 巴西", compliance: "UL/CSA（美）、CE（机械+EMC+RED）（欧）、RCM（澳）、INMETRO（巴）", tip: "电动工具涉及机械安全、电池安全与无线（蓝牙）RED，认证组合比纯电器复杂。", cert: "export-compliance.html" },
    { id: "camera", name: "安防监控摄像头", icon: "📷", hs: "HS 8525（以实际归类为准）", markets: "美国 / 巴西 / 阿联酋 / 德国 / 英国", compliance: "FCC（美）、CE（RED）+ 网络安全 EN 303 645 / CRA（欧）、INMETRO（巴）", tip: "智能摄像头出口欧盟，2024 年起网络安全（CRA/EN 303 645）是新增重点。", cert: "export-compliance.html" },
    { id: "auto", name: "汽车零部件", icon: "🚗", hs: "HS 8708", markets: "美国 / 墨西哥 / 日本 / 德国 / 泰国", compliance: "目标主机厂规范 + IATF 16949 + 电磁兼容（ISO 7637/16750）", tip: "车规件门槛在体系（IATF）与 EMC 波形要求（抛负载/瞬态），先确认目标客户规范。", cert: "industries.html" }
  ]
};
