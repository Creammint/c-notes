import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '常用工具',
    items: [
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com',
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu',
      },
      {
        icon: '/icons/json-cn.ico',
        title: 'Json 中文网',
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn',
      },
    ],
  },
  {
    title: 'AI',
    items: [
      {
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT（最强）',
        link: 'https://chat.openai.com/chat',
      },
      {
        icon: 'https://statics.moonshot.cn/kimi-chat/favicon.ico',
        title: 'Kimi.ai',
        link: 'https://kimi.moonshot.cn/',
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney（绘画）',
        link: 'https://www.midjourney.com',
      },
    ],
  },
  {
    title: '自媒体',
    items: [
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
        title: '微信公众平台',
        link: 'https://mp.weixin.qq.com/',
      },
      {
        icon: 'https://xiumi.us/images/b80cd8.xiumi_logo_40.png',
        title: '秀米XIUMI',
        link: 'https://xiumi.us/#/',
      },
      {
        icon: 'https://www.hellofont.cn/favicon.ico',
        title: '字由',
        link: 'https://www.hellofont.cn/',
      },
      {
        icon: 'https://www.pexels.com/assets/static/images/meta/pexels-icon.png',
        title: 'Pexels',
        link: 'https://www.pexels.com/zh-cn/',
        desc: '免费素材图片',
      },
      {
        icon: 'https://static.zcool.cn/git_z/z/images/new/logo.png',
        title: 'ZCOOL站酷',
        link: 'https://www.zcool.com.cn/',
        desc: 'UI设计网站',
      },
    ],
  },
  {
    title: '购物',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i1/O1CN01FLiUvb1K4szSnB9fw_!!6000000001111-2-tps-176-68.png',
        title: '1688',
        link: 'https://www.1688.com/',
      },
    ],
  },
  {
    title: '求职',
    items: [
      {
        icon: 'https://y.creammint.cn/articles/images/image-20241022205953390.png',
        title: 'BOSS直聘',
        link: 'https://www.zhipin.com/shenzhen/?seoRefer=index',
      },
    ],
  },
  {
    title: '影视',
    items: [
      {
        //icon: 'https://y.creammint.cn/articles/images/image-20241022205953390.png',
        title: '橘子搜索',
        link: 'https://k3f2.cn/',
      },
      {
        icon: 'https://www.libvio.fun/statics/img/logo2.png',
        title: 'LIBVIO',
        link: 'https://www.libvio.fun/',
      },
      {
        icon: 'https://netflixhz.com/img/netflixhz.png',
        title: 'NetflixHz',
        link: 'https://netflixhz.com/free-movie-websites/',
      },
    ],
  },
  {
    title: '通讯工具',
    items: [
      {
        icon: 'https://mail.163.com/favicon.ico',
        title: '163网易邮箱大师',
        link: 'https://mail.163.com/',
      },
    ],
  },
  {
    title: '学历证书',
    items: [
      {
        icon: 'https://www.ruankao.org.cn/asset/image/logo/logo.png?v=20240824',
        title: '中国计算机技术职业资格网',
        link: 'https://www.ruankao.org.cn/',
      },
      {
        icon: 'https://t1.chei.com.cn/chsi/favicon.ico',
        title: '学信网',
        link: 'https://www.chsi.com.cn/',
      },
      {
        icon: 'https://t1.chei.com.cn/yz/favicon.ico',
        title: '中国研究生招生信息网',
        link: 'https://yz.chsi.com.cn/',
      },
      {
        //icon: 'https://t1.chei.com.cn/yz/favicon.ico',
        title: '教育部学位与研究生教育发展中心',
        link: 'https://www.chinadegrees.cn/',
      },
      {
        //icon: 'https://www.eol.cn/e_images/index/2022/common/header_log.png',
        title: '中国教育在线',
        link: 'https://www.eol.cn/',
      },
      {
        icon: 'https://mooc-image.nosdn.127.net/63273041c9ea4ac0a008650cba21801e.png?imageView&quality=100',
        title: '中国大学MOOC',
        link: 'https://www.icourse163.org/',
      },
    ],
  },
  {
    title: 'VPN导航',
    items: [
      {
        icon: 'https://mojie.app/favicon.ico',
        title: '魔戒.net',
        link: 'https://mojie.app/',
      },
    ],
  },
  {
    title: '游戏',
    items: [
      {
        title: 'SakuraFrp',
        link: 'https://www.natfrp.com/user/',
        desc: '《我的世界》联机主机软件and流量',
      },
      {
        title: 'LittleSkin',
        link: 'https://littleskin.cn/',
        desc: '《我的世界》非正版账号',
      },
    ],
  },
  {
    title: '编程导航',
    items: [
      {
        icon: 'http://www.cxy521.com/static/img/logo.png',
        title: 'CXY521',
        link: 'http://www.cxy521.com/',
      },
      {
        icon: 'https://www.bgrdh.com/wp-content/uploads/2022/11/20221119185003612150.png',
        title: '办公人导航',
        link: 'https://www.bgrdh.com/',
      },
      {
        icon: 'https://img.quanxiaoha.com/quanxiaoha/171698116747384',
        title: '异常教程',
        link: 'https://www.exception.site/',
        desc: 'IDEA、Pycharm、Navicat等编程软件安装教程',
      },
    ],
  },
  {
    title: '软件安装',
    items: [
      {
        icon: 'http://www.rjgxgj.com/wp-content/uploads/2020/02/cropped-logo1-192x192.jpg',
        title: '软件管家',
        link: 'http://www.rjgxgj.com/',
      },
      {
        icon: 'https://www.youxiaohou.com/favicon.ico',
        title: '油小猴',
        link: 'https://www.youxiaohou.com/',
      },
      {
        icon: 'https://www.quanxiaoha.com/static/favicon.ico',
        title: '犬小哈教程',
        link: 'https://www.quanxiaoha.com/',
      },
      {
        icon: 'https://www.aichunjing.com/skin/ecms011/images/logo.png',
        title: '爱纯净Win系统',
        link: 'https://www.aichunjing.com/',
      },
    ],
  },
  {
    title: '我的站点导航',
    items: [
      {
        icon: 'https://y.creammint.cn/basis/build-img/icon.svg',
        title: '个人博客',
        desc: '日常笔记记录（零零散散啥都记系列）',
        link: 'https://creammint.cn/',
      },
      {
        icon: 'https://y.creammint.cn/basis/build-img/icon.svg',
        title: '薄荷糖毕设',
        desc: '毕业设计相关的站点',
        link: 'https://bs.creammint.cn/',
      },
      {
        icon: 'https://y.creammint.cn/basis/build-img/note.png',
        title: '云笔记',
        desc: '记录编程相关的笔记、知识',
        link: 'https://notes.creammint.cn/',
      },
    ],
  },
  {
    title: '小程序相关',
    items: [
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
        title: '微信小程序文档',
        desc: '微信小程序官方开发者文档',
        link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
      },
      {
        icon: '/icons/taro.svg',
        title: 'Taro',
        desc: '多端统一开发解决方案',
        link: 'https://taro.jd.com',
      },
      {
        icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
        title: 'uni-app',
        desc: '一个使用 Vue.js 开发所有前端应用的框架',
        link: 'https://uniapp.dcloud.net.cn',
      },
      {
        icon: 'https://mpxjs.cn/favicon.ico',
        title: 'Mpx',
        desc: '增强型跨端小程序框架',
        link: 'https://mpxjs.cn',
      },
    ],
  },
  {
    title: 'Node 相关',
    items: [
      {
        icon: '/icons/nodejs.svg',
        title: 'Node.js',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
        link: 'https://nodejs.org/zh-cn',
      },
      {
        icon: 'https://expressjs.com/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://expressjs.com',
      },
      {
        icon: '/icons/koa.svg',
        title: 'Koa',
        desc: '基于 Node.js 平台的下一代 web 开发框架',
        link: 'https://koajs.com',
      },
      {
        icon: 'https://www.eggjs.org/favicon.png',
        title: 'Egg',
        desc: '为企业级框架和应用而生',
        link: 'https://www.eggjs.org/zh-CN',
      },
      {
        icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
        title: 'Nest.js 中文文档',
        desc: '用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架',
        link: 'https://docs.nestjs.cn',
      },
    ],
  },
  {
    title: '站点生成器',
    items: [
      {
        icon: 'https://astro.build/favicon.svg',
        title: 'Astro',
        desc: '一个现代化的轻量级静态站点生成器',
        link: 'https://astro.build',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态网站生成器',
        link: 'https://vitepress.dev',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        link: 'https://vuepress.vuejs.org/zh',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '基于 Umi 为组件研发而生的静态站点框架',
        link: 'https://d.umijs.org',
      },
      {
        icon: 'https://docusaurus.io/zh-CN/img/docusaurus.ico',
        title: 'Docusaurus',
        desc: '基于 React 的静态网站生成器',
        link: 'https://docusaurus.io/zh-CN',
      },
    ],
  },
  {
    title: '图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        title: 'iconfont',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        link: 'https://www.iconfont.cn',
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark 图标库',
        desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
        link: 'https://iconpark.oceanengine.com/official',
      },
      {
        icon: 'https://emoji.muan.co/appicon.png',
        title: 'Emoji searcher',
        desc: 'Emoji 表情大全',
        link: '',
      },
    ],
  },
  {
    title: '社区',
    items: [
      {
        title: 'Github',
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        },
        desc: '一个面向开源及私有软件项目的托管平台',
        link: 'https://github.com',
      },
      {
        icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
        title: 'Stack Overflow',
        desc: '全球最大的技术问答网站',
        link: 'https://stackoverflow.com',
      },
      {
        title: '稀土掘金',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
        desc: '面向全球中文开发者的技术内容分享与交流平台',
        link: 'https://juejin.cn',
      },
      {
        title: 'V2EX',
        icon: 'https://www.v2ex.com/static/icon-192.png',
        desc: '一个关于分享和探索的地方',
        link: 'https://www.v2ex.com',
      },
      {
        title: 'SegmentFault 思否',
        icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        desc: '技术问答开发者社区',
        link: 'https://segmentfault.com',
      },
      {
        title: '博客园',
        // icon: 'https://common.cnblogs.com/favicon.ico',
        icon: '/icons/cnblogs.svg',
        desc: '博客园是一个面向开发者的知识分享社区',
        link: 'https://www.cnblogs.com',
      },
      {
        title: '知乎',
        icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
        desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://juejin.cn',
      },
      {
        title: 'CSDN',
        icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        //desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://blog.csdn.net/',
      },
    ],
  },
  {
    title: '摸鱼专用',
    items: [
      {
        icon: 'https://momoyu.cc/icon-192.png',
        title: '摸摸鱼热榜',
        // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
        link: 'https://momoyu.cc',
      },
      {
        icon: 'https://v.qq.com/favicon.ico',
        title: '腾讯视频',
        // desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
        link: 'https://v.qq.com',
      },
      {
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        title: '哔哩哔哩',
        // desc: '',
        link: 'https://www.bilibili.com',
      },
      {
        icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
        title: 'YouTube',
        // desc: '',
        link: 'https://www.youtube.com',
      },
      {
        icon: '/icons/twitter.svg',
        title: 'Twitter',
        // desc: '',
        link: 'https://twitter.com',
      },
      {
        icon: '/icons/pixiv.png',
        title: 'Pixiv',
        // desc: '',
        link: 'https://www.pixiv.net',
      },
    ],
  },
]
