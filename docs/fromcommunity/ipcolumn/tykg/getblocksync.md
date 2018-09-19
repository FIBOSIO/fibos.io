# fibos.js API 方法之 getBlockSync

**作者：痛饮狂歌**

***

今天，我们将介绍 getBlockSync 方法，但在开讲之前，先回答个别同学的问题：

**getInfoSync 方法返回的信息都有什么含义？**

下面是 getInfoSync 方法的信息：

```json
{
  "server_version": "2ad41277",
  "chain_id": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
  "head_block_num": 1493811,
  "last_irreversible_block_num": 1493485,
  "last_irreversible_block_id": "0016c9edb7eda05beebb9598fdca1357945c861147c24542e50d181d53a49978",
  "head_block_id": "0016cb33d1a5668b5ee921d45d448f0726da66f217bfd0751594a149cdee68d1",
  "head_block_time": "2018-09-06T07:14:00.500",
  "head_block_producer": "fibos123comm",
  "virtual_block_cpu_limit": 200000000,
  "virtual_block_net_limit": 1048576000,
  "block_cpu_limit": 199900,
  "block_net_limit": 1048576,
  "server_version_string": "v1.2.2"
}
```


我们逐一讲解下：

* **server_version** 和 **server_version_string**

主网服务器版本

* **chain_id**

主网的区块链网络 ID。不同 ID 的节点无法相互连接。

* **head_block_num**

当前区块高度（区块号），第一个区块为 1，依次累加。

* **head_block_id**、**head_block_time**、**head_block_producer**

当前（最近的）区块 ID、产生时间、打包此区块的节点

* **last_irreversible_block_num**、**last_irreversible_block_id**

当前（最近的）不可逆区块高度、不可逆区块 ID

* **virtual_block_cpu_limit** 、**virtual_block_net_limit**、**block_cpu_limit** 、**block_net_limit**

区块 CPU 和网络限额

***

好，下面我们开始介绍 getBlockSync 方法，此方法用于获取指定区块的信息。

文件 get_block1.js 代码清单：

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

// 第一个区块的区块高度（号）
let blockNum = 1;
// 第一个区块的区块 ID
let blockId = '000000018efcb02cbe6329996bdf007c30077907a3fbec119373644a4da3902e';

// 通过区块高度查询
console.log(fibos.getBlockSync(blockNum));
// 或通过区块 ID 查询
// console.log(fibos.getBlockSync(blockId));
```

通过以上代码可知，调用 getBlockSync 方法时需指定要查询区块的区块高度（区块号）或区块ID。

运行该文件，输出结果如下：

```json
{
  "timestamp": "2018-08-28T00:00:00.000",
  "producer": "",
  "confirmed": 1,
  "previous": "0000000000000000000000000000000000000000000000000000000000000000",
  "transaction_mroot": "0000000000000000000000000000000000000000000000000000000000000000",
  "action_mroot": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
  "schedule_version": 0,
  "new_producers": null,
  "header_extensions": [],
  "producer_signature": "SIG_K1_111111111111111111111111111111111111111111111111111111111111111116uk5ne",
  "transactions": [],
  "block_extensions": [],
  "id": "000000018efcb02cbe6329996bdf007c30077907a3fbec119373644a4da3902e",
  "block_num": 1,
  "ref_block_prefix": 2569626558
}
```

getBlockSync 方法对应的请求路径为 `/v1/chain/get_block`，我们来看下如何直接访问对应的 API 接口网址来获取区块信息：

文件 get_block2.js 代码清单：

```js
const HTTP = require("http");

// 主网 RPC 地址
const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";

let url = MAINNET_RPC_ADDRESS + '/v1/chain/get_block';

// 第一个区块的区块高度（号）
let blockNum = 1;
// 第一个区块的区块 ID
let blockId = '000000018efcb02cbe6329996bdf007c30077907a3fbec119373644a4da3902e';

let client = new HTTP.Client();

console.log(client.post(url, {
  json: {
    block_num_or_id: blockNum
  }
}).json());
```

运行 get_block2.js 文件，可看到输出结果与  get_block1.js 相同。

### 其它环境或语言中获取区块信息：

在 Node.js 或 浏览器中通过 axios 库查询：

```js
const axios = require('axios');

let params = JSON.stringify({block_num_or_id: 1});

axios.post('http://se-rpc.fibos.io:8870/v1/chain/get_block', params)
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

$url = MAINNET_RPC_ADDRESS . '/v1/chain/get_block';

$params = [
  'block_num_or_id' => 1
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
