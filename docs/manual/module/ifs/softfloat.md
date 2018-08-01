# 模块 softfloat
软浮点模块，用于解决由于硬件差异导致的相同浮点数计算结果不一致的问题。

引用方法：

```JavaScript
var softfloat = require('softfloat');
```

## 静态函数
        
### add
**浮点相加**

```JavaScript
static Number softfloat.add(Number a,
    Number b);
```

调用参数:
* a: Number, 加数
* b: Number, 被加数

返回结果:
* Number, a + b 的结果

--------------------------
### sub
**浮点相减**

```JavaScript
static Number softfloat.sub(Number a,
    Number b);
```

调用参数:
* a: Number, 减数
* b: Number, 被减数

返回结果:
* Number, a - b 的结果

--------------------------
### mul
**浮点相乘**

```JavaScript
static Number softfloat.mul(Number a,
    Number b);
```

调用参数:
* a: Number, 乘数
* b: Number, 被乘数

返回结果:
* Number, a 乘以 b 的结果

--------------------------
### div
**浮点相除**

```JavaScript
static Number softfloat.div(Number a,
    Number b);
```

调用参数:
* a: Number, 除数
* b: Number, 被除数

返回结果:
* Number, a 除以 b 的结果

--------------------------
### sqrt
**返回一个数的平方根**

```JavaScript
static Number softfloat.sqrt(Number a);
```

调用参数:
* a: Number, 将被开方数

返回结果:
* Number, a 的平方根

