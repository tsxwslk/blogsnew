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

### 总结
> 通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。