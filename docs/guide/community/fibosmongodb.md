# 三行代码，让 FIBOS 支持 mongoDB 富查询 

在业务中我们经常会有查询历史数据的场景，比如：某个账户的历史转账记录，但是考虑到性能的问题，在 EOS 中使用自身查询历史数据并不是个很好的方案，另外 EOS 的 history API 模块部分功能迭代快，甚至即将废弃。

EOS 本身提供了mongoDB 的插件（eosio::mongo_db_plugin），FIBOS 也沿用了这个特性。该模块实现原理是将区块的数据同步至 mongoDB。这使得此方式让 mongoDB 成为了中心化数据存储，畅想一下一个 FIBOS 的浏览器，在设计上我们可以让 FIBOS 节点服务和基于 mongoDB 的查询业务分离，让性能大大的提高。

阅读完本篇文章，你可以学会如何利用 FIBOS 内置的 mongo_db 模块将数据同步至 mongoDB，并使用 mongoDB 查询 FIBOS 的区块数据。



赶紧安装新版 FIBOS 试试吧！[安装运行环境](../basic/install.md)



- 本文测试环境：

  系统：macOS

- 本章涉及到的文件列表：

    ```
    hello_mongoDB/
    ├── local
    │   ├── client.js
    │   └── node.js
    └── testnet
        ├── client.js
        └── node.js
    ```

- 依赖：fibos.js 如何安装请参考[使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md)

- 本章节示例代码地址：https://github.com/FIBOSIO/samples



## 本地快速体验

我们在本地启动一个 FIBOS 节点服务，创建账户并在 mongoDB 中进行查询。

#### 启动 mongod 服务

如果你还未安装 mongoDB，请参考 [Install mongoDB Community Edition](https://docs.mongoDB.com/manual/administration/install-community/)。

首先我们需要启动 mongod 服务，命令如下：

```
fibos$ mongod
```

可以看到如下输出，说明 mongod 服务成功启动：

```
2018-08-08T09:52:09.459+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] mongoDB starting : pid=8061 port=27017 dbpath=/data/db 64-bit host=Velen
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] db version v4.0.1
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] git version: 54f1582fc6eb01de4d4c42f26fc133e623f065fb
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] allocator: system
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] modules: none
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten] build environment:
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten]     distarch: x86_64
2018-08-08T09:52:09.534+0800 I CONTROL  [initandlisten]     target_arch: x86_64
```

#### 启动 FIBOS 环境

如果你还未安装 FIBOS，请参考 [安装运行环境](../basic/install.md)。

想要将数据同步至 mongoDB ，仅需在入门教程中的代码加入一段 `fibos.load("mongo_db")` ，将 mongo_db 这个模块载入 FIBOS。只需要三行代码，FIBOS 便会将区块数据自动同步至 mongoDB，非常方便。

端口号和数据库名称可以自行更改，在本教程中端口为 27017，数据库名为 eosmain。 以下代码保存至 `./local/node.js`。

```javascript
var fibos = require('fibos');

fibos.load("http");
fibos.load("chain", {
    "contracts-console": true,
    "delete-all-blocks": true,
});
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true,
    "max-transaction-time": 3000
});
fibos.load("mongo_db", {
    "mongodb-uri": "mongodb://localhost:27017/eosmain"
});

fibos.start();
```

启动 FIBOS 环境：

```
fibos$ fibos ./local/node.js
```

在启动后，我们在 mongd 的日志中会看到如下输出：

```
2018-08-08T11:33:42.867+0800 I NETWORK  [listener] connection accepted from 127.0.0.1:54259 #2 (2 connections now open)
2018-08-08T11:33:42.868+0800 I NETWORK  [conn2] received client metadata from 127.0.0.1:54259 conn2: { driver: { name: "mongoc / mongocxx", version: "1.10.2 / 3.3.1-pre" }, os: { type: "Darwin", name: "macOS", version: "18.0.0", architecture: "x86_64" }, platform: "cfg=0x00d6a265 posix=200112 stdc=201112 CC=clang 9.1.0 (clang-902.0.39.2) CFLAGS="" LDFLAGS=""" }
2018-08-08T11:33:42.873+0800 I STORAGE  [conn2] createCollection: eosmain.accounts with generated UUID: 0e553ab1-4c07-436a-abf7-62c6864779ed

...

2018-08-08T11:33:43.925+0800 I COMMAND  [conn2] command eosmain.$cmd command: createIndexes { createIndexes: "actions", indexes: [ { name: "trx_id_1", key: { trx_id: 1 } } ], $db: "eosmain", lsid: { id: UUID("1ee67ce9-d0db-4ad1-9737-c4fba7f850ca") } } numYields:0 reslen:114 locks:{ Global: { acquireCount: { r: 1, w: 1 } }, Database: { acquireCount: { W: 1 } }, Collection: { acquireCount: { w: 1 } } } protocol:op_msg 119ms
2018-08-08T11:33:44.019+0800 I STORAGE  [conn2] createCollection: eosmain.transaction_traces with generated UUID: a637e777-aed4-45d2-9bf6-b149bc4e702b
```

通过日志可以查看到 FIBOS 为我们做了如下事情：

1. 创建集合：accounts，actions，block_states，blocks，transaction_traces，transactions
2. 给各集合创建必要的索引

我们进入 mongoDB 的客户端 mongo 进行查询，会看到 eosmain 数据库被成功创建：

```
> show dbs
admin          0.000GB
config         0.000GB
eosmain        0.002GB
local          0.000GB
```

进入 eosmain 数据库，会发现 FIBOS 在 mongoDB 中创建了 5 个集合：

```
> use eosmain
switched to db eosmain
> show tables
accounts
actions
block_states
blocks
transaction_traces
transactions
```

我们可以直接查询 accounts 集合中的数据：

```
> db.accounts.find()
{ "_id" : ObjectId("5b6a6496bc9b452f1e4750d2"), "name" : "eosio", "createdAt" : ISODate("2018-08-08T03:33:42.869Z") }
```

会发现已有一个系统账户 eosio 的数据被同步到了 mongoDB。

#### 新建账户，在 mongoDB 中查询数据

接着，我们使用脚本创建一个新账户并在 mongoDB 查询。以下代码保存至 `./local/client.js`

```javascript
var FIBOS = require('fibos.js');
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": "eosio",
    "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
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

let result = fibos.newaccountSync({
    creator: 'eosio',
    name: "hellomongodb",
    owner: config["public-key"],
    active: config["public-key"]
});
console.log('result: ', result);
```

执行脚本:

```
fibos$ fibos ./local/client.js
```

脚本结果（片段）：

```
result:  {
  "broadcast": true,
  "transaction": {
    "compression": "none",
    "transaction": {
      "expiration": "2018-08-08T03:49:44",
      "ref_block_num": 10,
      "ref_block_prefix": 241484686,
      "net_usage_words": 0,
      "max_cpu_usage_ms": 0,
      "delay_sec": 0,
      "context_free_actions": [],
      "actions": [
        {
          "account": "eosio",
          "name": "newaccount",
          "authorization": [
            {
              "actor": "eosio",
              "permission": "active"
            }
          ],
          "data": "0000000000ea3055701265934a1aa36a01000000010002c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cf0100000001000000010002c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cf01000000"
        }
```

经过短暂的同步后，我们在 mongo 中查询账户数据：

```
> db.accounts.find()
{ "_id" : ObjectId("5b6a6496bc9b452f1e4750d2"), "name" : "eosio", "createdAt" : ISODate("2018-08-08T03:33:42.869Z") }
{ "_id" : ObjectId("5b6a681cbc9b453001230003"), "name" : "hellomongodb", "createdAt" : ISODate("2018-08-08T03:48:44.863Z") }
```

会发现账户数据多了一条刚才创建的 hellomongodb 数据。进行到这步，恭喜你，你已经学会了如何将 FIBOS 网络中的区块数据同步至 mongoDB 并使用 mongo 客户端进行查询！

下面，我们将启动一个新的节点同步 TestNet 网络，并将其数据同步至 mongoDB，并利用 mongoDB 的语法查询我们发起的交易。



## 进阶，利用 mongoDB 查询 TestNet 数据

如果你对加入 TestNet 网络的步骤还不熟悉，请参考 [如何加入到 TestNet 网络](../development/abouttestnet.md)。

#### 启动 FIBOS 环境，加入 TestNet 网络

首先，我们使用 ctrl + c 关闭之前的本地私有链节点，并执行 `db.dropDatabase()` 将之前的 `eosmanin` 数据库删除。然后，我们启动一个新的节点加入 TestNet 网络。以下代码保存至 `./testnet/node.js`：

```javascript
const fibos = require('fibos');

fibos.config_dir = "sync_data_Dir";
fibos.data_dir = "sync_data_Dir";

fibos.load("http", {
    "http-server-address": "0.0.0.0:8888"
});

fibos.load("net", {
    "p2p-listen-endpoint": "0.0.0.0:9876",
    "p2p-peer-address": "103.80.170.107:9876"
});

fibos.load("producer");
fibos.load("chain", {
    "delete-all-blocks": true
});
fibos.load("chain_api");
fibos.load("wallet");
fibos.load("wallet_api");
fibos.load("mongo_db", {
    "mongodb-uri": "mongodb://localhost:27017/eosmain"
})

fibos.start();
```

执行脚本：

```
fibos$ fibos ./testnet/node.js
```

输出结果（片段）：

```
2018-08-08T04:46:38.052 thread-0   http_plugin.cpp:344           plugin_initialize    ] configured http to listen on 0.0.0.0:8888
2018-08-08T04:46:38.052 thread-0   chain_plugin.cpp:271          plugin_initialize    ] initializing chain plugin
2018-08-08T04:46:38.053 thread-0   chain_plugin.cpp:408          plugin_initialize    ] Deleting state database and blocks
2018-08-08T04:46:38.223 thread-0   chain_plugin.cpp:508          plugin_initialize    ] Starting up fresh blockchain with default genesis state.
```

我们进入 mongo 中查询，会发现 TestNet 中的账户数据已有一部分同步到了 mongoDB 中：

```
> use eosmain
> db.accounts.find()
```

#### 新建账户，在 mongoDB 中查询数据

我们可以在 [FIBOS TestNet 账户注册](http://103.80.170.107:8080/) 进行 TestNet 新账户的注册。在本教程中，我们新建了一个名为 hellomongodb 的账户。

我们新建脚本用来查询刚刚注册的账户信息，以下代码保存至 `./testnet/client.js`（注意替换你自己生成的私钥以及账户名）：

```javascript
var FIBOS = require('fibos.js');

var config = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: '// 填入注册时生成的私钥', // WIF string or array of keys..
    httpEndpoint: 'http://103.80.170.107:8888',
    logger: {
        log: null,
        error: null
    }
}

var fibos = FIBOS(config);
var balance = fibos.getTableRowsSync(true, "eosio.token", "hellomongoDB", "accounts");
console.log('balance', balance);
```

执行脚本：

```
fibos$ fibos client.js
```

输出结果（片段）：

```
account:  {
  "account_name": "hellomongodb",
  "head_block_num": 14022,
  "head_block_time": "2018-08-08T04:58:48.000",
  "privileged": false,
  "last_code_update": "1970-01-01T00:00:00.000",
  "created": "2018-08-08T04:51:23.500",
  "core_liquid_balance": "50.0000 FO",
  "ram_quota": 4073,
  "net_weight": 500000,
  "cpu_weight": 500000,
  "net_limit": {
    "used": 0,
    "available": 22649235,
    "max": 22649235
  }
```

我们可以看到刚刚注册的账户 hellomongodb 的信息，以及系统赠送的 50 FO。经过一段时间的同步后，我们可以在 mongo 中查询到我们的账户数据：

```
> db.accounts.find({"name":"hellomongodb"})
{ "_id" : ObjectId("5b6a7863bc9b4532eb0add48"), "name" : "hellomongodb", "createdAt" : ISODate("2018-08-08T04:58:11.306Z") }
```

#### 发起交易，利用 mongoDB 查询交易数据

mongoDB 的查询方法具体语法为：

```
> db.collection.find(query, projection)
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```
> db.col.find().pretty()
```

pretty() 方法以格式化的方式来显示所有文档。

下面，我们来进行一笔转账，然后通过 trx_id 作为查询条件来查询这个交易的记录。

首先，我们使用刚刚创建的账户进行一笔转账交易。对 `./testnet/client.js` 代码作如下修改：

```javascript
var FIBOS = require('fibos.js');

var config = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: '5KH6znunJQBdexEVcx7FkeJH7Npswi9hEpJx2fXqAvQA77SPE6V', // WIF string or array of keys..
    httpEndpoint: 'http://103.80.170.107:8888',
    logger: {
        log: null,
        error: null
    }
}

var fibos = FIBOS(config);
var ctx = fibos.contractSync("eosio.token");
var result = ctx.transferSync("hellomongodb", "eosio", '10.0000 FO', 'transfer');
console.log('result', result);
```

执行脚本：

```
fibos$ fibos ./testnet/client.js
```

输出结果（片段），包含交易的详细信息，如签名，from 账户名，to 账户名，交易 id 等：

```
result {
  "broadcast": true,
  "transaction": {
    "compression": "none",
    "transaction": {
      "expiration": "2018-08-08T06:34:34",
      "ref_block_num": 25363,
      "ref_block_prefix": 2317966385,
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
              "actor": "hellomongodb",
              "permission": "active"
            }
          ],
          "data": "701265934a1aa36a0000000000ea3055a08601000000000004464f0000000000087472616e73666572"
        }
      ],
      "transaction_extensions": []
    },
    "signatures": [
      "SIG_K1_K9V3rSTcXBjfAdHiCmmrPbjrs5SjR4Qzjb1u12du9qD2pC8pwGfdrpt9p4t8YZxCGNRRrTgaFYV83kwNJnxUc1MtaghjBk"
    ]
  },
  "transaction_id": "2c35fb9fbaaa1164da7204eb51d8fcc6299408d30a79a3410368c8afa5d8932e",
```

经过一段时间的同步后，我们使用刚才打印出的交易 id （即 transaction_id ）在 mongo 中进行查询：

```
> db.transactions.find({"trx_id":"2c35fb9fbaaa1164da7204eb51d8fcc6299408d30a79a3410368c8afa5d8932e"}).pretty()
{
	"_id" : ObjectId("5b6a8fa5bc9b45370a38f234"),
	"trx_id" : "2c35fb9fbaaa1164da7204eb51d8fcc6299408d30a79a3410368c8afa5d8932e",
	"irreversible" : true,
	"transaction_header" : {
		"expiration" : "2018-08-08T06:34:34",
		"ref_block_num" : 25363,
		"ref_block_prefix" : NumberLong("2317966385"),
		"max_net_usage_words" : 0,
		"max_cpu_usage_ms" : 0,
		"delay_sec" : 0
	},
	"signing_keys" : {
		"0" : "FO8R5TLhkDNDeV8XNWaSKeu2Q2knV4S2MJMbPcUz9vKfF84yrfdW"
	},
	"actions" : [
		{
			"action_num" : 0,
			"trx_id" : "2c35fb9fbaaa1164da7204eb51d8fcc6299408d30a79a3410368c8afa5d8932e",
			"cfa" : false,
			"account" : "eosio.token",
			"name" : "transfer",
			"authorization" : [
				{
					"actor" : "hellomongodb",
					"permission" : "active"
				}
			],
			"data" : {
				"from" : "hellomongodb",
				"to" : "eosio",
				"quantity" : "10.0000 FO",
				"memo" : "transfer"
			}
		}
	],
	"transaction_extensions" : {

	},
	"signatures" : {
		"0" : "SIG_K1_K9V3rSTcXBjfAdHiCmmrPbjrs5SjR4Qzjb1u12du9qD2pC8pwGfdrpt9p4t8YZxCGNRRrTgaFYV83kwNJnxUc1MtaghjBk"
	},
	"context_free_data" : {

	},
	"createdAt" : ISODate("2018-08-08T06:37:25.887Z"),
	"block_id" : "0000632bec098cee125b2c4f5fe630424b04f1bae9b5ec2bec274697e44a5751",
	"block_num" : 25387,
	"updatedAt" : ISODate("2018-08-08T06:37:28.083Z")
}
```

可以看到交易的详细数据都已经同步到了 mongoDB。

#### 分页加排序，mongoDB 显神威

对大多数业务，翻页和排序是基本功能。mongoDB 支持使用 sort 排序，limit 配合 skip 进行 分页。那么我们利用这一特性，来实现一个简单的功能：按创建时间倒序查询交易信息，并且能够以每页10条记录进行展现。

语句十分简单，在 mongo 客户端中输入：

```
db.transactions.find().sort({"createdAt": -1}).skip(0).limit(5).pretty()
```

即可看到有5条按创建时间倒序的交易数据被查出，下面进行翻页：

```
db.transactions.find().sort({"createdAt": -1}).skip(5).limit(5).pretty()
```

可以看到下一页的5条数据。利用这一特性，我们可以做一个简单区块链浏览器啦 ~

至此，你已经达成将 TestNet 网络的数据同步至 mongoDB 并进行查询这一小目标，加油，一起继续探索 FIBOS 吧~