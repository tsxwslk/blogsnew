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
- 注意：`$attrs`会自动排除在子组件的`props`中声明的属性(可以认为声明过的 `props` 被子组件自己“消费”了)

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

## 6. `$refs`、`$parent`
1. `$refs` 用于父传子，在父组件的方法中使用 `$refs` 可以对象形式获取所有子组件。
2. `$parent` 用于子传父，在子组件的方法中使用 `$parent` 可以获取父组件。
3. 无论是子组件还是父组件希望通过这样的方式进行通信，都需要使用宏函数 `defineExpose()` 将需要传递的值暴露出去。

- 代码示例如下：
父组件
```vue
<template>
	<div class="father">
		<h3>子组件传回的数据：{{ childData }}</h3>
		<button @click=getAllChildren($refs)>获取子组件</button>
		<Child ref="child" />
	</div>
</template>

<script setup lang="ts" name="Father">
import Child from './components/Child.vue'
import { ref } from "vue";
let childData=ref('完全由父组件确定')
function getAllChildren(refs: {[key:string]:any}) {
	refs.child.bookNum+=3
}
defineExpose({childData})
</script>
```
子组件
```vue
<template>
	<div class="child">
		<h3>展示出来的数字：{{ bookNum }}</h3>
		<button @click="updateFather($parent)">更改父组件</button>
	</div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'
let bookNum = ref(8)
function updateFather(parent:any){
	parent.house='子组件传回的数据'
}
defineExpose({bookNum})
</script>
```

## 7. `provide` 与 `inject`
- 实现父组件与后代组件之间的通信，与 `$attrs`相比不需要打扰中间的子组件。
- 在祖先组件中通过 `provide` 配置向后代组件提供数据。
- 在后代组件中通过 `inject` 配置来声明接收数据。
- 代码示例如下：
```vue
<template>
	<div class="father">
		<h3>父组件</h3>
		<h4>父组件已有内容1：{{ money }}</h4>
		<h4>父组件已有内容2：书名：{{ book.name }}，作者：{{ book.author }}</h4>
		<button @click="money += 1">资产+1</button>
		<button @click="book.author += 1">作者姓名+~</button>
		<Child/>
	</div>
</template>

<script setup lang="ts" name="Father">
	import Child from './Child.vue'
	import { ref,reactive,provide } from "vue";
	// 数据
	let money = ref(100)
	let book = reactive({
		name:'彷徨',
		author:'鲁迅'
	})
	// 用于更新money的方法
	function updateMoney(value:number){
		money.value += value
	}
	// 提供数据，该方法提供的数据，所有后代都可以收到，不局限于祖孙组件
	provide('moneyContext',{money,updateMoney})
	provide('book',book)
</script>
```
后代组件：
```vue
<template>
	<div class="grand-child">
		<h3>我是后代组件</h3>
		<h4>继承到的资产：{{ money }}</h4>
		<h4>继承到的书：书名：{{ book.name }}，作者：{{ book.author }}</h4>
		<button @click="updateMoney(6)">点我</button>
	</div>
</template>
<script setup lang="ts" name="GrandChild">
	import { inject } from 'vue';
	// 注入数据
	let {money,updateMoney} = inject('moneyContext',{money:0,updateMoney:(x:number)=>{}})
	let book = inject('book')
</script>
```

## 8. 插槽
### 8.1 默认插槽