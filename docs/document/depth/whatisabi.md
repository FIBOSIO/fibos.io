# 如何编写 ABI 接口

在 FIBOS 中，支持使用 JavaScript 开发区块链智能合约。在之前的文章 [发布一个简单的 JS 合约](../start/deploycontracts.md) 中，我们所编写发布的 JS 智能合约，除了合约代码的 JS 文件外，还有一份合约 ABI 文件，在当时我们并未给出详细的解读，这篇文章将带大家进行了解。

## ABI 是什么

ABI 全称 Application Binary Interface，中文名“应用程序二进制接口”，顾名思义是一个接口文件，描述了智能合约与上层应用之间的数据交换格式。ABI 文件格式类似 JSON，具备很好的可读性，有利于智能合约工程师与上层应用工程师之间的工作衔接。

对于 JavaScript 合约来说，需要使用 ABI 文件来定义 `actions` 以及 `tables`。

智能合约 ABI 文件由 5 部分组成：

```js
{
    "version": "eosio::abi/1.0",//定义 ABI 的版本号
    "types":[...],              //定义类型的别名
    "structs":[...],            //各个类型的数据结构
    "actions":[...],            //智能合约的 action
    "tables":[...],             //数据结构体
    "ricardian_clauses":[...]   //李嘉图条款
}
```

我们将按照 `actions` ->  `tables` -> `structs` -> `types`  的顺序了解 FIBOS 智能合约 ABI 的开发方法。

## ABI 开发

### actions

action 部分的作用是声明智能合约有哪些可以调用的 action。如下所示。

```json
"actions": [{
    "name": "hi",
    "type": "hi",
    "ricardian_contract": ""
}]
```

其中每一项的 `name` 就是 action 的名字，`type` 用来在 `structs` 中查找数据结构。

### tables

`tables` 列出了智能合约中需要建立的数据表名称，以及数据表中所储存的结构体名称。

```json
"tables": [{
    "name": "players",
    "type": "player",
    "index_type": "i64",
    "key_names": ["id"],
    "key_types": ["int64"]
}]
```

上述代码构造了一个 table 名是 players，结构体类型是 player，主键名称是 id，类型是 int64 的数据表。

### structs

`structs` 部分的内容与 `actions` 部分的内容存在一一对应的关系，刚才我们在上方 `actions` 中，声明了一个 action 的名称，我们还要在 `structs` 里声明各个 action 需要传入的参数，如下所示。

```json
"structs":  [{
    "name": "hi",
    "base": "",
    "fields": [{
        "name": "nickname",
        "type": "my_account_name"
    }]
}]
```

FIBOS 系统会根据 `actions` 部分中声明的 `type` ，在 `structs` 部分寻找对应的数据结构，每个数据结构的 `fields` 中，会列出每个参数的名称和类型。

除此以外，不光是 `actions` 里的项目需要在 `structs` 里列出详细的数据结构，`tables` 中的项目也需要。

```js
"structs": [{
    "name": "player",
    "base": "",
    "fields": [{
        "name": "nickname",
        "type": "my_account_name"
    }, {
        "name": "age",
        "type": "int32"
    }]
}, {
    "name": "hi",
    "base": "",
    "fields": [{
        "name": "nickname",
        "type": "my_account_name"
    }]
}]
```

􏲭􏳨􏳳􏳬􏰞这样，在 `structs` 中，我们就定义了一个名为 player 的 struct，用来列出数据表 player 包含两个字段  `nickname` 和 `age` ，类型分别是 `my_account_name` 和 `int32`。

### types

`types` 用于自定义数据的类型：

```json
{
    "new_type_name": "my_account_name",
    "type": "name"
}
```

这样在这个 ABI 文件里就自定义了一个类型名称为 `my_account_name` 的类型，类型是 `name` ，`new_type_name` 和 `type` 是关键字，类型 `name` 是系统定义的数据类型。

## 总结

这样，一个完整的 ABI 文件就编写完成。

```json
{
    "version": "eosio::abi/1.0",
    "types": [{
        "new_type_name": "my_account_name",
        "type": "name"
    }],
    "structs": [{
        "name": "player",
        "base": "",
        "fields": [{
            "name": "nickname",
            "type": "my_account_name"
        }, {
            "name": "age",
            "type": "int32"
        }]
    }, {
        "name": "hi",
        "base": "",
        "fields": [{
            "name": "nickname",
            "type": "my_account_name"
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
        "key_names": ["id"],
        "key_types": ["int64"]
    }] 
};
```

通过该 ABI 文件，我们就定义了一个有 id 、 nickname 、 age 三个字段，类型分别是 int64 、my_account_name 、 int32 ，主键是 id 的数据表 player 和一个传递参数名是 nickname ，类型是 my_account_name 的名为 hi 的 action 方法。􏰠􏲸􏰆􏰉􏰊􏰽􏰾􏰖􏱄􏳲􏳑􏴀􏳒􏰆􏰉􏰊􏰽􏰾􏲊􏰗􏰀􏰁􏲑􏰂􏰃􏴁􏴂􏰟􏰎􏰓􏰔􏰕