# 使用 fibos.js 与 FIBOS 交互

`fibos.js` 是一个通用 JavaScript Library，通过简单的编码使它成为一个 FIBOS 的 JavaScript Client，它可以与 FIBOS 以及 EOS 区块链进行交互。

阅读完本章你可以学会使用 `fibos.js` 库与 `FIBOS` 交互。

- 本文运行环境：

  系统：macOS

- 本章涉及到文章列表：

  ```
  hello_fibos/
  ├── fibos_client
  │   ├── createAccount.js
  │   ├── initClient.js
  │   ├── queryAccount.js
  │   └── package.json
  └── start_fibos
      └── node.js
  ```

- 本章示例代码地址：https://github.com/FIBOSIO/samples

## 安装 `fibos.js` 

FIBOS 支持包管理方式，你可以通过 `fibos --install fibos.js` 进行安装。

1. 进入工作目录

```
~$ cd fibos_client/
```
2. 初始化环境


```
fibos_client$ fibos --init
```

如果没有特殊要求，一路回车，输出信息:

```
Press ^C at any time to quit.
name: (fibos_client)
version: (1.0.0)
description:
repository:
keywords:
author:
license: (ISC)
About to write to $[f}:
{
  "name": "fibos_client",
  "version": "1.0.0",
  "description": "",
  "repository": "",
  "keywords": "",
  "author": "",
  "license": "ISC"
}
Is this ok? (yes)
```

3. 安装 `fibos.js`

```
fibos_client$ fibos --install fibos.js
```

如果没有报错说明安装 `fibos.js` 成功，开始编码吧！

## 使用 fibos.js 与 FIBOS 进行交互

新建路径：

```
mkdir hello_fibos/fibos_client/
mkdir hello_fibos/fibos_client/hello/
```

接下来我们将带领大家使用 fibos.js 与 FIBOS 进行交互，还记得我们直接运行的 FIBOS 本地节点吗？请保持它处于运行状态。我们将在本地节点上进行一些简单的操作，如生成账号并查询它的信息。

熟悉操作后，我们在后续章节带领大家编写属于自己的合约并且部署在本地节点上。

事不宜迟，马上行动吧。

1. 创建 FIBOS 连接
目前我们已经拥有了自己的 FIBOS 节点，现在我们将连接它，如果还不知道如何搭建自己的 FIBOS 服务，请参阅[搭建一个 FIBOS 开发环境](./install.md)。

以下代码保存至 `initClient.js`

```js
var FIBOS = require("fibos.js");

function initClient(_keyProvider) {
    return FIBOS({
		chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
		keyProvider: _keyProvider, 
		httpEndpoint: "http://127.0.0.1:8888",
		logger: {
			log: null,
			error: null
		}
	});
}

module.exports = initClient;
```

2. 创建账户

以下代码保存至 `createAccount.js`

```js
var FIBOS = require('./initClient.js')
var config = {
    "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
};

// new FIBOS client
var fibos = FIBOS(config["private-key"]);

fibos.newaccountSync({
    creator: 'eosio',
    name: "hello",
    owner: config["public-key"],
    active: config["public-key"]
});
```
在本例中我们使用 `eosio` 的账号创建了一个名为 `hello` 的账号。

后续的例子中，我们将使用此账号发布合约和调用合约。所以请保证你成功创建了它。

3. 查询账户信息

以下代码保存至 `queryAccount.js`

```js
var FIBOS = require('./initClient.js')
// new FIBOS client
var fibos = FIBOS("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3");

var user = fibos.getAccountSync("hello");
console.warn('---- user ----', user);
```



## 发布属于自己的 JavaScript 合约

这一章，我们与自己的本地节点创建了连接，并且成功创建了自己的账户。接下来让我们试试，在本地节点上创建属于自己的 JavaScript 合约。

👉  【[发布一个简单的 JS 合约](./deployContracts.md)】

