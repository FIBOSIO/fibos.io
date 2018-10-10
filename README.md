## FIBOS 官方教程

官方网站: `https://fibos.io`



## 社区文档 Git 提交规范

### Fork 项目

将 fibos.io 项目 fork 到你的仓库中，项目地址: [https://github.com/FIBOSIO/fibos.io](https://github.com/FIBOSIO/fibos.io)

### 拉取本地仓库代码

```
//例如:你的 GitHub 账户名为：OrioGod
git clone git@github.com:OrioGod/fibos.io.git
```

### 添加你要提交的文件

* 1 `cd fibos.io/docs/fromcommunity/ipcolumn`

* 2 创建属于你自己的专栏文件夹,例如 `zzx`，然后在文件夹中新建 `README.md` 和 `SUMMARY.md` 两个文件

* 3 添加 markdown 格式文档 如 `fibosapibasics.md`

* 4 在 `README.md` 中添加文档的路由 如 `- [fibos.js API 基础篇](./fibosapibasics.md)`

* 5 在 `SUMMARY.md` 中添加文档的路由 如 `- [fibos.js API 基础篇](./fibosapibasics.md)`

### 提交代码到本地仓库

```
git add .
git commit -m "update:add zzx column and fibosapibasics.md"
git push origin master
```

### 从本地仓库提交 pull request 到远端仓库

在本地仓库中点击 `New Pull Request` 新建一个 PR