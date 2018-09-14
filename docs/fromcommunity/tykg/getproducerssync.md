# fibos.js API 方法之 getProducersSync

**作者：痛饮狂歌**

***

今天，我们介绍 getProducersSync 方法，此方法用于返回当前 BP 节点列表信息。BP 指区块生产者（Block Producer）。

文件 get_producers1.js 代码清单：

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

// 获取 BP 节点列表
console.log(fibos.getProducersSync(true, '', 5));
```

调用 getProducersSync 方法时可指定 3 个参数：

| 参数        | 类型       | 默认值  |
| ----------- | ---------- | ------- |
| json        | 布尔型     | `false` |
| lower_bound | 字符串型   |         |
| limit       | 无符号整数 | `50`    |

运行该文件，输出结果如下：

```json
{
  "rows": [
    {
      "owner": "fibosmoziben",
      "total_votes": "367632706444448448.00000000000000000",
      "producer_key": "FO72kzUjpkrpRXwq36iMovXbAXNU59buUQfUoTxe8pEDMhp2G8cD",
      "is_active": 1,
      "url": "http://www.mocapital.top/",
      "unpaid_blocks": 20976,
      "last_claim_time": "1536284750000000",
      "location": 1
    },
    {
      "owner": "plasmatfibos",
      "total_votes": "346268768760910784.00000000000000000",
      "producer_key": "FO8Tt6fYBFYiyUjTsuinLgL5nxhAAa3sx5vVTkC1FUx3xvas2WSZ",
      "is_active": 1,
      "url": "https://www.fiboso.com",
      "unpaid_blocks": 84,
      "last_claim_time": "1536504215000000",
      "location": 1
    },
    {
      "owner": "fibos123comm",
      "total_votes": "343270297819766144.00000000000000000",
      "producer_key": "FO6MzV92DgYjwDa7K3rtc28dPhGt2Gy8oUoHjESUq4gBx63v8num",
      "is_active": 1,
      "url": "https://www.fibos123.com",
      "unpaid_blocks": 7523,
      "last_claim_time": "1536426172500000",
      "location": 1
    },
    {
      "owner": "shaoshaoshao",
      "total_votes": "336672249083071040.00000000000000000",
      "producer_key": "FO6ruGiSvfspqBiUkx9REjsJKZon6AsUcUPv9kDFfWRHgeUsYXya",
      "is_active": 1,
      "url": "http://shuimeiren.io",
      "unpaid_blocks": 2136,
      "last_claim_time": "1536482668000000",
      "location": 1
    },
    {
      "owner": "chaindoctor1",
      "total_votes": "328642388640282368.00000000000000000",
      "producer_key": "FO5jnYK8XU226Mis57TQni7Et8LEjzjr165f3143pPQdA6bKQgEq",
      "is_active": 1,
      "url": "http://www.fodoctor.com",
      "unpaid_blocks": 9423,
      "last_claim_time": "1536406122500000",
      "location": 1
    }
  ],
  "total_producer_vote_weight": "7896774536012429312.00000000000000000",
  "more": "fibscandotio"
}
```

可以看到，getProducersSync 方法会返回指定数目的 BP 节点，以及总投票权重值、下一个区块生产者等信息：

* **owner**

  拥有者

* **total_votes**

  投票数

* **producer_key**

  区块生产者公钥

* **is_active**

  是否活动的

* **url**

  网址

* **unpaid_blocks**

  尚未领取奖励的区块

* **last_claim_time**

  最近认领奖励时间

* **location**

  位置

* **total_producer_vote_weight**

  总投票权重值

* **more**

  下一个区块生产者，下次请求时可用它作为 lower_bound 参数的值

***

getProducersSync 方法对应的请求路径为 `/v1/chain/get_producers`，我们来看下如何直接访问对应的 API 接口网址来获取区块信息：

文件 get_producers2.js 代码清单：

```js
const HTTP = require("http");

// 主网 RPC 地址
const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";

let url = MAINNET_RPC_ADDRESS + '/v1/chain/get_producers';

let client = new HTTP.Client();

// 获取 BP 节点列表
console.log(client.post(url, {
  json: {
    json: true,
    lower_bound: 'fibscandotio',
    limit: 5
  }
}).json());
```

运行 get_producers2.js 文件，可看到输出结果是从 fibscandotio 开始的 5 个 BP 节点。

### 其它环境或语言中获取节点信息：

在 Node.js 或 浏览器中用 axios 查询：

```js
const axios = require('axios');

let params = JSON.stringify({json: true, lower_bound: 'fibscandotio', limit: 5});

axios.post('http://se-rpc.fibos.io:8870/v1/chain/get_producers', params)
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

$url = MAINNET_RPC_ADDRESS . '/v1/chain/get_producers';

$params = [
  'json' => true,
  'lower_bound' => 'fibscandotio',
  'limit' => 5
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

需注意的是，如果我们对 json 参数传值 false （默认值 ）时，输出的节点信息是不可读的二进制字符串：

```json
{
  "rows": [
	"30d5719f4a4c8f5b4bbfadfe5f68944300031a2b5cb185e7df91a697044fcf970d2045a3a060a693aadd7d5cffd23619b42c0119687474703a2f2f7777772e6d6f6361706974616c2e746f702f88530000802fcc2a3e7505000100",
    "80e9712b1b894dac071e87546f3993430003d6e8c4cd12860e68ee0300c783c22db4e0f42a6a7919b77880f875a29cdfe729011668747470733a2f2f7777772e6669626f736f2e636f6dec010000c053ee43717505000100",
    "20254543044c8f5b3f67a70fef0e93430002c224b52e80c24c1fcc65d8d7ad75038aea46fc7941a8317b368be8e3c61e5fa2011868747470733a2f2f7777772e6669626f733132332e636f6def1e000020483c185f7505000100",
    "404dc3d4344c4dc3f2c1ea7f2bb19243000303c98d08c62a26d5784722d0551b7e93d83d0b94595b63f1041ecd7ed9d741df0114687474703a2f2f736875696d656972656e2e696ff00900000033a13f6c7505000100",
    "102ecd88a6e94c43dc28840b4a3e924300026feeefa6507f1f50e981e5ce2a4b0eb6ac257526d381ecd0d9dd22d16a4f8bd60117687474703a2f2f7777772e666f646f63746f722e636f6d20010000e06d74ba717505000100"
  ],
  "total_producer_vote_weight": "7913539848809700352.00000000000000000",
  "more": "fibscandotio"
}
```

