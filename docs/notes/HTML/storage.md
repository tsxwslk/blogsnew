---
title: cookie、sessionStorage 和 localStorage
tags:
  - HTML
author: 怡然
createTime: 2024/05/27 14:58:36
permalink: /article/qfmpsw2i/
---
|          | cookie     | sessionStorage     | localStorage     |
|----------| -------- | -------- | -------- |
| 由谁初始化 | 客户端或服务器，服务器可以使用 ``Set-Cookie`` 请求头 | 客户端 | 客户端 |
| 过期时间     | 手动设置 | 永不过期 | 页面关闭 |
| 在当前浏览器会话中是否保持不变     | 设置的过期时间 | 是 | 否 |
| 是否随着每个HTTP请求发送给服务器     | 是，``Cookies`` 会通过 ``Cookie`` 请求头，自动发送给服务器 | 否 | 否 |
| 容量    | 4kb | 5MB | 5MB |
| 访问权限    | 任意窗口 | 任意窗口 | 当前页面窗口 |