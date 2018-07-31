# FIBOS TestNet 是什么？

FIBOS TestNet 是一个通过 FIBOS 节点 P2P 互联的测试链，它可以方便开发者通过它进行测试验证，让我们更加详细的了解它吧！

## TestNet 介绍

根 BP 连接信息: 

- IP `103.80.170.107:8888`
- chainID `cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f`

支持 FIBOS TestNet 账户注册: http://103.80.170.107:8080

(默认账户送 50 FO币)

## TestNet BP 列表


| BP Name  | BP IP  | BP port |
|:-------------: |:---------------:| :-------------:|
| lion      | 103.80.170.107 |         8888 |
| vicky      | 45.121.142.171 |         8888 |

## 如何在 FIBOS TestNet 上进行测试？

在 FIBOS TestNet 上测试需要拥有一个测试账号，请按照上述内容进行注册，你会获得一个账户的公钥和私钥。

编写一段基于 `fibos.js` 的客户端访问 FIBOS TestNet，保存下面的代码至 `test_client.js`。

需要依赖 `fibos.js` 包，请查看上几章节学习如何安装 `fibos.js` [使用 fibos.js 与 FIBOS 交互](fibosjs.md)。

```
var FIBOS = require("fibos.js");
var fibos = FIBOS({
	chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
	httpEndpoint: "http://103.80.170.107:8888",
	logger: {
		log: null,
		error: null
	}
});

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

## 如何加入到 FIBOS TestNet?

了解了 FIBOS TestNet 让我们加入它试试看。

👉 [如何加入到 FIBOS TestNet?](jointestnet.md)