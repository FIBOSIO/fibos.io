# FIBOS 是什么？

FIBOS是一个结合Fibjs以及EOS的Javascript的运行平台，它使得EOS提供可编程性，并允许使用Javascript编写智能合约。

FIBOS平台的出现让第三代EOS智能合约编程变得简单。

## 为什么要创造FIBOS？

### 1. 目前EOS的环境部署困难

EOS的编译环境依赖性强，编译过程时常遇到很多问题，对于普通一个开发者来说，大多数面对`CMake`的情况是束手无策的。

而FIBOS提供一套预编译开发环境，开发者可以快速实现部署，把更多的时间用在编写智能合约上。

### 2. 开发门槛高

编写EOS智能合约需要掌握C++语言，这对于一名开发者来说学习成本非常高，并且我们认为正确的写出编译合约的`CMAKELISTS.TXT`才是刚刚开始!(JUST Beginning)

而对于FIBOS来说，开发者可以使用Javascript脚本语言进行编写智能合约，而这门语言学习成本很低。

对于一名开发者来说，如果一件事情简单容易，我们认为他们会更容易接受，并渴望了解FIBOS。

### 3. 测试套件原始

EOS的测试用例编写也必须使用C++，高难度的语言学习，高难度的编译，使得测试这件事在EOS上面变得复杂、困难。

FIBOS集成FibJs服务端开发平台，拥有成熟的测试套件，在FIBOS平台上编写的用例，开发者可以使用Javascript编写测试用例，这一切看起来非常的灵活、轻松!

### 4. EOS迭代周期长

一个EOS智能合约要想成功部署发布，需要经过编写、编译、部署、测试、调试、修复，漫长的等待过程。

FIBOS支持本地合约模式，随时修改随时测试，结合一些IDE工具可以做到一键研发测试。

### 5. 开发生态原始

EOS使用C++参与编写研发，并不能做到NPM这样的生态环境，而FIBOS支持NPM包管理，与庞大的NPM生态紧密连接。

### 6. 部署发布合约成本高

EOS编写合约需要让C++代码编译到WASM，而WASM编译文件非常庞大，让发布部署运行合约成本非常高昂。

FIBOS编写的合约可以通过打包脚本，压缩文件极大的降低部署发布成本。


### 7. 合约不可审计

EOS合约编译成WASM后，对审计阅读合约代码带来了极大的困难，开发者无法评估合约的安全性。

FIBOS的合约使用Javascript编写并且全部开源，方便社区审计，迅速形成共识。

## 社区

- website: https://fibos.io

- telegram: https://t.me/FIBOSIO

- twitter: https://twitter.com/fibos_io

- medium: https://medium.com/@fibosio

- issue: https://github.com/fibosio/fibos/issues

## 开始体验
准备好开始一场愉快的开发经历了吗？那么，从安装开始吧。

👉 【[安装运行环境](install.md)】