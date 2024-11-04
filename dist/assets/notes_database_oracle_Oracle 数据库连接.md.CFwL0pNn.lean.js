import{_ as e,c as s,a8 as l,o as p}from"./chunks/framework.Tg-9kKsk.js";const u=JSON.parse('{"title":"Oracle 数据库连接","description":"","frontmatter":{"title":"Oracle 数据库连接","createTime":"2024/09/20 18:06:41","permalink":"/database/oracle/o9npqz36/"},"headers":[],"relativePath":"notes/database/oracle/Oracle 数据库连接.md","filePath":"notes/database/oracle/Oracle 数据库连接.md","lastUpdated":1729331653000}'),n={name:"notes/database/oracle/Oracle 数据库连接.md"};function i(r,a,t,c,o,d){return p(),s("div",null,a[0]||(a[0]=[l(`<h1 id="oracle-数据库连接" tabindex="-1">Oracle 数据库连接 <a class="header-anchor" href="#oracle-数据库连接" aria-label="Permalink to &quot;Oracle 数据库连接&quot;">​</a></h1><h2 id="使用sql-plus连接oracle数据库服务器" tabindex="-1">使用SQL * Plus连接Oracle数据库服务器 <a class="header-anchor" href="#使用sql-plus连接oracle数据库服务器" aria-label="Permalink to &quot;使用SQL * Plus连接Oracle数据库服务器&quot;">​</a></h2><p>SQL * Plus 是交互式查询工具，我们在安装 Oracle 数据库服务器或客户端时会自动安装。SQL * Plus 有一个命令行界面，允许您连接到 Oracle 数据库服务器并交互执行语句。</p><blockquote><p>**注意：**如果有使用过 MySQL 或 PostgreSQL，SQL * plus 与 MySQL 中的 mysql 程序或 PostgreSQL 中的 psql 类似。</p></blockquote><p>我们可以在终端输入 sqlplu s命令，以此来在 Linux 或 Window 中启动 SQL * Plus。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sqlplus</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以 Windows 10 系统为例，在 Windows 的“开始”菜单的“程序”文件夹中找到 SQL * Plus 程序，如下所示：</p><p><img src="https://y.creammint.cn/articles/images/1528080107802185.png" alt="1"></p><p>启动 SQLPlus 图标时，会提示输入用户名和密码。输入在<a href="https://www.w3cschool.cn/oraclejc/oraclejc-vuqx2qqu.html" target="_blank" rel="noreferrer">安装Oracle数据库服务器</a>期间设置的用户名和密码。如果不知道要使用哪个帐户，请询问安装数据库的管理员。</p><p>假设要使用 sys 帐户连接到本地 Oracle 数据库服务器，请输入以下信息：</p><p><img src="https://y.creammint.cn/articles/images/1528080173925055.png" alt="2"></p><p>按下 Enter 后，您应该看到一条消息，后面跟着<code>SQL&gt;</code>命令行，如下所示：</p><p><img src="https://y.creammint.cn/articles/images/1528080187175813.png" alt="3"></p><p>如上图所示，您已成功连接到 Oracle 数据库服务器。</p><p>在 Oracle 12c 中，当连接到数据库服务器时，默认数据库是名为 CDB$ROOT 的 ROOT 容器数据库。 要显示数据库名称，请使用 SHOW 命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SQL&gt; SHOW con_name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CON_NAME</span></span>
<span class="line"><span>------------------------------</span></span>
<span class="line"><span>CDB$ROOT</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果要切换到可插拔数据库，请使用<code>ALTER SESSION</code>语句将当前数据库设置为可插入数据库，例如：<code>PDBORDL</code>，如下所示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SQL&gt; ALTER SESSION SET CONTAINER = PDBORDL;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Session altered.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>现在，您连接到 PDBORCL 数据库。</p><p>要断开用户与 Oracle 数据库服务器的连接，请使用 EXIT 命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SQL&gt; EXIT</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>要将<code>OT</code>用户连接到位于<code>PDBORCL</code>可插拔数据库中的示例数据库，请输入以下命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sqlplus OT@PDBORCL</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>SQL Plus 会提示输入 OT 用户的密码。输入密码，您将连接到 Oracle 数据库服务器中的 PDBORCL* 数据库。</p><h2 id="使用-sql-developer-连接到-oracle-数据库服务器" tabindex="-1">使用 SQL Developer 连接到 Oracle 数据库服务器 <a class="header-anchor" href="#使用-sql-developer-连接到-oracle-数据库服务器" aria-label="Permalink to &quot;使用 SQL Developer 连接到 Oracle 数据库服务器&quot;">​</a></h2><p>SQL Developer 是一个用于在 Oracle 数据库中使用 SQL 的免费 GUI 工具。与 SQL * Plus 程序一样，SQL Developer 在安装 Oracle 数据库服务器或客户端时自动安装。</p><p>要启动 SQL Developer 程序，请单击开始菜单中Oracle程序文件夹中的SQL Developer图标，如下图所示：</p><p>安装 Oracle 11g 会自带一个叫做 SQL Developer 的工具，它的功能非常强大，以前一直不知道，还用着 plsqldev 和 navicat 来连接数据库，其实这个工具拥有前面两个软件的所有功能（如果说的太绝对请指正）。首先我们打开 SQL Developer，如下图所示：</p><p><img src="https://y.creammint.cn/articles/images/202009091035475685.gif" alt="img"></p><p>SQL Developer 不能用于创建 Oracle 数据库，只能用来连接已创建的数据库，我们一般都是使用 Database Configuration Assistant（简称 DBCA）来创建数据库，如下图所示：</p><p><img src="https://y.creammint.cn/articles/images/202009091035489875.gif" alt="img"></p><p>打开 DBCA 以后按照向导来创建数据库，非常简单，这里不再赘述。</p><p>在 SQL Developer 中我们新建一个连接，点击左上角的“绿色加号”如下图所示：</p><p><img src="https://y.creammint.cn/articles/images/202009091035484915.gif" alt="img"></p><p>创建数据库连接，如下图所示：</p><p><img src="https://y.creammint.cn/articles/images/1658711982898745.png" alt="202009091035497155"></p><p>填写完配置以后可以点击“Test”来测试数据库连接是否正确，如上图所示，左下角有“Status：Success”则表明数据库连接正确。</p><h2 id="创建新用户" tabindex="-1">创建新用户 <a class="header-anchor" href="#创建新用户" aria-label="Permalink to &quot;创建新用户&quot;">​</a></h2><p><img src="https://y.creammint.cn/articles/images/202009091035496995.gif" alt="img"></p><p>接着为 ORCL 这个数据库创建新用户，如下图所示</p><p><img src="https://y.creammint.cn/articles/images/202009091035505348.gif" alt="img"></p><p>填写用户名和密码，以及为用户指定表空间。如下图所示：</p><p><img src="https://y.creammint.cn/articles/images/202009091035505811.gif" alt="img"></p><p>为用户分配权限</p><p><img src="https://y.creammint.cn/articles/images/202009091035515415.gif" alt="img"></p><p>查看创建用户和分配权限所对应的 sql 代码，如下图所示。</p><p><img src="https://y.creammint.cn/articles/images/202009091035511268.gif" alt="img"></p><h2 id="使用新用户创建数据库连接" tabindex="-1">使用新用户创建数据库连接 <a class="header-anchor" href="#使用新用户创建数据库连接" aria-label="Permalink to &quot;使用新用户创建数据库连接&quot;">​</a></h2><p>使用新账户创建数据库连接的方法和第一步类似，这里不再赘述。</p><h2 id="代码连接" tabindex="-1">代码连接 <a class="header-anchor" href="#代码连接" aria-label="Permalink to &quot;代码连接&quot;">​</a></h2><ol><li>先写好驱动字符串，连接字符串，用户名和密码字符串。</li></ol><p>localhost 是本地地址</p><p>1521 是Oracle 默认端口</p><p>orcl 是Oracle 默认名称</p><p>uname 和 pwd 是 Oracle的用户名和密码</p><ol start="2"><li>加载驱动 Class.forName(driverStr);</li><li>获取连接 conn=DriverManager.getConnection(orclStr,uname,pwd);</li><li>然后就可以进行数据库的操作。</li><li>关闭数据库，一定要记住反序关闭，先内后外。</li><li>这样就连接到数据库并成功对数据库进行了一次操作。</li></ol>`,56)]))}const h=e(n,[["render",i]]);export{u as __pageData,h as default};
