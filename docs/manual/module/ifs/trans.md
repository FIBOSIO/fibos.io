# 模块 trans
trans 模块

## 静态函数
        
### send_inline
**向特定帐号发送 inline [action](action.md)**

```JavaScript
static trans.send_inline(String account,
    String name,
    Object args,
    Array authorization = []);
```

调用参数:
* account: String, [action](action.md) 发送者的帐号名称
* name: String, [action](action.md) 名称
* args: Object, [action](action.md) 附带的数据
* authorization: Array, [action](action.md) 的权限

--------------------------
### send_context_free_inline
**向特定帐号发送 context_free inline [action](action.md)**

```JavaScript
static trans.send_context_free_inline(String account,
    String name,
    Object args);
```

调用参数:
* account: String, [action](action.md) 发送者的帐号名称
* name: String, [action](action.md) 名称
* args: Object, [action](action.md) 附带的数据

