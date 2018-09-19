# FIBOS 主网信息

## FIBOS 主网上线公告

UTC 时间 2018 年 8 月 28 日 0 时，FIBOS 主网上线成功。新加坡、首尔、东京、加拿大、弗吉尼亚五大节点接入成功，均已成功出块。

主网上线以后引起了强烈反响，那么如何加入 FIBOS 兑换 FO 呢？本文将带你详细了解兑换流程。

FO 通证的基础情况如下：

【通证规划】初始发行量 100 亿，开放兑换 50 %，保留通证 50 %（开发团队 10 %，机构预留 20 %，社区基金20 %）。

【保留通证】合计 50 亿，不可流通，兑换。在填充完相应保留通证准备金后，相应部分的通证才能解锁。解锁后的通证才能进行兑换、抵押以及买卖RAM等操作。

【起始换算】1 EOS = 1000 FO

【初始 CW 】11%， CW 值会根据项目发展情况自动调整（包含但不限于节点发工资、销毁RAM手续费以及域名拍卖费用）。

## FIBOS 主网配置信息

FIBOS 主网 chainID: `6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a`


`genesis.json` 文件：

```
{
	"initial_timestamp": "2018-08-28T00:00:00.000",
	"initial_key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
	"initial_configuration": {
		"max_block_net_usage": 1048576,
		"target_block_net_usage_pct": 1000,
		"max_transaction_net_usage": 524288,
		"base_per_transaction_net_usage": 12,
		"net_usage_leeway": 500,
		"context_free_discount_net_usage_num": 20,
		"context_free_discount_net_usage_den": 100,
		"max_block_cpu_usage": 200000,
		"target_block_cpu_usage_pct": 1000,
		"max_transaction_cpu_usage": 150000,
		"min_transaction_cpu_usage": 100,
		"max_transaction_lifetime": 3600,
		"deferred_trx_expiration_window": 600,
		"max_transaction_delay": 3888000,
		"max_inline_action_size": 4096,
		"max_inline_action_depth": 4,
		"max_authority_depth": 6
	},
	"initial_chain_id": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a"
}
```