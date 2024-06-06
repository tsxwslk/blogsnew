---
title: HTML元素H-L
author: 怡然
createTime: 2024/06/06 16:47:05
permalink: /et7notcs/
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