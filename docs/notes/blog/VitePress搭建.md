# VitePress 搭建

## 官网

[VitePress | 由 Vite 和 Vue 驱动的静态站点生成器](https://vitepress.dev/zh/)

[基于 VitePress 的个人前端导航页面模板](https://github.com/maomao1996/vitepress-nav-template)

## 命令

### 构建

```bash
npm run build
```

### 运行

```bash
npm run dev
```

## 添加页面

### 新增文章

在 `/docs/notes/`目录下增加文章

![image-20241101133624261](https://y.creammint.cn/articles/images/image-20241101133624261.png)

### 侧边栏目录

`/docs/.vitepress/configs/sidebar.ts` 把新增的文章路添加上去；

```ts
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/notes/database/mysql/': [
    {
      text: 'MySQL基础',
      collapsed: false,
      items: [{ text: 'MySQL 数据库安装', link: '/notes/database/mysql/MySQL 数据库安装' }],
    },
  ],
}
```

效果如下：

![image-20241101134052337](https://y.creammint.cn/articles/images/image-20241101134052337.png)

### 导航栏菜单

`/docs/.vitepress/configs/nav.ts` 下增加导航栏菜单

```ts
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航页', link: '/nav/' },
  {
    text: '数据库',
    items: [
      { text: 'Oracle', link: '/notes/database/oracle/Oracle 简介' },
      { text: 'MySQL', link: '/notes/database/mysql/MySQL 数据库安装' },
    ],
  },
]
```

效果如下：

![image-20241101134308625](https://y.creammint.cn/articles/images/image-20241101134308625.png)

## 导航页

`/docs/nav`目录下修改对应的文件；

![image-20241101134528996](https://y.creammint.cn/articles/images/image-20241101134528996.png)
