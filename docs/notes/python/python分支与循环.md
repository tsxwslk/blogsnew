---
title: python分支与循环
author: 怡然
createTime: 2025/09/16 14:20:07
permalink: /python/wlej7zmy/
---

## 1. 条件语句
### 1.1 if语句
```python
if 条件:
    代码块
elif 条件:
    代码块
elif:
    代码块
else:
    代码块
```

- 简单语法
```python
statment(条件成立时执行) if 条件 else statement(条件不成立时执行)
### eg
a = 1
b = 2
small = a if a < b else b
```

```python
score = 87
level = ("d" if 0<=score<60 else
        "c" if 60<=score<80 else
        "b" if 80<=score<90 else
        "a" if 90<=score<100 else
        "s" if score == 100 else
        "请输入正确的分数")
print(level)
b
```

- if嵌套
```python
if 条件:
    if 条件:
        代码块
    else:
        代码块
else:
    代码块
```
## 2. 循环语句
### 2.1 `while`循环语句
```python
love = "yes"
while love == "yes":
    love = input("今天？")

    
今天？yes ### 输入yes则进入循环
今天？yes
今天？yes
今天？no ### 输入非yes的内容则跳出循环
```

```python
i = 1
sum = 0
while i <= 1000000:
    sum += i
    i += 1

    
print(sum)
### 500000500000
```

- `break`跳出循环语句，跳出循环本体
```python
while True:
    answer = input("可以退出循环吗？")
    if answer == "可以！":
        break

    
可以退出循环吗？bu
可以退出循环吗？1
可以退出循环吗？2
可以退出循环吗？可以
可以退出循环吗？可以！
```

- `continue`跳出循环语句，跳出循环体中的当前循环，继续下一次循环
```python
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue
    print(i)

    
1
3
5
7
9
```

- `else`语句
  - 当循环正常结束时，执行`else`语句中的代码
  - 当循环被`break`语句跳出时，不执行`else`语句中的代码
```python
### 没有break语句时，执行else语句
i = 1
while i < 5:
    print("循环内，i的值是：",i)
    i += 1
else:
    print("循环外，i的值是：",i)

    
循环内，i的值是： 1
循环内，i的值是： 2
循环内，i的值是： 3
循环内，i的值是： 4
循环外，i的值是： 5
```

```python
i = 1
while i < 5:
    print("循环内，i的值是：",i)
    if i == 2:
        break
    i += 1
else:
    print("循环外，i的值是：",i)

    
循环内，i的值是： 1
循环内，i的值是： 2
```

### 2.2 `while`循环的嵌套
```python
i = 1
while i <= 9:
    j = 1
    while j <= i:
        print(j,"*",i,"=",j*i,end=" ") ### end=" "表示不换行，而是加一个空格
        j += 1
    print()
    i += 1

    
1 * 1 = 1 
1 * 2 = 2 2 * 2 = 4 
1 * 3 = 3 2 * 3 = 6 3 * 3 = 9 
1 * 4 = 4 2 * 4 = 8 3 * 4 = 12 4 * 4 = 16 
1 * 5 = 5 2 * 5 = 10 3 * 5 = 15 4 * 5 = 20 5 * 5 = 25 
1 * 6 = 6 2 * 6 = 12 3 * 6 = 18 4 * 6 = 24 5 * 6 = 30 6 * 6 = 36 
1 * 7 = 7 2 * 7 = 14 3 * 7 = 21 4 * 7 = 28 5 * 7 = 35 6 * 7 = 42 7 * 7 = 49 
1 * 8 = 8 2 * 8 = 16 3 * 8 = 24 4 * 8 = 32 5 * 8 = 40 6 * 8 = 48 7 * 8 = 56 8 * 8 = 64 
1 * 9 = 9 2 * 9 = 18 3 * 9 = 27 4 * 9 = 36 5 * 9 = 45 6 * 9 = 54 7 * 9 = 63 8 * 9 = 72 9 * 9 = 81 
```

### 2.3 `for`循环语句
```python
for 变量 in 序列:
    代码块
```
```python
for i in range(10):   ###range()函数生成一个序列，序列的元素是从0开始，到10结束，不包含10
    print(i)          ###range(start,end,step)可以接收三个参数，start表示开始，end表示结束，step表示步长，默认是1，区间左闭右开
0
1
2
3
4
5
6
7
8
9
```

```python
sum  = 0
for i in range(1000001):
    sum += i

    
print(sum)
500000500000
```

- `for`循环的嵌套
```python
for n in range(2,10):
    for x in range(2,n):
        if n % x == 0:
            print(n,"=",x,"*",n // x) ### 用//而不用/，是为了避免出现2.0,3.0这样的情况
            break
    else:
        print(n,"是一个质数")

        
2 是一个质数
3 是一个质数
4 = 2 * 2
5 是一个质数
6 = 2 * 3
7 是一个质数
8 = 2 * 4
9 = 3 * 3
```


