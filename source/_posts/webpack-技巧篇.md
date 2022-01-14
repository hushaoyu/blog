---
title: webpack - 技巧篇
date: 2022-01-14 09:56:14
tags: [webpack]
categories: [webpack]
---
#### 打包图片资源
- 安装 `loader`
```bash
$ npm install --save-dev file-loader
```
- 在 `webpack.config.js` 文件的规则中添加配置
```yaml
{
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader']
}
```