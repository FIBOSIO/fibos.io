# 模块 bc_crypto
加密算法模块

bc_crypto 模块是 FIBOS 中的加密模块，支持 SHA1 、SHA256 、SHA 512等加密算法，在 js 合约中可以直接使用。

## 静态函数

### recover_key
**从给定的 hash 和签名中恢复公钥**

```JavaScript
static String bc_crypto.recover_key(String digest,
    String signature);
```

调用参数:
* digest: String, 指定消息的 hash 结果
* signature: String, 指定的签名

返回结果:
* String, 返回恢复的公钥

实例:

```JavaScript
exports.hi1 = sig => {
    var r = crypto.sha256('I am alive');
    var s = crypto.recover_key(r, sig);
    console.notice(s);
}
```

--------------------------
### sha1
**创建一个 SHA1 信息摘要运算对象**

```JavaScript
static String bc_crypto.sha1(Buffer data);
```

调用参数:
* data: Buffer, 创建同时更新的二进制数据

返回结果:
* String, 返回信息摘要结果的 hex 编码字符串

实例:

```JavaScript
exports.hi = v => {
    var r = crypto.sha1("abcdefg");
    console.error(r);
}
```

--------------------------
### sha256
**创建一个 SHA256 信息摘要运算对象**

```JavaScript
static String bc_crypto.sha256(Buffer data);
```

调用参数:
* data: Buffer, 创建同时更新的二进制数据

返回结果:
* String, 返回信息摘要结果的 hex 编码字符串

实例:

```JavaScript
exports.hi = v => {
    var r = crypto.sha256("abcdefg");
    console.error(r);
}
```

--------------------------
### sha512
**创建一个 SHA512 信息摘要运算对象**

```JavaScript
static String bc_crypto.sha512(Buffer data);
```

调用参数:
* data: Buffer, 创建同时更新的二进制数据

返回结果:
* String, 返回信息摘要结果的 hex 编码字符串

实例:

```JavaScript
exports.hi = v => {
    var r = crypto.sha512("abcdefg");
    console.error(r);
}
```

--------------------------
### ripemd160
**创建一个 RIPEMD160 信息摘要运算对象**

```JavaScript
static String bc_crypto.ripemd160(Buffer data);
```

调用参数:
* data:  Buffer, 创建同时更新的二进制数据

返回结果:
* String, 返回信息摘要结果的 hex 编码字符串

实例:

```JavaScript
exports.hi = v => {
    var r = crypto.ripemd160("abcdefg");
    console.error(r);
}
```

