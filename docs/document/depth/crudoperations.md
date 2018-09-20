# 模块 db 中的 CRUD 操作

## 1. 了解 FIBOS 的数据持久化

* **对于FIBOS 的 JavaScript 合约为什么需要数据持久化**

FIBOS  的 JavaScript 合约运行在一个独立的沙箱环境内，对于每一次的合约 action 操作来说，action 的上下文环境（Apply Context）都是新建的，类似于新建一个合约的实例，当 action 执行完毕后，所有定义的内容都会释放。合约的每个 action 操作都是独立的，因此为了帮助业务中存储过程数据就需要合约能够做到数据的持久化。



## 2.  JavaScript 合约如何进行 CRUD 操作

* **发布一个 JavaScript 合约**

首先让我们通过发布合约来实现一个支持对数据表的 CRUD 的合约，代码保存至 `update_contract2.js`：

```javascript
var FIBOS = require('fibos.js');
//合约所属账户 hellocode2 的公私钥对

let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';

//创建合约账号
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
	    "name":"nickname",
	    "type":"my_account_name"
	},{
	    "name":"age",
	    "type":"int32"
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
        "name": "hi",
        "type": "hi",
        "ricardian_contract": ""
    }],
     "tables": [{
        "name": "players",
        "type": "player",
        "index_type": "i64",
        "key_names": ["nickname"],
        "key_types": ["my_account_name"]
    }]
}
//由 hellocode2 提供私钥发布合约
fibos = FIBOS({
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    keyProvider: prikey,
    httpEndpoint: 'http://127.0.0.1:8888',
    logger: {
       log: null,
       error: null }
})
fibos.setabiSync(name, abi);
                
```



* **对数据表进行 CRUD**

CRUD — 保存


```javascript
exports.emplace = param => {
    var players = db.players(action.account, action.account);
    players.emplace(action.account, { 
        title: "ceo",
        age:48, 
        nickname:"lion1",
        id:123
      });
};
```



CRUD — 查看

```javascript
exports.find = param => {
    var players = db.players(action.account, action.account);
    console.log(players.find(v))
};
```



CRUD — 修改

```javascript
exports.update = param {
    var players = db.players(action.account, action.account);
    players.update(
        123, 
        action.account, 
      { 
        title: "cto", 
        age:23, 
        id:123 
      }
    );
};
```



CRUD — 删除

```javascript
exports.remove => param {
    var players = db.players(action.account, action.account);
    players.remove(123);
};
```

定义了4个 **CRUD** 合约 action：分别为 emplace，find，update，remove。

## 3. 结语

* 模块 db 是 FIBOS 中的基础模块 — 数据库访问模块，可用于创建和操作数据库资源。
* 引用方式：`var db = require('db');`
* 通过 db 对象可以对数据表进行 CURD 操作。
