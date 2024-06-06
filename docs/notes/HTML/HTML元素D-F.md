---
title: HTML元素D-F
author: 怡然
createTime: 2024/06/05 17:11:21
permalink: /HTML/j7ft0xj3/
---

## 1. `<data>`
> 将一个指定内容和机器可读的翻译联系在一起。

::: normal-demo <data>标签使用
```html
<ul>
  <li><data value="398">麻辣小龙虾</data></li>
  <li><data value="399">十三香小龙虾</data></li>
  <li><data value="400">蒜香小龙虾</data></li>
</ul>
```
```css
data:hover::after {
  content: ' (ID ' attr(value) ')';
  font-size: 0.7em;
}
```
:::

## 2. `<datalist>`：HTML 数据列表元素
> `<datalist>` 元素包含了一组 `<option>` 元素，这些元素表示其他表单控件可选值。

::: normal-demo <datalist>标签使用
```html
<label
  >猜你喜欢: <input list="foods" name="myFoods"
/></label>
<datalist id="foods">
  <option value="小龙虾"></option>
  <option value="火锅"></option>
  <option value="焖锅"></option>
  <option value="烩面"></option>
</datalist>
```
:::

## 3. `<dl>`、`<dt>`、`<dd>`标签
- `<dl>`：一个描述列表
- `<dt>`：描述列表中一项的术语名称
- `<dd>`：某一个术语的具体描述
- 允许使用`<div>`包裹一组

::: normal-demo 描述列表
```html
<dl>
  <dt>姓名</dt>
  <dd>刘怡然</dd>
  <dt>出生年月</dt>
  <dd>1995.10</dd>
  <dt>出生地</dt>
  <dd>中国</dd>
</dl>
```
```css
dt{
  font-weight:bold;
}
```
:::

## 4. `<del>`
> - 表示一些被从文档中删除的文字内容。比如可以在需要显示修改记录或者源代码差异的情况使用这个标签。`<ins>`标签的作用恰恰于此相反：表示文档中添加的内容。
> - 这个标签通常（但不一定要）在文字上显示删除线。

- 属性：
  - `cite`：提供一个 URL，其中的资源解释作出修改的原因。
  - `datetime`：说明修改的时间和日期，这里的时间和日期格式要符合规范。
  
::: normal-demo <del>标签使用
```html
<p>西红柿<del>原价5元/斤</del>现价3元/斤</p>
```
:::

## 5. `<details>`：详细信息展现元素
> 展现组件通常在屏幕上使用一个小三角形，旋转（或扭转）以表示打开/关闭的状态，三角形旁边有一个标签。`<summary>` 元素的内容被用来作为展示小部件的标签。

- 属性：`open`：默认是否可见详细内容。
- 事件：`toggle`：监听组件开关状态。
- 样式：组件样式可以通过css调整，包括`<summary>` 元素的小三角。
  
```js
details.addEventListener("toggle", (event) => {
  if (details.open) {
    /* 元素切换至打开状态 */
  } else {
    /* 元素切换至关闭状态 */
  }
});
```

::: normal-demo <details>标签使用
```html
<details>
  <summary>配置</summary>
  <p>
    i5-13500H，16GB LPDDR5 4800MHz 内存，1TB 固态硬盘，14英寸 2520×1680分辨率 100%sRGB色域 120Hz刷新率 IPS屏，电池容量 75Wh，厚 15.9~17.1 mm，机身重 1.52kg，适配器重 206g
  </p>
</details>
```
```css
details {
  font:
    16px "Open Sans",
    Calibri,
    sans-serif;
  width: 620px;
}

details > summary {
  padding: 2px 6px;
  width: 15em;
  background-color: #ddd;
  border: none;
  box-shadow: 3px 3px 4px black;
  cursor: pointer;
  list-style: none;
}

details > p {
  border-radius: 0 0 10px 10px;
  background-color: #ddd;
  padding: 2px 6px;
  margin: 0;
  box-shadow: 3px 3px 4px black;
}
```
:::

## 6. `<dfn>`
- `<dfn>` 元素标记了被定义的术语；术语定义应当在 `<p>`, `<section>`或定义列表 (通常是`<dt>`, `<dd>` 对) 中给出。
- 如果 `<dfn>` 元素有一个 `title` 属性，那么该术语的值就是该属性的值。
- 如果它仅包含一个 `<abbr>` 元素，该元素拥有 `title` 属性，那么该术语的值就是该属性的值。
- 否则，`<dfn>` 元素的文本内容就是该术语的值。

::: normal-demo <dfn>标签使用
```html
<!-- Define "The Internet" -->
<p>
  <dfn id="def-internet">The Internet</dfn> is a global system of interconnected
  networks that use the Internet Protocol Suite (TCP/IP) to serve billions of
  users worldwide.
</p>
<dl>
  <!-- Define "World-Wide Web" and reference definition for "the Internet" -->
  <dt>
    <dfn>
      <abbr title="World-Wide Web">WWW</abbr>
    </dfn>
  </dt>
  <dd>
    The World-Wide Web (WWW) is a system of interlinked hypertext documents
    accessed on <a href="#def-internet">the Internet</a>.
  </dd>
</dl>
```
:::

## 7. `<dialog>`：对话框元素
- 属性：`open`：指示这个对话框是激活的和能互动的。当没有设置 `open` 属性时，对话框不应该显示给用户。推荐使用 `.show()` 或 `.showModal()` 方法来渲染对话框，而不是使用 `open` 属性。
- `<form>` 元素可关闭含有属性 `method="dialog"` 的对话框。当提交表单时，对话框的 `returnValue` 属性将会等于表单中被使用的提交按钮的 `value`。
- `::backdrop` CSS 伪元素可用于给使用 `HTMLDialogElement.showModal()` 显示的 `<dialog>` 元素背景添加样式，例如在对话框被打开激活时，调暗背景中不可访问的内容。

::: normal-demo <dialog>标签使用
```html
<!-- Simple modal dialog containing a form -->
<dialog id="favDialog">
  <form method="dialog">
    <p>
      <label
        >Favorite animal:
        <select>
          <option value="default">Choose…</option>
          <option>Brine shrimp</option>
          <option>Red panda</option>
          <option>Spider monkey</option>
        </select>
      </label>
    </p>
    <div>
      <button value="cancel">Cancel</button>
      <button id="confirmBtn" value="default">Confirm</button>
    </div>
  </form>
</dialog>
<p>
  <button id="updateDetails">Update details</button>
</p>
<output></output>
```
```js
const updateButton = document.getElementById("updateDetails");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof favDialog.showModal !== "function") {
  favDialog.hidden = true;
  /* a fallback script to allow this dialog/form to function
     for legacy browsers that do not support <dialog>
     could be provided here.
  */
}
// "Update details" button opens the <dialog> modally
updateButton.addEventListener("click", () => {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    outputBox.value =
      "Sorry, the <dialog> API is not supported by this browser.";
  }
});
// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener("close", () => {
  outputBox.value = `${
    favDialog.returnValue
  } button clicked - ${new Date().toString()}`;
});
```
:::

## 8. `<div>`标签

## 9. `<em>`：强调元素
- `<em>` 元素将文本标记为强调（emphasis）格式。`<em>` 元素可以嵌套，嵌套层次越深，则强调的程度越深。
- `<i>` 标签表示从正常散文中区分出的文本，例如外来词，虚构人物的思想，或者当文本指的是一个词语的定义，`<em>` 标签表示其内容的着重强调，在默认情况下，它们的视觉效果是一样的，都以斜体展示。

## 10. `<embed>`：外部内容嵌入元素
> `<embed>` 元素将外部内容嵌入文档中的指定位置。此内容由外部应用程序或其他交互式内容源（如浏览器插件）提供。

- 属性
  - `height`:资源显示的高度
  - `src`:被嵌套的资源的 URL
  - `type`:用于选择插件实例化的 MIME 类型
  - `width`:资源显示的宽度
  
```html
<embed type="video/quicktime" src="movie.mov" width="640" height="480" />
```

## 11. `<fencedframe>`
> 无需共享跨网站数据，即可安全地将内容嵌入网页。与`<iframe>`类似，但更为注重隐私，支持的对外通信选项较少。目前相关的文档较少，后续找到了单独学习。

```html
<fencedframe
  title="Advertisement for new Log. From Blammo!"
  width="640"
  height="320">
</fencedframe>
```

## 12. `<fieldset>`
> 用于对表单中的控制元素进行分组（也包括 `label` 元素）。

- 属性
  - `disabled`：如果设置了这个布尔值属性，`<fieldset>` 的所有子代表单控件也会继承这个属性。这意味着它们不可编辑，也不会随着 `<form>` 一起提交。它们也不会接收到任何浏览器事件，如鼠标点击或与聚焦相关的事件。默认情况下，浏览器会将这样的控件展示为灰色。注意，`<legend>` 中的表单元素不会被禁用。
  - `form`：将该值设为一个 `<form>` 元素的 id 属性值，以将 `<fieldset>` 设置成这个 `<form>` 的一部分。
  - `name`：元素分组的名称。
  
::: normal-demo <fieldset>标签使用
```html
<form action="#">
  <fieldset>
    <legend>Simple fieldset</legend>
    <input type="radio" id="radio" />
    <label for="radio">Spirit of radio</label>
  </fieldset>
</form>
```
:::

## 13. `<figure>`和`<figcaption>`
### 13.1 `<figure>`：可附标题内容元素
> `<figure>` 元素代表一段独立的内容，可能包含 `<figcaption>` 元素定义的说明元素。

- 通常，`<figure>` 的内容为图像、插图、图表、代码片段等，在文档的主内容流中引用，但可以移动到文档的另一部分或附录而不影响主内容流。
- 通过在其中插入 `<figcaption>`（作为第一个或最后一个子元素），可以将标题与 `<figure>` 元素相关联。图中找到的第一个 `<figcaption>` 元素显示为图的标题。
  
### 13.2 `<figcaption>`
> `<figcaption>` HTML 元素是用来描述其父节点 `<figure>` 元素里的其余内容的标题或说明。为 `<figure>` 提供一个无障碍描述。

### 13.3 用法示例
::: normal-demo <figure>和<figcaption>标签使用：引用
```html
<figure>
  <figcaption><b>Edsger Dijkstra:</b></figcaption>
  <blockquote>
    If debugging is the process of removing software bugs, then programming must
    be the process of putting them in.
  </blockquote>
</figure>
```
:::

::: normal-demo <figure>和<figcaption>标签使用：图片
```html
<figure>
  <img
    style="width:100px;height:100px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    alt="bird" />
  <figcaption>A beautiful bird.</figcaption>
</figure>
```
:::

## 14. `<footer>`：页脚元素
> `<footer>` 元素表示其最近的祖先分段内容的页脚或分段根元素。`<footer>` 通常包含有关该部分作者、版权数据或相关文档链接的信息。

- 在 `<address>` 元素中包含有关作者的信息，该元素可以包含在 `<footer>` 元素中。
- 当最近的祖先分段内容或分段根元素是 `body` 元素时，页脚适用于整个页面。
- `<footer>` 元素不是分段内容，因此不会在大纲中引入新的分段。

::: normal-demo <footer>标签使用
```html
<body>
  <h3>FIFA 世界杯最佳射手</h3>
  <ol>
    <li>米罗斯拉夫 · 克洛泽，16</li>
    <li>罗纳尔多 · 纳扎里奥，15</li>
    <li>格尔德 · 穆勒，14</li>
  </ol>

  <footer>
    <small> 版权所有 © 2023 足球历史档案馆。保留所有权利。 </small>
  </footer>
</body>
```
```css
footer {
  text-align: center;
  padding: 5px;
  background-color: #abbaba;
  color: #000;
}
```
:::

## 15. `<form>`：表单元素
### 15.1 属性
- `accept-charset`：一个空格分隔或逗号分隔的列表，此列表包括了服务器支持的字符编码。浏览器以这些编码被列举的顺序使用它们。默认值是一个保留字符串 "`UNKNOWN`"。此字符串指的是，和包含此表单元素的文档相同的编码。 在之前版本的 HTML 中，不同的字符编码可以用空格或逗号分隔。在 HTML5 中，只有空格可以允许作为分隔符。
- `autocapitalize`：这是一个被 iOS Safari 使用的非标准属性。当用户在一些表单的文本后代控件中，输入/编辑一些文本值时，此属性控制了这些文本值的首字母是否大写或者使用其他的大写样式。如果 `autocapitalize` 属性在某个单独的表单后代控件被指定的话，那么此单独的设定会覆盖原来表单范围内的 `autocapitalize` 设定。默认值为 `sentences`。可以选择的值如下：
  - `none`：完全禁用自动首字母大写。
  - `sentences`：自动对每句话首字母大写。
  - `words`：自动对每个单词首字母大写。
  - `characters`：自动大写所有的字母。
- `autocomplete`：用于指示 `input` 元素是否能够拥有一个默认值，此默认值是由浏览器自动补全的。此设定可以被属于此表单的子元素的 `autocomplete` 属性覆盖。可选值：
  - `off`：浏览器可能不会自动补全条目（在疑似登录表单中，浏览器倾向于忽略该值，而提供密码自动填充功能）
  - `on`：浏览器可自动补全条目
- `name`：表单的名称。HTML 4 中不推荐（应使用 `id`）。在 HTML 5 中，该值必须是所有表单中独一无二的，而且不能是空字符串。
- `rel`：根据 `value` 创建一个超链接或注释。
- `action`：处理表单提交的 URL。这个值可被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素上的 `formaction` 属性覆盖。
- `enctype`：当 `method` 属性值为 `post` 时，`enctype` 就是将表单的内容提交给服务器的 `MIME` 类型 。可选值：
  - `application/x-www-form-urlencoded`：未指定属性时的默认值。
  - `multipart/form-data`：当表单包含 `type=file` 的 `<input>` 元素时使用此值。
  - `text/plain`：出现于 HTML5，用于调试。这个值可被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素上的 `formenctype` 属性覆盖。
- `method`：浏览器使用这种 HTTP 方式来提交 表单。可选值：
  - `post`：指的是 HTTP `POST` 方法；表单数据会包含在表单体内然后发送给服务器。
  - `get`：指的是 HTTP `GET` 方法；表单数据会附加在 `action` 属性的 URL 中，并以 '?' 作为分隔符。
  - `dialog`：如果表单在 `<dialog>` 元素中，提交时关闭对话框。此值可以被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素中的 `formmethod` 属性覆盖。
- `novalidate`：此布尔值属性表示提交表单时不需要验证表单。如果没有声明该属性（因此表单需要通过验证）。该属性可以被表单中的 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素中的 `formnovalidate` 属性覆盖。
- `target`：表示在提交表单之后，在哪里显示响应信息。
  - `_self`：默认值。在相同浏览上下文中加载。
  - `_blank`：在新的未命名的浏览上下文中加载。
  - `_parent`：在当前上下文的父级浏览上下文中加载，如果没有父级，则与 `_self` 表现一致。
  - `_top`：在最顶级的浏览上下文中（即当前上下文的一个没有父级的祖先浏览上下文），如果没有父级，则与 `_self` 表现一致。此值可以被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素中的 `formtarget` 属性覆盖。
  
### 15.2 示例
::: normal-demo <form>表单标签使用
```html
<!-- Form which will send a GET request to the current URL -->
<form>
  <label
    >Name:
    <input name="submitted-name" autocomplete="name" />
  </label>
  <button>Save</button>
</form>

<!-- Form which will send a POST request to the current URL -->
<form method="post">
  <label
    >Name:
    <input name="submitted-name" autocomplete="name" />
  </label>
  <button>Save</button>
</form>

<!-- Form with fieldset, legend, and label -->
<form method="post">
  <fieldset>
    <legend>Title</legend>
    <label><input type="radio" name="radio" /> Select me</label>
  </fieldset>
</form>
```
:::