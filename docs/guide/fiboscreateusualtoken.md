# 如何在 FIBOS 上一键发行传统通证

相比于在 EOS 上发行通证的复杂性和高成本，在 FIBOS 上发行通证只需要两步:

1.创建账号

2.发行通证

 在 FIBOS 上发行通证需要使用 FIBOS 账号，并确保账号中拥有4 KB 以上的内存，并抵押1.0000 FO 以上的 CPU 和 NET 。

下文将以 FIBOS 测试网为例，在上面发行一款名为 `ORIO` 的通证。学完之后，你也可以像我一样发行一款属于自己的通证啦！

## 1.创建账号

在 [FIBOS TestNet](http://103.80.170.107:8080/) 上创建一个账号非常简单，只需要输入你的公钥和你想要取的名字，点击 `开始申请` 就可以生成一个属于你自己的 FIBOS 账号啦，本文创建一个叫 `fibostest111` 的账号用作示范，下面让我们来看下刚刚创建的这个账号的信息。

```
"account_name": "fibostest111",
  "head_block_num": 185566,
  "head_block_time": "2018-08-11T01:37:38.500",
  "privileged": false,
  "last_code_update": "1970-01-01T00:00:00.000",
  "created": "2018-08-10T14:24:48.500",
  "core_liquid_balance": "100.0000 FO",
  "ram_quota": 4073,
  "net_weight": 500000,
  "cpu_weight": 500000,
  "net_limit": {
    "used": 0,
    "available": 22649209,
    "max": 22649209
  },
  "cpu_limit": {
    "used": 0,
    "available": 4319993,
    "max": 4319993
  },
  "ram_usage": 3446,
  "permissions": [
    {
      "perm_name": "active",
      "parent": "owner",
      "required_auth": {
        "threshold": 1,
        "keys": [
          {
            "key": "EOS7qbpGGmoiFXj7wnJFdZxCH8b8mUzD34pTTKR5DMkpcyTCBDc3Y",
            "weight": 1
          }
        ],
        "accounts": [],
        "waits": []
      }
    },
    {
      "perm_name": "owner",
      "parent": "",
      "required_auth": {
        "threshold": 1,
        "keys": [
          {
            "key": "EOS7qbpGGmoiFXj7wnJFdZxCH8b8mUzD34pTTKR5DMkpcyTCBDc3Y",
            "weight": 1
          }
        ],
        "accounts": [],
        "waits": []
      }
    }
  ],
  "total_resources": {
    "owner": "fibostest111",
    "net_weight": "50.0000 FO",
    "cpu_weight": "50.0000 FO",
    "ram_bytes": 4073
  },
```

可以看到账户名叫 `fibostest111`  ,拥有 4073 bytes 的 RAM，并抵押了价值 50.0000 FO 的 CPU 和 NET 资源，该账号的 `owner` 和  `active`  权限都属于 `fibostest111` , 其  `threshold(阈值)` 和  `weight(权重)`  都为1 。想要了解更多关于 FIBOS 中的账号和权限的关系，请参考 [由浅入深理解 FIBOS 权限系统](fibosauth.md) 一文。

## 2.发行通证

经过简单的创建账号之后，我们就可以发行通证啦，保存以下代码到 `create_token.js` :

```
var FIBOSJS = require('fibos.js')

config = {
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', 
  keyProvider: ['private key'], 
  httpEndpoint: 'http://103.80.170.107:8888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, 
  sign: true
}
var fibos_client = FIBOSJS(config);
console.log(fibos_client.create("fibostest111","10000000.0000 ORIO"));
```

执行代码 :

```
fibos create_token.js
```

创建成功后部分打印信息：

```
"action_traces": [
      {
        "receipt": {
          "receiver": "eosio.token",
          "act_digest": "cd4a9bbfb0b0d294eb3f32ed3d46f2016bc9bb9edeefd06b627cd0e084988c6b",
          "global_sequence": 14590,
          "recv_sequence": 37,
          "auth_sequence": [
            [
              "fibostest111",
              1
            ]
          ],
          "code_sequence": 1,
          "abi_sequence": 1
        },
        "act": {
          "account": "eosio.token",
          "name": "create",
          "authorization": [
            {
              "actor": "fibostest111",
              "permission": "active"
            }
          ],
          "data": {
            "issuer": "fibostest111",
            "maximum_supply": "10000000.0000 ORIO"
          },
          "hex_data": "0000002124ca184d00e87648170000000457540000000000"
        },
        "elapsed": 564,
        "cpu_usage": 0,
        "console": "",
        "total_cpu_usage": 0,
        "trx_id": "5621000eb8d2336d110d0d468936b896b246b594664a1e8cb72a9382f71fcad9",
        "inline_traces": []
      }
    ],
```

从打印的日志中，我们可以看到, `issuer` 为 `fibostest111` 的账户发行了一款名为 `ORIO` 的通证，它的 `maximum_supply` 为10000000.0000。到此，我们就已经成功在 FIBOS TestNet 上发了一款属于自己的通证啦！@_@ 是不是很简单？你只需要在上述代码中  `keyProvider` 填上你的私钥，在 `create()` 方法中填你的账号名和你想要发行的通证名和最大发行量，再执行下 `fibos create_token.js` ，就能成功发行通证啦。心动不如行动，赶紧来试试吧！注意哦， `maximum_supply`  数值类型为 `Uint64` ，通证名取值为 `A-Z` 且长度不能超过7位。

### 让我们来试试转账吧

下面让我们用刚刚发行的  `ORIO` 通证来进行一次转账测试，调用 FIBJS API 中提供的 `transfer("form","to","amounts","memo")` 接口 给 `eosio` 这个账号转 100.0000 个 `ORIO` 通证， API 使用方法可参考 [fibos.js](https://github.com/FIBOSIO/fibos.js) 。

转账成功之后，调用 `getTableRowsSync("true, "eosio.token", "fibostest111", "accounts") ` 接口查看看 `fibostest111`  账号的余额：

```
"rows": [
    {
      "balance": "9999900.0000 ORIO"
    }
  ],
 ]
```

转账成功 ！

至此，在 FIBOS 上发行传统通证的教程就结束了，赶紧来 FIBOS 发行你的专属通证吧！



