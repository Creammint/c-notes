---
title: PLSQL 使用技巧、快捷键
createTime: 2024/10/10 10:15:47
permalink: /database/oracle/xbo010pq/
---

# PLSQL 使用技巧、快捷键

## 类 SQL PLUS 窗口

File->New->Command Window，这个类似于 oracle 的客户端工具 sql plus，但比它好用多了。

## 设置关键字自动大写

Tools->Preferences->Editor，将 Keyword case 选择 Uppercase。这样在窗口中输入 sql 语句时，关键字会自动大写，而其它都是小写。这样阅读代码比较容易，且保持良好得编码风格，同理，在 Tools->Preferences->Code Assistant(助手)里可以设置代码提示延迟时间、输入几个字符时提示、数据库对象的大写、小写，首字母大写等；

## 查看执行计划

选中需要分析的 SQL 语句，然后点击工具栏的 Explain plan 按钮(即执行计划)，或者直接按 F5；这个主要用于分析 SQL 语句执行效率，分析表的结构，便于为 sql 调优提供直观依据；

## 自动替换

快捷输入 SQL 语句，例如输入 s，按下空格，自动替换成 SELECT；再例如，输入 sf，按下空格，自动替换成 SELECT \* FROM，非常方便，节省了大量的时间去编写重复的 SQL 语句。

**设置方法**：

菜单`Tools–>Preferences–>Editor–>AutoReplace(自动替换)–>Edit`

1. 建立一个文本文件 shortcuts.txt，并写入如下内容： s=SELECT 复制代码另存到 PL/SQL Developer 的安装路径下的~/PlugIns 目录下
2. `Tools–>Preferences–>User Interface–>Editor–>AutoReplace`，选中 Enable 复选框，然后浏览文件选中之前创建的 shortcuts.txt，点击 Apply。
3. 重启 PL/SQL Developer，在 sql 窗口中输入 s+空格，sc+空格做测试。 注意：shortcuts.txt 不可删除掉，否则快捷键无法用

下面定义了一些规则作为参考：

```
i=INSERT
u=UPDATE
s=SELECT
f=FROM
w=WHERE
o=ORDER BY
d=DELETE
df=DELETE FROM
sf=SELECT * FROM
sc=SELECT COUNT(*) FROM
sfu=SELECT * FROM FOR UPDATE
cor=CREATE OR REPLACE
p=PROCEDURE
fn=FUNCTION
t=TIGGER
v=VIEW
sso=SET serveroutput ON;
```

## 设置快捷键

**设置方法：菜单 Tools–>Preferences–>用户界面–>键配置**

新建 sql 窗口：ctrl+shift+s

新建命令窗口：ctrl+shift+c

新建测试窗口：ctrl+shift+t PL/SQL Developer

美化器：ctrl+shift+f

重做：ctrl+shift+z

撤销：ctrl+z

清除：ctrl+d(慎用，不可恢复，俺是禁用哦 O(∩_∩)O~)

选中所有：ctrl+a

缩进：tab

取消缩进：shift+tab

大写：ctrl+shift+x

小写：ctrl+shift+y

注释：ctrl+h

取消注释：ctrl+m

查找：ctrl+f

显示表结构：ctrl+鼠标悬停在表名上

模板列表：shift+alt+r

窗口列表：ctrl+w

## 执行单条 SQL 语句

按 F8 键

## TNS Names

菜单 Help->Support Info(支持信息)->TNS Names，可以查看 Oracle 的 tnsnames.ora;

## 调试存储过程

在使用 PL/SQL Developer 操作 Oracle 时，有时候调用某些存储过程，或者调试存储过程； 调用存储过程的方法：

1. 首先，在 PL/SQL Developer 左边的 Browser 中选择 Procedures，查找需要调用的存储过程；

2. 然后，选中调试的存储过程，点击右键，选择 Test，在弹出来的 Test scrīpt 窗口中，对于定义为 in 类型的参数，需要给该参数的 Value 输入值；最后点击上面的条数按钮：Start debugger 或者按 F9；

3. 最后点击：RUN 或者 Ctrl+R 。

   ```sql
   调试快捷键
   切换断点：ctrl+b
   开始：f9
   运行：ctrl+r
   单步进入：ctrl+n
   单步跳过：ctrl+o
   单步退出：ctrl+t
   运行到异常：ctrl+y

   plsql菜单或者工具条上的部分调试功能
   Run（Ctrl＋R）全速运行，到断点停下；
   Step into（Ctrl＋N）执行一步，如果是调用过程，进入子过程；
   Step over（Ctrl＋O）执行一步，无论什么语句；
   Step out（Ctrl＋T）执行完过程，直到从过程中退出到上一级；
   ```

## 登录后默认自动选中 My Objects

默认情况下，PLSQL Developer 登录后，Brower 里会选择 All objects，如果你登录的用户是 dba，要展开 tables 目录，正常情况都需要 Wait 几秒钟，而选择 My Objects 后响应速率则是以毫秒计算的。

设置方法： Tools 菜单–>Brower Filters，会打开 Brower Folders 的定单窗口，把“My Objects”设为默认即可。 Tools 菜单–>Brower Folders 中把你经常点的几个目录（比如：Tables Views Seq Functions Procedures）移得靠上一点，并加上颜色区分，这样你的平均寻表时间会大大缩短，试试看。

优先级，从左往右 Tables–>Tablespaces–>Procedures–>Users–>Roles

## PL/SQL 英文编写格式乱

![image-20250307205117379](https://y.creammint.cn/articles/images/image-20250307205117379.png)

修复：shift+capslock+空格

::: tip

[PL/SQL Developer 使用技巧、快捷键](https://www.cnblogs.com/linjiqin/p/3152538.html)

:::
