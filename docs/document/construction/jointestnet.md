# 如何加入到 TestNet 网络

阅读完本章后你可以通过脚本加入 FIBOS 的 TestNet 网络，你可以成为一个同步节点存在，也可以使用脚本注册申请成为 BP，让我们开始吧！

阅读完上面几章，你已经知道如何安装 FIBOS，并且运行 FIBOS 节点服务了，加入 FIBOS 的 TestNet 网络需要安装 FIBOS。

加入FIBOS TestNet 网络配置需要涉及几个关键信息：

1. 获得 TestNet 的 chainId 

```
chainId : "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a"
```

2. 提供 P2P 监听的地址以及端口

```
"p2p-listen-endpoint" : "0.0.0.0:9870"
```
3. 区块数据同步的目标节点信息

目前 TestNet 节点信息，请查阅下面的节点列表, `testnet.fibos.fo:9870` 是网络根 BP 节点网络信息。

```
"p2p-peer-address" : "testnet.fibos.fo:9870"
```

- 本章涉及的目录结构列表：

```
testNet
└── join
    ├── producer_node.js
    ├── register_bp.js
    ├── sync_node.js
    └── vote_bp.js
```

- 本章示例代码地址：https://github.com/FIBOSIO/samples
- `genesis.json` 文件：

```json
{
    "initial_timestamp": "2018-08-01T00:00:00.000",
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
    "initial_chain_id": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a"
}
```



## 如何成为一个 FIBOS 同步节点

如果节点仅仅作为同步 FIBOS 区块数据，非常简单。以下代码保存至 `sync_node.js`:

```
var fibos = require('fibos');

fibos.config_dir = "sync_data_Dir";
fibos.data_dir = "sync_data_Dir";

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": "0.0.0.0:8870"
});

fibos.load("net", {
	"p2p-listen-endpoint": "0.0.0.0:9870",
	"p2p-peer-address": ["testnet.fibos.fo:9870"]
});

fibos.load("producer");
fibos.load("chain", {
	"delete-all-blocks": true
});
fibos.load("chain_api");

fibos.start();
```

上述代码中，`net` 模块中的 `p2p-peer-address` 是一个可变值，请注意修改。


运行同步节点:

```
fibos sync_node.js
```

## 如何成为一个 FIBOS TestNet 的 BP 节点

(* BP 区块生产者)

> 重要提示：使用 Producer 身份发起注册申请，最好 producer key 不要和 active key 一样！

如果节点需要申请注册成为 FIBOS TestNet 的 区块生产者，需要涉及到3个方面：

- 配置 Producer 信息启动 FIBOS 节点服务
- 使用 Producer 身份发起注册申请
- 发起投票使得成为 Producer

### 配置Producer信息启动 FIBOS 节点服务

只有投票数量达到一定的数量，FIBOS 节点才会真正的成为 Producer，拥有生产区块的权限，其他情况仅仅作为同步区块数据的身份存在。

以下代码实现了配置一个 Producer，保存代码至 `producer_node.js`:

```
var fibos = require('fibos');
var fs = require("fs");
var config = {
	"producer-name": "producer-name",
	"public-key": "producer public key",
	"private-key": "producer private key"
};


console.notice("正在启动FIBOS name:", config["producer-name"]);
fibos.config_dir = config["producer-name"] + "_Dir";
fibos.data_dir = config["producer-name"] + "_Dir"

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

if (fs.exists(fibos.data_dir) || fs.exists(fibos.config_dir)) {
	console.warn("data_dir or config_dir is exists");
	process.exit(-1);
}

fibos.load("http", {
	"http-server-address": "0.0.0.0:8870"
});

fibos.load("net", {
	"p2p-listen-endpoint": "0.0.0.0:9870",
	"p2p-peer-address": "testnet.fibos.fo:9870"
});

fibos.load("producer", {
	'producer-name': config["producer-name"],
	'enable-stale-production': true,
	'private-key': JSON.stringify([config["public-key"], config["private-key"]])
});

fibos.load("chain");
fibos.load("chain_api");

fibos.start();
```

上述代码中可变配置说明：

```
var config = {
	"producer-name": "producer-name", // producer名称
	"public-key": "producer public key", //producer 公钥
	"private-key": "producer private key" //producer 私钥
};
```


运行 Producer 节点:

```
fibos producer_node.js
```

### 使用Producer身份发起注册申请

使用 `fibos.js` 调用 FIBOS 节点服务发起注册申请，请看下面的示例，以下代码保存至 `register_bp.js`:

```
var FIBOS = require('fibos.js');
var config = {
	"chainId": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a",
	"producer-name": "producer-name",
	"public-key": "producer public key",
	"private-key": "producer private key",
	"httpEndpoint": "bp network info",
	"url": "http://producer-name.io"
};

var fibos = FIBOS({
	chainId: config["chainId"],
	keyProvider: config["private-key"],
	httpEndpoint: config["httpEndpoint"],
	logger: {
		log: null,
		error: null
	}
});

var ctx = fibos.contractSync("eosio");

ctx.regproducerSync(config["producer-name"], config["public-key"], config["url"], 1);
```

以上代码依赖 `fibos.js` 库，如果你还不了解此，请查阅[使用 fibos.js 与 FIBOS 交互](../start/fibosjs.md)

配置说明：

```
var config = {
	"chainId": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a", // TestNet节点chainID
	"producer-name": "producer-name", //producer名称
	"public-key": "producer public key", //producer公钥
	"private-key": "producer private key", //producer私钥
	"httpEndpoint": "bp network info", //BP 节点信息，如： http://127.0.0.1:8888
	"url": "http://producer-name.io" //producer 官网信息
};
```


执行注册：

```
fibos register_bp.js
```

### 发起投票使得成为 Producer

Producer 可以为自己投票，请查看下面的示例代码，保存代码至 `vote_bp.js`

```
var FIBOS = require('fibos.js');
var config = {
	"chainId": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a",
	"producer-name": "producer-name",
	"public-key": "producer public key",
	"private-key": "producer private key",
	"httpEndpoint": "bp network info",
	"url": "http://producer-name.io"
};

var fibos = FIBOS({
	chainId: config["chainId"],
	keyProvider: config["private-key"],
	httpEndpoint: config["httpEndpoint"],
	logger: {
		log: null,
		error: null
	}
});

var ctx = fibos.contractSync("eosio");

ctx.voteproducerSync(config["producer-name"], "", ["producer-name"]);

```

配置说明与上述申请注册成为 BP 一致。

执行投票:

```
fibos vote_bp.js
```

注意：投票结束后，排名必须在TOP 21前才可以被选为区块生产者 BP。

