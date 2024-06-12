---
title: table及相关元素
author: 怡然
createTime: 2024/06/07 15:40:36
permalink: /HTML/1d5e8gcg/
---

## 1. `<table>`：表格元素及其子元素
- `<caption>`: 表格标题。
- `<colgroup>`: 表格列组。
- `<thead>`: 定义表格的列头的行。
- `<tbody>`：表格主体元素。
- `<tfoot>`: 表格中各列的汇总行。
- `<tr>`：表格行元素。
- `<th>`: 定义表格内的表头单元格。
- `<td>`: 表格单元格内容。

::: normal-demo 表格
```html
<table>
  <caption>
    考试成绩
  </caption>
  <thead>
    <tr>
      <th scope="col">人名</th>
      <th scope="col">语文</th>
      <th scope="col">数学</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">小红</th>
      <td>89</td>
      <td>90</td>
    </tr>
    <tr>
      <th scope="row">小明</th>
      <td>92</td>
      <td>95</td>
    </tr>
    <tr>
      <th scope="row">小王</th>
      <td>98</td>
      <td>99</td>
    </tr>
    <tr>
      <th scope="row">小赵</th>
      <td>87</td>
      <td>89</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">平均成绩</th>
      <td>91.5</td>
      <td>93.25</td>
    </tr>
  </tfoot>
</table>
```
```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}
```
:::