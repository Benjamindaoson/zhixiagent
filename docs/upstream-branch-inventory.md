# 上游分支集成盘点

核对日期：2026-10-16；基准：upstream/dev @ 92edd620。ahead 表示该分支有多少提交尚未进入 dev，不代表这些提交适合直接合并。

| 分支 | 提交 | dev 外提交 | 差异文件 | 分类 | 初步处理 |
| --- | --- | ---: | ---: | --- | --- |
| upstream/Chenglong-MS-patch-1 | 0be60223 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/Chenglong-MS-patch-2 | 5f6e4117 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/Chenglong-MS-patch-3 | 247fcf85 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/Chenglong-MS-patch-4 | 363b1c41 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/chartifact | 528db99a | 11 | 3 | 旧架构功能 | dev 新应用运行时可能取代，核对后决定 |
| upstream/clarity-data-anvil.azurewebsite.net | 734ee832 | 1 | 1 | 历史或实验 | 逐项评估 |
| upstream/codespace-notes | fb16cf73 | 1 | 1 | 历史或实验 | 逐项评估 |
| upstream/copilot/add-azure-sql-fabric-connector | fe484244 | 4 | 8 | 功能候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/add-pendidikan-chart-visualization | 78019639 | 2 | 4 | 功能候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/add-refresh-data-option | f611d1fa | 5 | 5 | 功能候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/automate-vagalite-script-testing | f2e1bf95 | 2 | 3 | 修复或测试候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/desktop-dev-candidate-20261008 | 50b36fbf | 4 | 7 | 桌面或构建 | 目标平台验证后决定 |
| upstream/copilot/fix-20045b03-ae24-4926-9d07-8d79c5ac29cf | 2e4dc7c2 | 2 | 3 | 历史或实验 | 逐项评估 |
| upstream/copilot/fix-canvas-native-compile-error | 6bc67abe | 2 | 3 | 桌面或构建 | 目标平台验证后决定 |
| upstream/copilot/fix-chart-insight-error-message | 3afb1c13 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/copilot/fix-dependabot-and-code-scanning-issues | ed2cef82 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/copilot/fix-no-response-d-data-connector | 77989522 | 3 | 2 | 修复或测试候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/fix-remote-mysql-connection | 4451f254 | 5 | 4 | 修复或测试候选 | 在 dev 集成后移植与验证 |
| upstream/copilot/fix-windows-desktop-build | 5d4f7b32 | 0 | 0 | 桌面或构建 | 目标平台验证后决定 |
| upstream/copilot/macos-esrp-candidate-20260913 | 87464cac | 8 | 14 | 桌面或构建 | 目标平台验证后决定 |
| upstream/copilot/macos-input-20260913 | c0e76958 | 6 | 14 | 桌面或构建 | 目标平台验证后决定 |
| upstream/copilot/sub-pr-208-again | 3017e363 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/copilot/windows-installer-validation-20260913 | 8f6df3fe | 4 | 12 | 桌面或构建 | 目标平台验证后决定 |
| upstream/dependabot/github_actions/dev/github-actions-fd51aa5baa | 2a0c42fc | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dev/fontsource/roboto-5.3.0 | 4eff4446 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dev/frontend-minor-patch-fc37b03c6a | fda9a458 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dev/jsdom-30.0.1 | c1a062df | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dev/prism-react-renderer-2.4.1 | da707b90 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dev/vite-8.2.1 | 79865bac | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/dompurify-3.4.16 | 4ea10383 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/echarts-6.1.0 | bc6e4052 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/flatted-3.4.2 | 896be7d8 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/humanfs/node-0.16.8 | 4ab5ec0a | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/js-yaml-4.3.2 | 8b705876 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/linkify-it-5.0.1 | b49eefc0 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/lodash-4.18.1 | 53018b7b | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/markdown-it-14.2.0 | fd21ee23 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/nanoid-3.3.18 | 7ee9f8ad | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/picomatch-2.3.2 | 3e4aea6c | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/postcss-8.5.25 | a3c5a9fe | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/tiptap/core-3.30.5 | 6ec49d4c | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/undici-7.30.0 | 1ab3c962 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/vite-7.3.5 | dc453498 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/vitest-4.1.11 | fd45c4c7 | 1 | 2 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/npm_and_yarn/yaml-1.10.3 | 66ec6c94 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/aiohttp-3.14.3 | d5cf5e9d | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/anyio-4.14.2 | 7bf01a18 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/cryptography-50.0.0 | ec728f0e | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/dev/pandas-3.0.5 | 624ed566 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/dev/setuptools-84.0.0 | f1b9eb9b | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/jupyter-server-2.18.0 | 281ad6d2 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/jupyterlab-4.5.7 | 4b938be6 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/nbconvert-7.17.1 | 0aae4f3e | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/notebook-7.5.6 | 38f4d5b7 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/pyarrow-23.0.1 | 2e8e58b7 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/pyjwt-2.13.0 | df83aea2 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/python-dotenv-1.2.2 | 975325f0 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/requests-2.33.0 | 53096416 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/soupsieve-2.9 | 0f396e32 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dependabot/uv/thrift-0.24.0 | a1e659e7 | 1 | 1 | 依赖维护 | 兼容性与安全审查后决定 |
| upstream/dev | 92edd620 | 0 | 0 | 开发主线 | 隔离集成与验证 |
| upstream/docs/dev-guides-cleanup | ab5ad300 | 1 | 12 | 文档 | 与实际代码逐条核对 |
| upstream/feature/i18n-react-i18next | ed706bcf | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/feature/plugin-architecture | fa5b59de | 1 | 0 | 功能历史 | 树差异为 0，核对合并记录 |
| upstream/main | 5477f0e2 | 0 | 0 | 发布基线 | 0.8b1 已在知析 AI |
| upstream/main-0.6 | eebe31a7 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/main-0.7 | e55dca13 | 2 | 3 | 历史或实验 | 逐项评估 |
| upstream/mcp | af95c28a | 4 | 5 | 旧架构功能候选 | 评估 MCP 服务移植契约 |
| upstream/mimetype-js | 1e2a8107 | 1 | 1 | 历史或实验 | 逐项评估 |
| upstream/sso-test | c4e46049 | 0 | 0 | 历史或实验 | dev 已包含或为祖先 |
| upstream/test-launch-debugger | 1ed02b27 | 1 | 1 | 历史或实验 | 逐项评估 |

说明：仅在代码、测试和本地运行验证通过后，处理状态才可从“候选”改为“已集成”。历史、实验和依赖分支需要逐条说明取舍；不把分支名或提交数当成功能验收。
