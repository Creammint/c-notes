# Hexo+Butterfly 魔改日记(一)

## 自定义页脚

:::tip

[猹的魔改日记-小小的重写个页脚](https://noionion.top/46524.html)

[Hexo+butterfly 自定义页脚](https://creammint.github.io/posts/42097/)

:::

## 页面样式调节

这个教程是通过 css 样式调节各个页面透明度、模糊度（亚克力效果）、圆角、边框样式等，看起来会更加舒适。

1. 复制以下代码进去自定义的`custom.css`文件

   ```css
   :root {
     --trans-light: rgba(255, 255, 255, 0.88);
     --trans-dark: rgba(25, 25, 25, 0.88);
     --border-style: 1px solid rgb(169, 169, 169);
     --backdrop-filter: blur(5px) saturate(150%);
   }

   /* 首页文章卡片 */
   #recent-posts > .recent-post-item {
     background: var(--trans-light);
     backdrop-filter: var(--backdrop-filter);
     border-radius: 25px;
     border: var(--border-style);
   }

   /* 首页侧栏卡片 */
   #aside-content .card-widget {
     background: var(--trans-light);
     backdrop-filter: var(--backdrop-filter);
     border-radius: 18px;
     border: var(--border-style);
   }

   /* 文章页、归档页、普通页面 */
   div#post,
   div#page,
   div#archive {
     background: var(--trans-light);
     backdrop-filter: var(--backdrop-filter);
     border: var(--border-style);
     border-radius: 20px;
   }

   /* 导航栏 */
   #page-header.nav-fixed #nav {
     background: rgba(255, 255, 255, 0.75);
     backdrop-filter: var(--backdrop-filter);
   }

   [data-theme='dark'] #page-header.nav-fixed #nav {
     background: rgba(0, 0, 0, 0.7) !important;
   }

   /* 夜间模式遮罩 */
   [data-theme='dark'] #recent-posts > .recent-post-item,
   [data-theme='dark'] #aside-content .card-widget,
   [data-theme='dark'] div#post,
   [data-theme='dark'] div#archive,
   [data-theme='dark'] div#page {
     background: var(--trans-dark);
   }

   /* 夜间模式页脚页头遮罩透明 */
   [data-theme='dark'] #footer::before {
     background: transparent !important;
   }
   [data-theme='dark'] #page-header::before {
     background: transparent !important;
   }

   /* 阅读模式 */
   .read-mode #aside-content .card-widget {
     background: rgba(158, 204, 171, 0.5) !important;
   }
   .read-mode div#post {
     background: rgba(158, 204, 171, 0.5) !important;
   }

   /* 夜间模式下的阅读模式 */
   [data-theme='dark'] .read-mode #aside-content .card-widget {
     background: rgba(25, 25, 25, 0.9) !important;
     color: #ffffff;
   }
   [data-theme='dark'] .read-mode div#post {
     background: rgba(25, 25, 25, 0.9) !important;
     color: #ffffff;
   }
   ```

2. 参数说明：

   - `--trans-light`：白天模式带透明度的背景色，如`rgba(255, 255, 255, 0.88)`底色是纯白色，其中 0.88 就透明度，在 0-1 之间调节，值越大越不透明；
   - `--trans-dark`: 夜间模式带透明度的背景色，如`rgba(25, 25, 25, 0.88)`底色是柔和黑色，其中 0.88 就透明度，在 0-1 之间调节，值越大越不透明;
   - `--border-style`: 边框样式，`1px solid rgb(169, 169, 169)`指宽度为 1px 的灰色实体边框;
   - `--backdrop-filter`: 背景过滤器，如`blur(5px) saturate(150%)`表示饱和度为 150%的、高斯模糊半径为 5px 的过滤器，这是亚克力效果的一种实现方法;
   - 大家可以根据自己喜好进行调节，不用拘泥于我的样式！

3. 记住在主题配置文件`_config.butterfly.yml`的`inject`配置项中引入该 css 文件：

   ```yml
   inject:
     head:
   +    - <link rel="stylesheet" href="/css/custom.css">
   ```

4. 重启项目即可看见效果：

   ```bash
   hexo cl; hexo s
   ```

## 引入 iconfont 自定义图标

### 前置插件

Hexo 和 Butterfly 主题本身是不带字数统计功能的，所以需要前置安装插件[hexo-wordcount](https://github.com/willin/hexo-wordcount)

```bash
npm i --save hexo-wordcount
```

`/layout/includes/footer.pug`，信息请改成自己的:

```bash
#footer-wrap
  #footer-left
    .footer-title
      span= config.title + '|'
      if theme.footer.owner.enable
        - var now = new Date()
        - var nowYear = now.getFullYear()
      if theme.footer.owner.since && theme.footer.owner.since != nowYear
        span.footer-copyright!= `&copy;${theme.footer.owner.since} - ${nowYear} By ${config.author}`
      else
        span.footer-copyright!= `&copy;${nowYear} By ${config.author}`
    .footer-button
      a(title='GitHub' href='https://github.com/Creammint')
        i.fab.fa-github
      a(title='Gitee' href='https://gitee.com/creammint')
        i.iconfont.icon-gitee1
      a(title='知乎' href='https://www.zhihu.com/people/creammint_1')
        i.fab.fa-zhihu
      a(title='CSDN' href='https://blog.csdn.net/t2736416901?type=blog')
        i.iconfont.icon-csdn
      a(title='QQ' href='https://qm.qq.com/cgi-bin/qm/qr?k=xb453AHuxlK_XjrxV0A5rkz2x23N3_Vk&noverify=0')
        i.iconfont.icon-QQ
    .wordcount
    - let allword = totalcount(site)
    span= '小糖已经写了 ' + allword + ' 字，'
    if isNaN(allword)
      - allword= Number(allword.replace('k', ''))
      if allword< 50
        span= "还在努力更新中.. 加油！加油啦！"
      else if allword< 70
        span= "好像写完一本 埃克苏佩里 的 《小王子》 了啊"
      else if allword< 90
        span= "好像写完一本 鲁迅 的 《呐喊》 了啊"
      else if allword< 100
        span= "好像写完一本 林海音 的 《城南旧事》 了啊"
      else if allword< 110
        span= "好像写完一本 马克·吐温 的 《王子与乞丐》了！ 了啊"
      else if allword< 120
        span= "好像写完一本 鲁迅 的 《彷徨》 了啊"
      else if allword< 130
        span= "好像写完一本 余华 的 《活着》 了啊"
      else if allword< 140
        span= "好像写完一本 曹禺 的 《雷雨》 了啊"
      else if allword< 150
        span= "好像写完一本 史铁生 的 《宿命的写作》 了啊"
      else if allword< 160
        span= "好像写完一本 伯内特 的 《秘密花园》 了啊"
      else if allword< 170
        span= "好像写完一本 曹禺 的 《日出》 了啊"
      else if allword< 180
        span= "好像写完一本 马克·吐温 的 《汤姆·索亚历险记》 了啊"
      else if allword< 190
        span= "好像写完一本 沈从文 的 《边城》 了啊"
      else if allword< 200
        span= "好像写完一本 亚米契斯 的 《爱的教育》 了啊"
      else if allword< 210
        span= "好像写完一本 巴金 的 《寒夜》 了啊"
      else if allword< 220
        span= "好像写完一本 东野圭吾 的 《解忧杂货店》 了啊"
      else if allword< 230
        span= "好像写完一本 莫泊桑 的 《一生》 了啊"
      else if allword< 250
        span= "好像写完一本 简·奥斯汀 的 《傲慢与偏见》 了啊"
      else if allword< 280
        span= "好像写完一本 钱钟书 的 《围城》 了啊"
      else if allword< 300
        span= "好像写完一本 张炜 的 《古船》 了啊"
      else if allword< 310
        span= "好像写完一本 茅盾 的 《子夜》 了啊"
      else if allword< 320
        span= "好像写完一本 阿来 的 《尘埃落定》 了啊"
      else if allword< 340
        span= "好像写完一本 艾米莉·勃朗特 的 《呼啸山庄》 了啊"
      else if allword< 350
        span= "好像写完一本 雨果 的 《巴黎圣母院》 了啊"
      else if allword< 360
        span= "好像写完一本 东野圭吾 的 《白夜行》 了啊"
      else
        span= "好像写完一本我国著名的 四大名著 了！！！"
    else
      span= "还在努力更新中... 加油！加油啦！"
  #footer-right
    .footer-totop
      i.fas.fa-chevron-up(onclick='scrollToTop()')
    .footer-info
      p= '使用Hexo框架 | 基于butterfly修改'
      a(title='湘ICP备2024044746号' href='https://beian.miit.gov.cn/') #[img(src='https://cdn.creammint.cn/basicdata_img/icp.png' alt='备案图标' style='height: 16px;margin-right: 3px;filter: grayscale(1);')]湘ICP备2024044746号
    .footer-service
      a(title='腾讯云' href='https://cloud.tencent.com')
        img(alt='腾讯云' src='https://cdn.ichika.cc/typora/202211071552681.png!towebp')
      a(title='51LA' href='https://www.51.la')
        img(alt='51LA' src='https://cdn.ichika.cc/typora/202211071552427.png!towebp')
      a(title='CC BY-NC-SA 4.0' href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh')
        img(alt='CC BY-NC-SA 4.0' src='https://cdn.ichika.cc/typora/202211071552856.png!towebp')
```

创建一个自定义 css `footer.css`

```css
/* 页脚 */
.footer_custom_text a {
  margin: 0 5px;
}

#footer::before {
  content: none;
}

#footer-wrap {
  color: var(--font-color);
  padding: 50px 5% 35px 5%;
  display: flex;
  flex-wrap: wrap;
  background: var(--ichika-footer-bg);
  position: relative;
}

#footer-wrap > div {
  width: 50%;
}

#footer-left {
  text-align: left;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-copyright {
  font-size: 1rem;
  font-weight: normal;
}

#footer-wrap .footer-button {
  display: flex;
  margin: 15px 0;
}

#footer-wrap .footer-button > a {
  font-size: 1.3rem;
  margin-right: 24px;
  transition: 0.2s;
  background: black;
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  color: white;
}

#footer-wrap .footer-button > a:hover {
  background: var(--ichika-color);
  transition: 0.2s;
}

#footer-wrap .footer-button > a i {
  margin: auto;
  line-height: 42px;
}

#footer-wrap .iconfont {
  font-size: 1.3rem;
}

#footer-right {
  text-align: right;
  height: max-content;
  margin-top: auto;
}

#footer-right p,
#footer-right a {
  color: var(--ichika-font-grey);
}

.footer-totop {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.footer-totop i {
  font-size: 2rem;
  animation: footerToTop 1.2s linear infinite;
}

.footer-info p {
  font-size: 14px;
  margin: 0;
}

.footer-info a {
  margin-left: 20px;
  transition: 0.2s;
}

.footer-info a:hover {
  color: var(--ichika-color) !important;
  transition: 0.2s;
}

.footer-info a:hover img {
  filter: none !important;
  transition: 0.2s;
}

.footer-service img {
  height: 20px;
  filter: grayscale(1);
  margin-left: 20px;
  margin-top: 10px;
  transition: 0.2s;
}

.footer-service img:hover {
  filter: none;
  transition: 0.2s;
}

@keyframes footerToTop {
  0% {
    transform: translateY(0);
  }

  60% {
    transform: translateY(-25%);
  }

  100% {
    transform: translateY(0);
  }
}

@media screen and (max-width: 768px) {
  #footer-wrap > div {
    width: 100%;
    text-align: center;
  }

  #footer-wrap .footer-button > a {
    margin: 0 auto;
  }
}
```

创建一个自定义 js `footer.js`

```js
function scrollToTop() {
  btf.scrollToDest(0, 500)
}
```

在`Butterfly/_config` 中引入

```yml
inject:
  head:
    - <link rel="stylesheet" href="/css/footer.css" media="defer" onload="this.media='all'"> #自定义页脚
  bottom:
    - <link rel="stylesheet" href="/js/footer.js"> #自定义页脚
```

## 一图流

在`[BlogRoot]\source`文件夹下新建一个文件夹`css`，该文件夹用于存放自定义的`css`样式，再新建一个名为`custom.css`，在里面写入以下代码：

```css
/* 页脚与头图透明 */
#footer {
  background: transparent !important;
}
#page-header {
  background: transparent !important;
}

/* 白天模式遮罩透明 */
#footer::before {
  background: transparent !important;
}
#page-header::before {
  background: transparent !important;
}

/* 夜间模式遮罩透明 */
[data-theme='dark'] #footer::before {
  background: transparent !important;
}
[data-theme='dark'] #page-header::before {
  background: transparent !important;
}
```

## 页面毛玻璃效果

:::tip

[Butterfly 主题美化-页面毛玻璃效果\_毛玻璃搜索页](https://blog.csdn.net/qq_38870718/article/details/122555421)

:::

## 文章双栏布局

安装插件

```bash
npm i hexo-butterfly-article-double-row --save

# 或者

cnpm i hexo-butterfly-article-double-row --save
```

修改站点配置

修改站点根目录下的配置文件 `_config.yml`

```yml
butterfly_article_double_row:
  enable: true
```

## 文章三栏布局

:::tip

[双栏布局首页卡片魔改教程 | Akilar の糖果屋](https://akilar.top/posts/d6b69c49/)

:::

## 右边按钮阅读进度（Leonus）

1. 修改文件`[BlogRoot]\themes\butterfly\layout\includes\rightside.pug`，在最下面插入如下两行代码（注意去掉前面的+号，别傻呼呼的直接复制粘贴）

```bash
button#go-up(type="button" title=_p("rightside.back_to_top"))
  i.fas.fa-arrow-up
+  span#percent 0
+    span %
```

2. 新建文件`[BlogRoot]\source\js\readPercent.js`，在自定义 js 文件中加入如下代码：

```js
window.onscroll = percent // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round((a / b) * 100), // 计算百分比
    up = document.querySelector('#go-up') // 获取按钮

  if (result <= 95) {
    up.childNodes[0].style.display = 'none'
    up.childNodes[1].style.display = 'block'
    up.childNodes[1].innerHTML = result
  } else {
    up.childNodes[1].style.display = 'none'
    up.childNodes[0].style.display = 'block'
  }
}
```

3. 创建 css 文件`[BlogRoot]\source\css\readPercent.css`写入如下代码：

```css
/* 返回顶部 */

button#go-up #percent {
  display: none;
  font-weight: bold;
  font-size: 15px !important;
}

button#go-up span {
  font-size: 12px !important;
  margin-right: -1px;
}

/* 鼠标滑动到按钮上时显示返回顶部图标 */
button#go-up:hover i {
  display: block !important;
}

button#go-up:hover #percent {
  display: none !important;
}
```

4. 引入 js 文件与 css 文件

```yml
inject:
  head:
+    - <link rel="stylesheet" href="/css/readPercent.css">
  bottom:
+    - <script defer data-pjax src="/js/readPercent.js"></script>
```

5. 重启项目即可看到效果

```bash
hexo cl
hexo g
hexo s
```

## 直达底部按钮

在`[BlogRoot]\themes\butterfly\layout\includes\rightside.pug`做以下修改:

```bash
button#go-up(type="button" title=_p("rightside.back_to_top"))
  i.fas.fa-arrow-up

+ button#go-down(type="button" title="直达底部" onclick="btf.scrollToDest(document.body.scrollHeight, 500)")
+   i.fas.fa-arrow-down
```

## 添加 fps 显示

1. 新建文件`[BlogRoot]\source\js\fps.js`并写入如下代码：

```js
if (
  window.localStorage.getItem('fpson') == undefined ||
  window.localStorage.getItem('fpson') == '1'
) {
  var rAF = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()
  var frame = 0
  var allFrameCount = 0
  var lastTime = Date.now()
  var lastFameTime = Date.now()
  var loop = function () {
    var now = Date.now()
    var fs = now - lastFameTime
    var fps = Math.round(1000 / fs)

    lastFameTime = now
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++
    frame++

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime))
      if (fps <= 5) {
        var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`
      } else if (fps <= 15) {
        var kd = `<span style="color:red">电竞级帧率😖</span>`
      } else if (fps <= 25) {
        var kd = `<span style="color:orange">有点难受😨</span>`
      } else if (fps < 35) {
        var kd = `<span style="color:#9338e6">不太流畅🙄</span>`
      } else if (fps <= 45) {
        var kd = `<span style="color:#08b7e4">还不错哦😁</span>`
      } else {
        var kd = `<span style="color:#39c5bb">十分流畅🤣</span>`
      }
      document.getElementById('fps').innerHTML = `FPS:${fps} ${kd}`
      frame = 0
      lastTime = now
    }

    rAF(loop)
  }

  loop()
} else {
  document.getElementById('fps').style = 'display:none!important'
}
```

2. 在自定义样式文件`custom.css`中加入如下代码，我这里让这块东西在左下角，你可以自己指定位置，其中`backdrop-filter`过滤器也可以自己指定，也可以不要：

```css
/* 帧率检测 */
#fps {
  position: fixed;
  /* 指定位置 */
  left: 10px;
  bottom: 10px;
  z-index: 1919810;
}
[data-theme='light'] #fps {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: var(--backdrop-filter);
  padding: 4px;
  border-radius: 4px;
}
[data-theme='dark'] #fps {
  background-color: rgba(0, 0, 0, 0.72);
  backdrop-filter: var(--backdrop-filter);
  padding: 4px;
  border-radius: 4px;
}
```

3. 在主题配置文件`_config.butterfly.yml`文件中加入以下代码：

```yml
inject:
  head:
+    - <span id="fps"></span> # 帧率检测
  bottom:
+    - <script async src="/js/fps.js"></script> # 帧率检测
```

## 博客宽屏适配

[博客魔改教程总结(四) | Fomalhaut🥝](https://www.fomal.cc/posts/d739261b.html#博客宽屏适配（自用）)

1. 在`custom.css`中加入以下样式：

   ```css
   复制成功/* 全局宽度 */
   .layout {
     max-width: 1400px;
   }

   /* 侧边卡片栏宽度 */
   .aside-content {
     max-width: 318px;
     min-width: 300px;
   }

   /* 平板尺寸自适应(不启用侧边栏宽度限制) */
   @media screen and (max-width: 900px) {
     .aside-content {
       max-width: none !important;
       padding: 0 5px 0 5px;
     }
   }
   ```

2. 不想再非首页的地方显示侧边栏，那就需要给非首页的页面加上标记，`修改 [BlogRoot]\themes\butterfly\layout\includes\layout.pug`为以下内容：

   ```bash
    - var htmlClassHideAside = theme.aside.enable && theme.aside.hide ? 'hide-aside' : ''
    - page.aside = is_archive() ? theme.aside.display.archive: is_category() ? theme.aside.display.category : is_tag() ? theme.aside.display.tag : page.aside
    - var hideAside = !theme.aside.enable || page.aside === false ? 'hide-aside' : ''
   - - var pageType = is_post() ? 'post' : 'page'
   + - var pageType = is_home() ? 'page home' : is_post() ? 'post' : 'page'

   doctype html
   html(lang=config.language data-theme=theme.display_mode class=htmlClassHideAside)
     ...
   ```

   或者直接用改好的 pug（4.3.1 可以食用）

   ```js
   - var htmlClassHideAside = theme.aside.enable && theme.aside.hide ? 'hide-aside' : ''
   - page.aside = is_archive() ? theme.aside.display.archive: is_category() ? theme.aside.display.category : is_tag() ? theme.aside.display.tag : page.aside
   - var hideAside = !theme.aside.enable || page.aside === false ? 'hide-aside' : ''
   - var pageType = is_home() ? 'page home' : is_post() ? 'post' : 'page'

   doctype html
   html(lang=config.language data-theme=theme.display_mode class=htmlClassHideAside)
     head
       include ./head.pug
     body
       if theme.preloader.enable
         !=partial('includes/loading/loading', {}, {cache: true})

       - var DefaultBg = page.defaultbg ? page.defaultbg : theme.background.default
       - var DDMBg = theme.background.darkmode ? theme.background.darkmode : DefaultBg
       - var DarkmodeBg = page.darkmodebg ? page.darkmodebg : DDMBg
       if theme.background
         if page.background
           #web_bg(style=`background:`+ page.background + `;background-attachment: local;background-position: center;background-size: cover;background-repeat: no-repeat;`)
         else
           #web_bg

           if page.defaultbg || page.darkmodebg
             style.
               #web_bg{
                 background: #{DefaultBg} !important;
                 background-attachment: local!important;
                 background-position: center!important;
                 background-size: cover!important;
                 background-repeat: no-repeat!important;
               }
               [data-theme="dark"]
                 #web_bg{
                   background: #{DarkmodeBg} !important;
                   background-attachment: local!important;
                   background-position: center!important;
                   background-size: cover!important;
                   background-repeat: no-repeat!important;
                 }

       !=partial('includes/sidebar', {}, {cache: true})

       if page.type !== '404'
         #body-wrap(class=pageType)
           include ./header/index.pug

           main#content-inner.layout(class=hideAside)
             if body
               div!= body
             else
               block content
               if theme.aside.enable && page.aside !== false
                 include widget/index.pug

           - var footerBg = theme.footer_bg
           if !is_post()
             if (footerBg === true)
               - var footer_bg = 'background-color: transparent;'
             else
               - var footer_bg = 'background-color: transparent;'
           else
             - var footer_bg = 'background-color: transparent;'



           footer#footer(style=footer_bg)
             !=partial('includes/footer', {}, {cache: true})

       else
         include ./404.pug

       include ./rightside.pug
       !=partial('includes/third-party/search/index', {}, {cache: true})
       !=partial('includes/rightmenu',{}, {cache:true})
       include ./additional-js.pug
   ```

   现在主页的 class 就变成`page home`了，我们再在`custom.css`加入如下 css，主题就能智能区分主页和分页了，可以自动选择卡片显示：

   ```css
   复制成功/* 除了首页以外其他页面隐藏卡片，并采用宽屏显示 */
   #archive,
   #page,
   #category,
   #tag {
     width: 100%;
   }
   .page:not(.page.home) .aside-content {
     display: none;
   }
   ```

3. 重启项目即可看到变更：

   ```bash
   hexo cl; hexo s
   ```
