import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '前端导航', link: '/nav/' },
  { 
    text: '数据库', 
    items: [
      {text: 'Oracle',link: '/notes/database/oracle/Oracle 简介' },
      {text: 'MySQL',link: '/notes/database/mysql/MySQL 数据库安装' }
    ]
  },
  { 
    text: 'Java', 
    items: [
      {text: 'Java',link: '/notes/java/Excel文件上传' }
    ]
  },
  { 
    text: 'VitePress搭建', 
    items: [
      {text: 'VitePress官网',link: 'https://vitepress.dev/zh/' },
      {text: '茂茂物语',link: 'https://github.com/maomao1996/vitepress-nav-template' }
    ]
  }
]
