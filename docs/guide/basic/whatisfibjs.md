# 什么是 FIBJS ？

 ## 1. FIBJS 简介

>- FIBJS 不是前端开发框架，不同于 Jquery，Angular 等运行在浏览器的 JS 框架，FIBJS 运行在服务端。
>- FIBJS 不是 Node.js 的一个包，和 NPM 里面的 fiber 扩展包也没有关系。
>- FIBJS 是基于协程和 V8，运用 C++ 语言开发的 JS 运行平台，和 Node.js 一样，都是服务端 JS 环境。

由于历史原因，JavaScript 主要被用于浏览器的 UI 处理，UI 开发是典型的单线程事件驱动模式，因此 JavaScript 也形成了以异步处理为主要编程范式。

随着 JavaScript 的成功，越来越多的人开始将 JavaScript 应用到其它的场景。与此同时，人们也越来越发现在很多场景下异步处理并不是最合适的选择。

FIBJS 由此应运而生，FIBJS 是一个主要为 web 后端开发而设计的应用服务器开发框架，它建立在 Google v8 JavaScript 引擎基础上，并且选择了和传统的 callback 不同的并发解决方案。FIBJS 利用 fiber 在框架层隔离了异步调用带来的业务复杂性，极大降低了开发难度，并减少因为用户空间频繁异步处理带来的性能问题。



## 2. FIBJS 特点

* 同步编写异步代码

node.js 的回调写法，肯定很多人见识过，层层回调简直就是项目的灾难。虽然，可以通过 Asyc，Promise，            Generator 等手段，在形式上简化回调写法，但是本质上没有变，始终无法靠直觉写出简洁优美的代码。

我们来看一个文件异步读取的例子：

Node.js CallBack 版本

~~~js
var fs = require("fs");
	fs.readFile('file', function(err, data) {
		if (err) throw err;
		console.log(data.toString());
	});
~~~

采用 CO 库改进的 Node.js 版本

```js
var fs = require("fs");
	var co = require("./co");

	function read(file) {
		return function(fn) {
			fs.readFile(file, function(err, data) {
				if (err) return fn(err);
				fn(null, data);
			});
		}
	}

	co(function *() {
		var a = yield read('file');
		console.log(a.toString());
	})();
```

FIBJS版本

```js
var fs = require("fs");
	try {
		var file = fs.readFile('file');
		console.log(file);
	} catch (e) {
		console.log(e.number);
	}
```

从上面的代码对比，可以看出，FIBJS 的同步写法非常简洁，而且可以利用 try catch 来捕获异常，而 node.js 必须依赖回调来处理异步，就算采用了 Generator，在代码简洁和错误处理上 Node.js 还是没有 FIBJS 来的简单明了。

* 高性能，整体比 Node.js 快接近8倍

  相比较Node.js，FIBJS具有明显的性能优势。

* 前后统一语言

  这个优点还是非常诱人的，前端和后端不需要跨语言开发，许多代码库可以共享，更有利于开发人员往全栈方向发展。



## 3. FIBJS 运行机制和线程切换

**FIBJS 是多线程的**

FIBJS 有 1 个 V8 线程，多个 IO 线程用作 MYSQL 访问，HTTP请求以及多个工作线程用于加密、密集型运算等。

FIBJS 以单线程运行，使用非阻塞 I/O 调用，这样既可以支持数以万计的并发连接，又不会因多线程本身的特点而带来麻烦。众多请求只使用单线程的设计意味着可以用于创建高并发应用程序。FIBJS 应用程序的设计目标是任何需要操作 I/O 的函数都使用 Coroutine 协程来完成。当使用 FIBJS 进行服务器应用开发时，每次和客户端创建连接都会创建一个 Fiber(task) 放在队列中等待，JavaScript 线程依次取 fiber 执行，每当执行到 I/O 操作，Coroutine 都会把上下文切换到后台线程 (worker thread) 来完成相应的操作，并且把 JavaScript 的上下文被切换到下一个 fiber 中继续执行。当后台线程的 fiber 执行完毕之后会重新把 fiber 丢进队列尾部等待，等待 JavaScript 执行到该fiber。从而完成这个异步操作。

~~~js
conn.trans(() => {
    var result = conn.execute('INSERT INTO posts SET title=?', title);
    var log = 'Post ' + results.insertId + ' added';
    conn.execute('INSERT INTO log SET data=?', log);
});
console.log('success!');
~~~

FIBJS 虽然给用户提供的 API 是阻塞，但是采用了非阻塞 IO 模型。并不需要等待回调结果，FIBJS 会继续执行，但是却不会发生代码重排的问题，因为如果你在后文中需要当前的结果，FIBJS 会帮进行异步操作。



## 4. FIBJS 并发机制、锁机制

### FIBJS 并发机制

Coroutine 是类似线程的概念(但 Coroutine 并不是线程)。线程属于系统层面，通常来说创建一个新的线程会消耗较多的资源且管理不易。而 Coroutine 就像轻量级的线程，但我们称其为并发，一个 FIBJS 程序可以运行超过数万个 Coroutine，并且这些性能都是原生级的，随时都能够关闭、结束。一个核心里面可以有多个 Coroutine。 在内置的官方包中也不时能够看见 Coroutine 的应用，像是 net/http 中用来监听网络服务的函数实际上是创建一个不断运行循环的 Coroutine。

#### 有例在先

由于不需要知识储备，我们来看一个例子。

~~~js
var coroutine = require("coroutine");
var a = 0;
coroutine.parallel(() => {
    var b  = a;
    coroutine.sleep(1);
    a = b + 1;
}, 200);
static Array coroutine.parallel(Array funcs,
    Integer fibers = -1);
~~~

这个例子很好理解，表示并行执行一组函数，并等待返回。

调用参数:

- funcs: Array, 并行执行的函数数组

- fibers: Integer, 限制并发 fiber 数量，缺省为 -1，启用与 funcs 数量相同 fiber

返回结果:

- Array, 返回函数执行结果的数组

也就是对一个值并行的增加了200次，对于有编程经验的人肯定会快速的看出这段代码存在问题，最终得到的值不一定是200。

### FIBJS 锁机制

我们对上述代码进行改写：

~~~js
var coroutine = require("coroutine");
var a = 0;
var l = new coroutine.Lock();
coroutine.parallel(() => {
    l.acquire();
    var b  = a;
    coroutine.sleep(1);
    a = b + 1;
    l.release();
}, 200);
~~~

加锁之后，代码运行结束后得到值为200。

通过阅读 C++ 源码，我们可以发现 FIBJS 中的锁是非系统级别的，通过纯逻辑实现的，加锁与解锁负荷很小。

~~~c++
#include "object.h"
#include "Lock.h"
namespace FIBJS {
result_t Lock_base::_new(obj_ptr<Lock_base>& retVal, v8::Local<v8::Object> This)
{
    retVal = new Lock();
    return 0;
}
result_t Lock::acquire(bool blocking, bool& retVal)
{
    if (!blocking) {
        retVal = m_lock.trylock();
        return 0;
    }
    if (!m_lock.trylock()) {
        Isolate::rt _rt(holder());
        m_lock.lock();
    }
    retVal = true;
    return 0;
}
result_t Lock::release()
{
    if (!m_lock.owned())
        return CHECK_ERROR(CALL_E_INVALID_CALL);
    m_lock.unlock();
    return 0;
}
result_t Lock::count(int32_t& retVal)
{
    retVal = m_lock.count();
    return 0;
}
~~~



## 5. 踏进Fib-app 的世界

### Fib-app 介绍

基于 FIBJS 应用程序的基础 api 框架，可以快速的进行接口应用开发，fib-app在实现的过程中主要使用的npm包有fib-orm、fib-session、fib-pool等，下文中会简单介绍部分主要的npm包及其如何去使用fib-app,下面我们将根据一个小例子逐步去讲解，LET'S GO...

### Fib-app 的使用

#### 新建一个 web 项目

如何使用 FIBJS+fib-app 快速搭建一个 RESTful 架构的 web 服务，以下将进行详细的介绍：

* 使用 FIBJS 新建一个项目，例如命名为 demo

~~~bash
mkdir demo //新建demo目录
cd demo && FIBJS --init //初始化项目
~~~

* 安装 fib-app

~~~bash
npm install fib-app --save //安装fib-app依赖
~~~

* 新建文件 index.js，内容如下：

~~~js
const http = require('http');
const util = require('util')
const Session = require('fib-session')
const App = require('fib-app');

var app = new App('sqlite:test.db', { //使用sqlite, 进行测试
  uuid: true //主键使用uuid, 否则使用自动递增整数 测试一下？
});
app.db.use(require('./defs/person'));  //加载person类文件

var session = new Session(new util.LruCache(20000), {
  timeout: 60 * 1000
});

var svr = new http.Server(8080, [
  session.cookie_filter,
  {
    '/1.0': app //访问路由，访问不同的模块进入相应model的对应接口
  }
]);
svr.run(() => {});
console.notice('服务已启动，访问端口：%d', 8080);
~~~

注：如果不指定主键，则使用默认主键`id`

* 在当前项目的 defs (用于放置 model 文件)目录下新 `person` 文件，内容如下：

~~~js
module.exports = db => {
  db.define('person', {
    name: String,
    sex: ["male", "female"],
    age: Number
  });
};
// 或者
module.exports = db => {
  db.define('person', {
      name: {
          require: true, //是否必填
          type: "text",
          size: 32, //定义长度
      },
    sex: {
        type: "enum",
        values: ["male", "female"],
        defaultValue: "mail"
    }
    age: {
      type: "number"
    }
  });
};
// 文件命名与定义的表名一致
~~~

这是一个标准的 orm 定义，同样可以使用 orm 的其它功能，比如类型检查，事件等，具体请翻阅 fib-orm 的内容介绍, 更加详细的表定义以及高级的用法前参考  [Model Properties](https://github.com/dresende/node-orm2/wiki/Model-Properties)

* 启动项目

~~~bash
fibjs index.js // 服务已启动，访问端口：8080
~~~



##### 注：如果您对 FIBJS 有着更浓厚的兴趣，想要了解更多的 FIBJS 内置对象、基础模块的话，请前往 [FIBJS官网](http://www.fibjs.org/docs/manual/module/ifs/assert.md.html) ！







