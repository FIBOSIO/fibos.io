# 开始在FIBOS上使用JS编写智能合约

使用Javascript编写一个FIBOS的简单智能合约。

注意：对于EOSIO智能合约是非安全的，所有的合约类似于下面的示例代码，合约发布者拥有合约的私钥，能够操作合约任何状态。
对于FIBOS会通过一个“合约发布"合约来控制合约的发布，从来解决带来的风险。

## 准备工作

节点服务脚本(node.js):

```
var fibos = require('fibos');

fibos.load("http");
fibos.load("chain");
fibos.load("net");
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});

fibos.load("chain_api");
fibos.load("history_api");

fibos.start();
```

启动FIBOS节点:
```
fibos node.js
```

## 编写一个Javascript版的智能合约

### FIBOS.js客户端

```
var FIBOS = require('fibos.js');

var pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';

var config = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', // WIF string or array of keys..
    httpEndpoint: 'http://127.0.0.1:8888',
    logger: {
        log: null,
        error: null
    }
}

var fibos = FIBOS(config);

```

### 新建智能合约所属账户

```
var name = "test4cmfxk";

fibos.newaccountSync({
    creator: 'eosio',
    name: name,
    owner: pubkey,
    active: pubkey
});

```

### 发布智能合约

```
var abi = {
	"version": "eosio::abi/1.0",
	"structs": [{
		"name": "player",
		"base": "",
		"fields": [{
			"name": "title",
			"type": "string"
		}, {
			"name": "age",
			"type": "int64"
		}]
	}, {
		"name": "hi",
		"base": "",
		"fields": [{
			"name": "user",
			"type": "name"
		}]
	}],
	"actions": [{
		"name": "hi",
		"type": "hi",
		"ricardian_contract": ""
	}]
};

//setCode
var js_code = `exports.hi = user => console.log(user);`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));

//setabi
fibos.setabiSync(name, abi);

//getCode
fibos.getCodeSync(name, true);
```