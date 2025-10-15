---
title: python的类和对象
author: 怡然
createTime: 2025/10/15 09:33:59
permalink: /python/ypt7ne57/
---

## 1. 类和对象的定义
- 类是一种用户自定义的数据类型，它定义了一组属性和方法，用于描述具有相同特征和行为的对象。
- 类的定义如下：
```python
class 类名:
    类体
```
- 类名是一个标识符，用于引用该类，使用大写字母开头。
- 类体是一个代码块，用于定义类的属性和方法。
- 调用类创建一个实例对象。
- 语法如下：
```python
对象名 = 类名()
```
- 示例：
```python
class Turtle:
    head = 1
    eyes = 2
    legs = 4
    shell = True

    def crawl(self):     #self表示实例对象本身，必传
        print('I am crawling')
    
    def run(self):
        print('I am running')
    
    def bite(self):
        print('I am biting')

    def eat(self):
        print('I am eating')

    def sleep(self):
        print('I am sleeping')

t1 = Turtle() 
```  

- 继承
```python
class 子类名(父类名):
    子类体
```
- 示例：
```python
class A:
    x = 520
    def func(self):
        print('func1')

class B(A):
    def func(self):
        print('func2')
class C(A,B):
    pass

b = B()
b.x # 520
b.func() # func2
isinstance(b,B) # True
isinstance(b,A) # True

c = C()
c.x # 520
c.func() # func1  继承两个类时，就近原则，在A类中找到func方法，就不会在B类中查找，如果A中没有，才会在B类中查找
```

- 组合
```python 
class Turtle:
    def say(self):
        print('I am a turtle')

class Dog:
    def say(self):
        print('I am a dog')

class Cat:
    def say(self):
        print('I am a cat')

class Garden:
    t = Turtle()
    d = Dog()
    c = Cat()
    def say(self):
        self.t.say()
        self.d.say()
        self.c.say()

g = Garden()
g.say()
# I am a turtle
# I am a dog
# I am a cat
```

## 2. 构造函数
- 构造函数是一种特殊的方法，用于创建和初始化对象。
- 构造函数的名称是`__init__`，它在对象创建时自动调用。
- 构造函数可以接受参数，用于初始化对象的属性。
- 示例：
```python
class C:
    def __init__(self,x,y):
        self.x = x
        self.y = y
    def add(self):
        return self.x + self.y
    def mul(self):
        return self.x * self.y

c = C(3,4)
c.add() # 7
c.mul() # 12
c.__dict__ # {'x': 3, 'y': 4}

d = C(5,6)
d.add() # 11
d.mul() # 30
d.__dict__ # {'x': 5, 'y': 6}

class D(C):
    def __init__(self,x,y,z):
        C.__init__(self,x,y)
        self.z = z
    def add(self):
        return C.add(self) + self.z
    def mul(self):
        return C.mul(self) * self.z

e = D(3,4,5)
e.add() # 12
e.mul() # 60
e.__dict__ # {'x': 3, 'y': 4, 'z': 5}
```

- 为了避免在继承中多次调用父类的构造函数，子类可以使用`super()`函数来调用父类的构造函数。
```python 
class A:
    def __init__(self):
        print('helloA')

class B1(A):
    def __init__(self):
        super().__init__()
        print('helloB1')

class B2(A):
    def __init__(self):
        super().__init__()
        print('helloB2')

class C(B1,B2):
    def __init__(self):
        super().__init__()
        print('helloC')

c = C()  # 如果没有使用super().__init__()，则会调用A类的构造函数两次
# helloA
# helloB2
# helloB1
# helloC
```

## 3. 私有变量
- 私有变量是指只能在类的内部访问的变量，不能在类的外部访问。
- 私有变量的名称以双下划线开头，例如`__x`。
- 示例：
```python
class C:
    def __init__(self,x):
        self.__x = x
    def set_x(self,x):
        self.__x = x
    def get_x(self):
        print(self.__x)

c.C(520)
c.get_x() # 520
c.set_x(1314)
c.get_x() # 1314
```

