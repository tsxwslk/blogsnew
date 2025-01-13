---
title: el-menu高亮问题
author: 怡然
createTime: 2024/05/30 09:48:49
permalink: /article/740a5g2b/
tags:
  - element-ui
  - vue2
---

:::info
在之前的项目开发中，遇到了切换头部导航时，侧边导航设置的默认菜单高亮出现时而能生效，时而不能生效的奇怪问题。经过排查，发现`<el-menu-item>`绑定的`key`值不可以是菜单数组对象的索引，因为不同头部导航对应的侧边菜单数量不同，绑定一个完全不会重复的值作为`key`值就不会出现这个问题了。
:::

```html
<el-container>
  <el-aside width="200px">
    <el-menu :default-active="asideIndex" class="el-menu-vertical-demo"
      :default-openeds="openIds">
      <el-submenu :index="headIndex">
        <template slot="title">
          <span>{{
        asideMenu.find((item) => item.main.value == headIndex).main
          .label
      }}</span>
        </template>
        <el-menu-item v-for="item in asideMenu.find(
        (it) => it.main.value == headIndex
      ).sub" :index="item.value" :key="item.value" @click="goRouter(item.router, item.value)">
          <template slot="title">
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu></el-aside>
  <el-main>
    <router-view> </router-view>
  </el-main>
</el-container>
```
