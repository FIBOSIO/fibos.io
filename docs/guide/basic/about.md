# FIBOS 是什么？

FIBOS 是一个结合 FIBJS 以及 EOS 的 JavaScript 的运行平台，它使得 EOS 提供可编程性，并允许使用 JavaScript 编写智能合约。

FIBOS 平台的出现让第三代 EOS 智能合约编程变得简单、快捷!

## 为什么要创造 FIBOS ？

### 1. 目前 EOS 的环境部署困难

EOS 的编译环境依赖性强，编译过程时常遇到很多问题，对于普通一个开发者来说，大多数面对 `CMake` 的情况是束手无策的。

而 FIBOS 提供一套预编译开发环境，开发者可以快速实现部署，把更多的时间用在编写智能合约上。

### 2. 开发门槛高

编写 EOS 智能合约需要掌握 C++ 语言，这对于一名开发者来说学习成本非常高，并且我们认为正确的写出编译合约的 `CMAKELISTS.TXT` 才是刚刚开始!

而对于 FIBOS 来说，开发者可以使用 JavaScript 脚本语言进行编写智能合约，而这门语言学习成本很低。

对于一名开发者来说，如果一件事情简单容易，我们认为他们会更容易接受，并渴望了解 FIBOS。

### 3. 测试套件原始

EOS 的测试用例编写也必须使用 C++，高难度的语言学习，高难度的编译，使得测试这件事在 EOS 上面变得复杂、困难。

FIBOS 集成 FIBJS 服务端开发平台，拥有成熟的测试套件，在 FIBOS 平台上编写的用例，开发者可以使用 JavaScript 编写测试用例，这一切看起来非常的灵活、轻松!

### 4. EOS 迭代周期长

一个 EOS 智能合约要想成功部署发布，需要经过编写、编译、部署、测试、调试、修复，漫长的等待过程。

FIBOS 支持本地合约模式，随时修改随时测试，结合一些 IDE 工具可以做到一键研发测试。

### 5. 开发生态原始

EOS 使用 C++ 参与编写研发，并不能做到 NPM 这样的生态环境，而 FIBOS 支持 NPM 包管理，与庞大的 NPM 生态紧密连接。

### 6. 部署发布合约成本高

EOS 编写合约需要让 C++ 代码编译到 WASM，而 WASM 编译文件非常庞大，让发布部署运行合约成本非常高昂。

FIBOS 编写的合约可以通过打包脚本，压缩文件极大的降低部署发布成本。


### 7. 合约不可审计

EOS 合约编译成 WASM 后，对审计阅读合约代码带来了极大的困难，开发者无法评估合约的安全性。

FIBOS 的合约使用 JavaScript 编写并且全部开源，方便社区审计，迅速形成共识。

## 社区

- website: https://fibos.io

- telegram: https://t.me/FIBOSIO

- twitter: https://twitter.com/fibos_io

- medium: https://medium.com/@fibosio

- issue: https://github.com/fibosio/fibos/issues

## 加入 FIBOS 讨论组

![FIBOS 讨论组](../imgs/qr.png)

## 开始体验
准备好开始一场愉快的开发经历了吗？那么，从安装开始吧。

👉 【[安装运行环境](install.md)】