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
              { text: 'PLSQL 使用技巧、快捷键', link: '/notes/database/oracle/PLSQL 使用技巧、快捷键' },
              { text: 'PLSQL 利用explain plan进行sql性能分析', link: '/notes/database/oracle/PLSQL 利用执行计划explain plan进行sql性能分析' }
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
              { text: 'Oracle和服务器性能排查', link: '/notes/database/oracle/Oracle和服务器性能排查' },
              { text: 'Oracle 慢查询排查步骤', link: '/notes/database/oracle/Oracle 慢查询排查步骤' },
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
            text: 'Java',
            collapsed: false,
            items: [
              { text: 'Java常用代码', link: '/notes/java/Java常用代码' },
              { text: 'Excel文件上传', link: '/notes/java/Excel文件上传' }
            ]
          },
          {
            text: 'Git',
            collapsed: false,
            items: [
              { text: 'git commit 代码提交规范', link: '/notes/java/git/git commit 代码提交规范' }
            ]
          }
      ],
      '/notes/blog/': [
          {
            text: 'Hexo',
            collapsed: false,
            items: [
              { text: '博客搭建', link: '/notes/blog/Hexo博客搭建' },
              { text: 'anzhiyu主题修改', link: '/notes/blog/anzhiyu主题修改' },
              { text: 'Butterfly主题修改', link: '/notes/blog/Hexo+Butterfly主题修改' },
              { text: 'Butterfly魔改日记(一)', link: '/notes/blog/Hexo+Butterfly魔改日记(一)' },
              { text: 'Butterfly优化搜索引擎收录', link: '/notes/blog/Hexo+Butterfly SEO优化搜索引擎收录' }
              
            ]
          },
          {
            text: 'VitePress',
            collapsed: false,
            items: [
              { text: '博客搭建', link: '/notes/blog/VitePress搭建' },
              { text: '问题修改', link: '/notes/blog/VitePress问题修改' },
              { text: '标签外挂', link: '/notes/blog/VitePress的标签外挂' }
              
            ]
          }
      ],
      '/notes/knowledge': [
          {
            text: '常用软件',
            collapsed: false,
            items: [
              { text: 'QQ点击链接加好友转换方式', link: '/notes/knowledge/software/qq点击链接加好友转换方式' },
              { text: '油猴怎么玩?', link: '/notes/knowledge/software/油猴怎么玩' }
            ]
          },
          {
            text: 'AI相关',
            collapsed: false,
            items: [
              { text: 'AI操作技巧', link: '/notes/knowledge/AI/AI操作技巧' },
            ]
          }
      ]
}
