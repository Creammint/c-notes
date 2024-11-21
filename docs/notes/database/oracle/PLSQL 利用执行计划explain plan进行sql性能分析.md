# plsql 利用执行计划 explain plan 进行 sql 性能分析

## 执行计划简介

### 什么是执行计划 (Explain plan)？

: 执行计划是一条查询语句在 Oracle 中的执行过程或访问路径的描述。

### 怎样查看 Oracle 执行计划？

以 PLSQL 为例：

- 在 ：file—>new—> Explain Plan Window, 打开解释计划窗口。

  ![image-20241121164016808](https://y.creammint.cn/articles/images/image-20241121164016808.png)

- 在：tools —> Preferences —> Plan Window；根据需要配置要显示在执行计划中的列。

  ![image-20241121164230443](https://y.creammint.cn/articles/images/image-20241121164230443.png)

### 执行计划常用列介绍

- **基数（Rows）**：Oracle 估计的当前操作的返回结果集行数

- **字节（Bytes）**：执行该步骤后返回的字节数

- **耗费（COST）、CPU 耗费**：Oracle 估计的该步骤的执行成本 用于说明 SQL 执行的代价，理论上越小越好（该值可能与实际有出入）

- **操作（OPERATION）**：
  当前步骤所执行的操作类型。常见操作包括`TABLE ACCESS`（表访问）、`INDEX SCAN`（索引扫描）、`JOIN`（连接操作）等。

- **选项（OPTIONS）**：
  操作的具体策略或选项，进一步描述执行步骤。

  `TABLE ACCESS`的选项可能是

  - `FULL`（全表扫描）
  - `BY INDEX ROWID`（通过索引访问）

## 使用执行计划分析 SQL

### 建立百万级别表 sp

```sql
CREATE TABLE sp   AS
    SELECT rownum AS n, rpad('*',100,'*') AS pad FROM dual
    CONNECT BY level <= 1000000;
--建立索引并添加主键
 create unique index t_pk on sp(n);
 alter table sp add constraint t_pk primary key(n) using index t_pk
```

1. 利用 Oracle 特有的“connect by”树形连接语法生成测试记录，“level <= 10”表示要生成 10 记录；

2. 利用 rownum 虚拟列生成递增的整数数据；

3. rpad(源字符串,length,填充字符串);当源字符串的长度大于定长 length 时，rpad 为在源字符串的右侧填充指定字符或者空格；

### 打开 explain plan 窗口进行 sql 分析

1. 未索引：select \* from sp

   全表扫描：TABLE ACCESS FULL 、耗费：4222 、CPU 耗费：271691255 、IO 耗费：4213

   ![image-20241121165728170](https://y.creammint.cn/articles/images/image-20241121165728170.png)

2. 使用索引后：select count(\*) from sp –>count(\*)的时候使用了索引快速扫描

   扫描到索引： INDEX FAST FULL SCAN、耗费：584、CPU 耗费:135197153、IO 耗费：580

   ![image-20241121165758085](https://y.creammint.cn/articles/images/image-20241121165758085.png)

以上是最直观的一个例子，也可以使用 hint 函数或者 move 表之后进行索引重建以便直观的发现 sql 执行性能的问题
更多操作：

- 进行 move table 索引失效,优化器表示为全表扫描

  ```sql
  alter table sp move;
  ```

- 重建索引,再次查询时，优化器扫描到索引，性能加快

  ```sql
  alter index t_pk rebuild;
  ```

- 返回了整个表的大部分数据使用了全表扫描

  ```sql
  select count(pad) from sp where n<=799990;
  ```

- 返回小部分数据时，使用的是索引扫描

  ```sql
  select count(pad) from sp where n<=9990;
  ```

- 使用 full，是进行全表扫描（虽然就查 10 条 但是很耗费资源）

  ```sql
  select /*+ full(sp)*/ count(pad) from sp where n<=10;
  ```

  全表扫描：TABLE ACCESS FULL 、耗费：4222 、CPU 耗费：284046613 、IO 耗费：4213

### Hint 函数简介

:::tip

[oracle 中 hint 详解](https://www.cnblogs.com/emilyyoucan/p/7844795.html)

:::

- 什么是 Hint？
  ： Hint 是 Oracle 数据库提供的一种机制用来告诉优化器按照 hint 告诉它的方式生成执行计划。
  是很多 DBA 优化中常用的一个手段

- 有哪些常用的 Hint？

  - Hint 分为优化器相关、访问路径相关、和查询转换相关等等

    - /\*+ALL_ROWS\*/表明对语句块选择基于开销的优化方法,并获得最佳吞吐量,使资源消耗最小化

    - /\*+FULL(TABLE)\*/表明对表选择全局扫描的方法

    - /\*+INDEX(TABLE INDEX_NAME)\*/表明对表选择索引的扫描方法
