---
title: python的函数
author: 怡然
createTime: 2025/10/13 11:48:53
permalink: /python/ylr43bhs/
---

## 1. 定义函数
```python
def 函数名(参数1,参数2,参数3,...):
    代码块
    return 返回值

# eg:
def myfun():
    pass # 空语句，什么都不做，通常用来占位

def myfun1(name):
    print(f"你好，{name}")

myfun1("怡然") # 你好，怡然

def myfun2(x, y):
    z = x / y
    return z

myfun2(10, 2) # 5.0



def div(x,y):
    if y == 0:
        return "除数不能为0"
    else:
        return x/y

    
div(4,0)
# '除数不能为0'
div(10,2)
# 5.0
```

## 2. 函数的参数
- 形参，实参
- 位置参数：调用函数时，实参的顺序和形参的顺序是一致的
- 关键字参数：调用函数时，实参的顺序和形参的顺序可以不一致，但是需要用参数名=参数值的形式来指定
- 位置参数必须在关键字参数之前
- 默认参数：在定义函数时，给参数一个默认值，调用函数时如果没有传递参数，就使用默认值
- “/”限制左侧只能使用位置参数
- “*”限制左侧既可以是位置参数，也可以是关键字参数，但是右侧只能是关键字参数
- 收集参数：在定义函数时，使用“*”来收集参数，收集的参数会被存储在一个元组中
```python
def myfun(*args):
    print("有{}个参数".format(len(args)))
    print("第2个参数是：{}".format(args[1]))

myfun("i","love","you")
# 有3个参数
# 第2个参数是：love

def myfun1(a,*b,**c):
    print(a,b,c)

myfun1(1,2,3,4,x=5,y=6)
# 1 (2, 3, 4) {'x': 5, 'y': 6}
```

```python
args=(1,2,3,4)
def myfun(a,b,c,d):
    print(a,b,c,d)

myfun(*args) # 1 2 3 4 使用*对元组解包

keywords={'a':1,'b':2,'c':3,'d':4}
def myfun(a,b,c,d):
    print(a,b,c,d)

myfun(**keywords) # 1 2 3 4 使用**对字典解包
```

## 3. 函数的作用域
- 局部变量：在函数内部定义的变量，只能在函数内部使用
- 全局变量：在函数外部定义的变量，在函数内部也可以使用，但是不能赋值，一旦进行赋值，会创建一个新的局部变量，而不是修改全局变量
- 如果想用全局变量，需用global关键字来声明
```python
x = 880
def myfun():
    global x
    x = 520
    print(x)
    
myfun()
# 520
print(x)
# 520
```

- 函数的嵌套
```python
def outer():
    x = 10
    def inner():
        x = 20
        print(x)
    inner()
    print(x)

outer()
# 20
# 10
```

- `nonlocal`语句，可以实现僭越作用域
```python
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
        print(x)
    inner()
    print(x)

outer()
# 20
# 20
```

- LEGB规则
- L：Local，局部作用域
- E：Enclosing，嵌套作用域
- G：Global，全局作用域
- B：Built-in，内建作用域
- Python解释器会按照LEGB的顺序查找变量，即先查找局部作用域，然后查找嵌套作用域，再查找全局作用域，最后查找内建作用域