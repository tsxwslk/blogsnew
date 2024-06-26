---
title: 其他常用API
author: 怡然
createTime: 2024/06/25 17:26:56
permalink: /Vue3/qdenzznn/
---

## 1. `shallowRef` 与 `shallowReactive`
### 1.1 `shallowRef`
1. 概念：创建一个响应式数据，但只对顶层属性进行响应式处理。比如可以修改 `a.value`，但不可以修改 `a.value.b`。
2. 用处：只关心对象索引值的整体改变。

### 1.2 `shallowReactive`
1. 概念：创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的。
2. 用处：对象的顶层属性是响应式的，但嵌套对象的属性不是时可以使用。

### 1.3 总结
> 通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。

## 2. `readonly` 与 `shallowReadonly`
### 2.1 `readonly`
1. 概念：用于创建一个对象的深只读副本。
2. 用法：
```js
let original = reactive({ ... });
let sum1=ref(1)
let readOnlyCopy = readonly(original);
let sum2=readonly(sum1)
function changeSum(){
  sum1.value+=1
  sum2.value+=2 // sum2不可以修改，对象readOnlyCopy及其属性都不可以修改
}
```
3. 特点
   1. 对象的所有嵌套属性都将变为只读。
   2. 任何尝试修改这个对象的操作都会被阻止。

### 2.2 `shallowReadonly`
1. 概念：只读只作用于对象的顶层属性。
2. 用法：
```js
let song=reactive({
  name:'Because of You',
  options:{
    singer:'Kelly Clarkson',
    album:'Breakaway'
  }
})
let readonlySong = shallowReadonly(song)
function changeSong(){
  readonlySong.name='同类' // 不可修改
  readonlySong.options.singer='孙燕姿' // 可以修改
}
```

## 3. `toRaw` 与 `markRaw`
### 3.1 `toRaw`
1. 概念：用于获取一个响应式对象的原始对象， `toRaw` 返回的对象不再是响应式的，不会触发视图更新。
2. 使用场景：在需要将响应式对象传递给非 `Vue` 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象。
3. 官网描述：这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。
```js
import { reactive,toRaw,markRaw,isReactive } from "vue";
/* toRaw */
// 响应式对象
let person = reactive({name:'tony',age:18})
// 原始对象
let rawPerson = toRaw(person)
```

### 3.1 `markRaw`
1. 概念：标记一个对象，使其**永远不会**变成响应式的。
2. 使用场景：例如使用`mockjs`时，为了防止误把`mockjs`变为响应式对象，可以使用 `markRaw` 去标记`mockjs`
```js
/* markRaw */
let citys = markRaw([
  {id:'asdda01',name:'北京'},
  {id:'asdda02',name:'上海'},
  {id:'asdda03',name:'天津'},
  {id:'asdda04',name:'重庆'}
])
// 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
let citys2 = reactive(citys)
```

## 4. `customRef`
1. 概念：创建一个自定义的`ref`，并对其依赖项跟踪和更新触发进行逻辑控制。
   > 个人理解是将vue原本的响应式数据做了一次中间的拦截，在 `get` 读取数据时使用 `track()` 跟踪数据之后，在 `set` 中修改数据时可以做一些额外的操作，比如书写定时器进行防抖功能的实现，或是发送请求，做完这些操作时候再使用 `trigger()` 触发数据的改变，使用 `customRef` 定义的数据还是一个响应式数据，只不过在相应的同时还可以完成其他操作。在书写上和 `computed` 的书写很像。
2. 使用案例：输入框防抖（该案例中的 `customRef` 可以写在组件内部，处于复用的考虑写成了 `hooks`）
- 组件内
```vue
<template>
	<h2>请输入搜索内容：{{ msg }}</h2>
	<input type="text" v-model="msg">
</template>

<script setup lang="ts" name="Father">
import useMsgRef from './useMsgRef';
let { msg } = useMsgRef('将进酒', 1000)
</script>
```
- hooks 
```ts
import { customRef } from "vue";

export default function (initValue: string, delay: number) {
  let timer: number;
  let msg = customRef((track, trigger) => {
    return {
      get() {
        track();
        return initValue;
      },
      set(value) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          initValue = value;
          trigger();
        }, delay);
      },
    };
  });
  return { msg };
}
```

## 5. `Teleport`
- 用 `teleport` 标签包裹的内容可以插入到指定的容器内。
- 代码示例：
- 父组件：

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
	filter: grayscale(100%); /**filter属性会影响容器内的fixed定位，导致相对于视窗的fixed定位不可用 */
}
img{
	width: 100px;
}
</style>
```
- 子组件

```vue
<template>
	<div class="child">
		<button @click="showModa = true">显示弹窗</button>
    <!--teleport标签上的to属性可以指定内部的HTML结构插入到指定位置，可以直接写标签，也可以写类名如.demo或者id如#demo-->
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

## 6. `Suspense`
- 一个实验性功能，如果组件里包含异步任务，可能会存在加载失败的情况，这时可以用 `Suspense` 包裹异步组件。
- 代码示例如下：

```tsx
import { defineAsyncComponent,Suspense } from "vue";  
const Child = defineAsyncComponent(()=>import('./Child.vue'))  // 异步引入组件
```

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <!--异步组件加载完毕之后显示-->
        <Child/>
      </template>
      <template v-slot:fallback>
        <!--异步组件加载完毕之前显示的内容-->
        <h3>加载中.......</h3>
      </template>
    </Suspense>
  </div>
</template>
```