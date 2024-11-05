import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航页', link: '/nav/' },
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
    text: 'blog', 
    items: [
      {text: 'Hexo',link: '/notes/blog/Hexo博客搭建' },
      {text: 'VitePress',link: '/notes/blog/VitePress搭建' }
    ]
  },
  { 
    text: '小知识', 
    items: [
      {text: '常用软件操作',link: '/notes/knowledge/software/qq点击链接加好友转换方式' }
    ]
  }
]
