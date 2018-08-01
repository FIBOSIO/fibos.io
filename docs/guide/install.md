# 安装运行环境

阅读完本文你可以学会如何通过 `curl` 工具快速安装 FIBOS，也可以学会如何在 UNIX 系统下编译 FIBOS 并安装。

FIBOS 支持常用的 UNIX 操作系统，比如 Mac OSX, Linux 和 FreeBSD。

对于快速入门，我们推荐使用快速安装的方式，对于高级用户可以查看本章 UNIX 操作系统下编译。

## 快速安装

```
快速安装: curl -s https://fibos.io/download/installer.sh|sh
```

安装结束后 FIBOS 可执行文件在系统 `bin` 目录下，使用查看 FIBOS 版本：

```
~$ which fibos
/usr/local/bin/fibos

~$ fibos --version
v0.26.0-dev
```

FIBOS 是一个可执行文件，它继承了 FIBJS 的 JavaScript CLI命令行控制台功能，直接执行 FIBOS 回车，进入命令行交互模式，如:

```
~$ fibos
Welcome to fibjs 0.26.0-dev.
Type ".help" for more information.
> console.log("hello,FIBOS!")
hello,FIBOS!
> .info
{
  "fibjs": "0.26.0-dev",
  "git": "v0.25.0-44-g2d182cd22",
  "clang": "9.1",
  "date": "Jul 26 2018 13:19:31",
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

你已经成功安装 FIBOS，对 FIBOS 有了一定的了解，现在你可以查看下一章节开始 FIBOS 之旅，[搭建一个 FIBOS 开发环境](startfibos.md)!


## UNIX 操作系统下编译

如果你需要自己编译 FIBOS，请查看下面的内容，阅读后可以了解如何在 UNIX 系统下编译 FIBOS。

### 准备编译环境

在 UNIX 下编译需要依赖以下工具以及源代码:

```
工具：
GCC
CMAKE
```

### 执行编译
FIBOS 项目地址: [http://git.fibos.io/fibos/fibos.git](http://git.fibos.io/fibos/fibos.git)

在工作目录下执行以下命令:

#### step1:(下载 FIBOS 代码)

```sh
~# git clone http://git.fibos.io/fibos/fibos.git
Cloning into 'fibos'...
```

#### step2:(init submodule 工程)

```sh
~/fibos# git submodule update --init --recursive
Submodule 'eos' (https://github.com/EOSIO/eos.git) registered for path 'eos'
Submodule 'fibjs' (https://github.com/fibjs/fibjs.git) registered for path 'fibjs'
```

#### step3:(执行编译)

```sh
~/fibos/fibjs# cd ..
~/fibos# chmod +x fibos_build
~/fibos# ./fibos_build
```

#### step4:编程成功

```sh
_______ _________ ______   _______  _______
 (  ____ \\__   __/(  ___ \ (  ___  )(  ____ \
 | (    \/   ) (   | (   ) )| (   ) || (    \/
 | (__       | |   | (__/ / | |   | || (_____
 |  __)      | |   |  __ (  | |   | |(_____  )
 | (         | |   | (  \ \ | |   | |      ) |
 | (_     ___) (___| (___) )| (___) |/\____) |
 (__/     \_______/(______/ (_______)\_______)

 FIBOS has been successfully built.

 For more information:

 website: http://fibos.io
 twitter: https://twitter.com/fibos_io
 telegram: https://t.me/FIBOSIO
 repository: https://github.com/fibosio

 //加入到bin目录
 ~/fibos/# ./install.sh
```

## 搭建一个 FIBOS 开发环境
到现在为止，你已经有一个可以执行的 FIBOS，可以开始体验 FIBOS  开发的乐趣了，让我们一起来搭建一个 FIBOS 的开发环境。

👉 【[搭建一个 FIBOS 开发环境](startfibos.md)】