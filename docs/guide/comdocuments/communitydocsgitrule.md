# 社区文档 Git 提交规范

### Fork 项目

将 fibos.io 项目 fork 到你的仓库中

### 拉取本地仓库代码

```
git clone git@github.com:xxxx/fibos.io.git
```

### 添加你要提交的文件

1)cd fibos.io/docs/guide/comdocuments

2)添加 markdown 格式文档 如 `fibosapibasics.md`

3)在 README.md 中添加文档的路由 如 `- [fibos.js API 基础篇](./fibosapibasics.md)`

4)在 SUMMARY.md 中添加文档的路由 如 `- [fibos.js API 基础篇](./fibosapibasics.md)`

### 提交代码到本地仓库

git add .

git commit -m"update:add fibosapibasics.md"

git push origin master

### 从本地仓库提交 pull request 到远端仓库

在本地仓库中点击 `New Pull Request` 新建一个 pr