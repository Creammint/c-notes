import{_ as i,c as a,a8 as n,o as l}from"./chunks/framework.Tg-9kKsk.js";const g=JSON.parse('{"title":"Oracle 查看处理死锁","description":"","frontmatter":{"title":"Oracle 查看处理死锁","createTime":"2024/10/10 11:11:00","permalink":"/database/oracle/1ygs65e7/"},"headers":[],"relativePath":"notes/database/oracle/Oracle 查看处理死锁.md","filePath":"notes/database/oracle/Oracle 查看处理死锁.md","lastUpdated":1729926078000}'),h={name:"notes/database/oracle/Oracle 查看处理死锁.md"};function p(k,s,t,e,r,d){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="oracle-查看处理死锁" tabindex="-1">Oracle 查看处理死锁 <a class="header-anchor" href="#oracle-查看处理死锁" aria-label="Permalink to &quot;Oracle 查看处理死锁&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><h3 id="什么是表的死锁以及死锁的产生原因" tabindex="-1">什么是表的死锁以及死锁的产生原因 <a class="header-anchor" href="#什么是表的死锁以及死锁的产生原因" aria-label="Permalink to &quot;什么是表的死锁以及死锁的产生原因&quot;">​</a></h3><p>表的死锁是指在 Oracle 数据库中，两个或多个事务相互等待对方持有的锁资源，导致它们无法继续执行下去，从而形成死锁现象。</p><p>死锁的产生原因通常是因为事务在操作数据时，对数据进行了锁定，但是由于事务执行顺序或者并发操作的原因导致了互相等待对方持有的锁资源，从而形成死锁。</p><h3 id="产生死锁的案例" tabindex="-1">产生死锁的案例 <a class="header-anchor" href="#产生死锁的案例" aria-label="Permalink to &quot;产生死锁的案例&quot;">​</a></h3><p>具体业务场景及代码示例： 假设有两个用户同时对同一张表进行更新操作，用户 A 执行 UPDATE 语句锁住了表中的某些行，而用户 B 也执行 UPDATE 语句锁住了表中的另一些行，此时就可能发生死锁。</p><p>代码示例： 用户 A 的更新操作：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BEGIN</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> table_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> column1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;value1&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> condition;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  COMMIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">END</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>用户 B 的更新操作：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BEGIN</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> table_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> column2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;value2&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> condition;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  COMMIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">END</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在这种情况下，用户 A 和用户 B 可能会出现死锁。为了避免死锁，可以考虑修改事务的执行顺序，或者使用数据库的锁机制和事务隔离级别来避免死锁的发生。</p><h2 id="查看死锁" tabindex="-1">查看死锁 <a class="header-anchor" href="#查看死锁" aria-label="Permalink to &quot;查看死锁&quot;">​</a></h2><p>1、下面的语句用来查询哪些对象被锁：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">object_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">session_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">serial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">program</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">machine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lockwait</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> all_objects a,v$locked_object b,v$</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">object_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">object_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">session_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>2、查询锁表原因以及 sid、serial#</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> l</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">session_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">serial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">l</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">locked_mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">l</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">oracle_username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">l</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">os_user_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">machine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">terminal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sql_text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">action</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> v$sqlarea a, v$</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s, v$locked_object l</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> l</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">session_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prev_sql_addr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">address</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">order by</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">serial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>3、用下面的语句用来杀死引起死锁的进程：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--sid,serial对应2步骤的值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">alter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> system</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> kill</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> session</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;sid,serial#&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h2><p><strong>ORA-00054: 资源正忙，锁表”以及“ORA-00031：标记要终止的会话”的解决方法</strong></p><h3 id="现象描述" tabindex="-1">现象描述 <a class="header-anchor" href="#现象描述" aria-label="Permalink to &quot;现象描述&quot;">​</a></h3><p>在 ORACLE 数据处理过程中，当某个 PL/SQL developer 正在运行创建一个临时表对大的数据进行暂存处理时，由于处理速度很慢，这时突然做了中断处理，甚至于直接从“任务管理器”中关掉 PL/SQL developer。再次对该数据临时表进行处理时，会发现无论是删除、更新、查询等操作，都处于一直的执行等待状态。这种情况，很有可能是表已经被锁住了。但是当查询到死锁会话，采用<code>alter system kill session&#39;sid,serial#&#39;;</code>来处理时，却提示报错，无法杀掉线程，只能到操作系统级杀掉线程了。下面就对这种情况的处理过程进行详细的说明。</p><p><img src="https://y.creammint.cn/articles/images/1875512-20220218155418508-1041493563.png" alt="img"></p><h3 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-label="Permalink to &quot;解决方法&quot;">​</a></h3><ol><li>可以通过下列语句查询：</li></ol><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">spid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">serial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">username</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> v$process a,v$</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">addr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">paddr</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;KILLED&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://y.creammint.cn/articles/images/1875512-20220218161428300-662981761.png" alt="img"></p><ol><li>如果利用上面的命令杀死一个进程后，进程状态被置为&quot;killed&quot;，但是锁定的资源很长时间没有被释放，那么可以在 OS 级再杀死相应的进程（线程），首先执行下面的语句获得进程（线程）号：</li></ol><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">spid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">osuser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">program</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> v$</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a,v$process b</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">paddr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">addr</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">176</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     --176就是上面的sid</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://y.creammint.cn/articles/images/1875512-20220218161605390-1686124764.png" alt="img"></p><ol><li>在 OS 上杀死这个进程（线程）</li></ol><p>1)、在 unix/linux 上，用 root 身份执行命令：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">kill</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9532</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9532</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 即第4步查询出的spid）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2)、在 windows（unix 也适用）用 orakill 杀死线程，orakill 是 oracle 提供的一个可执行命令，语法为：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">orakill </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">sid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> thread</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中：</p><p>sid：表示要杀死的进程属于的实例名</p><p>thread：是要杀掉的线程号，即第 3 步查询出的 spid。</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">例：C:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">orakill ACVS </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9532</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://y.creammint.cn/articles/images/1875512-20220218161852049-245548292.png" alt="img"></p><p><strong>注意</strong>：这里要注意的是 kill OS 进程是在服务端操作，而不是你程序所在客户机。</p><hr><p><strong>参考文献</strong>：</p><p><a href="https://blog.csdn.net/qq_46645079/article/details/135219181" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_46645079/article/details/135219181</a></p><p><a href="https://www.cnblogs.com/String-song/p/15909325.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/String-song/p/15909325.html</a></p>`,46)]))}const y=i(h,[["render",p]]);export{g as __pageData,y as default};
