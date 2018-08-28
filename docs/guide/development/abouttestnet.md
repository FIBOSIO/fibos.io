# FIBOS TestNet 是什么？

FIBOS TestNet 是一个通过 FIBOS 节点 P2P 互联的测试链，它可以方便开发者通过它进行测试验证，让我们更加详细的了解它吧！

- 本文运行环境：

  系统：macOS

- 本章涉及的文章列表：

  ```
  testNet
  └── about
      ├── client.js
      ├── getBanlance.js
      ├── initClient.js
      └── tranfer.js
  ```

- 本章示例代码地址：https://github.com/FIBOSIO/samples

## TestNet 介绍

根 BP 连接信息: 

```
IP : "103.80.170.107"
chainID : "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
```

支持 FIBOS TestNet 账户注册: http://103.80.170.107:8080

(默认账户送 50 FO币)

## TestNet BP 列表


| BP Name  | BP IP  | HTTP port | P2P port |
|:-------------: |:---------------:| :-------------:| :-------------:|
| gulou      | 103.80.170.107 |         8888 | 9876 |
| xuanwu      | 45.121.142.171 |         8888 | 9876 |

## 如何在 FIBOS TestNet 上进行测试？

(tips：FIBOS TestNet 数据会定期重置)

在 FIBOS TestNet 上测试需要拥有一个测试账号，请按照上述内容进行注册，你会获得一个账户的公钥和私钥。

一下内容需要依赖 `fibos.js` 包，请查看上几章节学习如何安装 `fibos.js` [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md)。

现在我们编写一段基于 `fibos.js` 的客户端访问 FIBOS TestNet，如果读者阅读过新手入门模块，对于这个例子应该十分熟悉了，只不过在新手入门模块我们连接的是本地节点，在本章中，我们将连接 TestNet 节点。

以下代码保存至工作目录 `initClient.js`：

```
var FIBOS = require("fibos.js");

function initClient(_keyProvider) {
	return FIBOS({
		chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
		keyProvider: _keyProvider,
		httpEndpoint: "http://103.80.170.107:8888",
		logger: {
			log: null,
			error: null
		}
	});
}

module.exports = initClient;
```

以下代码保存至工作目录 `client.js`：

```
var FIBOS = require("./initClient.js");
var fibos = FIBOS("");

var result = fibos.getBlockSync(1);

console.log(result);
```

输出:

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

### TestNet 更多例子

在 FIBOS 操作时，我们需要一个测试账号，关于测试账号的申请，请参照上文中关于“TestNet 介绍”的内容。

现在我们查询自己拥有的账户信息。

以下代码保存至工作目录`getBalance.js`：

注：请读者自行替换 "注册时的私钥"和"注册时账户名称"为自己注册时的信息。

```
var FIBOS = require('./initClient.js');

var fibos = FIBOS("注册时的私钥");
var result = fibos.getTableRowsSync(true, "eosio.token", "注册时账户名称", "accounts")
console.log(result);
```

运行脚本:

```
fibos getBalance.js
```

输出结果:

```
{
  "rows": [
    {
      "balance": "xxxxx FO"
    }
  ],
  "more": false
}
```

让我们完成一次转账吧。

以下代码保存至工作目录 `tranfer.js`:

```
var FIBOS = require('./initClient.js');

var fibos = FIBOS("注册时的私钥");

var ctx = fibos.contractSync("eosio.token");
var result = ctx.transferSync("eosio", "gulou", '10.0000 FO', 'transfer');
console.log(result);
```

运行脚本:

```
fibos tranfer.js
```


## 如何加入到 FIBOS TestNet?

了解了 FIBOS TestNet 让我们加入它试试看。

👉 [如何加入到 FIBOS TestNet?](jointestnet.md)