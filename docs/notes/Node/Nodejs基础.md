---
title: Nodejs基础
author: 怡然
createTime: 2025/06/11 16:40:51
permalink: /Node/8gwzrgz6/
---

## 1. Node.js编码注意事项
- `Node.js`中不能使用`BOM`和`DOM`的`API`，可以使用`console`和`定时器API`。
- `Node.js`中的顶级对象为`global`，也可以用`globalThis`访问顶级对象。

## 2. `Buffer`
- `JavaScript` 语言自身只有字符串数据类型，没有二进制数据类型。
- `Node.js` 中的 `Buffer` 类是用于处理二进制数据的核心工具，提供了对二进制数据的高效操作。
- `Buffer` 对象是一个包含原始二进制数据的固定大小的数组。每个元素占用一个字节（8位），因此 `Buffer` 适合处理二进制数据，如文件内容、网络数据包等。
- `Buffer` 对象的内容可以在创建后修改，但其长度是固定的，不能动态改变。

### 2.1 创建`Buffer`类
```js
// 1.Buffer.alloc()方法
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
console.log(buf1) // <Buffer 00 00 00 00 00 00 00 00 00 00>
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1); 
console.log(buf2) // <Buffer 01 01 01 01 01 01 01 01 01 01>

// 2.Buffer.allocUnsafe()方法：该方法创建比alloc快，但他不会对旧数据清零，会导致包含旧数据，且每次数据和上一次运行的结果都不同。
let buf3 = Buffer.allocUnsafe(100)
console.log(buf3) 

// 3.Buffer.from 创建一个有`hello`内容转换来的buffer二进制对象
let buf4 = Buffer.from('hello')
console.log(buf4) // <Buffer 68 65 6c 6c 6f> `h`对应的码为104，104对应的16进制为68
let buf5 = Buffer.from([105,212,321,42])
console.log(buf5) // <Buffer 69 d4 41 2a>
```

### 2.2 `buffer`与字符串的转换
- `toString()`方法
- 默认采用`utf-8`的编码方式转换
```js
let buf5 = Buffer.from([105,212,321,42])
console.log(buf5.toString())  // i�A* 
```

### 2.3 `buffer`元素的读写
- 对单独元素的查看：直接使用下标，显示的是十进制，也可转换为其他进制，使用`toString(2)`即为转换为二进制

```js
let buf4 = Buffer.from('hello')
console.log(buf4[0]) // 104 h在码表中对应的十进制值
console.log(buf4[0].toString(2)) // 01101000  h在码表中对应的二进制值
console.log(buf4[0].toString(16)) // 68 h在码表中对应的十六进制值
```

- 使用下标改写buffer
  
```js
let buf4 = Buffer.from('hello')
buf4[0]=95
console.log(buf4.toString()) // _ello
```

### 2.4 `buffer`的溢出
- `buffer`一个元素能保存最大的值为1个字节8位，即`1111 1111`，上限为255，超过255的二进制，会被舍弃高位，如下：

```js
let buf4 = Buffer.from('hello')
buf4[0] = 361 // 361的二进制为000101101001，舍弃超过8位的值为01101001，转换位十进制为105
console.log(buf4) // <Buffer 69 65 6c 6c 6f>
console.log(buf4.toString()) // iello
```
