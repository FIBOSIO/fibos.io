# 搭建一个 FIBOS 开发环境

阅读完本文你可以通过简单的编程，学会如何搭建一个简单的 FIBOS 开发环境，本文的测试代码使用 Mac OSX 的操作系统。

FIBOS 支持自定义加载模块 `plugin`，一些默认配置说明：

- HTTP 服务端口8888，提供 HTTP 服务，通过 RPC 进行交互
- P2P 监听端口9876，与其他节点互联同步数据


本章节涉及到代码的目录结构:

```
hello_fibos/
└── start_fibos
    └── node.js
```

新建目录
```
mkdir hello_fibos
mkdir hello_fibos/start_fibos/
```

## 快速搭建一个简单的 FIBOS 环境

### 环境配置脚本(node.js)

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

新建开发环境目录`fibos`,以上代码保存至`node.js`:

```
~$ mkdir fibos
~$ cd fibos/
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

通过日志可以查看到环境脚本中加载的模块: http、chain、net已经成功加载,节点使用账户`eosio`出块。

让我们简单分析一下启动过程：

1. 开启了 HTTP 服务，监听端口8888

```
2018-07-30T03:28:59.907 thread-0   http_plugin.cpp:344           plugin_initialize    ] configured http to listen on 127.0.0.1:8888
2018-07-30T03:29:00.478 thread-1   http_plugin.cpp:401           plugin_startup       ] start listening for http requests
```

2. 启动chain模块，使用默认创世配置（genesis），区块高度从#1开始

```
2018-07-30T03:28:59.907 thread-0   chain_plugin.cpp:271          plugin_initialize    ] initializing chain plugin
2018-07-30T03:28:59.907 thread-0   chain_plugin.cpp:508          plugin_initialize    ] Starting up fresh blockchain with default genesis state.
2018-07-30T03:29:00.512 thread-1   chain_plugin.cpp:596          plugin_startup       ] starting chain in read/write mode
2018-07-30T03:29:00.512 thread-1   chain_plugin.cpp:600          plugin_startup       ] Blockchain started; head block is #1, genesis timestamp is 2018-06-01T12:00:00.000

```

3. P2P监听在默认9876端口

节点ID是`669c9ac5d547873f8d3a6bf1b84e23d2471823e41c1e1c0f36bfea81b83c9561`

```
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:2941           plugin_initialize    ] Initialize net plugin
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:2966           plugin_initialize    ] host: 0.0.0.0 port: 9876
2018-07-30T03:29:00.466 thread-0   net_plugin.cpp:3036           plugin_initialize    ] my node_id is 669c9ac5d547873f8d3a6bf1b84e23d2471823e41c1e1c0f36bfea81b83c9561
2018-07-30T03:29:00.512 thread-1   net_plugin.cpp:3049           plugin_startup       ] starting listener, max clients is 25
```

4. 开启 history以及chain API模块

```
2018-07-30T03:29:00.512 thread-1   chain_api_plugin.cpp:75       plugin_startup       ] starting chain_api_plugin
2018-07-30T03:29:00.514 thread-1   history_api_plugin.cpp:38     plugin_startup       ] starting history_api_plugin
```

5. 使用系统默认账户 `eosio` 	开启区块生产

```
2018-07-30T03:29:00.514 thread-1   producer_plugin.cpp:640       plugin_startup       ] producer plugin:  plugin_startup() begin
2018-07-30T03:29:00.515 thread-1   producer_plugin.cpp:658       plugin_startup       ] Launching block production for 1 producers at 2018-07-30T03:29:00.515.
2018-07-30T03:29:00.516 thread-1   producer_plugin.cpp:670       plugin_startup       ] producer plugin:  plugin_startup() end
2018-07-30T03:29:01.004 thread-1   producer_plugin.cpp:1194      produce_block        ] Produced block 00000002e091c956... #2 @ 2018-07-30T03:29:01.000 signed by eosio [trxs: 0, lib: 0, confirmed: 0]
```


恭喜你已经成功运行一个 FIBOS 节点服务，现在你可以开始进行本地编码测试了，[使用 fibos.js 与 FIBOS 交互](fibosjs.md)，更多高级用法可以继续查看下面内容!

## 高级用法

FIBOS 中 `load`方法支持参数传递，下面详细的介绍。


1. 配置监听端口以及地址

(1) 开启 HTTP 服务对所有地址的8889端口监听
(2) 开启 P2P 服务队所有地址的9877端口监听


```
fibos.load("http", {
	"http-server-address": "0.0.0.0:8889"
});

fibos.load("net", {
	"p2p-listen-endpoint": "0.0.0.0:9877"
});

```

2. 配置 FIBOS 配置以及数据目录

查看当前的配置以及数据目录：

```
//查看
console.notice("config_dir:", fibos.config_dir);

console.notice("data_dir:", fibos.data_dir);

//配置（不存在默认创建）
fibos.config_dir = "fibos_config_dir/";

fibos.data_dir = "fibos_data_dir/";

```

3. 配置启动时重置 FIBOS 环境数据

开发过程中如果需要重置环境数据，可以使用下面的配置:

```
fibos.load("chain", {
	"delete-all-blocks": true
});
```

## 使用 fibos.js 与 FIBOS 交互
现在你已经有了一个 FIBOS 开发环境，让我们了解一下 fibos.js 这个库，编写一个JavaScript Client，它可以通过 HTTP 协议与 FIBOS 进行交互，让我们开始学习吧!

👉 【[使用 fibos.js 与 FIBOS 交互](fibosjs.md)】