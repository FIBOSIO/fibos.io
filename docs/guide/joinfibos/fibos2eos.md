# 从 FIBOS 主网 跨链转账到 EOS 主网

```
- 重要提示：为防止出现跨链转账失败的情况：

1. 请再三确认 memo 的填写是否正确（ memo 请填写“您在 EOS 主网已注册成功的账户名”），一旦填错，可能会导致资产丢失：

2. 如果因您填写的 memo 账户不存在，导致资产丢失，则系统查到后，会将这笔资产转回您的打款账户；

3. 如果您填写的 memo 错误，但正好是其他人的 EOS 账户，那么很抱歉，这笔资产将无法转回您的账户。
```

## 注册一个 EOS 账户

注册 EOS 账户可使用现有钱包APP 创建，这里不再说明。 

## 从 FIBOS 到 EOS 的跨链转账

使用 FIBOS 主网的账户向 EOS 账户(fiboscouncil) 发起转账，memo 的内容填写 EOS 主网已经注册账户名称，即可完成一次跨链转账。

### 发起转账操作

**调用方法:**

```
let ctx = client.contractSync("eosio.token");
let result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo);
```

**方法说明:**

使用 fibos.js 客户端 调用 eosio.token 合约发起一笔转账操作

**参数说明**

| 参数           | 含义                   |
| -------------- | ---------------------- |
| eosaccount     | 转出方                 |
| "fiboscouncil" | 指定转入方             |
| value          | 数量:1.0000 EOS        |
| memo           | 备注:填入你已注册的 EOS 账号名 |


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
let value = "1.0000 EOS"; //转账 EOS 数量
let ctx = fibos_client.contractSync("eosio.token");
let memo = "eoseoseoseos"; //填入你已注册的 EOS 账号
let result = ctx.transferSync(fibosaccount, "fiboscouncil", value, memo, {
    authorization: fibosaccount
});
console.log(result);
```

### 在 EOS 主网查询转账信息

从 FIBOS 主网发起的跨链转账后，需要等待300个左右的安全区块时间，大约2分钟，才能在 EOS 主网查询到转账信息。

使用 EOS 的客户端查询，使用的是 EOS 主网的 chainID 以及 RPC 接口地址。

```
var FIBOS = require("fibos.js");
var config = {
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    httpEndpoint: "http://api-mainnet.starteos.io",
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
var rs = fibos_client.getTableRowsSync(true, "eosio.token", "你的 EOS 账户名", "accounts");
console.log(rs);
```


**实例说明:**

配置了 EOS 主网的 chainId 和 RPC 服务地址后,便初始化了一个 EOS 客户端,调用 `getTableRowsSync`方法，查询账户的资产信息。

