---
title: uniapp组件
author: 怡然
createTime: 2024/07/18 16:54:14
permalink: /uniapp/p81o02s6/
---

::: info uniapp组件相关信息
与vue基本一致，只是多了一些api
:::

## 1. 组件概述
### 1.1 公共属性列表

|属性名|类型|描述|注解|
|:-------:|:------------:|:------------:|:------------:|
|`id`|`String`|组件的唯一标示|一般用于获取组件上下文对象（如：`VideoContext`），需要保持整个页面唯一|
|`ref`|`String`|vue中组件的唯一标示|用来给子组件注册引用信息|
|`class`|`String`|组件的样式类|在对应的 css 中定义的样式类|
|`style`|`String`|组件的内联样式|可以动态设置的内联样式|
|`hidden`|`Boolean`|组件是否隐藏|所有组件默认是显示的|
|`data-*`|`Any`|自定义属性|组件上触发的事件时，会发送给事件处理函数|
|`@*`|`EventHandler`|组件的事件|事件绑定|

### 1.2 基础组件列表
::: info
具体的组件单独描述
:::
- 视图容器
- 基础内容
- 表单组件
- 路由与页面跳转
- 媒体组件
- 地图
- 画布
- webview
- 广告
- 页面属性配置
- unicloud
- 各平台专有组件

## 2. 内置组件
### 2.1 `view`
- 类似于`div`，用于包裹各种元素内容

|属性名|类型|默认值|说明|
|:-------:|:------------:|:------------:|:------------:|
|`hover-class`|String|none|指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果|
|`hover-stop-propagation`|Boolean|false|指定是否阻止本节点的祖先节点出现点击态,App、H5、支付宝小程序、百度小程序不支持|
|`hover-start-time`|Number|50|按住后多久出现点击态，单位毫秒|
|`hover-stay-time`|Number|400|手指松开后点击态保留时间，单位毫秒|

### 2.2 `scroll-view`
- 可滚动视图区域。用于区域滚动。需注意在webview渲染的页面中，区域滚动的性能不及页面滚动。

|属性名|类型|默认值|说明|
|:-------:|:------------:|:------------:|:------------:|
|`scroll-x`|Boolean|false|是否启用水平滚动|
|`scroll-y`|Boolean|false|是否启用垂直滚动|
|`upper-threshold`|Number/String|50|距顶部/左边多远时（单位px），触发 `scrolltoupper` 事件|
|`lower-threshold`|Number/String|50|距底部/右边多远时（单位px），触发 `scrolltolower` 事件|
|`scroll-top`|Number/String| |设置竖向滚动条位置|
|`scroll-left`|Number/String| |设置横向滚动条位置|
|`scroll-into-view`|String| |值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素|
|`scroll-with-animation`|Boolean|false|在设置滚动条位置时使用动画过渡|
|`enable-back-to-top`|Boolean|false|iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向|
|`show-scrollbar`|Boolean|false|控制是否出现滚动条|
|`refresher-enabled`|Boolean|false|开启自定义下拉刷新|
|`refresher-threshold`|Number|45|设置自定义下拉刷新阈值|
|`refresher-default-style`|String|"black"|设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式|
|`refresher-background`|String|"#FFF"|设置自定义下拉刷新区域背景颜色|
|`refresher-triggered`|Boolean|false|设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发|
|`enable-flex`|Boolean|false|启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其子节点。|
|`scroll-anchoring`|Boolean|false|开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS overflow-anchor 属性。|
|`@scrolltoupper`|`EventHandler`| |滚动到顶部/左边，会触发 scrolltoupper 事件|
|`@scrolltolower`|`EventHandler`| |滚动到底部/右边，会触发 scrolltolower 事件|
|`@scroll`|`EventHandler`| |滚动时触发，`event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`|
|`@refresherpulling`|`EventHandler`| |自定义下拉刷新控件被下拉|
|`@refresherrefresh`|`EventHandler`| |自定义下拉刷新被触发|
|`@refresherrestore`|`EventHandler`| |自定义下拉刷新被复位|
|`@refresherabort`|`EventHandler`| |自定义下拉刷新被终止|

> 注意事项：
> - APP-vue，scroll-view 中避免使用 map、video 等原生组件。
> - scroll-view 不适合放长列表，有性能问题。webview渲染时，建议改用webview的页面滚动；app-nvue需使用list组件；app-uvue需使用list-view组件。
> - webview渲染时，建议使用页面级的原生下拉刷新，性能更好。
> - scroll-view是区域滚动，不会触发页面滚动，无法触发pages.json配置的下拉刷新、页面触底onReachBottomDistance、titleNView的transparent透明渐变。但在app-uvue下，scroll-view如果是页面顶级节点，则等同于页面滚动。
> - webview渲染时，scroll-view的滚动条设置，可通过css的-webkit-scrollbar自定义，包括隐藏滚动条。
> - scroll-into-view 的优先级高于 scroll-top。

### 2.3 `swiper`
- 滑块视图容器。一般用于左右滑动或上下滑动，比如banner轮播图。注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换。swiper下的每个swiper-item是一个滑动切换区域，不能停留在2个滑动区域之间。

|属性名|类型|默认值|说明|
|:-------:|:------------:|:------------:|:------------:|
|`indicator-dots`|Boolean|false|是否显示面板指示点|
|`indicator-color`|Color|rgba(0, 0, 0, .3)|指示点颜色|
|`indicator-active-color`|Color|#000000|当前指示点颜色|
|`active-class`|String| |swiper-item 可见时的 class|
|`changing-class`|String| |acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的class|
|`autoplay`|Boolean|false|是否自动切换|
|`current`|Number|0|当前所在滑块的索引|
|`current-item-id`|String| |当前所在滑块的 item-id ，不能与 `current` 被同时指定|
|`interval`|Number|5000|自动切换时间间隔，单位毫秒|
|`duration`|Number|500|滑动动画时长，单位毫秒|
|`circular`|Boolean|false|是否采用衔接滑动，即播放到末尾后重新回到开头|
|`vertical`|Boolean|false|是否竖向滑动|
|`previous-margin`|String|0px|前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值|
|`next-margin`|String|0px|后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值|
|`acceleration`|Boolean|false|当开启时，会根据滑动速度，连续滑动多屏|
|`disable-programmatic-animation`|Boolean|false|是否禁用代码变动触发 swiper 切换时使用动画。|
|`display-multiple-items`|Number|1|同时显示的滑块数量|
|`skip-hidden-item-layout`|Boolean|false|是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息|
|`disable-touch`|Boolean|false|是否禁止用户 touch 操作|
|`touchable`|Boolean|true|是否监听用户的触摸事件，只在初始化时有效，不能动态变更|
|`easing-function`|String|default|指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic|
|`@change`|`EventHandler`| |`current` 改变时会触发 change 事件，`event.detail = {current: current, source: source}`|
|`@transition`|`EventHandler`| |swiper-item 的位置发生改变时会触发 transition 事件，`event.detail = {dx: dx, dy: dy}`，支付宝小程序暂不支持dx, dy|
|`@animationfinish`|`EventHandler`| |动画结束时会触发 animationfinish 事件，`event.detail = {current: current, source: source}`|

### 2.4 `match-media`
- 类似于网页开发中使用媒体查询来适配大屏小屏，match-media是一个可适配不同屏幕的基本视图组件。可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示。例如在match-media组件中放置一个侧边栏，媒体查询规则设置为宽屏才显示，就可以实现在PC宽屏显示该侧边栏，而在手机窄屏中不显示侧边栏的效果。

|属性名|类型|说明|
|:-------:|:------------:|:------------:|
|`min-width`|number|页面最小宽度（ px 为单位）|
|`max-width`|number|页面最大宽度（ px 为单位）|
|`width`|number|页面宽度（ px 为单位）|
|`min-height`|number|页面最小高度（ px 为单位）|
|`max-height`|number|页面最大高度（ px 为单位）|
|`height`|number|页面高度（ px 为单位）|
|`orientation`|String|屏幕方向（ landscape 或 portrait ）|

### 2.5 `movable-area`和`movable-view`
1. `movable-area`
- 可拖动区域。由于app和小程序的架构是逻辑层与视图层分离，使用js监听拖动时会引发逻辑层和视图层的频繁通讯，影响性能。
- `movable-area`指代可拖动的范围，在其中内嵌`movable-view`组件用于指示可拖动的区域。即手指/鼠标按住`movable-view`拖动或双指缩放，但拖不出`movable-area`规定的范围。
- 也可以不拖动，而使用代码来触发`movable-view`在`movable-area`里的移动缩放。

|属性名|类型|默认值|说明|
|:-------:|:------------:|:------------:|:------------:|
|`scale-area`|Boolean|false|当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area|

> - 注意事项
> - `movable-area` 必须设置 `width` 和 `height` 属性，不设置默认为 10px。

2. `movable-view`
- 可移动的视图容器，在页面中可以拖拽滑动或双指缩放。
- `movable-view`必须在`movable-area`组件中，并且必须是直接子节点，否则不能移动。

|属性名|类型|默认值|说明|
|:-------:|:------------:|:------------:|:------------:|
|`direction`|String|none|movable-view的移动方向，属性值有all、vertical、horizontal、none|
|`inertia`|Boolean|false|movable-view是否带有惯性|
|`out-of-bounds`|Boolean|false|超过可移动区域后，movable-view是否还可以移动|
|`x `|Number / String| |定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画|
|`y `|Number / String| |定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画|
|`damping`|Number|20|阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快|
|`friction`|Number|2|摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值|
|`disabled`|Boolean|false|是否禁用movable-view的移动|
|`scale`|Boolean|false|是否支持双指缩放，默认缩放手势生效区域是在movable-view内|
|`scale-min`|Number|0.5|双指缩放的最小比例|
|`scale-max`|Number|10|双指缩放的最大比例|
|`scale-value`|Number|1|定义缩放倍数，取值范围为 0.5 - 10|
|`animation`|Boolean|true|是否使用动画|
|`@change`|EventHandle| |拖动过程中触发的事件，`event.detail = {x: x, y: y, source: source}`，其中source表示产生移动的原因，值可为touch（拖动）、touch-out-of-bounds（超出移动范围）、out-of-bounds（超出移动范围后的回弹）、friction（惯性）和空字符串（setData）|
|`@scale`|EventHandle| |双指缩放过程中触发的事件，`缩放过程中触发的事件，event.detail = {x: x, y: y, scale: scale}，`|