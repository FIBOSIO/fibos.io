# 搭建一个 FIBOS 开发环境

阅读完本文你将搭建一个 FIBOS 开发环境，为后续的开发做好准备工作。

首先你可以学会如何通过 `curl` 工具快速安装 FIBOS，也可以学会如何在 UNIX 系统下编译 FIBOS 并安装。

FIBOS 支持常用的 UNIX 操作系统，比如 Mac OSX, Linux 和 FreeBSD。

对于快速入门，我们推荐使用快速安装的方式，对于高级用户可以查看本章 UNIX 操作系统下编译。

然后我们将带领大家搭建一个简单的本地 FIBOS 节点，保证大家学习的需要。

## 快速安装

```
快速安装: curl -s https://fibos.io/download/installer.sh |sh
```

安装结束后 FIBOS 可执行文件在系统 `bin` 目录下，使用查看 FIBOS 版本：

```
~$ which fibos
/usr/local/bin/fibos

~$ fibos --version
v0.27.0-dev
```

FIBOS 是一个可执行文件，它继承了 FIBJS 的 JavaScript CLI 命令行控制台功能，直接执行 FIBOS 回车，进入命令行交互模式，如:

```
~$ fibos
Welcome to fibjs 0.26.0-dev.
Type ".help" for more information.
> console.log("hello,FIBOS!")
hello,FIBOS!
> .info
{
  "fibjs": "0.27.0-dev",
  "git": "v0.26.0-4-gb2bc253c4",
  "clang": "9.1",
  "date": "Aug 19 2018 17:40:51",
  "vender": {
    "ev": "4.24",
    "expat": "2.2.5",
    "gd": "2.2.4",
    "jpeg": "8.3",
    "leveldb": "1.17",
    "mongo": "0.7",
    "pcre": "8.21",
    "png": "1.5.4",
    "mbedtls": "2.6.1",
    "snappy": "1.1.2",
    "sqlite": "3.23.0",
    "tiff": "3.9.5",
    "uuid": "1.6.2",
    "v8": "6.8.275.14",
    "v8-snapshot": true,
    "zlib": "1.2.7",
    "zmq": "3.1"
  }
}
>
```

### FIBOS 常用命令

1. `package.json` 配置初始化

效果同 `npm init`

```
fibos --init
```

2. 安装包

效果同 `npm install fibos.js`

```
fibos --install fibos.js
```

## UNIX 操作系统下编译

FIBOS 暂时未开源，待开源后提供编译教程!



## 搭建一个 FIBOS 开发环境

到目前为止，我们已经拥有一个可执行的 FIBOS，想必你已经想大显身手编写 JavaScript 合约了。别急，接下来，我们将带领大家搭建一个简单的 FIBOS 开发环境。
之后的教程都基于此环境，请认真阅读，且保证在后续的学习中此节点正常运行。

- 本文运行环境：

  系统： macOS

- 本文涉及的文章列表：

  ```
  hello_fibos/
  └── start_fibos
      └── node.js
  ```
- 本章示例代码地址：https://github.com/FIBOSIO/samples

### 环境配置脚本

```js
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

### 高级用法

FIBOS 中 `load` 方法支持参数传递，下面详细的介绍。

1. 修改 FIBOS 监听端口以及地址

   - 开启 HTTP 服务对所有地址的8889端口监听
   - 开启 P2P 服务对所有地址的9877端口监听

   ```
   fibos.load("http", {
   	"http-server-address": "0.0.0.0:8889"
   });
   
   fibos.load("net", {
   	"p2p-listen-endpoint": "0.0.0.0:9877"
   });
   ```

   (tips: FIBOS 默认 HTTP 端口8888，P2P 端口监听9876)


2. 修改及查看 FIBOS 配置以及数据目录

   ```
   // 查看 FIBOS 配置以及数据目录
   console.notice("data_dir:", fibos.data_dir);
  
   // 修改 FIBOS 配置以及数据目录
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

