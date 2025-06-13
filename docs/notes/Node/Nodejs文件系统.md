---
title: Nodejs文件系统
author: 怡然
createTime: 2025/06/13 10:24:09
permalink: /Node/gp6citrl/
---

## 1. 文件写入
- 全名为`file system`，用于读取、写入、删除文件以及执行其他文件系统操作。

### 1.1 `fs.writeFile`写入文件
- `fs.writeFile`为写入文件的操作，该操作是异步的。
```js
// 1.导入fs模块
const fs = require('fs')
// 2.写入文件，使用writeFile
fs.writeFile('./demo.txt','测试写入内容',err=>{
  // writeFile三个参数的含义：
  // 第一个是写入的文件名，若无此文件，则自动创建；
  // 第二个是写入的内容；
  // 第三个是错误回调，若有报错，则err为报错的内容，若无报错，则为null
  if(err){
    console.log('写入失败')
    return
  }
  console.log('写入成功')
})
```

- `fs.writeFileSync`为同步写入的操作
```js
fs.writeFileSync('./demo.txt','test')
// 捕获错误可以用try/catch
try {
    fs.writeFileSync('example.txt', 'Hello, World!');
    console.log('File written successfully');
} catch (err) {
    console.error('Error writing file:', err);
}
```

### 1.2 文件追加写入
- 方法一：`fs.appendFile`和`fs.appendFileSync`分别为两个文件追加写入的异步和同步方法。
  
```js 
fs.appendFile('./demo.txt','\r\n这是追加的内容',err=>{ //\r\n为换行
  if(err){
    console.log('追加失败')
    return 
  }
  console.log('追加成功')
})
```

- 方法二：依旧使用`fs.writeFile`，在参数配置时使用`a`可达到追加内容的目的

```js
fs.writeFile('./demo.txt', '\r\n使用write追加内容', { flag: 'a' }, err => {
  // flag为一个标识符，默认为w，只写入；a表示追加；r表示读取
  if (err) {
    console.log('写入失败')
    return
  }
  console.log('写入成功')
})
```

### 1.3 文件流式写入
- 使用`fs.createWriteStream`方法，适用于写入内容较多或频繁写入的场景。
- 程序打开文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数。

```js
let ws=fs.createWriteStream('./蜀道难.txt')
ws.write('噫吁嚱，危乎高哉\r\n');
ws.write('蜀道之难，难于上青天\r\n');
ws.write('蚕丛及鱼凫，开国何茫然\r\n');
ws.write('尔来四万八千岁，不与秦塞通人烟\r\n');
ws.close()
```

### 1.4 常见文件写入场景（需要持久化保存数据）
- 下载文件
- 安装软件
- 保存程序日志
- 编辑器保存文件
- 视频录制等

## 2. 文件读取
### 2.1 `fs.readFile`异步读取
```js
// fs.readFile(path,[options],callback) 三个参数分别为文件路径，配置项和回调函数
fs.readFile('./蜀道难.txt',(err,data)=>{
  // err为错误信息，data为执行成功时读取到的文件信息，
  // data是一个buffer对象，若要查看，使用toString()方法
  if(err){
    console.log('读取失败')
    return 
  }
  console.log(data.toString())
})
```

### 2.2 `fs.readFileSync`同步读取
```js
let data = fs.readFileSync('./蜀道难.txt')
console.log(data.toString())
```

### 2.3 `fs.createReadStream`流式读取
- 适用于大文件的读取，如视频音频等，每次读取64KB的内容可以提高效率

```js
let rs = fs.createReadStream('../与夏令.wav')
// 绑定data事件
rs.on('data',chunk=>{
  console.log(chunk) // 输出很多buffer
  console.log(chunk.length) // 很多的65536，即64kb，表明每一个chunk的大小是64KB
})
// 关闭读取事件
rs.on('end',()=>{
  console.log('读取完成')
})
```

### 2.4 读取文件的应用场景
- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片、播放视频、播放音频
- Git查看日志指令`git log`
- 上传文件
- 查看聊天记录

### 2.5 文件的复制可用方法
- 第一种方法：`readFile`和`writeFile`或其同步的方法

```js
const fs=require('fs')
const process=require('process')  // 提供了有关当前 Node.js 进程的信息和控制方法
let data = fs.readFileSync('../与夏令.wav')
fs.writeFileSync('../与夏令-2.wav',data)
console.log(process.memoryUsage()) // 可以查看当前进程消耗的内存大小
```

- 第二种方法，使用流式读取和写入进行复制

```js
const rs=fs.createReadStream('../与夏令.wav')
const ws=fs.createWriteStream('../与夏令.wav')
rs.on('data',chunk=>{
  ws.write(chunk)
})
rs.on('end',()=>{
  console.log(process.memoryUsage())
})
ws.cloes()
```

- 第三种方法，使用`pipe()`，较为少用

```js
const rs=fs.createReadStream('../与夏令.wav')
const ws=fs.createWriteStream('../与夏令.wav')
rs.pipe(ws)
```

- 区别：如果是较小的文件复制一二两种方式对内存的占用区别不大，但是文件较大时使用第二种方法对内存占用较小，节约性能。

## 3. 文件重命名和移动
- `fs.rename`和`fs.renameSync()`

```js
fs.rename('./demo.txt','demo-1.txt',err=>{ // 第一个参数是源文件名，第二个参数是重命名
  if(err){
    console.log('重命名失败')
    return
  }
  console.log('重命名成功')
})
```

- 移动也用该方法，只是第二个参数为需要移动到的文件夹，注意文件夹必须存在否则会报错
  
```js
fs.rename('./蜀道难.txt','./资料/蜀道难.txt',err=>{
  if(err){
    console.log('重命名失败',err)
    return
  }
  console.log('重命名成功')
})
```