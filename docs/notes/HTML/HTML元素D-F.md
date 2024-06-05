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
