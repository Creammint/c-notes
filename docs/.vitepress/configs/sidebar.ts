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
      '/notes/middleware/': [
          {
            text: '开发工具',
            collapsed: true,
            items: [
              { text: 'IDEA快捷键', link: '/notes/middleware/tools/IDEA快捷键' },
              { text: 'IDEA软件操作', link: '/notes/middleware/tools/IDEA软件操作' },
            ]
          },
          {
            text: 'Git',
            collapsed: false,
            items: [
              { text: 'git commit 代码提交规范', link: '/notes/middleware/git/git commit 代码提交规范' }
            ]
          },
          {
            text: 'wechat',
            collapsed: true,
            items: [
              { text: '微信小程序', link: '/notes/middleware/wechat/微信小程序' }
            ]
          },
          {
            text: 'Docker',
            collapsed: true,
            items: [
              { text: 'Docker命令', link: '/notes/middleware/docker/Docker命令' }
            ]
          }
      ],
      '/notes/java/': [
          {
            text: 'Java基础',
            collapsed: false,
            items: [
              { text: '注解解读', link: '/notes/java/注解解读' },
              { text: 'Java常用代码', link: '/notes/java/Java常用代码' }
            ]
          },
          {
            text: '文件流操作',
            collapsed: false,
            items: [
              { text: 'Excel文件上传', link: '/notes/java/Excel文件上传' },
              { text: 'Excel导出设置复杂模板', link: '/notes/java/Excel导出设置复杂模板' },
              { text: 'Excel转Pdf', link: '/notes/java/Excel转Pdf' },
            ]
          },
          {
            text: 'API调用',
            collapsed: false,
            items: [
              { text: 'API接口调用同步', link: '/notes/java/API接口调用同步' }
            ]
          }
      ],
      '/notes/blog/': [
          {
            text: 'Hexo',
            collapsed: false,
            items: [
              { text: '博客搭建', link: '/notes/blog/Hexo博客搭建' },
              { text: 'Hexo运行配置', link: '/notes/blog/Hexo+anzhiyu配置' },
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
          },
          {
            text: '环境配置',
            collapsed: false,
            items: [
              { text: 'vercel配置', link: '/notes/blog/vercel配置' },
              
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
            text: '自媒体',
            collapsed: false,
            items: [
              { text: 'AI提示词', link: '/notes/knowledge/wemedia/AI提示词' },
              { text: '文章编写技巧', link: '/notes/knowledge/wemedia/文章编写技巧' },
              { text: '推荐做的副业项目', link: '/notes/knowledge/wemedia/推荐做的副业项目' },
            ]
          }
      ],
      '/notes/about': [
          {
            text: '关于我',
            collapsed: false,
            items: [
              { text: '关于我', link: '/notes/about/关于我' },
              { text: '个人简历',link: '/notes/about/个人简历' }
            ]
          },
          {
            text: 'vlog',
            collapsed: false,
            items: [
              { text: '减肥计划', link: '/notes/about/vlog/一个月减肥计划表' },
              { text: '双月湾2天1夜高效游玩路线', link: '/notes/about/vlog/双月湾2天1夜高效游玩路线' },
            ]
          }
      ]
}
