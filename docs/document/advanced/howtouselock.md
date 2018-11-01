# 如何使用 FIBOS 的锁仓和解锁功能

> 学习本文档前，你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../start/fibosjs.md) 。

FIBOS 中支持发行两种通证，一种为普通通证，另一种是智能通证。

普通通证支持创建（excreate）、增发（exissue）、转账（extransfer）、销毁流通通证（exretire）、回收内存（exclose）、项目方销毁全部通证（exdestroy) 。

智能通证中，只有 FO 支持增发，其余不支持。除此之外的全部方法都支持，还拥有兑换（exchange）、锁仓转账（exlocktrans）、解锁（exunlock）、合约子钱包充值（ctxrecharge）、合约子钱包提现（ctxextract）、合约子钱包转账（ctxtransfer）这些独有的功能。

前文中，[兑换](./howtoexchangetokeninfibos.md) 和 [合约子钱包](howtousecontractaccount.md) 功能已经给大家做过详细的介绍，还不知道的同学可以参考上面两篇文章进行了解。今天给大家讲解一下锁仓和解锁功能，这两个功能是 FIBOS 对 bancor 协议的扩展应用。如果还不知道什么是 bancor 的同学可以参考 [bancor 协议中文白皮书](https://github.com/FIBOSIO/ibo.fo) 一文。

## 锁仓

什么是锁仓？简单来说，就是项目方发行智能通证时，填写的 reserve_supply 这个参数的值，锁仓量会随着销毁和解锁通证的操作而变化。项目方可以把锁仓中的一部分通证通过锁仓转账（exlocktrans）的方法给到用户 A ，用户 A 也可以将得到这部分锁仓的通证转给用户 B 或者说转给项目方。当项目运营良好的时候，项目方或者用户可以通过解锁通证来获取回报。

`exlocktrans` 方法和参数名解释如下：

```c++
void token::exlocktrans(
    account_name from, //通证转出方
    account_name to, //通证转入方
    extended_asset quantity, //通证数量
    time_point_sec expiration, //待转出锁仓时间
    time_point_sec expiration_to //待转入锁仓时间
    string memo //附言
)
```

接口中的 `expiration` 参数是锁仓期，项目方给用户锁仓转账的时候可以设置这个参数，时间戳格式精确到秒，这样用户就可以在锁仓期到达之前是无法进行解锁操作的。

**实例**

前提条件：用户 `nmslwsndhjyz` 发行了一个精度为4位，名字叫做 `ADC` 的智能通证。且锁仓量有 1000000.0000 个 `ADC` 通证。

```javascript
//初始化 fibos 客户端
...
let ctx = fibos.contractSync("eosio.token");
let r = ctx.exlocktransSync("nmslwsndhjyz", "fibostest123", "10000.0000 ADC@nmslwsndhjyz", 1539830655,1539830948, "lock transfer to fibostest123", {
			authorization: "nmslwsndhjyz"
		})
console.notice(r);
```

上述代码中 `nmslwsndhjyz` 给用户 `fibostest123` 锁仓转账了 10000.0000 个 ADC 通证。并设置了解锁时间为 1539830948。

## 解锁

项目方和用户可以通过解锁操作来讲锁仓中的通证变为流通中的通证，调用 `exunlock` 方法。

exunlock 方法和参数名解释如下：

```c++
void token::exunlock(
    account_name owner, //通证持有者
    extended_asset quantity, //解锁数量
    time_point_sec expiration, //锁仓期
    string memo //附言
)
```

解锁操作只有在当前时间大于锁仓期时候可以进行，这里需要注意的是 `expiration` 参数的值不是当前时间，而是锁仓转账时设定的锁仓期时间。

**实例**

```javascript
//初始化 fibos 客户端
...
let ctx = fibos.contractSync("eosio.token");
let r = ctx.exunlockSync("fibostest123", "100.0000 ADC@nmslwsndhjyz", 1539830948, "unlock 100.0000 ADC", {
			authorization: "hujzwsndnmsl"
		})
console.notice(r);
```

