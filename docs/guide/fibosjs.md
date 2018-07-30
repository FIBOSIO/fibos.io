# 使用 fibos.js 与 FIBOS 交互

`fibos.js` 是一个通用JavaScript Library，通过简单的编码使它成为一个 FIBOS 的 JavaScript Client,它可以与 FIBOS 以及 EOS 区块链进行交互。

阅读完本章你可以学会使用 `fibos.js` 库与 FIBOS交互，这里涉及 `npm` 的相关知识。

下面让我们先来看一个简单的例子吧!

## 如何安装 `fibos.js` ？

FIBOS 支持 `npm` 的包管理方式，你可以通过 `npm install` 安装。

1. 新建工作目录

```
~$ mkdir fibos_client
~$
~$ cd fibos_client/
```
2. 初始化环境


```
fibos_client$ npm init
```

输出 `package.json` 信息:

```
{
  "name": "fibos_client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```


3. 安装 `fibos.js`

```
fibos_client$ npm install fibos.js
```

目前为止已经安装好了 `fibos.js`，开始编码吧!

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
	"http-server-address": "http://127.0.0.1:8888",
};

var fibos = FIBOS({
	chainId: config["chainId"],
	keyProvider: config["private-key"],
	httpEndpoint: config["http-server-address"],
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

3. 运行 `client.js` 获取第一个区块信息

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

1. 以下代码保存至工作目录 `code.js`

```
var FIBOS = require('fibos.js')
var name = "eosio";
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": name,
    "public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "http-server-address": "http://127.0.0.1:8888",
};

var abi = {
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
};

// new FIBOS client
var fibos = FIBOS({
    chainId: config["chainId"],
    keyProvider: config["private-key"],
    httpEndpoint: config["http-server-address"],
    logger: {
        log: null,
        error: null
    }
});

//setcode
var js_code = `exports.hi = user => console.error('in contract:', user);`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));

//getcode
var js_code = `exports.hi = user => console.error('in contract:', user);`;
var code = fibos.getCodeSync(name, true);

console.log("code:", code);

//setabt
fibos.setabiSync(name, abi);


//call abi
var ctx = fibos.contractSync(name);
ctx.hiSync('hello FIBOS', {
    authorization: name
});
```

输出结果(片段):

```
{
  "account_name": "eosio",
  "code_hash": "95025a3c9cf38043edc937bab543fe843b136d777464e5d34bd418df1acd7027",
  "wast": "504b03042d00000008007065fe4c6a9400a2360000003900000008001400696e6465782e6a7301001000000000000000000000000000000000004bad28c82f2a29d6cbc854b055282d4e2d52b0b55348cecf2bcecf49d54b2d2aca2fd250cfcc0389941425269758a9eb8055695a0300504b010200001400000008007065fe4c6a9400a23600000039000000080000000000000001000000000000000000696e6465782e6a73504b0506000000000100010036000000700000000000"

....
```


## 体验 FIBOS 超棒的 测试框架

这几章我们学会了如何搭建 FIBOS 的开发环境，也学会了如何使用 `fibos.js` 与 FIBOS 交互，那么让我们来试试 FIBOS 的 测试框架吧!

👉 【[体验 FIBOS 超棒的测试框架](test.md)】