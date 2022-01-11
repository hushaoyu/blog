---
title: Markdown using document
date: 2022-01-05 13:35:07
tags: 
- Markdown
- handbook
categories:
- handbook
- Markdown
---
# [基本语法](https://markdown.com.cn/basic-syntax/ "官方文档")
### 标题
#### 1、一个 '#' 表示一级标题，两个表示二级标题，依此类推，对应 h1 ~ h6
### 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
***
### 段落
#### 1、直接使用空白行来标记行分割
content1

content2
***
### 换行
#### 1、在内容末尾使用br，可创建换行
`例子：在内容末尾使用br，可创<br />建换行`<br />
例子：在内容末尾使用br，可创<br />建换行
***
### 强调
#### 1、在需要强调的内容前后使用两个星号进行标记
`这段文字中，地名是需要强调的，如：**北京**是个美丽的城市，**杭州**也是`<br />
这段文字中，地名是需要强调的，如：**北京**是个美丽的城市，**杭州**也是
***
### 引用
#### 1、块引用：使用 '>' 符号，多行引用，使用空 '>' 隔开
> import
> 
> import
#### 2、嵌套引用：后面多一个 '>'，表示被嵌套，如 '>>'
> first
>> second
#### 3、包含其他Markdown语法的引用
> content
> 
> - list
> 
> *Everything* is going ware;
***
### 列表
#### 1、有序列表：使用数字加英文句号进行标记，英文句号需要与后续内容间隔一个空格语法才生效
1. 第一行
2. 第二行

#### 2、无序列表：使用连字符 '-'。子级列表，使用两个空格递进表示层级。
- 第一行
- 第二行
  - 子行
***
### 代码
#### 1、代码块使用反引号包裹 ``
`这里面的是代码块内容，里层再次使用反引号，可识别Markdown语法，如``<br />`` `<br />` 标签就是被识别的效果`
***
### 分割线
#### 1、分割线使用三个连续的星号（最佳实践：在星号前后使用空白行）
***
### 链接
#### 1、链接文本放在中括号内，链接地址放在紧跟其后的小括号内，小括号内第一个值为超链接，第二个使用双引号包裹的为title
`[这是一个链接](https://www.baidu.com "这是一个百度地址")`<br />
[这是一个链接](https://www.baidu.com "这是一个百度地址")
#### 2、带格式化的链接
`这是一个 **[百度](https://www.baidu.com "这是一个百度地址")** 链接`<br />
这是一个 **[百度](https://www.baidu.com "这是一个百度地址")** 链接
***
### 图片
#### 1、与使用超链接类似，只是在最前面加了感叹号，中括号内的为图片的替代文本，即alt属性
`![这是图片](/assets/img/philly-magic-garden.jpg "Magic Gardens")`
![这是图片](https://upload.wikimedia.org/wikipedia/commons/a/a6/Future_Splash_Animator_icon.png "Animate")
#### 2、带超链接的图片：先使用中括号包裹图片语法内容，再在中括号后面加一个小括号，放入超链接地址
`[![这是图片](https://upload.wikimedia.org/wikipedia/commons/a/a6/Future_Splash_Animator_icon.png "Animate")](https://en.wikipedia.org/wiki/File:Future_Splash_Animator_icon.png)`
[![这是图片](https://upload.wikimedia.org/wikipedia/commons/a/a6/Future_Splash_Animator_icon.png "Animate")](https://en.wikipedia.org/wiki/File:Future_Splash_Animator_icon.png)
***
### 转义符
***
### 内嵌 HTML 标签
#### 1、自定义样式
`使用样式自定义<span style="color: rgb(255,3,255);margin: 0 5px;">标签</span>样式`

使用样式自定义<span style="color: rgb(255,3,255);margin: 0 5px;">标签</span>样式
# [扩展语法](https://markdown.com.cn/extended-syntax/ "官方文档")
### <span id="extend-table">表格</span>
#### 1、基本用法：使用管道符分割列，使用三个或多个连字符创建列标题
`| syntax | description | `<br />`
| --- | --- | `<br />`
| header | title | `<br />`
| name | value | `<br />`
| name | value |`

| syntax | description |
| --- | --- |
| header | title |
| name | value |
| name | value |
#### 2、内容对齐：在连字符前后加冒号，左边冒号表示左对齐，右边表示右对齐，两侧都有表示居中
`| syntax | description | other | `<br />`
| :--- | :---: | ---: | `<br />`
| 1 | title | 1 | `<br />`
| 1 | value | 1 | `<br />`
| 1 | value | 1 |`

| syntax | description | other |
| :--- | :---: | ---: |
| 1 | title | 1 |
| 1 | value | 1 |
| 1 | value | 1 |
### 围栏代码块
#### 1、使用三个反引号```包裹表示围栏代码块，如果只用单个反引号包裹，只会形成一行
```
{
  "key": 1,
  "name": "test",
  "value": 2
}
```
`{
  "key": 1,
  "name": "test",
  "value": 2
}`
#### 2、语法高亮：在第一个三个反引号后面，加上高亮所使用的语法，取值有：json、bash、javascript等
- `json：`
```json
{
  "key": 1,
  "name": "test",
  "value": 2
}
```
- `bash：`
```bash
$ midkr test
```
- `javascript：`
```javascript
const a = 'test';
console.log(a);
```

### 脚注
#### 1、方括号内，使用上标符号接其他标识符
这里面的内容包含[^1]脚注。

[^1]: this is a
### 标题ID和锚点
#### 1、标题内容使用内嵌html标签的形式提供id
`### <span id="extend-table">表格</span>`
#### 2、使用中括号包含描点文本内容，后接小括号提供id
`[跳至表格](#extend-table)`
<br />
[跳至表格](#extend-table)
### 删除线
#### 1、使用双波浪号~~
`~~内容删除~~`<br />
~~内容删除~~
### 任务列表语法
#### 1、使用 -/*/+ 和方括号表示，方括号内输入x表示任务已完成。方括号前后均需空格，空复选框也需要空格
```
- [x] 起床
* [ ] 洗漱
+ [ ] 吃早餐
```

- [x] 起床
* [ ] 洗漱
+ [ ] 吃早餐

### [使用emoji表情](https://emojipedia.org/)
```
- 🏜️ 第一次使用表情
- 🎄 圣诞树
```
# 其他
#### 中文段落缩进两个字符,使用`&ensp;`；
`&ensp;&ensp;这是一段缩进两个字符的文本`<br />
&ensp;&ensp;这是一段缩进两个字符的文本
#### 站内博文间跳转
- 相对路径
  - 在站点的根配置文件中，```permalink```参数指定了博文的生成格式：```permalink: :year/:month/:day/:title/```，因此在是使用相对路径时，需要根据日期递归到根目录再寻址到需要跳转的博文路径：<br />
  ```bash
  [Markdown站内手册](../../../../2022/01/05/Markdown-using-document)```
- 绝对路径
  - 同样根据博文的生成格式，将博文从根路径开始，将绝对路径表示出来：
  ```bash
  [Markdown站内手册](/2022/01/05/Markdown-using-document)
  ```
- post_link
  - 待研究