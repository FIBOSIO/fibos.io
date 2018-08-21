# 搭建一个 FIBOS 开发环境

在前面的教程中我们已经成功安装了 FIBOS，想必你已经想要大显身手编写 JavaScript 合约了。别急，在这篇文章中，我们将带领大家搭建一个简单的 FIBOS 开发环境，在之后教程的所有环境都基于此，在你后续的学习中请保证它已经运行。

- 本文运行环境：

  系统：macOS

- 本章涉及到文章列表：

  ```
  hello_fibos/
  └── start_fibos
      └── node.js
  ```

- 本章示例代码地址：https://github.com/FIBOSIO/samples

## 快速搭建一个简单的 FIBOS 环境

### 创建目录

```
mkdir hello_fibos
mkdir hello_fibos/start_fibos/
```

### 环境配置脚本

```
var fibos = require('fibos');

fibos.load("http");
fibos.load("chain");
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});
fibos.config_dir = "fibos_config_dir/";
fibos.data_dir = "fibos_data_dir/";

fibos.start();
```

以上代码保存至工作目录 `node.js`:

```
~$ cd start_fibos/
fibos$ vim node.js
fibos$ ls
node.js
```

运行 FIBOS 开发环境:

```
fibos node.js
```

运行结果日志（节选）:
```
fibos$ fibos node.js
……
2018-07-30T03:29:01.004 thread-1   producer_plugin.cpp:1194      produce_block        ] Produced block 00000002e091c956... #2 @ 2018-07-30T03:29:01.000 signed by eosio [trxs: 0, lib: 0, confirmed: 0]
```

如果你看到了以上的消息，说明运行成功，`eosio` 已经开始区块生产。

恭喜你已经成功运行一个 FIBOS 节点服务，现在你可以开始进行本地编码测试了，[使用 fibos.js 与 FIBOS 交互](fibosjs.md)，更多高级用法可以继续查看下面内容!

## 高级用法

FIBOS 中 `load` 方法支持参数传递，下面详细的介绍。

1. 修改 FIBOS 监听端口以及地址

(1) 开启 HTTP 服务对所有地址的8889端口监听

(2) 开启 P2P 服务对所有地址的9877端口监听

```
fibos.load("http", {
	"http-server-address": "0.0.0.0:8889"
});

fibos.load("net", {
	"p2p-listen-endpoint": "0.0.0.0:9877"
});

```

(tips: FIBOS 默认 HTTP 端口8888，P2P 端口监听9876)

2. 修改 FIBOS 配置以及数据目录

查看当前的配置以及数据目录：

```
//查看
console.notice("config_dir:", fibos.config_dir);

console.notice("data_dir:", fibos.data_dir);

//配置（不存在默认创建）
fibos.config_dir = "fibos_config_dir/";

fibos.data_dir = "fibos_data_dir/";

```

3. 设置 FIBOS 服务启动时重置环境数据

开发过程中如果需要重置环境数据，可以使用下面的配置:

```
fibos.load("chain", {
	"delete-all-blocks": true
});
```

## 使用 fibos.js 与 FIBOS 交互
现在你已经有了一个 FIBOS 开发环境，让我们了解一下 fibos.js 这个库，编写一个JavaScript Client，它可以通过 HTTP 协议与 FIBOS 进行交互，让我们开始学习吧!

👉 【[使用 fibos.js 与 FIBOS 交互](fibosjs.md)】