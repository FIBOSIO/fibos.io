# 启动一个FIBOS节点

## 一个简单的FIBOS节点

### 节点配置脚本(node.js)

```
var fibos = require('fibos');

fibos.load("http"); //rpc http service
fibos.load("chain");
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");

fibos.start();
```

### 启动节点

```
fibos node.js

```

## 一个自定义的FIBOS节点

### 自定义配置脚本(node.js)

```
var fibos = require('fibos');

fibos.load("http"); //rpc http service
fibos.load("chain");
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");

fibos.start();
```

#### 1. 开启BlockProducer

```
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});
```

### 2. 更改HTTP Service 配置

```
fibos.load("http",{
	"http-server-address": "127.0.0.1:8888", //配置开启服务的网络接口以及端口
	""
});

```

### 3. 初始化创世区块

```
fibos.load("chain",{
	"genesis-json":"./genesis-json.json"
});

```

genesis-json.json例子:

```
{
	"initial_timestamp": "2018-06-08T08:08:08.888",
	"initial_key": "EOS7EarnUhcyYqmdnPon8rm7mBCTnBoot6o7fE2WzjvEX2TdggbL3",
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
	}
}
```

### 4. 控制台调试输出

```
fibos.load("chain",{
	'contracts-console': true
});

```

### 5. 指定数据区块的目录

```
fibos.load("chain",{
	'blocks-dir': "./blocks-dir/"
});

```

## 使用FIBOS.JS与FIBOS交互
通过Fibjs与FIBOS.JS编写一个JS Client，它可以通过HTTP协议与FIBOS进行交互，让我们开始学习吧!

👉 【[使用FIBOS.JS与FIBOS交互](fibosjs.md)】