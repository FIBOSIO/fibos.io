# 如何成为 FIBOS 主网上的一个 BP 节点

UTC 时间 2018 年 8 月 28 日 0 时，FIBOS 主网上线成功。新加坡、首尔、东京、加拿大、弗吉尼亚五大节点接入成功，均已成功出块。

主网上线以后引起了强烈反响，那么如何加入 FIBOS 注册成为一个 BP 节点呢？本文将带你详细了解如何成为一个 BP ，进行投票以及领取工资。

### 配置 Producer 信息启动 FIBOS 节点服务

如何配置 Producer 信息启动 FIBOS 节点服务，在 [如何加入到 FIBOS TestNet?](../development/jointestnet.md) 一文中已经作了详细的介绍，本文就不再赘述。只不过需要将测试网的配置信息修改为主网的配置。

### 使用 Producer 身份发起注册申请

- FIBOS 主网部分 RPC 地址如下所示:

| 位置     | RPC 地址                    |
| -------- | --------------------------- |
| 新加坡   | http://se-rpc.fibos.io:8870 |
| 首尔     | http://sl-rpc.fibos.io:8870 |
| 东京     | http://to-rpc.fibos.io:8870 |
| 加拿大   | http://ca-rpc.fibos.io:8870 |
| 伦敦     | http://ln-rpc.fibos.io:8870 |
| 弗吉尼亚 | http://va-rpc.fibos.io:8870 |



  **调用方法:**

  ```javascript
//初始化一个 fibos 客户端
var ctx = fibos.contractSync("eosio");
var a = ctx.regproducerSync("prducerName", "publickey", "url", "location");
  ```

  **方法说明:**

  使用 fibos.js 客户端 调用 eosio 合约发起注册 BP 操作

  **实例**

```javascript
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "producer privateKey",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
var publicKey = "";//producer publicKey
var producerName = "";//producer name
var ctx = fibos.contractSync("eosio");
var a = ctx.regproducerSync(producerName, publicKey, "http://" + producerName + ".io", 1);
console.log(result);
```

  **实例说明:**

  实例操作中,配置好FIBOS MainNet 和 FIBOS RPC 地址 和 FIBOS 私钥后,便初始化了一个 FIBOS 客户端,通过调用 `regproducerSync` 方法,传入四个参数:

| 参数         | 含义                 |
| ------------ | -------------------- |
| producerName | 区块生产者账户名     |
| publicKey    | 区块生产者公钥       |
| url          | 区块生产者宣传网站   |
| location     | 区块生产者服务器地址 |



### 获取投票数成为 Producer

成为 BP 需要获得一定数量的投票数，你可以让别人给你投票，也可以自己给自己投票。投票需要抵押 FO 获取资源，下面教会大家如何抵押资源以及进行投票

#### 抵押资源

  **调用方法:**

  ```javascript
//初始化一个 fibos 客户端
var ctx = fibos.contractSync("eosio");
var a = ctx.delegatebwSync({
	from: "buyer_name",
	receiver: "recevier_name",
	stake_net_quantity: "quality",
	stake_cpu_quantity: "quality",
	transfer: 0
});
  ```

  **方法说明:**

  使用  `delegatebwSync`  方法抵押 EOS 获取 NET 和 CPU 资源，用来投票。

  **实例:**

  ```javascript
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "privateKey",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
var ctx = fibos.contractSync("eosio");
ctx.delegatebwSync({
	from: "fibostest123",
	receiver: "fibostest123",
	stake_net_quantity: "1.0000 FO",
	stake_cpu_quantity: "1.0000 FO",
	transfer: 0
});
  ```

  **实例说明:**

  配置了 FIBOS 主网的 chainId 和 Http 服务地址后,便初始化了一个 FIBOS 客户端,调用  `delegatebwSync` 方法，抵押 FO 获取资源。

| 参数               | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| from               | 抵押资源者                                                   |
| receiver           | 资源接收者                                                   |
| stake_net_quantity | 获取 Net 抵押的 FO 数量                                      |
| stake_cpu_quantity | 获取 Cpu 抵押的 FO 数量                                      |
| transfer           | 0:recevier 和 from 相同，表示为自己抵押 ；1:recevier 和 from 不同,表示为他人抵押资源 |

#### 进行投票

**调用方法:**

```javascript
//初始化一个 fibos 客户端
var ctx = fibos.contractSync("eosio");
var a = ctx.voteproducerSync("voter", "proxy", "producers");
```

**方法说明:**

 使用 `voteproducerSync` 方法,来给 BP 进行投票

**实例:**

```javascript
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "privateKey",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
var ctx = fibos.contractSync("eosio");

var a = ctx.voteproducerSync("fibostest123", "", "fibosbpnode1");
```

**实例说明:**

上述代码的含义为 `fibostest123` 这个用户给 `fibosbpnode1`  投票 ,中间空着的参数为代理，不填表示直接给 BP 投票，填入则是通过代理给 BP 投票。



### 领取奖励

成为 BP 并成功出块后，会获得相应的奖励，可以调用下面的接口来领取奖励：

**调用方法:**

```javascript
//初始化一个 fibos 客户端
var a = fibos.claimrewardsSync("producer");
```

**方法说明:**

 使用 `claimrewardsSync` 方法,来领取 BP 奖励

**实例:**

```javascript
var FIBOS = require("fibos.js");
var config = {
    chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    priKey: "producer_privateKey",
    httpEndpoint: "http://ca-rpc.fibos.io:8870",
    verbose: false,
}
var fibos = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})
var a = fibos.claimrewardsSync("fibosbpnode1")
```

**实例说明:**

上述代码的含义为  `fibosbpnode1`  领取了自己出块获得的奖励!



