import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "个人博客",
  description: "欢迎",
  markdown:{
    math: true
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => false
      }
    }
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
      { text: '力扣 Hot 100', link: '/leetcode/hot100' },
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
      {
        text: '一些有趣的项目',
        items: [
          { text: '代码自动评审组件', link: '/projects/code-review/summary' },
        ]
      },
      {
        text: '力扣刷题记录',
        items: [
          { text: '🎯 总览', link: '/leetcode/hot100' },
          {
            text: '📅 每周计划',
            collapsed: false,
            items: [
              { text: '第1周：基础篇', link: '/leetcode/week1' },
              { text: '第2周：树与递归', link: '/leetcode/week2' },
              { text: '第3周：进阶算法', link: '/leetcode/week3' },
              { text: '第4周：冲刺篇', link: '/leetcode/week4' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tinkerbellqwq' }
    ]
  }
})
