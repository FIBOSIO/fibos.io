# 在 FIBOS 中 EOS 通证与 FO 通证相互兑换

上篇学习了如何在从 EOS 主网转账到 FIBOS 主网的账户上，现在你在 FIBOS 主网上拥有了一定数量的 EOS 通证，那么让我们来看看如何把 EOS 通证兑换成 FO 通证。

## EOS 通证兑换 FO 通证

整个兑换过程是在 FIBOS 主网执行，所以使用的是执行过程中使用的是 FIBOS 主网的私钥以及账户信息。

```javascript
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "你的 FIBOS 主网私钥",
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
```

**调用方法:**

```javascript
let ctx = client.contractSync("eosio.token");
let result = ctx.exchangeSync(owner, quantity, tosymbol, memo);
```

**方法说明:**

使用 `exchangeSync()` 方法,在 FIBOS 使用 Bancor 进行通证之间兑换

**参数说明:**

| 参数     | 含义             |
| -------- | ---------------- |
| owner    | 兑换账号         |
| quantity | 兑换通证数量     |
| tosymbol | 兑换通证目标类型 |
| memo | 兑换备注信息 |

### 发起 EOS 兑换 FO

```javascript
let ctx = fibos_client.contractSync("eosio.token");
let owner = "你的 FIBOS 账户名";
let eos2fo_quantity = "10.0000 EOS@eosio";
let memo = "exchange EOS to FO";

var result = ctx.exchangeSync(owner, eos2fo_quantity, `0.0000 FO@eosio`, memo, {
    authorization: owner
});
console.log(result);
```


### 查询兑换的 FO 通证

```javascript
var rs = fibos_client.getTableRowsSync(true, "eosio.token", "你的 FIBOS 账户名", "accounts");
console.log(rs);
```

## FO 通证兑换 EOS 通证

上面我们学会了在 FIBOS 主网中 EOS 如何兑换 FO，下面我们来看下 FO 如何兑换 EOS。


### 发起 FO 兑换 EOS

```javascript
let ctx = fibos_client.contractSync("eosio.token");
let owner = "你的 FIBOS 账户名";
let fo2eos_quantity = "10.0000 FO@eosio";
let memo = "exchange FO to EOS";

var result = ctx.exchangeSync(owner, fo2eos_quantity, `0.0000 EOS@eosio`, memo, {
    authorization: owner
});
console.log(result);
```

### 查询兑换的 EOS 通证

```javascript
var rs = fibos_client.getTableRowsSync(true, "eosio.token", "你的 FIBOS 账户名", "accounts");
console.log(rs);
```
