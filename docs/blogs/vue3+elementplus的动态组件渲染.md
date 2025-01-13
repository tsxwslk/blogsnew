---
title: vue3+elementplus的动态组件渲染
author: 怡然
createTime: 2025/01/13 10:31:18
permalink: /article/hjzxw118/
tags:
  - vue3
  - element-plus
---

::: info 问题起源
本次问题发现源于在开发`vue3`项目使用`elementplus`的菜单组件做动态菜单功能，之前的`vue2+elementui`中，动态渲染`icon`为为标签内的`class`上写对应的`icon`名称，若是动态`icon`，只需写动态的`class`即可实现。但是`vue3+elementplus`中，`icon`的实现有所差别，改为直接用组件形式渲染`icon`，那我们的思路自然使用动态组件来动态渲染不同的菜单`icon`。
:::

## 1. 动态组件注册在组件内部：
::: details
```vue
<template>
  <el-menu active-text-color="#19ECFF" background-color="#00325C" class="el-menu-vertical-demo"
    :default-active="activeIndex" text-color="#fff">
    <template v-for="item in menuList" :key="item.menuId">
      <!-- 如果有子菜单 -->
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.menuId">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :index="child.menuId" @click="goRouter(child)">
          <template #title>
            <el-icon>
              <component :is="child.icon"></component>
            </el-icon>
            <span>{{ child.menuName }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <!-- 没有子菜单 -->
      <el-menu-item v-else :index="item.path" @click="goRouter(item)">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuInter } from '@/types/menuInterface'
import { useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";  // 在组件内部引入相应的icon
const router = useRouter();
const menuList: MenuInter[] = [
  {
    menuId: '1',
    menuName: '工作台',
    path: '/workbench',
    icon: 'Setting'
  },
  {
    menuId: '2',
    menuName: '项目管理',
    path: '/project-managementView',
    icon: 'Document',
  }
];
const activeIndex = ref<string>('1')
const goRouter = (item: MenuInter) => {
  router.push(item.path)
}
</script>
<style lang="less" scoped>
.el-menu {
  width: 250px;
  height: 100%;
  border-right: none;
}
</style>
```
:::

> 在上述代码中，虽然引入了相应的`icon`，但是由于未注册，并不能使得`icon`正常显示，考虑过不使用`setup`语法糖，使用`vue2`的写法，引入`icon`后，使用`components`注册，实测也不能如预期展示`icon`。


## 2. 问题解决：动态渲染的组件在`main.ts`中引入并注册

```ts
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue"; 

const app = createApp(App);
app.component("Document", Document);
app.component("Menu", IconMenu);
app.component("Setting", Setting);
app.component("Location", Location);
```