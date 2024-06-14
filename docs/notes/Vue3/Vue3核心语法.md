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
   ```ts
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
    ```ts
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
    ```ts
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
    ```ts
    <script lang="ts" setup name="personOne">
    // 此时在script标签里就可以直接定义组件的name
    </script>
    ```
## 3. `ref` 创建：基本类型的响应式数据
1. 创建基本类型数据
  ```ts
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
  ```ts
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
```ts
// reactive只能定义对象类型的响应式数据
import {reactive} from 'vue'
let poem = reactive({name:'将进酒',poet:'李白'})
function changePoem(){
  poem.name='长恨歌'
  poem.poet='白居易'
}
```