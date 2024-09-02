---
title: 面试总结CSS部分
author: 怡然
createTime: 2024/09/02 10:50:07
permalink: /article/3q5muwyh/
---

### 1. 盒模型
:::info
一个典型的CSS盒模型包括四个部分：
- Content（内容）：这是实际的内容区域，例如文本或图片所占据的空间。它的大小由元素的width和height属性决定。
- Padding（内边距）：位于内容区和边框之间的透明区域。可以通过设置padding属性来调整内边距的大小。内边距可以为每个方向单独设置，也可以统一设置所有方向。
- Border（边框）：围绕在内边距周围的线或装饰。边框的样式、宽度和颜色可以通过border-style、border-width和border-color等属性来定义。
- Margin（外边距）：边框之外的透明区域，用来控制元素与其他元素之间的距离。margin属性可以设置外边距的大小，同样可以针对不同方向分别设置。
:::
1. 标准盒模型：元素的width和height属性仅指定了内容区的尺寸。元素的实际宽度等于内容区宽度加上左右内边距和左右边框的宽度，实际高度等于内容区高度加上上下内边距和上下边框的高度。
2. IE盒模型：IE盒模型（有时也称为Border Box模型）是通过使用CSS3中的`box-sizing`属性实现的。在这种模式下，`width`和`height`属性包含了内容区、内边距和边框的宽度/高度。这意味着设置的宽度和高度是元素实际占据的空间，而不是仅仅内容区的尺寸。

```css
/* 使用标准盒模型 */
div {
  width: 300px;
  padding: 10px;
  border: 10px solid black;
}

/* 使用IE盒模型 */
div {
  box-sizing: border-box;
  width: 300px;
  padding: 10px;
  border: 10px solid black;
}
```

### 2. 常见CSS定位方式
1. 通过`position`属性设置定位方式

|            |                                                                              规则                                                                               |                     定位参照物                     |                 对文档流的影响                 |                         使用场景                         |
| :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------: | :--------------------------------------------: | :------------------------------------------------------: |
|  `static`  |                                                            默认定位方式，元素按照正常文档流进行布局                                                             |                  没有特殊的参照物                  |                  不影响文档流                  |              元素不需要特定的位置控制时使用              |
| `relative` |                                相对定位基于元素自身的原始位置进行偏移。使用`top`、`right`、`bottom`、`left`属性可以指定偏移量。                                 |                 元素自身的原始位置                 | 元素仍然占用原有的空间，不影响其他元素的位置。 |     当需要微调元素的位置但不希望影响其他元素时使用。     |
| `absolute` | 绝对定位的元素相对于最近的已定位祖先元素（设置了`position`为`relative`、`absolute`或`fixed`的父级元素）进行定位。如果没有已定位的祖先，则相对于`<html>`根元素。 |           最近的已定位的祖先元素或根元素           |        元素脱离文档流，不再占用任何空间        |      当需要精准控制元素位置而不影响其他元素时使用。      |
|  `fixed`   |                                            固定定位的元素相对于浏览器窗口进行定位，无论页面如何滚动，元素位置不变。                                             |                    浏览器窗口。                    |       元素脱离文档流，不再占据任何空间。       |      常用于返回顶部等需要固定在屏幕某个位置的元素。      |
|  `sticky`  |                   粘性定位结合了相对定位和固定定位的特点。元素在常规文档流中定位，但当页面滚动超过某个阈值时，元素会固定在视口中的某个位置。                    | 在常规文档流中的位置，当条件满足时变为浏览器窗口。 |    在变成固定定位之前，元素占据原本的空间。    | 适用于需要在滚动到一定位置时固定下来的元素，如导航栏等。 |

2. 通过`float`属性设置定位方式

2.1 浮动（float）允许一个元素从文档流中移出，并向左或向右移动，直到碰到父容器的边缘或其他浮动元素的边缘。浮动元素周围的非浮动元素（如文本）会自动环绕浮动元素。

2.2 浮动的规则
> - ***浮动的方向***：使用`float`属性来指定元素的浮动方向，可以是`left`或`right`。
> - ***脱离文档流***：浮动元素脱离了文档流，不再占据其原本的空间。这意味着后续的块级元素可能会填补其原来的位置。
> - ***环绕内容***：非浮动元素（如文本）会自动环绕浮动元素。
> - ***浮动元素的堆叠***：具有相同浮动方向的元素会沿该方向堆叠，直到遇到父容器边界或其他浮动元素。

::: normal-demo
```html
<div style="float: left; width: 100px; height: 100px; background-color: red;">A</div>
<p>这段文本将会环绕在红色方块的右侧。</p>
```
:::

2.3 ***浮动对父容器的影响***：当一个元素浮动时，它会影响到父容器的高度计算。如果父容器内的所有元素都浮动了，并且父容器本身没有显式设置高度，那么父容器的高度将会坍塌，因为它不再包含任何非浮动的内容。

2.4 清除浮动：当所有的子元素都浮动时，父元素如果没有明确的高度，它将不会扩展到包含所有的浮动子元素。通过清除浮动，可以避免其他非浮动元素紧贴在浮动元素之后。
- 使用`clear`属性：`clear`属性可以应用于非浮动元素，使其下方不允许有任何浮动元素。它可以接受以下值：
  - `left`：不允许左侧有浮动元素。
  - `right`：不允许右侧有浮动元素。
  - `both`：左右两侧都不允许有浮动元素。
  - `none`：默认值，不进行任何清除操作。

::: normal-demo 
```html
<div style="float: left; width: 100px; height: 100px; background-color: red;"></div>
<div style="clear: both; width: 100px; height: 100px; background-color: blue;"></div>
```
:::

- 使用伪元素 `::after` 和 `clearfix` 技巧：通过在父元素上使用伪元素来插入一个清除浮动的元素。
```html
<div class="parent clearfix">
  <div style="float: left; width: 100px; height: 100px; background-color: red;"></div>
</div>
<div style="width: 100px; height: 100px; background-color: blue;"></div>
```
```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

- 使用 overflow 属性：设置父元素的`overflow`属性为`auto`或`hidden`也可以清除浮动。
```css
.parent {
  overflow: auto;
}
```

### 3. 雪碧图的实现原理
> 雪碧图是一种将多个小图标合并到一张大图像中的技术，目的是减少HTTP请求次数，从而提高页面加载速度。

1. 实现步骤：
  - 将多个小图标拼接到一张大图像中。
  - 在CSS中使用background-image属性设置这张大图像作为背景。
  - 利用background-position属性来控制显示哪一个图标。通过设置不同的x和y坐标值来显示不同的图标部分。
2. 优点：
  - 减少了HTTP请求次数，提高了性能。
  - 方便管理和维护图像。
3. 缺点：
  - 当图标需要更新时，可能需要重新制作整个雪碧图。
  - 对于非常大的雪碧图，可能会增加图像的加载时间。

### 4. 水平垂直居中的方案
#### 4.1 块级元素的居中
1. 水平居中
- 直接使用`margin:0 auto;`
:::details
```html
<div class="block">
  <div class="child"></div>
</div>
```
```css
.block{
  width: 700px;
  height: 400px;
  background: pink;
}
.child{
  width: 200px;
  height: 100px;
  background: #fff;
  margin: auto;
}
```
:::

- 使用定位让块级元素居中
:::details
```html
<div class="block">
  <div class="child"></div>
</div>
```
```css
.block{
  width: 700px;
  height: 400px;
  background: pink;
  position: relative;
}
.child{
  width: 200px;
  height: 100px;
  background: #fff;
  position: absolute;
  left:50%;
  /* margin-left:-100px; */ 
  transform: translateX(-50%); /* margin-left或者transform两者用任何一个都可以达到水平居中的效果 */
}
```
:::

2. 垂直居中：可以使用绝对定位配合父容器的`height`属性。

:::details
```html
<div class="block">
  <div class="child"></div>
</div>
```
```css
.block{
  width: 700px;
  height: 400px;
  background: pink;
  position: relative;
}
.child{
  width: 200px;
  height: 100px;
  background: #fff;
  position: absolute;
  left:50%;
  top: 50%;
  margin: 0 auto;
  margin-left:-100px; /* 配合上述所讲水平居中，这两行代码实现水平垂直居中 */
  transform: translateY(-50%);
}
```
:::

#### 4.2 行内元素的居中
1. 水平居中
- 直接使用`text-align:center;`

2. 垂直居中
- 设置`height`与`line-height`一致
:::details
```html
<div class="container">
  <span class="inline-block">我是垂直居中的行内块元素。</span>
</div>
```
```css
.container {
  height: 300px;
  line-height: 300px;
  background: pink;
  text-align: center;
}
```
:::

- 使用`vertical-align`属性
:::details
```html
<div class="container">
  <span class="inline-block">我是垂直居中的行内块元素。</span>
</div>
```
```css
.container {
  line-height: 300px;
  background: pink;
  /* 或其他固定高度 */
  text-align: center;
}
.inline-block {
  display: inline-block;
  vertical-align: middle;
}
```
:::

#### 4.3 flex布局居中
:::details
```html
<div class="flex-container">
  <div class="flex-item">我是水平居中的Flexbox元素。</div>
</div>
```
```css
.flex-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 300px;
}
```
:::

#### 4.4 grid布局居中
:::details
```html
<div class="grid-container">
  <div class="grid-item">我是水平和垂直居中的Grid元素。</div>
</div>
```
```css
.grid-container {
  display: grid;
  justify-items: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 300px;
}
```
:::

### 5. BFC是什么，BFC的布局规则，实现原理，可以解决的问题
> BFC（Block Formatting Context，块格式化上下文）是CSS中一种特殊的布局环境，是一块独立的渲染区域，它规定了处于BFC内部的块级元素如何布局。

#### 5.1 BFC的布局规则
1. 浮动元素：BFC内部的浮动元素不会影响其他元素的位置。浮动元素在BFC内部会沿着边缘放置，直到遇到另一个浮动元素或BFC的边界。
2. 块级盒子：BFC内部的块级盒子会在垂直方向上一个接一个地排列。
3. 行内盒子：BFC内部的行内盒子会在水平方向上一个接一个地排列，直到一行放不下时换行。
4. BFC的边界：BFC的边界不会与浮动元素重叠。
5. BFC的大小：BFC的大小由其包含的元素决定，除非显式设置了width或height，BFC的高度在计算时，内部的浮动元素也参与计算。
6. 清除浮动：BFC的边界会包含所有浮动的子元素，防止父元素高度坍塌。
7. 定位元素：绝对定位的元素不会参与BFC的布局，它们相对于最近的已定位祖先元素定位。
8. 相邻的两个块级元素的边距由margin决定；相邻的两个块级元素的margin会进行重叠，最终结果为二者的较大值（比如元素a的margin-bottom: 30px;元素b的margin-top: 20px;那么它们的边距就是30px）。

#### 5.2 BFC的创建
1. 根元素：`<html>`元素总是形成一个新的BFC。
2. 显式声明：当一个元素的`display`属性为`flex`、`grid`、`table`、`table-row-group`、`table-header-group`、`table-footer-group`、`table-row`或`table-cell`时，它会形成一个新的BFC。
3. `overflow`属性：当一个元素的`overflow`属性不为`visible`时（例如`overflow: hidden;`），它会形成一个新的BFC。
4. `float`属性：当一个元素的`float`属性不为`none`时（例如`float: left;`或`float: right;`），它会形成一个新的BFC。
5. `display: flow-root`：这是一个专门用于创建BFC的属性值。

#### 5.3 BFC的作用
1. 防止高度坍塌：当一个元素内部有浮动元素时，如果没有创建BFC，父元素的高度可能会坍塌。通过创建BFC，可以确保父元素的高度正确地包含所有浮动元素。
2. 清除浮动：使用BFC可以自动清除内部的浮动元素，避免其他元素紧跟着浮动元素。
3. 避免元素重叠：BFC内部的元素不会与外部的浮动元素重叠。
4. 控制元素排列：BFC内部的元素按照一定的规则排列，可以更好地控制布局。
5. 独立布局：BFC内部的布局不受外部元素的影响，形成了一个独立的布局环境。


### 6. CSS中常用的函数
1. 颜色函数：
  - `rgb() / rgba() / hsl() / hsla()`：这些函数用于定义颜色。`rgb()`和`rgba()`分别用于定义红绿蓝三文鱼色和带有透明度的颜色，`hsl()`和`hsla()`则用于定义色调、饱和度和亮度（带有透明度）。
2. 数学函数：
  - `calc()`：用于计算表达式。
  - `min()`和`max()`：用于获取两个值中的最小值或最大值。
  - `var()`：用于引用CSS变量（自定义属性）。
3. 函数组合：
  - `scale() / rotate() / skew() / translate()`：这些函数用于定义2D变换（标注3D的可以进行3D转换）。
4. `linear-gradient() / radial-gradient() / repeating-linear-gradient() / repeating-radial-gradient()`：用于定义渐变背景。
5. `url()`：用于引用外部资源，如图像、字体等。
6. `steps()`：用于定义动画关键帧中的步骤。
7. `cubic-bezier()`：定义动画的贝塞尔曲线。