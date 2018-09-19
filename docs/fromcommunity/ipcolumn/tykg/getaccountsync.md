# fibos.js API 方法之 getAccountSync

**作者：痛饮狂歌**

***

今天，我们介绍 getAccountSync 方法，此方法用于返回指定账号的信息。

文件 get_account1.js 代码清单：

```js
const FIBOSJS = require("fibos.js");

// 主网 RPC 地址
const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";
// FIBOS 链ID
const FIBOS_CHAINID =
  "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a";

let config = {
  chainId: FIBOS_CHAINID,
  httpEndpoint: MAINNET_RPC_ADDRESS
};

let fibos = FIBOSJS(config);

// 账号名，借响马大叔的账号一用（也不知是不是，也可能他人抢注的）
let accountName = 'xiangmafibos';

// 通过区块高度查询
console.log(fibos.getAccountSync(accountName));
```

通过以上代码可知，调用 getAccountSync 方法时需指定要查询的账号名。


运行该文件，输出结果如下：

```json
{
  "account_name": "xiangmafibos",
  "head_block_num": 1883258,
  "head_block_time": "2018-09-08T13:57:19.000",
  "privileged": false,
  "last_code_update": "1970-01-01T00:00:00.000",
  "created": "2018-09-04T09:02:12.000",
  "ram_quota": 5475,
  "net_weight": 1000,
  "cpu_weight": 1000,
  "net_limit": {
    "used": 0,
    "available": 358592,
    "max": 358592
  },
  "cpu_limit": {
    "used": 0,
    "available": 46683,
    "max": 46683
  },
  "ram_usage": 2996,
  "permissions": [
    {
      "perm_name": "active",
      "parent": "owner",
      "required_auth": {
        "threshold": 1,
        "keys": [
          {
            "key": "FO6K6XHiRqjoM1x3NPMpCeq5DQU2JoRb8QwJVjNdY7Anc52UJgqX",
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
            "key": "FO6K6XHiRqjoM1x3NPMpCeq5DQU2JoRb8QwJVjNdY7Anc52UJgqX",
            "weight": 1
          }
        ],
        "accounts": [],
        "waits": []
      }
    }
  ],
  "total_resources": {
    "owner": "xiangmafibos",
    "net_weight": "0.1000 FO",
    "cpu_weight": "0.1000 FO",
    "ram_bytes": 4075
  },
  "self_delegated_bandwidth": null,
  "refund_request": null,
  "voter_info": null
}
```

可以看到，getAccountSync 方法将返回账号除余额信息外的所有信息。下面解释一下重要的信息项：

* **account_name** 、**privileged**、**created**

账号名，是否特权用户，账号创建时间

* **ram_quota**

账号拥有的内存配额，以字节为单位。

* **net_limit** 和 **cpu_limit**

账号拥有的网络（net）和计算（cpu）资源 ：used（已用）＋available（可用）＝max（总量） ，字节为单位。

* **ram_usage**

账号内存使用量，以字节为单位。

* **permissions**

账号权限

* **total_resources**

账号拥有的总资产。

- **self_delegated_bandwidth**

自抵押(网络和计算)带宽信息

- **refund_request**

赎回请求

* **voter_info**

投票信息

***

getAccountSync 方法对应的请求路径为 `/v1/chain/get_account`，我们来看下如何直接访问对应的 API 接口网址来获取账号信息：

文件 get_account2.js 代码清单：

```js
const HTTP = require("http");

// 主网 RPC 地址
const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";

let url = MAINNET_RPC_ADDRESS + '/v1/chain/get_account';

// 账号名
let accountName = 'xiangmafibos';

let client = new HTTP.Client();

console.log(client.post(url, {
  json: {
    account_name: accountName
  }
}).json());
```

运行 get_account2.js 文件，可看到输出结果与  get_account1.js 相同。

### 其它环境或语言中获取账号信息：

在 Node.js 或 浏览器中用 axios 查询：

```js
const axios = require('axios');

let params = JSON.stringify({account_name: 'xiangmafibos'});

axios.post('http://se-rpc.fibos.io:8870/v1/chain/get_account', params)
  .then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.log(error);
  }).then(function () {
});
```

PHP 中查询：

```php
<?php

const MAINNET_RPC_ADDRESS = 'http://se-rpc.fibos.io:8870';

$url = MAINNET_RPC_ADDRESS . '/v1/chain/get_account';

$params = [
  'account_name' => 'xiangmafibos'
];

$options = [
  'http' => [
    'method'  => 'POST',
    'header'  => 'Content-type: application/json',
    'content' => json_encode($params)
  ]
];

$context  = stream_context_create($options);

$result = file_get_contents($url, false, $context);

print_r(json_decode($result, true));
```
