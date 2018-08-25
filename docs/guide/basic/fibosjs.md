# 使用 fibos.js 与 FIBOS 交互

`fibos.js` 是一个通用 JavaScript Library，通过简单的编码使它成为一个 FIBOS 的 JavaScript Client，它可以与 FIBOS 以及 EOS 区块链进行交互。

阅读完本章你可以学会使用 `fibos.js` 库与 FIBOS 交互。

- 本文运行环境：

  系统：macOS

- 本章涉及到文章列表：

  ```
  hello_fibos/
  ├── fibos_client
  │   ├── call.js
  │   ├── initClient.js
  │   ├── deploy.js
  │   ├── hello
  │   │   ├── hello.abi
  │   │   └── hello.js
  │   └── package.json
  └── start_fibos
      └── node.js
  ```

- 本章示例代码地址：https://github.com/FIBOSIO/samples

## 安装 `fibos.js` ？

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
## 发布一个简单的 JS 合约

新建路径：

```
mkdir hello_fibos/fibos_client/
mkdir hello_fibos/fibos_client/hello/
```

接下来我们将展示一个简单的合约的发布，旨在带领大家快速领略 FIBOS 发布 JavaScript 合约的流程，对于更深入的内容，有需要的读者可以查阅我们进阶的教程进行学习。

目录文件说明:

```
├── fibos_client
│   ├── call.js 调用合约接口脚本文件
│   ├── deploy.js 加载、发布合约脚本文件
│   ├── initClient.js FIBOS连接文件
│   ├── hello
│   │   ├── hello.abi 合约abi文件
│   │   └── hello.js 合约代码文件
```

1. hello 合约代码

在下面我们通过 JavaScript 来编写合约的功能，在这个合约调用成功后，将在命令行输出传入参数的名称。

以下代码保存至工作目录 `./hello/hello.js`

```
exports.hi = user => console.error('in contract:', user);
```

2. hello 合约 abi 文件

下面定义了一份 abi 文件，对于合约而言，abi 定义了 action 行为和数据储存的的表等基础信息。对于 abi 更详细的解读，我们将在后续的文章中给出。

以下代码保存至工作目录 `./hello/hello.abi`

```
{
    "version": "eosio::abi/1.0",
    "structs": [{
        "name": "player",
        "base": "",
        "fields": [{
            "name": "title",
            "type": "string"
        }, {
            "name": "age",
            "type": "int64"
        }]
    }, {
        "name": "hi",
        "base": "",
        "fields": [{
            "name": "user",
            "type": "name"
        }]
    }],
    "actions": [{
        "name": "hi",
        "type": "hi",
        "ricardian_contract": ""
    }]
}
```

3. 创建 FIBOS 连接

这段代码用于连接本地 FIBOS 节点，请保证本地的 FIBOS 节点服务正在运行，如果还不知道如何搭建自己的 FIBOS 服务，请参阅[搭建一个 FIBOS 开发环境](./startfibos.md)。

以下代码保存至工作目录 `initClient.js`

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

4. 加载、发布合约脚本文件

以下代码保存至工作目录 `deploy.js`

```javascript
var FIBOS = require('./initClient.js')
var fs = require("fs");
var config = {
    "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "contractName": "hello"
};

// new FIBOS client
var fibos = FIBOS(config["private-key"]);

//新建 hello 账户
fibos.newaccountSync({
  creator: 'eosio',
  name: "hello",
  owner: config["public-key"],
  active: config["public-key"]
});

//setcode
var js_code = fs.readTextFile("./hello/hello.js");
fibos.setcodeSync(config["contractName"], 0, 0, fibos.compileCode(js_code));

//getcode
var code = fibos.getCodeSync(config["contractName"], true);
console.log("code:", code);

//setabi
var abi = JSON.parse(fs.readTextFile("./hello/hello.abi"));
fibos.setabiSync(config["contractName"], abi);
```

执行脚本:

```
fibos deploy.js
```

输出结果(片段):

```
code: {
  "account_name": "hello",
  "code_hash": "383a12daacaf124eea9afc529822d990853b5b99570401b8394534b746ea3977",
  "wast": "504b03042d00000008002cadfe4c6a9400a2360000003900000008001400696e6465782e6a7301001000000000000000000000000000000000004bad28c82f2a29d6cbc854b055282d4e2d52b0b55348cecf2bcecf49d54b2d2aca2fd250cfcc0389941425269758a9eb8055695a0300504b010200001400000008002cadfe4c6a9400a23600000039000000080000000000000001000000000000000000696e6465782e6a73504b0506000000000100010036000000700000000000",
  "wasm": ""
}
```

5. 调用合约接口脚本文件

以下代码保存至工作目录 `call.js`:

```js
var FIBOS = require('./initClient.js')
var config = {
    "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "contractName": "hello"
};

// new FIBOS client
var fibos = FIBOS(config["private-key"]);

//call abi
var ctx = fibos.contractSync(config["contractName"]);
let i = ctx.hiSync('hello', {
    authorization: config["contractName"]
});
```

执行脚本:

```
fibos call.js
```

在 FIBOS 节点服务控制台输出 `trxs:1`，说明调用成功 :

```
2018-07-30T14:28:22.005 thread-1   producer_plugin.cpp:1196      produce_block        ] Produced block 00000e57c573a33b... #3671 @ 2018-07-30T14:28:22.000 signed by eosio [trxs: 1, lib: 3670, confirmed: 0]
```

## 体验 FIBOS 超棒的测试框架

这几章我们学会了如何搭建 FIBOS 的开发环境，也学会了如何使用 `fibos.js` 与 FIBOS 交互，那么让我们来试试 FIBOS 的测试框架吧!

👉 【[体验 FIBOS 超棒的测试框架](test.md)】