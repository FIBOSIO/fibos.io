## 如何进行合约之间的相互调用

学习本文档前,你需要对 [FIBOS 的权限系统 ](./fibosauth.md)和 [如何发布 JS 合约](../start/deployContracts.md) 有一定了解

**注意: FIBOS 中一个账户只能发布一份合约,且合约名为账户名**

### 发布调用其他合约方法的合约

> 前提条件:用户 `fibostest123` 拥有发布一个合约的资源，包括足够的 RAM、CPU 和 NET

保存如下代码到 `inlinecall.js`

```javascript
//初始化 fibos 客户端
...
var account = "fibostest123"
//编写abi文件
 var abi = {
        "version": "eosio::abi/1.0",
        "structs": [{
            "name": "hi",
            "base": "",
            "fields": [
                {"name": "from","type": "name"}, 
                {"name": "to","type": "name"},
                {"name": "quantity","type": "extended_asset"}, 
                {"name": "memo","type": "string"}
             ]
            }],
        "actions": [{
            "name": "hi",
            "type": "hi",
            "ricardian_contract": ""
        }]
    };
fibos.setabiSync(account, abi, {
	authorization: account
});
//编写、部署JS合约
var js_code = `exports.hi = (from, to, quantity, memo) => {
            console.log(from, to, quantity, memo);
            trans.send_inline("eosio.token", "ctxtransfer", {
                from: from,
                to: to,
                quantity: quantity,
                memo: memo
            }, [{
                "actor": "${account}",
                "permission": "active"
            }]);
        };`;
//编译、部署JS合约
fibos.setcodeSync(account, 0, 0, fibos.compileCode(js_code), {
	authorization: account
});
//授权操作
fibos.updateauthSync({
    account: account,
    permission: "active",
    parent: 'owner',
    auth: {
    	threshold: 1,
        keys: [{
        key: "", //你的公钥
        weight: 1
        }],
     	"accounts": [{
			"permission": {
            "actor": account,
            "permission": "eosio.code"
            },
         "weight": 1
          }]
        }
}, {
authorization: account
});
//合约调用
var ctx = fibos.contractSync(account);
var r = ctx.hiSync(account, 'fibos', `100.0000 AAA@fibostest123`, 'test inline ctxtransfer', {
            authorization: account
});
```

上面代码中,一共进行了四个操作: `编写合约abi` 、 `编写部署JS合约` 、 `合约授权` 、 `调用合约`。

* 编写合约 abi

  > 如果你对如何编写abi文档不太了解,请参阅 [如何编写abi文档](../depth/whatisabi.md)

  abi 代码中,我们声明了一个名为`hi`的action,然后在 `hi` 的 action 中定义了四个参数: `from` 、 `to` 、 `quantity` 、 `memo` ,编写好 abi 文件后,调用了 `setabiSync` 的方法将abi部署。

* 编写部署 JS 合约

  JS 合约代码中,主要调用了全局的 `trans` 模块的 `send_inline` 方法,该方法的参数如下:

  ```c++
  /*
  @param account 合约的名称
  @param name action的名称
  @param args action的参数
  @param authorization action的权限
  */
  static send_inline(String account, String name, Object args, Array authorization = []);
  ```

  代码中,调用的**合约名称**为: `eosio.token` ,调用**合约的action**为: `ctxtransfer`,然后将 `ctxtransfer` 方法所需的四个参数传入,最后传入调用 action 的权限。编写好 JS 合约代码后,需要调用 `setcodeSync` 方法,将 JS 合约代码部署到主网上。

* 合约授权

  为了避免调用合约的用户的利益收到侵害, FIBSO 中合约调用 inline 方法涉及到权限操作时,需要用户主动向   `eosio.code` 该系统账户进行授权操作。主要调用 `updateauthSync` 方法。进行权限变更操作。

* 调用合约

  将合约部署到主网后,只需要调用 `contractSync` 方法,该方法的参数为合约名称。然后调用合约 `fibostest123` 中的 `hi` 的 action,同时传入 action 的四个参数。这样我们就可以通过 `fibostest123` 合约的 `hi` 的action来调用 `eosio.token` 合约的 `ctxtransfer` action。