# 对象 Table
multi index table 对象

## 继承关系

```dot
digraph {
    node [fontname="Helvetica,sans-Serif", fontsize=10, shape="record", style="filled", fillcolor="white"];

    object [tooltip="object", URL="object.md", label="{object|toString()\ltoJSON()\l}"];
    Table [tooltip="Table", fillcolor="lightgray", id="me", label="{Table|name\lcode\lscope\l|emplace()\lget()\lerase()\lmodify()\l}"];

    object -> Table [dir=back];
}
```

------

## ABI定义数据表

```dot
var abi =  {
    "version": "eosio::abi/1.0",
    "types": [{
        "new_type_name": "my_account_name",
        "type": "name"
    }],
    "structs": [{
        "name": "player",
        "base": "",
        "fields": [{
            "name": "title",
            "type": "string"
        }, {
            "name": "age",
            "type": "int32"
        }]
    }, {
        "name": "hi",
        "base": "",
        "fields": [{
            "name": "user",
            "type": "name"
        }]
    }],
    "actions": [{
        "name": "hi",
        "type": "hi",
        "ricardian_contract": ""
    }],
    "tables": [{
        "name": "players",
        "type": "player",
        "index_type": "i64",
        "key_names": ["nickname"],
        "key_types": ["my_account_name"]
    }, {
        "name": "players1",
        "type": "player",
        "index_type": "i64",
        "key_names": ["id"],
        "key_types": ["int64"]
    }]
}
```

表需要在abi里定义，相关的table才能在db对象访问到, 如db.players

- `players`以`nickname`作为索引，
- `players1`以`id`作为索引

```
// 初始化table对象
var players = db.players("code", "scope");
```

------

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

## 成员函数

### emplace
**向 table 存入新数据**

```
Table.emplace(String payer,
    Object val);
```

调用参数:

- payer: String, 为此次操作付费的账户
- val: Object, 将要存入到 table 的值

**实例**

```JavaScript
exports.hi = v => {
  var players = db.players(action.account, action.account);
  players.emplace(action.account, { 
    title: "ceo",
    age:48, 
    nickname:"lion1",
    id:123
  });
};
```

--------------------------
### get
**获取索引值为 id 的数据**

```
Value Table.get(Value id);
```

调用参数:

- id: Value, 索引值

返回结果:

- Value, Table 中索引为 index 的数据

**实例**

```JavaScript
exports.hi = v => {
  var players = db.players1(action.account, action.account);
  console.log(players.get(v))
};
```

--------------------------
### erase
**删除索引值为 id 的数据**

```
Table.erase(Value id);
```

调用参数:

- id: Value, 索引值

**实例**

```JavaScript
exports.hi => (user) {
  var players = db.players1(action.account, action.account);
  players.erase(123);
};
```



--------------------------
### modify

**修改索引值为 id 的对应的数据**

```
Table.modify(Value id,
    String payer,
    Object val);
```

调用参数:

- id: Value, 
- payer: String, 为此次操作付费的账户
- val: Object, 

**实例**

```JavaScript
exports.hi = (user) {
  var players = db.players(action.account, action.account);
  players.modify(
    123, 
    action.account, 
    { 
      title: "cto", 
      age:23, 
      id:123 
    }
  );
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

