

#  emitter 插件使用

##  emitter 简介

emitter 是一个监听事件的插件，可以方便的拿到交易的事件，并按照自己的需求存储区块上的数据。

## 使用 emitter 插件的优势 

* 不受类似与 mongo 插件的约束，能够按照自己的业务需求存储数据。
* 相比较 histroy 插件占用内存小。

## 加载 emitter 插件

打开工作目录 `node.js` ，添加 emitter 插件：

```javascript
var fibos = require('fibos');

fibos.load("http");
fibos.load("chain");
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");
fibos.load("emitter");
fibos.on('action',at => {
    console.log(at);
})
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});
fibos.config_dir = "fibos_config_dir/";
fibos.data_dir = "fibos_data_dir/";
fibos.enableJSContract = true;
fibos.start();

```

运行 FIBOS 开发环境

```javascript
fibos node.js
```

`eosio` 已经开始区块生产，并且打印获取的区块数据。 

## 将数据同步保存至 MySql 数据库中

请先仔细阅读 [db 模块](../../manual/module/ifs/db.md.html) 中  [MySql](../../manual/object/ifs/mysql.md.html) 使用方法。

详细说明：

1. 连接 MySql 数据库

使用 db.open 或 db.openMySQL 创建，创建方式：

```javascript
var mysql = db.openMySQL("mysql://user:pass@host/db");
```

2. 执行一个 sql 命令，并返回执行结果，可根据参数格式化字符串

```javascript
 mysql.execute(String sql,...args);
```

* 调用参数：

  sql：String，格式化字符串，可选参数用 ? 指定。例如：'INSERT INTO TABLENAME (列名…) VALUES (列值);'

  args：...，可选参数列表

```javascript
var fibos = require('fibos');
var db = require('db');
var mysql = db.openMySQL("mysql://user:pass@host/db");

fibos.load("http");
fibos.load("chain");
fibos.load("net");
fibos.load("chain_api");
fibos.load("history_api");
fibos.load("emitter");
fibos.on('action',at => {
    console.log(at);
    let acitonname = at.act.name;
    if(acitonname === 'extransfer') {
        let trx_id = at.trx_id
        let data = at.act.data;
        let from = data.from;
        let to = data.to;
        let memo = data.memo;
        let quantity = data.quantity.quantity;
        let contract = data.quantity.contract;
	    mysql.execute("insert into transfer_info(from,to,memo,trx_id,quantity,contract) values(?,?,?,?,?,?)", [from , to, memo , trx_id , quantity , contract]);        
    }
})
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});
fibos.config_dir = "fibos_config_dir/";
fibos.data_dir = "fibos_data_dir/";
fibos.enableJSContract = true;
fibos.start();
```

## 结语

区块上的数据不仅仅可以保存于 **MySql** 数据库，还能同步保存于 [db 模块](../../manual/module/ifs/db.md.html) 下支持的其他数据库。

例如：

* **sqlite**
* **mongodb**
* **leveldb**
* **Redis**

