---
title: Hexo Note - 使用NexT主题
date: 2022-01-10 10:08:41
tags: [Hexo]
categories: [Hexo]
---
#### 简介
> &ensp;&ensp;«NexT» is a high quality elegant Hexo theme. It is crafted from scratch with love.
### 安装
#### 安装
- 进入hexo项目根目录，执行以下代码，将主题克隆至themes文件夹：
```bash
$ cd hexo
$ git clone https://github.com/theme-next/hexo-theme-next themes/next
```
- 在项目的根配置文件 `_config.yml` 中，将 `theme` 的配置值修改为  `next` 应用主题，重新执行构建命令更新程序。
```yaml
theme: next
```
- `Tips`：每次更新项目需要执行 `hexo clean && hexo g && hexo s` 才能应用本地更新，略显麻烦，可以在 `package.json` 文件中添加 `start` 命令，有改动只需要执行 `npm start` 就可以了
```yaml
"start": "hexo clean && hexo g && gulp && hexo s"
```

### 配置
#### 主题切换
- NexT默认集成了4中主题模式，`Gemini`、`Mist`、`Muse`、`Pisces`。在项目配置文件中修改 `scheme` 来应用不同的主题模式。

#### 隐藏网站页面底部的 `powered by`
- 在文件 `themes/next/layout/_partials/footer.swig` 中，将 `footer.powered` 代码块使用 `<!-- -->` 注释掉。
```bash
<!--
{%- if theme.footer.powered %}
  <div class="powered-by">
    {%- set next_site = 'https://theme-next.org' %}
    {%- if theme.scheme !== 'Gemini' %}
      {%- set next_site = 'https://' + theme.scheme | lower + '.theme-next.org' %}
    {%- endif %}
    {{- __('footer.powered', next_url('https://hexo.io', 'Hexo', {class: 'theme-link'}) + ' & ' + next_url(next_site, 'NexT.' + theme.scheme, {class: 'theme-link'})) }}
  </div>
{%- endif %}
-->
```

#### 文章添加阴影
- 在文件 `themes/next/source/css/_common/components/post/post.styl` 中添加如下样式：
```css
.post {
  margin-top: 20px;
  -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
  -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
}
```

#### 设置各板块的背景透明度
- 在文件 `themes/next/source/css/_schemes/Pisces/_layout.styl` 中可以看到，板块的 `background` 属性，配置的都是 `--content-bg-color` 变量，因此我们只需找到这个变量所在的位置进行修改既可以了。
- 在项目中搜索，可以找到是在 `themes/next/source/css/_variables/base.styl` 文件中进行配置的，将其值修改如下
```scss
$body-bg-color = rgba(255,255,255,.8);
$content-bg-color = rgba(255,255,255,.8);
```

#### 设置网站图标 `favicon.ico`
- 在文件夹 `/themes/next/source/images` 中，有不同场景不同格式的网站图标，根据格式进行替换。
- 其他可自定义配置图标
  - `avatar.gif`：网站个人介绍logo
- ![网站图标](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/favicon.png)

#### 修改博客底部标签样式
- 在文件 `/themes/next/layout/_macro/post.swig` 中，搜索 `rel="tag"`，将`#`替换成 `<i class="fa fa-tag"></i>`
- ![文章底部标签](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/article_tag.png)

#### 显示当前页面的浏览进度
- NexT默认已经集成该功能，在主题配置文件中，将 `scrollpercent` 的配置值设置为 `true`，在页面右下角即可看到图标。
```yaml
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: false
  # Scroll percent label in b2t button.
  scrollpercent: true
```

#### 修改链接文字样式
- 在文件 `themes/next/source/css/_common/components/post/post.styl` 中，添加以下代码
```less
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  &:hover {
    color: #ff106c;
    text-decoration: underline;
  }
}
```

#### 设置头像的悬停效果
- 在主题配置文件中，找到 `avatar` 配置，将其 `rotated` 属性设置为 `true`
```yaml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  url: /images/avatar.gif
  # If true, the avatar will be dispalyed in circle.
  rounded: true
  # If true, the avatar will be rotated with the cursor.
  rotated: true
```

#### 根据发布的博客自动生成首页
- 根目录执行代码，安装插件 [hexo-excerpt](https://github.com/chekun/hexo-excerpt)
```bash
$ npm install hexo-excerpt --save
```
- 在主题配置文件中将 `excerpt_description` 的配置值设置为true，另外在根项目中增加以下内容：
```yaml
# 首页
excerpt:
  depth: 2  #按层来算，也就是按代码块来算，截取博文多少层的内容来显示在主页
  excerpt_excludes: []
  more_excludes: []
  hideWholePostExcerpts: true
```
- [在线预览](https://hushaoyu.github.io/)
- ![首页](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/home.png)

#### 首页阅读更多按钮样式更改
- 在文件 `themes/next/source/css/_common/components/post/post.styl` 中添加如下样式：
```css
.post-button .btn:hover {
  color: rgb(255, 255, 255) !important;
  border-radius: 3px;
  font-size: 15px;
  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
  background-image: linear-gradient(90deg, #a166ab 0%, #ef4e7b 25%, #f37055 50%, #ef4e7b 75%, #a166ab 100%);
}
```

#### 暗黑模式切换
- 根目录执行代码，安装插件 [Hexo NexT Darkmode](https://github.com/rqh656418510/hexo-next-darkmode/blob/main/README_CN.md)
```bash
$ npm install hexo-next-darkmode --save
```
- 在主题配置文件中，首先将NexT默认的暗黑主题设置为 `false` ：
  - ```darkmode: false```
- 之后添加如下配置：
```yaml
darkmode_js:
  enable: true
  bottom: '64px' # default: '32px'
  right: '100px' # default: '32px'
  left: 'unset' # default: 'unset'
  time: '0.5s' # default: '0.3s'
  mixColor: 'transparent' # default: '#fff'
  backgroundColor: 'transparent' # default: '#fff'
  buttonColorDark: '#100f2c' # default: '#100f2c'
  buttonColorLight: '#fff' # default: '#fff'
  isActivated: true # default false
  saveInCookies: true # default: true
  label: '🌓' # default: ''
  autoMatchOsTheme: true # default: true
  libUrl: # Set custom library cdn url for Darkmode.js
```
- 默认激活暗黑/夜间模式，请始终与 `saveInCookies: false`、`autoMatchOsTheme: false` 一起使用
- ![主题暗黑模式切换](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/theme_mode.png)

#### 博文加密访问
- NexT默认集成加密访问功能，在文件 `themes/next/layout/_partials/head/head.swig` 中添加如下代码：
```bash
#JavaScript
<script>
    (function(){
        if('{{ page.password }}'){
            if (prompt('请输入密码') !== '{{ page.password }}'){
                alert('密码错误');
                history.back();
            }
        }
    })();
</script>
```
- 之后在需要加密访问的博客中，在头部添加 `password` 配置即可开启：
```bash
password: 123456
```
- 默认的加密访问功能，在样式上并不优美，我们可以使用第三方的插件来实现这个功能。根项目安装插件
```bash
$ npm install --save hexo-blog-encrypt
```
- [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt)
- 在根项目的配置文件中增加如下配置
```yaml
encrypt:
    enable: true
```
- 然后和之前一样，在需要进行加密的博文中，配置相应的 `password` 属性即可生效。
- 这种将密码配置到博文中的方式，灵活性不足，如果需要统一配置和更改密码，需要在每个博文中修改一遍。为解决这种问题，插件允许通过指定 `tag` 来进行加密，并且不同的 `tag` 可以指定不同的密码。同样在根项目的配置文件中，修改之前的 `encrypt` 配置
```yaml
# 文章加密访问
encrypt:
  enable: true
  silent: true
  theme: surge
  tags:
    - {name: encrypt, password: 123456}
  abstract: 博文已加密，请提供密码查看！
  message: 输入密码，查看文章
  wrong_pass_message: 密码验证失败，请提供正确的密码.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
```
- 设置 `tags` 属性，指定 `tag` 的 `name` 和 `password` 属性，同时在需要进行加密的博文中，设置此 `tag` 值
```yaml
tags: [web, ThreeJS, React, encrypt]
```
- ![需要加密访问](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/password_needed.png)
- ![确认密码](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/password_confirm.png)

#### 增加文章字数统计及阅读时长功能
- 根项目中安装插件 [hexo-symbols-count-time](https://github.com/theme-next/hexo-symbols-count-time)
```bash
$ npm install hexo-symbols-count-time --save
```
- 在主题配置文件中，搜索 `symbols_count_time` 配置，NexT默认已经集成此配置，安装插件后重新构建部署即可生效
```yaml
symbols_count_time:
  separated_meta: true
  item_text_post: true
  item_text_total: false
```
- ![博文字数及阅读时长统计](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/word_count.png)

#### 代码复制成功反馈
- NexT默认已经集成代码复制功能，但是复制成功的反馈默认是禁用的，在主题配置文件中，搜索 `codeblock` ，将其 `show_result` 值设置为 `true`
```yaml
codeblock:
  highlight_theme: 'night eighties'
  copy_button:
    enable: true
    # Show text copy result.
    show_result: false
    style: flat
```

#### 开启页面加载进度条
- 进入到next主题文件目录下执行命令，将插件克隆至主题文件中，[文档](https://github.com/theme-next/theme-next-pace)
```bash
$ git clone https://github.com/theme-next/theme-next-pace source/lib/pace
```
- 在主题配置文件中，修改 `pace` 的配置，可以通过修改 `theme` 以应用不同的进度条主题样式。
```yaml
pace:
  enable: true
  # Themes list:
  # big-counter | bounce | barber-shop | center-atom | center-circle | center-radar | center-simple
  # corner-indicator | fill-left | flat-top | flash | loading-bar | mac-osx | material | minimal
  theme: minimal
```

#### 博文支持评论
- NexT支持多种评论插件，可选值有：`changyan` 、 `disqus` 、 `disqusjs` 、 `gitalk` | `livere` | `valine`，本文使用的是 [valine](https://valine.js.org/quickstart.html)
- 根据文档提示操作，注册账号、应用，获取到 `appId` 和 `appKey`，在主题配置文件中修改配置
  - 设置当前评论模块使用的插件
  ```yaml
  comments:
    # Available values: tabs | buttons
    style: tabs
    # Choose a comment system to be displayed by default.
    # Available values: changyan | disqus | disqusjs | gitalk | livere | valine
    active: valine
  ```
  - `valine` 配置 `appId` 和 `appKey`，其他更多的配置参考官方文档说明
  ```yaml
  valine:
    enable: true
    appid: xxxx # Your leancloud application appid
    appkey: xxxx # Your leancloud application appkey
  ```
- ![评论区](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/comment.png)
#### 集成网易云音乐
- 打开网易云网页版，搜索需要添加的歌曲，复制歌曲的外链信息，将其添加到 `themes/next/layout/_macro/sidebar.swig` 文件中，代码放置位置取决于你想让面板显示在哪个位置
```html
<!-- 网易云音乐 -->
<div id="music163player">
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1901049671&auto=1&height=66"></iframe>
</div>
```
- ![网易云音乐](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/wyy_music.png)

#### 标签页美化
- 在 `/themes/next/layout/` 目录下新建文件 `tag-color.swig` 文件，、填入以下代码
```html
<script type="text/javascript">
     var alltags = document.getElementsByClassName('tag-cloud-tags');
     var tags = alltags[0].getElementsByTagName('a');
     for (var i = tags.length - 1; i >= 0; i--) {
       var r=Math.floor(Math.random()*75+130);
       var g=Math.floor(Math.random()*75+100);
       var b=Math.floor(Math.random()*75+80);
       tags[i].style.background = "rgb("+r+","+g+","+b+")";
     }
</script>

<style>
  .tag-cloud-tags{
    /*font-family: Helvetica, Tahoma, Arial;*/
    /*font-weight: 100;*/
    text-align: center;
    counter-reset: tags;
  }
  .tag-cloud-tags a{
    border-radius: 6px;
    padding-right: 5px;
    padding-left: 5px;
    margin: 8px 5px 0px 0px;
  }
  .tag-cloud-tags a:before{
    content: "";
  }

  .tag-cloud-tags a:hover{
     box-shadow: 0px 5px 15px 0px rgba(0,0,0,.4);
     transform: scale(1.1);
     /*box-shadow: 10px 10px 15px 2px rgba(0,0,0,.12), 0 0 6px 0 rgba(104, 104, 105, 0.1);*/
     transition-duration: 0.15s;
  }
</style>
```
- 在 `/themes/next/layout/page.swig` 文件中引入上面新增的文件
```html
{%- if page.type === 'tags' %}
<div class="tag-cloud">
  <div class="tag-cloud-tags" id="tags">
    {{ tagcloud({min_font: 16, max_font: 16, amount: 300, color: true, start_color: '#FFF', end_color: '#FFF'}) }}
  </div>
</div>
{% include 'tag-color.swig' %}
```
- 重新构建部署项目，即可查看效果。[在线预览](https://hushaoyu.github.io/tags/)
- ![标签页](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/tag_page.png)

#### 标签云
- 使用插件 [hexo-tag-cloud](https://github.com/D0n9X1n/hexo-tag-cloud/blob/master/README.ZH.md)
```bash
$ npm install hexo-tag-cloud --save
```
- 在 `themes/next/layout/_macro/sidebar.swig` 文件中添加如下代码，重新执行 `npm start` 可查看效果
```html
<!-- 标签云 -->
{% if site.tags.length > 1 %}
<script type="text/javascript" charset="utf-8" src="{{ url_for('/js/tagcloud.js') }}"></script>
<script type="text/javascript" charset="utf-8" src="{{ url_for('/js/tagcanvas.js') }}"></script>
<div class="widget-wrap">
    <h3 class="widget-title">Tag Cloud</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
        <canvas width="250" height="250" id="resCanvas" style="width:100%">
            {{ list_tags() }}
        </canvas>
    </div>
</div>
{% endif %}
```
- 在根项目的配置文件中，增加对标签云的属性配置
```yaml
# 标签云
tag_cloud:
  textFont: Trebuchet MS, Helvetica     # 字体
  textColor: '#333'                     # 字体颜色
  textHeight: 25                        # 字体大小
  outlineColor: '#E2E1D1'
  maxSpeed: 0.3                         # 旋转速度
  pauseOnSelected: false                # 当选中对应标签时，是否停止转动
```
- ![标签云](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/tag_cloud.png)

#### 搜索
- 在根项目安装插件
```bash
$ npm install hexo-algolia --save
```
- NexT主题已经默认集成了一部分参数配置，并且在页面的左侧 `Slider` 区域也有搜索的快捷菜单，在主题配置文件中，搜索 `algolia_search`，将 `enable` 值设置为 `true`，启用该搜索功能。`hits.per_page` 表示搜索结果分页大小，`labels` 可以设置搜索匹配提示文本。
- 需要让搜索功能真正生效，还需要在根项目配置文件中增加 `algolia` 的账号配置信息
```yaml
# search
algolia:
  applicationID: "xxx"
  apiKey: "xxxxx"
  indexName: "indexName"
```
- 配置的信息需要注册 `algolia` 账号才能获取。可点击 [algolia](https://www.algolia.com/) 跳转进行注册。
  - 注册账号后，注册一个应用，应用选择免费版本的。创建应用后在左侧菜单点击 `Data Source`，选择 `Indices`，创建一个新的索引，索引名称是博客网站需要配置的一个值，后面会用到。
  - ![创建索引](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/create_index.png)
  - 回到 `Overview` 总览面板，点击 `API Keys`，在面板可以看到注册的应用的 `application ID`。创建新的key，其中的 `Indices` 选择之前创建的索引，下方的 `ACL` 权限控制，设置值为：`search`、`addObject`、`deleteObject`、`addInde`、`deleteIndex`，其他值默认，然后点击确认创建。
  - ![application ID](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/algolia_appId.png)
  - ![创建API Keys](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/algolia_apiKey.png)
  - 将上述生成的 `application ID`、`apiKey`、`indexName` 填入到配置文件中。
- 执行以下命令，将网站的博文生成可搜索的静态资源
  - **每次博文有更新，需要部署时，都需要先执行以下命令，再执行构建部署命令，否则更新后的内容，在搜索数据库中是没有更新的。**
```bash
$ export HEXO_ALGOLIA_INDEXING_KEY='0f04bd99beb506cc014d144974134458'
$ export HEXO_ALGOLIA_INDEXING_KEY
$ hexo algolia
```
- 重新运行项目，点击左侧的搜索，正常情况下，会出现弹框，输入任意内容，即可显示出搜索结果
- ![搜索结果](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Hexo-Note-%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98/algolia_search_result.png)