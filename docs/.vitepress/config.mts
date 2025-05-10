import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "个人博客",
  description: "欢迎",
  markdown:{

  },
  lastUpdated: true, //首次配置不会立即生效，需git提交后爬取时间戳 //
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: { 
      provider: 'local'
    }, 
    footer: { 
      message: 'Released under the MIT License.', 
      copyright: 'Copyright © 2019-2025 present Evan You', 
    }, 
    // editLink: { 
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path', // 改成自己的仓库
    //   text: '在GitHub编辑本页'
    // },
  
    //上次更新时间 //
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: '前言',
        items: [
          { text: '介绍', link: '/guide/intro' },
        ]
      },
      {
        text: 'AstrBot',
        items: [
          { text: '我的插件', link: '/astrbot/plugin' },
        ]
      },
      {
        text: '读的一些论文',
        items: [
          { text: '师兄推荐的', link: '/paper/pre' },
          { text: '我读的', link: '/paper/my' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tinkerbellqwq' }
    ]
  }
})
