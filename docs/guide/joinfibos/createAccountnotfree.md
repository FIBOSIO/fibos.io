# 如何帮助别人在 FIBOS 中创建账号

> Tips:我们将在9.4日关闭免费注册 FIBOS 账号通道，后续想要注册 FIBOS 账号的同学们，可以通过学习本文档，让已经拥有 FIBOS 账号的小伙伴替你创建!

学习本文档前，你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

### 生成 FIBOS 公私钥

> Tips:生成的公私钥对需要将私钥妥善保存，并且切勿向任何人泄漏你的私钥！请别人帮人注册 FIBOS 账号只需要提供你的公钥即可，任何以帮忙注册 FIBOS 账号为名索要你的私钥的创建者都是欺骗者！

- 使用 fibos.js 的 ecc 生成

```
var FIBOS = require("fibos.js");
var prikey = FIBOS.modules.ecc.randomKeySync(); //私钥
var pubkey = FIBOS.modules.ecc.privateToPublic(prikey); //公钥
console.log("公钥: %s\n私钥: %s",pubkey,prikey)
```

### 创建 FIBOS 账号

保存如下代码到 `createAccount.js` :

```
var FIBOS = require('fibos.js');
var fibos = FIBOS({
	chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
	keyProvider: "creator_priKey",
	httpEndpoint: "http://ca-rpc.fibos.io:8870",
	logger: {
		log: null,
		error: null
	}
});
var r = fibos.transactionSync(tr => {
		tr.newaccount({
			creator: "creator_account",
			name: "your_account",
			owner: "your_owner_publicKey",
			active: "your_active_publicKey"
		});

		tr.buyrambytes({
			payer: "creator_account",
			receiver: "your_account",
			bytes: 4096
		});

		tr.delegatebw({
			from: "creator_account",
			receiver: "your_account",
			stake_net_quantity: '0.1000 FO',
			stake_cpu_quantity: '0.1000 FO',
			transfer: 1
		});
	});
console.log(r);
```

上述代码中，一共调用了三个方法：`newaccount` 、`buyrambytes` 、`delegatebw`  ，下面简单的介绍下各个方法的作用和参数的含义。

**newaccount**：通过该方法进行新账号的创建，`creator` 创建者的账户名，`name` 被创建者的账户名，`owner` 被创建者账户 owner 权限公钥，`active` 被创建者 active 权限公钥，owner 和 active 权限公钥可以填写同一个。

**buyrambytes**: 在链上存贮账户信息是需要消耗内存的，创建者调用该方法为被创建者购买内存来存放新账户的信息。`payer` 和 `receiver`  分别为创建者和被创建者账户名。

**delegatebw**: 创建者为被创建者抵押 FO 获取 CPU 和 NET ，让新账户能够进行转账。`from` 和 `receiver` 为创建者和被创建者账户名。这里有个需要注意的地方是 `transfer` 参数，`1` 代表替别人抵押 FO 获取资源。如果你想要自己获取资源，那么 `from` 和 `recevier` 都填上你的账户名，并将  `transfer` 参数值修改为 `0`。

执行代码 `fibos createAccount.js` 打印如下信息(截取部分)，即可帮别人成功注册账号！

```
"act": {
          "account": "eosio",
          "name": "newaccount",
          "authorization": [
            {
              "actor": "fibostest123",
              "permission": "active"
            }
          ],
          "data": {
            "creator": "fibostest123",
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

 根据上面的打印信息，可以看到 `fibostest123` 账号创建了一个名为 `xinchengdai1` 的账号，下面 `xinchengdai1` 账号持有者就可以将私钥导入到 FO 钱包中来使用其中的各项功能啦！点击 [下载 FO 钱包](http://wallet.fo/) 来获取 FO 钱包吧 ~