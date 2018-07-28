# 使用FIBOS.JS与FIBOS交互

FIBOS.js是一个通用JS Library，通过Fibjs运行使它成为一个JS Client,它可以与FIBOS以及EOS区块链进行交互。

## Geting Started

install the module with:
```
npm install fibos.js
```

Starting FIBOS&EOSIO blockchains journey with fibos.js:

```
var FIBOSJS = require('fibos.js')

config = {
	chainId: 'Chain ID', // 32 byte (64 char) hex string
	keyProvider: ['PrivateKey'], // WIF string or array of keys..
	httpEndpoint: 'http://127.0.0.1:8888',
	expireInSeconds: 60,
	broadcast: true,
	verbose: false, // API activity
	sign: true
}

var fibos = FIBOSJS(config);
```

## TEST

```
npm test
```

## BLOCKCHAIN Support

- FIBOS
- EOSIO

## EXAMPLE

## 1. 加载配置

```
var FIBOS = require('fibos.js')

var config = {
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
	keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', // WIF string or array of keys..
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
};

var fibos = FIBOS(config);
```

### 2. 获取Chain基本信息

```
var result = fibos.getInfoSync();
/*
{
  "server_version": "e4082b13",
  "chain_id": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  "head_block_num": 1152,
  "last_irreversible_block_num": 1151,
  "last_irreversible_block_id": "0000047f3d10a4e949cf0a3721661d1ebdcc084e18f0046d0eca828e9494261c",
  "head_block_id": "00000480563740bde5c34f897cb6603e2d7a0c70314bbf0daa4a779293b46e5f",
  "head_block_time": "2018-07-24T15:16:27.500",
  "head_block_producer": "eosio",
  "virtual_block_cpu_limit": 631546,
  "virtual_block_net_limit": 3315763,
  "block_cpu_limit": 199900,
  "block_net_limit": 1048576
}
*/
```

### 3. 获取区块信息

```
var result = fibos.getBlockSync(1);
/*
{
  "timestamp": "2018-06-01T12:00:00.000",
  "producer": "",
  "confirmed": 1,
  "previous": "0000000000000000000000000000000000000000000000000000000000000000",
  "transaction_mroot": "0000000000000000000000000000000000000000000000000000000000000000",
  "action_mroot": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  "schedule_version": 0,
  "new_producers": null,
  "header_extensions": [],
  "producer_signature": "SIG_K1_111111111111111111111111111111111111111111111111111111111111111116uk5ne",
  "transactions": [],
  "block_extensions": [],
  "id": "00000001bcf2f448225d099685f14da76803028926af04d2607eafcf609c265c",
  "block_num": 1,
  "ref_block_prefix": 2517196066
}
*/
```

### 4. 其他

```
//构造交易
fibos.transactionSync(
	{
		actions: [
			{
				account: 'fibos.token',
				name: 'transfer',
				authorization: [{
					actor: 'fibosio',
					permission: 'active'
				}],
				data: {
					from: 'fibosio',
					to: 'testaccount',
					quantity: '7.0000 FO',
					memo: 'Test'
				}
			}
		]
	}
);

//获取智能合约
var ctx = fibos.contractSync("fibos.token");

//调用合约action
ctx.transferSync('from', 'to', '1.0000 FO', 'memo');
```

## 开始在FIBOS上使用JS编写智能合约
前面一章我们学会了如何启动FIBOS节点，这章我们实现了一个简单的FIBOS JS客户端，那么让我们开始编写一个新的智能合约吧!

👉 【[开始在FIBOS上使用JS编写智能合约](startcontract.md)】