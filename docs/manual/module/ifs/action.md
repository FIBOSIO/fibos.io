# 模块 action

## 静态函数
        
### is_account
****

```JavaScript
static Boolean action.is_account(String name);
```

调用参数:

--------------------------
### has_recipient
****

```JavaScript
static Boolean action.has_recipient(String name);
```

调用参数:

--------------------------
### require_recipient
****

```JavaScript
static action.require_recipient(String name);
```

调用参数:

--------------------------
### has_auth
****

```JavaScript
static Boolean action.has_auth(String name);
```

调用参数:

--------------------------
### require_auth
****

```JavaScript
static action.require_auth(String name,
    String permission = "");
```

调用参数:

## 静态属性
        
### name
****

```JavaScript
static readonly String action.name;
```

--------------------------
### account
****

```JavaScript
static readonly String action.account;
```

--------------------------
### receiver
****

```JavaScript
static readonly String action.receiver;
```

--------------------------
### publication_time
****

```JavaScript
static readonly Long action.publication_time;
```

--------------------------
### authorization
****

```JavaScript
static readonly Array action.authorization;
```

