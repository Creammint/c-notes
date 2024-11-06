import{_ as e,c as r,a8 as l,o as t}from"./chunks/framework.Tg-9kKsk.js";const m=JSON.parse('{"title":"Oracle 简介","description":"","frontmatter":{"title":"Oracle 简介","createTime":"2024/09/20 18:06:41","permalink":"/database/oracle/g0nuifg0/"},"headers":[],"relativePath":"notes/database/oracle/Oracle 简介.md","filePath":"notes/database/oracle/Oracle 简介.md","lastUpdated":1729331653000}'),c={name:"notes/database/oracle/Oracle 简介.md"};function i(o,a,p,s,n,h){return t(),r("div",null,a[0]||(a[0]=[l('<h1 id="oracle数据库是什么" tabindex="-1">Oracle数据库是什么？ <a class="header-anchor" href="#oracle数据库是什么" aria-label="Permalink to &quot;Oracle数据库是什么？&quot;">​</a></h1><p>Oracle Database，又名 Oracle RDBMS，简称 Oracle。Oracle 数据库系统是美国 Oracle 公司（甲骨文）提供的以分布式数据库为核心的一组软件产品，是目前最流行的客户/服务器（client/server）或B/S体系结构的数据库之一，比如 SilverStream 就是基于数据库的一种中间件。Oracle 数据库是目前世界上使用最为广泛的数据库管理系统，作为一个通用的数据库系统，它具有完整的数据管理功能；作为一个关系型数据库，它是一个完备关系的产品；作为分布式数据库它实现了分布式处理功能，只要在一种机型上学习了 操作Oracle 的知识，便能在各种类型的机器上使用它。</p><h2 id="数据文件-dbf" tabindex="-1"><strong>数据文件（dbf）</strong> <a class="header-anchor" href="#数据文件-dbf" aria-label="Permalink to &quot;**数据文件（dbf）**&quot;">​</a></h2><p>数据文件是数据库的物理存储单位，而表空间TableSpace则是数据库的逻辑组成部分。数据库的数据是存储在表空间中的，而一个表空间可以由一个或多个数据文件组成，一个数据文件只能属于一个表空间。一旦数据文件被加入到某个表空间后，就不能删除这个文件，如果要删除某个数据文件，只能删除其所属于的表空间才行。</p><h2 id="表空间" tabindex="-1"><strong>表空间</strong> <a class="header-anchor" href="#表空间" aria-label="Permalink to &quot;**表空间**&quot;">​</a></h2><p>表空间是 Oracle 对物理数据库上相关数据文件（ORA 或者 DBF 文件）的逻辑映射。一个数据库在逻辑上被划分成一到若干个表空间，每个表空间包含了在逻辑上相关联的一组结构。每个数据库至少有一个表空间（称之为 system 表空间）。每个表空间由同一磁盘上的一个或多个文件组成，这些文件叫数据库文件（datafile）。一个数据文件只能属于一个表空间。</p><p><img src="https://y.creammint.cn/articles/images/1600135827795399.png" alt="img"></p><h2 id="用户" tabindex="-1"><strong>用户</strong> <a class="header-anchor" href="#用户" aria-label="Permalink to &quot;**用户**&quot;">​</a></h2><p>用户是在实例下建立的。不同实例中可以建相同名字的用户。注意！表的数据，是由用户放入某一个表空间的，而这个表空间会随机把这些表数据放到一个或者多个数据文件中。由于 Oracle 的数据库不是普通的概念，oracle 是由用户和表空间对数据进行管理和存放的。但是表不是由表空间去查询的，而是由用户去查的。因为不同用户可以在同一个表空间建立同一个名字的表！这里区分就是用户了！</p><p><img src="https://y.creammint.cn/articles/images/1600135725454050.png" alt="img"></p><p>SCOTT 和 HR（用户）</p><p>scott 与 hr 就是初始的普通用户，这些用户下面都默认存在了表结构</p><p><img src="https://y.creammint.cn/articles/images/1600136061551630.png" alt="img"></p><p><img src="https://y.creammint.cn/articles/images/1600135933151885.png" alt="img"></p><h2 id="关于数据库语言的分类" tabindex="-1">关于数据库语言的分类 <a class="header-anchor" href="#关于数据库语言的分类" aria-label="Permalink to &quot;关于数据库语言的分类&quot;">​</a></h2><p>DDL：数据库定义语言：create、drop</p><p>DML：数据库的操作语言：insert、update、delete</p><p>DQL：数据库的查询语言：select</p><p>DCL：数据库的控制语言：grant、revoke</p><h2 id="oracle数据库的优势" tabindex="-1">oracle数据库的优势 <a class="header-anchor" href="#oracle数据库的优势" aria-label="Permalink to &quot;oracle数据库的优势&quot;">​</a></h2><p>ORACLE 数据库系统能够在业内独占鳌头并不是空穴来风，下面我们来细数一下 ORACLE 数据库的优势所在：</p><h3 id="完整的数据管理功能" tabindex="-1">完整的数据管理功能： <a class="header-anchor" href="#完整的数据管理功能" aria-label="Permalink to &quot;完整的数据管理功能：&quot;">​</a></h3><ul><li>数据的大量性</li><li>数据的保存的持久性</li><li>数据的共享性</li><li>数据的可靠性</li></ul><h3 id="完备关系的产品" tabindex="-1">完备关系的产品： <a class="header-anchor" href="#完备关系的产品" aria-label="Permalink to &quot;完备关系的产品：&quot;">​</a></h3><ul><li>信息准则---关系型 DBMS 的所有信息都应在逻辑上用一种方法，即表中的值显式地表示</li><li>保证访问的准则</li><li>视图更新准则---只要形成视图的表中的数据变化了，相应的视图中的数据同时变化</li><li>数据物理性和逻辑性独立准则</li></ul><h3 id="分布式处理功能" tabindex="-1">分布式处理功能： <a class="header-anchor" href="#分布式处理功能" aria-label="Permalink to &quot;分布式处理功能：&quot;">​</a></h3><ul><li>ORACLE 数据库自第5版起提供了分布式处理能力，到第7版有比较完善的分布式数据库功能了，一个ORACLE 分布式数据库由 oraclerdbms、sql<em>Net、SQL</em>CONNECT 和其他非 ORACLE 的关系型产品构成。</li><li>用 ORACLE 能轻松的实现数据仓库的操作</li></ul><p>以上是 Oracle 数据库的优势，从这些优势中不难看出这是一款功能强大的数据库系统。</p><h2 id="数据库和实例" tabindex="-1">数据库和实例 <a class="header-anchor" href="#数据库和实例" aria-label="Permalink to &quot;数据库和实例&quot;">​</a></h2><p>Oracle 数据库服务器由一个数据库和至少一个数据库实例组成。 数据库是一组存储数据的文件，而数据库实例则是管理数据库文件的内存结构。此外，数据库是由后台进程组成。</p><p>数据库和实例是紧密相连的，所以我们一般说的 Oracle 数据库，通常指的就是实例和数据库。</p><p>下图说明了 Oracle 数据库服务器体系结构：</p><p><img src="https://y.creammint.cn/articles/images/1527921761851925.png" alt="1"></p><p>在这种体系结构中，Oracle 数据库服务器包括两个主要部分：文件(Oracle 数据库)和内存(Oracle 实例)。</p><h2 id="oracle数据库" tabindex="-1">Oracle数据库 <a class="header-anchor" href="#oracle数据库" aria-label="Permalink to &quot;Oracle数据库&quot;">​</a></h2><p>Oracle 数据库的一个基本任务是存储数据，以下部分简要地介绍 Oracle 数据库的物理和逻辑存储结构。</p><h3 id="物理存储结构" tabindex="-1">物理存储结构 <a class="header-anchor" href="#物理存储结构" aria-label="Permalink to &quot;物理存储结构&quot;">​</a></h3><p>物理存储结构是存储数据的纯文件。当执行一个 CREATE DATABASE 语句来创建一个新的数据库时，将创建下列文件：</p><p>● <strong>数据文件</strong>：数据文件包含真实数据，例如销售订单和客户等。逻辑数据库结构(如表和索引)的数据被物理存储在数据文件中。</p><p>● <strong>控制文件</strong>：每个 Oracle 数据库都有一个包含元数据的控制文件。元数据用来描述包括数据库名称和数据文件位置的数据库物理结构。</p><p>● <strong>联机重做日志文件</strong>：每个 Oracle 数据库都有一个联机重做日志，里面包含两个或多个联机重做日志文件。联机重做日志由重做条目组成，能够记录下所有对数据所做的更改。</p><p>除这些文件外，Oracle 数据库还包括如参数文件、网络文件、备份文件以及用于备份和恢复的归档重做日志文件等重要文件。</p><h3 id="逻辑存储结构" tabindex="-1">逻辑存储结构 <a class="header-anchor" href="#逻辑存储结构" aria-label="Permalink to &quot;逻辑存储结构&quot;">​</a></h3><p>Oracle 数据库使用逻辑存储结构对磁盘空间使用情况进行精细控制。以下是 Oracle 数据库中的逻辑存储结构：</p><p>● <strong>数据块(Data blocks)</strong>：Oracle 将数据存储在数据块中。数据块也被称为逻辑块，Oracle 块或页，对应于磁盘上的字节数。</p><p>● <strong>范围(Extents)</strong>：范围是用于存储特定类型信息的逻辑连续数据块的具体数量。</p><p>● <strong>段(Segments)</strong>：段是分配用于存储用户对象(例如表或索引)的一组范围。</p><p>● <strong>表空间(Tablespaces)</strong>：数据库被分成称为表空间的逻辑存储单元。 表空间是段的逻辑容器。 每个表空间至少包含一个数据文件。</p><p>下图说明了表空间中的段，范围和数据块：</p><p><img src="https://y.creammint.cn/articles/images/1527921992580971.gif" alt="2"></p><p>下图显示了逻辑和物理存储结构之间的关系：</p><p><img src="https://y.creammint.cn/articles/images/1527922009366512.gif" alt="3"></p><h2 id="oracle实例" tabindex="-1">Oracle实例 <a class="header-anchor" href="#oracle实例" aria-label="Permalink to &quot;Oracle实例&quot;">​</a></h2><p>Oracle 实例是客户端应用程序(用户)和数据库之间的接口。<strong>Oracle 实例由三个主要部分组成：系统全局区 (SGA)，程序全局区 (PGA) 和后台进程</strong>。如下图所示 ：</p><p><img src="https://y.creammint.cn/articles/images/1527922049190668.jpg" alt="4"></p><blockquote><p>DBWr（DBWR）在后来允许多进程写data file,所以改成DBWn了。</p></blockquote><p>SGA 是实例启动时分配的共享内存结构，关闭时释放。 SGA 是一组包含一个数据库实例的数据和控制信息的共享内存结构。</p><p>不同于所有进程都可用的 SGA，PGA 是会话开始时为每个会话分配的私有内存区，当会话结束时释放。</p><h3 id="主要的oracle数据库的后台进程" tabindex="-1">主要的Oracle数据库的后台进程 <a class="header-anchor" href="#主要的oracle数据库的后台进程" aria-label="Permalink to &quot;主要的Oracle数据库的后台进程&quot;">​</a></h3><p>以下是 Oracle 实例的主要后台进程：</p><p>● PMON 是 Oracle 数据库中最活跃的一个进程，是调节所有其他进程的进程监视器。PMON 能够清理异常连接的数据库连接，并自动向侦听器进程注册数据库实例。</p><p>● SMON 是执行系统级清理操作的系统监视进程。它有两个主要职责，包括在发生故障的情况下自动恢复实例，例如断电和清理临时文件。</p><p>● DBWn 是数据库编写器。Oracle 在内存中执行每个操作。因为在内存中的处理速度比在磁盘上快。DBWn 进程从内存读取数据并将其写回到磁盘。 一个 Oracle 实例有许多数据库编写器，如：DBW0，DBW1，DBW2等等。</p><p>● CKPT 是检查点进程。 在 Oracle 中，磁盘上的数据称为块，内存中的数据称为缓冲区。 当该块写入缓冲区并更改时，缓冲区变脏，需要将其写入磁盘。CKPT 进程使用检查点信息更新控制和数据文件头，并向脏盘写入脏缓冲区的信号。 请注意，Oracle 12c 允许全面和增量检查点。</p><p><img src="https://y.creammint.cn/articles/images/1527922098399216.png" alt="5"></p><p>● LGWR 是日志写入过程，是可恢复架构的关键。 在数据库中发生的每一个变化都被写出到一个名为 redo 日志文件中用于恢复目的。 而这些变化是由 LGWR 进程编写和记录的。 LGWR 进程首先将更改写入内存，然后将磁盘写入重做日志，然后将其用于恢复。</p><p>● ARCn 是归档进程，它将重做日志的内容复制到归档重做日志文件。存档程序进程可以有多个进程，如：ARC0，ARC1 和 ARC3，允许存档程序写入多个目标，如 D：驱动器，E：驱动器或其他存储。</p><p>● MMON 是收集性能指标的可管理性监控流程。</p><p>● MMAN 是自动管理 Oracle 数据库内存的内存管理器。</p><p>● LREG 是监听器注册过程，它使用 Oracle Net Listener 在数据库实例和调度程序进程上注册信息。</p><hr><p><strong>参考文献</strong></p><ol><li><a href="https://www.w3cschool.cn/oraclejc/oraclejc-21an2qtd.html" target="_blank" rel="noreferrer">Oracle 基础知识_w3cschool</a></li></ol>',73)]))}const O=e(c,[["render",i]]);export{m as __pageData,O as default};
