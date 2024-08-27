---
title: Animate动画库
author: 怡然
createTime: 2024/05/31 15:41:16
permalink: /Plugin/7crjgfmz/
---

:::info
Animate.css是一个现成的跨浏览器动画库，有很多内置的动画效果，非常适合一些常见的场景使用，在之前的大屏项目中，曾给组件增加动画效果，就使用的该动画库，能满足大多数需求。里面的动画效果就不一一展示了。
:::

### 安装与使用
#### 安装
- 安装
```
npm install animate.css --save
or
yarn add animate.css
```
- 导入
```
import 'animate.css';
```
or
```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>
```
#### 基本用法
```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
<!--必须使用animate__animated animate__+动画名称-->
```
#### 用@keyframes关键帧
> 可以直接使用动画的@keyframes来修改一些样式

```css
.my-element {
  display: inline-block;
  margin: 0 0.5rem;

  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
```
#### CSS 自定义属性（CSS 变量）
Animate.css使用自定义属性（也称为 CSS 变量）来定义动画的持续时间、延迟和迭代。需要更改动画只需在全局或本地设置一个新值即可。
```css
/* This only changes this particular animation duration */
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}
/* This changes all the animations globally */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
```
> 通过自定义属性，还可以轻松动态更改动画的所有受时间限制的属性，可以使用 javascript 进行设置

```js
// All animations will take twice the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '2s');
// All animations will take half the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '.5s');
```

### Utility Classes（实用程序类）
#### Delay classes延迟类
- 默认值

  | 类名| 默认延迟时间|
  |-------|-----------|
  |`animate__delay-2s`|	2s|
  |`animate__delay-3s`|	3s|
  |`animate__delay-4s`	|4s|
  |`animate__delay-5s`	|5s|
  
  ```html
  <div class="animate__animated animate__bounce animate__delay-2s">Example</div>
  ```
- 自定义
  ```css
  /* All delay classes will take 2x longer to start */
  :root {
    --animate-delay: 2s;
  }

  /* All delay classes will take half the time to start */
  :root {
    --animate-delay: 0.5s;
  }
  ```
#### Slow, slower, fast, and Faster classes速度类
- 默认值

  | 类名| 默认速度时间|
  |-------|-----------|
  |`animate__slow`|	2s|
  |`animate__slower`|	3s|
  |`animate__fast`	|800ms|
  |`animate__faster`	|500ms|
  
  ```html
  <div class="animate__animated animate__bounce animate__faster">Example</div>
  ```
- 自定义
  ```css
  /* All animations will take twice as long to finish */
  :root {
    --animate-duration: 2s;
  }

  /* Only this element will take half the time to finish */
  .my-element {
    --animate-duration: 0.5s;
  }
  ```

#### Repeating classes重复类
> 可以控制动画的重复次数
- 默认值
  | 类名| 默认重复次数|
  |-------|-----------|
  |`animate__repeat-1	`|	1|
  |`animate__repeat-2	`|	2|
  |`animate__repeat-3	`	|3|
  |`animate__infinite	`	|无限次|
- 自定义
  ```css
  /* The element will repeat the animation 2x
   It's better to set this property locally and not globally or
   you might end up with a messy situation */
  .my-element {
    --animate-repeat: 2;
  }
  ```

### 使用注意事项
- 不仅为了页面好看添加动画
- 避免为大型元素添加动画效果
- 不要对根元素进行动画处理
- 在适当的场景下使用无限动画
- 注意元素的初始和最终状态：`animation-fill-mode` `animation-fill-mode: both`
- 不要禁用媒体查询`prefers-reduced-motion`
- 无法对内联元素进行动画处理，如需使用，可以设置`display: inline-block`
- 大多数Animate.css动画都会在屏幕上移动元素，并可能在网页上创建滚动条，可以使用`overflow: hidden`

### 与 Javascript 一起使用
- 添加动画效果
  ```js
  const element = document.querySelector('.my-element');
  element.classList.add('animate__animated', 'animate__bounceOutLeft');
  ```
- 检测动画何时结束
  ```js
  const element = document.querySelector('.my-element');
  element.classList.add('animate__animated', 'animate__bounceOutLeft');
  element.addEventListener('animationend', () => {
    // do something
  });
  ```
- 更改其持续时间
  ```js
  const element = document.querySelector('.my-element');
  element.style.setProperty('--animate-duration', '0.5s');
  ```
- 使用函数来添加动画类并自动删除它们：
  ```js
  const animateCSS = (element, animation, prefix = 'animate__') =>{
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    })
  }

  // 调用
  animateCSS('.my-element', 'bounce');
  // or
  animateCSS('.my-element', 'bounce').then((message) => {
    // Do something after the animation
  });
  ```

