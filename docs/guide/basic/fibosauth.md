# 由浅入深理解 FIBOS 权限系统

阅读本章节之后大家将理解 FIBOS 的权限系统，能够在实际业务开发中合理的配置、管理账户权限。

FIBOS 的权限沿用了 EOS 的账户权限设计，本文由浅入深的讲解账户权限在 FIBOS 中的具体应用，文章内容可以帮助大家理解下面几个问题：

1. FIBOS 中的账户以及权限是什么？

2. FIBOS 中的账户与权限的关系是什么？

3. 如何在 FIBOS 中配置账户权限？

4. FIBOS 中的账户权限如何应用到合约中？


本章内容示例开发环境： Mac OSX

示例代码：https://github.com/FIBOSIO/samples

本文涉及到相关知识：

- fibos.js 的使用 
- 安装 FIBOS
- 编写 JavaScript 合约

大家可以通过 FIBOS 官方网站学习：https://fibos.io


## FIBOS 中的账户以及权限是什么？

### 浅谈什么是账户

账户有别于 BTC、ETH 中的地址，它是一个可识别、可阅读、便于记录的字符串，例如：你的游戏英文昵称 hellofibos。

账户的命名按照 EOS 的账户设计，它是有规则的，规则是：数字必须是1-5，字母a-z(小写)，长度不大于12位。

目前 EOS BIOS 启动后账户名称长度必须是12位，对于技术工程师来说有一点必须了解，短账户名(小于12位)是由系统合约控制的，大家如果对这个感兴趣，可以了解一下 EOS 的短名称竞标的相关信息。

以上所有阐述内容，也正是 FIBOS 的账户描述，那么账户在 FIBOS 的系统中有什么作用呢？

FIBOS 的账户可以拥有资源以及关联合约，拥有资源可以理解为 FIBOS 中 FO币、RAM、CPU、NET等资源都归属于账户，关联合约可以理解为合约必须所属账户。账户可以被授权做一些事务，比如：转账、合约 action。

以上是对 FIBOS 中账户的理解，那么 FIBOS 的权限又是什么？

### 浅谈什么是权限

传统的业务场景的权限设计，包含：角色、功能、用户，功能关联角色，用户关联角色，举例解释：小明的角色是财务，财务的角色拥有转账、充值、提现等功能。

而对于 FIBOS 的权限系统可能需要换一种理解方式，账户权限有3种： owner、active、publish，一个账户必须“关联” owner、active 权限。

这里可能大家无法理解，为什么不是一个账户必须“拥有” owner、active 权限，而是“关联”，下面内容会解释账户和权限的关系。

我们先简单理解下 这些权限的作用范围：

- owner 拥有超级权限，代表着账户的归属者，因为拥有此权限者可以用于操作其他权限配置，该权限常用事务中（转账、合约 action 等）一般不会使用
- active 常用业务的权限，比如：转账、投票等
- publish 非系统权限，暂时未应用

## FIBOS 中的账户与权限的关系是什么？

到目前大家已经对 FIBOS 的账户以及权限有了一个大致的了解，下面我们结合示例代码深入的讲解 FIBOS 的账户和权限的关系，开始动手吧！

### 创建一个 FIBOS 账户

使用 `fibos.js` 和 FIBOS 节点服务创建一个账户，让我们先启动一个 FIBOS 节点服务，保存代码至工作目录 `node.js`：

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

运行节点服务:
```
fibos node.js
```

使用 `fibos.js` 作为客户端向 FIBOS 节点服务提交一个创建用户的请求，保存下面的代码到工作目录 `test_account.js`:

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

//账户 hellofibos 的公私钥对
let pubkey = "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR";
let prikey = '5KMx2vJR1L2rsrKuND4N6YM1gu26jwUjn5ZLorBeWnK15DfraQW';

var name = 'hellofibos';
fibos.newaccountSync({
  creator: 'eosio',
  name: name,
  owner: pubkey,
  active: pubkey
});

var c = fibos.getAccountSync(name);
console.notice(c);
```

运行脚本:

```
fibos test_account.js
```

输出结果:

```
{
  "account_name": "hellofibos",
  "head_block_num": 3856,
  "head_block_time": "2018-08-09T06:26:29.000",
  "privileged": false,
  "last_code_update": "1970-01-01T00:00:00.000",
  "created": "2018-08-09T06:26:29.500",
  "ram_quota": -1,
  "net_weight": -1,
  "cpu_weight": -1,
  "net_limit": {
    "used": -1,
    "available": -1,
    "max": -1
  },
  "cpu_limit": {
    "used": -1,
    "available": -1,
    "max": -1
  },
  "ram_usage": 2724,
  "permissions": [
    {
      "perm_name": "active",
      "parent": "owner",
      "required_auth": {
        "threshold": 1,
        "keys": [
          {
            "key": "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR",
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
            "key": "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR",
            "weight": 1
          }
        ],
        "accounts": [],
        "x": []
      }
    }
  ],
  "total_resources": null,
  "self_delegated_bandwidth": null,
  "refund_request": null,
  "voter_info": null
}
```

### 从代码以及结果分析账户与权限

简单分析一下执行的脚本：

```
fibos.newaccountSync({
	creator: 'eosio',
	name: name,
	owner: pubkey,
	active: pubkey
});
```

这段脚本可以看到我们把 owner、active 权限的控制权限给了公钥 `EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR`,也就说此公钥所对应私钥的拥有者可以获得该账户的 owner、active 权限。

让我们再来分析一下输出结果：

```
"ram_quota": -1,
"net_weight": -1,
"cpu_weight": -1,
```

因为仅仅是使用 eosio 账户创建 hellofibos，并没有为新账户抵押任何资源，所以 RAM、NET、CPU 资源是 `-1`。

(关于 RAM、CPU、NET 等资源文章，我们也会陆续发布，请大家及时关注)

```
"permissions": [
{
  "perm_name": "active",
  "parent": "owner",
  "required_auth": {
    "threshold": 1,
    "keys": [
      {
        "key": "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR",
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
        "key": "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR",
        "weight": 1
      }
    ],
    "accounts": [],
    "waits": []
  }
}
 ]
```

这段输出结果可以看到 owner、active 权限控制者确实是公钥 `EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR` 的拥有者。

### 理解 weight 和 threshold 的含义

了解了上面这些其实并没有深入理解权限的核心，其中还有一些知识需要去理解，比如返回值中 `weight`  和 `threshold` 的含义，我们用一张图表来解释这个问题：

- weight 权重
- threshold 阈值

| 权限名称  | 所属公钥  | 权重 | 阈值 |
|:-------------: |:---------------:| :-------------:| :-------------:|
| owner      |  |          |  1|
|       | EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR |         1 | - |
| active      |  |          |  1|
|       | EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR |         1 | - |

如表所示，如果要获得 owner 权限授权，拥有者的权重必须大于等于 owner 所对应的阈值，上面的示例 owner 的阈值是1，而所属公钥 `EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR` 的权重是1，所以这个所属公钥就可以直接获取 owner 进行操作。

active 权限同上面的解释,我们把这种只有一个所属公钥的账户理解为单签账户。

那么让我们来看看多签账户，再看下面的图表：

| 权限名称  | 所属公钥  | 权重 | 阈值 |
|:-------------: |:---------------:| :-------------:| :-------------:|
| owner      |  |          |  2|
|       | EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR |         1 | - |
|       | EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D |         1 | - |
| active      |  |          |  1|
|       | EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR |         1 | - |


大家应该可以理解上面的图表了，要想获得 owner 权限，必须2个所属公钥同时授权才可以获得，对于这方面的多签内容不在本章说明，我们会以多签的技术专题发布讲解。

## 如何在 FIBOS 中配置账户权限？

我们来尝试更改一下账户 hellofibos 的 active 权限，保存代码至工作目录 `test_power.js`:

```
var FIBOS = require('fibos.js');

//账户 hellofibos 的公私钥对
let pubkey = "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR";
let prikey = '5KMx2vJR1L2rsrKuND4N6YM1gu26jwUjn5ZLorBeWnK15DfraQW';

//账户 hellofibos2 的公私钥对
let pubkey2 = "EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D";
let prikey2 = '5JhJaiRmvpR8MmvrxGFYGoC7tG9icYkooLFUdVMDJ5cAsLTbsob';

var name = 'hellofibos';
var name2 = 'hellofibos2';

//创建 hellofibos2 账户

var fibos = FIBOS({
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
  httpEndpoint: 'http://127.0.0.1:8888',
  logger: {
    log: null,
    error: null
  }
});
fibos.newaccountSync({
  creator: 'eosio',
  name: name2,
  owner: pubkey2,
  active: pubkey2
});


//修改hellofibos 的active权限,客户端 需要更改为 hellofibos 的私钥
fibos = FIBOS({
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: '5KMx2vJR1L2rsrKuND4N6YM1gu26jwUjn5ZLorBeWnK15DfraQW',
  httpEndpoint: 'http://127.0.0.1:8888',
  logger: {
    log: null,
    error: null
  }
});

let ctx = fibos.contractSync("eosio");
ctx.updateauthSync({
  account: name,
  permission: "active",
  parent: 'owner',
  auth: {
    threshold: 1,
    keys: [{
      key: "EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D",
      weight: 1
    }]
  }
});

var c = fibos.getAccountSync(name);
console.notice(c);
```

执行脚本:
```
fibos test_power.js
```

输出结果:
```
{
  "account_name": "hellofibos",
  "head_block_num": 524,
  "head_block_time": "2018-08-09T09:55:56.000",
  "privileged": false,
  "last_code_update": "1970-01-01T00:00:00.000",
  "created": "2018-08-09T09:51:38.500",
  "ram_quota": -1,
  "net_weight": -1,
  "cpu_weight": -1,
  "net_limit": {
    "used": -1,
    "available": -1,
    "max": -1
  },
  "cpu_limit": {
    "used": -1,
    "available": -1,
    "max": -1
  },
  "ram_usage": 2724,
  "permissions": [
    {
      "perm_name": "active",
      "parent": "owner",
      "required_auth": {
        "threshold": 1,
        "keys": [
          {
            "key": "EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D",
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
            "key": "EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR",
            "weight": 1
          }
        ],
        "accounts": [],
        "waits": []
      }
    }
  ],
  "total_resources": null,
  "self_delegated_bandwidth": null,
  "refund_request": null,
  "voter_info": null
}
```

简单分析一下脚本，脚本新建了账户 hellofibos2，我们把 hellofibos 的 active 权限转移给了公钥 `EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D`。

做一张权限表格更加清楚的理解：

那么让我们来看看多签账户，再看下面的图表：

| 权限名称  | 所属公钥  | 权重 | 阈值 |
|:-------------: |:---------------:| :-------------:| :-------------:|
| owner      |  |          |  1|
|       | EOS5dZut9MG9ZdqrT1WYdPkp1Txxi6JLRYEgYCtAUDWH6ymNqdJpR |         1 | - |
| active      |  |          |  1|
|       | EOS5UFAzxUsbjQCijL5LtS6TaTtkJgPJACZ8qwDpXyLaW3sE9Ed2D |         1 | - |


如表所示，owner 和 active 所属的公钥是不一样的，所以2种权限分别掌握在2个人手中。

## FIBOS 中的账户权限如何应用到合约中？

一般的事务中会有转账、合约的action等操作，这些都会涉及到账户权限的知识，学习到这里，大家应该对账户与权限已经有一定了解，FIBOS 提供使用 JavaScript 编写合约，那么如何在 FIBOS 的合约中控制权限呢？下面会通过示例来为大家演示。

让我们先来实现一个简单的合约，保存代码至工作目录 `test_code.js`:

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

var js_code = `exports.hi = v => console.error(action);`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

运行脚本：
```
fibos test_code.js
```


执行结束后，我们使用 hellocode 账户发布了一个合约，合约提供一个 hi 方法，该方法仅仅打印输出了 action 这个对象，那么我们开始尝试调用合约。

action 对象对于权限控制非常重要，请继续阅读。

### 解读合约内 action 对象

让我们写一个调用合约脚本，查看 action 对象是一个什么？保存代码至工作目录 `test_call.js`:

```
var FIBOS = require('fibos.js');

//合约所属账户 hellocode 的公私钥对
let pubkey = "EOS5L9g2mnC4zZMZWDR8VBksz3exFmXV4kwfj65oYeKdqRPc2oPFW";
let prikey = '5KMg9oUf5caX9yku7zQQwKZQLukRW7dMHaST8njpBf22puUvjea';

var name = 'hellocode';

var fibos = FIBOS({
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

执行脚本:
```
fibos test_call.js
```

输出:
```
{
  "is_account": [Function],
  "has_recipient": [Function],
  "require_recipient": [Function],
  "has_auth": [Function],
  "require_auth": [Function],
  "name": "hi",
  "account": "hellocode",
  "receiver": "hellocode",
  "publication_time": 1533814906500000,
  "authorization": [
    {
      "actor": "hellocode",
      "permission": "active"
    }
  ]
}
```

分析一下脚本以及结果：

- r.processed.action_traces[0].console 合约执行过程打印的信息会出现在返回值中
- is_account 判断是否是一个账户
- has_auth 判断账户是否拥有权限
- require_auth 获取某个账户是否拥有某个权限
- name action 方法的名称
- account 合约所属账户
- authorization 调用 hi 方法的账户、权限信息

### 让我们来试试 action 的权限控制

首先我们先来更新一下合约，保存代码 `test_updatecode.js`:

```
var FIBOS = require('fibos.js');

//合约所属账户 hellocode 的公私钥对
let pubkey = "EOS5L9g2mnC4zZMZWDR8VBksz3exFmXV4kwfj65oYeKdqRPc2oPFW";
let prikey = '5KMg9oUf5caX9yku7zQQwKZQLukRW7dMHaST8njpBf22puUvjea';
var name = 'hellocode';

var fibos = FIBOS({
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: prikey,
  httpEndpoint: 'http://127.0.0.1:8888',
  logger: {
    log: null,
    error: null
  }
});

var js_code = `exports.hi = v => console.error(action.has_auth(v));`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

运行脚本:

```
fibos test_updatecode.js
```

这段脚本的含义是判断调用者是否拥有对参数 v 这个用户的 active 权限，让我们写一个脚本开始测试一下吧！

保存以下代码到工作目录 `test_call2.js`:

```
var FIBOS = require('fibos.js');

//合约所属账户 hellocode 的公私钥对
let pubkey = "EOS5L9g2mnC4zZMZWDR8VBksz3exFmXV4kwfj65oYeKdqRPc2oPFW";
let prikey = '5KMg9oUf5caX9yku7zQQwKZQLukRW7dMHaST8njpBf22puUvjea';
var name = 'hellocode';

var fibos = FIBOS({
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: prikey,
  httpEndpoint: 'http://127.0.0.1:8888',
  logger: {
    log: null,
    error: null
  }
});

var ctx = fibos.contractSync(name);
var r = ctx.hiSync('hellocode', {
  authorization: name
});

console.error(r.processed.action_traces[0].console);


var ctx = fibos.contractSync(name);
var r = ctx.hiSync('eosio', {
  authorization: name
});

console.error(r.processed.action_traces[0].console);
```

执行脚本:

```
fibos test_call2.js
```

输出结果:

```
true
false
```

根据结果，代表 hellocode 账户 拥有 hellocode 的active 权限，但是并不拥有 eosio 这个账户的 active 权限。

大家可以尝试升级合约使用 `require_auth` 替换 `has_auth`, `require_auth` 执行如果不是预期结果会执行退出合约。


到目前为止，整篇内容全部讲解完毕，大家可以思考一下文章开头的几个问题是否都已经理解和解决了！

赶紧下载 FIBOS 按照文档动手操作一番吧！更深入的 FIBOS 账户权限解读，我们会在下期发布，感谢大家的关注！