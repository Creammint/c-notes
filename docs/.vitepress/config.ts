import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: 'Cream薄荷糖',
  description: 'Cream薄荷糖的成长之路，包含数据库知识、Java笔记、编程常用工具等',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: 'https://y.creammint.cn/basis/build-img/note.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          if (env.relativePath.startsWith('some/path')) return ''
          return html
        }
      }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Creammint' }],

    footer: {
      //message: '如有转载或 CV 的请标注本站原文地址',
      copyright: '© 2024 Cream薄荷糖',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    // visitor: {
    //   badgeId: 'maomao1996.vitepress-nav-template',
    // },

    // comment: {
    //   repo: 'maomao1996/vitepress-nav-template',
    //   repoId: 'R_kgDOJC09Jg',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDOJC09Js4Cekn0',
    // },
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
