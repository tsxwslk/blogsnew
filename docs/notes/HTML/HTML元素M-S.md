---
title: HTML元素M-S
author: 怡然
createTime: 2024/06/07 16:26:54
permalink: /HTML/4mrhthht/
---

## 1. `<main>`
> - `<main>` 元素呈现了文档的 `<body>` 或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。
> - `<main>` 元素的内容应当是独一无二的。任何同时存在于任意一系列文档中的相同、重复内容，比如侧边栏、导航栏链接、版权信息、网站 Logo，搜索框（除非搜索框为文档的主要功能），都不应当被包含在其内。

## 2. `<map>`：图像映射元素
> - `<map>` 元素与 `<area>` 元素一起使用来定义一个图像映射（一个可点击的链接区域）。
> - `name` 属性给予该映射引用的名称，这个属性必须存在，值不得为空并且不能带空格。`name` 属性的值不得与同文档中其他 `<map>` 元素的该属性值相同，如果还指定了 id 属性，则两个属性的值必须相同。

```html
<map name="primary">
  <area
    shape="circle"
    coords="75,75,75"
    href="https://www.baidu.com"
    target="_blank"
    alt="JavaScript" />
  <area
    shape="circle"
    coords="275,75,75"
    href="https://weread.qq.com"
    target="_blank"
    alt="CSS" />
</map>
<img
  usemap="#primary"
  src="../xxx.jpg"
  alt="xxxxxxx" />
```

## 3. `<mark>`
> - 表示为引用或符号目的而标记或突出显示的文本
> - `<strong>` 元素用来表示文本在上下文的重要性的，而 `<mark>` 元素是用来表示上下文的关联性的。

::: normal-demo <mark>标签使用
```html
<p>&lt;mark&gt; 元素用于 <mark>高亮</mark> 文本</p>
```
:::

## 4. `<menu>`：菜单元素
> `<menu>` 在 HTML 规范中被描述为 `<ul>` 的语义替代，它表示一个无序列表（由 `<li>` 元素表示）。

## 5. `<meta>`：元数据元素
> `<meta>` 元素表示那些不能由其他 HTML 元相关（meta-related）元素表示的元数据信息。如：`<base>`、`<link>`、`<script>`、`<style>` 或 `<title>`。

- 如果设置了 `name` 属性，`<meta>` 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
- 如果设置了 `http-equiv` 属性，`<meta>` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
- 如果设置了 `charset` 属性，`<meta>` 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 `itemprop` 属性，`<meta>` 元素提供用户定义的元数据。
  
## 6. `<meter>`
> `<meter>` 元素用来显示已知范围的标量值或者分数值。

> 属性

- `value`: 当前的数值。如果设置了最小值和最大值（分别由 `min` 属性和 `max` 属性定义），它必须介于最小值和最大值之间。如果没有指定或者格式有误，值即为 0。如果给定的值不在最小值和最大值之间，它的值就等于它最接近的一端的值。
- `min`: 值域的最小边界值。如果设置了，它必须比最大值要小。如果没设置，默认为 0。
- `max`: 值域的上限边界值。如果设置了，它必须比最小值要大。如果没设置，默认为 1。
- `low`: 定义了低值区间的上限值（译者注：如果 `value` 介于 `min` 和 `low` 之间，该元素就会表现出低值的视觉效果，`value` 落在 `[min,low]`、`[high,max]` 等不同的区间会使浏览器渲染该元素时出不同的视觉效果）。如果设置了，它必须比最小值属性大，并且不能超过 `high` 值和最大值。未设置或者比最小值还要小时，其值即为最小值。
- `high`: 定义了高值区间的下限值。如果设置了，它必须小于最大值，同时必须大于 `low` 值和最小值。如果没有设置，或者比最大值还大，其值即为最大值。
- `optimum`: 这个属性用来指示最优/最佳取值。它必须在正确的值域内（由最小值属性和最大值属性定义）。当使用了 `low` 和 `high` 属性时，它指明哪一个取值范围是更好的。例如，假设它介于最小值和 `low` 之间，那么 `lower` 区间就被认为是更佳的取值范围。
- `form`: 该属性将本元素与对应的 `form` 元素关联。例如，一个计量器可能用来显示某个数值输入框（`input` 元素，`number` 类型）的范围。只有当计量器元素被用作表单关联的元素时，该属性才应当被使用；即便如此，如果它作为表单的后代元素出现，它仍然有可能被省略。

::: normal-demo <meter>标签
```html
<p>
  Heat the oven to <meter min="200" max="500" value="350">350 degrees</meter>.
</p>
<p>
  He got a <meter low="69" high="80" max="100" value="84">B</meter> on the exam.
</p>
```
:::

## 7. `<nav>`
> 在当前文档或其他文档中提供导航链接。导航部分的常见示例是菜单，目录和索引。

- 并不是所有的链接都必须使用`<nav>`元素，它只用来将一些热门的链接放入导航栏，例如`<footer>`元素就常用来在页面底部包含一个不常用到，没必要加入`<nav>`的链接列表。
- 一个网页也可能含有多个`<nav>`元素，例如一个是网站内的导航列表，另一个是本页面内的导航列表。
- 对于屏幕阅读障碍的人，可以使用这个元素来确定是否忽略初始内容。

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

## 8. `<noscript>`：无脚本元素
> `<noscript>` HTML 元素定义了在页面上的脚本类型不支持或浏览器当前关闭脚本时插入的 HTML 部分。

```html
<noscript>
  <!-- 外部文件的锚链接 -->
  <a href="https://www.mozilla.org/">外部链接</a>
</noscript>
<p>蛋糕</p>
```

## 9. `<object>`
> `<object>` 元素（或者称作 HTML 嵌入对象元素）表示引入一个外部资源，这个资源可能是一张图片，一个嵌入的浏览上下文，亦或是一个插件所使用的资源。

> 属性

- `data`: 一个合法的 URL 作为资源的地址，需要为 `data` 和 `type` 中至少一个设置值。
- `form`: 对象元素关联的 form 元素（属于的 form）。取值必须是同一文档下的一个 `<form>` 元素的 ID。
- `height`: 资源显示的高度，单位是 CSS 像素。
- `name`: 浏览上下文名称（HTML5），或者控件名称（HTML 4）。
- `type`: `data` 指定的资源的 MIME 类型，需要为 `data` 和 `type` 中至少一个设置值。
- `usemap`: 指向一个 `<map>` 元素的 hash-name；格式为‘#’加 map 元素 `name` 元素的值。
- `width`: 资源显示的宽度，单位是 CSS 像素。
  
```html
<object type="application/pdf" data="/xxxx/xxxx.pdf" width="250" height="200"></object>
```
`
## 10. `<select>`,`<optgroup>`,`<option>`
### 10.1 `<select>` 
> 元素表示一个提供选项菜单的控件

> 属性：
- `autocomplete`: 提供自动填充功能 。
- `autofocus`: 这个布尔值属性能够让一个对象在页面加载的时候获得焦点。一个文档中只有一个对象可以有这个属性。
- `disabled`: 这个布尔值的属性表示用户不能与该表单控件交互。如果没有声明这个属性，则从它的父元素继承，例如 `fieldset`；如果没有父元素设置了 `disabled` 属性，那么默认该表单对象可用。
- `form`: `<select>`所关联的`<form>`。其值必须是在同一文档中的 `<form>` 元素的id。 这个属性让你将 `<select>` 元素与文档中任意位置的 `<form>` 元素相关联，而不仅仅是包含 `<select>` 元素的 `<form>` 元素。这个属性还可以覆盖元素的祖先 `<form>` 元素。
- `multiple`: 这个布尔值属性表示列表中的选项是否支持多选。没有声明该值时，一次只能选中一个选项。声明这个属性后，大多数浏览器都会显示一个可滚动的列表框，而非一个下拉菜单。
- `name`；该属性规定了控件的名称。
- `required`: 一个布尔值属性，表示必须选中一个有非空字符串值的选项。
- `size`: 如果控件显示为滚动列表框（如声明了 `multiple`），则此属性表示为控件中同时可见的行数。浏览器不需要将选择元素呈现为滚动列表框。默认值为 0。

### 10.2 `<optgroup>`
> `<optgroup>` 为`<select>` 元素中的选项创建分组。

> 属性：
- `disabled`: 如果设置了这个布尔值，则不能选择这个选项组中的任何选项。通常浏览器会置灰这样的控件，它不接受任何浏览器事件，如鼠标点击或者焦点相关的事件。
- `label`: 选项组的名字，浏览器用以在用户界面中标记选项。使用这个元素时必须加上这个属性。

### 10.3 `<option>` 
> `<option>` 用于定义在 `<select>`, `<optgroup>` 或 `<datalist>` 元素中包含的项。`<option>` 可以在弹出窗口和 HTML 文档中的其他项目列表中表示菜单项。

> 属性：
- `disabled`: 如果设置了这个布尔属性，则该选项不可选。浏览器通常会将这种控件显示为灰色，并且不再接受任何浏览器事件，例如鼠标点击或者焦点相关的事件。如果这个属性没有设置，而这个元素的其中一个父元素是被禁用的 `<optgroup>` 元素，则这个元素仍然是禁用的。
- `label`: 这个属性是用于表示选项含义的文本。如果 `label` 属性没有定义，它的值就是元素文本内容。
- `selected`: 这个布尔属性存在时表明这个选项是否一开始就被选中。如果 `<option>` 元素是 `<select>` 元素的子元素，并且 `<select>` 元素的 `multiple` 属性没有设置，则 `<select>` 元素中只有一个 `<option>` 元素可以拥有 `selected` 属性。
- `value`: 这个属性的值表示该选项被选中时提交给表单的值。如果省略了这个属性，值就从选项元素的文本内容中获取。

### 10.4 示例
::: normal-demo 组合示例
```html
<label
  >Please choose one or more pets:
  <select name="pets" multiple size="4">
    <optgroup label="4-legged pets">
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster" disabled>Hamster</option>
    </optgroup>
    <optgroup label="Flying pets">
      <option value="parrot">Parrot</option>
      <option value="macaw">Macaw</option>
      <option value="albatross">Albatross</option>
    </optgroup>
  </select>
</label>
```
:::

## 11. `<output>`
> 表示计算或用户操作的结果。

> 属性：
- `for`: 其他影响计算结果的标签的 ID，可以多个。
- `form`: 与当前标签有关联的 `form`（从属的表单）。该属性的值必须是当前文档内的表单元素的 `ID`。如果未指明该属性，`output` 标签必须是一个 `form` 的后代标签。该属性的用处在于可以让 `output` 标签脱离 `form` 标签，存在于一个网页文档的任意位置。

::: normal-demo <output>标签
```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" name="b" value="50" /> +
  <input type="number" name="a" value="10" /> =
  <output name="result"></output>
</form>
```
:::

## 12. `<p>`：段落元素

## 13. `<picture>`
> `<picture>` 元素通过包含零或多个 `<source>` 元素和一个 `<img>` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 `src` 属性中的 URL。然后，所选图像呈现在`<img>`元素占据的空间中。

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)" />
  <img src="mdn-logo-narrow.png" alt="MDN" />
</picture>
```

## 14. `<pre>`
> `<pre>` 元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。(紧跟在 `<pre>` 开始标签后的换行符也会被省略)

::: normal-demo <pre>标签
```html
<pre>
  L          TE
    A       A
      C    V
       R A
       DOU
       LOU
      REUSE
      QUE TU
      PORTES
    ET QUI T'
    ORNE O CI
     VILISÉ
    OTE-  TU VEUX
     LA    BIEN
    SI      RESPI
            RER       - Apollinaire
</pre>
```
:::
