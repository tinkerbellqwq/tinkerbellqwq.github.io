# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 [VitePress](https://vitepress.dev/) 的个人博客项目，托管在 GitHub Pages 上（tinkerbellqwq.github.io）。

## 开发命令

### 本地开发
```bash
npm run docs:dev
```
启动本地开发服务器（默认 http://localhost:5173）

### 构建生产版本
```bash
npm run docs:build
```
构建静态站点到 `docs/.vitepress/dist` 目录

### 预览构建结果
```bash
npm run docs:preview
```
本地预览构建后的静态站点

## 项目结构

```
tinkerbellqwq.github.io/
├── docs/                      # VitePress 文档根目录
│   ├── .vitepress/
│   │   └── config.mts         # VitePress 配置文件（导航、侧边栏等）
│   ├── index.md               # 首页
│   ├── guide/                 # 前言分类
│   ├── astrbot/               # AstrBot 插件相关
│   ├── paper/                 # 论文阅读笔记
│   └── projects/              # 项目文档
└── .github/workflows/deploy.yml # GitHub Pages 部署配置
```

## VitePress 配置

配置文件位于 `docs/.vitepress/config.mts`，包含：
- **导航栏** (`nav`)：顶部导航链接
- **侧边栏** (`sidebar`)：文档分组结构
- **搜索**：使用本地搜索 (`provider: 'local'`)
- **MathJax**：已启用数学公式渲染 (`markdown.math: true`)

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：
- 推送到 `main` 分支时自动触发构建和部署
- 使用 Node.js 20
- 构建产物：`docs/.vitepress/dist`

## 内容组织

添加新内容时：
1. 在 `docs/` 下创建对应的 `.md` 文件
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 中添加链接
3. 文件路径即 URL 路径（如 `docs/guide/intro.md` → `/guide/intro`）
