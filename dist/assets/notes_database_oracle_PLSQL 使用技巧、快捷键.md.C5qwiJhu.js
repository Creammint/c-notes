import{_ as a,c as n,a8 as e,o as l}from"./chunks/framework.Tg-9kKsk.js";const d=JSON.parse('{"title":"PLSQL 使用技巧、快捷键","description":"","frontmatter":{"title":"PLSQL 使用技巧、快捷键","createTime":"2024/10/10 10:15:47","permalink":"/database/oracle/xbo010pq/"},"headers":[],"relativePath":"notes/database/oracle/PLSQL 使用技巧、快捷键.md","filePath":"notes/database/oracle/PLSQL 使用技巧、快捷键.md","lastUpdated":1729331653000}'),p={name:"notes/database/oracle/PLSQL 使用技巧、快捷键.md"};function i(t,s,r,c,h,o){return l(),n("div",null,s[0]||(s[0]=[e(`<h1 id="plsql-使用技巧、快捷键" tabindex="-1">PLSQL 使用技巧、快捷键 <a class="header-anchor" href="#plsql-使用技巧、快捷键" aria-label="Permalink to &quot;PLSQL 使用技巧、快捷键&quot;">​</a></h1><h2 id="类sql-plus窗口" tabindex="-1">类SQL PLUS窗口 <a class="header-anchor" href="#类sql-plus窗口" aria-label="Permalink to &quot;类SQL PLUS窗口&quot;">​</a></h2><p>File-&gt;New-&gt;Command Window，这个类似于oracle的客户端工具sql plus，但比它好用多了。</p><h2 id="设置关键字自动大写" tabindex="-1">设置关键字自动大写 <a class="header-anchor" href="#设置关键字自动大写" aria-label="Permalink to &quot;设置关键字自动大写&quot;">​</a></h2><p>Tools-&gt;Preferences-&gt;Editor，将Keyword case选择Uppercase。这样在窗口中输入sql语句时，关键字会自动大写，而其它都是小写。这样阅读代码比较容易，且保持良好得编码风格，同理，在Tools-&gt;Preferences-&gt;Code Assistant(助手)里可以设置代码提示延迟时间、输入几个字符时提示、数据库对象的大写、小写，首字母大写等；</p><h2 id="查看执行计划" tabindex="-1">查看执行计划 <a class="header-anchor" href="#查看执行计划" aria-label="Permalink to &quot;查看执行计划&quot;">​</a></h2><p>选中需要分析的SQL语句，然后点击工具栏的Explain plan按钮(即执行计划)，或者直接按F5；这个主要用于分析SQL语句执行效率，分析表的结构，便于为sql调优提供直观依据；</p><h2 id="自动替换" tabindex="-1">自动替换 <a class="header-anchor" href="#自动替换" aria-label="Permalink to &quot;自动替换&quot;">​</a></h2><p>快捷输入SQL语句，例如输入s，按下空格，自动替换成SELECT；再例如，输入sf，按下空格，自动替换成SELECT * FROM，非常方便，节省了大量的时间去编写重复的SQL语句。</p><p><strong>设置方法</strong>：</p><p>菜单<code>Tools–&gt;Preferences–&gt;Editor–&gt;AutoReplace(自动替换)–&gt;Edit</code></p><ol><li>建立一个文本文件shortcuts.txt，并写入如下内容： s=SELECT 复制代码另存到PL/SQL Developer的安装路径下的~/PlugIns目录下</li><li><code>Tools–&gt;Preferences–&gt;User Interface–&gt;Editor–&gt;AutoReplace</code>，选中Enable复选框，然后浏览文件选中之前创建的shortcuts.txt，点击Apply。</li><li>重启PL/SQL Developer，在sql窗口中输入s+空格，sc+空格做测试。 注意：shortcuts.txt不可删除掉，否则快捷键无法用</li></ol><p>下面定义了一些规则作为参考：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>i=INSERT</span></span>
<span class="line"><span>u=UPDATE</span></span>
<span class="line"><span>s=SELECT</span></span>
<span class="line"><span>f=FROM</span></span>
<span class="line"><span>w=WHERE</span></span>
<span class="line"><span>o=ORDER BY</span></span>
<span class="line"><span>d=DELETE</span></span>
<span class="line"><span>df=DELETE FROM</span></span>
<span class="line"><span>sf=SELECT * FROM</span></span>
<span class="line"><span>sc=SELECT COUNT(*) FROM</span></span>
<span class="line"><span>sfu=SELECT * FROM FOR UPDATE</span></span>
<span class="line"><span>cor=CREATE OR REPLACE</span></span>
<span class="line"><span>p=PROCEDURE</span></span>
<span class="line"><span>fn=FUNCTION</span></span>
<span class="line"><span>t=TIGGER</span></span>
<span class="line"><span>v=VIEW</span></span>
<span class="line"><span>sso=SET serveroutput ON;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="设置快捷键" tabindex="-1">设置快捷键 <a class="header-anchor" href="#设置快捷键" aria-label="Permalink to &quot;设置快捷键&quot;">​</a></h2><p><strong>设置方法：菜单Tools–&gt;Preferences–&gt;用户界面–&gt;键配置</strong></p><p>新建sql窗口：ctrl+shift+s</p><p>新建命令窗口：ctrl+shift+c</p><p>新建测试窗口：ctrl+shift+t PL/SQL Developer</p><p>美化器：ctrl+shift+f</p><p>重做：ctrl+shift+z</p><p>撤销：ctrl+z</p><p>清除：ctrl+d(慎用，不可恢复，俺是禁用哦O(∩_∩)O~)</p><p>选中所有：ctrl+a</p><p>缩进：tab</p><p>取消缩进：shift+tab</p><p>大写：ctrl+shift+x</p><p>小写：ctrl+shift+y</p><p>注释：ctrl+h</p><p>取消注释：ctrl+m</p><p>查找：ctrl+f</p><p>显示表结构：ctrl+鼠标悬停在表名上</p><p>模板列表：shift+alt+r</p><p>窗口列表：ctrl+w</p><h2 id="执行单条sql语句" tabindex="-1">执行单条SQL语句 <a class="header-anchor" href="#执行单条sql语句" aria-label="Permalink to &quot;执行单条SQL语句&quot;">​</a></h2><p>按F8键</p><h2 id="tns-names" tabindex="-1">TNS Names <a class="header-anchor" href="#tns-names" aria-label="Permalink to &quot;TNS Names&quot;">​</a></h2><p>菜单Help-&gt;Support Info(支持信息)-&gt;TNS Names，可以查看Oracle的tnsnames.ora;</p><h2 id="调试存储过程" tabindex="-1">调试存储过程 <a class="header-anchor" href="#调试存储过程" aria-label="Permalink to &quot;调试存储过程&quot;">​</a></h2><p>在使用PL/SQL Developer操作Oracle时，有时候调用某些存储过程，或者调试存储过程； 调用存储过程的方法：</p><ol><li><p>首先，在PL/SQL Developer左边的Browser中选择Procedures，查找需要调用的存储过程；</p></li><li><p>然后，选中调试的存储过程，点击右键，选择Test，在弹出来的Test scrīpt窗口中，对于定义为in类型的参数，需要给该参数的Value输入值；最后点击上面的条数按钮：Start debugger或者按F9；</p></li><li><p>最后点击：RUN 或者Ctrl+R 。</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">调试快捷键</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">切换断点：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">b</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">开始：f9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">运行：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">r</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">单步进入：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">单步跳过：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">o</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">单步退出：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">运行到异常：ctrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plsql菜单或者工具条上的部分调试功能</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Run（Ctrl＋R）全速运行，到断点停下；</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Step </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">into</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（Ctrl＋N）执行一步，如果是调用过程，进入子过程；</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Step </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">over</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（Ctrl＋O）执行一步，无论什么语句；</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Step </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（Ctrl＋T）执行完过程，直到从过程中退出到上一级；</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li></ol><h2 id="登录后默认自动选中my-objects" tabindex="-1">登录后默认自动选中My Objects <a class="header-anchor" href="#登录后默认自动选中my-objects" aria-label="Permalink to &quot;登录后默认自动选中My Objects&quot;">​</a></h2><p>默认情况下，PLSQL Developer登录后，Brower里会选择All objects，如果你登录的用户是dba，要展开tables目录，正常情况都需要Wait几秒钟，而选择My Objects后响应速率则是以毫秒计算的。</p><p>设置方法： Tools菜单–&gt;Brower Filters，会打开Brower Folders的定单窗口，把“My Objects”设为默认即可。 Tools菜单–&gt;Brower Folders中把你经常点的几个目录（比如：Tables Views Seq Functions Procedures）移得靠上一点，并加上颜色区分，这样你的平均寻表时间会大大缩短，试试看。</p><p>优先级，从左往右 Tables–&gt;Tablespaces–&gt;Procedures–&gt;Users–&gt;Roles</p><hr><p><strong>参考文献</strong></p><p><a href="https://www.cnblogs.com/linjiqin/p/3152538.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/linjiqin/p/3152538.html</a></p>`,48)]))}const b=a(p,[["render",i]]);export{d as __pageData,b as default};
