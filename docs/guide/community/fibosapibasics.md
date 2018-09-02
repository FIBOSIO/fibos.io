# fibos.js API 基础篇

> 自从8月1号 FIBOS 测试网上线以来，大量的开发者们怀着期待或尝试的态度投入到了 FIBOS 的学习之中。FIBOS 小助理的微信甚至一度被加到瘫痪，社区和微信群的用户们也给我们提出了大大小小，各式各样的问题，我们会一一解答大家的疑问，同时也会不断的完善 [FIBOS 官网](https://fibos.io/) 上的开发者文档，并在 [GitHub](https://github.com/FIBOSIO) 附上对用的用例代码。

今天给大家分享一下 fibos.js 开发中基础常用 API,掌握了这些 API 就能够使用 fibos.js 来进行简单开发

### 相似与相异

fibos.js 与 eosjs 相比并没有增加新的方法。与 eosjs 不同的是在 fibos.js 中,你无须去理会那些可怕异步函数,使用同步函数便可以完成那些相同的操作。

例:

```
// Eosjs
fibos.getInfo((error, result) => { console.log(error, result) })

// fibos.js
console.log(fibos.getInfoSync());
```

### 环境搭建

使用 FIBOS 客户端 API 之前，需要搭建好开发环境，具体搭建过程，参见[安装FIBOS运行环境](../basic/install.md)。

配置好运行环境后，下面就让我们开始愉快地使用 API 吧！

### 起步

- 安装 fibos.js 库

```
fibos --install fibos.js
```

- 通过 fibos.js 来体验 FIBOS 和 EOS

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

- 测试

```
fibos test
```

### 七大常用 API

##### 1.获取区块信息

```
fibos.getBlockSync("block_number");
```

##### 2.获取当前区块高度

```
fibos.getInfoSync().head_block_num;
```

##### 3.获取当前不可逆区块高度

```
fibos.getInfoSync().last_irreversible_block_num;
```

##### 4.新建一个 Fibos 账号

```
fibos.newaccountSync({
    creator: 'eosio',
    name: "hellofibos",
    owner: ["public-key"],
    active: ["public-key"]
});
```

##### 5.获取账户余额

```
fibos.getTableRowsSync(true, "eosio.token", "your acount name", "accounts")
```

##### 6.获取账户信息

```
fibos.getAccountSync("your account name");
```

##### 7.发起一笔转账

```
fibos.contractSync("eosio.token").transferSync("your account name", "transfer to account name", '1000000.0000 FO', 'transfer');
```

> Tips:1000000.0000 FO 小数点后保持四位小数,否则无法成功转账

最后你也可以通过:

```
console.log(fibos)
```

这一行代码来查看完整的 fibos.js 的 API



读完这篇文章,你应该就了解了 fibos.js 的基础 API 和查看完整 API 的方法,当然我们会在后期的文章中给大家带来更深入的 API 用法的介绍,也请大家持续关注我们 FIBOS 社区.