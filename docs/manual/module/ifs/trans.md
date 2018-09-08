# 模块 trans
trans 模块

## 静态函数

### send_inline
**向特定帐号发送 inline [action](action.md)**

```
static trans.send_inline(String account,
    String name,
    Object args,
    Array authorization = []);
```

调用参数:

- account: String, [action](action.md) 发送者的帐号名称
- name: String, [action](action.md) 名称
- args: Object, [action](action.md) 附带的数据
- authorization: Array, [action](action.md) 的权限

**实例**

```JavaScript
// hi acction
exports.hi => (user) {
  // 触发hi2 action
  trans.send_inline(
    "test", 
    "hi2", 
    {
      user:"user1", 
      friend:"user2"
    }, 
    [{
      "actor": "${name}", 
      "permission": "active"
  }])
};

// hi2 action
exports.hi2 = (user, friend) => {
  console.log(user, friend);
}
```



--------------------------
### send_context_free_inline
**向特定帐号发送 context_free inline [action](action.md)**

```
static trans.send_context_free_inline(String account,
    String name,
    Object args);
```

调用参数:

- account: String, [action](action.md) 发送者的帐号名称
- name: String, [action](action.md) 名称
- args: Object, [action](action.md) 附带的数据

**实例**

```JavaScript
// hi acction
exports.hi => (user) {
  // 触发hi2 action
  trans.send_context_free_inline(
    "test", 
    "hi2", 
    { 
      user:"user1", 
      friend:"user2" 
    }
  );
};

// hi2 action
exports.hi2 = (user, friend) => {
  console.log(user, friend);
}
```



