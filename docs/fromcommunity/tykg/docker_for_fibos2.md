# 如何用 Docker 搭建 FIBOS 开发环境（二）

**作者：痛饮狂歌**

------

在《如何用 Docker 搭建 FIBOS 开发环境（一）》中（下面简称前文），我们快速验证了用 Docker 搭建 FIBOS 开发环境的可行性，在本文中我们将开始搭建一个真正好用的 FIBOS 开发、运行、测试环境。

我们最终的目的是开发环境在主机上，运行、测试环境在 Docker 容器上。这样我们即可以使用主机系统中我们用的顺手的开发工具如 Visual Studio Code、Sublime Text、Atom 等来编写代码，又可在 Docker 容器上随意折腾，而不用担心会影响主机。


因为我们会基于定制镜像来生成新的容器，所以先停止并删除我们在前文中创建的 `fibos` 容器。

```bash
➜  ~ docker container stop fibos \
&& docker container rm fibos
fibos
fibos
```

### 主机目录结构

为了方便管理，我们在主机中自己的用户目录下（`$HOME`）新建一个 `myfibos` 目录用于存放所有 FIBOS 相关文件，然后再在该目录下创建一个 `image` 子目录（用于存放 Dockerfile 文件），并通过 `git` 命令克隆官网示例代码至 `samples` 子目录：

```bash
➜  ~ mkdir myfibos
➜  ~ cd myfibos
➜  myfibos mkdir image
➜  myfibos git clone https://github.com/FIBOSIO/samples
Cloning into 'samples'...
remote: Counting objects: 66, done.
remote: Compressing objects: 100% (48/48), done.
remote: Total 66 (delta 19), reused 47 (delta 13), pack-reused 0
Unpacking objects: 100% (66/66), done.
Checking connectivity... done.
```

最终的目录结构如下：

```
myfibos/
├── image
│   └── Dockerfile
└── samples
    ├── ...
    ├── ...
    ├── ... 
    ├── ...
    └── ...
```

### 使用 Dockerfile 定制镜像

定制镜像的好处在于我们可以把准备工作（更新包索引并安装必要的工具和库，安装 FIBOS 运行环境）放入 Dockerfile 文件，依此构建出我们自己的镜像，之后基于该镜像创建新容器时就不用每次都要执行准备工作了。

Dockerfile 文件内容如下：

```
FROM ubuntu:latest
RUN apt-get update \
  && apt-get install sudo curl vim libssl1.0.0 -y \
  && curl -s https://fibos.io/download/installer.sh | sh
```

然后在 `image` 目录下执行 `docker build` 命令来构建我们自己的镜像，以 `-t` 选项指定镜像名:标签为 `ubuntu:fibos`。

```bash
➜  image docker build -t ubuntu:fibos .
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM ubuntu:latest
 ---> 735f80812f90
Step 2/2 : RUN apt-get update   && apt-get install sudo curl vim libssl1.0.0 -y   && curl -s https://fibos.io/download/installer.sh | sh
 ---> Running in aec53152fe8a
 .
 .
 .
This program will install fibos into /usr/local/bin.
Removing intermediate container aec53152fe8a
 ---> fe6f060d35f9
Successfully built fe6f060d35f9
Successfully tagged ubuntu:fibos
```

### 创建数据卷

为何要创建数据卷，引用《Docker 从入门到实践》中的一段话：

> 按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用数据卷、或者绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

> 数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

创建一个名为 `fibos` 的数据卷：

```
➜  myfibos docker volume create fibos
fibos
```

### 创建并运行基于该镜像的容器

好，现在我们可以用下面的命令创建并运行基于 `ubuntu:fibos` 镜像的容器了，通过 `-dt` 参数选项指定容器在后台运行，通过 `--name` 选项参数指定容器名为 `fibos` 以方便以后引用该容器，通过 `--mount type=bind,source=$HOME/myfibos,target=/myfibos` 绑定我们的主机目录 `myfibos` 至容器。因为 FIBOS 的配置及数据目录默认分别为 `/root/.local/share/eosio/nodeos/config` 和 `/root/.local/share/eosio/nodeos/data`，所以我们通过 `--mount source=fibos,target=/root/.local/share/eosio/nodeos` 指定这两个目录的父目录挂载至数据卷。

```bash
➜  ~ docker run -dt --name fibos \
 --mount type=bind,source=$HOME/myfibos,target=/myfibos \
 --mount source=fibos,target=/root/.local/share/eosio/nodeos \
 ubuntu:fibos
cd04a12cc67f06fb3d9f0db802c270b518e1ef874187b78eb4fa3dd04394b33b
```

容器创建好后，我们可通过 `docker container ls -a` 命令查看，STATUS 列会显示出容器的状态是运行中（Up）还是终止的（Exited）以及时长信息：

```
➜  ~ docker container ls -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
cd04a12cc67f        ubuntu:fibos        "/bin/bash"         About an hour ago   Up 5 seconds                            fibos
```

对于运行中的容器，我们可通过 `docker exec` 以执行命令的形式进入容器，然后运行 `fibos` 命令看看其输出结果：

```bash
➜  ~ docker exec -it fibos bash
root@cd04a12cc67f:/# fibos
Welcome to FIBOS. Based on fibjs 0.26.0-dev.
Type ".help" for more information.
> .info
{
  "fibjs": "0.26.0-dev",
  "git": "v0.25.0-58-g8aef38e",
  "clang": "4.0",
  "date": "Aug  6 2018 11:47:07",
  "vender": {
    "ev": "4.24",
    "expat": "2.2.5",
    "gd": "2.2.4",
    "jpeg": "8.3",
    "leveldb": "1.17",
    "mongo": "0.7",
    "pcre": "8.21",
    "png": "1.5.4",
    "mbedtls": "2.6.1",
    "snappy": "1.1.2",
    "sqlite": "3.23.0",
    "tiff": "3.9.5",
    "uuid": "1.6.2",
    "v8": "6.8.275.14",
    "v8-snapshot": true,
    "zlib": "1.2.7",
    "zmq": "3.1"
  }
}
> .exit
root@cd04a12cc67f:/#
```

可以看到，FIBOS 运行环境已是开箱即用的。

### 运行示例代码

由于我们在创建容器时挂载了主机中的 `myfibos` 目录到了容器中，所以我们可以直接运行来自官网的示例代码了。

###### 1. 运行官网开发指南《搭建一个 FIBOS 开发环境》中的示例代码

```
root@cd04a12cc67f:/# cd /myfibos/samples/hello_fibos/start_fibos
root@cd04a12cc67f:/myfibos/samples/hello_fibos/start_fibos# fibos node.js
```

当看到持续的日志输出时，恭喜你已经成功运行一个 FIBOS 节点服务。

由于其它示例代码是需要这个 FIBOS 节点服务处在开启（运行）状态下，所以我们要在主机中新开一个终端窗口，然后通过 `docker exec -it fibos bash` 命令进入容器来执行其它示例代码。

###### 2. 运行官网开发指南《使用 fibos.js 与 FIBOS 交互》中的示例代码

*初始化环境*

```
root@cd04a12cc67f:/# cd /myfibos/samples/hello_fibos/fibos_client
root@cd04a12cc67f:/....../fibos_client# fibos --init
```

*安装 fibos.js*

```
root@cd04a12cc67f:/....../fibos_client# fibos --install fibos.js
```

*运行 client.js 获取第一个区块信息*

```
root@cd04a12cc67f:/....../fibos_client# fibos client.js
```

*运行其它示例代码*

（略）

### 其它相关 Docker 命令

##### 停止容器运行

在容器终端命令行状态下，输入 `exit` 命令退出容器后，如果不再需要容器运行，可停止其运行。

```bash
➜  ~ myfibos docker container stop fibos
```

##### 重启容器

```bash
➜  ~ myfibos docker container start fibos
```

##### 删除容器

```bash
➜  ~ docker container rm fibos
```

#### 至此，我们用 Docker 搭建 FIBOS 开发、运行、测试环境的工作算是完成了，接下来就看大家八仙过海，各显神通了。