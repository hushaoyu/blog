---
title: React插件 - react-codemirror2
date: 2022-01-23 09:42:36
tags: [React, 插件, react-codemirror2]
categories: [React, 插件]
---
#### 简介
- `react-codemirror2` 是基于 `CodeMirror` 工作原理，可以在React环境中直接使用的一个代码编辑器。
> &ensp;&ensp; [CodeMirror](https://codemirror.net/) 是一个用 `JavaScript` 为浏览器实现的通用文本编辑器。它专门用于编辑代码，并带有多种语言模式和插件，可实现更高级的编辑功能。

#### 开始
- 安装
```bash
$ npm install react-codemirror2 codemirror --save
```
- 组件：`UnControlled` 和 `Controlled`
  - `react-codemirror2` 有两种组件，一种是由 `codemirror` 本身内部的工作原理提供功能支持，非受控的组件 `UnControlled`；一种是通过 `React` 的状态 `State` 来进行数据控制的受控组件 `Controlled`。
- 文件说明

![文件目录](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/plugins-files-desc.png)

| 目录 | 说明 |
| --- | --- |
| addon | 可选的扩展功能配件 |
| mode | 编辑器当前支持的语言类型 |
| src | |
| theme | 编辑器的样式主题 |
- 特性
  - 支持超过 [100种](https://codemirror.net/mode/index.html) 开箱即用的语言
  - 强大的、[可组合](#页内跳转) 的语言模式系统
  - [代码提示，自动完成](https://codemirror.net/doc/manual.html#addon_show-hint) 提示功能
  - [代码折叠](https://codemirror.net/doc/manual.html#addon_foldcode)
  - 可配置的 [快捷键绑定](https://codemirror.net/doc/manual.html#option_extraKeys)
  - 可配置的，基于 [Vim](https://codemirror.net/demo/vim.html) 、[Emacs](https://codemirror.net/demo/emacs.html) 、[Sublime Text](https://codemirror.net/demo/sublime.html) 的键映射绑定
  - [查找和替换](https://codemirror.net/doc/manual.html#addon_search) 操作界面
  - [括号](https://codemirror.net/doc/manual.html#addon_matchbrackets) 和 [标签](https://codemirror.net/doc/manual.html#addon_matchtags) 匹配
  - 支持 [拆分视图](https://codemirror.net/demo/buffers.html)
  - 集成 [lint](https://codemirror.net/doc/manual.html#addon_lint) 进行语法检测
  - 可配置的 [字体大小和样式](https://codemirror.net/demo/variableheight.html)
  - 大量的可配置 [主题](https://codemirror.net/demo/theme.html)
  - 能够调整大小以 [自适应内容](https://codemirror.net/demo/resize.html)
  - [内联](https://codemirror.net/doc/manual.html#mark_replacedWith) 和 [块级](https://codemirror.net/doc/manual.html#mark_replacedWith) 的小部件
  - 文本标记：[受控样式](https://codemirror.net/doc/manual.html#mark_replacedWith) 、[只读](https://codemirror.net/doc/manual.html#markText) 、[原子](https://codemirror.net/doc/manual.html#markText)
  - [双向文本支持](https://codemirror.net/demo/bidi.html) ：`LRT`、`RTL`
  - [搜索功能](#)
    
#### 使用
- 文件引入
```javascript
import {Controlled as CodeMirror} from 'react-codemirror2'; // 受控组件
import 'codemirror/lib/codemirror.css'; // 编辑器主体样式
import 'codemirror/theme/material-darker.css'; // 编辑器使用 material-darker 主题
import 'codemirror/mode/properties/properties.js'; // 编辑器代码语言支持：properties 配置文件
```
- 组件配置
```javascript
state = {
    value: _.get(this.props, 'initialValue', undefined),
}
editorChange = (editor, data, value) => {
    // 受控组件设置编辑器内容
    this.setState({
        value
    });
}
<CodeMirror
    value={this.state.value}
    options={{
        width: 300,
        mode: 'properties', // 编辑器语言，需引入语言js文件
        theme: 'material-darker', // 主题配置，需要引入主题样式文件
        lineNumbers: true,        // 显示行号
    }}
    onBeforeChange={this.editorChange}
/>
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/editor-demo.png)

#### 可组合的语言模式
- 编辑器可配置显示多种语言，如常见的 `html` 文件，就包含三种语言： `html`、`JavaScript`、`css`。官方语言模式中，`html` 文件有一个内置的集成语言模式配置值： `htmlmixed`
  > `html` 语言是基于 `xml` 语言来解析的，因此如果需要单独配置 `html` 语言支持，需要引入的是 `xml` 语言配置 `js` 文件
  - 引入语言模式文件
  ```javascript
  import 'codemirror/mode/htmlmixed/htmlmixed.js'; // 引入语言模式js文件
  ```
  - 修改配置中的 `mode` 属性
  ```yaml
  options={{
    width: 300,
    mode: 'htmlmixed',
    theme: 'material-darker',
    lineNumbers: true,              // 显示行号
  }}
  ```
  - 预览
    - 修改前
    ![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/htmlmixed-none.png)
    - 修改后
    ![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/htmlmixed-able.png)

#### 代码提示，自动完成
- 目前插件支持的代码提示有 `html`、`JavaScript`、`css`、`xml`、`sql`，以及 `anyword`，`anyword` 指在当前文本输入光标附近查找相应的词语进行自动提示。
- 以 `sql` 为例，引入相应的 `css` 样式 及 `js` 脚本
```javascript
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js';
```
- `option` 添加 `hintOptions` 配置
```yaml
options={{
    width: 300,
    mode: 'sql',
    theme: 'material-darker',
    hintOptions: {
        completeSingle: false
    },
    lineNumbers: true,              // 显示行号
    styleActiveLine: true,          // 选中行高亮
}}
```
- 在 `onBeforeChange` 方法内调用 `.showHint()` 方法
```javascript
editorChange = (editor, data, value) => {
    editor.showHint();
    this.setState({
        value
    });
    _.isFunction(this.props.editorChange) && this.props.editorChange(value);
}
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/hint-sql.gif)

#### 代码折叠
- 引入样式及脚本文件
```javascript
// 折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
```
- `option` 添加配置
```yaml
foldGutter: true,
lineWrapping: true,
gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/code_fold.png)

#### 搜索
- 引入样式及脚本文件
```javascript
// 搜索
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
```
- 使用快捷键 `ctrl + F` 查找
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/search.gif)
- 支持的快捷键

| 快捷键 | 描述 |
| --- | --- |
| `ctrl + F` | 查找 |
| `ctrl + G` | 查找下一个 |
| `shift + ctrl + F` | 查找上一个 |
| `shift + ctrl + F` | 替换 |
| `shift + ctrl + R` | 替换全部 |
- 使用图形交互执行查找替换使用快捷键
> &ensp;&ensp;对于不习惯使用快捷键方式的用户，可以提供 `UI` 控件，来唤起查找对话框
```javascript
editor = null;

mounted = editor => {
  this.editor = editor;
}

find = () => {
  this.editor && this.editor.execCommand('find');
}

<Row>
  <Col>
    <Button onClick={this.find}>查找</Button>
  </Col>
</Row>
<CodeMirror editorDidMount={this.mounted} value={this.state.value} />
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/search-ui.gif)
- 其他相关指令用法
```javascript
findNext = () => {
    this.editor && this.editor.execCommand('findNext');
}
findPrev = () => {
    this.editor && this.editor.execCommand('findPrev');
}
replace = () => {
    this.editor && this.editor.execCommand('replace');
}
replaceAll = () => {
    this.editor && this.editor.execCommand('replaceAll');
}
```
- [所有可用的指令](https://codemirror.net/doc/manual.html#commands)

#### 语法校验
- 插件目前支持语法校验有：`javaScript`、`coffeeScript`、`css`、`html`、`xml`、`json`，以下以 `JavaScript` 为例
- 引入样式及脚本文件
```javascript
// 语法错误提示
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/javascript-lint.js';
```
- `option` 内添加新的配置，启用检测
```yaml
lint: true,
```
- 启动项目，发现语法检测并没生效，并且控制台报 `JSHINT` 相关的错误
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/javaScript-lint-unwork.png)
- 查找资料，发现插件内的 `JavaScript` 检测依赖第三方插件 `jslint`，因此需要在项目中安装该插件，并全局设置该变量
```bash
$ npm install jslint --save
```
```javascript
import { JSHINT } from "jshint";
window.JSHINT = JSHINT;
```
- 重新启动项目，可以看到 `JavaScript` 语法检测生效了
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/javascript-lint-success.gif)
- 配合 `React` 的 `state` 设置，在出现语法错误时，不允许提交
```javascript
state = {
  value: _.get(this.props, 'initialValue', undefined),
  validFlag: true
}

editorChange = (editor, data, value) => {
    editor.showHint();
    // 获取校验状态
    const validFlag = this.validCheck(_.get(editor, 'state.lint.marked', []));
    this.setState({
        value,
        validFlag
    });
    _.isFunction(this.props.editorChange) && this.props.editorChange(value);
}
// 根据类名判断是否出现错误语法
validCheck = (marks) => {
  if (_.isEmpty(marks)) return true;
  const errorFlag = _.isArray(marks) && marks.findIndex(item => item.className.indexOf('error') >= 0);
  return errorFlag < 0;
}
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/React%E6%8F%92%E4%BB%B6%20-%20react-codemirror2/javascript-lint-state.gif)