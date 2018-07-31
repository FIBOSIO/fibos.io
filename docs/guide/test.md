# 开始体验 FIBOS 超棒的 测试框架

阅读完本章你可以学会如何使用 FIBOS 的编写测试用例，下面介绍了几个例子。

本章涉及到的文件列表:

```
hello_fibos/
├── fibos_client
│   ├── case.js
│   ├── client.js
│   ├── deploy.js
│   ├── hello
│   │   ├── hello.abi
│   │   └── hello.js
│   ├── package.json
│   ├── sample_test.js
│   └── test_contract.js
└── start_fibos
    └── node.js
```

## 一个简单的测试用例

以下代码保存至工作目录 `sample_test.js`:

```JavaScript
var test = require('test');
test.setup();

describe('a sample case', () => {
    var name;

    before(()=>{
        name = "FIBOS";
    });

    it('check name', () => {
        assert.equal(name,"FIBOS");
    });
});

test.run();
```

执行:

```
fibos sample_test.js
```

输出结果:

```sh
    a sample case
    √ check name

  √ 1 tests completed (0ms)
```

## 开始编写 FIBOS 业务场景测试用例

测试用例是模拟真实 API 操作，因此为了保证业务独立性，下面的用例在用例中需要启动了一个 FIBOS 作为测试，你可以使用2种方式进行用例的测试：

1. 手动运行 FIBOS 的节点服务

```
fibos node.js
```

2. 集成在测试用例中

使用 FIBOS 子进程的方式将 FIBOS 节点服务集成在用例中，如下面示例:

```
console.warn("启动FIBOS eosio");
var subProcess = process.start("fibos", ["node.js"]);
coroutine.sleep(5000);

```

### 写一个新建 FIBOS 账户的测试用例

首先我们手动运行 FIBOS 节点服务，保证 HTTP 可以正常通信。


以下代码保存至工作目录 `case.js`:

```JavaScript
var test = require('test');
test.setup();

var FIBOS = require('fibos.js')
var name = "eosio";
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": name,
    "public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
};


describe('new account FIBOS', () => {
    var fibos;

    before(() => {
        fibos = FIBOS({
            chainId: config["chainId"],
            keyProvider: config["private-key"],
            httpEndpoint: config["httpEndpoint"],
            logger: {
                log: null,
                error: null
            }
        });
    });

    it('new account', () => {
        fibos.newaccountSync({
            creator: 'eosio',
            name: "hellofibos",
            owner: config["public-key"],
            active: config["public-key"]
        })
    });

    it("get account", () => {
        var c = fibos.getAccountSync('hellofibos');
        assert.equal(c.account_name, "hellofibos");
    });
});

require.main === module && test.run(console.DEBUG);
```

输出结果:

```
 new account FIBOS
    √ new account
    √ get account

  √ 2 tests completed (13ms
```

### 写一个合约的测试用例

上一章节介绍了写一个JS 合约，基于上面的文件结果，进行测试用例的编写：

```
├── fibos_client
│   ├── call.js 调用合约接口脚本文件
│   ├── deploy.js 加载、发布合约脚本文件
│   ├── hello
│   │   ├── hello.abi 合约abi文件
│   │   └── hello.js 合约代码文件

```

以下代码保存至工作目录 `test_contract.js`:

```JavaScript
var test = require('test');
test.setup();

var FIBOS = require('fibos.js')
var contractName = "hello";
var fs = require("fs");
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": "eosio",
    "public-key": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
};


describe('new account FIBOS', () => {
    var fibos;

    before(() => {
        fibos = FIBOS({
            chainId: config["chainId"],
            keyProvider: config["private-key"],
            httpEndpoint: config["httpEndpoint"],
            logger: {
                log: null,
                error: null
            }
        });
    });

    it('get code', () => {
        var js_code = fs.readTextFile("./hello/hello.js");
        var code = fibos.getCodeSync(contractName, true);
        assert.equal(code.wast, fibos.compileCode(js_code).hex());
    });

    it('setabi', () => {
        var abi = JSON.parse(fs.readTextFile("./hello/hello.abi"));
        fibos.setabiSync(contractName, abi);
    });
});

require.main === module && test.run(console.DEBUG);
```

## 如何加入到 FIBOS TestNet?

到现在你已经了解了基于 FIBOS 的整个开发过程，FIBOS 提供了一套 TestNet 环境，让我们先了解下它是什么？它可以做什么？

👉 [FIBOS TestNet 是什么？](abouttestnet.md)