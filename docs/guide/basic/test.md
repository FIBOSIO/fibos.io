# 开始体验 FIBOS 超棒的测试框架

不写自动测试用例的程序员不是一个好的测试工程师。我们鼓励所有的项目在启动最初，就建立完整的自动化测试用例。随着项目的发展，前期的投入会得到数百倍的回报。

阅读完本章你可以学会如何使用 FIBOS 的编写测试用例。

- 本文运行环境：

  系统：macOS

- 本章涉及到文章列表：

  ```
  fibos_client/
  ├── call.js
  ├── deploy.js
  ├── hello
  │   ├── hello.abi
  │   └── hello.js
  ├── initClient.js
  └── test
      ├── case.js
      ├── sample_test.js
      └── test_contract.js
  ```

- 本章示例代码地址：https://github.com/FIBOSIO/samples

## 一个简单的测试用例

创建测试用例文件夹：

```
mkdir test
cd test
```

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

同样的，以下代码保证本地的 FIBOS 节点服务正在运行。

### 写一个新建 FIBOS 账户的测试用例

以下代码保存至工作目录 `case.js`:

```javascript
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

  √ 2 tests completed (13ms)
```

### 写一个合约的测试用例

上一章节介绍了写一个 JS 合约，基于上面的文件结果，进行测试用例的编写：

```
├── fibos_client
│   ├── call.js 调用合约接口脚本文件
│   ├── deploy.js 加载、发布合约脚本文件
│   ├── initClient.js FIBOS连接文件
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
        var js_code = fs.readTextFile("../hello/hello.js");
        var code = fibos.getCodeSync(contractName, true);
        assert.equal(code.wast, fibos.compileCode(js_code).hex());
    });

    it('setabi', () => {
        var abi = JSON.parse(fs.readTextFile("../hello/hello.abi"));
        fibos.setabiSync(contractName, abi);
    });
});

require.main === module && test.run(console.DEBUG);
```
