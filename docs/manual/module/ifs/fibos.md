# 模块 fibos
fibos 实例对象

使用方法：

```JavaScript
var fibos = require('fibos')
```

## 静态函数
        
### load
**加载系统 plugin**

```JavaScript
static fibos.load(String name,
    Object cfg = {});
```

调用参数:
* name: String, 系统 plugin 名
* cfg: Object, 提供给系统 plugin 的配置，[可选]

--------------------------
**加载配置**

```JavaScript
static fibos.load(Object cfgs);
```

调用参数:
* cfgs: Object, 配置对象

--------------------------
### start
**启动 fibos**

```JavaScript
static fibos.start();
```

--------------------------
### stop
**停止 fibos**

```JavaScript
static fibos.stop();
```

## 静态属性
        
### data_dir
**String, fibos 的数据存放目录**

```JavaScript
static String fibos.data_dir;
```

--------------------------
### config_dir
**String, fibos 的配置存放目录**

```JavaScript
static String fibos.config_dir;
```

