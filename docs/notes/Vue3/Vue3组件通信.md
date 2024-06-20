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