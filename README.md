# 知析 AI

**从一个问题开始，把数据、分析过程和可视化留在同一个工作区。**

知析 AI 是一个可在本地运行的 AI 数据分析应用。打开首页，输入问题或选择示例数据；进入工作区后，左侧查看数据表与图表，右侧继续和分析助手对话。文件导入、数据连接、图表编辑、会话保存与报告等能力沿用原项目的数据分析流程。本仓库在此基础上调整了品牌和前端布局，并改善了模型流式回答中 `<think>` 标签的显示。

> 这是可运行的项目源码，不是只展示界面的静态页面。模型回答需要你自行配置兼容的 API，耗时取决于所用服务。

## 页面预览

### 1. 从首页提问

首页保留问题输入、数据导入、示例数据和历史会话。输入问题后进入分析工作区。

![知析 AI 首页：问题输入、示例数据和数据导入入口](docs/media/home.jpg)

### 2. 五个示例，一次看全

以下截图均来自本地运行的内置示例会话，展示了进入工作区后的实际界面。左侧是分析画布，右侧是数据源与分析线程；示例中的报告和图表随会话加载，无需另外发起模型请求。图表及报告中的结论仅用于演示，请结合原始数据核查。

#### Stock Prices · 股票价格

比较 GOOGL 与 MSFT 的收盘价走势，并查看图表下方的数据表。

![Stock Prices 示例：股票收盘价图表、数据表与分析线程](docs/media/stock-prices.jpg)

#### Gas Prices · 燃油价格

查看燃油价格变化、价格波动分析报告与后续预测线程。

![Gas Prices 示例：燃油价格分析报告与图表线程](docs/media/gas-prices.jpg)

#### Global Energy · 全球能源

用国家间可再生能源占比图表，查看能源转型分析报告。

![Global Energy 示例：可再生能源占比图表与分析报告](docs/media/global-energy.jpg)

#### Movies · 电影数据

对照制作预算、影评评分和利润，查看热力图与分析结论。

![Movies 示例：预算、评分与利润热力图及分析线程](docs/media/movies.jpg)

#### Unemployment · 行业失业率

比较金融危机期间不同行业的失业率走势，并浏览相关分析线程。

![Unemployment 示例：行业失业率折线图与分析报告](docs/media/unemployment.jpg)

### 3. 交互式分析仪表盘

打开示例或上传表格后，点击对话区顶部的 **交互式仪表盘**。可以选择数据表、横轴和数值字段，按低基数字段筛选，并在柱状图、折线图及平均值、合计之间切换。下方的指标卡与图表会随选择更新；点击 **返回分析** 可回到原有画布。

![Stock Prices 示例中的交互式仪表盘：样本指标和股票分组图表](docs/media/dashboard-stock.jpg)

同一套控件也适用于其他表格。Movies 示例默认按 `Major Genre` 分组展示制作预算，指标注明已读取的 1,000 行样本及有效数值行数。

![Movies 示例中的交互式仪表盘：电影类型与制作预算](docs/media/dashboard-movies.jpg)

这是一项从上游 `dev` 的交互式分析方向中挑选出的首个可用功能切片：直接复用现有表格采样 API，在浏览器中对最多 1,000 行样本计算指标和图表。它不包含上游 `dev` 的沙箱 HTML/React 应用生成与执行；图表数值代表已读取的样本，不应误读为全表统计。

## 能做什么

| 环节 | 操作 |
| --- | --- |
| 接入数据 | 上传 CSV、TSV、JSON、Excel，使用示例数据，或按原项目支持的方式连接文件夹与数据库。 |
| 提问分析 | 用自然语言描述目标，查看助手的回答、数据处理结果和后续建议。 |
| 查看结果 | 在同一工作区检查数据表、图表、生成代码及分析线程。 |
| 交互探索 | 对已加载表格选择字段、筛选类别，切换柱状图或折线图并查看样本指标。 |
| 继续工作 | 保存和重新打开会话，调整图表，并整理报告。 |

界面提供中文和英文切换。具体连接器的可用性取决于本地依赖、凭据及服务配置。

## 本地启动

**环境：** Python 3.11+、Node.js、Corepack（随常见 Node.js 安装提供）。建议在本机先用示例数据体验，再配置自己的模型与外部数据源。

### Windows PowerShell

```powershell
git clone https://github.com/Benjamindaoson/zhixiagent.git
cd zhixiagent

py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e .

corepack yarn install --frozen-lockfile
npm run build

Copy-Item .env.example .env
# 编辑 .env：填入自己的模型地址、模型 ID 和密钥
.\.venv\Scripts\data_formulator.exe --port 5567 --disable-display-keys
```

### macOS / Linux

```bash
git clone https://github.com/Benjamindaoson/zhixiagent.git
cd zhixiagent

python3.11 -m venv .venv
./.venv/bin/python -m pip install -e .

corepack yarn install --frozen-lockfile
npm run build

cp .env.example .env
# 编辑 .env：填入自己的模型地址、模型 ID 和密钥
./.venv/bin/data_formulator --port 5567 --disable-display-keys
```

启动后访问 **<http://127.0.0.1:5567/>**。首次安装 Python 依赖需要下载较多包；前端构建也需要一些时间。若端口已占用，可在启动命令中修改 `--port`。

### 配置模型

项目根目录的 [`.env.example`](.env.example) 给出了 OpenAI 兼容接口的配置格式。复制为 `.env` 后，填写你自己的 `CLOUDCODE_API_KEY`、`CLOUDCODE_API_BASE` 和 `CLOUDCODE_MODELS`。`CLOUDCODE_ENDPOINT=openai` 表示按 OpenAI 兼容协议调用；实际模型 ID 和 API Base 请以服务商提供的值为准。

`.env` 已被 Git 忽略。**不要把密钥写进 README、截图、提交记录或公开 Issue。** 不配置模型时，仍可浏览界面与示例数据；AI 请求需要可用的模型服务。对外部模型发送数据前，请先确认所用服务符合你的数据使用要求。

## 体验路线

1. 在首页打开 **Stock Prices** 示例，查看已有数据和图表。
2. 在工作区点击 **交互式仪表盘**，将筛选字段设为 `symbol`，再选择 `MSFT`，观察指标与图表的变化。
3. 点击 **返回分析**，继续检查原有图表、数据表与右侧分析线程。
4. 在对话框输入一个基于示例数据的问题，例如“`stock-hist` 表有哪些字段？”
5. 点击右上角 **返回首页**，再从 **你的会话** 重新打开刚才的分析。

外部模型的响应速度会因网关与模型而变化。图表和 AI 生成的结论应结合原始数据核查。

## 开发与验证

前端使用 React、TypeScript、Vite 和 MUI；Python 服务负责提供页面与现有数据分析 API。前端构建产物位于 `py-src/data_formulator/dist/`，由 Python 服务加载。项目源码、测试与规范分别位于 `src/`、`py-src/data_formulator/`、`tests/` 和 `openspec/`。

```powershell
npx tsc --noEmit
npm test
npm run build
```

本地验证记录：TypeScript 检查通过；前端测试 **400/400** 通过；生产构建成功；在浏览器中验证了首页、Stock Prices 与 Movies 示例、仪表盘筛选与图表切换、返回原画布及返回首页。模型 API 的实际可用性仍取决于你的配置和服务状态。

当前代码底座对应上游 `0.8b1`。`dev` 的交互式分析方向已有上述首个本地仪表盘切片；其他 `dev` 能力仍在逐项评估，尚未计入本仓库的已实现功能。提交对照和集成验收边界见[上游版本与渐进集成记录](docs/upstream-integration.md)。

## 许可与来源

本项目基于 [Microsoft Data Formulator](https://github.com/microsoft/data-formulator) 修改，遵循仓库中的 [MIT License](LICENSE)。原项目的版权和许可声明保留在源码及许可证文件中；本仓库的界面定制不代表与微软存在官方关联。
