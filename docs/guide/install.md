# 安装运行环境

FIBOS支持常用的 UNIX 操作系统，比如 Mac OS X, Linux 和 FreeBSD。

未来我们会即将开放Docker版本的安装以及一键快速便捷的安装，敬请期待。

## UNIX操作系统下编译

### 准备编译环境
在 UNIX 下编译需要依赖以下工具以及源代码:
```
工具：
GCC
CMAKE

源码（submodule）:
fibos
fibjs
eos
```

### 执行编译
FIBOS 项目地址: [http://git.fibos.io/fibos/fibos.git](http://git.fibos.io/fibos/fibos.git)

在工作目录下执行以下命令:

#### step1:(下载Fibos代码)

```sh
root@fibos-testnet-1:~# git clone http://git.fibos.io/fibos/fibos.git
Cloning into 'fibos'...


root@fibos-testnet-1:~/fibos# git checkout dev
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'
```

#### step2:(初始化submodule工程)

```sh
root@fibos-testnet-1:~/fibos# git submodule update --init --recursive
Submodule 'eos' (https://github.com/EOSIO/eos.git) registered for path 'eos'
Submodule 'fibjs' (https://github.com/fibjs/fibjs.git) registered for path 'fibjs'
```

#### step3:(执行编译)

```sh
root@fibos-testnet-1:~/fibos/fibjs# cd ..
root@fibos-testnet-1:~/fibos# chmod +x fibos_build
root@fibos-testnet-1:~/fibos# ./fibos_build
```

### step4:编程成功

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
 root@fibos-testnet-1:~/fibos/# ./install.sh
```

## 编译常见错误Tips

### Mac OSX环境下的情况

#### case1:

Mac Osx 环境安装boost时请注意Homebrew与MacPort的冲突，建议使用HomeBrew。

#### case2:

```
llvm无法安装时，请使用brew安装。

brew install llvm@4

```

### Ubuntu环境下的情况

#### case1:
```
Ubuntu系统安装时候bash的执行断言错误，需要执行 sudo dpkg-reconfigure dash

root@fibos-testnet-1:~/fibos# ./fibos_build
sh: 33: Bad substitution
sh: 43: Syntax error: "(" unexpected

//Use dash as the default sytem shell？ => No
root@fibos-testnet-1:~/fibos# sudo dpkg-reconfigure dash
```

#### case2:

```
执行编译过程会遇到很多未安装Lib(EOS 1.1.X 编译脚本未自动安装)

	Checking for installed dependencies.

	Package clang-4.0  NOT  found.
	Package lldb-4.0  NOT  found.
	Package libclang-4.0-dev  NOT  found.
	Package cmake  NOT  found.
	Package make found.
	Package automake  NOT  found.
	Package libbz2-dev  NOT  found.
	Package libssl-dev  NOT  found.
	Package libgmp3-dev  NOT  found.
	Package autotools-dev found.
	Package build-essential found.
	Package libicu-dev  NOT  found.
	Package python2.7-dev found.
	Package python3-dev  NOT  found.
	Package autoconf  NOT  found.
	Package libtool  NOT  found.
	Package curl found.
	Package zlib1g-dev  NOT  found.
	Package doxygen  NOT  found.
	Package graphviz  NOT  found.
	
	提供2个方案解决:

	(1)手动安装需要单独执行，根据提示处理即可:
	root@fibos-testnet-1:~/fibos# apt-get install clang-4.0 lldb-4.0 libclang-4.0-dev cmake automake libbz2-dev libssl-dev libgmp3-dev libicu-dev python3-dev autoconf libtool zlib1g-dev doxygen graphviz
	Reading package lists... Done
	Building dependency tree
	Reading state information... Done

	(2)通过EOS的build解决依赖
		下载EOS代码，执行./eosio_build.sh默认会安装依赖，解决掉依赖后即可进行FIBOS的编译。

```

#### csse3:

```
boost库问题undefined reference to `boost::iostreams::detail::zlib_base::~zlib_base()'

apt-get install zlib1g-dev

rm -rf ${HOME}/opt/boost*

cd /path/to/eos

rm -rf build/

./fibos_build.sh

```

## 启动一个FIBOS节点
到现在为止，你已经有一个可以执行的 FIBOS 版本，可以开始体验 FIBOS  开发的乐趣了。

👉 【[启动一个FIBOS节点](startfibos.md)】