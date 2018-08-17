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

运行结果日志:
```
fibos$ fibos node.js
2018-07-30T03:28:59.907 thread-0   http_plugin.cpp:344           plugin_initialize    ] configured http to listen on 127.0.0.1:8888
2018-07-30T03:28:59.907 thread-0   chain_plugin.cpp:271          plugin_initialize    ] initializing chain plugin
2018-07-30T03:28:59.907 thread-0   chain_plugin.cpp:508          plugin_initialize    ] Starting up fresh blockchain with default genesis state.
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:2941           plugin_initialize    ] Initialize net plugin
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:2966           plugin_initialize    ] host: 0.0.0.0 port: 9876
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:3036           plugin_initialize    ] my node_id is 669c9ac5d547873f8d3a6bf1b84e23d2471823e41c1e1c0f36bfea81b83c9561
2018-07-30T03:29:00.478 thread-1   http_plugin.cpp:401           plugin_startup       ] start listening for http requests
2018-07-30T03:29:00.478 thread-1   controller.cpp:1252           startup              ] No head block in fork db, perhaps we need to replay
2018-07-30T03:29:00.478 thread-1   controller.cpp:319            initialize_fork_db   ]  Initializing new blockchain with genesis state
2018-07-30T03:29:00.512 thread-1   chain_plugin.cpp:596          plugin_startup       ] starting chain in read/write mode
2018-07-30T03:29:00.512 thread-1   chain_plugin.cpp:600          plugin_startup       ] Blockchain started; head block is #1, genesis timestamp is 2018-06-01T12:00:00.000
2018-07-30T03:29:00.512 thread-1   net_plugin.cpp:3049           plugin_startup       ] starting listener, max clients is 25
2018-07-30T03:29:00.512 thread-1   chain_api_plugin.cpp:75       plugin_startup       ] starting chain_api_plugin
2018-07-30T03:29:00.514 thread-1   history_api_plugin.cpp:38     plugin_startup       ] starting history_api_plugin
2018-07-30T03:29:00.514 thread-1   producer_plugin.cpp:640       plugin_startup       ] producer plugin:  plugin_startup() begin
2018-07-30T03:29:00.515 thread-1   producer_plugin.cpp:658       plugin_startup       ] Launching block production for 1 producers at 2018-07-30T03:29:00.515.
2018-07-30T03:29:00.516 thread-1   producer_plugin.cpp:670       plugin_startup       ] producer plugin:  plugin_startup() end
2018-07-30T03:29:01.004 thread-1   producer_plugin.cpp:1194      produce_block        ] Produced block 00000002e091c956... #2 @ 2018-07-30T03:29:01.000 signed by eosio [trxs: 0, lib: 0, confirmed: 0]
```

如果你看到了以上的消息，说明运行成功，`eosio` 已经开始区块生产。

恭喜你已经成功运行一个 FIBOS 节点服务，现在你可以开始进行本地编码测试了，[使用 fibos.js 与 FIBOS 交互](fibosjs.md)，更多高级用法可以继续查看下面内容!

## 使用 fibos.js 与 FIBOS 交互
现在你已经有了一个 FIBOS 开发环境，让我们了解一下 fibos.js 这个库，编写一个JavaScript Client，它可以通过 HTTP 协议与 FIBOS 进行交互，让我们开始学习吧!

👉 【[使用 fibos.js 与 FIBOS 交互](fibosjs.md)】