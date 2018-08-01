# 使用 fibos.js 与 FIBOS 交互

`fibos.js` 是一个通用 JavaScript Library，通过简单的编码使它成为一个 FIBOS 的 JavaScript Client，它可以与 FIBOS 以及 EOS 区块链进行交互。

阅读完本章你可以学会使用 `fibos.js` 库与 FIBOS 交互。

下面让我们先来看一个简单的例子吧!

本章节涉及到代码的目录结构:

```
hello_fibos/
├── fibos_client
│   ├── call.js
│   ├── client.js
│   ├── deploy.js
│   ├── hello
│   │   ├── hello.abi
│   │   └── hello.js
│   └── package.json
└── start_fibos
    └── node.js
```

新建目录
```
mkdir hello_fibos/fibos_client/
mkdir hello_fibos/fibos_client/hello/
```

## 如何安装 `fibos.js` ？

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

输出:
```
├── babel-runtime@6.26.0
├── base-x@3.0.4
├── bigi@1.4.2
├── binaryen@37.0.0
├── bn.js@4.11.8
├── browserify-aes@1.2.0
├── bs58@4.0.1
├── buffer-xor@1.0.3
├── bytebuffer@5.0.1
├── camel-case@3.0.0
├── cipher-base@1.0.4
├── core-js@2.5.7
├── create-hash@1.2.0
├── create-hmac@1.1.7
├── ecurve@1.0.6
├── encoding@0.1.12
├── eosjs@15.0.6
├── eosjs-api@6.3.2
├── eosjs-ecc@4.0.2
├── evp_bytestokey@1.0.3
├── fcbuffer@2.2.0
├── fibos.js@0.0.5
├── hash-base@3.0.4
├── iconv-lite@0.4.23
├── ieee-float@0.6.0
├── inherits@2.0.3
├── is-stream@1.1.0
├── isomorphic-fetch@2.2.1
├── long@3.2.0
├── lower-case@1.1.4
├── md5.js@1.3.4
├── no-case@2.3.2
├── node-fetch@1.7.3
├── randombytes@2.0.6
├── regenerator-runtime@0.11.1
├── ripemd160@2.0.2
├── safe-buffer@5.1.2
├── safer-buffer@2.1.2
├── sha.js@2.4.11
├── upper-case@1.1.3
└── whatwg-fetch@2.0.4
```

成功安装 `fibos.js`，开始编码吧!

## 一个简单的获取区块信息的例子

这个简单例子可以实现查看区块信息，请按下面的步骤开始动手吧!

1. 以下代码保存至工作目录 `client.js`

```
var FIBOS = require('fibos.js');
var config = {
	"chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
	"producer-name": "eosio",
	"public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
	"private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
	"httpEndpoint": "http://127.0.0.1:8888",
};

var fibos = FIBOS({
	chainId: config["chainId"],
	keyProvider: config["private-key"],
	httpEndpoint: config["httpEndpoint"],
	logger: {
		log: null,
		error: null
	}
});

var result = fibos.getBlockSync(1);

console.log(result);
```

2. 开启 FIBOS 节点服务

上一章节我们已经学会了如何搭建一个 FIBOS 环境，请开启它!  ([搭建一个 FIBOS 开发环境](startfibos.md))

```
fibos$ fibos node.js
```

3. 再开启一个终端运行 `client.js` 获取第一个区块信息

```
fibos_client$ fibos client.js
```

输出结果:

```
{
  "timestamp": "2018-06-01T12:00:00.000",
  "producer": "",
  "confirmed": 1,
  "previous": "0000000000000000000000000000000000000000000000000000000000000000",
  "transaction_mroot": "0000000000000000000000000000000000000000000000000000000000000000",
  "action_mroot": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  "schedule_version": 0,
  "new_producers": null,
  "header_extensions": [],
  "producer_signature": "SIG_K1_111111111111111111111111111111111111111111111111111111111111111116uk5ne",
  "transactions": [],
  "block_extensions": [],
  "id": "00000001bcf2f448225d099685f14da76803028926af04d2607eafcf609c265c",
  "block_num": 1,
  "ref_block_prefix": 2517196066
}
```

## 发布一个简单的 JS 合约

目录文件说明:

```
├── fibos_client
│   ├── call.js 调用合约接口脚本文件
│   ├── deploy.js 加载、发布合约脚本文件
│   ├── hello
│   │   ├── hello.abi 合约abi文件
│   │   └── hello.js 合约代码文件

```

1. hello 合约代码

以下代码保存至工作目录 `./hello/hello.js`

```
exports.hi = user => console.error('in contract:', user);
```

2. hello 合约 abi 文件

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

3. 加载、发布合约脚本文件

以下代码保存至工作目录 `deploy.js`

```
var FIBOS = require('fibos.js')
var fs = require("fs");
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": "eosio",
    "public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
};

// new FIBOS client
var fibos = FIBOS({
    chainId: config["chainId"],
    keyProvider: config["private-key"],
    httpEndpoint: config["httpEndpoint"],
    logger: {
        log: null,
        error: null
    }
});

var contractName = "hello";

//新建 hello 账户
fibos.newaccountSync({
  creator: 'eosio',
  name: "hello",
  owner: config["public-key"],
  active: config["public-key"]
});


//setcode
var js_code = fs.readTextFile("./hello/hello.js");
fibos.setcodeSync(contractName, 0, 0, fibos.compileCode(js_code));

//getcode
var code = fibos.getCodeSync(contractName, true);

console.log("code:", code);

//setabi
var abi = JSON.parse(fs.readTextFile("./hello/hello.abi"));
fibos.setabiSync(contractName, abi);
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

4. 调用合约接口脚本文件

以下代码保存至工作目录 `call.js`:

```
var FIBOS = require('fibos.js')
var fs = require("fs");
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": "eosio",
    "public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
};

// new FIBOS client
var fibos = FIBOS({
    chainId: config["chainId"],
    keyProvider: config["private-key"],
    httpEndpoint: config["httpEndpoint"],
    logger: {
        log: null,
        error: null
    }
});

var contractName = "hello";

//call abi
var ctx = fibos.contractSync(contractName);
ctx.hiSync('hello', {
    authorization: contractName
});
```

执行脚本:

```
fibos call.js
```

在 FIBOS 节点服务控制台输出 `trxs:1` :

```
2018-07-30T14:28:22.005 thread-1   producer_plugin.cpp:1196      produce_block        ] Produced block 00000e57c573a33b... #3671 @ 2018-07-30T14:28:22.000 signed by eosio [trxs: 1, lib: 3670, confirmed: 0]
``

## 体验 FIBOS 超棒的 测试框架

这几章我们学会了如何搭建 FIBOS 的开发环境，也学会了如何使用 `fibos.js` 与 FIBOS 交互，那么让我们来试试 FIBOS 的 测试框架吧!

👉 【[体验 FIBOS 超棒的测试框架](test.md)】