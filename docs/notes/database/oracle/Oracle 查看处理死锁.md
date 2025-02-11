---
title: Oracle 查看处理死锁
createTime: 2024/10/10 11:11:00
permalink: /database/oracle/1ygs65e7/
---

# Oracle 查看处理死锁

## 前言

### 什么是表的死锁以及死锁的产生原因

表的死锁是指在 Oracle 数据库中，两个或多个事务相互等待对方持有的锁资源，导致它们无法继续执行下去，从而形成死锁现象。

死锁的产生原因通常是因为事务在操作数据时，对数据进行了锁定，但是由于事务执行顺序或者并发操作的原因导致了互相等待对方持有的锁资源，从而形成死锁。

### 产生死锁的案例

具体业务场景及代码示例： 假设有两个用户同时对同一张表进行更新操作，用户 A 执行 UPDATE 语句锁住了表中的某些行，而用户 B 也执行 UPDATE 语句锁住了表中的另一些行，此时就可能发生死锁。

代码示例： 用户 A 的更新操作：

```sql
BEGIN
  UPDATE table_name SET column1 = 'value1' WHERE condition;
  COMMIT;
END;
```

用户 B 的更新操作：

```sql
BEGIN
  UPDATE table_name SET column2 = 'value2' WHERE condition;
  COMMIT;
END;
```

在这种情况下，用户 A 和用户 B 可能会出现死锁。为了避免死锁，可以考虑修改事务的执行顺序，或者使用数据库的锁机制和事务隔离级别来避免死锁的发生。

## 查看死锁

1、下面的语句用来查询哪些对象被锁：

```sql
select a.object_name,b.session_id,c.serial#,c.program,c.username,c.command,c.machine,c.lockwait
from all_objects a,v$locked_object b,v$session c where a.object_id=b.object_id and c.sid=b.session_id;
```

查看执行中的 job 的那些对象被锁

```sql
select a.object_name,b.session_id,c.serial#,c.program,c.username,c.command,c.machine,c.lockwait
from all_objects a,v$locked_object b,v$session c where a.object_id=b.object_id and c.sid=b.session_id
and b.session_id in (select sid from dba_jobs_running where job in (824,1044));
```

2、查询锁表原因以及 sid、serial#

```sql
select l.session_id sid, s.serial#, l.locked_mode, l.oracle_username, s.user#, l.os_user_name, s.machine, s.terminal, a.sql_text, a.action
from v$sqlarea a, v$session s, v$locked_object l
where l.session_id = s.sid and s.prev_sql_addr = a.address
order by sid, s.serial#;
```

3、用下面的语句用来杀死引起死锁的进程：

```sql
--sid,serial对应2步骤的值
alter system kill session 'sid,serial#';
```

## 查询执行中的会话

```sql
SELECT
    s.sid,                                 -- 会话的 SID（唯一标识符）
    s.serial#,                             -- 会话的 Serial#，用于终止会话时需要
    s.username,                            -- 执行 SQL 的用户名
    t.sql_id,                              -- SQL 语句的唯一标识符
    t.cpu_time / 1000000 AS cpu_time_seconds, -- SQL 的累计 CPU 消耗时间（秒）
    t.elapsed_time / 1000000 AS elapsed_time_seconds, -- SQL 的总执行时间（秒）
    t.executions,                          -- SQL 执行的次数
    (t.elapsed_time / t.executions) / 1000000 AS avg_elapsed_time_seconds, -- 平均每次执行时间（秒）
    t.elapsed_time / 1000000 AS max_elapsed_time_seconds, -- 最大执行时间（需要统计时提供完整信息）
    t.rows_processed,                      -- SQL 语句影响的总行数（如果可用）
    t.sql_text                             -- SQL 的文本内容
FROM
    v$session s
JOIN
    v$sql t
ON
    s.sql_id = t.sql_id                    -- 将会话与其正在执行的 SQL 关联
WHERE
    s.status = 'ACTIVE'                    -- 筛选当前处于活跃状态的会话
    AND s.type = 'USER'                    -- 排除后台进程，仅查看用户会话
    AND t.executions > 0                   -- 确保统计信息有效，避免除零错误
ORDER BY
    t.cpu_time DESC                     -- 按 CPU 时间从高到低排序
```

## 捕捉 Oracle 慢 SQL

```sql
select * from gv$sqlarea t where t.OPTIMIZER_MODE='ALL_ROWS' order by disk_reads desc
```

慢 SQL 查询

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

## 问题

**ORA-00054: 资源正忙，锁表”以及“ORA-00031：标记要终止的会话”的解决方法**

### 现象描述

在 ORACLE 数据处理过程中，当某个 PL/SQL developer 正在运行创建一个临时表对大的数据进行暂存处理时，由于处理速度很慢，这时突然做了中断处理，甚至于直接从“任务管理器”中关掉 PL/SQL developer。再次对该数据临时表进行处理时，会发现无论是删除、更新、查询等操作，都处于一直的执行等待状态。这种情况，很有可能是表已经被锁住了。但是当查询到死锁会话，采用`alter system kill session'sid,serial#';`来处理时，却提示报错，无法杀掉线程，只能到操作系统级杀掉线程了。下面就对这种情况的处理过程进行详细的说明。

![img](https://y.creammint.cn/articles/images/1875512-20220218155418508-1041493563.png)

### 解决方法

1. 可以通过下列语句查询：

```sql
select a.spid,b.sid,b.serial#,b.username
from v$process a,v$session b
where a.addr=b.paddr
and b.status='KILLED';
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161428300-662981761.png)

1. 如果利用上面的命令杀死一个进程后，进程状态被置为"killed"，但是锁定的资源很长时间没有被释放，那么可以在 OS 级再杀死相应的进程（线程），首先执行下面的语句获得进程（线程）号：

```sql
select b.spid,a.osuser,b.program
  from v$session a,v$process b
 where a.paddr=b.addr
   and a.sid=176     --176就是上面的sid
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161605390-1686124764.png)

1. 在 OS 上杀死这个进程（线程）

1)、在 unix/linux 上，用 root 身份执行命令：

```sql
#kill -9 9532（9532 即第4步查询出的spid）
```

2)、在 windows（unix 也适用）用 orakill 杀死线程，orakill 是 oracle 提供的一个可执行命令，语法为：

```sql
orakill sid thread
```

其中：

sid：表示要杀死的进程属于的实例名

thread：是要杀掉的线程号，即第 3 步查询出的 spid。

```sql
例：C:>orakill ACVS 9532
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161852049-245548292.png)

**注意**：这里要注意的是 kill OS 进程是在服务端操作，而不是你程序所在客户机。

---

**参考文献**：

https://blog.csdn.net/qq_46645079/article/details/135219181

https://www.cnblogs.com/String-song/p/15909325.html
