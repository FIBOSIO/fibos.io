# 如何帮助别人在 FIBOS 中创建账号

> 随着 8.28 日 FIBOS 主网上线以来，已经有28000+用户通过官网的免费注册通道注册了 FIBOS 账号。这些账户的注册成本都是由 FIBOS 团队代为垫付，我们后续将会关闭免费注册通道，想要注册 FIBOS 账号的同学们可以让已经拥有 FIBOS 账号的小伙伴代为注册。

学习本文档前,你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

### 生成 FIBOS 公私钥

- 使用 fibos.js 的 ecc 生成

```
var FIBOS = require("fibos.js");
var prikey = FIBOS.modules.ecc.randomKeySync(); //私钥
var pubkey = FIBOS.modules.ecc.privateToPublic(prikey); //公钥
console.log("公钥: %s\n私钥: %s",pubkey,prikey)
```

tips: FIBOS 的公钥是一个以 FO 为前缀的随机字符串，如：`FO8LhSy6K8NXaCfs8uMCLFsANkekQPbrgzbkfM1aNqJUALXQVHKF` 

### 创建 FIBOS 账号

保存如下代码到 `createAccount.js` :

```javascript
var FIBOS = require('fibos.js');
var fibos = FIBOS({
	chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
	keyProvider: "creater_priKey",
	httpEndpoint: "http://ca-rpc.fibos.io:8870",
	logger: {
		log: null,
		error: null
	}
});
var r = fibos.transactionSync(tr => {
		tr.newaccount({
			creator: "creater_account",
			name: "your_account",
			owner: "your_owner_publicKey",
			active: "your_active_publicKey"
		});

		tr.buyrambytes({
			payer: "creater_account",
			receiver: "your_account",
			bytes: 4096
		});

		tr.delegatebw({
			from: "creater_account",
			receiver: "your_account",
			stake_net_quantity: '0.5000 FO',
			stake_cpu_quantity: '0.5000 FO',
			transfer: 1
		});
	});
console.log(r);
```

**参数说明:**

| 参数               | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| keyProvider        | 代创建者私钥                                                 |
| creator/payer/form | 代创建者账户名                                               |
| name/receiver      | 被创建者账户名                                               |
| owner              | 被创建者owner权限公钥                                        |
| active             | 被创建者active权限公钥(tips:owner和active权限公钥可以是一个) |

执行代码 `fibos createAccount.js `  打印如下信息(截取部分)，即可帮别人成功注册账号！

```
"act": {
          "account": "eosio",
          "name": "newaccount",
          "authorization": [
            {
              "actor": "eosyanghejiu",
              "permission": "active"
            }
          ],
          "data": {
            "creator": "eosyanghejiu",
            "name": "xinchengdai1",
            "owner": {
              "threshold": 1,
              "keys": [
                {
                  "key": "FO7yLv8FvFhFCjajcqgnJJFHBUnLLS9BYfZLymQXoDu7wL3a67Xr",
                  "weight": 1
                }
              ],
              "accounts": [],
              "waits": []
            },
            "active": {
              "threshold": 1,
              "keys": [
                {
                  "key": "FO7yLv8FvFhFCjajcqgnJJFHBUnLLS9BYfZLymQXoDu7wL3a67Xr",
                  "weight": 1
                }
              ],
              "accounts": [],
              "waits": []
            }
          },
```

