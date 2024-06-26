---
title: HTML元素A-C
author: 怡然
createTime: 2024/05/28 10:37:34
permalink: /HTML/x2awpbdf/
---
:::info
在之前的开发中更多使用的标签都是`<div>`这样的无语义的标签，但还有更多的语义化标签是在我所在的项目中很少用到的，以后会更加注意这一方面。
:::

## 1. `<a>`标签：锚元素
> 可以通过它的 href 属性创建通向其他网页、文件、电子邮件地址、同一页面内的位置或任何其他 URL 的超链接。
### 1.1 `download`
> 浏览器将链接的 URL 视为下载资源。可以使用或不使用 `filename` 值：
- 如果没有指定值，浏览器会从多个来源决定文件名和扩展名：
  * `Content-Disposition HTTP` 标头。
  * `URL` 路径的最后一段。
  * 媒体类型。来自 `Content-Type` 标头，`data: URL` 的开头，或 `blob: URL` 的 `Blob.type`。
* `filename`：决定文件名的值。/ 和 \ 被转化为下划线（_）。文件系统可能会阻止文件名中其他的字符，因此浏览器会在必要时适当调整文件名。
> 这个属性其实很常用，但是通常不是在HTML标签内直接写，而是在js方法里完成。如下示例：

:::details
```js
<!DOCTYPE html>
<html lang="en">
  <body>
    <!-- 创建一个下载链接 -->
    <a id="download-link" href="#">下载文件</a>
 
    <script>
      // 假设已经通过服务器端获取到了文件的路径与文件名
      var filePath = 'http://example.com/file.txt';

      // 获取下载链接元素
      var downloadLink = document.getElementById('download-link');

      // 监听下载链接的点击事件
      downloadLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        // 创建一个新的 XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        // 配置 XMLHttpRequest 对象，指定请求类型（GET）、文件路径和异步请求
        xhr.open('GET', filePath, true);
        // 响应下载文件的请求
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var blob = new Blob([xhr.responseText], {type: 'application/octet-stream'});
            var downloadLink = document.createElement('a');
            // 创建下载链接，并指定下载文件的名称
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'filename.txt';
            downloadLink.style.display = 'none';
            // 将下载链接添加到 HTML 页面上
            document.body.appendChild(downloadLink);
            // 触发下载链接的点击事件，开始下载文件
            downloadLink.click();
            // 移除下载链接
            document.body.removeChild(downloadLink);
          }
        };
        // 发送请求
        xhr.send();
      });
    </script>
  </body>
</html>
```
:::
### 1.2 href（常用链接到另一个URL）
- 链接到相同页面的元素上
  ```HTML
  <!-- <a> 元素链接到下面部分 -->
  <p><a href="#Section_further_down"> 跳转到下方标题 </a></p>
  <!-- 要链接到的标题 -->
  <h2 id="Section_further_down">更下面的部分</h2>
  ```
- 链接到 email 地址、电话号码
  > 使用mailto、tel
  ```HTML
  <a href="mailto:nowhere@mozilla.org">Send email to nowhere</a>
  <a href="tel:+49.157.0156">+49 157 0156</a>
  <a href="tel:+1(800)555-0123">(800) 555-0123</a>
  ```
### 1.3 hreflang
> 该属性用于指定所链接到的文档的人类语言。其仅提供建议，并没有内置的功能。其允许的值与全局的`lang`属性一致。

### 1.4 ping
> 包含一个以空格分隔的`URL`列表，当跟随超链接时，浏览器会发送带有正文`PING`的`POST`请求。通常用于跟踪。

### 1.5 referrerpolicy
> 表明在跟随链接时，referrer 需要发送的内容：

|    属性值   |    意义    |
|--------------|----------|
|`no-referrer`|`Referer`标头将不会被发送|
|`no-referrer-when-downgrade`|如果没有传输层安全协议 TLS（HTTPS），`Referer`头将不会被发送到源上。|
|`origin`|发送的`referrer`将被限制在其页面的来源：协议、主机和端口。|
|`origin-when-cross-origin`|发送到其他源的`referrer`将只包含协议、主机和端口，而导航到相同的源仍将包括路径。|
|`same-origin`|将向同源地址发送`referrer`，但跨源请求不包含`referrer`信息。|
|`strict-origin`|当协议安全级别保持不变（HTTPS→HTTPS）时，只将文档的来源作为`referrer`发送，但不要将其发送到安全性较低的目的地（HTTPS→HTTP）。|
|`strict-origin-when-cross-origin`（默认）|在执行同源请求时发送完整的 URL，在协议安全级别保持不变时只发送源（HTTPS→HTTPS），对安全性较低的目的地不发送标头（HTTPS→HTTP）。|
|`unsafe-url`|表示`referrer`将会包含源和路径（但是不包含片段、密码或用户名）。此值是不安全的，因为它可能会将受 TLS 保护的资源的源和路径泄露到不安全的源中。|

### 1.6 rel
> 该属性指定了目标对象到链接对象的关系。

### 1.7 target
>该属性指定在何处显示链接的 URL，作为浏览上下文的名称（标签、窗口或 `<iframe>`）。

|关键词        |含义       |
|----------|-------------|
|`_self`|当前页面加载。（默认）|
|`_blank`|通常在新标签页打开，但用户可以通过配置选择在新窗口打开。|
|`_parent`|当前浏览环境的父级浏览上下文。如果没有父级框架，行为与`_self `相同。|
|`_top`|最顶级的浏览上下文（当前浏览上下文中最“高”的祖先）。如果没有祖先，行为与`_self`相同。|

:::info
在 `<a>` 元素上使用`target="_blank"`隐式提供了与使用 `rel="noopener"`相同的`rel`行为，即不会设置`window.opener`。
:::
### 1.7 type
> 该属性指定在一个 MIME 类型链接目标的形式的媒体类型。没有内置的功能。
## 2. `<abbr>`：缩写元素
> 在包含缩写或首字母缩写词时，应在纯文本中提供该术语的扩展形式。同时使用 `<abbr>` 元素来标记缩写。这可以告知用户缩写或首字母缩略词的含义。

```HTML
<p>你可以用 <abbr title="邮政特快专递服务">EMS</abbr> 把这个包裹寄给我。</p>
```
效果如下：
<p>你可以用 <abbr title="邮政特快专递服务">EMS</abbr> 把这个包裹寄给我。</p>

## 3. `<address>`：联系人地址元素
- 当表示一个和联系信息无关的任意的地址时，请改用 `<p>` 元素而不是 `<address>` 元素。
- 这个元素不能包含除联系信息之外的任何信息，比如出版日期（这应当被包含在 `<time>` 元素之中）。
- 通常，`<address>` 元素可以放在 `<footer>` 元素之中（如果存在的话）。
```HTML
<address>
  你可以通过
  <a href="http://www.example.com/contact">www.example.com</a><br />
  与作者联系。如果你发现了任何错误，请<a href="mailto:webmaster@example.com"
    >联系网站管理员</a
  >。
</address>
```
> 虽然 `<address>` 元素看起来只是使用了 `<i>` 或者 `<em>` 元素的默认样式来渲染其中的文本，但是当处理联系信息时使用它更为合适，因为它表达了额外的语义信息。

## 4. `<area>`
> 在图片上定义一个热点区域，可以关联一个超链接。`<area>`元素仅在`<map>`元素内部使用。
- 不允许嵌套任何子元素或者文本。
- 必须拥有一个`<map>`元素祖先元素，但不一定是直接的父元素。
### 4.1 属性
> `download`,`href`,`hreflang`,`rel`,`target`,`type`与`<a>`标签的相关属性相同。

|属性|含义|
|-----|------|
|`alt`|在未显示图像的浏览器上显示代替的文本字符串。在 HTML4 中，这个属性时必需的，但是可以是一个空的串 ("")。在 HTML5 中，这个属性只有在`href` 属性被使用的时候才是必需的。|
|`coords`|给热点区域设定具体的坐标值。这个值的数值和意义取决于这个值所描述的形状属性。对于矩形或长方形，这个` coords` 值为两个 X,Y 对：左上、右下。对于圆形，这个值是 x,y,r，这里的 x,y 是一对确定圆的中心的坐标而 r 则表示的是半径值。对于多边和多边形，这个值是用 x,y 对表示的多边形的每一个点：`x1,y1,x2,y2,x3,y3` 等等。HTML4 里，值可能是像素数量或者百分比，区别是不是有 % 出现; HTML5 里，只可能是像素的数量。|
|`media`|指明链接资源的媒体类型，例：`print and screen`。如果此属性省略，默认全部。仅在 `href `属性存在情况下使用。|
|`shape`|`rect`：矩形；`circle`：圆形；`poly`：多边形；`default`：整个区域超出了任何定义的形状|

### 4.2 案例

:::details
```HTML
<map name="infographic">
  <area
    shape="poly"
    coords="129,0,260,95,129,138"
    href="https://developer.mozilla.org/docs/Web/HTTP"
    target="_blank"
    alt="HTTP" />
  <area
    shape="poly"
    coords="260,96,209,249,130,138"
    href="https://developer.mozilla.org/docs/Web/HTML"
    target="_blank"
    alt="HTML" />
  <area
    shape="poly"
    coords="209,249,49,249,130,139"
    href="https://developer.mozilla.org/docs/Web/JavaScript"
    target="_blank"
    alt="JavaScript" />
  <area
    shape="poly"
    coords="48,249,0,96,129,138"
    href="https://developer.mozilla.org/docs/Web/API"
    target="_blank"
    alt="Web APIs" />
  <area
    shape="poly"
    coords="0,95,128,0,128,137"
    href="https://developer.mozilla.org/docs/Web/CSS"
    target="_blank"
    alt="CSS" />
</map>
<img usemap="#infographic" src="/media/examples/mdn-info.png" alt="MDN infographic" />
```
:::

## 5. `<article>`
> 表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。

- 每个`<article>`，通常包括标题（`<h1>` - `<h6>`元素）作为`<article>`元素的子元素。
- 当`<article>`元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的`<article>`元素可嵌套在代表博客文章的`<article>`元素中。
- `<article>`元素的作者信息可通过`<address>`元素提供，但是不适用于嵌套的`<article>`元素。
- `<article>`元素的发布日期和时间可通过`<time>`元素的`pubdate`属性表示。
- 可以使用`<time>` 元素的`datetime`属性来描述`<article>`元素的发布日期和时间。请注意`<time>`的`*pubdate*` 属性不再是`*W3C*` `*HTML5*`标准。

:::details
```HTML
<article class="film_review">
  <header>
    <h2>Jurassic Park</h2>
  </header>
  <section class="main_review">
    <p>Dinos were great!</p>
  </section>
  <section class="user_reviews">
    <article class="user_review">
      <p>Way too scary for me.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-16 19:00">May 16</time>
          by Lisa.
        </p>
      </footer>
    </article>
    <article class="user_review">
      <p>I agree, dinos are my favorite.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-17 19:00">May 17</time>
          by Tom.
        </p>
      </footer>
    </article>
  </section>
  <footer>
    <p>
      Posted on
      <time datetime="2015-05-15 19:00">May 15</time>
      by Staff.
    </p>
  </footer>
</article>
```
:::

## 6. `<aside>`
> 表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者标注框（`call-out boxes`）。

> 注意 `<aside>` 不能是`<address>`元素的后代。

>不要使用 `<aside>` 元素去尾随括号内的文本，因为这种文本被认为是主要流内容的一部分。
:::details
```HTML
<article>
  <p>
    迪斯尼电影<cite>海的女儿</cite>（<cite>The Little Mermaid</cite>）于 1989
    年首次登上银幕。
  </p>
  <aside>在首次发行期间，该片便收获了 8700 万美元的票房。</aside>
  <p>更多有关该电影的信息…</p>
</article>
```
:::

## 7. `<audio>`
> `<audio>` 元素可以包含一个或多个音频资源，这些音频资源可以使用 `src` 属性或者 `<source>` 元素来进行描述：浏览器将会选择最合适的一个来使用。也可以使用 `MediaStream` 将这个元素用于流式媒体。

### 7.1 属性
- `autoplay`：布尔值属性；声明该属性，音频会尽快自动播放，不会等待整个音频文件下载完成。
- `controls`：如果声明了该属性，浏览器将提供一个包含声音，播放进度，播放暂停的控制面板，让用户可以控制音频的播放。
- `crossorigin`：展示音频资源是否可以通过 `CORS` 加载。可选值如下：
   * `anonymous`：在发送跨域请求时不携带验证信息。
   * `use-credentials`：在发送跨域请求时携带验证信息。
- `currentTime:`读取 `currentTime` 属性将返回一个双精度浮点值，用以标明以秒为单位的当前音频的播放位置。
- `disableRemotePlayback`：这是一个布尔值，用来禁用在远程设备上进行进度控制的能力。这些设备通过有线（比如 HDMI, DVI）或无线技术（比如 Miracast, Chromecast, DLNA, AirPlay,）来与 web 连接。
- `duration`：只读属性。这是一个双精度浮点数，指明了音频在时间轴中的持续时间（总长度），以秒为单位。如果元素上没有媒体，或者媒体是不可用的，那么会返回 `NaN`。如果媒体找不到确切的结尾（比如不确定长度的直播流，网络电台，或者是通过 WebRTC 连接的流），那么这个值将返回 `+Infinity`。
- `loop`：布尔属性；如果声明该属性，将循环播放音频。
- `muted`：表示是否静音的布尔值。默认值为 `false`，表示有声音。
- `preload`：枚举属性，让开发者自行思考来示意浏览器使用何种加载方式以达到最好的用户体验。可以是以下属性之一：
    * `none`: 示意用户可能不会播放该音频，或者服务器希望节省带宽；换句话说，该音频不会被缓存。
    * `metadata`: 示意即使用户可能不会播放该音频，但获取元数据 (例如音频长度) 还是有必要的。
    * `auto`: 示意用户可能会播放音频；换句话说，如果有必要，整个音频都将被加载，即使用户不期望使用。
    * 空字符串 : 等效于`auto`属性。不同浏览器会有自己的默认值，规范建议的默认值为 metadata。

:::tip
`autoplay` 属性的优先级高于 `preload`。如果 `autoplay` 被指定，浏览器将显式地开始下载媒体以供播放。
:::
- `src`：嵌入的音频的 URL。该 URL 应遵从 HTTP access controls. 这是一个可选属性；你可以在 `audio` 元素中使用 `<source>` 元素来替代该属性指定嵌入的音频。

### 7.2 事件

|事件名称|触发时机|
|--------|-------|
|`audioprocess`|一个 `ScriptProcessorNode` 的输入缓冲区已经准备开始处理。|
|`canplay`|浏览器已经可以播放媒体，但是预测已加载的数据不足以在不暂停的情况下顺利将其播放到结尾（即预测会在播放时暂停以获取更多的缓冲区内容）|
|`canplaythrough`|浏览器预测已经可以在不暂停的前提下将媒体播放到结束|
|`complete`|一个 `OfflineAudioContext` 的渲染已经中止。|
|`durationchange`|	`duration` 属性发生了变化。|
|`emptied`|媒体置空。举个例子，当一个媒体已经加载（或部分加载）的情况下话调用 `load()` 方法，这个事件就将被触发。|
|`ended`|播放到媒体的结束位置，播放停止。|
|`loadeddata`|	媒体的第一帧加载完成。|
|`loadedmetadata`|元数据加载完成。|
|`pause`|	播放暂停。|
|`play`|播放开始。|
|`playing`|因为缺少数据而暂停或延迟的状态结束，播放准备开始。|
|`ratechange`|播放速度变化。|
|`seeked`|一次获取操作结束。|
|`seeking`|一次获取操作开始。|
|`stalled`|用户代理试图获取媒体数据，但数据意外地没有进入。|
|`suspend`|媒体加载挂起|
|`timeupdate`|	由 `currentTime` 指定的时间更新。|
|`volumechange`|音量变化。|
|`waiting`|因为暂时性缺少数据，播放暂停。|

## 8. `<b>`
> 用于吸引读者注意元素内容，而这些内容本身并不具有特别重要性。

- 在以下情况下使用 `<b>` 元素：摘要中的关键字、评论中的产品名称，其他通常以粗体显示的文本（但不包括任何特别重要的内容）。
- 不要将 `<b>` 元素与 `<strong>`、`<em>` 或 `<mark>` 元素混淆。`<strong>` 元素表示具有某种重要性的文本，`<em>` 元素强调文本，而 `<mark>` 元素表示具有某种关联性的文本。`<b>` 元素不会传达这种特殊的语义信息；仅在其他元素都不适用时使用它。
- 不要使用 `<b>` 元素标记标题和页眉。为此，请使用 `<h1>` 到 `<h6>` 标签。此外，样式表可以更改这些元素的默认样式，而使它们不一定以粗体显示。
- 在 `<b>` 元素上添加 `class` 属性来传达额外的语义信息（例如，段落中的第一个句子可以使用 `<b class="lead">`）。这样，如果你的样式需求发生变化，可以更轻松地管理 `<b>` 的多个用例，从而无需更改 `HTML`。
- 历史上， `<b>` 元素的目的是使文本加粗。自 `HTML4` 以来，样式信息已被弃用，因此 `<b>` 元素的含义已更改。
- 如果不是出于语义目的而使用 `<b>` 元素，那么你应该使用 `CSS` 的 `font-weight` 属性并将值设置为 `"bold"` 来使文本加粗。

::: normal-demo <b>标签使用
```html
<p>
  本文档描述了几个<b class="keywords">文本级</b>元素，并解释了它们在
  <b class="keywords">HTML</b> 文档中的用法。
</p>
关键字以<b>元素的默认样式显示，可能是粗体。</b>
```
:::

## 9. `<base>`文档根 URL 元素
> 1. 指定用于一个文档中包含的所有相对 `URL` 的根 `URL`。一份中只能有一个 `<base>` 元素，如果指定了多个 <base> 元素，只会使用第一个 `href` 和 `target` 值，其余都会被忽略。。
> 2. 一个文档的基本 `URL`，可以通过使用 `document.baseURI` 的 `JS` 脚本查询。如果文档不包含 `<base>` 元素，`baseURI` 默认为 `document.location.href`。

### 9.1 属性
- `href`：用于文档中相对 `URL` 地址的基础 `URL`。允许绝对和相对 `URL`。
- `target`：默认浏览上下文的关键字或作者定义的名称，当没有明确目标的链接 `<a>` 或表单 `<form>` 导致导航被激活时显示其结果。该属性值定位到浏览上下文（例如选项卡，窗口或内联框 `<iframe>`）。
  - `_self`: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
  - `_blank`: 载入结果到一个新的未命名的浏览上下文。
  - `_parent`: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和`_self`一样。
  - `_top`: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和`_self` 一样。

### 9.2 用法
```html
<base href="http://www.example.com/" target="_blank" />
<a href="#anchor">Anker</a>
<!--链接指向 https://example.com/#anchor-->
```

## 10. `<bdi>`和`<bdo>`
### 10.1 `<bdi>`
> 告诉浏览器的双向算法将其包含的文本与周围的文本隔离，当网站动态插入一些文本且不知道所插入文本的方向性时，此功能特别有用。

- 属性：`dir`一个指示元素中文本方向的枚举属性。它的取值如下：
  - ltr，指从左到右，用于那种从左向右书写的语言（比如英语）；
  - rtl，指从右到左，用于那种从右向左书写的语言（比如阿拉伯语）；
  - auto，指由用户代理决定方向。它在解析元素中字符时会运用一个基本算法，直到发现一个具有强方向性的字符，然后将这一方向应用于整个元素。

### 10.2 `<bdo>`：双向文本覆盖元素
> 元素覆盖了当前文本的方向，使文本以不同的方向渲染出来。
>
> 属性与上述`<bdi>`一致。

### 10.3 用法示例
::: normal-demo <bdi>和<bdo>标签
```html
<p><bdo dir="rtl">This text will go rightto left.</bdo></p>
<p><bdo dir="rtl">This text <bdi>will</bdi> go right to left.</bdo></p>
```
:::

::: normal-demo <bdi>对于从右往左读的例如阿拉伯语友好
```html
<ul>
  <li>用户 <bdi>hrefs</bdi>: 60 分</li>
  <li>用户 <bdi>jdoe</bdi>: 80 分</li>
  <li>用户 <bdi>إيان</bdi>: 90 分</li>
</ul>
```
:::

::: normal-demo 若不使用<bdi>标签
```html
<ul>
  <li>用户 hrefs: 60 分</li>
  <li>用户 jdoe: 80 分</li>
  <li>用户 إيان: 90 分</li>
</ul>
```
:::

## 11. `<blockquote>`：块级引用元素
> 1. 代表其中的文字是引用内容。通常在渲染时，这部分的内容会有一定的缩进，若引文来源于网络，则可以将原内容的出处 `URL` 地址设置到 `cite` 特性上。
> 2. `cite`：是一个标注引用的信息的来源文档或者相关信息的 `URL`。通常用来描述能够解释引文的上下文或者引用的信息。

::: normal-demo <blockquote>标签使用
```html
<blockquote cite="https://hanyu.baidu.com/shici/detail?from=aladdin&pid=f3f889357df84af681cfc55098ced685">
  <p>
    晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷。渔人甚异之，复前行，欲穷其林。
  </p>
</blockquote>
```
:::

## 12. `<body>`：文档主体元素
|属性|含义|
|----------|-------------|
|`onafterprint`|用户完成文档打印之后调用的函数。|
|`onbeforeprint`|用户要求打印文档之前调用的函数。|
|`onbeforeunload`|文档即将被关闭之前调用的函数。|
|`onblur`|文档失去焦点时调用的函数。|
|`onerror`|文档加载失败时调用的函数。|
|`onfocus`|文档获得焦点时调用的函数。|
|`onhashchange`|文档当前地址的片段标识部分（以 ('#') 开始的部分）发生改变时调用的函数。|
|`onlanguagechange`|用户选择的语言发生改变时调用的函数。|
|`onload`|文档完成加载时调用的函数。|
|`onmessage`|文档接收到消息时调用的函数。|
|`onoffline`|网络连接失败时调用的函数。|
|`ononline`|网络连接恢复时调用的函数。|
|`onpopstate`|用户回退历史记录时调用的函数。|
|`onredo`|用户重做操作时调用的函数。|
|`onresize`|文档尺寸发生改变时调用的函数。|
|`onstorage`|存储内容（`localStorage` / `sessionStorage`）发生改变时调用的函数。|
|`onundo`|用户撤销操作时调用的函数。|
|`onunload`|文档关闭时调用的函数。|

## 13. `<br>`换行

## 14. `<button>`
|属性|含义|
|-----------|------------|
|`autofocus`|布尔属性，用于指定当页面加载时按钮有输入焦点。只有一个表单关联元素可以指定该属性。|
|`autocomplete`|只有 `Firefox` 使用，`Firefox` 默认在页面加载时持续禁用 `Button` 的动态状态，将此属性设置为`off` (i.e. `autocomplete="off`") 关闭此特性。|
|`disabled`|此布尔属性表示用户是否能与 button 交互。|
|`form`|表示 `button` 元素关联的 `form` 元素（它的表单拥有者）。此属性值必须为同一文档中的一个`<form>`元素的`id`属性。如果此属性未指定，`<button>`元素必须是 `form` 元素的后代。利用此属性，你可以将`<button>`元素放置在文档内的任何位置，而不仅仅是作为他们 `form` 元素的后代。|
|`formaction`|表示程序处理 `button` 提交信息的 URL。|
|`formenctype`|如果 `button` 是 `submit` 类型，此属性值指定提交表单到服务器的内容类型。1. `application/x-www-form-urlencoded`: 未指定时的默认值。2. `multipart/form-data`: 如果使用type属性的<input>元素设置文件，使用此值。3. `text/plain`如果指定此属性，它将重写 `button` 的表单拥有者的`enctype`属性。|
|`formmethod`|如果 `button` 是 `submit` 类型，此属性指定浏览器提交表单使用的 `HTTP` 方法。可选值：1. `post`：来自表单的数据被包含在表单内容中，被发送到服务器。2. `get`：来自表单的数据以'`?`'作为分隔符被附加到 `form` 的`URL`属性中，得到的 `URL` 被发送到服务器。当表单没有副作用，且仅包含 `ASCII` 字符时使用这种方法。如果指定了，此属性会重写 `button` 拥有者的`method`属性。|
|`formnovalidate`|如果 `button` 是 `submit` 类型，此布尔属性指定当表单被提交时是否需要验证。如果指定了，它会重写 `button` 拥有者的`novalidate`属性。|
|`formtarget`|如果 `button` 是 `submit` 类型，此属性指定一个名称或关键字，表示接收提交的表单后在哪里显示响应。关键字如下：1. `_self`: 在同一个浏览上下文中加载响应作为当前的。未指定时此值为默认值。2. `_blank`: 在一个新的不知名浏览上下文中加载响应。3. `_parent`: 在当前浏览上下文父级中加载响应。如果没有父级的，此选项将按_self 执行。4. `_top`: 在顶级浏览上下文（即当前浏览上下文的祖先，且没有父级）中架加载响应。如果没有顶级的，此选项将按_self 执行。|
|`name`|button 的名称，与表单数据一起提交。|
|`type`|1. `submit`: 此按钮将表单数据提交给服务器。如果未指定属性，或者属性动态更改为空值或无效值，则此值为默认值。2. `reset`: 此按钮重置所有组件为初始值。3. `button`: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发。|
|`value`|`button` 的初始值。它定义的值与表单数据的提交按钮相关联。当表单中的数据被提交时，这个值便以参数的形式被递送至服务器。|

## 15. `<canvas>`
> `<canvas>` 元素可被用来通过 JavaScript（`Canvas API` 或 `WebGL API`）绘制图形及图形动画。

|属性|含义|
|-----------|------------|
|`height`|该元素占用空间的高度，以 CSS 像素（px）表示，默认为 150。|
|`width`|该元素占用空间的宽度，以 CSS 像素（px）表示，默认为 300。|

- 示例：
```html
<canvas id="canvas" width="300" height="300"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```

## 16. `<caption>`
- 展示一个表格的标题，它常常作为 `<table>` 的第一个子元素出现，同时显示在表格内容的最前面，但是，它同样可以被 CSS 样式化，所以，它同样可以出现在任何一个一个相对于表格的做任意位置。
- 使用 CSS 属性 caption-side 和 text-align修改`<caption>`内容的对齐方式。

## 17. `<cite>`
> 表示一个作品的引用，且必须包含作品的标题。这个引用可能是一个根据适当的上下文约定关联引用的元数据的缩写。

::: normal-demo <cite>标签使用
```html
更多内容请查看 <cite>笔记</cite>。
```
:::

## 17. `<code>`：行内代码元素
> 为其显示的内容添加用以表明其中的文本是一段简短的计算机代码的样式。

::: normal-demo <code>标签使用
```html
<p>使用<code>filter()</code>可将数组中符合条件的元素筛选出来</p>
```
:::

## 18. `<colgroup>`与`<col>`：表格列组元素
- 属性`span`：指定 `<col>` 元素跨列的连续列数。该值必须是大于 0 的正整数。如果不存在，其默认值为 1。
- 该元素本质是将表格的列分为组，以便更好地进行样式设置。
  
:::normal-demo <colgroup>与<col>标签使用
```html
<table>
  <caption>
    个人每周活动
  </caption>
  <colgroup span="5" class="weekdays"></colgroup>
  <colgroup span="2" class="weekend"></colgroup>
  <tr>
    <th>周一</th>
    <th>周二</th>
    <th>周三</th>
    <th>周四</th>
    <th>周五</th>
    <th>周六</th>
    <th>周日</th>
  </tr>
  <tr>
    <td>打扫房间</td>
    <td>足球训练</td>
    <td>舞蹈课</td>
    <td>历史课</td>
    <td>买饮料</td>
    <td>自习</td>
    <td>自由时间</td>
  </tr>
  <tr>
    <td>瑜伽</td>
    <td>棋类俱乐部</td>
    <td>见朋友</td>
    <td>体操</td>
    <td>生日派对</td>
    <td>钓鱼之旅</td>
    <td>自由时间</td>
  </tr>
</table>
```
```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
}

caption {
  caption-side: bottom;
  padding: 10px;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 6px;
  text-align: center;
}

.weekdays {
  background-color: #d7d9f2;
}

.weekend {
  background-color: #ffe8d4;
}
```
:::