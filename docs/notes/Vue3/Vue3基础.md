---
title: Vue3基础
author: 怡然
createTime: 2024/06/13 17:05:00
permalink: /Vue3/ek4lw5lr/
---

::: info
vue2已经终止支持不再维护了，之前的项目中短暂地学习使用过一段时间vue3，但是不够完整，这次准备从头，完整细致地学习一遍。
:::
## 1. 项目创建
> 创建vue3需要node版本在18.3以上，如果有多个项目并行，且老旧项目需要低版本的node才能运行的时候，可以使用nvm控制node版本。
### 1.1 基于webpack的vue-cli创建
1. 安装vue-cli
```powershell
npm install -g @vue/cli
```
2. 创建vue项目
```powershell
vue create vue-project
```
> 选择版本
```powershell
Vue CLI v5.0.8
? Please pick a preset: (Use arrow keys)
  Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
```
3. 进入项目
```powershell 
cd vue-project
```
4. 启动项目
```powershell
npm run serve
```
### 1.2 基于vite创建
1. 创建项目
```powershell
npm create vue@latest
```
```powershell
Vue.js - The Progressive JavaScript Framework
? 请输入项目名称： » vue3_learning
Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes
```

## 2. 项目目录
```js
- .vscode
    - extentions.json // vscode安装的插件
- node_modules // 依赖
- public // 公共文件包括网站icon等
- src // 前端项目文件
    - assets
    - components
    - App.vue // 根组件
    - main.ts 
- .gitignore
- env.d.ts // 帮助TS识别文件类型，如.jpg等
- index.html // 入口文件
- package.json
- package-lock.json
- tsconfig.app.json // ts配置文件
- tsconfig.json // ts配置文件
- tsconfig.node.json // ts配置文件
- vite.config.ts // 整个项目的配置文件
```
> main.ts写法
```ts
// 引入createApp用于创建应用
import {createApp} from 'vue'
// 引入根组件
import App from './App.vue'
// 挂载
createApp(App).mount('#app')
```
