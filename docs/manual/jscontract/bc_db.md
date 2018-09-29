# 模块 bc_db
db 对象

数据库访问对象

FIBOS 中 js 智能合约操作链数据库是很常见的应用场景，一个[action](./action.md)在执行时会有上下文变量出现，包括事务机制的处理，这些内容会应用链上
分配的内存资源，而如果没有持久化技术，执行超过作用域时就会丢失掉这些上下文数据。因此要使用持久化技术将关键内容记录在链数据库中，任何时候使用都不受影响。db 模块的作用就是为了将数据持久化到数据库中，并提供数据可查询的能力和服务。

## 静态函数
        
### table
**访问指定数据库表**

```JavaScript
static bc_db.table(String scope,
    String code,
    String indexes);
```

调用参数:
* scope: String, 指向合约发布者的名称
* code: String, table 中数据所属的 account_name
* indexes: String, 索引

使用 db 模块首先我们需要在 abi 文件中定义数据表的表名、表结构和主键等信息，如下所示：
```
var db_abi = {
      "version": "eosio::abi/1.0",
      "types": [{
          "new_type_name": "my_account_name",
          "type": "name"
      }],
      "structs": [{
          "name": "player2",
          "base": "",
          "fields": [{
              "name": "title",
              "type": "string"
          }, {
              "name": "age",
              "type": "int32"
          }, {
              "name": "weight",
              "type": "int32"
          }, {
              "name": "length",
              "type": "int32"
          }, {
              "name": "width",
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
          "type": "player2",
          "index_type": "i64",
          "key_names": ["id"],
          "key_types": ["int64"]
      }]
  };
```
在 db_abi 中定义了一个 players 表，表的类型为 player2 ，主键为 id。

那在 js 合约中如何访问某个具体的表呢？例如访问 players 表，只需要 `db.players(scope,code)` 即可。

同样给表建立索引也很简单，以 players 表为例，在 js 合约中作如下定义:
```
const indexes = {
     age: [64, o => [o.age]]
};

exports.hi = v => {
     var players = db.players(action.account, action.account, indexes);
}
```
上述代码定义了一个名为 age 的索引，并在访问表的时候加上 indexes 这个参数，这样在对表操作的时候就可以使用索引了。

db 模块还支持多索引，只需要在 indexes 加上其它索引，如下所示:
```
const indexes = {
   age:[64, o=>[o.age]],
   detail1:[128, o => [o.age,o.weight]],
   detail2:[192, o => [o.age,o.weight,o.length]],
   detail3:[256, o => [o.age,o.weight,o.length,o.width]]
};
```
具体如何对表进行增删改查操作请查看 [DBIterator](./dbiterator.md) 和 [Table](./table.md) 两篇技术手册

