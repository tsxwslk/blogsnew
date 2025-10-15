---
title: python的模块和包
author: 怡然
createTime: 2025/10/15 15:52:41
permalink: /python/a23drczw/
---

## 1. 模块
- 模块是指一个包含python代码的文件，文件的扩展名为`.py`。
- 模块可以包含函数、类、变量等python代码。
- 模块可以被其他python程序导入使用。
- 引入方式：
```python
import 模块名
import 模块名 as 关联名称
from 模块名 import 对象名称
```
- 示例：
```python
# 模块1：hello.py
def hello():
    print('hello world')
```
```python
# 模块2：main.py
import hello
hello.hello() # hello world
```

## 2. 包
- 包是指一个包含多个模块的目录，目录的名称就是包的名称。
- 包可以包含子包，子包的名称就是子目录的名称。
- 包可以被其他python程序导入使用。
- 引入方式：
```python
import 包名
import 包名.模块名
from 包名 import 模块名
from 包名.模块名 import 对象名称
```
- 示例：
```python
# 包1：mypackage
# 目录结构：
# mypackage/
#     __init__.py
#     module1.py
#     module2.py
```
```python
# 模块3：main.py
import mypackage.module1
mypackage.module1.hello() # hello world
```

- 对于模块来说，如果没有定义__all__属性，那么from 包名 import * 语句将导入模块中的所有东西；
- 对于包来说，如果没有定义__all__属性，那么from 包名 import * 语句则不导入包里面的任何模块。
