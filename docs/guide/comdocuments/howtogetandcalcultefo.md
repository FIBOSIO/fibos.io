# 如何查询和计算 FO 兑换比例

> FIBOS 主网上线两周以来，众多用户都通过跨链转账通道进行 EOS 和 FO 的兑换，很多人好奇 EOS 与 FO 的兑换比例是怎么得到的。今天将教会大家如何查询和计算 FO 兑换比例。

### 查询 FO 兑换比例

#### 区块浏览器查询

我们可以在 [FIBOS区块浏览器](http://explorer.fibos.rocks/) 上直接查询到 FO 当前预计兑换比率、跨链账户余额、内存（RAM）当前价格等信息。

#### 调用接口查询

除了直接在区块浏览器上查询，我们也可以通过调用接口 `https://fibos.io/1.0/app/getExchangeInfo` 的方式来快速查询当前 FO 兑换比例。

那么这个比例是如何计算出来的呢？下面将通过一段代码给大家讲解如何获取 FO 兑换比例。

### 计算当前 FO 兑换比例

保存下面代码到 `getExchangeInfo.js` :

```js
const FIBOS = require("fibos.js");
const BigNumber = require('bignumber.js');

var config = {
	"chainId": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
	"httpEndpoint": "http://ca-rpc.fibos.io:8870",
};

// new FIBOS client
var fibos = FIBOS({
	chainId: config["chainId"],
	httpEndpoint: config["httpEndpoint"],
	logger: {
		log: null,
		error: null
	}
});

function getPercent() {

	let result = fibos.getTableRowsSync(true, 'eosio.token', 'eosio', 'stats');

	let rows = result.rows;
	let price = 0;
	if (!!rows && rows instanceof Array) {
		rows.forEach((item, index) => {
			if (!!item && item.supply && item.supply.indexOf('FO') >= 0) {
				const {
					connector_weight,
					reserve_connector_balance,
					connector_balance,
					reserve_supply,
					supply
				} = item;

				const supply_numStr = supply.split(' FO')[0]
				let supply_numPre = 0
				if (!!supply_numStr && supply_numStr.split('.').length >= 2) {
					supply_numPre = supply_numStr.split('.')[1].length
				}
				const b_supply = new BigNumber(supply_numStr)
				const b_reserve_supply = new BigNumber(reserve_supply.split(' FO')[0])
				const b_cw = new BigNumber(connector_weight)
				const b_balances = new BigNumber(connector_balance.split(' EOS')[0]).plus(
					new BigNumber(reserve_connector_balance.split(' EOS')[0])
				)

				price = (b_cw.times(b_reserve_supply.plus(b_supply))).div(b_balances)
					.toFixed(supply_numPre, 8);
			}
		})
	}
	return price;
}

let price = getPercent();
setInterval(() => {
	price = getPercent();
	console.notice("Current percent is : 1 EOS =  " + price + " FO");
}, 1000);
```

上述代码中，我们首先通过查询 `stats` 中 `eosio` 账号发行的所有智能通证，然后获取到 `FO` 通证的 `connector_weight` 、`reserve_connector_balance`、`connector_balance`、`reserve_supply` 和 `supply` 值，最后通过 `Bancor` 协议中的公式计算出当前的 `FO` 兑换比例！

执行代码 `fibos getExchangeInfo.js` 即可得到 FO 实时兑换比例。