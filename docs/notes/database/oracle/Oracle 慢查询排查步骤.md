# Oracle 慢查询排查步骤

## 前言

记录一次 Oracle 慢查询的排查过程 , 便于以后直接使用.

看了一些文档 , Oracle 中优化的方案和 Mysql 基本上是一致的 , 通常包括一下几个方向 :

- **基准测试** (吞吐量) : 包括 Oracle 本身吞吐量和磁盘 I/O 吞吐量
- **硬件分析** (资源情况) : 包括查看服务器 CPU , 硬盘的使用情况
- **SQL 分析** : 分析 SQL 中是否存在慢查询 , 是否命中索引
- **配置优化** : 分析是否可以通过环境配置提高性能

以上几个方面 , 基本上就能将问题定位了 , 通过问题再考虑解决的方法

## 排查步骤

### 查询慢查询日志

区别于 Mysql 直接写到 log 中的日志 , Oracle 可以通过语句拉出慢查询的 Excle log @ [oracle 慢查询 - 我是属车的 - 博客园 (cnblogs.com)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fasker009%2Fp%2F10768298.html)

```sql
--慢查询耗时
select *
 from (select sa.SQL_TEXT "执行 SQL",
        sa.EXECUTIONS "执行次数",
        round(sa.ELAPSED_TIME / 1000000, 2) "总执行时间",
        round(sa.ELAPSED_TIME / 1000000 / sa.EXECUTIONS, 2) "平均执行时间",
        sa.COMMAND_TYPE,
        sa.PARSING_USER_ID "用户ID",
        u.username "用户名",
        sa.HASH_VALUE
     from v$sqlarea sa
     left join all_users u
      on sa.PARSING_USER_ID = u.user_id
     where sa.EXECUTIONS > 0
     order by (sa.ELAPSED_TIME / sa.EXECUTIONS) desc)
 where rownum <= 50;

--查询次数最多的 SQL
select *
 from (select s.SQL_TEXT,
        s.EXECUTIONS "执行次数",
        s.PARSING_USER_ID "用户名",
        rank() over(order by EXECUTIONS desc) EXEC_RANK
     from v$sql s
     left join all_users u
      on u.USER_ID = s.PARSING_USER_ID) t
 where exec_rank <= 100;

```

![image-20241125141948925](https://y.creammint.cn/articles/images/image-20241125141948925.png)

拿到平均执行时间后就可以明显的发现查询时间较长的 SQL , 但是这一类 SQL 不一定是慢查询 , 需要根据情况判断 , 如果出现很离谱的时间 , 就需要分析索引

### 查看索引情况

```sql
explain plan for
select * from t_call_records where t_bjhm='123456'

# 查看执行结果
select * from table(dbms_xplan.display)

```

![image.png](https://y.creammint.cn/articles/images/d8aa95be98af459b80de1304ddeececa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**从这里可以明显看到走了全表扫描 , 那么就需要根据情况加索引和校验**

- **index unique scan** : 索引唯一扫描 (主键索引)
- **index range scan** : 索引范围扫描 (组合索引的情况)
- **index full scan** : 全索引扫描
- **index fast full scan**：索引快速扫描，扫描索引中的全部的数据块，与全索引扫描的方式基本上类似。
  - 两者之间的明显的区别是，索引快速扫描对查询的数据不进行排序，数据返回的时候不是排序的。

### 查看锁的竞争情况

```sql
SELECT
	SQ.INST_ID,
	SQ.SQL_TEXT, /*SQL文本*/
	SE.SID, /*会话的唯一标识，通常要对某个会话进行分析前，首先就需要获得该会话的SID。*/
	SE.BLOCKING_SESSION,
	SQ.OPTIMIZER_COST AS COST_,/* COST 值*/
	SE.LAST_CALL_ET CONTINUE_TIME,/*执行时间*/
	SE.EVENT,/*等待事件*/
	SE.LOCKWAIT,/*是否等待LOCK(SE，P)*/
	SE.MACHINE,/*客户端的机器名。(WORKGROUP\PC-201211082055)*/
	SQ.SQL_ID,/*SQL_ID*/
	SE.USERNAME,/*创建该会话的用户名*/
	SE.LOGON_TIME,/*登陆时间*/
	'ALTER SYSTEM KILL SESSION ' || SE.SID || ',' || SE.SERIAL #  --若存在锁情况,会用到KILL锁释放~
FROM
	gV$SESSION SE,/*会话信息。每一个连接到ORACLE数据库的会话都能在该视图中对应一条记录*/
	gV$SQLAREA SQ /*跟踪所有SHARED POOL中的共享CURSOR信息，包括 执行次数，逻辑读，物理读等*/
WHERE
	SE.SQL_HASH_VALUE = SQ.HASH_VALUE   
	AND SE.STATUS = 'ACTIVE'   
	AND SE.SQL_ID = SQ.SQL_ID   
	AND SE.USERNAME = SQ.PARSING_SCHEMA_NAME       --过滤条件
	AND SE.USERNAME = 'FWSB' --用户名
	AND se.BLOCKING_SESSION IS NOT NULL;

// 实际运行脚本======================
SELECT
	SQ.INST_ID,
	SQ.SQL_TEXT,
	SE.SID,
	SE.BLOCKING_SESSION,
	SQ.OPTIMIZER_COST AS COST_,
	SE.LAST_CALL_ET CONTINUE_TIME,
	SE.EVENT,
	SE.LOCKWAIT,
	SE.MACHINE,
	SQ.SQL_ID,
	SE.USERNAME,
	SE.LOGON_TIME,
	'ALTER SYSTEM KILL SESSION ' || SE.SID || ','
FROM
	gV$SESSION SE,
	gV$SQLAREA SQ
WHERE
	SE.SQL_HASH_VALUE = SQ.HASH_VALUE
	AND SE.STATUS = 'ACTIVE'
	AND SE.SQL_ID = SQ.SQL_ID
	AND SE.USERNAME = SQ.PARSING_SCHEMA_NAME
	AND SE.USERNAME = 'FWSB'
	AND SE.BLOCKING_SESSION IS NOT NULL;

```

![image.png](https://y.creammint.cn/articles/images/d0e4b20d774f4456a8cf7b4ac003b811~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**补充** : 相关的表结构可以生乳查询 [Oracle 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fdatabase%2Foracle%2Foracle-database%2F12.2%2Frefrn%2FV-SESSION.html%23GUID-28E2DC75-E157-4C0A-94AB-117C205789B9)

> Step 2 : 查询结果

![image.png](https://y.creammint.cn/articles/images/d87368ff2b134fc18d331aff19caee2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

这里可以通过 SID 再去查找对应的 SQL , 找到对应的锁对象

### 其他锁语句

以下内容参考自 : [blog.csdn.net/u011019491/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fu011019491%2Farticle%2Fdetails%2F48370827) , 各位可以看看原文

```sql
SELECT
	s.username,
	decode(l.TYPE, 'TM', 'TABLE LOCK', 'TX', 'ROW LOCK', NULL ) LOCK_LEVEL,
	o.owner,
	o.object_name,
	o.object_type,
	s.sid,
	s.terminal,
	s.machine,
	s.program,
	s.osuser
FROM
	v$session s,
	v$lock l,
	all_objects o
WHERE
	 l.sid = s.sid
	AND l.id1 = o.object_id(+)
	AND s.username is NOT Null

```

**详情参考 :--->** [V$Lock](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fdatabase%2Foracle%2Foracle-database%2F12.2%2Frefrn%2FV-LOCK.html%23GUID-87D76889-832C-4BFC-B8B0-154A22721781)

![image.png](https://y.creammint.cn/articles/images/cb79a821fb164eb2a858ca1c517f8309~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 查出被锁的表，和锁住这个表的会话 ID

```sql
select a.session_id ,b.* from v$locked_object a,all_objects b where a.object_id=b.object_id
```

> 查出对应的 SQL 语句

```sql
SELECT
	vs.SQL_TEXT,
	vsess.sid,
	vsess.SERIAL #,
	vsess.MACHINE,
	vsess.OSUSER,
	vsess.TERMINAL,
	vsess.PROGRAM,
	vs.CPU_TIME,
	vs.DISK_READS
FROM
	v$sql vs,
	v$session vsess
WHERE
	vs.ADDRESS = vsess.SQL_ADDRESS
	AND vsess.sid = 36


```

![image.png](https://y.creammint.cn/articles/images/5fbaafb5eaf8451ba28051b0dfcc8526~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 补充语句 :

```java
// 查哪个过程被锁 -> 查V$DB_OBJECT_CACHE视图:
SELECT * FROM V$DB_OBJECT_CACHE WHERE OWNER='过程的所属用户' AND LOCKS!='0';

// 查是哪一个SID,通过SID可知道是哪个SESSION. -> 查V$ACCESS视图:
SELECT * FROM V$ACCESS WHERE OWNER='过程的所属用户' AND NAME='刚才查到的过程名';

// 查出SID和SERIAL# -> 查V$SESSION视图 + 查V$PROCESS视图
SELECT SID,SERIAL#,PADDR FROM V$SESSION WHERE SID='刚才查到的SID'
SELECT SPID FROM V$PROCESS WHERE ADDR='刚才查到的PADDR';
```

## 慢查询优化

:::tip

[Oracle SQL 性能优化](https://www.cnblogs.com/rootq/archive/2008/11/17/1334727.html)

:::

### SQL 部分

```sql
// 避免 in 操作
Oracle 中 in 会被试图转换成多个表的连接 , 转换不成功会先进行 in 中的子查询 , 再进行外部查询

// 避免 not in
不管哪个数据库 , 一般都是不推荐的 ,这种写法会跳过索引 (同理还有 is null 和 not null)

// 避免使用 <>
类似 , 不走索引

// **采用函数处理的字段不能利用索引**

// 关联查询
- 多用 Where 语句把单个表的结果集最小化，多用聚合函数汇总结果集后再与其它表做关联
- 多用 右连接

// 过滤多用 where ,避免使用 having
- 这个和 mysql 是一致的 , having 是对 where 的数据进行过滤组处理 , 对于数据的过滤 , 优先用 where
- 总结 : 先过滤小的结果集，然后通过这个小的结果集和其他表做关联

// like 操作符
like 操作可以通过 instr 代替

// union操作符
- 通常不会产生重复结果 , 而 union 会额外触发一次排序
- 采用union ALL操作符替代union，因为union ALL操作只是简单的将两个结果合并后就返回

// SQL 执行保证统一性
涉及到 SGA 的概念

// where后面的条件顺序影响
这里不是全表索引的问题 , 而是由于 where 多个条件时 , 比较带来的 cpu 占用率问题

// 询表顺序的影响
- 表的顺序不对会产生十分耗服务器资源的数据交叉
```

## 性能优化

### 整体性能优化流程

```sql
// PS : 初始化时间 49.41

// 增大 SGA Buffer Cache 和 SGA Shared Pool -> 48.57
- 增大 SGA 已经缓冲看来对于性能的提升并不显著，加载时间只提升了 1.73%

// 增大 SGA Redo Cache 和 Redo Log Files -> 41.39
- 加载时间提升了 17.35%，TPS 也提升了 9.33%。因为加载和同时插入，更新，删除需要比 8M 大的空间
- 但是看起来增加内存性能并没有显著提升

// 增大 Database Block Size (2K-4K) -> 17.35
- 加载时间提升了 138%！而对 TPS 值没有很大的影响

// 使用 Tablespaces Local -> 15.07
- TPS 轻微提升

// Database Block Size 增大 (4K-8K) -> 11.42
- TPS 继续提升 , 区别较大

// 添加 io_slaves -> 10.48
dbwr_io_slaves 4\
lgwr_io_slaves (derived) 4

// 优化Linux 内核 -> 9.40
可以看到 , 内核版本优化后 , 性能是有一定提升的

// 调整虚拟子内存 -> 5.58
- /ect/sysctl.cong
    -> vm.bdflush = 100 1200 128 512 15 5000 500 1884 2
```

**这个流程不能作为标杆 , 但是可以作为优化 Oracle 的思路 , 可以看到 , 性能提升很大**

## 概念补充

### SGA

**系统全局区域(SGA)** 是一组共享内存结构，称为 SGA 组件，包含一个 Oracle 数据库实例的数据和控制信息。SGA 由所有服务器和后台进程共享。SGA 中存储的数据示例包括缓存的数据块和共享的 SQL 区域。

> 组成部分 :

- Database buffer cache

  : 数据缓存

  - 在查询或修改数据库中存储的数据之前，必须从磁盘读取数据并将其存储在缓冲区缓存中。
  - 所有连接到数据库的用户进程都共享对缓冲区缓存的访问。
  - 为了获得最佳性能，缓冲区缓存应该足够大，以避免频繁的磁盘 I/O 操作。

- Shared pool

  : 共享池缓存用户共享的信息 , 包括如下内容

  - 可重用的 SQL 语句
  - 来自数据字典的信息，例如用户帐户数据、表和索引描述以及特权
  - 存储过程，它是存储在数据库中的可执行代码

- **Redo log buffer** : 这个缓冲区通过缓存重做信息来提高性能，直到可以将它写入存储在磁盘上的物理在线重做日志文件

- **Large pool** : 这个可选区域用于为各种服务器进程缓冲大型 I/O 请求

- **Java pool** : Java 池是用于 Java 虚拟机(JVM)中所有特定于会话的 Java 代码和数据的内存区域

- **Streams pool** : Streams 池是 Oracle Streams 特性使用的内存区域

- **Result cache** : 结果缓存缓冲区查询结果。如果运行的查询将结果存储在结果缓存中，那么数据库将从结果缓存返回查询结果，而不是重新运行查询。

:::tip

[Oracle 慢查询排查步骤](https://juejin.cn/post/7002490281228517413)

:::
