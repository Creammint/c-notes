# VitePress 搭建

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

## 代码块折叠

[vitepress-plugin-codeblocks-fold 插件使用](https://github.com/T-miracle/vitepress-plugin-codeblocks-fold/blob/main/README_zh.md)

### 安装

```bash
// npm
npm i vitepress-plugin-codeblocks-fold
// yarn
yarn add vitepress-plugin-codeblocks-fold
```

### 使用

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import codeblocksFold from 'vitepress-plugin-codeblocks-fold' // 导入方法
import 'vitepress-plugin-codeblocks-fold/style/index.css' // 导入样式

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // ...
  },
  setup() {
    // 获取前言和路由
    const { frontmatter } = useData()
    const route = useRoute()
    // 基础使用
    codeblocksFold({ route, frontmatter }, true, 400)
  },
}
```

`codeblocksFold()` 接收三个参数：

- vitepressObj

  这是一个对象，对象里面必须有两个值：路由和前言。

- defaultAllFold

  是否默认所有页面的代码块都设置成折叠状态，默认为 `true`；设置成 `false` 则默认不折叠。可以忽略不填。

- height

  代码块被折叠后的高度，默认为 `400`（单位`px`）。可以忽略不填。

### 扩展使用

单个.md 文件可以设置前言

```bash
---
cbf: [1,2,3]
---
```

该数组含义为：

- 当 `defaultAllFold` 设置为 `true` （即默认全部页面开启折叠）时，当前页面第 1、2、3 个代码块强制不开启折叠
- 当 `defaultAllFold` 设置为 `false` （即默认全部页面不开启折叠）时，当前页面第 1、2、3 个代码块强制开启折叠

```bash
cbf` 还有两个参数：`true` 和 `false
```

- `true` 表示当前页面所有代码块开启折叠
- `false` 表示当前页面所有代码块不开启折叠

### 折叠框箭头不展示

因为 svg 的属性颜色是和背景同色的，所以页面上看不见；

添加 css 样式，我的路径是放在`.vitepress/theme/vitepress.scss`

```css
svg.fold-btn-icon path {
  fill: var(--vp-code-tab-text-color);
  filter: invert(80%);
}
```

## 毛玻璃

在 `theme/style` 目录下创建一个 `blur.scss` 然后复制以下代码进去
然后再到 `index.scss` 引入

**blur.scss**

```css
/* .vitepress/theme/style/blur.css */
:root {
  /* 首页导航 */
  .VPNavBar {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* 文档页导航两侧 */
  .VPNavBar:not(.home) {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  @media (min-width: 960px) {
    /* 文档页导航两侧 */
    .VPNavBar:not(.home) {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页下滑后导航两侧 */
    .VPNavBar:not(.has-sidebar):not(.home.top) {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  @media (min-width: 960px) {
    /* 文档页导航中间 */
    .VPNavBar:not(.home.top) .content-body {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页下滑后导航中间 */
    .VPNavBar:not(.has-sidebar):not(.home.top) .content-body {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  /* 分割线 */

  @media (min-width: 960px) {
    /* 文档页分割线 */
    .VPNavBar:not(.home.top) .divider-line {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页分割线 */
    .VPNavBar:not(.has-sidebar):not(.home.top) .divider {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  /* 搜索框 VPNavBarSearchButton.vue */
  .DocSearch-Button {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* 移动端大纲栏 */
  .VPLocalNav {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
    /* 隐藏分割线 */
    /* border-bottom: 5px solid var(--vp-c-gutter); */
    border-bottom: 0px;
  }
}
```

**index.scss**

```css
@use './rainbow.scss';
@use './vars.scss';
@use './vitepress.scss';
@use './medium-zoom.scss';
@use './tailwind.scss';

@use './blur.scss';
```

:::tip

**官网**：[VitePress 官网](https://vitepress.dev/zh/)

**前端导航**：[基于 VitePress 的个人前端导航页面模板](https://github.com/maomao1996/vitepress-nav-template)

**页面美化**：

- 叁聖涅：[VitePress 页面美化](https://aiyo.space/VPDocs/样式美化.html)

:::
