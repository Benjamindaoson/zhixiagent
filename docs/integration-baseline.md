# 上游合并前的本地基线

核对日期：2026-10-16。知析 AI 公共 `main` 为 `1b6ac47b`，对应运行中的本地服务 `http://127.0.0.1:5567/`。隔离工作树位于 `D:\data-agent-framework-integration`，分支 `nice/upstream-all`；原有运行服务和源码不因本次合并而中断。

## 已验证的当前版本

- `npx tsc --noEmit`：通过。
- `npm test`：47 个文件、400 个测试通过。
- `npm run build`：成功；有上游依赖中的 `eval`、动态导入和大 chunk 警告，无构建错误。
- 本地 HTTP：`http://127.0.0.1:5567/` 返回 200。
- 浏览器：首页、五个示例入口、Stock Prices 与 Movies 仪表盘、筛选、图表切换、原分析画布和返回首页均已验证。
- Python 后端完整测试：`2126 passed, 11 skipped, 1 xpassed, 4 failed, 3 errors`（81.26 秒）。失败集中在 Windows 默认编码写入的插件测试夹具（`test_data_loaders_discovery.py`，5 项）和 `startup_spinner.py` 的 CP1252 输出断言（2 项）。这是上游合并前的既有基线问题；合并后会分别复核，不能误报为新分支回归。

## 合并后必须重跑

```powershell
corepack yarn install --frozen-lockfile
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e .
npx tsc --noEmit
npm test
.\.venv\Scripts\python.exe -m pytest -q tests/backend
npm run build
```

隔离工作树须使用其自身的 `node_modules` 和 `.venv`。外部模型、企业数据库、定时执行服务和桌面安装包另列验证边界。
