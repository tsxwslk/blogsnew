---
title: Vue3核心语法
author: 怡然
createTime: 2024/06/14 14:59:08
permalink: /Vue3/e8c62k44/
---

## 1. Options API（选项式）和Composition API（组合式）

- 选项式API(Options API)：在vue2中使用，选项即为定义的`data`,`methods`,`watch`等等。这在写法使得同一个逻辑处理的内容分散在不同的地方，代码内容较少时比较易读，逻辑复杂繁多时代码可读性较差，且这在写法在后期维护时需要在各个地方修改，难以维护。
- 组合式API(Composition API)：vue3文档中默认的风格，将各个逻辑的内容写在一起，处理逻辑更加清晰一些，后期维护也更为方便。通常会与 `<script setup>` 搭配使用。

## 2. setup

1. 概述
   - `setup`是`Vue3`中一个新的配置项，值是一个函数，它是 `Composition API` 的编译时语法糖，组件中所用到的：数据、方法、计算属性、监视……等等，均配置在`setup`中。
   - `setup`函数中的`this`指向为`undefined`。
   - `setup`函数会在`beforeCreate()`之前调用。

   ```js
   <script lang="ts">
   export default {
     name:'demo1',
     setup(){
       let title="将进酒" // 这样定义的数据不是响应式数据，不会在方法中执行改变时实时相应
       return {title}
     },
   }
   </script>
   ```

2. `setup`的返回值
   - 如果返回一个对象，对象中的数据、方法等可以直接在模板中使用。
   - 如果返回一个函数，可以自定义渲染内容。
3. `setup` 与 `Options API` 的关系
   - `setup`与`data`、`methods`等可以同时存在。
   - `data`等中可以使用`this`读到`setup`里的数据，但反过来不行。
4. `setup`语法糖
   - `setup`函数有一个语法糖，这个语法糖，可以让我们把`setup`独立出去，代码如下：

    ```js
    <script lang="ts" setup>
    // xxxxxxx 
    // 不需要写return及可将数据方法返回出去
    </script>
    ```

   - 但是这样书写需要两个`<script>`标签，一个配置组件的`name`，另一个写`setup`里的内容。可以借助插件`vite-plugin-vue-setup-extend`完成，方法如下：
    第一步：

    ``` sh
    npm i vite-plugin-vue-setup-extend -D
    ```

    第二步，在vite.config.ts中配置

    ```js
    import VueSetupExtend from 'vite-plugin-vue-setup-extend'
    export default defineConfig({
      plugins: [
        vue(),
        VueSetupExtend() // 调用
      ],
      resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    })
    ```

    ```js
    <script lang="ts" setup name="personOne">
    // 此时在script标签里就可以直接定义组件的name
    </script>
    ```

## 3. `ref` 创建：基本类型的响应式数据

1. 创建基本类型数据

  ```js
  import {ref} from 'vue'
  // 引入ref，将响应式数据用ref包裹
  let name = ref('Jhon') // 响应式
  let age = ref(12) // 响应式
  let number=123456 // 非响应式

  // 更改响应式数据的方法时，需要调用数据的.value，如下
  function changeName(){
    name.value='Mary'
  }
  function changeAge(){
    age.value+=1
  }
  ```

2. 创建对象类型数据

  ```js
  import {ref} from 'vue'
  let poem = ref({name:'将进酒',poet:'李白'})
  let game=ref([{id:1,name:'FF14'},{id:2,name:'剑网3'}])
  function changePoem(){
    poem.value.name='长恨歌'
    poem.value.poet='白居易'
  }
  function changeGame(){
    game.value[0].name='明日方舟'
  }
  ```

## 4. `reactive` 创建：对象类型的响应式数据

1. 创建对象类型的响应式数据

```js
// reactive只能定义对象类型的响应式数据
import {reactive} from 'vue'
let poem = reactive({name:'将进酒',poet:'李白'})
function changePoem(){
  poem.name='长恨歌'
  poem.poet='白居易'
}
```

2. `ref`和reactive对比

- `ref`创建的变量必须使用 `.value` 更改数据，可以使用 `volar` 插件自动添加 `.value`。
- `reactive`重新分配一个新对象，会失去响应式（可以使用`Object.assign`去整体替换）。

  ```js
  let game=reactive({name:'明日方舟',author:'鹰角'})
  function changeName(){
    // game={name:'FF14',author:'se'} // 错误写法，不会改变
    // game=reactive({name:'FF14',author:'se'}) // 错误写法，不会改变

    // 正确写法
    Object.assign(game,{name:'FF14',author:'se'})
  }
  ```

  ```js
  let game=ref({name:'明日方舟',author:'鹰角'})
  function changeName(){
    game.value={name:'FF14',author:'se'} // ref可以直接.value修改对象
  }
  ```

3. 使用原则
   - 基本数据类型，只用`ref`。
   - 响应式对象且层级不深，用 `ref` `和reactive` 都可以。
   - 层级较深的响应式对象，用 `reactive` 更合适。

## 5. `toRef` 和 `toRefs`
>
> - `toRef` 和 `toRefs`都可以将对象中的属性结构为响应式的数据。
> - `toRef`单个转换，`toRefs`可以批量转换。

```js
import {ref,reactive,toRef,toRefs} from 'vue'
let game =reactive({name:'明日方舟',author:'鹰角'})
let {name,author}=toRefs(game) // 此时结构赋值得到的name和author都是由ref定义的响应式数据

// 若只想从对象中得到其中一个属性定义为响应式数据，则如下
let mz = toRef(game,'name') // 如此得到的mz数据也是响应式的
```

## 6. computed
::: vue-demo 计算属性
```vue
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    全名：<span>{{fullName}}</span> <br>
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>
<script>
  const {ref,computed}=vue
  export default{
    setup(){
      let firstName = ref('zhang')
      let lastName = ref('san')
      // 计算属性——只读取，不修改
      /* let fullName = computed(()=>{
        return firstName.value + '-' + lastName.value
      }) */
      // 计算属性——既读取又修改
      let fullName = computed({
        // 读取
        get(){
          return firstName.value + '-' + lastName.value
        },
        // 修改
        set(val){
          firstName.value = val.split('-')[0]
          lastName.value = val.split('-')[1]
        }
      })
      function changeFullName(){
        fullName.value = 'li-si'
      } 
    }
  }
  
</script>
```
:::

## 7. watch
- 监视数据的变化。
- vue3中的watch能监视以下四种数据：
  - ref定义的数据
  - reactive定义的数据
  - 函数返回的一个值（getter函数）
  - 一个包含上述内容的数组

### 7.1 监视`ref`定义的基本类型数据
```js
import {ref,watch} from 'vue'
let sum = ref(0)
function changeSum(){
  sum.value+=1
}
// 以下表示sum只要变化就一直处于监视状态
watch(sum,(newValue,oldValue)=>{
  console.log('sum变化',newValue,oldValue)
})

// 以下表示当sum>=10时，对于sum的监视停止
const stopWatch=watch(sum,()=>{
  console.log('sum变化',newValue,oldValue)
  if(sum>=10){
    stopWatch()
  }
})
```

### 7.2 监视`ref`定义的对象类型数据
> 监视的是对象的地址值，若想监视对象内部属性的变化，需要手动开启配置项深度监视
```js
import {ref,watch} from 'vue'
let person=ref({
  name:'张三',
  age:18
})
function changeName(){
  person.value.name+='~'
}
function changeAge(){
  person.value.age+=1
}
function changePerson(){
  person.value={name:'李四',age:67}
}

// 监视对象地址值的变化
watch(person,(newValue,oldValue)=>{
  console.log('person发生变化',newValue,oldValue) // changeName和changeAge不触发watch，changePerson才出发watch
})

// 监视对象内部属性的变化
watch(person,(newValue,oldValue)=>{
  console.log('person发生变化',newValue,oldValue) // 以上三个方法都会触发watch
},{deep:true})
// 配置项还可以加immediate:true，表示立即监视，即还未发生变化时先监视一次，对应的值为：newValue,undefined
// 这种情况下，开启了deep:true，只改变对象中某个属性值时返回的newValue,oldValue是一样的，都是修改后的值，因为两者是同一个对象，引用地址未变，但是如果将整个对象改变，则新旧值是不同的对象。
```

### 7.3 监视`reactive`定义的对象类型数据
```js
import {reactive,watch} from 'vue'
let person=reactive({
  name:'张三',
  age:18
})
function changeName(){
  person.name+='~'
}
function changeAge(){
  person.age+=1
}
function changePerson(){
  Object.assign(person,{name:'李四',age:67})
}
watch(person,(newValue,oldValue)=>{
  console.log('person发生改变',newValue,oldValue) // 三个方法都可以触发watch，隐式创建深度监听且不能关闭，newValue,oldValue相同，因为地址没变
})
```

### 7.4 监视`ref`或`reactive`定义的对象内的某个属性
- 若该属性**不是**【对象类型】，需要写成函数形式
- 若该属性**是**【对象类型】，可直接编，也可写成函数形式，建议写为函数形式
```js
import {reactive,watch} from 'vue'
let person = reactive({
  name:'明日方舟'，
  age:5,
  member:{
    m1:'煌',
    m2:'棘刺'
  }
})
function changeName(){
  person.name='FF14'
}
function changeAge(){
  person.age=10
}
function changeM1(){
  person.member.m1='雅修特拉'
}
function changeM2(){
  person.member.m2='桑克瑞德'
}
function changeMember(){
  person.member={m1:'阿莉塞',m2:'阿尔菲诺'}
}

watch(()=>person.name,(newValue,oldValue)=>{ // getter函数返回一个值
  console.log('name变化',newValue,oldValue)
})

watch(person.member,(newValue,oldValue)=>{
  console.log('member变化',newValue,oldValue) // changeM1和changeM2能监视到，changeMember监视不到，但是页面显示数据有变化，因为此时member已经不是原来的member了
})

watch(()=>person.member,(newValue,oldValue)=>{
  console.log('member变化',newValue,oldValue)  // changeM1和changeM2不能监视到（加上deep:true可以监视到），changeMember能监视到
}) 
```

### 7.5 监视多个数据
```js
// ...数据及方法如上，要监视多个属性可以用如下写法
watch([person.name,()=>person.member.m1],(newValue,oldValue)=>{
  console.log('member变化',newValue,oldValue)  // changeM1和changeM2不能监视到（加上deep:true可以监视到），changeMember能监视到
}) 
// 数组内不一定都是函数
watch([person.name,person.member],(newValue,oldValue)=>{
  console.log('member变化',newValue,oldValue)  // changeM1和changeM2不能监视到（加上deep:true可以监视到），changeMember能监视到
}) 
```

### 7.6总结
:::warning 
- 监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的改变。
- 监视`ref`定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。
- 监视`reactive`定义的【对象类型】数据，且默认开启了深度监视。
- 监视`ref`或`reactive`定义的【对象类型】数据中的**某个属性**，最好写函数式，如果需要关注对象内部，需要手动开启深度监视。
:::

## 8. watchEffect
- 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。
- `watch`和`watchEffect`的异同：
  - 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
  - `watch`：要明确指出监视的数据
  - `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。

```js
import {ref,watchEffect} from 'vue'
let temp = ref(0)
let height = ref(0)
function changePrice(){
  temp.value += 10
}
function changeSum(){
  height.value += 1
}
// 用watchEffect实现，不用watch 
const stopWtach = watchEffect(()=>{
  // 室温达到50℃，或水位达到20cm，立刻联系服务器
  if(temp.value >= 50 || height.value >= 20){
    console.log(document.getElementById('demo')?.innerText)
    console.log('联系服务器')
  }
  // 水温达到100，或水位达到50，取消监视
  if(temp.value === 100 || height.value === 50){
    console.log('清理了')
    stopWtach()
  }
})
```

## 9. 标签的`ref`属性
- `ref`在组件标签上，表示的是组件实例。
- `ref`在HTML标签上拿到的是DOM元素。

::: normal-demo 父组件
```vue
<template>
  <Person ref="ren"/>
  <h2 ref="arknights">明日方舟</h2>
  <button @click="test">测试</button>
</template>
<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import {ref} from 'vue'
  let ren = ref()
  let arknights = ref()
  function test(){
    console.log(ren.value.name)
    console.log(ren.value.age)
    console.log(arknights.value) // <h2>明日方舟</h2>
  }
</script>
```
:::

::: normal-demo 子组件
```js
import {ref,defineExpose} from 'vue'
// 数据
let name = ref('张三')
let age = ref(18)
// 使用defineExpose将组件中的数据交给外部，defineExpose暴露出去的元素才可以在父组件中通过ref拿到，否则因为父子组件的隔离是拿不到的
defineExpose({name,age}) 
```
:::

## 10. TS中的接口、泛型、自定义类型
- 接口
  ```ts
  export interface PersonInter { // interface表示接口
    id:string, // 数据类型用小写
    name:string,
    age:number
  }
  ```
  组件中引入这个定义的对象：
  ```ts
  import {type PersonInter} from './xxxx'
  let person:PersonInter={id:'hgjfds76',name:'Jack',age:56}
  ```
- 泛型
  ```ts
  import {type PersonInter} from './xxxx'
  let personList:Array<PersonInter>=[  // 定义一个数组，数组里的内容是何种类型定义在<>内，表示泛型
    {id:'hgjfds76',name:'Jack',age:56},
    {id:'hgjfds74',name:'Jhon',age:51},
    {id:'hgjfds72',name:'Marry',age:53}
  ]
  ```
- 自定义类型
  ```ts
  export interface PersonInter {
    id:string,
    name:string,
    age:number,
    x?:number // 表示不一定使用
  }
  // 一个自定义类型
  export type Persons=Array<PersonInter>
  // 也可以这样写
  // export type Persons=PersonInter[]
  ```
  使用：
  ```ts
  import {type Persons} from './xxxx'
  let personList:Persons=[
    {id:'hgjfds76',name:'Jack',age:56},
    {id:'hgjfds74',name:'Jhon',age:51},
    {id:'hgjfds72',name:'Marry',age:53}
  ]
  // 若定义响应式数据
  let personList=reactive<Persons>([
    {id:'hgjfds76',name:'Jack',age:56},
    {id:'hgjfds74',name:'Jhon',age:51},
    {id:'hgjfds72',name:'Marry',age:53}
  ])
  ```

## 11. props
- 父组件
  ```vue
  <template>
    <Person a="arknights" :list="personList"/>
  </template>
  <script lang="ts" setup name="App">
    import Person from './Person'
    import {reactive} from 'vue'
    import {type Persons} from '@/types'

    let personList=reactive<Persons>([
      {id:'hgjfds76',name:'Jack',age:56},
      {id:'hgjfds74',name:'Jhon',age:51},
      {id:'hgjfds72',name:'Marry',age:53}
    ])
  </script>
  ```
- 子组件
  ```vue
  <template>
    <div> 
      <ul>
        <li v-for="item in list" :key="item.id">{{item.name}}:{{item.age}}</li>
      </ul>
    </div>
  </template>
  <script lang="ts" setup name="Person">
    import {defineProps,withDefaults} from 'vue' //defineProps为宏函数，不引入也不会报错
    import {type Persons} from '@/types'
    // 接受
    // defineProps(['a','list'])

    // 接受并保存
    /* let demo = defineProps(['a'])
    console.log(demo.a) */
    
    // 接受并限制类型
    // defineProps<{list:Persons}>()

    // 接受并限制类型+限制必要性+指定默认值
    withDefaults(defineProps<{list?:Persons}>(),{
      list:()=>[{id:'ghjasgd87',name:'Angel',age:10}]
    }) 
    // list+?,?表示不一定需要传，父组件不传不会报错
    // withDefaults指定默认值
  </script>
  ```
::: tip
1. 只接受 `defineProps(['a','list'])`
2. 接受并保存 `let demo = defineProps(['a'])`
3. 接受并限制类型 `defineProps<{list:Persons}>()`
4. 接受并限制类型+限制必要性+指定默认值 `withDefaults(defineProps<{list?:Persons}>(),{list:()=>[{id:'ghjasgd87',name:'Angel',age:10}]})`
:::

## 12. 生命周期
### 12.1 vue2的生命周期
1. 创建（创建前`beforeCreate`，创建完毕`created`）
2. 挂载（挂载前`beforeMount`，挂载完毕`mounted`）
3. 更新（更新前`beforeUpdate`，更新完毕`updated`）
4. 销毁（销毁前`beforeDestroy`，销毁完毕`destroyed`）

### 12.2 vue3的生命周期
1. 创建阶段：`setup`
2. 挂载阶段：`onBeforeMount`、`onMounted`
3. 更新阶段：`onBeforeUpdate`、`onUpdated`
4. 卸载阶段：`onBeforeUnmount`、`onUnmounted`

::: details
```vue
<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<!-- vue3写法 -->
<script lang="ts" setup name="Person">
  import { 
    ref, 
    onBeforeMount, 
    onMounted, 
    onBeforeUpdate, 
    onUpdated, 
    onBeforeUnmount, 
    onUnmounted 
  } from 'vue'

  // 数据
  let sum = ref(0)
  // 方法
  function changeSum() {
    sum.value += 1
  }
  console.log('setup')
  // 生命周期钩子
  onBeforeMount(()=>{
    console.log('挂载之前')
  })
  onMounted(()=>{
    console.log('挂载完毕')
  })
  onBeforeUpdate(()=>{
    console.log('更新之前')
  })
  onUpdated(()=>{
    console.log('更新完毕')
  })
  onBeforeUnmount(()=>{
    console.log('卸载之前')
  })
  onUnmounted(()=>{
    console.log('卸载完毕')
  })
</script>
```
:::