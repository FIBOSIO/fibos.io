# 如何在 FIBOS 中注册账号？

为了满足开发者能够在 FIBOS 主网上线后便可创建 FIBOS 账号，FIBOS 团队提供给开发者完整的开发文档。

学习本文档前,你需要对 FIBOS 和 fibos.js 有一定的了解。假如你对 FIBOS 和 fibos.js 不了解，请参阅 [使用 fibos.js 与 FIBOS 交互](../basic/fibosjs.md) 。

### 生成一个 FIBOS 公私钥

- 使用 fibos.js 的 ecc 生成

```
var FIBOS = require("fibos.js");
var prikey = FIBOS.modules.ecc.randomKeySync(); //私钥
var pubkey = FIBOS.modules.ecc.privateToPublic(prikey); //公钥
console.log("公钥: %s\n私钥: %s",pubkey,prikey)
```

tips: FIBOS 的公钥是一个以 FO 为前缀的随机字符串，如：`FO8LhSy6K8NXaCfs8uMCLFsANkekQPbrgzbkfM1aNqJUALXQVHKF` 

### 创建一个 FIBOS 账号

目前 FIBOS 主网暂时提供一个免费注册 FIBOS账户。

- 使用 HTTP 请求发起注册

**请求 URL:**

```
http://tunnel.fibos.io/1.0/app/token/create
```

**请求方式:**

```
POST
```

**参数:**

| 参数名  | 必选 | 类型   | 说明         |
| ------- | ---- | ------ | ------------ |
| account | yes  | String | FIBOS 账户名 |
| pubkey  | yes  | String | FO 公钥      |

> 注意:
>
> 1).FIBOS 账户数字必须是1-5，字母a-z(小写)，长度必须为12位，且不要为纯数字。
>
> 2).FO 公钥名称必须为 FO 开头例如 FO8b21gQczLmdpmYeaLAj7ErmDCwswaUzkZH3zBTz9QEibK79pVE

**实例:**

```
var http = require('http');
var httpClient = new http.Client();
var httpServerHost = "http://tunnel.fibos.io/1.0/app/token/create";
var account = "xxx"  你的 FIBOS 账户名
var pubkey = "xxx" 你的 FIBOS 公钥
var rep = httpClient.post(httpServerHost, {
			json: {
					account: account,
					pubkey: pubkey
			}
}).json()
console.log(rep);
```

> 基于 FIBOS 实现HTTP Client

**返回实例:**

```
{
    "message": "success",
    "pubkey": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "account": "fibosmainnet"
}
```

返回 message 为 success 时，证明你本次账号创建成功。