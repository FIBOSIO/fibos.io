# 从 EOS 跨链转账到 FIBOS

```
- 重要提示：为防止出现跨链转账失败的情况：

1. 请勿直接通过交易所转账（建议使用 EOS 钱包转账），通过交易所转账时，一旦遇到 memo 填写错误的情况，则资产将会丢失且无法找回！

2. 请再三确认 memo 的填写是否正确（memo请填写“您在 FIBOS 主网已注册成功的账户名”），一旦填错，可能会导致资产丢失：

3. 如果因您填写的 memo 账户不存在，导致资产丢失，则系统查到后，会将这笔资产转回您的打款账户；

4. 如果您填写的 memo 错误，但正好是其他人的 FIBOS 账户，那么很抱歉，这笔资产将无法转回您的账户。
```

为了满足开发者能够在 FIBOS 主网上线后便可创建 FIBOS 账号，FIBOS 团队提供给开发者完整的开发文档。

学习本文档前,你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

## 注册一个 FIBOS 账户

上篇文章已经教会大家如何注册一个 FIBOS 账户。[如何帮助别人在 FIBOS 中创建账号](./createAccountnotfree.md) 

## 从 EOS 到 FIBOS 的跨链转账

使用 EOS 主网的账户向 EOS 账户(fiboscouncil) 发起转账，memo 的内容填写 FIBOS 主网已经注册账户名称，即可完成一次跨链转账。

### 在 EOS 主网发起转账操作

EOS 主网 RPC 地址(建议)：http://api-mainnet.starteos.io

```
var FIBOS = require("fibos.js");

var config = {
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    priKey: "你的 EOS active权限私钥",
    httpEndpoint: "http://api-mainnet.starteos.io",
    verbose: false,
};

var eos_client = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
let eosaccount = "" // 你的 EOS 账户名
let value = "1.0000 EOS"; //转账给 fiboscouncil 账户的数量
let ctx = eos_client.contractSync("eosio.token");
let memo = "fibosmainnet"; //填入已注册的 FIBOS 账号
let result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo, {
    authorization: eosaccount
});
console.log(result);
```

**实例说明:**

实例操作中,配置好EOS MainNet 和 EOS RPC 地址 和 EOS 私钥后,便初始化了一个 eos 客户端,通过调用 `transferSync` 方法,传入四个参数:

| 参数           | 含义                     |
| -------------- | ------------------------ |
| eosaccount     | 转出方                   |
| "fiboscouncil" | 转入方                  |
| value          | 数量:1.0000 EOS          |
| memo           | 填入已注册的 FIBOS 账号 |


### 在 FIBOS 主网查询转账信息
  
从 EOS 主网发起的跨链转账后，需要等待300个左右的安全区块时间，大约2分钟，才能在 FIBOS 主网查询到转账信息。

使用 FIBOS 的客户端查询，使用的是 FIBOS 主网的 chainID 以及 RPC 接口地址。


```
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
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

