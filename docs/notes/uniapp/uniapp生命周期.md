---
title: uniapp生命周期
author: 怡然
createTime: 2024/07/30 16:56:43
permalink: /uniapp/bu1wrptd/
---

:::tip 生命周期描述
uniapp的页面生命周期与vue3的组件生命周期不太一致，uniapp的生命周期可以用来处理一些特殊的逻辑。
:::

## 1. 页面生命周期类型
|函数名|说明|平台差异|
|:--------:|:----------:|:---------:|
|`onInit`|监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad|百度小程序|
|`onLoad`|监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）| |
|`onShow`|监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面| |
|`onReady`|监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发| |
|`onHide`|监听页面隐藏| |
|`onUnload`|监听页面卸载| |
|`onResize`|监听窗口尺寸变化|App、微信小程序、快手小程序|
|`onPullDownRefresh`|监听用户下拉动作，一般用于下拉刷新| |
|`onReachBottom`|页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。| |
|`onTabItemTap`|点击 tab 时触发，参数为Object|微信小程序、QQ小程序、支付宝小程序、百度小程序、H5、App、快手小程序、京东小程序|
|`onShareAppMessage`|用户点击右上角分享|微信小程序、QQ小程序、支付宝小程序、抖音小程序、飞书小程序、快手小程序、京东小程序|
|`onPageScroll`|监听页面滚动，参数为Object|nvue不支持|
|`onNavigationBarButtonTap`|监听原生标题栏按钮点击事件，参数为Object|App、H5|
|`onBackPress`|监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack|app、H5、支付宝小程序	|
|`onNavigationBarSearchInputChanged`|监听原生标题栏搜索输入框输入内容变化事件|App、H5|
|`onNavigationBarSearchInputConfirmed`|监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。|App、H5|
|`onNavigationBarSearchInputClicked`|监听原生标题栏搜索输入框点击事件（pages.json 中的 searchInput 配置 disabled 为 true 时才会触发）|App、H5|
|`onShareTimeline`|监听用户点击右上角转发到朋友圈|微信小程序|
|`onAddToFavorites`|监听用户点击右上角收藏|微信小程序、QQ小程序|

## 2. 常用页面生命周期使用
**使用方法**
```js
// 使用某个生命周期函数，需要从@dcloudio/uni-app中引入
import { onReady } from '@dcloudio/uni-app'
onReady(() => {
  console.log('onReady')
})
```
### 2.1 `onLoad`
1. 使用方法：获取跳转页面时所带的参数
- 组件一
```vue
<template>
	<view class="nav-bar">
		<view class="bar-item" :class="{active:hoverIndex.hoverTab==1}">
			<navigator url="/pages/index/index?name=user&title=书籍清单">清单</navigator>
		</view>
	</view>
</template>
```
- 组件二：从组件一跳转到组件二
```js
import { onLoad } from '@dcloudio/uni-app'
onLoad((e) => {
  console.log(e.name,e.title) // user 书籍清单
})
```

### 2.2 `onShow`
- 新页面跳转，离开当前页面再返回该页面，都会触发`onShow`函数

### 2.3 `onReady`
1. 使用方法：页面加载完成后，可以获取页面中的元素，如果需要获取页面中的组件实例，可以在`onReady`中获取
```vue
<template>
	<view class="nav-bar">
		<ChildDemo ref="child"></ChildDemo>
	</view>
</template>
<script setup>
import {ref} from 'vue'
import { onReady } from '@dcloudio/uni-app'
const child = ref(null)
onReady(() => {
  console.log(child.value) // 获取组件实例
})
</script>
```

### 2.4 `onHide`
- 用户离开页面时触发，可以做一些用户离开页面关闭自动播放等操作逻辑 

### 2.5 `onUnload`
- 页面卸载时触发，比如使用页面跳转组件`<navigator>`时，`open-type`选择`relanch`，表示关闭其他所有页面，打开新的页面，就会触发`onUnload`函数，在`onUnload`中可以做一些页面跳转后需要做的操作

### 2.6 `onPageScroll`
- 监听页面滚动，参数为Object，包含`scrollTop`，`scrollTop`为页面滚动距离
```js
import { onPageScroll } from '@dcloudio/uni-app'
onPageScroll((e) => {
  console.log(e) // {scrollTop: 0}
})
```

## 3. 应用生命周期
- 在`App.vue`中
```vue
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch') // 首次登录调用，可以用于验证登录信息
		},
		onShow: function() { // 优先于页面的onShow
			console.log('App Show')
		},
		onHide: function() { // 优先于页面的onHide
			console.log('App Hide')
		}
	}
</script>
```