# 一分钟加入 EOS TestNet

上一章节已经给大家讲解了如何加入到 FIBOS TestNet 网络，本章节将教会大家如何使用 FIBOS 快速的加入到 EOS 的 [测试网络](http://jungle.cryptolions.io/#home) ，以及如何进行一次成功的转账操作。

## 如何加入 EOS TestNet 网络
本章节涉及到代码的目录结构:

```
fibos_eos
    ├── sync_eos.js
    ├── transfer_test.js

```
新建目录：
```
mkdir fibos_eos
```

使用 FIBOS 加入 EOS TestNet 网络同步区块数据，十分便捷。将下面代码保存至工作目录 `sync_eos.js`:

```
var fibos = require('fibos');

fibos.config_dir = "./sync_data_Dir";
fibos.data_dir = "./sync_data_Dir";

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
 "http-server-address": "0.0.0.0:8888"
});

fibos.load("net", {
 "p2p-listen-endpoint": "0.0.0.0:9876",
 "p2p-peer-address": ["45.119.146.189:9876", "167.99.91.77:9876", "159.65.214.148:9876", "149.202.165.174:19876"]
});

fibos.load("producer");
fibos.load("chain", {
 "genesis-json": "./genesis.json"
});
fibos.load("chain_api");
fibos.load("wallet");
fibos.load("wallet_api");

fibos.start();
```

上述代码中，`fibos.config_dir` 和 `fibos.data_dir` 的路径配置在 `sync_eos.js` 同级目录，你可以指向任意位置，`p2p-peer-address` 是一个可变值，你可以去 EOS TestNet 网络上获取其它节点的信息替换本文中的配置。

`genesis.json` 文件中内容如下:

```
{
  "initial_timestamp": "2018-06-09T00:00:00.000",
  "initial_key": "EOS6CttW6XFfeRXaiqbD1Hoc9xPfVJrJ9RVZqA8tNTDLriNEyamFY",
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

我们也可以从 [EOS 测试网配置文件](https://github.com/CryptoLions/EOS-Jungle-Testnet/blob/aa499583d5e7f19799d93ab569e29b39741d1bb4/genesis.json) 获取上文中的 `genesis.json`，如果你想要同步 EOS 主网的区块数据，那就去  [EOS 主网配置文件](https://github.com/EOS-Mainnet/eos/blob/mainnet-1.1.3/mainnet-genesis.json) 获取 `genesis.json`。

运行代码即可同步 EOS TestNet 区块数据：

```
fibos sync_eos.js
```

没错，就是这么简单，让我们一起学起来吧！

## 发起一次成功的转账

想要在 EOS TestNet 上进行转账操作，首先我们需要注册一个账号，前往 [jugle](http://jungle.cryptolions.io/#account) 进行注册。按照要求填写即可完成注册，没有 EOS 地址的同学可以去 [这里](https://meet.one/generate.html) 生成公私钥。注册成功后在网站上点击 `Faucet` 输入你的账户名可以得到一万个 EOS 。

下面的代码是一个转账的示例，保存代码到工作目录 `transfer_test.js`

```
var test = require('test');
test.setup();
var FIBOS = require('fibos.js');
describe('FIBOS transfer with EOS', () => {
    before(function() {});

    it("FIBOS transfer with EOS", () => {
        let config = {
            chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', 
            keyProvider: 'your private key', 
            httpEndpoint: 'http://45.119.146.189:8888',
            logger: {
                log: null,
                error: null
            }
        }

        let accounta = FIBOS(config);
        let ctx = accounta.contractSync("eosio.token");
        let result = ctx.transferSync("your account name", "transfer to account name", 'amount', 'remark');
        console.warn('result: ', result);
    });
})

test.run(console.DEBUG);
process.exit();
```

你只需要在 `keyProvider` 配置上你的私钥，在 `transferSync` 方法中配置你的账户名，转账目标账户名(在 EOS 测试网中存在)，转账数额(小于等于你持有的 EOS 数量)和转账备注这些信息，保存并执行转账：

```
fibos transfer_test.js
```

执行成功后会打印如下日志：

```
 "broadcast": true,
  "transaction": {
    "compression": "none",
    "transaction": {
      "expiration": "2018-08-06T13:12:05",
      "ref_block_num": 51123,
      "ref_block_prefix": 836786951,
      "net_usage_words": 0,
      "max_cpu_usage_ms": 0,
      "delay_sec": 0,
      "context_free_actions": [],
      "actions": [
        {
          "account": "eosio.token",
          "name": "transfer",
          "authorization": [
            {
              "actor": "zzxisgod1124",
              "permission": "active"
            }
          ],
          "data": "10c42065bacea6e180277591e6ea2f3240420f000000000004454f5300000000087472616e73666572"
        }
      ],
      "transaction_extensions": []
    },
    "signatures": [
      "SIG_K1_KcwUJfUL8EdFFRLB8yhXFVrCtjDjzYqmX4gBkTNcQ7A6kxHseeQABRQNe6Jhf8S2dWnxhrisXU87UurPpsyuCppdP58SHs"
    ]
  },
  "transaction_id": "864ea4c8786dfa464f43b1c19e71f343fc9e94f6663cb0c7e93c6da085f1d30f",
```

50+行代码，1分钟部署和运行，FIBOS 实现了同步 EOS TestNet 区块数据和一次成功的转账操作，诠释了 FIBOS 的简捷之道！