---
title: HTML元素T-X
author: 怡然
createTime: 2024/06/12 16:40:05
permalink: /HTML/o9eqzmm0/
---

## 1. `<template>`：内容模板元素
> `<template>`元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以在运行时使用 JavaScript 实例化。

## 2. `<textarea>`：文本区域元素
> `<textarea>` 元素是一个多行纯文本编辑控件，适用于允许用户输入大量自由格式文本的场景，例如评论或反馈表单。

> 属性：
- `autocapitalize`: 控制输入文本是否自动大写。
- `autocomplete`: 此属性指示浏览器是否可以自动完成控件的值。可选：`off`/`on`。
- `autocorrect`: 指示在用户编辑此 textarea 时是否激活自动拼写纠正和文本替换。可选：`off`/`on`。
- `autofocus`: 此布尔属性可让你指定当页面加载时，表单控件应获取输入焦点。文档中只有一个与表单相关的元素可以指定此属性。
- `cols`: 文本控件的可见宽度，以平均字符宽度为单位。若已指定，其值必须为正整数。若未指定，默认值为20。
- `dirname`: 此属性用于指示元素内容的文本方向性。
- `disabled`: 此布尔属性表示用户无法与控件交互。
- `form`: 此属性的值必须是同一文档中某个表单元素的 `id`。
- `maxlength`: 要求用户输入的最大字符串长度（以 UTF-16 码元衡量）。如果未指定此值，用户可以输入无限数量的字符。
- `minlength`: 要求用户输入的最小字符串长度（以 UTF-16 码元衡量）。
- `name`: 控件的名称。
- `placeholder`: 占位符提示输入内容。
- `readonly`: 此布尔属性表示用户无法修改该控件的值。
- `required`: 此属性规定用户在提交表单前必须填写一个值。
- `rows`: 显示控件的指定的可见文本行数，其值必须为正整数。若未指定，默认值为2。
- `spellcheck`: 指定是否应由底层浏览器/操作系统对 `<textarea>` 进行拼写检查。
  - `true`：指示应对此元素进行拼写和语法检查。
  - `default`：指示元素应遵循默认行为，该行为可能基于其父元素自身的 `spellcheck` 值。
  - `false`：指示不应对此元素进行拼写检查。
- `wrap`: 指示控件应如何对表单提交时的值进行换行。
  - `hard`：浏览器会自动插入换行符（CR+LF），以确保每一行不超过控件宽度；要使此效果生效，必须指定 cols 属性。
  - `soft`：浏览器确保输入值中的所有换行均为 CR+LF 一对，但不会为此值添加额外的换行。
  - `off`：类似于 `soft`，但外观表现为 `white-space: pre`，即超出 `cols` 宽度的不会换行，此时 `<textarea>` 将变为水平可滚动。
  
::: normal-demo <textarea>标签
```html
<textarea name="textarea" rows="5" cols="100">君不见，黄河之水天上来，奔流到海不复回。
君不见，高堂明镜悲白发，朝如青丝暮成雪。
人生得意须尽欢，莫使金樽空对月。
天生我材必有用，千金散尽还复来。
烹羊宰牛且为乐，会须一饮三百杯。
岑夫子，丹丘生，将进酒，杯莫停。
与君歌一曲，请君为我倾耳听。
钟鼓馔玉不足贵，但愿长醉不愿醒。
古来圣贤皆寂寞，惟有饮者留其名。
陈王昔时宴平乐，斗酒十千恣欢谑。
主人何为言少钱，径须沽取对君酌。
五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。</textarea>
```
:::

## 3. `<time>`：（日期）时间元素
> `<time>` HTML 元素用来表示一个特定的时间段。该元素可包含 `datetime` 属性，用于将日期转换为机器可读格式，从而获得更好的搜索引擎结果或自定义功能（如提醒）。

> 属性：`datetime`: 该属性表示此元素的时间和/或日期，并且属性值必须符合有效的日期时间值。

::: normal-demo <time>标签
```html
<p>上班时间为 <time datetime="09:00:00">09:00</time> 至 <time datetime="18:00:00">18:00</time>。</p>
```
:::

## 4. `<title>`
> `<title>` 元素 定义文档的标题，显示在浏览器的标题栏或标签页上。
- `<title>`元素始终在页面的 `<head>` 块内使用。
- 页面标题的内容可能对搜索引擎优化（SEO）具有重要意义。通常，较长的描述性标题要比简短或一般性标题更好。标题的内容是搜索引擎算法用来确定在搜索结果中列出页面顺序的组件之一。

## 5. `<track>`
> `<track>` 元素被当作媒体元素—`<audio>` 和 `<video>`的子元素来使用。它允许指定时序文本字幕（或者基于时间的数据），例如自动处理字幕。字幕格式有 WebVTT 格式（.vtt格式文件）— Web 视频文本字幕格式，以及指时序文本标记语言（TTML）格式。

> 属性：
- `default`: 该属性定义了该 `track` 应该启用，除非用户首选项指定了更合适一个 `track`。每个媒体元素里面只有一个 `track` 元素可以有这个属性。
- `kind`: 定义了 `text track` 应该如何使用。如果省略了该属性，默认的 `kind` 值就是 `subtitles`。
  |可选值|含义|
  |:--------:|:-------:|
  |`subtitles`|字幕给观影者看不懂的内容提供了翻译。比如英文电影里非英文的对话框或者文字。字幕可能包含额外的内容，通常有附加的背景信息。|
  |`captions`|隐藏式字幕提供了音频的转录甚至是翻译。可能包含重要的非言语的信息，比如音乐提示或者音效。可以指定提示音的源文件 (e.g. music, text, character)。适用于失聪的用户或者当调成静音的时候。|
  |`descriptions`|视频内容的文本描述。适用于失明用户或者当视频不可见的场景。|
  |`chapters`|章节标题用于用户浏览媒体资源的时候。|
  |`metadata`|脚本使用的 `track`。对用户不可见。|
- `label`: 当列出可用的 `text tracks` 时，给浏览器使用的 `text track` 的标题，这种标题是用户可读的。
- `src`: track 的地址。必须是合法的 URL。该属性必须定义。
- `srclang`: `track` 文本数据的语言。它必须是合法的 BCP 47 语言标签。如果 `kind` 属性被设为 `subtitles`, 那么 `srclang` 必须定义。

```html
<video controls poster="/images/sample.gif">
   <source src="sample.mp4" type="video/mp4">
   <source src="sample.ogv" type="video/ogv">
   <track kind="captions" src="sampleCaptions.vtt" srclang="en">
   <track kind="descriptions"
     src="sampleDescriptions.vtt" srclang="en">
   <track kind="chapters" src="sampleChapters.vtt" srclang="en">
   <track kind="subtitles" src="sampleSubtitles_de.vtt" srclang="de">
   <track kind="subtitles" src="sampleSubtitles_en.vtt" srclang="en">
   <track kind="subtitles" src="sampleSubtitles_ja.vtt" srclang="ja">
   <track kind="subtitles" src="sampleSubtitles_oz.vtt" srclang="oz">
   <track kind="metadata" src="keyStage1.vtt" srclang="en"
     label="Key Stage 1">
   <track kind="metadata" src="keyStage2.vtt" srclang="en"
     label="Key Stage 2">
   <track kind="metadata" src="keyStage3.vtt" srclang="en"
     label="Key Stage 3">
   <!-- Fallback -->
   ...
</video>
```

## 6. `<u>`：未阐明的注释（下划线）元素
> 表示行内文本拥有一个非文本形式的注释，该注释需要以某种方式渲染出来。默认情况下渲染为一个实线下划线，可以用 CSS 替换。

::: normal-demo <u>标签
```html
<p>《将进酒》的作者是<u>李白</u></p>。
```
:::

## 7. `<var>`：表示变量的元素
> `<var>` 元素表示数学表达式或编程上下文中的变量名称。它通常使用当前字体的斜体版本来显示，不过这种行为取决于浏览器。

::: normal-demo <var>标签
```html
<p>一个简单的方程式：<var>x</var> = <var>y</var> + 2</p>
```
:::

## 8. `<video>`：视频嵌入元素
> `<video>`元素用于在文档中嵌入媒体播放器，用于支持文档内的视频播放。

> 属性与`<audio>`标签的大多数属性一致。不同的有以下几个属性：
- `controlslist`: 当浏览器显示视频底部的播放控制面板（例如，指定了 `controls` 属性）时，`controlslist` 属性会帮助浏览器选择在控制面板上显示哪些 `video` 元素控件。允许的值有 `nodownload`、`nofullscreen` 和 `noremoteplayback`。
- `disablepictureinpicture`: 防止浏览器显示画中画上下文菜单或在某些情况下自动请求画中画模式。
- `playsinline`: 一个布尔属性，指明视频将内嵌（inline）播放，即在元素的播放区域内。
- `poster`: 海报帧图片 URL，用于在视频处于下载中的状态时显示。如果未指定该属性，则在视频第一帧可用之前不会显示任何内容，然后将视频的第一帧会作为海报（poster）帧来显示。

> 事件与`<audio>`标签的大多数事件一致。不同的有以下一个事件：
- `progress`: 在浏览器加载资源期间周期性触发。

## 9. `<wbr>`：换行机会元素
> `<wbr>` 元素表示一个单词可以选择在此处换行，即使其换行规则不会在此处换行。

::: normal-demo <wbr>换行标签
```html
<p>
  http://this<wbr />.is<wbr />.a<wbr />.really<wbr />.long<wbr />.example<wbr />.com/With<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages
</p>
```
:::