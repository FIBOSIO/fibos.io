# FIBOS 数据持久化的开发实践

本章内容针对 FIBOS 的 JavaScript 合约的数据持久化，阅读完本章内容后大家可以在 JavaScript 合约中进行数据的持久化操作。

为了更好的有目的性学习 FIBOS 的数据持久化，本章内容可以帮助大家理解下面几个问题：

- 对于 FIBOS 的 JavaScript 合约为什么需要数据持久化？
- 从 ABI 文件格式解读 FIBOS 的数据类型
- 如何在 FIBOS 中实现数据持久化？
- 如何在 FIBOS 中操作持久化数据？

本章内容涉及到以下几个知识：

- fibos.js 的使用
- FIBOS 的使用

这些内容大家都可以通过 FIBOS 官方网站可以学习： https://fibos.io

本章内容中涉及到的示例代码均在 Mac OSX 环境下执行。

示例代码地址： https://github.com/FIBOSIO/samples

让我们开始学习之旅吧！

## 对于 FIBOS 的 JavaScript 合约为什么需要数据持久化？

FIBOS 的 JavaScript 合约运行在一个独立的沙箱环境内，对于每一次的合约 action 操作来说，action 的上下文环境（Apply Context）都是新建的，类似于新建一个合约的实例，当 action 执行完毕后，所有定义的内容都会被释放。

大家阅读过官方文档之后，应该已经掌握了如何编写一个 JavaScript 合约，那么让我们通过示例代码来解释这个为什么。

不了解如何编写的同学可以查阅 [编写一个 JS 合约]((fibosjs.md))。

### 启动一个 FIBOS 的节点服务

保存代码至 `node.js`：

```
var fibos = require('fibos');

fibos.load("http");
fibos.load("net");
fibos.load("producer", {
	'producer-name': 'eosio',
	'enable-stale-production': true
});

fibos.load("chain", {
	"delete-all-blocks": true
});
fibos.load("chain_api");
fibos.load("wallet");
fibos.load("wallet_api");

fibos.start();
```

运行节点服务：`fibos node.js`

### 部署 JavaScript 合约

为了测试方便，把合约代码以及 ABI 内容写在了一个脚本内，保存代码至 `deploy_contract.js`：

```
var FIBOS = require('fibos.js');

var fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

//合约所属账户 hellocode 的公私钥对
let pubkey = "EOS5L9g2mnC4zZMZWDR8VBksz3exFmXV4kwfj65oYeKdqRPc2oPFW";
let prikey = '5KMg9oUf5caX9yku7zQQwKZQLukRW7dMHaST8njpBf22puUvjea';

//创建合约账户
var name = 'hellocode';
fibos.newaccountSync({
	creator: 'eosio',
	name: name,
	owner: pubkey,
	active: pubkey
});

//发布一个合约
var abi = {
	"version": "eosio::abi/1.0",
	"structs": [{
		"name": "add",
		"base": "",
		"fields": [{
			"name": "user",
			"type": "string"
		}]
	}],
	"actions": [{
		"name": "add",
		"type": "add",
		"ricardian_contract": ""
	}]
};

//由 hellocode 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

fibos.setabiSync(name, abi);

var js_code = `var a = 0;exports.add = () => {a = a + 1; console.error(a);}`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

脚本分析，这个合约代码实现的是定义个全局变量 `var a = 0`，提供一个 add 的 function 每次调用实现加1。

运行脚本：`fibos deploy_contract.js`。

### 调用 call JavaScript 合约

按照传统的方式，我们认为调用2次 add 方法的预期是输出：`1 2`,第一次输出1，第二次输出2。

保存调用合约的脚本到 `call_contract.js`：

```
var FIBOS = require('fibos.js');

//合约所属账户 hellocode 的公私钥对
let pubkey = "EOS5L9g2mnC4zZMZWDR8VBksz3exFmXV4kwfj65oYeKdqRPc2oPFW";
let prikey = '5KMg9oUf5caX9yku7zQQwKZQLukRW7dMHaST8njpBf22puUvjea';
var name = 'hellocode';

//由 hellocode 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

// 第一次调用
var ctx = fibos.contractSync(name);
var r = ctx.addSync("hello", {
	authorization: name
});

console.error(r.processed.action_traces[0].console);


//第二次调用
var ctx = fibos.contractSync(name);
var r = ctx.addSync("hello", {
	authorization: name
});

console.error(r.processed.action_traces[0].console);
```

运行脚本：`fibos call_contract.js`。

输出结果：

```
1
1
```

与我们上面的预期不一致，说明验证了上面的结论，合约的每个 action 操作都是在独立的，因此为了帮助业务中存储过程数据就需要合约能够做到数据的持久化。

## 从 ABI 文件格式解读 FIBOS 的数据类型

在多次的文档中我们提及了 ABI 文件，但是没有为大家讲解这个 ABI 是什么，它有什么作用？本章节内容可以让大家解除这个困惑？

对于 JavaScript 合约来说，需要 使用 ABI 文件来定义 action 以及 数据存储的表。

对于为什么需要 ABI，它是如何生成的，需要更深入的理解，我们不在此详细说明，这里我们仅仅围绕本文让大家了解一些。

让我们来举个 ABI 文件的例子：

```
{
    "version": "eosio::abi/1.0",
    "types": [{
        "new_type_name": "my_account_name",
        "type": "name"
    }],
    "structs": [{
        "name": "player",
        "base": "",
        "fields": [{
            "name": "nickname",
            "type": "my_account_name"
        }, {
            "name": "age",
            "type": "int32"
        }]
    }, {
        "name": "hi",
        "base": "",
        "fields": [{
            "name": "nickname",
            "type": "my_account_name"
        }]
    }],
    "actions": [{
        "name": "hi",
        "type": "hi",
        "ricardian_contract": ""
    }],
    "tables": [{
        "name": "players",
        "type": "player",
        "index_type": "i64",
        "key_names": ["id"],
        "key_types": ["int64"]
    }]
};
```

以上 ABI 数据格式是由我们手工输出，今后为了方便开发我们会使用工具生成。

让我们来分析一下这个 JSON 结构属性：

- version ABI 的版本号
- types 用于自定义数据的类型

```
{
	"new_type_name": "my_account_name",
	"type": "name"
}
```

自定义了一个类型名称为 `my_account_name`的类型，类型是 `name`，`new_type_name` 和 `type` 是关键字，类型 `name` 是由 系统定义的数据类型。

- structs 结构体定义，可用于 action 参数的类型定义，也可以用于 table 的参数类型定义

```
{
    "name": "player",
    "base": "",
    "fields": [{
        "name": "nickname",
        "type": "my_account_name"
    }, {
        "name": "age",
        "type": "int32"
    }]
}, {
    "name": "hi",
    "base": "",
    "fields": [{
        "name": "nickname",
        "type": "my_account_name"
    }]
}
```

结构体名为 `player` 定义了一个数据表 `player` 包含2个字段 `nickname` 和 `age`，类型分别是 `my_account_name` 和 `int32`。

结构体名为 `hi` 定义了一个方法 `hi` 的传递参数的类型，参数名是 `user`，类型名称是 `nickname`，类型是 `my_account_name`。

- actions 所有的 action 定义

```
{
    "name": "hi",
    "type": "hi",
    "ricardian_contract": ""
}
```

action 名是 hi，参数的结构体类型是 `hi`。


- tables 所有的 table 定义

```
{
    "name": "players",
    "type": "player",
    "index_type": "i64",
    "key_names": ["id"],
    "key_types": ["int64"]
}
```

table 名是 `players`,结构体类型是 `players`，主键名称是 `id`，类型是 `int64`。


用一句话总结上面的 ABI 定义：

数据表 player 有3个字段 id、nickname、age，类型分别是：int64、my_account_name、init32，主键是 id。

action 实现一个 hi 方法，传递参数名是 nickname，类型是 my_account_name。

更多的数据类型以及系统默认的数据类型不在本章节内容介绍了，大家可以查阅其他资料了解更多。

## 如何在 FIBOS 中实现数据持久化？

到现在大家应该会定义一个 ABI JSON文件了，那么让我们来结合示例代码操作一番吧！

我们使用一个新账户 `hellocode2` 发布一个数据持久化的合约，保存代码为 `deploy_contract2.js`：

```
var FIBOS = require('fibos.js');

var fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';

//创建合约账户
var name = 'hellocode2';
fibos.newaccountSync({
	creator: 'eosio',
	name: name,
	owner: pubkey,
	active: pubkey
});

//发布一个合约
var abi = {
	"version": "eosio::abi/1.0",
	"types": [{
		"new_type_name": "my_account_name",
		"type": "name"
	}],
	"structs": [{
		"name": "player",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}, {
			"name": "age",
			"type": "int32"
		}]
	}, {
		"name": "hi",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}]
	}],
	"actions": [{
		"name": "hi",
		"type": "hi",
		"ricardian_contract": ""
	}],
	"tables": [{
		"name": "players",
		"type": "player",
		"index_type": "i64",
		"key_names": ["id"],
		"key_types": ["int64"]
	}]
};

//由 hellocode 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

fibos.setabiSync(name, abi);

var js_code = `exports.hi = nickname => console.error(db);`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

运行脚本： `fibos deploy_contract2.js`。

让我们来调用一下合约，查看这个 db 对象是什么，保存下面代码 `call_contract2.js`：

```
var FIBOS = require('fibos.js');

//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';
var name = 'hellocode2';

//由 hellocode2 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

var ctx = fibos.contractSync(name);
var r = ctx.hiSync(name, {
	authorization: name
});

console.error(r.processed.action_traces[0].console);
```

运行脚本：`fibos call_contract2.js`。

输出结果：

```
{
  "players": [Function]
}
```

返回合约内 所有table 类 Class，我们可以使用这个类 Class来实例 table 进行对数据的 CURD 操作，接下来让我们来实战一下吧！


## 如何在 FIBOS 中操作持久化数据？

让我们在这章节熟悉如何在合约内实例 DB 对象以及实践对数据表的 CURD。


### 更新合约 CURD

让我们通过更新合约来实现一个支持对数据表 CURD 的合约，代码保存至 `update_contract2.js`：

```
var FIBOS = require('fibos.js');
//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';

//创建合约账户
var name = 'hellocode2';
//发布一个合约
var abi = {
	"version": "eosio::abi/1.0",
	"types": [{
		"new_type_name": "my_account_name",
		"type": "name"
	}],
	"structs": [{
		"name": "player",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}, {
			"name": "age",
			"type": "int32"
		}]
	}, {
		"name": "param",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}]
	}],
	"actions": [{
		"name": "emplace",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "get",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "modify",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "erase",
		"type": "param",
		"ricardian_contract": ""
	}],
	"tables": [{
		"name": "players",
		"type": "player",
		"index_type": "i64",
		"key_names": ["id"],
		"key_types": ["int64"]
	}]
};

//由 hellocode 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

fibos.setabiSync(name, abi);

var js_code = `
exports.emplace = param => {
	var players = db.players(action.account, action.account);

	players.emplace(action.account, {
		nickename: "fibos",
		age: 18,
		id: 1
	});

	console.log(players.get(1));
}

exports.get = param => {
	var players = db.players(action.account, action.account);
	console.log(players.get(1));
}


exports.modify = param => {
	var players = db.players(action.account, action.account);
	players.modify(1, action.account, {
		nickename: "fibos2",
		age: 19,
		id: 1
	});

	console.log(players.get(1));
}

exports.erase = param => {
	var players = db.players(action.account, action.account);
	players.erase(1);

	console.log(players.get(1));
}
`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

运行脚本：`fibos update_contract2.js`。

解读一下脚本：

`var players = db.players(action.account, action.account)` 实例一个 player table。

定义了 4个 CURD 合约 action ：`emplace` `get` `modify` `erase`。

### 调用合约 CALL

保存下面的调用合约代码至 `call_curd_contract2.js`：

```

```
