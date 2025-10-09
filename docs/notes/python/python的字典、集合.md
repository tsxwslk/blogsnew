---
title: python的字典、集合
author: 怡然
createTime: 2025/09/24 16:00:56
permalink: /python/0bfo3p4n/
---

## 1. 字典
- python唯一表示映射关系的对象
### 1.1 字典的增
```python
# 定义字典
dict1 = {'a': 1, 'b': 2, 'c': 3}

# 访问字典元素
print(dict1['a'])  # 输出: 1

# 用函数创建字典
dict2 = dict(a=1, b=2, c=3)
print(dict2)  # 输出: {'a': 1, 'b': 2, 'c': 3}  

# 用dict函数和元组创建字典
dict3 = dict([('a', 1), ('b', 2), ('c', 3)])
print(dict3)  # 输出: {'a': 1, 'b': 2, 'c': 3}  
``` 

### 1.2 字典的删
```python 
# 定义字典
dict1 = {'a': 1, 'b': 2, 'c': 3}

dict1.pop('a') # 返回a的值
print(dict1)  # 输出: {'b': 2, 'c': 3}   

dict1.pop('h',"没有这个键") # 没有这个键时返回默认值"没有这个键"

# dict1.popitem() # 返回并删除最后一个键值对，注意3.7之前是随机删除一个键值对，3.7之后字典有顺序，所以删除最后一个键值对
# print(dict1)  # 输出: {'b': 2}   

del dict1['b'] # 删除键为'b'的键值对
print(dict1)  # 输出: {'c': 3}   

dict1.clear() # 清空字典
print(dict1)  # 输出: {}
``` 

### 1.3 字典的改
```python
d = dict.formkeys("liuyiran",520)
print(d) # {'l': 520, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520}
d["l"] = 1314
print(d) # {'l': 1314, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520}
d.update({"i":1314,"u":1314,"y":1314})
print(d) # {'l': 1314, 'i': 1314, 'u': 1314, 'y': 1314, 'r': 520, 'a': 520, 'n': 520}
```

### 1.4 字典的查
```python
d = dict.formkeys("liuyiran",520)
print(d) # {'l': 520, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520}
print(d["l"]) # 520
print(d.get("i")) # 520
print(d.get("h","没有这个键")) # 没有这个键

# setdefault()方法如果键不存在，则添加键值对，否则不改变原有的键值对
d.setdefault("l",1314)
print(d) # {'l': 520, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520}
d.setdefault("h",1314)
print(d) # {'l': 520, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520, 'h': 1314}

# keys()方法返回字典所有的键，values()方法返回字典所有的值，items()方法返回字典所有的键值对，keys、values、items是字典的视图对象，不是列表，所以不能对其进行增删改操作，只能查
keys = d.keys()
print(keys) # dict_keys(['l', 'i', 'u', 'y', 'r', 'a', 'n', 'h'])
values = d.values()
print(values) # dict_values([520, 520, 520, 520, 520, 520, 520, 1314])
items = d.items() 
print(items) # dict_items([('l', 520), ('i', 520), ('u', 520), ('y', 520), ('r', 520), ('a', 520), ('n', 520), ('h', 1314)])

# 拷贝
d_copy = d.copy() # 浅拷贝
print(d_copy) # {'l': 520, 'i': 520, 'u': 520, 'y': 520, 'r': 520, 'a': 520, 'n': 520, 'h': 1314}



# len()方法返回字典的键值对数量
print(len(d)) # 8 
# in和not in判断键是否在字典中
print("l" in d) # True
print("h" not in d) # False
list(d) # ['l', 'i', 'u', 'y', 'r', 'a', 'n', 'h']

# iter
e = iter(d)
print(e) # <dict_keyiterator object at 0x0000023D0B3D0D00>
next(e) # 'l'
next(e) # 'i'
next(e) # 'u'
# ……

# reversed 方法返回一个反转的迭代器
print(reversed(d)) # <dict_keyiterator object at 0x0000023D0B3D0D00>
next(reversed(d)) # 'h'
next(reversed(d)) # 'n'
next(reversed(d)) # 'a'
# ……
```

### 1.5 字典的嵌套
```python
d={"张三":{"年龄":18,"性别":"男"},"李四":{"年龄":19,"性别":"女"},"王五":{"年龄":20,"性别":"男"}}
print(d["张三"]["年龄"]) # 18
```

### 1.6 字典推导式
```python
# 生成一个字典，键为1-5的数字，值为键的平方
d = {i:i**2 for i in range(1,6)}
print(d) # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25} 
```

## 2. 集合
- 集合是一种无序的、不重复的元素集合
### 2.1创建集合
```python
s = {"one","two","three","four","five","six"}

{s for s in "liuyiran"}
{"l","i","u","y","r","a","n"} # 会直接去重

a = set("liuyiran")
a[0] # 报错，集合是无序的，不能用索引访问
"l" in a # True
"z" in a # False
for each in a:
    print(each) 
# l
# i
# u
# y
# r
# a
# n

# 判断列表中是否有重复元素
b = [1,1,1,2,3,4]
print(len(b) == len(set(b))) # False
```
