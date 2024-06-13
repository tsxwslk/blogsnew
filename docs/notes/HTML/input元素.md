---
title: input元素
author: 怡然
createTime: 2024/06/07 15:40:15
permalink: /HTML/uvudilxw/
---

# `<input>`：输入（表单输入）元素

## 1. `<input>` 类型

> `<input>` 的工作方式相当程度上取决于 `type` 属性的值，不同的 `type` 值会在各自的参考页中进行介绍。如果未指定此属性，则采用的默认类型为 `text`。

### 1.1 `<input type="button">`

- `<input type="button">` 的 `value` 属性包含用作按钮标签的字符串。如果没有指定 `value`，会得到一个空的按钮。
- `<input type="button">` 元素没有默认行为，要让按钮做任何事情，你必须编写 JavaScript 代码。
- 要为一个按钮添加键盘快捷键，你可以使用 `accesskey` 全局属性。
- 按钮不参与到约束验证中；它们没有用于约束的真值。
::: normal-demo button 类型
```html
<form>
<input type="button" value="开动机器" />
</form>
<p>机器已经停下了。</p>
```
```js
const button = document.querySelector("input");
const paragraph = document.querySelector("p");
button.addEventListener("click", updateButton);
function updateButton() {
  if (button.value === "开动机器") {
    button.value = "停止机器";
    paragraph.textContent = "机器启动了！";
  } else {
    button.value = "开动机器";
    paragraph.textContent = "机器已经停下了。";
  }
}
```
:::

### 1.2 `<input type="checkbox">`
- `checkbox` 类型的 `<input>` 元素在默认情况下被呈现为激活时被选中（打勾）的方框。
- `name`与`value`的值为一对键值对，如果`value`的值被省略，则默认为`on`。
- `checked`为一个`checkbox`的特有属性，表示该复选框是否被默认选中（当页面加载时）。如果有多个复选框，传入的是选中复选框的`value`值。选中多个时，键值对之间用 `&` 连接。
- 除了选中和未选中的状态外，复选框还有第三种状态：不确定。这是一种无法说清该选项是被打开还是关闭的状态。这是通过 JavaScript 设置的 `HTMLInputElement` 对象的 `indeterminate` 属性（它不能用 HTML 属性设置）。最常见的是当一个复选框“拥有”一些子选项（也是复选框）的时候。如果所有的子选项都被选中，拥有的复选框也被选中，如果它们都没有被选中，拥有的复选框就没有被选中。如果任何一个或多个子选项的状态与其他选项不同，拥有的复选框就处于不确定的状态。
  ```js
  inputInstance.indeterminate = true;
  ```

::: normal-demo checkbox
```html
<fieldset>
  <legend>选择你的兴趣</legend>
  <div>
    <input type="checkbox" id="coding" name="interest" value="coding" checked />
    <label for="coding">编码</label>
  </div>
  <div>
    <input type="checkbox" id="music" name="interest" value="music" />
    <label for="music">音乐</label>
  </div>
</fieldset>
```
:::

### 1.3 `<input type="color">`
- 只支持简单颜色（无透明通道）。
- `color` 类型的 `<input>` 元素的 `value` 总是包含一个 7 个字符的字符串，它以 16 进制格式指定 RGB 颜色。虽然你可以用大写字母或小写字母输入颜色，但它将以小写字母形式存储。该值从不以任何其他形式出现，也从不为空。
- 如果当前的用户代理下，用户输入无法转换为 7 个字符的十六进制 RGB 形式，会被判定为非法输入。在这种情况下，`:invalid` 伪类会作用于该元素上。

::: normal-demo color
```html
<input type="color" value="#ff0000" />
```
:::

### 1.4 `<input type="date">`
- `type="date"` 类型的 `<input>` 元素会创建一个让用户输入一个日期的输入区域，可以使用自动验证内容的文本框，也可以使用特殊的日期选择器界面。结果值包括年份，月份和日期，但不包括时间。
- `value`为一个字符串，代表着输入到输入框的日期值。输入的日期按照日期字符串格式所描述的 ISO8601 标准进行格式化。
- 所接受最新的日期。如果输入到该元素中的 `value` 发生在此之后，则元素将无法通过约束验证。如果 `max` 属性的值不是格式为 `yyyy-mm-dd` 的有效日期星期字符串，则该元素没有最大日期值。
- 所接受最早的日期。如果输入到该元素中的 `value` 发生在此之前，则元素将无法通过约束验证。如果 `min` 属性的值不是格式为 `yyyy-mm-dd` 的有效日期星期字符串，则该元素没有最小日期值。
- 如果同时设置了 `max` 和 `min` 值，此值必须早于或等于 `max` 属性指定的日期值，晚于或等于 `min` 属性指定的日期值。
- 对于 `date` 输入，`step` 的值以天为单位，并被视为等于 86,400,000 乘以 `step` 值的毫秒数（基础数值是毫秒）。`step` 的默认值为 1，表示 1 天。
- 基于 `:valid` 和 `:invalid` 伪类来在输入框旁边添加小图标可以表示是否通过验证。
  
::: normal-demo data
```html
<form>
  <label>
    选择你的参会时间
    <input
      type="date"
      name="party"
      min="2024-04-01"
      max="2024-04-20"
      required />
    <span class="validity"></span>
  </label>
  <p>
    <button>Submit</button>
  </p>
</form>
```
```css
label {
  display: flex;
  align-items: center;
}

span::after {
  padding-left: 5px;
}

input:invalid + span::after {
  content: "✖";
}

input:valid + span::after {
  content: "✓";
}
```
:::

### 1.5 `<input type="datetime-local">`
- `<input>` 元素的 `datetime-local` 类型创建让用户便捷输入日期和时间的输入控件，包括“年”、“月”、“日”，以及“时”和“分”。

::: normal-demo datetime-local
```html
<form>
  <label for="party">输入预订宴会的日期和时间：</label>
  <input
    id="party"
    type="datetime-local"
    name="partydate"
    min="2024-06-01T08:30"
    max="2024-06-30T16:30" />
</form>
```
:::

### 1.6 `<input type="email">`
- `email` 类型的 `<input>` 元素能够让用户输入或编辑一个电子邮箱地址，如果指定了 `multiple` 属性，则可以输入多个电子邮箱地址。
- `<input>` 元素的 `value` 属性包含会自动验证是否为正确邮件地址形式的字符串。具体来说，此处有三种格式可以通过验证：
  - 一个空字符串（“”），表示用户未输入值或该值已被删除。
  - 单个符合格式的电子邮件地址。并不代表该邮件地址存在，而是说它至少在格式上是正确的，简单地讲就是 `username@domain` 或者 `username@domain.tld`。
  - 当且仅当指定了 `multiple` 属性时，值可以是一个列表，该列表包含一串符合格式的电子邮件地址，且每个地址之间用逗号分隔。列表中，位于每个地址之前和之后的任何空白字符都会被移除。
- 如果指定了 `pattern` 属性，为了使 `value` 通过约束验证，必须满足该属性给定的正则表达式。它必须是 `RegExp` 类型的有效 JavaScript 正则表达式。

::: normal-demo email
```html
<input type="email" size="40" list="defaultEmails" />
<datalist id="defaultEmails">
  <option value="jbond007@mi6.defence.gov.uk"></option>
  <option value="jbourne@unknown.net"></option>
  <option value="nfury@shield.org"></option>
  <option value="tony@starkindustries.com"></option>
  <option value="hulk@grrrrrrrr.arg"></option>
</datalist>
```
:::

### 1.7 `<input type="file">`
- 带有 `type="file"` 的 `<input>` 元素允许用户可以从他们的设备中选择一个或多个文件。选择后，这些文件可以使用提交表单的方式上传到服务器上，或者通过 Javascript 代码和文件 API 对文件进行操作。
- 文件 `input` 的 `value` 属性包含了一个字符串，表示已选择文件的路径。如果用户没有选择任何文件，则该值为空字符串（""）。如果用户选择了多个文件，则 `value` 表示他们选择的文件列表中的第一个文件。可以使用 `input` 的 `HTMLInputElement.files` 属性标识其他文件。
- `capture` 属性是一个字符串，如果 `accept` 属性指出了 `input` 是图片或者视频类型，则它指定了使用哪个摄像头去获取这些数据。值 `user` 表示应该使用前置摄像头和（或）麦克风。值 `environment` 表示应该使用后置摄像头和（或）麦克风。如果缺少此属性，则用户代理可以自由决定做什么。如果请求的前置模式不可用，则用户代理可能退回到其首选的默认模式。

::: normal-demo file
```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="profile_pic">选择要上传的文件</label>
    <input
      type="file"
      id="profile_pic"
      name="profile_pic"
      accept=".jpg, .jpeg, .png" />
  </div>
  <div>
    <button>提交</button>
  </div>
</form>
```
:::

### 1.8 `<input type="hidden">`
- `hidden` 类型的 `<input>` 元素允许 Web 开发者包含用户不可见、不可改的数据，在用户提交表单时，这些数据会一并发送出。比如，正被请求或编辑的内容的 ID，或是一个唯一的安全令牌。这些隐藏的 `input` 元素在渲染完成的页面中完全不可见，而且没有方法可以使它重新变为可见。
- 一般来说，`name` 属性在隐藏的 `input` 输入中与在非隐藏的 `input` 输入的表现是一样的；但是，在提交表单时，会自动包含一个 `name` 属性被设置为 `_charset_`的隐藏 `input`，其值会被自动设置为被提交表单的字符编码。
- 隐藏的 `input` 不参与约束验证；它们没有可受到约束的属性值。

::: normal-demo hidden
```html
<form>
  <div>
    <label for="title">文章标题：</label>
    <input type="text" id="title" name="title" value="将进酒" />
  </div>
  <div>
    <label for="content">文章内容：</label>
    <textarea id="content" name="content" cols="60" rows="5">君不见，黄河之水天上来，奔流到海不复回。</textarea>
  </div>
  <div>
    <button type="submit">更新文章</button>
  </div>
  <input type="hidden" id="postId" name="postId" value="34657" />
</form>
```
```css
html {
  font-family: sans-serif;
}

form {
  width: 500px;
}

div {
  display: flex;
  margin-bottom: 10px;
}

label {
  flex: 2;
  line-height: 2;
  text-align: right;
  padding-right: 20px;
}

input,
textarea {
  flex: 7;
  font-family: sans-serif;
  font-size: 1.1rem;
  padding: 5px;
}

textarea {
  height: 60px;
}
```
:::

### 1.9 `<input type="image">`
- `image` 类型的 `<input>` 元素用于创建图形化的提交按钮，即采用图像而非文本形式的提交按钮。
- `<input type="image">` 元素不接受 `value` 属性。要显示的图像的路径在 `src` 属性中指定。

::: normal-demo image
```html
<form>
  <p>登录到你的账户</p>
  <div>
    <label for="userId">用户 ID</label>
    <input type="text" id="userId" name="userId" />
  </div>
  <div>
    <label for="pwd">密码</label>
    <input type="password" id="pwd" name="pwd" />
  </div>
  <div>
    <input
      id="image"
      type="image"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      alt="Login"
      width="100" />
  </div>
</form>
```
```css
div {
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 70px;
  text-align: right;
  padding-right: 10px;
}
```
:::

### 1.10 `<input type="month">`
- 类型为 `month` 的 `<input>` 可以创建一个方便输入年份或月份的一个 `<input>`。输入的值是一个经过“`YYYY-MM`”格式化的字符串。

::: normal-demo month
```html
<form>
  <label for="bday-month">选择你的出生年月：</label>
  <input id="bday-month" type="month" name="bday-month" />
</form>
```
:::

### 1.11 `<input type="number">`
- `number` 类型的 `<input>` 元素用于让用户输入一个数字，其包括内置验证以拒绝非数字输入。

::: normal-demo number
```html
<label for="ticketNum">需要买票的数量：</label>
<input id="ticketNum" type="number" name="ticketNum" value="0" />
```
:::

### 1.12 `<input type="password">`
- `password` 类型的 `<input>` 元素可以让用户更加安全的输入密码。
  
::: normal-demo password
```html
<label for="hexId">十六进制 ID：</label>
<input
  id="hexId"
  type="password"
  pattern="[0-9a-fA-F]{4,8}"
  title="输入包含 4~8 个十六进制字符的 ID"
  autocomplete="new-password" />
```
:::

### 1.13 `<input type="radio">`
- `radio` 类型的 `<input>` 元素通常用于一个单选组中，其中包含一组描述一系列相关选项的单选按钮。

::: normal-demo radio
```html
<form>
  <fieldset>
    <legend>请选择首选的联系方式：</legend>
    <div>
      <input
        type="radio"
        id="contactChoice1"
        name="contact"
        value="email"
        checked />
      <label for="contactChoice1">电子邮件</label>

      <input type="radio" id="contactChoice2" name="contact" value="phone" />
      <label for="contactChoice2">电话</label>

      <input type="radio" id="contactChoice3" name="contact" value="mail" />
      <label for="contactChoice3">邮件</label>
    </div>
    <div>
      <button type="submit">提交</button>
    </div>
  </fieldset>
</form>
```
:::

### 1.14 `<input type="range">`
- `range` 类型的 `<input>` 元素允许用户指定一个数值，该数值必须不小于给定值，并且不得大于另一个给定值。但是，其精确值并不重要。通常使用滑块或拨号控件而不是像 `number` 输入类型这样的文本输入框来表示。

::: normal-demo range
```html
<label for="temp">选择一个合适的评价：</label><br />
<input type="range" id="temp" name="temp" list="tickmarks" />
<datalist id="tickmarks">
  <option value="0" label="非常不满意"></option>
  <option value="25" label="不满意"></option>
  <option value="50" label="一般"></option>
  <option value="75" label="满意"></option>
  <option value="100" label="非常满意"></option>
</datalist>
```
```css
datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 200px;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 200px;
  margin: 0;
}
```
:::

### 1.15 `<input type="reset">`
- `reset` 类型的 `<input>` 元素将渲染为按钮，且带有默认的 `click` 事件，用于将表单中的所有输入重置为其初始值。

::: normal-demo reset
```html
<form>
  <div>
    <label for="example">请输入用户名</label>
    <input id="example" type="text" />
  </div>
  <div>
    <input type="reset" value="重置输入框" />
  </div>
</form>
```
:::

### 1.16 `<input type="search">`
- `search` 类型的 `<input>` 是专为用户输入查询文本而设计的字段。

::: normal-demo search
```html
<form>
  <div>
    <input type="search" id="mySearch" name="q" placeholder="博客内搜索……" />
    <button>搜索</button>
  </div>
</form>
```
:::

### 1.17 `<input type="submit">`
- `submit` 类型的 `<input>` 元素会渲染为按钮。当 `click` 事件发生时（用户点击按钮是一个典型的点击事件）， 浏览器尝试提交表单到服务器。

::: normal-demo submit
```html
<form>
  <div>
    <label for="example">输入《将进酒》的作者进行验证：</label>
    <input id="example" type="text" name="text" />
    <input type="submit" value="发送" />
  </div>
</form>
```
:::

### 1.18 `<input type="tel">`
- `tel` 类型的 `<input>` 元素用于让用户输入和编辑电话号码。不同于 `<input type="email">` 和 `<input type="url">`，在提交表单之前，输入值不会被自动验证为特定格式，因为世界各地的电话号码格式差别很大。
- `tel`类型在移动端浏览器会调出适合输入电话号码的键盘。

::: normal-demo tel
```html
<label for="telNumber">电话号码：</label>
<input type="tel" id="telNumber" name="telName" />
```
:::

### 1.19 `<input type="text">`
- `text` 类型的 `<input>` 元素创建了基础的单行文本字段。
  
::: normal-demo text
```html
<form>
  <div>
    <label for="textIn">输入一个用户名：</label>
    <input type="text" id="textIn" name="username" />
    <input type="submit" />
  </div>
</form>
```
:::

### 1.20 `<input type="time">`
- 类型为 `time` 的 `<input>` 元素，旨在让用户轻松输入时间（小时和分钟，以及可选的秒）。
- 当设置 `step` 值时，`step` 小于60s时，可以显示秒的设置。

::: normal-demo time
```html
<form>
  <div>
    <label for="monthTime">选择一个不带秒的时间：</label>
    <input type="time" id="monthTime" name="time1" />
  </div>
  <div>
    <label for="secondTime">选择一个带秒的时间：</label>
    <input type="time" id="secondTime" name="time1" step="1"/>
  </div>
</form>
```
:::

### 1.21 `<input type="url">`
- `url` 类型的 `<input>` 元素用来让用户输入和编辑 URL。

::: normal-demo url
```html
<input id="myURL" name="myURL" type="url" list="defaultURLs" placeholder="输入想要跳转的网站" />
<datalist id="defaultURLs">
  <option value="https://developer.mozilla.org/" label="MDN Web Docs"></option>
  <option value="http://www.google.com/" label="Google"></option>
  <option value="http://www.microsoft.com/" label="Microsoft"></option>
  <option value="https://www.mozilla.org/" label="Mozilla"></option>
  <option value="http://w3.org/" label="W3C"></option>
</datalist>
```
:::

### 1.22 `<input type="week">`
- `<input>` 类型为 `week` 的元素会创建输入字段，以便轻松输入年份以及该年（即第 1 周到第 52 或 53 周）的 ISO 8601 星期数。

::: normal-demo week
```html
<label for="week">选择参加培训的时间：</label>
<input id="week" type="week" name="week" value="2024-W01" />
```
:::

## 2. 属性
### 2.1 `accept`
- 仅对 `file` 输入类型有效。`accept` 属性定义了 `file` 上传控件可选择文件类型的列表。

### 2.2 `alt`
- 仅对 `image` 类型有效。`alt` 属性提供了图片的替代文字，在图片的 `src` 属性缺失或对应资源加载失败时，会显示该属性的值。

### 2.3 `autocomplete`
- `autocomplete` 属性对 `hidden`、`text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`range`、`color` 和 `password` 类型的输入有效。
- 非布尔值。

### 2.4 `autofocus`
- 一个布尔属性，如果存在，表示当页面加载完毕（或包含该元素的 `<dialog>` 显示完毕）时，该 `input` 元素应该自动拥有焦点。
- 文档中只有一个表单元素可以具有 `autofocus` 属性。如果放置了多于一个元素，会聚焦第一个具有该属性的元素。
- `autofocus` 不能应用于类型为 `hidden` 的输入控件上，因为隐藏的控件不可聚焦。

### 2.5 `capture`
- 在 HTML 媒体捕获规范中引入，仅对 `file` 输入类型有效，`capture` 属性定义了应该使用哪种媒体（如麦克风、视频或相机）来捕获一个新文件，以便在支持场景中用 `file` 上传控件上传。

### 2.6 `checked`
- 布尔属性，对于 `radio` 和 `checkbox` 类型有效。如果在 `radio` 类型上出现，代表该单选按钮是当前同名称组中所选定的那一个。如果在 `checkbox` 类型上出现，代表页面加载时，默认选择该复选框，这并不代表复选框当前是否选择：如果复选框状态改变，该内容属性不会反馈这种改变。

### 2.7 `dirname`
- 仅对 `text` 和 `search` 输入类型有效。`dirname` 属性允许提交元素的方向。当包含这个属性时，表单控件将提交两个名称/值对：第一个是 `name` 和 `value`，第二个是 `dirname` 作为名称，其值为浏览器设置的 `ltr` 或 `rtl`。

::: normal-demo dirname
```html
<form>
  <label
    >水果：
    <input type="text" name="fruit" dirname="fruit.dir" value="cherry" />
  </label>
  <input type="submit" />
</form>
<!-- page.html?fruit=cherry&fruit.dir=ltr -->
```
:::

### 2.8 `disabled`
- 一个布尔属性，如果存在的话，表示用户不应该与该输入进行交互。禁用的输入通常以较暗的颜色呈现，或使用一些其他形式的指示，表明该字段不能使用。

### 2.9 `form`
- 一个字符串，指定该输入与之相关的 `<form>` 元素（即其表单所有者）。如果存在该属性，该字符串的值必须与相同文档中的 `<form>` 元素的 `id` 相同。如果没有指定该属性，该 `<input>` 元素与最近包含它的表单相关。

### 2.10 `formaction`,`formenctype`,`formmethod`,`formnovalidate`,`formtarget`
- 仅对 `image` 和 `submit` 输入类型有效。
- `formaction`: 一个字符串，指示要将数据提交到的 `URL`。这优先于拥有 `<input>` 的 `<form>` 元素上的 `action` 属性。
- `formenctype`: 一个字符串，标识在将表单数据提交到服务器时要使用的编码方法。有三个允许的值：
  - `application/x-www-form-urlencoded`: 这是默认值，它使用 `encodeURI()` 之类的算法对文本进行 `URL` 编码后，以字符串形式发送表单数据。
  - `multipart/form-data`: 使用 `FormData API` 来管理数据，从而允许将文件提交到服务器。如果表单包含`<input type="file">`的任何 `<input>` 元素，则必须使用此编码类型。
  - `text/plain`: 纯文本；通常仅对调试有用，调试人员可以轻松查看要提交的数据。
- `formmethod`: 一个字符串，指示提交表单数据时要使用的 `HTTP` 方法；此值将覆盖所属表单上给出的任何 `method` 属性。允许的值为：
  - `get`: `URL` 通过 `formaction` 或 `action` 属性给出的 `URL` 开始，加上一个问号（“?”）字符，然后加上表单的数据，按照 `formenctype` 或表单的`enctype` 属性的描述进行编码。然后使用 HTTP `get` 请求将这个 `URL` 发送到服务器。这种方法对于只包含 ASCII 字符且没有副作用的简单表单很有效。这是默认值。
  - `post`: 表单的数据包含在请求的正文中，该请求的正文使用 HTTP `post` 请求发送到由 `formaction` 或 `action` 属性指定的 `URL` 请求。此方法支持复杂的数据和文件附件。
  - `dialog`: 此方法用于指示按钮仅关闭与输入关联的对话框，而根本不传输表单数据。
- `formnovalidate`: 布尔属性，如果存在，则指定在提交给服务器之前不应对表单进行验证。这将覆盖所属表单上的 `novalidate` 属性的值。
- `formtarget`: 一个字符串，它指定一个名称或关键字，该名称或关键字指示提交表单后在何处显示收到的响应。该字符串必须是浏览上下文的名称（即选项卡、窗口或 `<iframe>`）。此处指定的值将覆盖 `<form>` 上拥有此输入的 `target` 属性。除了选项卡、窗口或内联框架的实际名称之外，还可以使用一些特殊的关键字：
  - `_self`: 将响应加载到与包含表单的浏览上下文相同的浏览上下文中。这将用接收到的数据替换当前文档。如果未指定，则使用默认值。
  - `_blank`: 将响应加载到新的未命名浏览上下文中。这通常是一个与当前文档相同的窗口中的新选项卡，但是根据用户代理的配置可能会有所不同。
  - `_parent`: 将响应加载到当前浏览器的父浏览上下文中。如果没有父上下文，则其行为与 `_self` 相同。
  - `_top`: 将响应加载到顶级浏览上下文中；这是浏览上下文，它是当前上下文的最高级祖先。如果当前上下文是最顶层的上下文，则其行为与 `_self` 相同。

### 2.11 `height`,`width`
- 仅对 `image` 输入按钮有效。`height` 是要显示代表图形提交按钮的图片的高度。
- 仅对 `image` 输入按钮有效。`width` 是呈现在图片提交按钮上的图片宽度。

### 2.12 `id`
- 全局属性对所有元素有效，包括所有的输入类型，它定义了一个唯一的标识符（ID），在整个文档中必须是唯一的。其目的是为了在链接时识别该元素。该值被用作 `<label>` 的 `for` 属性的值，以便将标签与表单控件连接起来。

### 2.13 `inputmode`
- 对所有元素都有效的全局值，它为浏览器提供了一个提示，说明在编辑这个元素或其内容时要使用的虚拟键盘配置类型。值包括 `none`、`text`、`tel`、`url`、`email`、`numeric`、`decimal` 和 `search`。

### 2.14 `list`
- 给予 `list` 属性的值应该是位于同一文档中的 `<datalist>` 元素的 `id`。
- `<datalist>` 提供了一个预定义值的列表，向用户建议这个输入。列表中任何与`type`不兼容的值都不包括在建议的选项中。所提供的值是建议，不是要求：用户可以从这个预定义的列表中选择，或者提供不同的值。
- 在 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`range` 和 `color` 上均有效。

### 2.15 `max`,`min`
- 对 `date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `range` 输入类型有效，定义了允许值范围内的最大（小）值。如果输入到元素中的 `value` 超过此值，则该元素将无法通过约束验证。如果 `max`(`min`) 属性的值不是数字，则元素没有最大（小）值。
- `min`值必须小于或等于 `max` 属性的值。如果 `min` 属性存在但没有指定或无效，则不应用 `min` 值。如果 `min` 属性有效，并且非空值小于 `min` 属性所允许的最小值，约束验证将阻止表单提交。
- 有一种特殊情况：如果数据类型是周期性的（如日期或时间），`max` 的值可能低于 `min` 的值，这表明范围可以环绕；例如，这允许你指定一个从晚上 10 点到凌晨 4 点的时间范围。

### 2.16 `maxlength`,`minlength`
- 对 `text`、`search`、`url`、`tel`、`email` 和 `password` 类型有效。它定义了用户可以输入到该字段中的最大字符数（以 UTF-16 码点为单位）。必须为大于等于 0 的整数。如果未指定 `maxlength` 或指定了无效的值，则该字段将没有最大值。这个值也必须大于等于 `minlength` 的值。
- `minlength`为输入的最小字符数。

### 2.17 `multiple`
- 如果设置了布尔值 `multiple` 属性，意味着用户可以在电子邮件部件中输入逗号分隔的电子邮件地址，或者可以通过 `file` 输入选择多个文件。

### 2.18 `name`
- 一个指定输入控件名称的字符串。当表单数据被提交时，这个名字会和控件的值一起提交。
- 通常把 `name` 看作是一个必需的属性（即使它不是）。如果一个输入没有指定 `name`，或者 `name` 是空的，那么这个输入的值就不会和表单一起提交！禁用的控件、未选中的单选按钮、未选中的复选框和重置按钮也不会被发送。
- `_charset_`：如果被用作 `hidden` 类型的 `<input>` 元素的名称，该输入的 `value` 会被用户代理自动设置为提交表单时使用的字符编码。

### 2.19 `pattern`
- 对 `text`、`search`、`url`、`tel`、`email` 和 `password` 类型有效。为了使 `value` 通过约束验证，必须满足 `pattern` 属性给定的正则表达式。它必须是 `RegExp` 类型的有效 JavaScript 正则表达式，并且已在我们的正则表达式指南中进行了说明；在编译正则表达式时指定了 'u' 标志，因此该模式被视为 Unicode 代码点的序列，而不是 ASCII。模式文本周围无需指定正斜杠。

### 2.20 `placeholder`
- 对 `text`、`search`、`url`、`tel`、`email`、`password` 和 `number` 有效。`placeholder` 属性可向用户提供有关该字段中需要什么样的信息的简短提示。它应该是一个单词或短语来说明预期的数据类型，而不是说明性消息。文本中不得包含回车符或换行符。例如，某个字段需要收集用户的姓氏，其标签为“First Name”，一个适合的占位文字可能是“如 Mustafa”。

### 2.21 `readonly`
- 一个布尔属性，如果存在，则表示该字段不能由用户编辑。`readonly` 属性支持 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `password` 输入类型。

### 2.22 `required`
- `required` 是一个布尔属性，如果存在，则表示用户必须在提交表单之前指定一个非空值。`required` 属性支持 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`password`、`checkbox`、`radio` 和 `file` 输入类型。

### 2.23 `size`
- 对 `email`、`password`、`tel`、`url` 和 `text` 有效。`size` 属性指示显示输入控件的多少。基本上创建了与设置 CSS `width`属性相同的结果，但有一些特殊性，值的具体单位取决于输入类型。对于 `password` 和 `text`，它是字符数量（或 `em` 单位大小），默认值是 20。对于其他情况，是像素值（或 `px` 单位大小）。CSS `width` 的优先级会高于 `size` 属性。

### 2.24 `src`
- 仅对 `image` 输入按钮有效。指定将要在提交按钮上显示的图像的 URL。

### 2.25 `step`
- 对 `date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `range` 输入类型有效。`step` 属性指定了值必须满足的粒度。

### 2.26 `tabindex`
- 对所有元素有效的全局属性，包括所有的输入类型，是一个整数属性，表示该元素如果参与顺序键盘导航，是否可以接受输入焦点（可聚焦）。由于除了隐藏类型的输入外，所有的输入类型都是可聚焦的，这个属性不应该用在表单控件上，因为这样做需要管理文档中所有元素的聚焦顺序，如果设置错误，就有可能损害可用性和无障碍性。

### 2.27 `title`
- 对所有元素有效的全局属性，包括所有的输入类型，包含一个代表与它所属的元素相关的咨询信息的文本。这样的信息通常以工具提示的形式呈现给用户（但不必要）。标题不应作为表单控件用途的主要解释。相反，可以使用 `<label>` 元素，其 `for` 属性设置为表单控件的 `id` 属性。

### 2.28 `type`
- 一个字符串，指定要渲染的控件的类型。

### 2.29 `value`
- 输入控件的值。

## 3. 非标准属性
|属性|描述|
|:-----------:|:------------:|
|`autocorrect`|指定自动更正状态的字符串，状态为 `on` 或 `off`。仅 Safari 适用。|
|`incremental`|是否重复发送 `search` 事件，以便在用户仍在编辑字段值时更新实时搜索结果。WebKit 和 Blink 适用（Safari、Chrome、Opera 等）。|
|`orient`|设置范围滑块的呈现方向。仅 Firefox 适用。|
|`results`|下拉菜单显示的最大查找结果数量。仅 Safari 适用。|
|`webkitdirectory`|一个布尔值，表示在文件选取界面中，只有目录可供用户选择。|

## 4. 方法
1. `checkValidity()`: 如果元素的值通过了有效性检查，返回 `true`；否则，返回 `false` 并在该元素上触发 `invalid` 事件。
2. `reportValidity()`: 如果元素的值通过了有效性检查，返回 `true`；否则，返回 `false` 并在该元素上触发 `invalid` 事件，如果事件没有取消，将问题报告给用户。
3. `select()`: 如果 `<input>` 元素中的内容可选择，则选择其中的全部内容。对于没有可供选择的文字内容的元素（如可视化颜色选择器或日历日期输入），这个方法不做任何事情。
4. `setCustomValidity()`: 如果输入元素的值不合法，设置显示的自定义信息。
5. `setRangeText()`: 将输入元素中指定的字符范围的内容设置为一个给定的字符串。selectMode 参数可以控制现有内容如何被影响。
6. `setSelectionRange()`: 在一个文本输入元素中选择指定的字符范围。对不以文本输入字段形式出现的输入没有任何作用。
7. `stepDown()`: 默认情况下，将一个数字输入的值减少 1，或减少指定的单位数量。
8. `stepUp()`: 默认情况下，将一个数字输入的值增加 1，或增加指定的单位数量。