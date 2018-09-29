# 如何使用 FIBOS 中的 recipient

* Recipient 是 JavaScript 合约通知机制，用户在转账交易时可以给接收者发送消息通知。

* require_recipient 和 has_recipient 分别是模块 action 的静态函数。

## 1. require_recipient

**将指定的帐户添加到要通知的帐户集。**

```javascript
static action.require_recipient(String name);
```

调用参数：

* name：String，账户名

实例：

```javascript
exports.hi = v => {
    action.require_recipient(action.receiver);
};
```

## 2. has_recipient

**当 action 执行成功后，账号是否会收到通知**。

```javascript
static Boolean action.has_recipient(String name);
```

调用参数：

* name：String，账户名

返回结果：

* Boolean，若名为 name 的账户会收到通知则返回 true，否则返回 false

实例：

```javascript
exports.hi = v => {
    if (action.has_recipient(receiver)) console.notice("action received")
    else console.error("action not received");
};
```

## 3. 如何使用

```javascript
it("recipient", () => {
    var js_code = `exports.hi = v => {
        console.error(action.has_recipient(action.receiver),   
        action.has_recipient("${name1}"));
        action.require_recipient("${name1}")
        console.error(action.has_recipient(action.receiver),
        action.has_recipient("${name1}"));
    }`;
    fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));
    var js_code1 = `exports.on_hi = v => {
        console.log(action.receiver, action.account , v);
    };
    exports.hi = v => {
        throw new Error();
    }`;
    fibos.setcodeSync(name1, 0, 0, fibos.compileCode(js_code1));
    var ctx = fibos.contractSync(name);
    var r = ctx.hiSync('lion412', {
        authorization: name
    });
    assert.equal(r.processed.action_traces[0].console, "true false\ntrue true\n");
    assert.equal(r.processed.action_traces[0].inline_traces[0].console, `${name1} ${name} lion412\n`);
})
```

成功调用合约后，记录用户是否接收到通知，并且增加指定账号到通知列表内。

## 4. 结语

* 一个合约向另一个合约发出的通知消息会被另一个合约收到，不管有没有 ABI 定义接口，都会在应用层收到。
* 一个合约向另一个合约发送的通知消息就是本合约收到的消息，包括 code、action 和参数。
* 账户处理处理通知信息和处理正常的消息一样，根据 code、action 和参数进行逻辑处理。