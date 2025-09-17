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

## 4. 文件删除
- `unlink`方法

```js
fs.unlink('./demo-1.txt',err=>{ // 同步方法为unlinkSync
  if(err){
    console.log('删除失败')
    return 
  }
  console.log('删除成功')
})
```

- `rm`方法

```js
fs.rm('./资料/蜀道难.txt',err=>{ // 同步方法为rmSync
  if(err){
    console.log('删除失败')
    return 
  }
  console.log('删除成功')
})
```

## 5. 文件夹操作
### 5.1 创建文件夹`mkdir`
- 普通创建文件夹
```js
fs.mkdir('./html',err=>{
  if(err){
    console.log('创建失败')
    return 
  }
  console.log('创建成功')
})
```

- 递归创建文件夹`a/b/c`，需加上参数`recursive`。
```js
fs.mkdir('./a/b/c',{recursive:true},err=>{
  if(err){
    console.log('创建失败')
    return 
  }
  console.log('创建成功')
})
```

### 5.2 读取文件夹
- `readdir`操作
```js
fs.readdir('./资料',(err,data)=>{
  if(err){
    console.log('读取失败')
    return
  }
  console.log(data)
})
```

### 5.3 删除文件夹
- `rmdir`

```js
fs.rmdir('./html',err=>{
  if(err){
    console.log('删除失败')
    return 
  }
  console.log('删除成功')
})
```

- 递归删除，和上述递归创建一样，使用`recursive`参数

```js
fs.rmdir('./a',{recursive:true},err=>{
  if(err){
    console.log('删除失败') 
    return 
  }
  console.log('删除成功')
})
```
- 注意，如果不加`recursive`这个参数，则会报错文件夹不为空时不可删除。
- 高版本`nodejs`会提示`rmdir`会在未来版本中弃用，建议使用`rm`。

## 6. 查看文件资源状态
- 使用`fs.stat`或`fs.statSync`方法

```js
fs.stat('./资料/02_fs模块.pdf',(err,data)=>{
  if(err){
    console.log('查看失败')
    return
  }
  console.log(data)
  //   Stats {
  //   dev: 1449308089,
  //   mode: 33206,
  //   nlink: 1,
  //   uid: 0,
  //   gid: 0,
  //   rdev: 0,
  //   blksize: 4096,
  //   ino: 2533274790462140,
  //   size: 275130, 文件大小
  //   blocks: 544,
  //   atimeMs: 1750036443981.8433,
  //   mtimeMs: 1750035452399.2932,
  //   ctimeMs: 1750035470230.3179,
  //   birthtimeMs: 1750036443981.8433,
  //   atime: 2025-06-16T01:14:03.982Z, 最后访问时间
  //   mtime: 2025-06-16T00:57:32.399Z, 最后修改时间
  //   ctime: 2025-06-16T00:57:50.230Z, 最后一次修改文件状态时间
  //   birthtime: 2025-06-16T01:14:03.982Z  创建时间
  // }
  // isFile 判断是否是文件
  console.log(data.isFile())

  // isDirectory 判断是否是文件夹
  console.log(data.isDirectory())
})
```

## 7. 相对路径与绝对路径的一些问题
- 相对路径参照的时命令行工具的路径，当命令行的工作目录与文件所在目录不一致时，需要注意相对路径访问的地址问题。

```js
fs.writeFileSync('./index.html','love')
// node ../代码/fileSystem.js，
// 若此时命令行工具的工作目录在“/资料”下，则新建的index.html会创建在“/资料”内
```

- 为了避免相对路径出现的问题，引入全局变量`__dirname`
- 绝对路径全局变量保存的是：所在文件的所在目录的绝对路径，新建时可以使用拼接路径的方式进行操作。

```js
console.log(__dirname) // D:\个人代码\学习代码\nodejs
fs.writeFileSync(__dirname+'/index.html','love')
```

## 8. `path`模块

```js
const fs=require('fs')
const path=require('path')
console.log(path.resolve(__dirname,'./index.html')) //D:\个人代码\学习代码\nodejs\index.html
console.log(path.resolve(__dirname,'index.html'))//D:\个人代码\学习代码\nodejs\index.html
// 一般第一个参数为绝对路径，后面的路径是相对路径
// 这样写不会出现/ \混用的情况
```

| API | 说明 |
|-----------|------------------|
| `path.resolve` | 拼接规范的绝对路径（最常用） |
| `path.sep` | 获取操作系统的路径分隔符 |
| `path.parse` | 解析路径并返回对象 |
| `path.basename` | 获取路径的基础名称 |
| `path.dirname` | 获取路径的目录名 |
| `path.extname` | 获得路径的扩展名 |

- 示例

```js
const path = require('path');
//获取路径分隔符 window \ linux /
console.log(path.sep);
//拼接绝对路径
console.log(path.resolve(__dirname, 'test')); //D:\个人代码\学习代码\nodejs\test
//解析路径
let pathname = 'D:/program file/nodejs/node.exe';
console.log(path.parse(pathname));
// {
//   root: 'D:/',
//   dir: 'D:/program file/nodejs',
//   base: 'node.exe',
//   ext: '.exe',
//   name: 'node'
// }
//获取路径基础名称
console.log(path.basename(pathname)) // node.exe
//获取路径的目录名
console.log(path.dirname(pathname)); // D:/program file/nodejs
//获取路径的扩展名
console.log(path.extname(pathname)); // .exe
```
