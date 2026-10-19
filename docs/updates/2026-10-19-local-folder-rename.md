# 更新 06：本地主目录更名为 `zhixiagent`

GitHub 仓库名称已经是 `zhixiagent`，本地仍沿用上游开发阶段的目录名 `D:\data-agent-framework`，容易让人误以为这是另一个项目。本次仅调整本地文件夹名称，使本地路径与 GitHub 仓库一致；源码、Git 历史、远端地址和运行配置不变。

## 操作与验证

1. 确认 `D:\zhixiagent` 是零文件的空目录，没有需要保留或覆盖的内容。
2. 确认 `D:\data-agent-framework-integration` 与 `D:\data-agent-framework-integration-runtime` 均已不存在。
3. 确认旧目录工作树干净，本地 `main` 与 GitHub `origin/main` 指向同一提交。
4. 停止命令行明确引用旧目录的 CodeGraph 索引进程，移除空的目标占位目录，再把整个 Git 工作树移动为 `D:\zhixiagent`。
5. 在新路径重新检查 Git 根目录、远端、提交、`.env` 和 CodeGraph 状态。
6. 修复 Windows 虚拟环境搬迁后的绝对路径：重新安装项目的 editable package，并按锁定版本重装 `pyarrow==25.0.1`，恢复 Parquet DLL 加载。
7. 从新目录启动后端，在真实浏览器中验证完整首页、五个示例会话、四个示例工作流，以及从首页进入“左侧数据画布、右侧 AI 分析对话”的工作区流程。

最终保留的本地项目目录为 `D:\zhixiagent`，GitHub 仓库仍为 <https://github.com/Benjamindaoson/zhixiagent>。

## 完成回执

项目的 54 个顶层条目已全部移动到 `D:\zhixiagent`，无移动失败；新目录包含 114,098 个文件，`.env`、`.venv`、`node_modules` 和 Git 元数据均存在。新路径下 Git 根目录、远端和 CodeGraph 索引均正常。应用已从 `D:\zhixiagent` 启动，`http://127.0.0.1:5567/` 返回 HTTP 200，页面标题为“知析 AI · 您的专属 AI 数据分析师”；浏览器实测首页与历史分析工作区均可打开。旧路径只剩零文件空目录；当前 Codex 进程把该路径作为会话工作目录，Windows 暂时拒绝删除根目录，因此已启动只针对这个空目录的后台清理器，在句柄释放后自动删除。`D:\data-agent-framework-integration` 和 `D:\data-agent-framework-integration-runtime` 已确认不存在。
