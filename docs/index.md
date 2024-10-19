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
    title: test
    details: test
    link: /
    linkText: test
  - icon: 📘
    title: test
    details: test
    link: /
    linkText: test
  - icon: 💡
    title: Workflow
    details: test
    link: /
    linkText: test
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
