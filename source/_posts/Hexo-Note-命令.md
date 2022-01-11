---
title: Hexo Note - 命令
date: 2022-01-09 15:17:57
tags: [Hexo]
categories: [Hexo]
---
### init
```bash
$ hexo init projectName
```
初始化 Hexo 网址项目，在上一节中已经提到过。[Hexo Note - 初始化及常用配置](/2022/01/05/Hexo-Note-初始化及常用配置)

### new
```bash
$ hexo new [layout] <title>
```
- `layout`: 创建的页面类型。通常有`post`和`page`，默认是`post`，因此在使用时，省略此参数表明创建的是post类型的页面，
  - `post`：普通的博文，会在首页和归档中列出。
  - `page`：独立的页面，不会展示在首页和归档页，如标签页、自定义的404页面等。

其他可选参数：

| 参数 | 描述 |
| :---: | --- |
| `-p， --path` | 自定义新博文的路径 |
| `-r, --replace` | 如果存在同名博文，将其替换 |
| `-s, --slug` | 博文的 Slug，作为新博文的文件名和发布后的 URL |
&ensp;&ensp;默认情况下，Hexo 或根据`permalink`配置，及文件名称来决定博文生成的路径。如果创建的是独立页面，则使用文件名来在`sources`目录下生成相应的目录，并在目录下生成`index.md`文件。
### generate
```bash
$ hexo generate
```
生成可直接访问的网站静态文件。<br />
其他可选参数：

| 参数 | 描述 |
| :---: | --- |
| `-d, --deploy` | 文件生成后立即部署网站 |
| `-w, --watch` | 监视文件变动 |
| `-b, --bail` | 生成过程中如果发生任何未处理的异常则抛出异常 |
| `-f, --force` | 强制重新生成文件，Hexo 引入了差分机制，如果 `public` 目录存在，那么 `hexo g` 只会重新生成改动的文件。使用该参数的效果接近 `hexo clean && hexo generate` |
| `-c, --concurrency` | 最大同时生成文件的数量，默认无限制 |
### server
```bash
$ hexo server
```
本地启动服务器。默认情况下，访问网址为：`http://localhost:4000/` <br />
其他可选参数：

| 参数 | 描述 |
| :---: | --- |
| `-p, --port` | 重新指定端口 |
| `-s, --static` | 只使用静态文件 |
| `-l, --log` | 启动日记记录，使用覆盖记录格式 |
### clean
```bash
$ hexo clean
```
清除缓存文件 (db.json) 和已生成的静态文件 (public)。<br />
在某些情况（尤其是更换主题后），如果发现您对站点的更改无论如何也不生效，您可能需要运行该命令。