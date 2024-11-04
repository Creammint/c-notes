# Hexo+Butterfly 魔改日记(一)

## 自定义页脚

:::tip

[猹的魔改日记-小小的重写个页脚](https://noionion.top/46524.html)

[Hexo+butterfly 自定义页脚](https://creammint.github.io/posts/42097/)

:::

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
