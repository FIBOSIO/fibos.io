# 如何在 FIBOS 中发行和销毁通证

> 学习本文档前，你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

相比于在 EOS 上发行通证的复杂性和高成本，在 FIBOS 上发行通证只需要两步:

1.拥有 FIBOS 账号

2.发行通证

## 拥有 FIBOS 账号

由于9.4日之后，FIBOS 官网关闭了免费注册 FIBOS 的通道，现在有两种方式可以获得 FIBOS 账号：

1.[下载 FO 钱包](http://wallet.fo/) 免费注册 FIBOS 账号

2.参考[如何帮助别人在 FIBOS 中创建账号](./createAccountnotfree.md) 一文，让已经拥有 FIBOS 账号的朋友替你注册一个 。

## 发行通证

发行通证调用 token 合约中的 `excreate` 接口，方法和参数名解释如下：

```javascript
void token::excreate(
  account_name issuer, // 通证发行账号
  asset maximum_supply, // 最大可发行通证数量
  double connector_weight, // 连接器权重
  asset maximum_exchange, // 最大可兑换(流通)的通证数量
  asset reserve_supply, // 未流通通证数量
  asset reserve_connector_balance // 未流通通证保证金数量
)
```

在 FIBOS 上你可以发行两种通证，一种是传统通证，一种智能通证。两种通证的不同点在于智能通证可以通过 bancor 协议进行兑换。如果还不了解什么是 bancor 协议的同学，可以参考 [bancor 协议中文白皮书](https://github.com/FIBOSIO/bancor) 一文。

#### 发行普通通证

```javascript
//初始化 fibos 客户端
...
let name = "fibostest123";
let ctx = fibos.contractSync("eosio.token");
let r = ctx.excreateSync(name, "100000000000.0000 ABC",  0, '0.0000 ABC','0.0000 ABC', '0.0000 FO', {
    authorization: name
});
console.log(r);
```

##### 增发普通通证

```javascript
//初始化 fibos 客户端
...
let name = "fibostest123";
let ctx = fibos.contractSync("eosio.token");
let r = ctx.exissueSync(name, "1000000.0000 ABC", "issue to fibostest123", {
				authorization: name
			})
console.log(r);
```

**Tips** : 只有普通通证可以进行增发操作，智能通证不支持增发！

#### 发行智能通证

```js
//初始化 fibos 客户端
...
let name = "fibostest123";
let ctx = fibos.contractSync("eosio.token");
let r = ctx.excreateSync(name, "100000000000.0000 AAA",  0.15,'10000000000.0000 AAA', '3000000000.0000 AAA', '90000.0000 FO', {
    authorization: name
});
console.log(r);
```

观察发行传统通证和创建智能通证的代码，我们不难发现，当一个通证的连接器权重（CW）值为0时，它就是传统通证。而对于智能通证来说，它必须要有对应的 cw（0-1之间）和 max_exchange。以及根据 bancor 协议计算出 reserve_supply 和 reserve_connector_balance。

#### FO 通证兑换智能通证

```javascript
//初始化 fibos 客户端
...
let ctx = fibos.contractSync("eosio.token");
let name = "fibostest123"
let result = ctx.exchangeSync(name, "1.0000 FO@eosio", `0.0000 AAA@fibostest123`, "exchange FO to AAA", {
    authorization: name
});
console.log(result);
```

##### 查询兑换的智能通证

```javascript
let rs = fibos.getTableRowsSync(true, "eosio.token", "fibostest123", "accounts");
console.log(rs);
```

#### 转账

```javascript
//初始化 fibos 客户端
...
let ctx = fibos.contractSync("eosio.token");
var r = ctx.extransferSync("fibostest123", "fibostest321", "10.0000 ADC@fibostest123", "trasnfer to fibostest321", {
			authorization: "fibostest123"
		});
console.log(r);
```

转账的目标账户必须要在 FIBOS 中存在，且转账的最大数量不能超过你的余额，精度也要与转账的 Token 精度一致。

### 销毁通证

```javascript
//初始化 fibos 客户端
...
let ctx = fibos.contractSync("eosio.token");
let r = ctx.exdestroySync(`0.0000 AAA@fibostest123`, {authorization: "fibostest123"});
```

当不再需要该通证时，调用 `exdestroySync` 方法来销毁通证。

**注意**：销毁通证需要**流通量为0**的时候才可以销毁，也就是说通证发行方需要收回市场上所有流通的通证后才能销毁通证。