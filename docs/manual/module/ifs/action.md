# 模块 action
action 对象

 使用方法：在 [fibos](fibos.md) 的 js 合约中使用

```JavaScript
var js_code = `exports.hi = v => console.error(action.is_account(action.account), action.is_account("notexists"));`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
```

## 静态函数

### is_account
**判断账户是否存在**

```JavaScript
static Boolean action.is_account(String name);
```

**实例**

```JavaScript
exports.hi = v => {
   if(action.is_account(account)) console.notice("account exists");
    else console.error("account notexists")
  
};
```

调用参数:
* name: String, 账户名

返回结果:
* Boolean, 账户存在则返回 true，不存在返回 false

--------------------------
### has_recipient
**action 执行成后，名为 name 的账号是否会收到通知**

```JavaScript
static Boolean action.has_recipient(String name);
```

**实例**

```JavaScript
exports.hi = v => {  
    if(action.has_recipient(receiver)) console.notice("action received")
     else console.error("action not received");
  );
};
```

调用参数:
* name: String, 账户名

返回结果:
* Boolean, 若名为 name 的账户会收到通知则返回 true，否则返回 false

--------------------------
### require_recipient
**向通知列表增加特定账号**

```JavaScript
exports.hi = v => {
  action.require_recipient(action.receiver);
};
```

调用参数:
* name: String, 账户名

--------------------------
### has_auth
**验证 action 是否需要特定账户的授权**

```JavaScript
static Boolean action.has_auth(String name);
```

**实例**

```JavaScript
exports.hi = v => {
  if(action.has_auth(account)) console.notice("action be authed") 
};
```

调用参数:
* name: String, 待验证的账号名

返回结果:
* Boolean, 需要该账户授权则返回 true，否则返回 false

--------------------------
### require_auth
**向 action 的授权列表中添加特定账户及对应的权限，若添加失败则会抛出异常**

```JavaScript
static action.require_auth(String name,
    String permission = "");
```

**实例**

```JavaScript
exports.hi = v => {
 if(action.require_auth(account)) console.notice("auth success")
};
```

调用参数:
* name: String, 待验证的账号名
* permission: String, 需要该账户授权的权限

## 静态属性

### name
**String, * @brief action 名称**

```
static readonly String action.name;
```

**实例**

```JavaScript
exports.hi = v => {
  console.log(action.name)
};
```

--------------------------
### account
**String, action 发送者的账户名**

```
static readonly String action.account;
```

**实例**

```JavaScript
exports.hi = v => {
  console.log(action.account)
};
```

--------------------------
### receiver
**String, action 接收者**

```
static readonly String action.receiver;
```

**实例**

```JavaScript
exports.hi = v => {
  console.log(action.receiver)
};
```

--------------------------
### publication_time
**Long, 返回从1970年1月1日0时0分0秒（UTC，即协调世界时）距离出块时间的毫秒数。**

```
static readonly Long action.publication_time;
```

**实例**

```JavaScript
exports.hi = v => {
  console.log(action.publication_time)
};
```

--------------------------
### authorization
**Array, 执行该 action 需要得到数组中所有账户的授权**

```
static readonly Array action.authorization;
```

**实例**

```JavaScript
exports.hi = v => {
  console.log(action.authorization)
};
```

