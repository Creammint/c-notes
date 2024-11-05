# Hexo+Butterfly 主题修改

> [Butterfly 主题安装文档](https://creammint.github.io/posts/14519/#post-comment)

## 本地搜索

**1、安装依赖**

前往博客根目录，打开 cmd 命令窗口执行`npm install hexo-generator-search --save`。

```bash
npm install hexo-generator-search --save
```

**2、注入配置**

修改站点配置文件`_config.yml`，添加如下代码：

```yml
search:
  path: search.xml
  field: post
  content: true
  template: ./search.xml
```

**path**: 表示搜索后生成的文件路径,可以生成 xml 和 json 两种格式;

**field**：表示搜索的范围,有”post,page 和 all”三种值。
    **post**：所有的文章;
    **page**：所有顶部导航选项的页面;
    **all**：所有的文章和顶部导航选项的页面.

**content**：是否包含搜索到的文章的全部内容。如果 false,生成的结果只包括标题和创建时间这些信息,没有文章主体。默认情况下是 true.

**format**：搜索到的内容、选项的格式。
    **html**(默认)：将 html 原文本缩略。
    **striptags**：将 html 原文本缩略，并删除所有标记。
    **raw**：记下每一篇文章或每一页的文字。

**3、主题中开启搜索**

在主题配置文件`_config.butterfly.yml`中修改以下内容：

```diff
local_search:
-  enable: false
+  enable: true
```

**4、重新编译运行，即可看到效果**

前往博客根目录，打开 cmd 命令窗口依次执行如下命令：

```bash
hexo cl
hexo generate
hexo s -p 8000
```

## 社交图标

社交图标即主页上个性标签下的各种社交账号关联。

> 书写格式：图标名：url || 描述性文字

修改主题配置文件`_config.butterfly.yml`

```yml
social:
  fab fa-github: https://github.com/xxxxx || Github
  fas fa-envelope: mailto:xxxxxx@gmail.com || Email
```

## 顶部图

顶部图有 2 种配置：具体 url 和（留空，true 和 false，三个效果一样）

修改主题配置文件`_config.butterfly.yml`

如果不要显示顶部图，可直接配置 `disable_top_img: true`

![image-20241101192749700](https://y.creammint.cn/articles/images/image-20241101192749700.png)

### page 页

当具体 url 时

- 主页的顶部图可以在主题配置文件中设置 `index_img`

  ```yml
  index_img: https://bing.img.run/1920x1080.php # 必应每日更新图片
  ```

- archives 页的顶部图可以在主题配置文件中设置 `archive_img`

- 其他 page 页的顶部图可以在各自的 md 页面设置 `front-matter` 中的 `top_img`

  > 页面如果没有设置各自的 top_img，则会显示 default_top_img 图片

留空， `true` 和 `false`
主页会显示纯颜色的顶部图，其他 page 的顶部图没有设置时，也会显示纯颜色的顶部图

### post 页

post 页的顶部图会优先显示各自`front-matter`中的`top_img`, 如果没有设置，则会缩略图（即各自 front-matter 中的 cover)，如果没有则会显示显示 `default_top_img` 图片

## 文章置顶

要为文章置顶，你需要安装插件 (hexo-generator-index-pin-top 或者 hexo-generator-indexed)

```bash
npm install hexo-generator-index-pin-top
```

- 如果使用 `hexo-generator-index-pin-top`, 需要先卸载掉 `hexo-generator-index`，然后在文章的 `front-matter` 区域里添加 `top: true` 属性来把这篇文章置顶
- 如果使用 `hexo-generator-indexed`, 需要先卸载掉 `hexo-generator-index`，然后在文章的 `front-matter` 区域里添加 `sticky: 1` 属性来把这篇文章置顶。数值越大，置顶的优先级越大

## 文章封面

文章的 markdown 文档上，在 `Front-matter` 添加`cover`, 并填上要显示的图片地址。

- 如果不配置 cover, 可以设置显示默认的 cover。
- 如果不想在首页显示 cover, 可以设置为 false。

修改主题配置文件`_config.butterfly.yml`

```yml
cover:
  # 是否显示文章封面
  index_enable: true
  aside_enable: true
  archives_enable: true
  # 封面显示的位置
  # 三个值可配置 left , right , both
  position: both
  # 当没有设置cover时，默认的封面显示
  default_cover: # 当配置多张图片时，会随机选择
    - https://cdn.jsdelivr.net/gh/百度127/CDN@latest/cover/default_bg.png
    - https://cdn.jsdelivr.net/gh/百度127/CDN@latest/cover/default_bg2.png
    - https://cdn.jsdelivr.net/gh/百度127/CDN@latest/cover/default_bg3.png
```

## 复制相关配置

可配置网站是否可以复制、复制的内容是否添加版权信息

```yml
copy:
  enable: true # 是否开启网站复制权限
  copyright: # 复制的内容后面加上版权信息
    enable: true # 是否开启复制版权信息添加
    limit_count: 50 # 字数限制，当复制文字大于这个字数限制时，将在复制的内容后面加上版权信息
```

## Footer 设置

### 项目年份

`since` 是一个来展示你站点起始时间的选项。它位于页面的最底部。
修改主题配置文件`_config.butterfly.yml`

```yml
footer:
  owner:
    enable: true
    since: 2024
```

### 页脚自定义文本

`custom_text` 是一个给你用来在页脚自定义文本的选项。通常你可以在这里写声明文本等。支持 HTML。
修改主题配置文件`_config.butterfly.yml`

```yml
custom_text: Hi, welcome to my <a href="https://百度.me/">blog</a>! # 也叫自定义文本
```

### ICP

对于部分有备案的域名，可以在 ICP 配置显示。
修改主题配置文件`_config.butterfly.yml`

```yml
ICP:
  enable: true
  url: http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action
  text: 粤ICP备xxxx
  icon: /img/icp.png
```

## 运行时间

网页已运行时间
修改主题配置文件`_config.butterfly.yml`

```yml
runtimeshow:
  enable: true
  publish_date: 1/1/2024 00:00:00
  ##网页开通时间
  #格式: 月/日/年 时间
  #也可以写成 年/月/日 时间
```

## 主页 top_img 显示大小

默认的显示为全屏。`site-info` 的区域会居中显示
修改主题配置文件`_config.butterfly.yml`

```yml
# 主页设置
# 默认top_img全屏，site_info在中间
# 使用默认, 都无需填写（建议默认）
index_site_info_top: # 主页标题距离顶部距离  例如 300px/300em/300rem/10%
index_top_img_height: #主页top_img高度 例如 300px/300em/300rem  不能使用百分比
```

注意：index_top_img_height 的值不能使用百分比

2 个都不填的话，会使用默认值

## 生成唯一的文章链接地址

Hexo 生成博客文章的链接时，默认格式为

```yml
permalink: :year/:month/:day/:title/ # 年：月：日：标题
```

如果标题中含中文的话，复制 URL 链接的话中文字符就会是一大串编码字符。

如果想为每一篇文章生成唯一 ID(链接地址)的话，推荐使用`hexo-abbrlink`或`hexo-uuid`

### hexo-abbrlink

在博客根目录下运行命令安装 `hexo-abbrlink` 插件

```bash
npm install hexo-abbrlink --save
```

修改配置文件 `_config.yml`

```yml
permalink: posts/:abbrlink/
```

hexo clean -> hexo g -> hexo s 在本地查看效果

[hexo-abbrlink 官方文档](https://github.com/ohroy/hexo-abbrlink)中还介绍了其他配置，可以参考和自行修改。

### hexo-uuid

在博客根目录下运行命令安装`hexo-uuid`插件

```bash
npm install hexo-uuid --save
```

修改配置文件 `_config.yml`

```yml
permalink: posts/:uuid/
```

hexo clean -> hexo g -> hexo s 在本地查看效果

[hexo-uuid 官方文档](https://github.com/chekun/hexo-uuid)中还介绍了其他配置，可以参考和自行修改。

## 增加关于、标签、分类、归档页面

[Hexo 增加关于、标签、分类、归档页面](https://creammint.github.io/posts/39917/)

## 动态修改网站的标题

[Hexo+Butterfly 动态修改网站的标题](https://creammint.github.io/posts/32273/)

## Hexo+Gulp 压缩图片

[使用 gulp 压缩博客静态资源 | Akilar の糖果屋](https://akilar.top/posts/49b73b87/)

**压缩指令**

```bash
hexo clean	// 清除public文件夹（缓存）
hexo generate	// 生成博客
gulp	// 执行压缩
hexo deploy		// 若压缩完成无错误，就可以发布了
```

## 文章页面关闭侧边栏

```yml
---
title: 标签
date: 2024-10-29 20:18:20
type: 'tags'
aside: false
---
```

只需要增加代码`aside: false`这样设置后我们的页面就没有侧边栏了；
