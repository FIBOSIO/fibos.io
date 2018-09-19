# fibos.js API 方法之 getInfoSync

**作者：痛饮狂歌**

***

FIBOS 中的 fibos.js 是 FIBOS 的 JavaScript 客户端库，它用于与 FIBOS 区块链进行交互。与 eosjs（ EOS 的 JavaScript 客户端库）相比，fibos.js 通过给 eosjs 打补丁（patch）的方式为 eosjs 中的 API 方法新增了同步版本（其方法名是在原方法名后添加 Sync 后缀），使我们不用理会异步方法的回调问题，便可以完成相同的操作。《fibos.js API 方法》系列文章将对 fibos.js 库所提供的 API 方法逐一进行介绍，使大家能更好地利用它们来进行开发。

本篇介绍的是 getInfoSync 同步方法（对应的异步方法为 getInfo），其用于返回 FIBOS 相关信息，首先创建一个 get_info1.js 文件，代码如下：

```js
    const FIBOSJS = require("fibos.js");

    // 主网 RPC 地址
    const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";
    // FIBOS 链ID
    const FIBOS_CHAINID =
      "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a";

    let config = {
      chainId: FIBOS_CHAINID,
      httpEndpoint: MAINNET_RPC_ADDRESS
    };

    let fibos = FIBOSJS(config);

    console.log(fibos.getInfoSync());
```


可以看到，调用 fibos.js 中的同步方法是非常简单明了的，通常只需将一个包含 FIBOS 链ID、公网 RPC 网址的配置（config）对象作为参数传给 FIBOSJS，然后在返回的客户端对象 fibos 上调用 getInfoSync 方法即可。

运行该文件:

```shell
    $ fibos get_info1.js
```

输出结果如下：

```json
    {
      "server_version": "2ad41277",
      "chain_id": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
      "head_block_num": 1493811,
      "last_irreversible_block_num": 1493485,
      "last_irreversible_block_id": "0016c9edb7eda05beebb9598fdca1357945c861147c24542e50d181d53a49978",
      "head_block_id": "0016cb33d1a5668b5ee921d45d448f0726da66f217bfd0751594a149cdee68d1",
      "head_block_time": "2018-09-06T07:14:00.500",
      "head_block_producer": "fibos123comm",
      "virtual_block_cpu_limit": 200000000,
      "virtual_block_net_limit": 1048576000,
      "block_cpu_limit": 199900,
      "block_net_limit": 1048576,
      "server_version_string": "v1.2.2"
    }
```

如果我们查看 fibos.js 和 eosjs 的源码，会发现其实这些 API 方法不过是将对相应 API 接口网址的 HTTP 请求进行了封装，比如 getInfoSync，其对应的请求路径为 /v1/chain/get_info，将它与主网 RPC 地址连接起来，就是最终的请求地址：

http://se-rpc.fibos.io:8870/v1/chain/get_info

好，我们再创建一个 get_info2.js 文件来验证一下，文件内容如下：

```js
    const HTTP = require("http");

    // 主网 RPC 地址
    const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";
    // FIBOS 链ID
    const FIBOS_CHAINID =
      "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a";

    let url = MAINNET_RPC_ADDRESS + '/v1/chain/get_info';

    let client = new HTTP.Client();

    console.log(client.get(url).json());
```

运行该文件，会看到与 get_info1.js 的输出结果一致。

明白了方法背后的运行机制，捅破这层窗外纸，我们会发现世界变得豁然开朗，我们可以不必依赖 fibos.js，在其它语言和环境中一样可以获取这些信息。

比如通过在浏览器端和 Node.js 中都能使用的 axios 库以访问 API 接口网址方式查询 FIBOS 相关信息：

```js
    const axios = require('axios');

    axios.get('http://se-rpc.fibos.io:8870/v1/chain/get_info')
      .then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      }).then(function () {
    });
```

在 PHP 中通过访问 API 接口网址方式查询 FIBOS 相关信息，也很简单，下面是 get_info.php 的代码：

```php
    <?php

    const MAINNET_RPC_ADDRESS = 'http://se-rpc.fibos.io:8870';

    $url = MAINNET_RPC_ADDRESS . '/v1/chain/get_info';

    $result = file_get_contents($url);

    print_r(json_decode($result, true));
```

运行该文件，结果如下：

```shell
    $ php get_info.php
    Array
    (
        [server_version] => 2ad41277
        [chain_id] => 6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a
        [head_block_num] => 1497835
        [last_irreversible_block_num] => 1497505
        [last_irreversible_block_id] => 0016d9a1f4103120e24549168b6106ec89374879c11b591548a9b140db2b0ff7
        [head_block_id] => 0016daeb65886c41bedd5754436445c7014c6be10ad44d7756f950c8483f2d01
        [head_block_time] => 2018-09-06T07:47:32.500
        [head_block_producer] => eosteaeostea
        [virtual_block_cpu_limit] => 200000000
        [virtual_block_net_limit] => 1048576000
        [block_cpu_limit] => 199900
        [block_net_limit] => 1048576
        [server_version_string] => v1.2.2
    )
```

最后，我们看一下如何调用异步方法，因为 fibos.js 这个库是可以在 Node.js 下使用的，但其同步方法变得不可用，只能使用异步方法：

文件 get_info3.js 代码清单：

```js
    const FIBOSJS = require("fibos.js");

    // 主网 RPC 地址
    const MAINNET_RPC_ADDRESS = "http://se-rpc.fibos.io:8870";
    // FIBOS 链ID
    const FIBOS_CHAINID =
      "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a";

    let config = {
      chainId: FIBOS_CHAINID,
      httpEndpoint: MAINNET_RPC_ADDRESS
    };

    let fibos = FIBOSJS(config);

    fibos.getInfo({}).then(result => console.log(result));
```

