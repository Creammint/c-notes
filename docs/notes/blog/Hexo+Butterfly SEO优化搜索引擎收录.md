# Hexo+Butterfly SEO 优化搜索引擎收录

## 前言

我们必须把我们的网站推送到搜索引擎那， 否则别人除了输入我们的域名或者搜索文章，是没法发现我们的博文。

## 查看是否被收录

使用想要查找的搜索引擎，输入：

```bash
site:你的网站
比如我的：site:bs.creammint.cn
```

## 永久化 URL 网址链接

> 我们可以发现 hexo 默认生成的文章地址路径是 【网站名称／年／月／日／文章名称】。
>
> 这种链接对搜索爬虫是很不友好的，第一它的 url 结构超过了三层，太深了。

安装 `abbrlink` 插件：

```bash
npm install hexo-abbrlink --save
```

关于此插件的详细信息参见它的[官方文档](https://github.com/rozbo/hexo-abbrlink)。作用是将文章的链接转换成数字后字母，即将博客网站的网页转成`.html` 永久链接的格式，有利于搜索引擎的收录。

修改 hexo 根目录下 `config.yml` 中的 `permalink` 的值：

```yml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://qmike.top
permalink: posts/:abbrlink.html
```

在 `config.yml` 最底下添加 `abbrlink config`

```yml
# abbrlink config
abbrlink:
  alg: crc32 # support crc16(default) and crc32
  rep: hex # support dec(default) and hex
# 不用添加其它代码
```

配置完成后，网站的链接应该类似这样：

```bash
https://bs.creammint.cn/posts/77940e6f.html        # 有.html后缀
```

## 站点地图

站点地图即 [sitemap](https://baike.baidu.com/item/sitemap/6241567?fr=aladdin)， 是一个页面，上面放置了网站上需要搜索引擎抓取的所有页面的链接。站点地图可以告诉搜索引擎网站上有哪些可供抓取的网页，以便搜索引擎可以更加智能地抓取网站。所以我们首先需要生成一个站点地图。

安装百度和 Google 的站点地图生成插件：

```bash
npm install hexo-generator-baidu-sitemap --save
npm install hexo-generator-sitemap --save
```

然后来到 hexo 根目录配置文件 `config.yml`，在下面添加：

```yml
# 站点地图
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

然后重新推送到服务器，访问如下 URL:

```bash
https://你的域名/sitemap.xml
https://你的域名/baidusitemap.xml
```

看看网页中有没有出现代码。有的话就成功。

> 注意代码中的域名是否和自己网站的一样，使用 `github page` 部署的网站，可能会出现域名不同的情况，需要之前完成 token 令牌密钥的验证。

给你的 hexo 网站添加蜘蛛协议 `robots.txt`, 把 `robots.txt` 放在你的 hexo 站点的 `source` 文件下即可。

```bash
# hexo robots.txt
User-agent: *
Allow: /

Sitemap: https://qmike.top/sitemap.xml
Sitemap: https://qmike.top/baidusitemap.xml
```

## 百度收录

### 提交网站

通过百度站长平台进行链接提交，增加网站的索引量。先去注册并登录：[百度站长平台](https://ziyuan.baidu.com/?castk=LTE=)

![image-20241107145947648](https://y.creammint.cn/articles/images/image-20241107145947648.png)

需要验证网站，我选择的是 https://，这根据你前面是否添加 SSL 证书来选择。并且我使用的是不带 www 的，看个人。然后到第三步，我使用的 HTML 标签验证。

![image-20241107150723557](https://y.creammint.cn/articles/images/image-20241107150723557.png)

把 `content` 中的字符串复制到主题配置文件`_config.butterfly.yml` 中的 `baidu_site_verification` 。

```yml
# Baidu Webmaster tools verification.
# See: https://ziyuan.baidu.com/site
site_verification:
  # - name: google-site-verification
  #   content: xxxxxx
  - name: baidu-site-verification
    content: # 在这里填上面的字符串
```

> 需要将网站部署完后，再去百度站长平台完成 HTML 标签验证

### 提交链接

百度站长平台的链接提交方式分为自动提交和手动提交两种，此处只讲自动提交，手动提交按照要求操作即可。

**主动推送**最为快速的提交方式，是被百度收录最快的推送方式。主动推送可以通过安装插件实现：

```bash
npm install hexo-baidu-url-submit --save
```

然后在 hexo 根目录配置文件`_config.yml` 中，添加：

```yml
# 主动推送百度，被百度收录
baidu_url_submit:
  count: 10 # 提交最新的10个链接
  host: # 百度站长平台中注册的域名
  token: # 秘钥，百度站长平台 > 普通收录 > 推送接口 > 接口调用地址中token字段
  path: baidu_urls.txt # 文本文档的地址， 新链接会保存在此文本文档里，不用改
```

- host 为自己网站的域名，例如我的为 `https://bs.creammint.cn`

- token 需要打开 “普通收录–> 推送接口” 进行查看

  ![image-20241107154700593](https://y.creammint.cn/articles/images/image-20241107154700593.png)

其次，记得查看 hexo 根目录中`_config.yml` 文件中` url` 的值， 必须包含是百度站长平台注册的域名。

最后，在`_config.yml` 文件中的 `deploy` 加入新的 `type`:

```yml
deploy:
  - type: baidu_url_submitter
```

> 这里是新建一个 type，一定要注意这段代码里面各行的缩进值

其主动推送的实现原理如下：

- 新链接的产生， `hexo generate` 会产生一个文本文件，里面包含最新的链接

- 新链接的提交， `hexo deploy` 会从上述文件中读取链接，提交至百度搜索引擎

  > 不知道对于部署在 Netlify 上的网站有没有用，再查查资料

若要实现手动提交，则把下面的代码粘贴到百度站长平台的 “手动收录” 地址窗口即可：

```bash
https://你的域名/sitemap.xml
https://你的域名/baidusitemap.xml
```

![img](https://y.creammint.cn/articles/images/image-20220904213924274.png)

后续慢慢等收录吧，百度收录比较慢。

## 必应收录

地址：[Bing Webmaster Tools - Bing Webmaster Tools](https://www.bing.com/webmasters/home)

1. 添加自己的网站域名

![image-20250226182548109](https://y.creammint.cn/articles/images/image-20250226182548109.png)

2. 验证网站，选择`html标记`验证

![image-20250226193151791](https://y.creammint.cn/articles/images/image-20250226193151791.png)

hexo 主题中添加

```xml
site_verification:
  - name: msvalidate.01 # 必应收录
    content:   # 你对应的content信息
```

## 谷歌收录

地址：[请求 Google 重新抓取您的网站 | Google 搜索中心](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?utm_source=wmx&utm_medium=deprecation-pane&utm_content=submit-url&hl=zh-cn)

1. 添加自己的域名

![image-20250226194051074](https://y.creammint.cn/articles/images/image-20250226194051074.png)

![image-20250226194145713](https://y.creammint.cn/articles/images/image-20250226194145713.png)

2. 验证网站，选择`html标记`验证

![image-20250226193938274](https://y.creammint.cn/articles/images/image-20250226193938274.png)

```xml
site_verification:
  - name: google-site-verification # 谷歌收录
    content: # 你的content
```

## 360 收录

地址：[360 站长平台-站点管理 (so.com)](https://zhanzhang.so.com/sitetool/site_manage)

1. 添加站点

![image-20250226194856645](https://y.creammint.cn/articles/images/image-20250226194856645.png)

2. 选择代码验证

![image-20250226194930409](https://y.creammint.cn/articles/images/image-20250226194930409.png)

```xml
site_verification:
	- name: 360-site-verification # 360收录
      content: # 你的content
```

## 搜狗收录

地址：[搜狗资源平台\_公平开放的交流平台 (sogou.com)](https://zhanzhang.sogou.com/?forceredirect=1)

1. 添加你的站点域名

![image-20250226195808835](https://y.creammint.cn/articles/images/image-20250226195808835.png)

2. 选择`html标签`验证

![image-20250226200010498](https://y.creammint.cn/articles/images/image-20250226200010498.png)

```xml
site_verification:
  - name: sogou_site_verification # 搜狗收录
    content: # 你的content
```

3. 需要填一大堆信息，如：icp 备案号，身份证、手机号等；

:::tip

参考：[Butterfly 进阶篇（一） - SEO 优化搜索引擎收录 | 悠悠の哉](https://qmike.top/posts/2a1b5a62)

:::
