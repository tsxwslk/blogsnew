---
title: HTML基础知识
author: 怡然
createTime: 2024/05/28 09:32:54
permalink: /HTML/hwz25sso/
---
# 基础知识
```HTML
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
```
- `<!doctype html>`——文档类型。用于正确读取文档和自动查错。
- `<html></html>`——`<html>` 元素。包含整个页面的所有内容，有时候也称作根元素。里面也包含了 lang 属性，写明了页面的主要语种。
- `<head></head>`——`<head>` 元素。所有那些你加到页面中，且不向用户展示的页面内容，都以这个元素为容器。其中包含诸如提供给搜索引擎的关键字和页面描述、用于设置页面样式的 `CSS`、字符集声明等等。
- `meta`
  * `charset="utf-8"`：该元素指明你的文档使用 UTF-8 字符编码，UTF-8 包括世界绝大多数书写语言的字符。
  * `name="viewport" content="width=device-width"`：视口元素可以确保页面以视口宽度进行渲染，避免移动端浏览器上因页面过宽导致缩放。该标签的基本属性如下：
    | 属性 | 意义 |
    |--------|----------|
    |`width`|控制视口的大小。这可以设置为特定像素数（如`width=600`），也可以设置为特殊值`device-width`，即 `100vw`，100% 的视口宽度。最小值为 1。最大值为 10000。负值会被忽略。|
    |`height`|控制视口的大小。这可以设置为特定像素数（如 `height=600`），也可以设置为特殊值 device-height，即 `100vh`，100% 的视口高度。最小值为 1。最大值为 10000。负值会被忽略。|
    |`initial-scale`|控制页面首次加载时显示的缩放倍数。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。|
    |`minimum-scale`|控制页面允许缩小的倍数。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。|
    |`maximum-scale`|控制页面允许放大的倍数。设置一个低于 3 的值将不具备无障碍访问性。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。|
    |`user-scalable`|控制是否允许页面上的放大和缩小操作。有效值为 0、1、`yes` 或 `no`。默认值为 1，与 yes 相同。将值设置为 0（即与 no 相同）将违反 Web 内容无障碍指南（WCAG）。|
    |`interactive-widget`|指定交互式 UI 组件（如虚拟键盘）对页面视口的影响。有效值：`resizes-visual`(调整视口大小)、`resizes-content`(调整内容大小) 或 `overlays-content`(覆盖内容)。默认值：`resizes-visual`。|
    
- `<title></title>——<title>` 元素。该元素设置页面的标题，显示在浏览器标签页上，也作为收藏网页的描述文字。
- `<body></body>`——`<body>` 元素。该元素包含期望让用户在访问页面时看到的全部内容，包括文本、图像、视频、游戏、可播放的音轨或其他内容。
