# FIBOS 主网上线

UTC 时间 2018 年 8 月 28 日 0 时，FIBOS 主网上线成功。新加坡、首尔、东京、加拿大、弗吉尼亚五大节点接入成功，均已成功出块。

主网上线以后引起了强烈反响，那么如何加入 FIBOS 兑换 FO 呢？本文将带你详细了解兑换流程。

FO 通证的基础情况如下：

【通证规划】合计 100 亿，开放兑换 50 %，保留通证 50 %（开发团队 10 %，机构预留 20 %，社区基金20 %）。

【保留通证】合计 50 亿，不可流通，兑换。在填充完相应保留通证准备金后，相应部分的通证才能解锁。解锁后的通证才能进行兑换、抵押以及买卖RAM等操作。

【起始换算】1 EOS = 1000 FO

【初始 CW 】11%， CW 值会根据项目发展情况自动调整（包含但不限于节点发工资、销毁RAM手续费以及域名拍卖费用）。

# FO 兑换教程

为了满足开发者能够在 FIBOS 主网上线后便可创建 FIBOS 账号，FIBOS 团队提供给开发者完整的开发文档。

学习本文档前,你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

### 生成一个 FIBOS 公私钥

* 使用 fibos.js 的 ecc 生成

```
var prikey = FIBOS.modules.ecc.randomKeySync(); //私钥
var pubkey = FIBOS.modules.ecc.privateToPublic(prikey); //公钥
```

### 免费创建一个 FIBOS 账号

* 使用 HTTP Server

**请求 URL:**

```
http://tunnel.fibos.io/1.0/app/token/create
```

**请求方式:**

```
POST
```

**参数:**

| 参数名  | 必选 | 类型   | 说明         |
| ------- | ---- | ------ | ------------ |
| account | yes  | String | FIBOS 账户名 |
| pubkey  | yes  | String | FO 公钥      |

> 注意:FIBOS 账户数字必须是1-5，字母a-z(小写)，长度必须为12位

**实例:**

```
var http = require('http');
var httpClient = new http.Client();
var httpServerHost = "http://tunnel.fibos.io/1.0/app/token/create";
var account = "xxx";  //你的 FIBOS 账户名
var pubkey = "xxx"; //你的 FIBOS 公钥
var rep = httpClient.post(httpServerHost, {
    json: {
        account: account,
        pubkey: pubkey
    }
}).json()
console.log(rep);
```

> 基于 FIBOS 实现HTTP Clinet

**返回实例:**

```
{
    "message": "success",
    "pubkey": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "account": "fibosmainnet"
}
```

返回 message 为 success 时,证明你本次账号创建成功。

### 进行 EOS 和 FIBOS 跨链转账

- 重要提示：为防止出现跨链转账失败的情况：

- - 请勿直接通过交易所转账（建议使用EOS钱包转账），通过交易所转账时，一旦遇到memo填写错误的情况，则资产将会丢失且无法找回！

  - 请再三确认memo的填写是否正确（memo请填写“您在FIBOS已注册成功的账户名”），一旦填错，可能会导致资产丢失：

  - - 如果因您填写的memo账户不存在，导致资产丢失，则系统查到后，会将这笔资产转回您的打款账户；
    - 如果您填写的memo错误，但正好是其他人的FIBOS账户，那么很抱歉，这笔资产将无法转回您的账户。

* 使用 FIBOS 客户端

  #### 发起转账操作

  FIBOS 主网部分 RPC 地址如下所示:

| 位置     | RPC 地址                    |
| -------- | --------------------------- |
| 新加坡   | http://se-rpc.fibos.io:8870 |
| 首尔     | http://sl-rpc.fibos.io:8870 |
| 东京     | http://to-rpc.fibos.io:8870 |
| 加拿大   | http://ca-rpc.fibos.io:8870 |
| 伦敦     | http://ln-rpc.fibos.io:8870 |
| 弗吉尼亚 | http://va-rpc.fibos.io:8870 |

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
    chainId: "EOS MainNet 主网chainId",
    priKey: "你的 EOS 私钥",
    httpEndpoint: "EOS MainNet 主网RPC地址",
    verbose: false,
}
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
let value = "1.0000" + " EOS"; //兑换 EOS 数量
let ctx = eos_client.contractSync("eosio.token");
let memo = "fibosmainnet"; //填入你的fibso 账号
let result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo);
console.log(result);
```

  **实例说明:**

  实例操作中,配置好EOS MainNet 和 EOS RPC 地址 和 EOS 私钥后,便初始化了一个 eos 客户端,通过调用 `transferSync` 方法,传入四个参数:

| 参数         | 含义                      |
| ------------ | ------------------------- |
| eosaccount   | 转出方                    |
| fiboscouncil | 转入方                    |
| value        | 数量:1.0000 EOS           |
| memo         | 备注 /填入你 FIBOS 账号名 |

  #### 查询 FIBOS 余额

  **调用方法:**

  ```
//初始化一个 fibso_client 客户端
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



#### 兑换通证

**调用方法:**

```
let ctx = client.contractSync("eosio.token");
let result = ctx.exchangeSync(owner, quantity, tosymbol, memo);
```

**方法说明:**

 使用 `exchangeSync()` 方法,在 FIBOS 使用 Bancor 进行通证之间兑换

**实例:**

其中 `FIBOS MainNet 主网RPC地址` 见 [FIBOS 账号注册教程](createAccount.md)。

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
var result = ctx.exchangeSync("你的 FIBOS 账户名", `10.0000 EOS@eosio`, `0.0000 FO@eosio`, `exchange EOS to FO`, {
    authorization: "你的FIBOS账户名"
});
console.log(result);
```

**实例说明:**

上述代码的含义为将自己的 10.0 EOS 通过 Bancor 算法智能兑换成 FO,其中四个参数的含义为:

| 参数     | 含义             |
| -------- | ---------------- |
| owner    | 兑换账号         |
| quantity | 兑换通证数量     |
| tosymbol | 兑换通证目标类型 |
| memo     | 备注             |