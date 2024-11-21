---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 薄荷の云笔记
  text:
  tagline: 函数应该做一件事。<br/>做好这件事，只能做这一件事。
  image:
    src: https://y.creammint.cn/basis/build-img/avatar_2.png
    alt: 薄荷
  actions:
    - text: 我的博客
      link: https://creammint.cn/
    - text: 薄荷糖毕设
      link: https://bs.creammint.cn/
      theme: alt
    - text: 导航页
      link: /nav/

features:
  - icon:
      src: 'https://y.creammint.cn/basis/nav/icon-nav-64.png'
    title: 导航页
    details: 个人收藏的好用站点
    link: /nav/
    linkText: 导航页
  - icon:
      src: 'https://y.creammint.cn/basis/nav/icon-database-96.png'
    title: 数据库
    details: Oracle、MySQL等主流数据库知识笔记、语法和用法等
    link: /notes/database/oracle/Oracle 简介
    linkText: sql
  - icon:
      src: 'https://y.creammint.cn/basis/nav/icon-Java-96.png'
    title: Java
    details: 记录Java相关一些业务实现逻辑和笔记知识
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
