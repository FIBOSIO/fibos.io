# 模块 bc_console
[console](../module/ifs/console.md) 对象

控制台访问对象

全局对象。可用于提示信息，警告和错误记录。通过启动配置文件，可将日志定位到不同的设备，以便于跟踪。

## 静态函数

### log
**记录普通日志信息，与 info 等同**

```JavaScript
static bc_console.log(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

实例：

```JavaScript
exports.hi = v => {
    console.log('hello :%s', "FIBOS")
};
```

记录一般等级的日志信息。通常用于输出非错误性提示信息。

--------------------------
**记录普通日志信息，与 info 等同**

```JavaScript
static bc_console.log(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.log('hello FIBOS')
};
```

记录一般等级的日志信息。通常用于输出非错误性提示信息。

--------------------------
### debug
**记录调试日志信息**

```JavaScript
static bc_console.debug(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.debug('warn %s', 'FIBOS')
};
```

记录调试日志信息。通常用于输出调试信息。不重要。

--------------------------
**记录调试日志信息**

```JavaScript
static bc_console.debug(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.debug('warn FIBOS')
};
```

记录调试日志信息。通常用于输出调试信息。不重要。

--------------------------
### info
**记录普通日志信息，与 log 等同**

```JavaScript
static bc_console.info(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.info('hello :%s', 'FIBOS')
};
```

记录一般等级的日志信息。通常用于输出非错误性提示信息。

--------------------------
**记录普通日志信息，与 log 等同**

```JavaScript
static bc_console.info(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.info('hello FIBOS')
};
```

记录一般等级的日志信息。通常用于输出非错误性提示信息。

--------------------------
### notice
**记录警告日志信息**

```JavaScript
static bc_console.notice(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.notice('hello :%s', 'FIBOS')
};
```

记录警告日志信息。通常用于输出提示性调试信息。一般重要。

--------------------------
**记录警告日志信息**

```JavaScript
static bc_console.notice(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.notice('hello FIBOS')
};
```

记录警告日志信息。通常用于输出提示性调试信息。一般重要。

--------------------------
### warn
**记录警告日志信息**

```JavaScript
static bc_console.warn(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.warn('hello :%s', 'FIBOS')
};
```

记录警告日志信息。通常用于输出警告性调试信息。重要。

--------------------------
**记录警告日志信息**

```JavaScript
static bc_console.warn(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.warn('hello FIBOS')
};
```

记录警告日志信息。通常用于输出警告性调试信息。重要。

--------------------------
### error
**记录错误日志信息**

```JavaScript
static bc_console.error(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.error('hello %s', 'FIBOS')
};
```

记录用于错误日志信息。通常用于输出错误信息。非常重要。系统的出错信息也会以此等级记录。

--------------------------
**记录错误日志信息**

```JavaScript
static bc_console.error(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.warn('hello FIBOS')
};
```

记录用于错误日志信息。通常用于输出错误信息。非常重要。系统的出错信息也会以此等级记录。

--------------------------
### crit
**记录关键错误日志信息**

```JavaScript
static bc_console.crit(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.crit('hello %s', 'FIBOS')
};
```

记录用于关键错误日志信息。通常用于输出关键错误信息。非常重要。

--------------------------
**记录关键错误日志信息**

```JavaScript
static bc_console.crit(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.crit('hello FIBOS')
};
```

记录用于关键错误日志信息。通常用于输出关键错误信息。非常重要。

--------------------------
### alert
**记录警报错误日志信息**

```JavaScript
static bc_console.alert(String fmt,
    ...args);
```

调用参数:
* fmt: String, 格式化字符串
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.alert('hello %s', 'FIBOS')
};
```

记录用于警报错误日志信息。通常用于输出警报错误信息。非常重要。为最高级别信息。

--------------------------
**记录警报错误日志信息**

```JavaScript
static bc_console.alert(...args);
```

调用参数:
* args: ..., 可选参数列表

```JavaScript
exports.hi = v => {
    console.alert('hello FIBOS')
};
```

记录用于警报错误日志信息。通常用于输出警报错误信息。非常重要。为最高级别信息。

--------------------------
### dir
**用 JSON 格式输出对象**

```JavaScript
static bc_console.dir(Value obj);
```

调用参数:
* obj: Value, 给定要显示的对象

```JavaScript
exports.hi = v => {
    var a = {};
    console.dir(a);
};
```

--------------------------
### trace
**输出当前调用堆栈**

```JavaScript
static bc_console.trace(String label = "trace");
```

调用参数:
* label: String, 标题，缺省为空字符串。

通过日志输出当前调用堆栈。

--------------------------
### assert
**断言测试，如果测试值为假，则报错**

```JavaScript
static bc_console.assert(Value value,
    String msg = "");
```

调用参数:
* value: Value, 测试的数值
* msg: String, 报错信息

## 常量

### FATAL
**loglevel 级别常量**

```JavaScript
const bc_console.FATAL = 0;
```

--------------------------
### ALERT
**loglevel 级别常量**

```JavaScript
const bc_console.ALERT = 1;
```

--------------------------
### CRIT
**loglevel 级别常量**

```JavaScript
const bc_console.CRIT = 2;
```

--------------------------
### ERROR
**loglevel 级别常量**

```JavaScript
const bc_console.ERROR = 3;
```

--------------------------
### WARN
**loglevel 级别常量**

```JavaScript
const bc_console.WARN = 4;
```

--------------------------
### NOTICE
**loglevel 级别常量**

```JavaScript
const bc_console.NOTICE = 5;
```

--------------------------
### INFO
**loglevel 级别常量**

```JavaScript
const bc_console.INFO = 6;
```

--------------------------
### DEBUG
**loglevel 级别常量**

```JavaScript
const bc_console.DEBUG = 7;
```

--------------------------
### PRINT
**loglevel 仅用于输出，信息输出后不换行，file 和 syslog 不保存此级别信息**

```JavaScript
const bc_console.PRINT = 9;
```

--------------------------
### NOTSET
**loglevel 级别常量**

```JavaScript
const bc_console.NOTSET = 10;
```

