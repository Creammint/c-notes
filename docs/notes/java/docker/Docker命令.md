# Docker 命令

### 官网

[Docker 命令大全 | 菜鸟教程 (runoob.com)](https://www.runoob.com/docker/docker-command-manual.html)

## 启动、停止、重启、删除

```plain
--停止容器
docker stop 容器id

--启动容器
docker start 容器id

--重启容器
docker restart 容器id

--删除容器
docker rm 容器id
```

## 查看服务

```plain
--查询所有
docker ps -a

--查询指定容器
docker ps -a | grep report
```

## 查看日志

docker logs -f 容器 id

查看日志滚动：tail -f hd-server.log

查看指定接口：grep -C 30 "/hd/reportData/getSortDetailsReport/" hd-server.log

- A 前几行
- B 后几行
- C 前后各几行
