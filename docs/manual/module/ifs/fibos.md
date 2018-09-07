# 模块 fibos
fibos 实例对象

使用方法：

```JavaScript
var fibos = require('fibos')
```

## 静态函数

### load
**加载系统 plugin**

```JavaScript
static fibos.load(String name,
    Object cfg = {});
```

调用参数:
* name: String, 系统 plugin 名
* cfg: Object, 提供给系统 plugin 的配置，[可选]

--------------------------
**加载配置**

```JavaScript
static fibos.load(Object cfgs);
```

--------------------------
**参数详解**

### http 插件

| 配置名称                    | 配置含义                                        | 默认值           | 参考值 |
| --------------------------- | ----------------------------------------------- | ---------------- | ------ |
| http-server-address         | 本地http服务地址                                | 127.0.0.1:8888   |        |
| https-server-address        | 本地https服务地址                               | -                |        |
| max-body-size               | RPC请求允许最大字节                             | 1024*1024(bytes) |        |
| verbose-http-errors         | 显示Http返回的错误日志                          | false            |        |
| http-validate-host          | 验证Http请求host                                | true             |        |
| access-control-allow-origin | 对每个请求返回特殊的Access-Control-Allow-Origin | -                | *      |

------

### chain 插件

| 配置名称               | 配置含义                                            | 默认值 | 参考值                                                       |
| ---------------------- | --------------------------------------------------- | ------ | ------------------------------------------------------------ |
| genesis-json           | 指定创世块数据路径                                  | -      | 文件路径 参考文件:[EOS TestNet](https://github.com/CryptoLions/EOS-Jungle-Testnet/blob/aa499583d5e7f19799d93ab569e29b39741d1bb4/genesis.json) [EOS MainNet](https://github.com/EOS-Mainnet/eos/blob/mainnet-1.1.3/mainnet-genesis.json) |
| genesis-timestamp      | 覆盖创世块中的初试时间戳                            | -      | -                                                            |
| print-genesis-json     | 是否打印创世数据                                    | false  | -                                                            |
| fix-reversible-blocks  | 是否将数据恢复到不可逆高度                          | false  | -(无法使用)                                                  |
| replay-blockchain      | 是否清除状态数据然后回滚所有数据                    | false  | -(无法使用,猜测为命令行使用?)                                |
| hard-replay-blockchain | 是否清除状态数据,然后从区块日志中回滚尽可能多的数据 | false  | -                                                            |
| delete-all-blocks      | 是否删除所有的状态数据和区块数据                    | false  | -                                                            |
| truncate-at-block      | 停止出块,并在该区块高度回滚                         | 0      | -(无法使用)                                                  |



| 配置名称                     | 配置含义                                                     | 默认值      | 参考值 |
| ---------------------------- | ------------------------------------------------------------ | ----------- | ------ |
| blocks-dir                   | 区块数据存放地址                                             | blocks      | -      |
| abi-serializer-max-time-ms   | 覆盖默认 ABI 序列化允许的最大时间                            | 15*1000(ms) | -      |
| chain-state-db-size-mb       | 区块数据库中允许的最大容量                                   | 1024 (MB)   | -      |
| chain-state-db-guard-size-mb | 当区块数据库中剩余的数据小于此大小时可以安全地关闭节点       | 128(MB)     | -      |
| reversible-blocks-db-size-mb | 最大能够回滚的数据量                                         | 340(MB)     | -      |
| contracts-console            | 是否打印合约输出                                             | false       | -      |
| read-mode                    | mode database contains changes done up to the head block plus changes made by transactions not yet included to the blockchain     mode database contains changes done up to the current head block. | speculative | -      |

------

### net 插件

| 配置名称                  | 配置含义                         | 默认值                        | 参考值                                                       |
| ------------------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| p2p-listen-endpoint       | 监听 p2p 连接的地址和端口        | 0.0.0.0:9876                  | -                                                            |
| p2p-server-addrsss        | 提供给其它节点 p2p 服务地址      | p2p-listen-endpoint           | -                                                            |
| p2p-peer-address          | 公共的p2p 对等节点地址           | -                             | FIBOS TestNet [ 103.80.170.107:9876]                         |
| p2p-max-nodes-per-host    | 单个 IP 能够连接的最大客户端数量 | 1                             | -                                                            |
| allowed-connection        | 允许连接                         | any                           | 'any'/'producers'/'specified'/'none'。如果'specified'，则必须至少指定一次对等密钥。如果只有'producers'，则不需要对等密钥。 |
| peer-private-key          | 一个 公钥、私钥组成的数组        |                               |                                                              |
| max-clients               | 允许连接客户端的最大数量         | 25                            | 0: 无限制                                                    |
| connection-cleanup-period | 清除不可用链接周期               | 30(s)                         | -                                                            |
| network-version-match     | 是否需要相同版本的网络           | false                         | -                                                            |
| peer-log-format           | 节点日志格式化                   | [\"${name}\" ${_ip}:${_port}] |                                                              |

------

### chain_api 插件

>  提供 RPC 请求

| api                   | 请求 | 含义                     | 参数                          | 参考请求                                                     |
| --------------------- | ---- | ------------------------ | ----------------------------- | ------------------------------------------------------------ |
| /v1/chain/get_info    | GET  | 获取与节点相关的最新信息 | -                             | curl http://127.0.0.1:8888/v1/chain/get_info                 |
| /v1/chain/get_block   | POST | 获取一个块的信息         | block_num_or_id: 区块高度或id | curl  http://127.0.0.1:8888/v1/chain/get_block -X POST -d '{"block_num_or_id":1}' |
| /v1/chain/get_account | POST | 获取账户的信息           | account_name:账户名称         | curl  http://127.0.0.1:8888/v1/chain/get_account -X POST -d '{"account_name":"eosio"}' |
| /v1/chain/get_code    | POST | 获取智能合约代码         | account_name:合约名称         | curl http://127.0.0.1:8888/v1/chain/get_code -X POST -d      |

------

### producer 插件

| 配置名称                   | 配置含义                      | 默认值 | 参考值        |
| -------------------------- | ----------------------------- | ------ | ------------- |
| max-transaction-time       | 事务最大超时时间              | 30(s)  | -             |
| greylist-account           | 无法使用 CPU 和 NET 的账号    | -      | -             |
| enable-stale-production    | 启用产生区块,即使区块是静止的 |        |               |
| max-irreversible-block-age | 最大的不可逆块时间            | -1     | >1            |
| producer-name              | 控制节点出块的账户名          |        | eosio(可多参) |
| private-key                | 签名程序的公钥、私钥          |        | (可多参数)    |

------

### wallet 插件

| 配置名称        | 配置含义                                                     | 默认值    | 参考值 |
| --------------- | ------------------------------------------------------------ | --------- | ------ |
| wallet-dir      | 钱包存放路径                                                 | .         | -      |
| unlock-timeout  | 解锁钱包超时时间                                             | 900(s)    | -      |
| yubihsm-url     | Override default URL of http://localhost:12345 for connecting to yubihsm-connector" | URL       | -      |
| yubihsm-authkey | Enables YubiHSM support using given Authkey                  | "key_num" |        |

------

### wallet_api 插件

> Http api RPC 请求接口

| api                               | 请求 | 含义                                        |
| --------------------------------- | ---- | ------------------------------------------- |
| /v1/wallet/create                 | POST | 创建一个新的钱包                            |
| /v1/wallet/wallet_open            | POST | 打开给定名称的现有钱包                      |
| /v1/wallet/wallet_open            | POST | 打开给定名称的现有钱包.                     |
| /v1/wallet/wallet_lock_all        | GET  | 锁定所有钱包.                               |
| /v1/wallet/wallet_unlock          | POST | 用给定的名称和密码解锁钱包.                 |
| /v1/wallte/wallet_list            | GET  | 列出所有钱包                                |
| /v1/wallet/wallet_list_keys       | GET  | 列出所有钱包中的所有密钥对                  |
| /v1/wallet/wallet_get_public_keys | GET  | 列出所有钱包中的所有公钥.                   |
| /v1/wallet/wallet_set_timeout     | POST | 设置钱包自动锁定超时(以秒为单位)            |
| /v1/wallet/wallet_sign_trx        | POST | 给定一个事务数组的签名事务，需要公钥和链ID. |

------

### bnet 插件

| 配置名称                 | 配置含义                                                     | 默认值       | 参考值 |
| ------------------------ | ------------------------------------------------------------ | ------------ | ------ |
| bnet-endpoint:           | 所监听的传入链接的端点                                       | 0.0.0.0:4321 |        |
| bnet-follow-irreversible | 是否只接受从其他端点的不可逆的块                             | false        |        |
| bnet-threads             | 用于处理网络消息的线程数                                     |              |        |
| bnet-connect             | 其他节点的远程端点连接; 根据需要使用多个bnet-connect选项来组成网络 |              |        |
| bnet-no-trx              | 这个peer请求其他节点没有pending的transactions                | false        |        |

------

### start

**启动 fibos**

```JavaScript
static fibos.start();
```

--------------------------
### stop
**停止 fibos**

```JavaScript
static fibos.stop();
```

## 静态属性

### data_dir
**String, fibos 的数据存放目录**

```JavaScript
static String fibos.data_dir;
```

--------------------------
### config_dir
**String, fibos 的配置存放目录**

```JavaScript
static String fibos.config_dir;
```

--------------------------
### pubkey_prefix
**String, fibos 公钥前缀**

```JavaScript
static String fibos.pubkey_prefix;
```

--------------------------
### enableJSContract
**Boolean, 查询和设置 JavaScript 智能合约状态，为 True 时支持 JavaScript 智能合约**

```JavaScript
static Boolean fibos.enableJSContract;
```

### 实例

```javascript
var fibos = require('fibos');
console.notice("start FIBOS name:eosio");

fibos.config_dir = "/blockData";
fibos.data_dir = "/blockData";

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);


fibos.load("http", {
	"http-server-address": "127.0.0.1:8870",
	"access-control-allow-origin": "*"
});

fibos.load("net", {
	"p2p-listen-endpoint": "0.0.0.0:9870"
});

fibos.load("producer", {
	'producer-name': 'eosio',
	'enable-stale-production': true,
	'max-transaction-time': 3000,
});

fibos.load("chain", {
	// "delete-all-blocks": true,
	'chain-state-db-size-mb': 8 * 1024,
	'genesis-json': 'genesis.json'
});
fibos.load("chain_api");
fibos.pubkey_prefix = "FO";
fibos.enableJSContract = false;

fibos.start();
```

