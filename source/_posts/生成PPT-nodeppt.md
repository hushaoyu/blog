---
title: 生成PPT - nodeppt
date: 2022-01-14 15:25:16
tags: [nodeppt, PPT]
categories: [PPT, nodeppt]
---
#### 全局安装脚本
```bash
$ npm install -g nodeppt
```
- [github](https://github.com/ksky521/nodeppt)

#### 使用方法
- 命令
  - `new`：使用线上模板创建一个md文件
    - `nodeppt new demo.md` # 根据官方模板创建一个新的 `slide` 板块
    - `nodeppt new demo.md -t username/repo` # 根据 `github` 指定模板创建新的 `slide`板块
  - `serve`：启动一个指定的md文件预览
  - `build`：编译产出一个md文件
  
#### 快捷键
```yaml
Page: ↑/↓/←/→ Space Home End
Fullscreen: F
Overview: -/+
Speaker Note: N
Grid Background: Enter
```
#### 配置
```yaml
title: nodeppt markdown 演示
speaker: 三水清
url: https://github.com/ksky521/nodeppt
js:
    - https://www.echartsjs.com/asset/theme/shine.js
prismTheme: solarizedlight
plugins:
    - echarts
    - mermaid
    - katex
```
- `title`：演讲主题
- `speaker`：演讲人
- `url`：地址
- `js`：需要加载的 `js` 文件数组，将被放在 `body` 标签之前
- `css`：需要加载的 `css` 文件数组，将被放在 `head` 标签内
- `prismTheme`：`prism` 配色，取值范围 `['dark', 'coy', 'funky', 'okaidia', 'tomorrow', 'solarizedlight', 'twilight']`
- `plugins`：主题配色插件，目前支持的有 [echarts](https://github.com/ksky521/nodeppt/blob/master/site/echarts.md) 、[mermaid](https://github.com/ksky521/nodeppt/blob/master/site/mermaid.md) 、[katex](https://www.npmjs.com/package/markdown-it-katex)

#### <slide> 语法