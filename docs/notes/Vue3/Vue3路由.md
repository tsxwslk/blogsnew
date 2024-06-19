---
title: Vue3路由
author: 怡然
createTime: 2024/06/19 10:37:12
permalink: /Vue3/zx69q4mq/
---

## 1. 路由的创建
:::tip
- `router`管理`route`
- `route`是一组`key`和`value`
:::
- router
```js
// 创建一个router并暴露出去
// 第一步，引入createRouter,createWebHistory
import {createRouter,createWebHistory} from 'vue-router'
// 引入要呈现的组件
import demoOne from "@/components/demoOne.vue"
import demoTwo from "@/components/demoTwo.vue"
import demoThree from "@/components/demoThree.vue"
// 第二步：创建router
const router = createRouter({
  history:createWebHistory() // router的工作模式
  routes:[
    {
      path:'/home',
      component:demoOne
    },
    {
      path:'/about',
      component:demoTwo
    }
  ]
})
// 暴露出去操作
export default router
```
- `main.ts`中引用
```js 
import router from './router/index'
const app = createApp(App)
app.use(router)
app.mount('#app')
```
- `App.vue`中使用
```vue
<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script lang="ts" setup name="App">
  import {RouterLink,RouterView} from 'vue-router'  
</script>
```

- 路由组件一般放在`pages`或`views`文件夹里，一般组件通常放在`components`文件夹里。
- 通过点击导航，视觉效果上消失了的路由组件，默认是被卸载的，需要时再挂载。
- `to`的两种写法
```vue
<!-- 字符串写法 -->
<RouterLink to="/home"></RouterLink>
<!-- 对象写法 -->
<RouterLink :to="{path:"/news"}"></RouterLink>
```

## 2. `router`的工作模式
1. history模式：
  - vue2：`mode:"history"`
  - vue3: `history:createWebHistory()`
  - React: `<BrowserRouter>`
:::tip 优点与缺点 
1. 优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。
2. 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有`404`错误。
:::

2. hash模式：
  - vue2：`mode:"hash"`
  - vue3: `history:createWebHashHistory()`
  - React: `<HashRouter>`
:::tip 优点与缺点 
1. 优点：兼容性更好，因为不需要服务器端处理路径。
2. 缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。
:::

## 3. 嵌套路由
```ts
const router = createRouter({
  history:createWebHistory(),
  routes:[
    // ...
    {
      name:'xinwen',
      path:'/news',
      component:News,
      children:[
        {
          name:'xiang',
          path:'detail', // 注意：子路由不需要在前面加 / 
          component:Detail
        }
      ]
    },
    // ...
  ]
})
export default router
```
```vue
<router-link to="/news/detail">xxxx</router-link>
<!-- 或 -->
<router-link :to="{path:'/news/detail'}">xxxx</router-link>
```

## 4. 路由传参
### 4.1 query方式传参
1. 传递参数
```vue
<!-- 跳转并携带query参数（to的字符串写法），参数太多的时候这种写法不推荐 -->
<router-link to="/news/detail?a=1&b=2&content=欢迎你">
  跳转
</router-link>        
<!-- 跳转并携带query参数（to的对象写法） -->
<RouterLink 
  :to="{
    //name:'xiang', //用name也可以跳转
    path:'/news/detail',
    query:{
      id:news.id,
      title:news.title,
      content:news.content
    }
  }"
>
  {{news.title}}
</RouterLink>
```
2. 接收参数
```js
import {useRoute} from 'vue-router'
const route = useRoute()
// 打印query参数
console.log(route.query)
let {query}=toRefs(route) // 记得解构时响应式数据需要加toRefs
```
### 4.2 params方式传参
1. 首先在路由配置时需要占位，如下所示：
   `path:"detail/:id/:title/:content"`
2. 传递参数
  ```vue
  <!-- 跳转并携带params参数（to的字符串写法） -->
  <!-- <RouterLink :to="`/news/detail/001/新闻001/内容001`">{{news.title}}</RouterLink>				 -->
  <!-- 跳转并携带params参数（to的对象写法） -->
  <RouterLink 
    :to="{
      name:'xiang', // 只能用name跳转
      params:{
        id:news.id,
        title:news.title,
        content:news.title
      }
    }"
  >
    {{news.title}}
  </RouterLink>
  ```
3. 接收参数
  ```js
  import {useRoute} from 'vue-router'
  const route = useRoute()
  // 打印params参数
  console.log(route.params)
  ```

:::tip 注意
1. 传递`params`参数时，若使用`to`的对象写法，必须使用`name`配置项，不能用`path`。
2. 传递`params`参数时，需要提前在规则中占位。
3. 如果一个参数可传可不传，则在占位时写个问号，如：`path:"detail/:id/:title/:content?"`
:::

## 5. 路由的props配置
- 第一种：在配置路由时配置参数`props:true`，将路由收到的所有params参数作为props传给路由组件。
- 第二种：写成函数，可以自己决定将什么作为props给路由组件，主要用于query传参。
  ```js
  // ...
  {
    name:"xiang",
    path:"detail",
    component:Detail,
    props(route){
      return route.query
    },
  }
  // ...
  ```
- 第三种：对象写法，传参比较固定，使用场景较少
  ```js
  // ...
  {
    name:"xiang",
    path:"detail",
    component:Detail,
    props:{
      id:100,
      title:200,
      content:300
    },
  }
  // ...
  ```

- 配置props时接收传参的方式：
  ```vue
  <script lang="ts" setup name="App">
  defineProps(['id','title','content'])
  </script>
  ```

## 6. `push`和`replace`
- `push`将路由推入浏览栈中，形成历史记录，可以通过浏览器的前进后退点击。
- `replace`：在`<RouterLink>`里加上`replace`，表示替换原来的路由，则不能前进后退。
  
## 7. 编程式导航
- 脱离`<RouterLink>`实现路由跳转。
```js
import {useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

function goToDetail(news){
  router.push({
    name:'detail',
    query:{
      id:news.id,
      title:news.title,
      content:news.content
    }
  })
}
```

## 8. 重定向
```js
{
  path:'/',
  redirect:'/about'
}
```