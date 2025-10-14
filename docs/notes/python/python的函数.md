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

## 4. 闭包
- 闭包是指一个函数内部定义的函数，并且内部函数可以访问外部函数的变量
- 闭包的作用是可以将外部函数的变量保存起来，供内部函数使用
- 闭包的实现是通过返回内部函数来实现的
```python
def outer():
    x = 0
    y = 0
    def inner(x1,y1):
        nonlocal x,y
        x += x1
        y += y1
        print(f"现在，x={x},y={y}")
    return inner

move = outer()
move(1,2)
# 现在，x=1,y=2
move(-2,2)
# 现在，x=-1,y=4
# 上述的例子中，move函数就是一个闭包，它可以访问outer函数中的x和y变量，并且在调用时，x,y的值会被保存起来
```

## 5. 装饰器
- 装饰器是指一个函数，它可以用来修饰其他函数，从而改变它们的行为
- 装饰器的实现是通过返回一个新的函数来实现的
```python
import time
def time_master(func):
    def call_func():
        print("开始运行程序")
        start = time.time()
        func()
        end = time.time()
        print("程序运行结束")
        print(f"程序运行时间为：{(end-start):.2f}秒.")
    return call_func

@time_master
def myfun():
    time.sleep(2)
    print("hello world")

myfun()  # 这里调用myfun函数，并不是直接调用，而是通过装饰器time_master来修饰，将myfun函数作为参数传递给time_master函数，然后返回一个新的函数call_func，调用call_func函数就相当于调用myfun函数

# 开始运行程序
# hello world
# 程序运行结束
# 程序运行时间为：2.01秒.
```

- 如果有多个装饰器，则从下向上调用，如：
```python
def add(func):
    def inner():
        x = func()
        return x + 1
    return inner

def cube(func):
    def inner():
        x  = func()
        return x**3
    return inner

def square(func):
    def inner():
        x = func()
        return x**2
    return inner

@add
@cube
@square
def myfun():
    return 2

print(myfun())
# 65
```

- 装饰器传参
```python
import time

def logger(msg):
    def time_master(func):
        def call_func():
            start = time.time()
            func()
            end = time.time()
            print(f"程序运行时间为：{(end-start):.2f}秒.")
        return call_func
    return time_master

@logger(msg = "A")
def funA():
    time.sleep(2)
    print("正在调用funA")

@logger(msg = "B")
def funB():
    time.sleep(2)
    print("正在调用funB")

funA()
# 正在调用funA
# 程序运行时间为：2.07秒.

funB()
# 正在调用funB
# 程序运行时间为：2.04秒.
```

## 6. 匿名函数lambda
- 匿名函数是指没有名称的函数，它通常用于简单的函数，例如对列表进行排序、过滤等操作
- 匿名函数的实现是通过lambda关键字来实现的
```python
# 表达式
# lambda 参数1,参数2,...: 表达式
# 示例
# lambda x,y: x+y
# 示例
# 对列表进行排序
my_list = [(1,2),(3,1),(2,4)]
my_list.sort(key=lambda x:x[1])
print(my_list)
# [(3, 1), (1, 2), (2, 4)]
```

## 7. 生成器
- 生成器是指一个函数，它可以用来生成一个序列，而不是一次性生成所有的元素，可以使用next函数来获取下一个元素，不走回头路
- 生成器的实现是通过yield关键字来实现的
```python
# 示例
def mygen():
    for i in range(5):
        yield i

gen = mygen()
print(gen)
# <generator object mygen at 0x0000023A8B3B3F20>

for i in gen:
    print(i)
# 0
# 1
# 2
# 3
# 4
```

- 生成器的应用：斐波那契数列
```python
def fib():
    back1,back2 = 0,1
    while True:
        yield back1
        back1,back2 = back2,back1+back2

f= fib()
next(f)
# 0     
next(f)
# 1     
next(f)
# 1     
next(f)
# 2     
next(f)
# 3     
next(f)
# 5     
next(f)
# 8     
```

## 8. 递归
- 递归是指一个函数调用自身的过程
- 递归的实现是通过在函数中调用自身来实现的
- 递归的应用：计算阶乘
```python
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))
# 120
```
- 斐波那契数列(效率低，因为每次调用都要递归调用两次，时间复杂度为O(2^n))
```python
def fib(n):
    if n==1 or n==2:
        return 1
    else:
        return fib(n-1) + fib(n-2)

    
fib(12)
# 144
```

## 9. 汉诺塔
- 汉诺塔是指一个游戏，它有三根柱子，分别为A、B、C，游戏的目标是将A柱子上的所有圆盘移动到C柱子上，每次只能移动一个圆盘，并且大圆盘不能放在小圆盘上面
```python
def hanoi(n,x,y,z):
    if n==1:
        print(x,'-->',z)
    else:
        hanoi(n-1,x,y,z)
        print(x,'-->',z)
        hanoi(n-1,y,x,z)

        
n = int(input('输入汉诺塔的层数：'))
hanoi(n,'A','B','C')
```

## 10. 函数文档、类型注释、内省
- 函数文档：函数文档是指函数的说明文档，它通常包括函数的参数、返回值、异常等信息
```python
def myfun(x:int,y:str)->bool:
    """
    这是一个函数，它的参数是一个整数和一个字符串，返回值是一个布尔值
    """
    return True
```
- 类型注释：类型注释是指在函数定义时，使用冒号来指定参数和返回值的类型，例如：
```python
def myfun(x:int,y:str)->bool: # 类型是给人看的，不是给机器看的，即使定义了类型，传入了不同类型的参数，也不会报错
```
- 内省：内省是指在运行时，通过一些特殊的函数来获取对象的信息，例如：`type()`、`dir()`、`help()`、`__name__`、`__annotations__`等
