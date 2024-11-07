import{_ as e,c as o,o as a,aa as s}from"./chunks/framework.BNtO-cOy.js";const k=JSON.parse('{"title":"VitePress 问题修改","description":"","frontmatter":{},"headers":[],"relativePath":"notes/blog/VitePress问题修改.md","filePath":"notes/blog/VitePress问题修改.md","lastUpdated":1730547513000}'),t={name:"notes/blog/VitePress问题修改.md"},n=s('<h1 id="vitepress-问题修改" tabindex="-1">VitePress 问题修改 <a class="header-anchor" href="#vitepress-问题修改" aria-label="Permalink to &quot;VitePress 问题修改&quot;">​</a></h1><h2 id="err-pnpm-outdated-lockfile" tabindex="-1">ERR_PNPM_OUTDATED_LOCKFILE <a class="header-anchor" href="#err-pnpm-outdated-lockfile" aria-label="Permalink to &quot;ERR_PNPM_OUTDATED_LOCKFILE&quot;">​</a></h2><p><strong>问题</strong>：</p><p>ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with &quot;frozen-lockfile&quot; because pnpm-lock.yaml is not up to date with &lt;ROOT&gt;/package.json</p><p><code>pnpm</code> 进行安装时出现 <code>ERR_PNPM_OUTDATED_LOCKFILE</code> 错误，提示 <code>pnpm-lock.yaml</code> 不是最新的，不能与 <code>&lt;ROOT&gt;/package.json</code> 保持同步。这个问题通常发生在 <code>pnpm</code> 的版本升级后，新版本的 <code>pnpm</code> 生成了一个新的 <code>pnpm-lock.yaml</code> 文件，而这个文件与旧版本的 <code>pnpm</code> 不兼容</p><p><strong>处理方案</strong>：</p><p>重新生成 <code>pnpm-lock.yaml</code>：删除现有的 <code>pnpm-lock.yaml</code> 文件和 <code>node_modules</code> 目录，然后重新运行 <code>pnpm install</code> 来生成一个新的 <code>pnpm-lock.yaml</code> 文件。这样可以确保新的锁文件与您当前的 <code>pnpm</code> 版本和 <code>package.json</code> 完全同步；</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>',8),c=[n];function p(d,i,l,r,_,m){return a(),o("div",null,c)}const u=e(t,[["render",p]]);export{k as __pageData,u as default};
