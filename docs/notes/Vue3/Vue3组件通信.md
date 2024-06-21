---
title: Vue3组件通信
author: 怡然
createTime: 2024/06/20 16:56:03
permalink: /Vue3/bj8bnbau/
---

## 1. `props`
:::tip
1. 父传子：直接传一个数据。
2. 子传父：需要父组件先给子组件传一个方法，子组件通过 `props` 接受方法时将数据传给父组件
:::

- 父组件：

```vue
<template>
  <div class="father">
    <h3>父组件，</h3>
		<h4>公司名称：{{ company }}</h4>
		<h4>子组件传回的游戏：{{ game }}</h4>
		<Child :company="company" :getGame="getGame"/>
  </div>
</template>

<script setup lang="ts" name="Father">
	import Child from './Child.vue'
	import { ref } from "vue";
	const company = ref('SE')
	const game = ref()
	function getGame(value:string){
		game.value = value
	}
</script>
```

子组件

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
		<h4>我的游戏：{{ game }}</h4>
		<h4>游戏所属公司：{{ company }}</h4>
		<button @click="getGame(game)">汇报</button>
  </div>
</template>

<script setup lang="ts" name="Child">
	import { ref } from "vue";
	const game = ref('FF14')	
	defineProps(['company','getGame'])
</script>
```

## 2. 自定义事件 `custom-event`
- 用于子传父
  
父组件
```vue
<template>
	<div class="father">
		<h3>子组件传回的数据：{{ childData }}</h3>
		<!-- 用@自定义事件接收子组件传来的方法 -->
		<Child @send-Data="showData" />
	</div>
</template>

<script setup lang="ts" name="Father">
import Child from './components/Child.vue'
import { ref } from "vue";
const childData = ref()
function showData(value: string) {
	childData.value = value
}
</script>
```
子组件
```vue
<template>
	<div class="child">
		<button @click="emit('send-data', childData)">玩具给父亲</button>
	</div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'
let childData = ref('大头儿子')
// 使用defineEmits，defineEmits内包含一个方法的数组，用法与vue2的this.$emit一致，方法命名使用-连接
const emit = defineEmits(['send-data']) 
</script>
```

## 3. `mitt` 任意组件通信
- 通过引入 `mitt` 插件完成
- 首先在 `src` 文件夹中新建 `utils` 文件夹，在 `utils` 文件夹中新建 `emitter.ts`
  ```ts
	// 引入mitt
	import mitt from "mitt";
	// 调用mitt，emitter方法能绑定、触发事件
	const emitter = mitt();
	// 绑定事件
	/* emitter.on("test1", () => {
		console.log("test1事件被触发");
	});
	emitter.on("test2", () => {
		console.log("test2事件被触发");
	});

	// 触发事件
	setTimeout(() => {
		emitter.emit("test1");
		emitter.emit("test2");
	}, 2000);

	// 解绑事件
	emitter.off("test1");
	// 解绑所有方法
	emitter.all.clear() */
	export default emitter;
	```

- 在任意组件中使用 `emitter`

:::details 组件一
```vue
<template>
	<div class="child">
		<h4>接收任意组件传值：{{ title }}</h4>
	</div>
</template>

<script setup lang="ts" name="Child">
import { ref,onUnmounted } from 'vue'
import emitter from '@/utils/emitter';
let title = ref('')
emitter.on('send-data',(value:string)=>{
	title.value=value
})
onUnmounted(()=>{
  // 组件卸载时解绑事件，避免消耗内存
  emitter.off('send-data')
})
</script>
```
:::

:::details 组件二
```vue
<template>
  <div>
    <button @click="emitter.emit('send-data', title)">点击传值</button>
  </div>
</template>

<script setup lang="ts" name="Bother">
import emitter from '@/utils/emitter';
import { ref } from 'vue'
const title = ref('将进酒')
</script>
```
:::

## 4. `v-model` 实现的父子组件传值
- `v-model` 父子组件传值在开发中一般不是直接写出来的，而是通过使用组件库使用的，下面代码展示一下使用组件库时 `v-model` 的具体实现过程。
::: details 父组件
```vue
<template>
	<div class="child">
		<h2>v-model传值</h2>
		<!-- 工作原理 -->
		<!-- <LyrInput :modelValue="username" @update:modelValue="username = $event" /> -->
		<!-- 正常使用 -->
		<LyrInput v-model="username" />
	</div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'
import LyrInput from './LyrInput.vue'
let username = ref('testuser')
</script>
```
:::

::: details 组件库
```vue
<template>
	<!--组件库内部实现原理-->
  <input type="text" :value="modelValue" @input="emits('update:modelValue', (<HTMLInputElement>$event.target).value)" />
</template>

<script setup lang="ts" name="lyrInput">
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
</script>
```
:::

## 5. `$attrs`祖孙组件通信
- `$attrs`是一个对象，包含所有父组件传入的标签属性。
- 注意：`$attrs`会自动排除`props`中声明的属性(可以认为声明过的 `props` 被子组件自己“消费”了)

父组件
```vue
<Child :a="a" :b="b" :c="c" :d="d" v-bind="{x:100,y:200}" :updateA="updateA"/>
```

子组件
```vue
<!--子组件将父组件收到的所有值都传给自己的子组件。如果子组件定义了props接受了一部分数据，则$attrs中不包含这些-->
<GrandChild v-bind="$attrs"/> 
```

孙组件
```vue
<template>
	<div class="grand-child">
		<h3>孙组件</h3>
		<h4>a：{{ a }}</h4>
		<h4>b：{{ b }}</h4>
		<h4>c：{{ c }}</h4>
		<h4>d：{{ d }}</h4>
		<h4>x：{{ x }}</h4>
		<h4>y：{{ y }}</h4>
		<!--下面的button表示孙组件可以通过方法将数据传回祖组件-->
		<button @click="updateA(1)">点我更新A</button>
	</div>
</template>

<script setup lang="ts" name="GrandChild">
	defineProps(['a','b','c','d','x','y','updateA'])
</script>
```
