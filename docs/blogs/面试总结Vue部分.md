---
title: 面试总结Vue部分
author: 怡然
createTime: 2024/11/21 10:23:15
permalink: /article/63u2gd7j/
tags:
  - Vue
  - 面试
---

## 一、  `keep-alive`
> `keep-alive`是Vue的内置组件，用来缓存动态组件或路由组件，避免频繁销毁和重建组件，减少不必要的性能开销。
1. 
::: details 用法示例
```vue
<template>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
</template>

<script>
  export default {
    data() {
      return {
        currentComponent: 'MyComponent'
      }
    }
  }
</script>

```
:::

> 上述代码中，`keep-alive`包裹了一个动态组件，即使 ***currentComponent*** 组件发生变化，之前加载过的组件状态也会被保留。

2. `keep-alive`可以通过路由的`meta`字段实现组件的缓存控制
```js
const routes = [
  {
    path: '/componentA',
    component: ComponentA,
  <!--keepAlive：在路由配置中为需要缓存的路由设置的字段。true 表示需要缓存，false 或不设置表示不缓存。 -->
    meta: { keepAlive: true }
  },
  {
    path: '/componentB',
    component: ComponentB,
    meta: { keepAlive: false }
  },
  // 其他路由配置
];
```
- 在`keep-alive`组件中，通过计算属性或方法实现哪些组件应该被缓存
```vue
<template>
  <keep-alive :include="cachedComponents">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  computed: {
    // cachedComponents：通过计算属性获取需要缓存的组件名称列表，并传递给 keep-alive 的 include 属性。
    cachedComponents() {
      // $route.matched：返回当前匹配到的所有路由记录。
      return this.$route.matched
        .filter(route => route.meta.keepAlive)
        .map(route => route.name);
    }
  }
}
</script>
```

3. `include/exclude`: 用于指定哪些组件需要被缓存或不被缓存。 其中：`exclude`的优先级大于`include`，如果一个组件既在 `exclude` 中，又在`include`中，那么这个组件将不会被缓存。

4. `max` : 设置缓存的组件数量上限，超过这个数量时，最久未使用的组件实例将被销毁。
```vue
<!-- 在这里最多缓存10个组件，超出部分会被销毁 -->
<keep-alive :max="10">
  <component :is="currentComponent"></component>
</keep-alive>
```

5. 生命周期钩子

- `activated`：当组件被缓存后，再次显示时触发。
- `deactivated`: 当组件被缓存时调用，而不是被销毁。
- `keep-alive` 组件本质上是一个高阶组件，通过内部管理一个缓存对象来存储组件实例。当组件被缓存时，它的 `DOM` 会被移除，但实例和数据状态会被保留。当再次激活该组件时，它的实例会从缓存中恢复，而不需要重新创建。

## 二、 自定义指令
> vue项目中，常常会有一些全局使用的方法，通过注册全局指令，可以最大程度的复用，减少代码量。
> 比较常见的全局注册的方法有，控制权限的指令，样式控制指令，长按操作指令等。

::: details 全局指令定义
- 定义自定义指令文件`highlight.js`
```js
//highlight.js
export default {
  updated(el, binding) {
   if(!binding.value) {
    el.style.backgroundColor = '#fff';
   }
   else {
    if(binding.value < 10) {
     el.style.backgroundColor = 'aqua';
    }
    else if(binding.value > 10 && binding.value < 21) {
     el.style.backgroundColor = 'pink';
    }
    else {
     el.style.backgroundColor = 'greenyellow';
    }
   }
  }
};
```

- 新建 `directives/index.js` 文件，注册自定义指令
```js
// directives/index.js
import Highlight from './directive-muster/highlight'  //导入自定义指令
const directives = {  //汇总自定义指令
  // 此处可进行多个指令
  Highlight//文本高亮指令
}
export default {  //导出自定义指令
  install(app) {// 以安装的方式插到app中
   Object.keys(directives).forEach((key) => {    // 遍历directives对象的key
    app.directive(key, directives[key])  // 将每个directive注册到app中
   })
  }
}
```

- 在 `main.js` 引入并调用
```js
import { createApp } from 'vue';
import App from './App.vue';
import Directives from '@/utils/directives/index';
const app = createApp(App);
app.use(Directives).mount('#app');
```

- 使用
```vue
<template>
  <input type="number" v-model="inpValue">
  <div v-Highlight="inpValue">demo</div>
</template>
<script setup>
import { ref } from 'vue';
const inpValue = ref(0);
</script>
```
:::

## 三、vue配置反向代理解决跨域
- 正向代理： 在客户端和原始服务器(origin server)之间架设一个代理服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。
- 反向代理： 反向代理（Reverse Proxy）方式是指以代理服务器来接受网络上的连接请求，然后将请求转发给内部网络上的服务器，并将服务器上得到的结果返回给请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。客户端无需做任何配置。
- 在前后端分离的网站架构中，服务器经常要配置反向代理，使前端通过固定地址访问后端接口，这样后端服务可以采取负载均衡等性能优化措施，对前端应用透明。
- 假设前端服务器地址为：`http://127.0.0.1:8080`，后端实际服务地址为：`http://server/web-service/userList` ，由于涉及到跨域的问题，前端无法直接发`http`请求给此地址，只能发送同域下的`api`请求例如：`http://127.0.0.1:8080/api/userList`

```js
{proxy: 
  {
      '/api': {
        target: 'http://192.168.0.1:200', // 要代理的域名
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': '' 
        }
      }
  }
}	
```