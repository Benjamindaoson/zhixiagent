# 更新 06：本地主目录更名为 `zhixiagent`

GitHub 仓库名称已经是 `zhixiagent`，本地仍沿用上游开发阶段的目录名 `D:\data-agent-framework`，容易让人误以为这是另一个项目。本次仅调整本地文件夹名称，使本地路径与 GitHub 仓库一致；源码、Git 历史、远端地址和运行配置不变。

## 操作与验证

1. 确认 `D:\zhixiagent` 是零文件的空目录，没有需要保留或覆盖的内容。
2. 确认 `D:\data-agent-framework-integration` 与 `D:\data-agent-framework-integration-runtime` 均已不存在。
3. 确认旧目录工作树干净，本地 `main` 与 GitHub `origin/main` 指向同一提交。
4. 停止命令行明确引用旧目录的 CodeGraph 索引进程，移除空的目标占位目录，再把整个 Git 工作树移动为 `D:\zhixiagent`。
5. 在新路径重新检查 Git 根目录、远端、提交、`.env` 和 CodeGraph 状态。

最终保留的本地项目目录为 `D:\zhixiagent`，GitHub 仓库仍为 <https://github.com/Benjamindaoson/zhixiagent>。
