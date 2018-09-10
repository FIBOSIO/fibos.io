# 如何在 FIBOS 中进行智能通证之间的互兑

> 学习本文档前，你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

随着9.5日 FIBOS 主网开放了创建通证的通道之后，很多用户都在 FIBOS 上发行了属于自己的通证，还不知道如何发行通证的同学可以参考上文，[如何在 FIBOS 中发行和销毁通证](howtocreatetokeninfibos.md) 。其中智能通证在 FIBOS 上可以进行互兑，本文将教会大家如何进行兑换。

## 钱包一键兑换

[下载 FO 钱包](http://wallet.fo/) ，先选择你要兑换的源智能通证，输入要兑换的数量，再选择你要兑换的目标通证。点击兑换，稍等片刻即可兑换成功。

## 代码实现

假设用户 `fibostest123` 发行了一个智能通证叫做 `VAYNE` ，用户 `fibostest321` 发行了一个叫做了 `HASAKI` 的智能通证。那么用户 `fibostest123` 想要用 `VAYNE` 兑换得到一定数量的 `HASAKI` 是怎么实现的呢？调用接口 `exchangeSync` 接口进行兑换。

```javascript
//初始化 FIBOS 客户端
...
let account = "fibostest123"
let ctx = client.contractSync("eosio.token");
let result = ctx.exchangeSync(account, "1.0000 VAYNE@fibostest123", "0.0000 HASAKI@fibostst321", "exchenge VAYNE to HASAKI",{
    authorization: account
});
```

如果想要兑换成 `FIBOS` 中的 `EOS` 通证，那么只需将 `0.0000 HASAKI@fibostst321` 换成 `0.0000 EOS@eosio` 即可。