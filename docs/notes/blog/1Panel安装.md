# 1Panel 安装

## 安装

### 环境要求

**安装前请确保您的系统符合安装条件：**

- 操作系统：支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）；
- 服务器架构：x86_64、aarch64、armv7l、ppc64le、s390x；
- 内存要求：建议可用内存在 1GB 以上；
- 浏览器要求：请使用 Chrome、FireFox、IE10+、Edge 等现代浏览器；
- **可访问互联网**。

### 安装部署

GitHub release 链接: https://github.com/1Panel-dev/1Panel/releases

执行以下安装脚本，根据命令行提示完成安装。

```bash
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```

如果遇到 Docker 安装失败等问题，可以尝试运行以下脚本：

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

了解更多信息，请访问官方网站：[https://linuxmirrors.cn](https://linuxmirrors.cn/)

安装成功后，控制台会打印面板访问信息，可通过浏览器访问 1Panel：

```bash
http://目标服务器 IP 地址:目标端口/安全入口
```

- **如果使用的是云服务器，请至安全组开放目标端口。**
- **ssh 登录 1Panel 服务器后，执行 1pctl user-info 命令可获取安全入口（entrance）**

安装成功后，可使用 [1pctl](https://1panel.cn/docs/v2/installation/cli/) 命令行工具来维护 1Panel

## 命令行工具

### 1pctl

1Panel 默认内置了命令行运维工具 **1pctl**，通过执行 1pctl help，可以查看相关的命令说明。

```bash
Usage:
  ./1pctl [COMMAND] [ARGS...]
  ./1pctl --help

Commands:
  status [core|agent]         检查 1Panel 服务状态
  start [core|agent|all]      启动 1Panel 服务
  stop [core|agent|all]       停止 1Panel 服务
  restart [core|agent|all]    重启 1Panel 服务
  uninstall                   卸载 1Panel 服务
  user-info                   获取 1Panel 用户信息
  listen-ip                   切换 1Panel 监听 IP
  version                     查看 1Panel 版本信息
  update                      修改 1Panel 系统信息
  reset                       重置 1Panel 系统信息
  restore                     恢复 1Panel 服务及数据
```

### 1pctl reset

**重置 1Panel 系统信息，包括取消安全入口登录，取消两步验证等**

```bash
Usage:
  1panel reset [command]

Available Commands:

  domain      取消 1Panel 访问域名绑定
  entrance    取消 1Panel 安全入口
  https       取消 1Panel https 方式登录
  ips         取消 1Panel 授权 IP 限制
  mfa         取消 1Panel 两步验证
```

### 1pctl listen-ip

**修改 1Panel 监听 IP**

```bash
Usage:
  1pctl listen-ip [COMMAND] [ARGS...]
  1pctl listen-ip --help

Commands:
  ipv4                监听 IPv4
  ipv6                监听 IPv6
```

### 1pctl update

**修改 1Panel 系统信息**

```bash
Usage:
  1pctl update [COMMAND] [ARGS...]
  1pctl update --help

Commands:
  username            修改面板用户
  password            修改面板密码
  port                修改面板端口
```

## Docker 安装教程

官网教程：[Docker 安装指南](https://dockerdocs.xuanyuan.me/install)
