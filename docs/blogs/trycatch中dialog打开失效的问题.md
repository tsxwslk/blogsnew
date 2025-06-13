---
title: trycatch中dialog打开失效的问题
author: 怡然
createTime: 2025/06/10 09:42:53
permalink: /article/lzj41zxf/
tags:
  - 问题解决
  - 异步
---

::: info 
接手其他同事的代码，在`async/await`中使用`try/catch`调用接口，接口调用成功后`dialog`的`visible`为`true`的操作不生效，导致`dialog`无法显示，经排查，监听该`visible`的值也监听不到任何变化，说明在`try`当中对`visible`的改变未生效。
`async`和`await`是基于`Promise`的语法糖，使得异步代码看起来更像同步代码。
:::

- 原代码
```javascript
async handelQA(question) {
  this.loading = true
  this.tagLoading = true
  const sendInput = {
    question: question,
    userId: String(store.state.user.userInfo.user.userId)
  }
  try{
    const {code,data} = await handlerQAndA(sendInput)
    // xxx...
    if(code==200){
      this.QAData = this.handleData(res.data)
      this.visible=true // 不生效，监听不到变化
    }
  }catch(e){
    // xxx
  }
},
```

- 修改后
```javascript
handelQA(question) {
  this.loading = true
  this.tagLoading = true
  const sendInput = {
    question: question,
    userId: String(store.state.user.userInfo.user.userId)
  }
  handlerQAndA(sendInput)
    .then((res) => {
      if (res.code == 200) {
        this.QAData = this.handleData(res.data)
        this.QAVisible = true
      }
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      this.loading = false
      this.tagLoading = false
    })
},
```