import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/notes/database/oracle/': [
          {
            text: '基础介绍',
            collapsed: true,
            items: [
              { text: 'Oracle 简介', link: '/notes/database/oracle/Oracle 简介' },
              { text: 'Oracle 数据库连接', link: '/notes/database/oracle/Oracle 数据库连接' },
              { text: 'Oracle 数据库创建导入', link: '/notes/database/oracle/Oracle 数据库创建导入' }
            ]
          },
          {
            text: '软件工具',
            collapsed: true,
            items: [
              { text: 'PLSQL 使用技巧、快捷键', link: '/notes/database/oracle/PLSQL 使用技巧、快捷键' }
            ]
          },
          {
            text: '操作语法',
            collapsed: false,
            items: [
              { text: 'Oracle 函数', link: '/notes/database/oracle/Oracle 函数' },
              { text: 'DCL,DDL,DML,DQL语言', link: '/notes/database/oracle/DCL、DDL、DML、DQL语言' },
              { text: 'Oracle 存储过程语句', link: '/notes/database/oracle/Oracle 存储过程语句' }
            ]
          },
          {
            text: '数据库操作',
            collapsed: false,
            items: [
              { text: 'Oracle 查看表空间', link: '/notes/database/oracle/Oracle 查看表空间' },
              { text: 'Oracle 查看处理死锁', link: '/notes/database/oracle/Oracle 查看处理死锁' },
              { text: 'Oracle 查看表或视图的定义语句', link: '/notes/database/oracle/Oracle 查看表或视图的定义语句' }
            ]
          }
      ],
      '/notes/database/mysql/': [
          {
            text: 'MySQL基础',
            collapsed: false,
            items: [
              { text: 'MySQL 数据库安装', link: '/notes/database/mysql/MySQL 数据库安装' }
            ]
          }
      ],
      '/notes/java/': [
          {
            text: '业务处理',
            collapsed: false,
            items: [
              { text: 'Excel文件上传', link: '/notes/java/Excel文件上传' }
            ]
          }
      ],
      '/notes/blog/': [
          {
            text: 'Hexo',
            collapsed: false,
            items: [
              { text: 'Hexo博客搭建', link: '/notes/blog/Hexo博客搭建' },
              { text: 'Hexo+Butterfly主题修改', link: '/notes/blog/Hexo+Butterfly主题修改' },
              { text: 'Hexo+Butterfly魔改日记(一)', link: '/notes/blog/Hexo+Butterfly魔改日记(一)' }
            ]
          },
          {
            text: 'VitePress',
            collapsed: false,
            items: [
              { text: 'VitePress搭建', link: '/notes/blog/VitePress搭建' },
              { text: 'VitePress问题修改', link: '/notes/blog/VitePress问题修改' }
            ]
          }
      ]
}
