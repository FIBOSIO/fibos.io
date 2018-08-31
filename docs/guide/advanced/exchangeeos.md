上文已经教会了大家如何加入 FIBOS 兑换 FO，本文将教会大家如何将 FIBOS 链上的 FO 兑换成 EOS 链上的 EOS！

# FO 兑换 EOS 教程

学习本文档前,你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

## 兑换通证

FIBOS 主网部分 RPC 地址如下所示:

| 位置     | RPC 地址             |
| -------- | -------------------- |
| 新加坡   | http://se-rpc.fibos.io:8870 |
| 首尔     | http://sl-rpc.fibos.io:8870 |
| 东京     | http://to-rpc.fibos.io:8870 |
| 加拿大   | http://ca-rpc.fibos.io:8870 |
| 伦敦     | http://ln-rpc.fibos.io:8870 |
| 弗吉尼亚 | http://va-rpc.fibos.io:8870 |

**调用方法:**

```
let ctx = client.contractSync("eosio.token");
let result = ctx.exchangeSync(owner, quantity, tosymbol, memo);
```

**方法说明:**

 使用 `exchangeSync()` 方法,在 FIBOS 上使用 Bancor 进行 FO 与 EOS 通证之间兑换

**实例:**

```
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "你的 FIBOS 私钥",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos_client = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})

let ctx = fibos_client.contractSync("eosio.token");
var result = ctx.exchangeSync("你的 FIBOS 账户名", `10.0000 FO@eosio`, `0.0000 EOS@eosio`, `exchange FO to EOS`, {
    authorization: "你的FIBOS账户名"
});
console.log(result);
```

**实例说明:**

上述代码的含义为将自己的 10.0 FO 通过 Bancor 算法智能兑换成 EOS ,其中四个参数的含义为:

| 参数     | 含义             |
| -------- | ---------------- |
| owner    | 兑换账号         |
| quantity | 兑换通证数量     |
| tosymbol | 兑换通证目标类型 |
| memo     | 备注             |



## 进行 FIBOS 和 EOS 跨链转账

- 重要提示：为防止出现跨链转账失败的情况：

- - 请再三确认memo的填写是否正确（memo请填写“您的 EOS 账号”），一旦填错，可能会导致资产丢失：

  - - 如果因您填写的memo账户不存在，导致资产丢失，则系统查到后，会将这笔资产转回您的打款账户；
    - 如果您填写的memo错误，但正好是其他人的 EOS 账户，那么很抱歉，这笔资产将无法转回您的账户。

* 使用 FIBOS 客户端

  #### 查询 EOS 余额

    **调用方法:**

  ```
  //初始化一个 fibos_client 客户端
  fibos_client.getTableRowsSync(true, "eosio.token", "你的 FIBOS 账户名", "accounts");
  ```

    **方法说明:**

    使用  `getTableRowsSync`  方法查询用户eosio.token 合约中的数据

    **实例:**

   `FIBOS MainNet 主网RPC地址` 见 [FIBOS 账号注册教程](createAccount.md)。

  ```
  var FIBOS = require("fibos.js");
  var config = {
      chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
      priKey: "",
      httpEndpoint: "http://ca-rpc.fibos.io:8870",
      verbose: false,
  }
  var fibos_client = FIBOS({
      chainId: config.chainId,
      keyProvider: config.priKey,
      httpEndpoint: config.httpEndpoint,
      verbose: false,
      logger: {
          log: null,
          error: null
      }
  })
  var rs = fibos_client.getTableRowsSync(true, "eosio.token", "你的 FIBOS 账户名", "accounts");
  console.log(rs);
  ```

    **实例说明:**

    配置了 FIBOS 主网的 chainId 和 Http 服务地址后,便初始化了一个 FIBOS 客户端,调用 `getTableRowsSync`方法，查询账户的资产信息。

  #### 发起转账操作

  **调用方法:**

  ```
  let ctx = client.contractSync("eosio.token");
  let result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo);
  ```

  **方法说明:**

  使用 fibos.js 客户端 调用 eosio.token 合约发起一笔转账操作

  **实例**

```
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "你的 FIBOS 私钥",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos_client = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
let fibosaccount = "" // 你的 FIBOS 账户名
let value = "1.0000" + " EOS"; //转账 EOS 数量
let ctx = fibos_client.contractSync("eosio.token");
let memo = "eoseoseoseos"; //填入你的 EOS 账号
let result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo);
console.log(result);
```

  **实例说明:**

  实例操作中,配置好FIBOS MainNet 和 FIBOS RPC 地址 和 FIBOS 私钥后,便初始化了一个 FIBOS 客户端,通过调用 `transferSync` 方法,传入四个参数:

| 参数           | 含义                     |
| -------------- | ------------------------ |
| eosaccount     | 转出方                   |
| "fiboscouncil" | 指定转入方               |
| value          | 数量:1.0000 EOS          |
| memo           | 备注:填入你 FIBOS 账号名 |


