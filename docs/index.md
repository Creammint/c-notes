---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: Cream薄荷糖
  text: A small website
  tagline: 我姓唐却塘塞不了你的心
  image:
    src: https://y.creammint.cn/basis/build-img/avatar_2.png
    alt: Cream薄荷糖
  actions:
    - text: 我的博客
      link: https://creammint.cn/
    - text: 薄荷糖毕设
      link: https://bs.creammint.cn/
      theme: alt
    - text: 前端导航
      link: /nav/
      theme: alt

features:
  - icon: 📖
    title: 前端导航
    details: 个人收藏的好用站点
    link: /nav/
    linkText: 前端导航
  - icon: 📘
    title: 数据库
    details: Oracle、MySQL等主流数据库知识笔记、语法和用法等
    link: /notes/database/oracle/Oracle 简介
    linkText: sql
  - icon: 💡
    title: Java
    details: 慢慢开始把Java重新捡起来，记录一些业务实现逻辑和笔记知识
    link: /notes/java/Excel文件上传
    linkText: Java
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
