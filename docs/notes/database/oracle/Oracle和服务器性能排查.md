# Oracle 和服务器性能排查

## 服务器基础资源监控

### 磁盘监控

> df-h

<img src="https://y.creammint.cn/articles/images/image-20241204132659002.png" alt="image-20241204132659002"  />

### 内存监控

> free -h

<img src="https://y.creammint.cn/articles/images/image-20241204132809070.png" alt="image-20241204132809070"  />

### CPU 监控

> top

<img src="https://y.creammint.cn/articles/images/image-20241204132812807.png" alt="image-20241204132812807"  />

### 磁盘 IO 监控

> iostat 5

<img src="https://y.creammint.cn/articles/images/image-20241204132930804.png" alt="image-20241204132930804"  />

### 内存使用情况监控

> vmstat 5

<img src="https://y.creammint.cn/articles/images/image-20241204132950776.png" alt="image-20241204132950776"  />

## 数据库日常操作

### 数据库关停，启动

连接环境的正确性检查
ssh 登录后：

> whoami #一定要确定当前用户是 oracle
>
> echo $ORACLE_SID
>
> echo $ORACLR_HOME

![image-20241204133118477](https://y.creammint.cn/articles/images/image-20241204133118477.png)

### 登录数据库

**切换 Oracle 用户**：`su - oracle`

**登录数据库**： `sqlplus / as sysdba`

#### 启动

> startup

#### 关闭数据库

> shutdown immediate （等待会话结束后关闭数据库）
>
> shutdown abort（强制关闭，生产环境禁用）

### 监听状态

> lsnrctl status

<img src="https://y.creammint.cn/articles/images/image-20241204133314318.png" alt="image-20241204133314318"  />

#### 关闭监听

> lsnrctl stop

#### 启动监听

> lsnrctl start

### alert 日志查看

```bash
cd /opt/app/oracle/diag/rdbms/hdposzs2/hdposzs/trace/

tail -10f alert_hdposzs.log
```

<img src="https://y.creammint.cn/articles/images/image-20241204133411654.png" alt="image-20241204133411654"  />

### dataguard 状态监控

```bash
dgmgrl /

show configuration

show database hdposzs
```

<img src="https://y.creammint.cn/articles/images/image-20241204133521094.png" alt="image-20241204133521094"  />

### 查看最近 sql 执行历史

先切换 Oracle 用户，登录 sysdba，执行下面这个命令，`前2个`都输入默认即可；

```bash
@?/rdbms/admin/awrrpt.sql
```

输入开始日期，Snap Id：

Enter value for begin_snap

输入结束日期

Enter value for end_snap

![image-20241204135153459](https://y.creammint.cn/articles/images/image-20241204135153459.png)

输入导出的文件地址：

![image-20241204135346082](https://y.creammint.cn/articles/images/image-20241204135346082.png)

最后把导出来的 html 文件，下载下来在浏览器打开；

打开后是这个样子的，纯英文，阅读性比较难；

![image-20241204135613335](https://y.creammint.cn/articles/images/image-20241204135613335.png)

## 性能排查

### v$sql 视图

**关注**：sql_text、sql_fulltext、sql_id
ELAPSED_TIME、EXECUTIONS、
DISK_READS

```sql
SELECT SQL_ID, SQL_TEXT, EXECUTIONS, ELAPSED_TIME / 1000000 AS ELAPSED_SECONDS
FROM v$sql
ORDER BY EXECUTIONS DESC, ELAPSED_TIME DESC
FETCH FIRST 10 ROWS ONLY; -- 获取前 10 条记录
```

<img src="https://y.creammint.cn/articles/images/image-20241204133702138.png" alt="image-20241204133702138"  />

### v$session 视图

**关注**：‌SID‌、‌SERIAL#、‌USERNAME、STATUS‌、‌OSUSER‌、‌MACHINE、‌PROGRAM

```sql
SELECT SID, SERIAL#, USERNAME, STATUS, OSUSER, MACHINE, PROGRAM
FROM V$SESSION t
WHERE t.SCHEMANAME='HD40'
and t.STATUS='ACTIVE'
```

<img src="https://y.creammint.cn/articles/images/image-20241204133748259.png" alt="image-20241204133748259"  />

### v$process 视图

**关注 ‌**：SPID‌、ADDR、SERIAL#

其中，SPID 为 top 中看到的系统进程 id
addr 与 v$session 的 paddr 关联 ‌

<img src="https://y.creammint.cn/articles/images/image-20241204133829157.png" alt="image-20241204133829157"  />

### 根据系统进程查看 sql 信息

&1 会弹窗输入 SPID

```sql
select t2.SPID,t2.PROGRAM, t3.SQL_FULLTEXT, t1.*
  from v$session t1, v$process t2, v$sql t3
 where t2.SERIAL# = t1.CREATOR_SERIAL#
   and t2.ADDR = t1.PADDR
   and t3.SQL_ID = t1.SQL_ID
   and t1.STATUS='ACTIVE'
   and t2.SPID = &1;
```

<img src="https://y.creammint.cn/articles/images/image-20241204133928607.png" alt="image-20241204133928607"  />

### 执行计划解析

通过 plsql 查看 sql 语句的执行计划，重点关注 `table access full` 和 `cost`。

需要尽可能避免 table access full，降低 cost

<img src="https://y.creammint.cn/articles/images/image-20241204134031980.png" alt="image-20241204134031980"  />

### 耗时最长 sql

```sql
select *
  from (select t.SQL_TEXT,
               t.SQL_FULLTEXT,
               t.DISK_READS,
               t.EXECUTIONS,
               t.ELAPSED_TIME / 1000 / 1000 /
               decode(t.EXECUTIONS, 0, 1, t.EXECUTIONS) ps
          from v$sql t
         order by ps desc) A
 where rownum < 20;
```

<img src="https://y.creammint.cn/articles/images/image-20241204134100262.png" alt="image-20241204134100262"  />
