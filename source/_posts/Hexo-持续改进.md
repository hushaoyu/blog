---
title: Hexo - 持续改进
date: 2022-01-24 16:04:40
tags: [Hexo]
categories: [Hexo]
---
#### 表格样式改进
- 在 `themes/next/source/css` 目录下新建目录 `_custom`，并新建表格样式文件 `table.css`，样式内容如下：

```css
table {
  width: 100%; /*表格宽度*/
  max-width: 65em; /*表格最大宽度，避免表格过宽*/
  border: 1px solid #dedede; /*表格外边框设置*/
  margin: 15px auto; /*外边距*/
  border-collapse: collapse; /*使用单一线条的边框*/
  empty-cells: show; /*单元格无内容依旧绘制边框*/
  border-radius: 4px;
}

table th,table td {
  height: 35px; /*统一每一行的默认高度*/
  border: 1px solid #dedede; /*内部边框样式*/
  padding: 0 10px; /*内边距*/
}
table th {
  font-weight: bold; /*加粗*/
  text-align: center !important; /*内容居中，加上 !important 避免被 Markdown 样式覆盖*/
  background: rgba(158,188,226,0.2); /*背景色*/
}
table th {
  white-space: nowrap; /*表头内容强制在一行显示*/
}
table td:nth-child(1) {
  /*首列不换行*/
  white-space: nowrap;
}
table tbody tr:nth-child(2n) {
  /*隔行变色*/
  background: rgba(102, 128, 153, 0.05);
}
table tr:hover {
  background: rgba(245, 166, 5, 0.77);
}
```
- 在 `themes/next/source/css/main.styl` 文件的最底部，引入表格样式文件
> 注意：引用的文件路径为相对该 `main.styl` 的路径
```css
@import "_custom/table.css";
```
- 样式更改前后对比
  - 更改前
    ![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo%20-%20%E6%8C%81%E7%BB%AD%E6%94%B9%E8%BF%9B/table_css_unchange.png)
  - 更改后
    ![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo%20-%20%E6%8C%81%E7%BB%AD%E6%94%B9%E8%BF%9B/table_css_changed.png)