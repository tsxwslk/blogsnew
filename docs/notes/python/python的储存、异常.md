---
title: python的储存、异常
author: 怡然
createTime: 2025/10/14 15:24:06
permalink: /python/0rr4r8z3/
---

## 1. 永久储存
- 创建文件
```python
f = open("liuyr.txt","w")
f.write("hello world")
11
f.writelines(['\n一只哈巴狗\n','君不见黄河之水天上来'])
f.close() # 关闭文件后，文件才会被写入
```

```python
# 不关闭文件即可将内容写进文件
f = open("liuyr.txt","r+")
f.write("\n我是liuyr")
f.flush() # 刷新文件缓冲区，将内容写入文件
```

- 读取目录
```python
from pathlib import Path
Path.cwd()
# WindowsPath('D:/python')
p = Path('D:\个人代码\python学习')
q = p / "liuyr.txt"
# WindowsPath('D:/个人代码/python学习/liuyr.txt')
p.is_dir() # 判断是否为目录
p.is_file() # 判断是否为文件

Path("C:\404").exists() # 判断是否存在
p.name # 获取路径的最后一个部分
q.stem # 获取文件名
q.suffix # 获取文件扩展名
p.parent # 获取父目录
p.parents # 获取所有父目录，是一个可迭代对象，也可以使用索引
p.parts # 获取路径的所有部分，是一个元组
# ('D:', '\\', '个人代码', 'python学习')
p.stat() # 获取文件的状态信息

Path('./liuyr.txt') # 相对路径
Path('../')
Path('./liuyr.txt').resolve() # 相对路径转换为绝对路径
p.iterdir() # 获取目录下的所有文件和目录，是一个可迭代对象
for i in p.iterdir():
    print(i)
```

- 创建文件夹
```python
p.mkdir() # 创建目录
p.mkdir(parents=True,exist_ok=True) # 创建多级目录，若目录已存在则不报错
```

- 重命名rename
- 删除rmdir、unlink
- 查找glob()

## 2. 异常处理
- try except
```python
try:
    print(1/0)
except ZeroDivisionError as e:
    print("除数不能为0")
```

- try except else
```python
try:
    print(1/0)
except ZeroDivisionError as e:
    print("除数不能为0")
else:
    print("程序正常运行")
```

- try except finally
```python
try:
    print(1/0)
except ZeroDivisionError as e:
    print("除数不能为0")
finally:
    print("程序结束")
```

- raise语句
```python
def funA():
    print("正在调用funA")
    raise ZeroDivisionError("除数不能为0")

# 自己抛出错误
```

- raise from
- assert

## 3. 利用异常实现goto
```python
try:
    while True:
        while True:
            for i in range(10)：
                if i > 3:
                    raise
                print(i)
            print("被跳过")
        print("被跳过")
    print("被跳过")
except:
    print("到这里")

# 0 
# 1
# 2
# 3
# 到这里