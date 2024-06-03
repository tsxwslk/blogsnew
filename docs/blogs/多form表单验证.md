---
title: 多form表单验证
author: 怡然
createTime: 2024/06/03 15:54:41
permalink: /article/6du8llx7/
tags:
  - element-ui
  - Promise
---
::: info
在开发中常见同一个页面有多个表单，提交时需每个表单都验证通过才可以正常提交，否则返回报错信息，可以使用Promise.all()进行校验。具体方法如下：
:::

```js
// 校验方法
submitForm(formName) {
  return new Promise((resolve, reject) => {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        resolve()
      } else {
        reject(new Error('请检查表单填写'))
      }
    })
  })
},
// 提交按钮
onSubmit() {
  Promise.all([
    this.submitForm('form1'), 
    this.submitForm('form2')，
    ...
    ])
    .then(() => {
      // 此处可处理表单验证通过后的提交方法
    })
    .catch(() => {
      this.$message.error('验证失败')
    })
}
```