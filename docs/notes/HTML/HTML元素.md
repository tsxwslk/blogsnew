---
title: HTML元素
author: 怡然
createTime: 2024/05/28 10:37:34
permalink: /HTML/x2awpbdf/
---
:::info
本篇笔记只记录不熟悉的标签和熟悉的标签中不熟悉的属性，常用的就不再记录了。另外，在之前的开发中更多使用的标签都是`<div>`这样的无语义的标签，但还有更多的语义化标签是在我所在的项目中很少用到的，以后会更加注意这一方面。
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

