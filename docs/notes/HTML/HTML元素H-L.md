---
title: HTML元素H-L
author: 怡然
createTime: 2024/06/06 16:47:05
permalink: /HTML/et7notcs/
---

## 1. `<h1>`–`<h6>`：HTML 区域标题元素
- 用户代理可以使用标题信息，例如自动构建文档的目录。
- 不要为了减小标题的字体而使用低级别的标题，而是使用 CSS `font-size` 属性。
- 避免跳过某级标题：始终要从 `<h1>` 开始，接下来依次使用 `<h2>` 等等。

## 2. `<head>`：文档元数据（头部）元素
- `<head>` 元素包含机器可读的文档相关信息（元数据），如文档的标题、脚本和样式表。
```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>文档标题</title>
  </head>
</html>
```

## 3. `<header>`
> - `<header>` 元素用于展示介绍性内容，通常包含一组介绍性的或是辅助导航的实用元素。它可能包含一些标题元素，但也可能包含其他元素，比如 Logo、搜索框、作者名称，等等。
> 
> - `<header>` 元素不是分段内容，因此不会往 大纲 中引入新的段落。也就是说，`<header>` 元素通常用于包含周围部分的标题（`h1` 至 `h6` 元素），但这不是必需的。

## 4. `<hgroup>`
> `<hgroup>` 代表文档标题和与标题相关联的内容，它将一个 `<h1>`–`<h6>` 元素与一个或多个 `<p>` 元素组合在一起。

```html
<!doctype html>
<title>HTML 标准</title>
<body>
  <hgroup id="document-title">
    <h1>HTML：现行标准</h1>
    <p>更新于 2022 年 7 月 12 日</p>
  </hgroup>
  <p>文档的介绍。</p>
  <h2>目录</h2>
  <ol id="toc">
    …
  </ol>
  <h2>第一节</h2>
  <p>第一节的介绍。</p>
</body>
```

## 5. `<hr>`：主题分割（水平分割线）元素
::: normal-demo <hr>标签
```html
<p>这是文本的第一段。这是文本的第一段。这是文本的第一段。这是文本的第一段。</p>
<hr />
<p>这是文本的第二段。这是文本的第二段。这是文本的第二段。这是文本的第二段。</p>
```
:::

## 6. `<html>`：HTML 文档/根元素
> `<html>` 元素表示一个 HTML 文档的根（顶级元素），所以它也被称为根元素。所有其他元素必须是此元素的后代。

```html
<!doctype html>
<html lang="zh">
  <head>
    <!-- … -->
  </head>
  <body>
    <!-- … -->
  </body>
</html>
```

## 7. `<i>`：术语文本元素
> `<i>` 用于表现因某些原因需要区分普通文本的一系列文本。例如技术术语、外文短语或是小说中人物的思想活动等，它的内容通常以斜体显示。

::: normal-demo <i>
```html
<p>
  The Latin phrase <i class="latin">Veni, vidi, vici</i> is often mentioned in
  music, art, and literature
</p>
```
:::

## 8. `<iframe>`：HTML 内联框架元素
> 能够将另一个 HTML 页面嵌入到当前页面中。

### 8.1 属性
1. `allow`：用于为`<iframe>`指定其特征策略。
   - `allow="fullscreen"`：可以通过调用 `<iframe>` 的 `requestFullscreen()` 方法激活全屏模式。 
   - `allow="payment"`：跨域的 `<iframe>` 可以调用 `Payment Request API`。
2. `csp`：对嵌入的资源配置内容安全策略。指定了嵌入文档必须同意对自己执行的内容安全策略。
3. `height`：以 CSS 像素格式，或百分比格式指定 `frame` 的高度。默认值为150。
4. `importance`：表示 `<iframe>` 的 `src` 属性指定的资源的加载优先级。允许的值有：
   - `auto (default)`：不指定优先级。浏览器根据自身情况决定资源的加载顺序。
   - `high`：资源的加载优先级较高。
   - `low`：资源的加载优先级较低。
5. `name`：用于定位嵌入的浏览上下文的名称。该名称可以用作 `<a>` 标签与 `<form>` 标签的 `target` 属性值，也可以用作 `<input>` 标签和 `<button>` 标签的 `formtarget` 属性值，还可以用作 `window.open()` 方法的 `windowName` 参数值。
6. `referrerpolicy`：表示在获取 `iframe` 资源时如何发送 `referrer` 首部。
   |可选值|含义|
   |:---------:|:-------------:|
   |`no-referrer`|不发送 `Referer` 首部。|
   |`no-referrer-when-downgrade` (default)|向不受 TLS (HTTPS) 保护的 `origin` 发送请求时，不发送 `Referer` 首部。|
   |`origin`|`referrer` 首部中仅包含来源页面的源。换言之，仅包含来源页面的 `scheme`, `host`, 以及 `port`。|
   |`origin-when-cross-origin`|发起跨域请求时，仅在 `referrer` 中包含来源页面的源。发起同源请求时，仍然会在 `referrer` 中包含来源页面在服务器上的路径信息。|
   |`same-origin`|对于 `same origin`（同源）请求，发送 `referrer` 首部，否则不发送。|
   |`strict-origin`|仅当被请求页面和来源页面具有相同的协议安全等级时才发送 referrer 首部（比如从采用 HTTPS 协议的页面请求另一个采用 HTTPS 协议的页面）。如果被请求页面的协议安全等级较低，则不会发送 referrer 首部（比如从采用 HTTPS 协议的页面请求采用 HTTP 协议的页面）。|
   |`strict-origin-when-cross-origin`|当发起同源请求时，在 `referrer` 首部中包含完整的 URL。当被请求页面与来源页面不同源但是有相同协议安全等级时（比如 HTTPS→HTTPS），在 `referrer` 首部中仅包含来源页面的源。当被请求页面的协议安全等级较低时（比如 HTTPS→HTTP），不发送 `referrer` 首部。|
   |`unsafe-url`|始终在 `referrer` 首部中包含源以及路径（但不包括 `fragment`，密码，或用户名）。这个值是不安全的, 因为这样做会暴露受 TLS 保护的资源的源和路径信息。|
7. `sandbox`：控制应用于嵌入在 `<iframe>` 中的内容的限制。该属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定的限制。
   |可选值|含义|
   |:----------:|:--------------:|
   |`allow-downloads-without-user-activation`|允许在没有征求用户同意的情况下下载文件。|
   |`allow-forms`|允许嵌入的浏览上下文提交表单。如果没有使用该关键字，则无法提交表单。|
   |`allow-modals`|允许嵌入的浏览上下文打开模态窗口。|
   |`allow-orientation-lock`|允许嵌入的浏览上下文锁定屏幕方向（译者注：比如智能手机、平板电脑的水平朝向或垂直朝向）。|
   |`allow-pointer-lock`|允许嵌入的浏览上下文使用 Pointer Lock API（指针锁定）。|
   |`allow-popups`|允许弹窗 (例如 `window.open`, `target="_blank"`, `showModalDialog`)。如果没有使用该关键字，相应的功能将自动被禁用。|
   |`allow-popups-to-escape-sandbox`|允许沙箱化的文档打开新窗口，并且新窗口不会继承沙箱标记。例如，安全地沙箱化一个广告页面，而不会在广告链接到的新页面中启用相同的限制条件。|
   |`allow-presentation`|允许嵌入的浏览上下文开始一个 `presentation session`|
   |`allow-same-origin`|如果没有使用该关键字，嵌入的浏览上下文将被视为来自一个独立的源，这将使 `same-origin policy` 同源检查失败。|
   |`allow-scripts`|允许嵌入的浏览上下文运行脚本（但不能创建弹窗）。如果没有使用该关键字，就无法运行脚本。|
   |`allow-storage-access-by-user-activation`|允许嵌入的浏览上下文通过 `Storage Access API` 使用父级浏览上下文的存储功能。|
   |`allow-top-navigation`|允许嵌入的浏览上下文导航（加载）内容到顶级的浏览上下文。|
   |`allow-top-navigation-by-user-activation`|允许嵌入的浏览上下文在经过用户允许后导航（加载）内容到顶级的浏览上下文。|
8. `src`：被嵌套的页面的 URL 地址。使用 `about:blank` 值可以嵌入一个遵从同源策略的空白页。在 Firefox（version 65 及更高版本）、基于 Chromium 的浏览器、Safari/iOS 中使用代码移除 `iframe` 的 `src` 属性（例如通过 `Element.removeAttribute()` ）会导致 `about:blank` 被载入 `frame`。
9. `srcdoc`：该属性是一段 HTML 代码，这些代码会被渲染到 `iframe` 中。如果浏览器不支持 `srcdoc` 属性，则会渲染 `src` 属性表示的内容。
10. `width`：以 CSS 像素格式，或以百分比格式指定的 `frame` 的宽度。默认值是300。
### 8.2 示例
::: normal-demo <iframe>使用
```html
<iframe
  src="http://iyuwb.com/"
  title="iframe Example 1"
  width="400"
  height="300">
</iframe>
```
:::

## 9. `<img>`：图像嵌入元素
> 可使用的图片的格式：APNG,AVIF,GIF,JPEG,PNG,SVG,WebP(性能好)

|属性|含义|
|:---------:|:----------------:|
|`alt`|包含一条对图像的文本描述，可供无障碍描述和图片加载失败时显示的内容。将图像复制并粘贴为文本，或是将图像的链接保存为浏览器书签时，也会用到此属性。|
|`crossorigin`|这个枚举属性表明是否必须使用 CORS 完成相关图像的抓取。允许的值有：1.`anonymous`：发送忽略凭据的跨源请求。2.`use-credentials`：发送携带凭据的跨源请求。|
|`decoding`|为浏览器提供图像解码方式上的提示。允许的值：1.`sync`:同步解码图像。2.`async`:异步解码图像。3.`auto`:默认值：不指定解码方式，由浏览器决定哪一种对用户来说是最合适的。|
|`fetchpriority`|提供获取图像时要使用的相对的优先级提示。允许的值：`high`,`low`,`auto`|
|`height`|图像的固有高度，以像素为单位。必须是没有单位的整数值。|
|`width`|图像的宽度，以像素为单位。必须是没有单位的整数。|
|`ismap`|只有在 `<img>` 元素是一个拥有有效 `href` 属性的 `<a>` 元素的后代元素的情况下，这个属性才会被允许使用。这个布尔属性表示图像是否是服务器端图像映射的一部分。如果是，那么点击图片的精准坐标将会被发送到服务器。|
|`loading`|指示浏览器应当如何加载该图像。可选值：1.`eager`:立即加载图像。2.`lazy`:延迟加载图像，直到它和视口接近到一个计算得到的距离。|
|`referrerpolicy`|与上述`<iframe>`标签相同。|
|`sizes`|表示资源大小的、以逗号隔开的一个或多个字符串。|
|`src`|图像的 URL。|
|`srcset`|以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像。|
|`usemap`|与元素相关联的图像映射（image map）的部分 URL。|

```html
<img src="favicon72.png" alt="MDN logo" srcset="favicon144.png 2x" />
```
```html
<!--在支持 srcset 的用户代理中，当使用 w 描述符时，src 属性会被忽略。当匹配了媒体条件 (max-width: 600px) 时，将加载 200 像素宽的图像（最匹配的图像），否则将加载另一幅图像。-->
<img
  src="clock-demo-200px.png"
  alt="Clock"
  srcset="clock-demo-200px.png 200w, clock-demo-400px.png 400w"
  sizes="(max-width: 600px) 200px, 50vw" />
```

## 10. `<input>`：输入（表单输入）元素
> 内容较多，单独输出文档。

## 11. `<ins>`
> `<ins>` 元素定义已经被插入文档中的文本。与`<del>`对应，属性也与`<del>`相同。

## 12. `<kbd>`
> 用于表示用户输入的按键，它将产生一个行内元素，以浏览器的默认 `monospace` 字体显示。

::: normal-demo <kbd>标签
```html
<p>打开运行对话框 <kbd>Win</kbd> + <kbd>R</kbd></p>
```
:::

## 13. `<label>`
> `<label>` 元素（标签）表示用户界面中某个元素的说明。

- `for`: 将一个 `<label>` 和一个 `<input>` 元素匹配在一起，你需要给 `<input>` 一个 `id` 属性。而 `<label>` 需要一个 `for` 属性，其值和 `<input>` 的 `id` 一样。
- `form`: 表示与 `label` 元素关联的 `<form>` 元素（即它的表单拥有者）。如果声明了该属性，其值应是同一文档中 `<form>` 元素的 `id`。因此你可以将 `label` 元素放在文档的任何位置，而不仅作为 `<form>` 元素的后代。

::: normal-demo <label>标签
```html
<label for="username">Click me</label> <input type="text" id="username" />
```
:::

## 14. `<legend>`：字段集标题元素
> 父元素 `<fieldset>` 内容的标题。

## 15. `<ol>`, `<ul>`, `<li>`标签
### 15.1 `<ol>`:有序列表
- `reversed`:此布尔值属性指定列表中的条目是否是倒序排列的，即编号是否应从高到低反向标注。
- `start`:一个整数值属性，指定了列表编号的起始值，此属性的值应为阿拉伯数字。
- `type`:设置编号的类型：
  - `a` 表示小写英文字母编号
  - `A` 表示大写英文字母编号
  - `i` 表示小写罗马数字编号
  - `I` 表示大写罗马数字编号
  - `1` 表示数字编号（默认）编号类型适用于整个列表。
  
### 15.2 `<ul>`：无序列表
- `<ul>` 和 `<ol>` 元素可以嵌套任意深度。此外，嵌套列表可以不受限制地在 `<ol>` 和 `<ul>` 之间交替使用。

### 15.3 `<li>`：列表项元素
- `value`：这个整数属性指示由 `<ol>` 元素定义的列表项当前序数值。后面的列表项从数值集开始继续编号。

## 16. `<link>`：外部资源链接元素
> `<link>` 元素规定了当前文档与某个外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标（比如 PC 端的“favicon”图标和移动设备上用以显示在主屏幕的图标）。

```html
<link href="default.css" rel="stylesheet" title="默认样式" />
<link href="fancy.css" rel="alternate stylesheet" title="精美样式" />
<link href="basic.css" rel="alternate stylesheet" title="基本样式" />
<!-- 通过媒体查询有条件地加载资源 -->
<link href="print.css" rel="stylesheet" media="print" />
<link href="mobile.css" rel="stylesheet" media="all" />
<link
  href="desktop.css"
  rel="stylesheet"
  media="screen and (min-width: 600px)" />
<link
  href="highres.css"
  rel="stylesheet"
  media="screen and (min-resolution: 300dpi)" />
<!-- 提供用于不同用法上下文的图标 -->
<!-- 配备高分辨率 Retina 显示屏的第三代 iPad -->
<link rel="apple-touch-icon" sizes="144x144" href="favicon144.png" />
<!-- 配备高分辨率 Retina 显示屏的 iPhone -->
<link rel="apple-touch-icon" sizes="114x114" href="favicon114.png" />
<!-- 第一代和第二代 iPad -->
<link rel="apple-touch-icon" sizes="72x72" href="favicon72.png" />
<!-- 非 Retina iPhone、iPod Touch 和 Android 2.1+ 设备 -->
<link rel="apple-touch-icon" href="favicon57.png" />
<!-- 基本的 favicon -->
<link rel="icon" href="favicon32.png" />

```