---
title: 面试总结CSS部分
author: 怡然
createTime: 2024/09/02 10:50:07
permalink: /article/3q5muwyh/
tags:
  - 面试
  - CSS
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

### 7. CSS如何隐藏元素
1. `display:none`：该元素不会被渲染，元素不占用空间，但是每次展示或者隐藏时，会引起回流和重绘，影响页面性能。
2. `visibility:hidden`：该元素会被渲染到dom树，只是被隐藏，但是还会占据页面空间，只会引发重绘，不会引起回流。
3. `opacity:0`：该方法只是将元素的透明的设置为0，元素同样会被渲染，也会占据页面空间，同时，如果该元素绑定了事件，点击该元素区域，依然会触发事件。

### 8. 回流和重绘有什么区别
- 回流：当元素的尺寸、位置等发生改变，浏览器需要重新计算元素的几何信息，会导致页面一部分或全部重新布局。
- 重绘：元素的背景、边框、颜色等外观发生改变且这些改变不影响元素的位置和大小，浏览器只需更新视觉表现。
- 频繁对页面进行回流会导致页面卡顿。
- 对于频繁更新的元素，考虑放在一个独立的容器里，可以限制回流的影响范围。

### 9. css中常用单位
1. `px`：绝对单位，1px表示一个像素的物理大小，不受外部影响。
2. `em`：相对于父元素的字体大小，如果父元素没有设置，则取决于浏览器的默认样式。
3. `rem`：相对于根节点字体大小的单位。
4. `vw/vh`：相对于视口的宽度和高度的百分比。
5. 百分比：相对于父元素宽度或高度的百分比。

### 10. 为什么1px在移动端看起来比PC端更粗
> 现代移动设备的屏幕分辨率远高于传统的桌面显示器。这意味着设备的实际物理像素密度更高。为了使内容在高分辨率屏幕上看起来仍然舒适，浏览器通常会使用逻辑像素（也称为CSS像素）来替代物理像素进行布局。逻辑像素与物理像素的关系由设备像素比（DPR）决定。例如，一个设备像素比为2的屏幕意味着每个逻辑像素实际上对应着设备上的2x2个物理像素。因此，一个1px宽的线条在实际渲染时会占用2个物理像素，这使得线条看起来更粗。

### 11. 如何实现0.5px的线
- 可以使用`transform:scale(0.5)`来实现
- 使用svg绘制
```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="0.5">
  <rect width="100%" height="0.5" fill="black" />
</svg>
```

### 12. `link`和`@import`引入css文件的区别
1. `link`作为HTML标签，可以放在HTML文件任何位置，而`@import`只能放在除了`@charset`以外其他CSS的前面。
2. `link`的兼容性更好，`@import`属于`CSS2.1`以后的规则，只在IE5以后才被支持。
3. `link`作为HTML标签，可以使用`js`动态插入，`@import`则比较麻烦，只能通过`js`先插入一个`style`标签，然后在里面添加`@import`。
4. `link`会最大限度的支持并行下载，但是`@import`如果嵌套过多时，就会导致串行加载。
5. 都会阻塞页面渲染，但是`link`标签会在HTML解析时同步解析，而`@import`则是在页面加载完毕之后才解析。

### 13. 定位失效的问题
1. 当`position: fixed;`时，当元素祖先的`transform`、`perspective`、`filter`、`backdrop-filter`属性非`none`时，该元素就会变成相对于该祖先进行定位，就可能会造成`fixed`失效。在vue3中可以将需要使用 `position:fixed` 定位的组件直接使用 `teleport` 标签插入到 `body`。vue2中可以将 `filter` 等属性写在html标签上或是让他们脱离父子组件关系。
2. 当`position: sticky;`时，如果发现`sticky`失效，我们应该检查该元素的父元素的`overflow`是否设置为`hidden | scroll | auto;`，如果设置了这些属性，而且除了父元素之外，还有其他元素可以滚动，如果用户操作其他元素的滚动，那么该元素就会相对于最近的滚动的元素进行`sticky`定位，就有可能会造成`sticky`失效。

### 14. overflow的值有什么含义
- `visible`是`overflow`属性的默认值，内容溢出时，不会被裁剪，不会为元素创建`BFC`。
- `hidden`会对盒子内容超出盒子内边距（`padding`）以外的内容进行裁剪，不提供滚动条，不允许用户滚动，但是可以通过设置元素的`scrollTop`等来进行滚动，因此当前盒子依旧是一个滚动容器。
- `clip`类似于`hidden`，只不过他也不可以通过编程方式进行滚动，设置了`clip`的盒子，已经不是一个滚动容器了，并且它不会为元素创建`BFC`。
- `scroll`会使容器显示出来滚动条，即使没有内容溢出，滚动条依然会展示，有内容溢出时，用户可以手动滚动该区域。 
- `auto`默认状态下，如果没有内容溢出，行为就会类似`visible`（但是会创建新的BFC），如果有内容溢出就会类似`scroll`。

### 15. `display`的值有哪些？
- `block`: 元素显示为块级元素，元素前后会带有换行符，可以设置宽高。
- `inline`: 默认值，会将该元素显示为行内元素，元素前后没有换行符，设置宽高无效。
- `inline-block`: 元素显示为行内块元素，元素不会独占一行，但是可以设置宽高。
- `list-item`: 元素显示为列表元素（类似`li`）。
- `table`: 元素显示为块级表格（类似`table`）。
- `inline-table`: 元素显示为行内表格。
- `flow-root`: 元素作为块级元素，并且创建一个新的BFC。
- `inherit`: 继承父元素。
- `none`: 元素隐藏。
- `flex`: 弹性盒子布局。
- `grid`: 网格盒子布局。

### 16. CSS预处理器
- 可以利用嵌套的方式写CSS，使层级更加直观。
- 可以将公共样式抽取为变量，方便复用。
- sass语法支持条件和循环语句，less不支持
- sass需要使用 `Ruby` 环境或者使用 `Node.js` 的工具（如 node-sass 或 dart-sass）进行编译。
- less主要使用 `Node.js` 工具（如 less 命令行工具）进行编译。

### 17. 如何实现动画效果及优化动画效果
- 实现：
  - 1. 使用`transition`，它的第一个参数可以指定我们CSS属性的名称，第一次渲染或者指定的CSS属性改变时，会触发过渡动画效果，它只有两个状态开始和结束，执行完毕之后就不会再次执行了，除非指定的CSS属性再次发生变化。
  - 2. 使用CSS3的`animation`和`@keyframes`，我们可以通过`@keyframes`设置动画的关键帧以及动画名称，关键帧可以用`from -> to`或者百分比来表示，然后在需要使用动画的地方使用`animation`，指定要执行的动画名称、执行时间等信息，它可以指定动画结束之后是否循环执行，相比于`transition`来说，`animation`更加灵活。
  - 3. 使用js动画，其实就是通过定时器，每一段时间改变一次元素的CSS属性，以达到动画的效果。

- 优化：
  - 1. 尽量减少使用`js`动画，因为频繁的通过`js`改变元素的属性，如果改动了宽高、边距等影响布局的属性，就会频繁的引起页面的回流，导致页面卡顿。
  - 2. 如果有元素需要平移的操作，使用`transform`里面的`translate`属性代替`left`、`right`的操作，因为`left`和`right`的改变，会引起浏览器的重新计算布局，导致回流，而`transform`不在渲染进行时完成，不会影响页面的渲染，效率会更高。

- 动画执行最小时间：由于大多数现代显示器的刷新频率为60Hz（每秒60次），因此理论上的最小动画时间间隔大约为1/60秒，即大约16.7毫秒。这是因为在60Hz的刷新率下，屏幕每16.7毫秒刷新一次。

### 18. 层叠上下文
> 假设我们把当前的页面当作是一个z轴，不同的元素可能在当前页面上的层级不同，而这种不同的层级，就形成了所谓的层叠上下文。

- 如何形成层叠上下文
  - 1. 根元素（`<html>`）；
  - 2. `position`的值为`absolute`或者`relative`，并且`z-index`的值不为`auto`的元素；
  - 3. `position`的值为`fixed`或者`sticky`的元素；
  - 4. `flex`容器的子元素，且`z-index !== auto`；
  - 5. `grid`容器的子元素，且`z-index !== auto`；
  - 6. `opacity`的值小于1的元素。

- 层叠等级从上到下
  - 1. `z-index>0`的元素
  - 2. `z-index: auto;/z-index: 0`的元素
  - 3. `inline/inline-block`盒子
  - 4. `float`浮动元素
  - 5. `block`块级元素
  - 6. `z-index<0`的元素
  - 7. 当前层叠上下文的`backgroung`以及`border`

- 特点
  - 1. 层叠上下文中可以包含其他的层叠上下文；
  - 2. 设置的`z-index`只在当前层叠上下文中有用，比如我们有a，b，c三个元素，它们在同一父元素中，比如a，b在当前层叠上下文的`z-index`为2，而c为1，这时c又开辟了一个新的层叠上下文，然后它的子元素也设置了`z-index`，并且设置了一个更大的值，但是c和它的子元素永远会排在a和b的后面，因为它的子元素的层级只在当前形成的层叠上下文中有效；
  - 3. 没有设置`z-index`的元素，它的层级会由当前所在层叠上下文的等级来决定。
