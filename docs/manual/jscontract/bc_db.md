# 模块 bc_DB
DB 模块可以在 js 合约中直接使用，无需引用， DB 模块中提供了两种对象。

**DBIterator 对象** 查询当前数据，返回所有数据对象，每个数据是一个新的 DBIterator 对象。DBIterator 对象中提供了判读是否为首数据、是否为尾数据、获取前一个数据、删除数据、修改数据等方法。

**Table 对象** 通过 `var table = db.table(scope,code)` 来获取某个Table，Table 对象有一些成员属性，包括 name、scope、code等，提供了新增数据、查询数据方法、以及对返回数据的封装，并支持多索引。

## DBIterator 对象
```dot
digraph {
    node [fontname="Helvetica,sans-Serif", fontsize=10, shape="record", style="filled", fillcolor="white"];

    object [tooltip="object", URL="object.md", label="{object|toString()\ltoJSON()\l}"];
    DBIterator [tooltip="DBIterator", fillcolor="lightgray", id="me", label="{DBIterator|data\l|is_begin()\lis_end()\lnext()\lprevious()\lremove()\lupdate()\l}"];

    object -> DBIterator [dir=back];
}
```

## 成员属性

### data
**Object, 查询当前数据，返回所有数据对象，每个数据是一个新的 DBIterator 对象**

```JavaScript
readonly Object DBIterator.data;
```

## 成员函数

### is_begin
**判断数据是否为首数据**

```JavaScript
Boolean DBIterator.is_begin();
```

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    console.log(data.is_begin());
}；
```

--------------------------
### is_end
**判断数据是否为尾数据**

```JavaScript
Boolean DBIterator.is_end();
```

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    console.log(data.is_end());
}；
```

--------------------------
### next
**获取下一个数据**

```JavaScript
DBIterator DBIterator.next();
```

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    var data1 = data.next();
    console.log(data1.toJSON());
}；
```

--------------------------
### previous
**获取上一个数据**

```JavaScript
DBIterator DBIterator.previous();
```

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    var data1 = data.next();
    var data2 = data1.previous();
    console.log(data2.toJSON());
}；
```

--------------------------
### remove
**删除数据**

```JavaScript
DBIterator.remove();
```

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    data.remove();
}；
```

--------------------------
### update
**更新数据**

```JavaScript
DBIterator.update(String payer);
```

调用参数:
* payer: String, 为此次操作付费的账户

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players(action.account, action.account);
    var data = players.find(v);
    data.age = 18;
    data.update(action.account);
}；
```

--------------------------
### toString
**返回对象的字符串表示，一般返回 "[Native Object]"，对象可以根据自己的特性重新实现**

```JavaScript
String DBIterator.toString();
```

返回结果:
* String, 返回对象的字符串表示

--------------------------
### toJSON
**返回对象的 JSON 格式表示，一般返回对象定义的可读属性集合**

```JavaScript
Value DBIterator.toJSON(String key = "");
```

调用参数:
* key: String, 未使用

返回结果:
* Value, 返回包含可 JSON 序列化的值

# Table 对象
multi index table 对象

## 继承关系
```dot
digraph {
    node [fontname="Helvetica,sans-Serif", fontsize=10, shape="record", style="filled", fillcolor="white"];

    object [tooltip="object", URL="object.md", label="{object|toString()\ltoJSON()\l}"];
    Table [tooltip="Table", fillcolor="lightgray", id="me", label="{Table|name\lcode\lscope\lindexes\l|emplace()\lfind()\llowerbound()\lupperbound()\l}"];

    object -> Table [dir=back];
}
```

## 成员属性

### name
**String, table 名**

```JavaScript
readonly String Table.name;
```

--------------------------
### code
**String, 指向合约发布者的名称**

```JavaScript
readonly String Table.code;
```

--------------------------
### scope
**String, table 中数据所属的 account_name**

```JavaScript
readonly String Table.scope;
```

--------------------------
### indexes
**Object, 查询当前索引，返回所有索引对象，每个索引是一个新的 Table 对象**

```JavaScript
readonly Object Table.indexes;
```

## 成员函数

### emplace
**向 table 存入新数据**

```JavaScript
Table.emplace(String payer,
    Object val);
```

调用参数:
* payer: String, 为此次操作付费的账户
* val: Object, 将要存入到 table 的值

实例：

```JavaScript
const indexes = {
    detail: [128, o => [o.age,o.nickname]]
};
exports.hi = v => {
    var players = db.players(action.account, action.account,indexes);
    players.emplace(action.account, {
        title: "ceo",
        age: 48,
        nickname: "lion1",
        id: 123
    });
};
```

--------------------------
### find
**从 table 查找数据**

```JavaScript
DBIterator Table.find(Value id);
```

调用参数:
* id: Value, 查询的参数

实例:

```JavaScript
const indexes = {
    detail: [128, o => [o.age,o.weight]]
};
exports.hi = v => {
    var players = db.players(action.account, action.account,indexes);
    console.log(players.indexes.detail.find({age:48,nickname:"lion1"}))
};
```

--------------------------
### lowerbound
**从 table 查找小于参数结果**

```JavaScript
DBIterator Table.lowerbound(Value id);
```

调用参数:
* id: Value, 查询的参数

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players1(action.account, action.account);
    var data = players.lowerbound(123);
    console.log(data.data, data1.data);
};
```

--------------------------
### upperbound
**从 table 查找大于参数结果**

```JavaScript
DBIterator Table.upperbound(Value id);
```

调用参数:
* id: Value, 查询的参数

实例:

```JavaScript
exports.hi1 = v => {
    var players = db.players1(action.account, action.account);
    var data1 = players.upperbound(123);
    console.log(data.data, data1.data);
};
```

--------------------------
### toString
**返回对象的字符串表示，一般返回 "[Native Object]"，对象可以根据自己的特性重新实现**

```JavaScript
String Table.toString();
```

返回结果:
* String, 返回对象的字符串表示

--------------------------
### toJSON
**返回对象的 JSON 格式表示，一般返回对象定义的可读属性集合**

```JavaScript
Value Table.toJSON(String key = "");
```

调用参数:
* key: String, 未使用

返回结果:
* Value, 返回包含可 JSON 序列化的值

