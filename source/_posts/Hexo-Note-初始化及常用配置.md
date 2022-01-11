---
title: Hexo Note - 初始化及常用配置
date: 2022-01-09 14:07:29
tags: [Hexo]
categories: [Hexo]
---
### 什么是 Hexo ？
> &ensp;&ensp;Hexo 是一个快速、简洁且高效的博客框架。[Hexo](https://hexo.bootcss.com/docs/index.html) 使用 Markdown（或其他渲染引擎）解析博文，在几秒内，即可利用靓丽的主题生成静态网页。

- [Markdown站内手册](/2022/01/05/Markdown-using-document)
- [Markdown官方手册](https://markdown.com.cn)

### 安装
#### 前提
安装前，确认机器环境已经安装 [Git](http://git-scm.com/) 和 [Node](http://nodejs.org/) (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本)：
```bash
$ git --version
git version 2.31.1.windows.1

$ node -v
v14.13.0
```
#### 安装 Hexo
&ensp;&ensp;全局安装hexo cli工具
```bash
$ npm install -g hexo-cli
```

### 搭建网站
#### 初始化博客项目目录，并安装依赖
```bash
$ hexo init projectName
$ cd projectName && npm install
```
&ensp;&ensp;构建后可以看到目录的基本结构，其中_.config.yml为网站的配置文件；source为资源文件，比如后续需要新建的博文，就是在这个目录下生成的；themes是主题文件夹，Hexo将根据这个目录下的资源配置，来渲染网站，生成页面。
```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### 配置
#### 网站
&ensp;&ensp;博客网站的网站标题、描述，以及网站的归属等信息设置

| 参数 | 描述 |
| :---: | --- |
| `title` | 网站标题 |
| `subtitle` | 网站副标题 |
| `description` | 描述，主要用于SEO，建议准确描述网站内容，可使用关键字 |
| `keywords` | 关键字 |
| `author` | 网站作者 |
| `language` | 网站所使用的语言，可根据使用的主题提供的语言选项来进行设置，如zh-CN |
| `timezone` | 网站时区，中国大陆用户可以设置 `Asia/Shanghai`，具体可参见 [时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |
#### 网址
&ensp;&ensp;通常用于设置网站网址即博文的永久链接格式

| 参数 | 描述 | 默认值 |
| :---: | --- | :---: |
| `url` | 网址，协议需要指定，如 `http://` 或者 `https://` |
| `permalink` | 博文的永久链接格式，具体格式可查看 [永久链接格式](https://hexo.bootcss.com/docs/permalinks.html) |
| `pretty_urls` | 改写 `permalink` 的值来美化 URL |
| `pretty_urls.trailing_index` | 是否在永久链接中保留尾部的 index.html，设置为 false 时去除 |
| `pretty_urls.trailing_html` | 是否在永久链接中保留尾部的 .html, 设置为 false 时去除 (对尾部的 index.html无效) | true

其他更详细的配置说明，可查看 [官网说明](https://hexo.bootcss.com/docs/configuration.html)