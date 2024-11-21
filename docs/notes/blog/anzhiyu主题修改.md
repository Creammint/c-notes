# anzhiyu 主题修改

## anzhiyu

[安知鱼主题官方文档](https://docs.anheyu.com/)

## Vercel 部署 Twikoo

[Vercel 部署 Twikoo 评论系统](https://blog.kevinchu.top/2023/09/19/vercel-deploy-twikoo/)

## 字数统计

要为 AnZhiYu 配上字数统计特性, 你需要如下几个步骤:

打开 hexo 工作目录

```bash
npm install hexo-wordcount --save
或者
yarn add hexo-wordcount
```

修改 主题配置文件:

```yml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```
