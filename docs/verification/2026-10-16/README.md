# 2026-10-16 本地验证日志

这里保存上游分支集成期间产生的八份构建与测试输出，作为更新说明中测试结论的原始证据。日志从主工作目录和临时集成工作目录汇总而来；提交前仅执行了机械脱敏和空白规范化：本机用户目录、两个工作目录的绝对路径、形似 API Key 或 Bearer Token 的测试字符串被替换为占位符，并清理了行尾空格与末尾空行，测试结果和错误栈保持不变。

| 文件 | 原始文件 SHA-256 | 内容 |
| --- | --- | --- |
| `backend-final-output.txt` | `C5ADD76B88E152D0522FB379EAE392138569995F88E9C523AAD25E6848A9A4C3` | 后端最终全量测试：2763 passed、174 skipped、1 xpassed |
| `backend-test-output.txt` | `3B61FEF3F2CC899A643CEA75ACA539DE29E5A8E9FDF6B806B1E5AE1ECD92D9B3` | 后端修复前的失败记录 |
| `chartifact-build-output.txt` | `EA3231761E07FA20CDBD24FF36F96B3F7CB38DF1CBC5BE865392279DB4050568` | Chartifact 批次生产构建输出 |
| `frontend-final-output.txt` | `4726C38A34B50F2F9A200908EF29FAFABE6E8313D5C32265299A14620F237CD5` | 前端首次最终运行中剩余一个定位失败的记录 |
| `frontend-test-output.txt` | `CB51805473680E9CFA16D6D414179116E1587BF950C5EDC72C06DE2DF5565D4A` | 前端修复过程中的失败记录 |
| `terminal-test-output.txt` | `B07EC8D6E30636192583D1ED1175DA7DBD7A55B72DB909CAF4DAD74FA96892F1` | Windows 终端能力修复前的失败记录 |
| `main-build-output.txt` | `E5906FA5FCAE7C2A8ADE684FA82A4D1AA25C3821955085E8E193F47DEAD0671B` | 主目录生产构建通过记录 |
| `main-frontend-smoke-output.txt` | `EDADFDC4B53AE737E23ADE1144ADF3F0C5FBA980DAB5B5D4FF3044FFDF4E02C7` | 主目录较早的 396 项前端测试通过记录 |

失败日志是修复过程证据，不代表最终状态。最终完整前端结果为 82 个测试文件、1131 passed、1 todo；该次运行的汇总已记录在[开发主线集成说明](../../updates/2026-10-16-dev.md)，当时终端输出没有另存为文件。

`.env`、`.venv`、`node_modules`、`.pytest_cache`、`.codegraph`、`__pycache__`、前端 `dist` 和 `.tmp-npm` 没有上传。它们分别属于密钥配置、可重建依赖、索引、缓存或构建产物，不是仓库源资产；其中两个工作目录的 `.env` 内容哈希完全相同，主目录仍保留本地配置。
