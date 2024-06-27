---
title: fixed定位失效问题
author: 怡然
createTime: 2024/06/27 16:41:58
permalink: /article/9jmfwu8z/
---

:::tip
最近在学习时发现 `css` 当中的 `filter` 属性非 `none` 时会导致设置的 `position:fixed` 失效，本来应该以视窗大小设置定位的组件会以父组件的大小来定位。
:::
- 解决方法：在vue3中可以将需要使用 `position:fixed` 定位的组件直接使用 `teleport` 标签插入到 `body`。vue2中可以将 `filter` 属性写在html标签上或是让他们脱离父子组件关系。
- 会导致 `position:fixed` 失效的 `css` 属性还有 `perspective`（定义 3D 元素距视图的距离）和 `transform`（对元素进行旋转、缩放、移动或倾斜）属性


代码示例：
```vue
<template>
	<div class="app">
		<h4>父组件</h4>
		<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
		<Child />
	</div>
</template>

<script setup lang="ts" name="Father">
import Child from './components/Child.vue';
</script>

<style scoped>
.app{
	width:350px;
	height: 200px;
	background: #ccc;
	border: 1px solid #aaa;
	text-align: center;
	filter: grayscale(100%);
}
img{
	width: 100px;
}
</style>
```

```vue
<template>
	<div class="child">
		<button @click="showModa = true">显示弹窗</button>
		<teleport to="body">
			<div class="modal" v-show="showModa">
				<h5>将进酒</h5>
				<p>李白</p>
				<p>五花马千金裘，呼儿将出换美酒</p>
				<button @click="showModa = false">关闭弹窗</button>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts" name="Child">
import { ref, reactive } from 'vue'
let showModa = ref(false)
</script>

<style scoped>
.child {
	margin-top: 10px;
}

.modal {
	width: 300px;
	height: 200px;
	background: #e8d4a7;
	border: 1px solid #e3c06d;
	position: fixed;
	left: 50%;
	margin-left: -150px;
	top: 20px;
	text-align: center;
}
</style>
```