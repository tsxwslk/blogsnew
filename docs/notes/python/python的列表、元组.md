---
title: python的列表、元组
author: 怡然
createTime: 2025/09/16 16:04:59
permalink: /python/hwyhshjc/
---

## 1. 列表
```python
[1, 2, 3, 4, 5]
['a', 'b', 'c', 'd', 'e']
rhyme = [1, 2.5, 'hello', True]
print(rhyme)

### 序列
for each in rhyme:
    print(each)
1
2.5
hello
True

### 索引
rhyme[0] 

### 长度
length = len(rhyme)

### 切片
rhyme[0:2] ### 切片的范围是左闭右开
[1, 2.5]
rhyme[:2] ###表示从头开始到索引为2的元素，不包含索引为2的元素
rhyme[3:] ###表示从索引为3的元素开始到最后一个元素
rhyme[:] ###表示从第一个元素到最后一个元素
rhyme[0:6:2] ### 表示从索引为0的元素开始，到索引为6的元素结束，步长为2   [1, 3]
```

### 1.1 列表的增
- append() 方法：在列表的末尾添加一个元素
- insert() 方法：在列表的指定位置插入一个元素
- extend() 方法：在列表的末尾添加多个元素
```python
rhyme.append('world')
rhyme.insert(2, 'python')
rhyme.extend(['a', 'b', 'c'])
rhyme[len(rhyme):] = [6,7,8,9] ### 在列表的末尾添加多个元素
print(rhyme)
```

### 1.2 列表的删
- remove() 方法：删除列表中第一个匹配的元素
- pop() 方法：删除列表中指定位置的元素，默认删除最后一个元素
- clear() 方法：清空列表中的所有元素

### 1.3 列表的改和查
- 通过索引直接修改列表中的元素
- 切片赋值：可以使用切片的方式来修改列表中的多个元素
- 排序：sort() 方法可以对列表进行排序，默认是升序排序。如果要降序排序，可以使用 sort(reverse=True)。
- 反转：reverse() 方法可以将列表中的元素反转。
- count() 方法：返回列表中指定元素的出现次数
- index() 方法：返回列表中第一个匹配的元素的索引。如果元素不存在，会抛出 ValueError 异常。如果传入参数 start 和 end，则表示在指定的范围内查找元素的索引。
- copy() 方法：返回列表的一个浅拷贝
```python
nums=[1,2,3,4,5]
nums[0] = 10
nums[1:3] = [20,30]
nums.sort() ### 升序排序
nums.sort(reverse=True) ### 降序排序
nums.reverse() ### 反转
count = nums.count(10)
index = nums.index(30)
nums_copy = nums.copy()
print(nums)
```

### 1.4 列表的加法和乘法
```python
### 列表的加法
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = list1 + list2
print(list3) ### [1, 2, 3, 4, 5, 6]

### 列表的乘法
list4 = [1, 2, 3]
list5 = list4 * 3
print(list5) ### [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

### 1.5 嵌套列表
```python
### 嵌套列表
list6 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(list6)
```
- 访问嵌套列表
```python
list6 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for i in list6:
    for j in i:
        print(j)    
### 1 2 3 4 5 6 7 8 9每个打印一行
```

```python
A=[0]*3
for i in range(len(A)):
    A[i]=[0]*3
```
- is 运算符：用于判断两个列表是否引用同一个对象
```python
x = 'love'
y = 'love'
print(x is y) ### True
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 is list2) ### False
```

```python
B = [[0]*3]*3 ### 所以不可以使用这种方法创建嵌套列表
B[0] is B[1] ### True 说明引用同一个地址
B[0][0] = 1
print(B) ### [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
```