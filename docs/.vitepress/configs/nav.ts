import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航页', link: '/nav/' },
  { 
    text: '小知识', 
    items: [
      {
        text: '常用软件',
        items: [
          {
            text: '使用教程',
            link: '/notes/knowledge/software/qq点击链接加好友转换方式'
          }
        ]
      },
      {
        text: 'AI相关',
        items: [
          {
            text: '写作(自媒体)',
            link: '/notes/knowledge/AI/AI操作技巧'
          }
        ]
      }
    ],
  },
  { 
    text: '数据库', 
    items: [
      {text: 'Oracle',link: '/notes/database/oracle/Oracle 函数' },
      {text: 'MySQL',link: '/notes/database/mysql/MySQL 数据库安装' }
    ]
  },
  { 
    text: '软件开发', 
    items: [
      {
        text: '后端',
        items: [
          {text: 'Tools',link: '/notes/java/tools/IDEA软件操作'},
          {text: 'Java',link: '/notes/java/Excel文件上传'},
          {text: 'Git',link: '/notes/java/git/git commit 代码提交规范'},
          {text: 'Docker',link: '/notes/java/docker/Docker命令'}
          
        ]
      },
      {
        text: '微信小程序',
        items: [
          {text: 'wechat',link: '/notes/java/wechat/微信小程序'},
        ]
      },
    ]
  },
  { 
    text: 'blog', 
    items: [
      {text: 'Hexo',link: '/notes/blog/Hexo博客搭建' },
      {text: 'VitePress',link: '/notes/blog/VitePress搭建' }
    ]
  }
]
