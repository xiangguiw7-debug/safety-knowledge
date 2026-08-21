# 安规与可靠性知识课堂

面向电气电子工程师的**安规（电气安全）与可靠性**教学网站（纯静态、零构建、离线可用）。
按「危害」学安规、按「标准」做测试、按「行业」看可靠性，从概念、查表、计算到测试 SOP 与认证路径一条线串起来。

在线演示：<https://xiangguiw7-debug.github.io/safety-knowledge/>

## ✨ 功能一览

- **知识体系**：七大安全因素（防电击 / 能量 / 防火 / 热量 / 机械 / 辐射 / 化学）+ EMC、医疗、认证流程、通用环境等 12 个分组，共 **32 张知识卡**（每张含规则、误区、标准依据、知识链路与上一张/下一张导航）
- **四大核心章节**：电气间隙、爬电距离、雷击浪涌、耐压测试（含查表全流程与示例）
- **计算工具 37 个**：间距/耐压/泄漏/放电/温升/保险丝/防火三件套/电池/EMC 波形/IP·IK·跌落等，支持场景预设、反查模式与深链直达（`#tool-xxx` 自动定位）
- **行业筛选 27 个行业**：标准、必学模块、典型测试、常见坑，与知识卡/工具联动
- **答题测验**：`自测`（158 道精选 + 自动生成题库、错题本、掌握度统计）与 `🧠 费曼学习法`（抽卡 → 自己讲 → 对照找卡壳点 → 复盘保存，支持复习对比）
- **测试 SOP 62 份**：设备、环境、步骤、判定、记录表，可打印
- **认证与标准**：全球认证速查（地图）、认证向导、标准差异矩阵、66 个标准官方入口、全球电压速查
- **体验**：深色/浅色主题、全站搜索、学习进度、术语悬停、项目工坊、打印/导出、PWA 离线
- **返回友好**：全局「← 返回上一页」按钮；认证向导 / 项目工坊 / 标准对比 / 计算工具 / 费曼模式在跳转后自动恢复进度

## 📁 目录结构

```text
safety-knowledge/
├─ index.html                # 首页（七大安全因素 + 快速入口）
├─ pages/                    # 120+ 页面：章节、深度页、工具、SOP、案例等
│  ├─ knowledge.html         # 知识卡片库（12 组，可筛选/搜索）
│  ├─ quiz.html              # 答题测验（自测 + 费曼学习法）
│  ├─ tools.html             # 计算与速查工具（37 个）
│  ├─ learn.html             # 学习地图
│  ├─ sop-*.html             # 62 份测试 SOP
│  └─ ...
├─ en/                       # 英文核心速览
├─ assets/
│  ├─ css/                   # style.css（全局，含深色主题）、calculator.css 等
│  ├─ js/                    # 页面脚本与数据（知识卡/行业/题库/SOP 等）
│  ├─ lib/                   # Leaflet、three.js、topojson（已本地化）
│  └─ icons/                 # PWA 图标与 Logo
├─ scripts/check-links.js    # 全站链接/锚点检查（CI 使用）
├─ sw.js                     # Service Worker（PWA 离线缓存）
├─ manifest.webmanifest      # PWA 清单
├─ sitemap.xml / robots.txt  # SEO
└─ start.ps1                 # 一键启动本地服务器
```

## 🚀 运行方式

零构建、零依赖，任选其一：

- 直接双击 `index.html` 浏览（PWA 离线功能在 `file://` 下不生效）；
- 推荐本地服务器（PWA 完整可用）：

```powershell
python -m http.server 8000
# 或双击 start.ps1
```

然后访问 <http://127.0.0.1:8000>。

## 🌍 部署到 GitHub Pages

项目使用**相对路径**，且已含 `.nojekyll`，可直接部署：

1. 推送后，仓库 Settings → Pages → Source 选择分支/目录（或使用 Actions 工作流）；
2. 部署地址形如 `https://<用户名>.github.io/<仓库名>/`；
3. 上线前把 `sitemap.xml` / `robots.txt` 中的域名改成实际地址；
4. **每次发布记得升级 `sw.js` 顶部的 `CACHE_NAME` 版本号**，否则用户会拿到旧缓存。

## 📲 手机与电脑同步

学习进度、错题、笔记、费曼记录等保存在浏览器本地（localStorage），不同设备间默认不同步。要同步：

1. 打开「数据备份」页（`pages/data.html`）；
2. 设备 A：**导出**（下载 JSON 文件，或复制文本）；
3. 设备 B：**导入**（选择文件，或粘贴文本）；
4. 导入采用**合并策略**：按数据类型合并、去重，不会覆盖另一台的已有记录。

把 JSON 文本经微信「文件传输助手」/QQ 等传给自己即可在两台设备间转移。

## ⚠️ 内容与免责声明

- 本站所有数值与表格均为**简化教学参考**，与 IEC 60664-1 / IEC 62368-1 / IEC 60335-1 / IEC 60601-1 等标准的查表逻辑一致，但**不能替代标准原文**；
- 正式产品设计、测试与认证，请以最新版标准原文与实验室能力为准；
- 每个教学数值的来源、可信度与核对状态登记在 `pages/verification.html`（数值核对表）。

## 📜 许可

- 代码（HTML/CSS/JS 结构与脚本）：MIT（见 `LICENSE`）
- 教学内容（知识卡、章节文字、图表、示例数值）：CC BY 4.0（见 `CONTENT-LICENSE.md`）

## 🤝 贡献

- 提交前请运行 `node scripts/check-links.js` 保证无死链；
- 新增知识卡：在 `pages/knowledge.html` 增加 `<section class="card" id="..." data-hazard="...">`，并在 `assets/js/knowledge-detail-data.js` 登记，同时保持 `KNOWLEDGE_ORDER` 与 `assets/js/knowledge-meta.js` 的 `RECOMMENDED_ORDER` 一致；
- 新增行业/题库/工具数据，直接在对应 `assets/js/*-data.js` 的数组里追加一项即可。
