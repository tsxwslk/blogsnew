---
title: python的字符串、序列
author: 怡然
createTime: 2025/09/23 14:22:43
permalink: /python/b5mbpd3m/
---

## 1. 字符串
### 1.1 字符串字母大小写转换
- capitalize(),casefold(),title(),upper(),lower(),swapcase()
```python
### 字符串字母大小写转换
s = 'hello world'
s.capitalize() ### 首字母大写
'Hello world'
s.title() ### 每个单词的首字母大写
'Hello World' 
s.upper() ### 所有字母大写
'HELLO WORLD' 
s.lower() ### 所有字母小写
'hello world'
s.swapcase() ### 大小写反转
'HELLO WORLD'
### casefold()用于处理其他语言的字母大小写转换
```

### 1.2 字符串的左中右对齐方法
- ljust(),rjust(),center()
```python
### 字符串的左中右对齐方法
s = 'hello world'
s.ljust(20,'-') ### 左对齐，总宽度为20，不足用'-'填充
'hello world--------'
s.rjust(20,'-') ### 右对齐，总宽度为20，不足用'-'填充
'--------hello world'
s.center(20,'-') ### 居中对齐，总宽度为20，不足用'-'填充
'----hello world-----'
x = "520"
x.zfill(10) ### 总宽度为10，不足用'0'填充
'0000000520'
y = "-520"
y.zfill(10) ### 总宽度为10，不足用'0'填充
'-000000520'
```

### 1.3 字符串的查找
- find(),index(),rfind(),rindex(),count()
```python
### 字符串的查找
s = 'hello world'
s.find('l') ### 查找第一次出现的位置，返回索引值，未找到返回-1
2
s.index('l') ### 查找第一次出现的位置，返回索引值，未找到报错
2
s.rfind('l') ### 查找最后一次出现的位置，返回索引值，未找到返回-1
9
s.rindex('l') ### 查找最后一次出现的位置，返回索引值，未找到报错
9
s.count('l') ### 统计子字符串出现的次数
3
```

### 1.4 字符串的替换
- replace(),expandtabs(),translate()
```python
### 字符串的替换
s = 'hello world'
s.replace('l','L') ### 将所有的'l'替换为'L' 
'heLLo worLd'
s.expandtabs(4) ### 将字符串中的制表符('\t')替换为空格，默认空格数为8，参数为指定的空格数，如填4表示每个制表符占用4个空格
'hello world'
```

```python
table = str.maketrans("ABCDEFG","1234567")
"I love FishC".translate(table)
'I love 6ish3'
"I love FishC".translate(str.maketrans("ABCDEFG","1234567","love")) ### 第三个参数表示要忽略的字符
'I  6ish3'
```

### 1.5 字符串的判断方法
- isalnum(),isalpha(),isdigit(),isspace(),istitle(),isupper(),islower(),startswith(),endswith(),isascii(),isprintable(),isdecimal(),isnumeric(),isidentifier()
```python
### 字符串的判断方法
s = 'hello world'
s.isalnum() ### 字符串是否只包含字母和数字
False
s.isalpha() ### 字符串是否只包含字母,空格不是字母
False
s.isdigit() ### 字符串是否只包含数字
False
s.isspace() ### 字符串是否是空白字符串
False
s.istitle() ### 字符串是否每个单词的首字母大写
False
s.isupper() ### 字符串是否所有字母大写
False
s.islower() ### 字符串是否所有字母小写
True
s.startswith('h') ### 字符串是否以'h'开头，可传入参数表示起始位置，也可以传入元组表示多个匹配内容，下面endswith也一致
True
s.endswith('d') ### 字符串是否以'd'结尾
True
s.isupper() ### 字符串是否所有字母大写
False
"i love you\n".isprintable() ### 字符串是否所有字符都是可打印的
False

x = "12345"
x.isdecimal() ### 字符串是否只包含十进制数字
True
x.isnumeric() ### 字符串是否只包含数字，可以识别罗马数字、中文数字、数字表达式如2²等
True  
x.isdigit() ### 字符串是否只包含数字
True
x.isalnum() ### 字符串是否只包含字母和数字,isalpha(),isdecimal(),isnumeric(),isdigit()任意一个是True,则返回True
True

"I am a good man".isidentifier() ### 字符串是否是合法的标识符
False
"I_am_a_good_man".isidentifier()
True
"abc123".isidentifier() ### 字符串是否是合法的标识符
True
"123abc".isidentifier() ### 字符串是否是合法的标识符
False ### 标志符不能以数字开头
```

- 判断是否为保留标志符
```python
import keyword
keyword.iskeyword("if")
True
keyword.iskeyword("for")
True
```

### 1.6 字符串的截取
- strip(),lstrip(),rstrip(),removeprefix(),removesuffix()
```python
### 字符串的截取
s = '   hello world   '
s.strip() ### 去掉字符串首尾的空格
'hello world'
s.lstrip() ### 去掉字符串左边的空格
'hello world   '
s.rstrip() ### 去掉字符串右边的空格
'   hello world'

t = "www.iloveyou.com"
t.strip("wcom.") ### 去掉字符串首尾的字符，直到出现非指定字符为止
'iloveyou'
t.lstrip("wcom.") ### 去掉字符串左边的字符，直到出现非指定字符为止
'iloveyou.com'
t.rstrip("wcom.") ### 去掉字符串右边的字符，直到出现非指定字符为止
'www.iloveyou'

x = "hello world"
x.removeprefix('hello') ### 去掉字符串左边的'hello'
' world'
x.removesuffix('world') ### 去掉字符串右边的'world'
'hello '
```
 
### 1.7 字符串的拆分与拼接
- partition(),rpartition(),split(),rsplit(),splitlines()
```python
### 字符串的拆分与拼接
s = 'hello world'
s.partition('l') ### 从左往右拆分，返回元组，第一个元素为拆分前的字符串，第二个元素为拆分的字符，第三个元素为拆分后的字符串
('he', 'l', 'lo world')
s.rpartition('l') ### 从右往左拆分，返回元组，第一个元素为拆分前的字符串，第二个元素为拆分的字符，第三个元素为拆分后的字符串
('hello wo', 'l', 'd')
s.split('l') ### 从左往右拆分，返回列表，默认以空格为分隔符，可传入参数表示分隔符,还可以再传递一个参数表示分割几次
['he', '', 'o wor', 'd']
s.rsplit('l') ### 从右往左拆分，返回列表，默认以空格为分隔符，可传入参数表示分隔符,还可以再传递一个参数表示分割几次
['he', '', 'o wor', 'd']
"君不见\n黄河之水天上来\n奔流到海不复回".splitlines() ### 按行拆分，返回列表，默认以'\n'为分隔符
['君不见', '黄河之水天上来', '奔流到海不复回']
```

- join()
```python
### 字符串的拼接
s = ['www', 'iloveyou', 'com']
'.'.join(s) ### 用空格拼接列表中的元素,join拼接的速度大于+的拼接
'www.iloveyou.com'
```

### 1.8 字符串的格式化
```python
### 字符串的格式化  
name = "怡然"
age = 18
'我叫怡然,今年18岁' 
"我叫{},今年{}岁".format(name,age)
'我叫怡然,今年18岁'
"我叫{0},今年{1}岁".format(name,age) ### 用format格式化字符串，{0}表示第一个参数，{1}表示第二个参数，以此类推
'我叫怡然,今年18岁' 
```

```python 
"{:^10}".format(250) ### 居中对齐，宽度为10
'   250    '
"{1:>10}{0:<10}".format(520,250) ### 用format格式化字符串，{1}表示第二个参数，{0}表示第一个参数，>表示右对齐，<表示左对齐，^表示居中对齐，宽度为10
'       250520       '
"{:010}".format(250) ### 用0填充，宽度为10
'0000000250'  
"{:010}".format(-250) ### 用0填充，宽度为10
'-000000250'
```

```python
"{:+}{:-}".format(250,-250) ### 用format格式化字符串，{:+}表示如果是正数，前面加+号，如果是负数，前面加-号，{:-}表示如果是正数，前面加空格，如果是负数，前面加-号
'+250-250'
"{:,}".format(2500000000) ### 用format格式化字符串，{:,}表示用逗号分隔数字
'2,500,000,000'
"{:.2f}".format(3.1415926) ### 用format格式化字符串，{:.2f}表示保留2位小数
'3.14'
"{:.2g}".format(3.1415926) ### 用format格式化字符串，{:.2g}表示保留2位有效数字
'3.1'
"{:.6}".format("abcdefghigklmn") ### 用format格式化字符串，{:.6}表示保留6位字符
'abcdef'
"{:.2}".format(520) ### 不可以用于整数，会报错
```

```python
### 以下方法适用于浮点数或者复数
"{:b}".format(80) ### 用format格式化字符串，{:b}表示将数字转换为二进制数
'1010000'
"{:c}".format(80) ### 用format格式化字符串，{:c}表示将数字转换为对应的字符
'P'
"{:d}".format(80) ### 用format格式化字符串，{:d}表示将数字转换为十进制数
'80'  
"{:o}".format(80) ### 用format格式化字符串，{:o}表示将数字转换为八进制数
'120'
"{:x}".format(80) ### 用format格式化字符串，{:x}表示将数字转换为十六进制数
'50'
"{:#b}".format(80) ### 用format格式化字符串，{:#b}表示将数字转换为二进制数，前面加0b
'0b1010000'
"{:#o}".format(80) ### 用format格式化字符串，{:#o}表示将数字转换为八进制数，前面加0o
'0o120'
"{:#x}".format(80) ### 用format格式化字符串，{:#x}表示将数字转换为十六进制数，前面加0x
'0x50'
"{:e}".format(80) ### 用format格式化字符串，{:e}表示将数字转换为科学计数法
'8.000000e+01'
"{:E}".format(80) ### 用format格式化字符串，{:E}表示将数字转换为科学计数法，用大写E表示
'8.000000E+01'
"{:%}".format(0.98) ### 用format格式化字符串，{:%}表示将数字转换为百分数
'98.000000%'
"{:.2%}".format(0.98) ### 用format格式化字符串，{:.2%}表示将数字转换为百分数，保留2位小数
'98.00%'
```

- 总结：`"{:{fill}{align}{width}.{prec}{type}}".format(value,fill='0',align='>',width=10,prec=2,type='f')`

### 1.9 f-字符串
- f-字符串是**python3.6**及以上版本引入的一种字符串格式化方法，它的语法是在字符串前加上字母f或F，然后在字符串中使用大括号{}来表示要格式化的变量或表达式。
- f-字符串的优势是简单、易读、易写，同时也支持表达式、函数调用、格式化选项等。
- f-字符串的劣势是不支持旧版的python版本，也不支持格式化选项的详细配置。
```python
### f-字符串
name = "怡然"
age = 18
f"我叫{name},今年{age}岁" 

f"{-520:010}"
'-000000520'
```

## 2. 序列
- 序列是python中最基本的数据结构，它是一种有序的集合，每个元素都有一个唯一的索引，索引从0开始。
- 序列可以包含任意类型的元素，例如数字、字符串、列表、元组、字典等。
- 序列的主要操作包括索引、切片、连接、重复、长度、成员资格测试等。
- 根据是否可以修改，序列可以分为可变序列和不可变序列。
- 可变序列包括列表、字节数组、集合、字典等，它们的元素可以被修改、添加或删除。
- 不可变序列包括字符串、元组等，它们的元素不能被修改、添加或删除。

### 2.1 序列的运算符
- + ： 连接序列
- * ： 重复序列
- is ： 检查两个序列是否相等
- is not ： 检查两个序列是否不相等
- in ： 检查元素是否在序列中
- not in ： 检查元素是否不在序列中
- del ： 删除序列，也可以删除可变序列中的指定元素
- [] ： 索引
- [:] ： 切片

### 2.2 序列的函数
#### 2.2.1 列表、元组、字符串相互转换
- 列表：list()
```python
### 列表：list() 元组和字符串的用法相同
list("abc")
['a', 'b', 'c']
list((1,2,3))
[1, 2, 3]
```
- 元组：tuple()
- 字符串：str()

#### 2.2.2 min() max() 
- min()：返回序列中的最小值
- max()：返回序列中的最大值
```python
### min() max()
min([1,2,3])
1
max([1,2,3])
3
max("abc")
'c'
min('',default='a') ### default表示传入空值的时候返回的默认值
```

#### 2.2.3 len() sum()
- len()：返回序列的长度
- sum()：返回序列中所有元素的和
```python
### len() sum()
len([1,2,3])
3
sum([1,2,3])
6
sum([1,2,3],start=100)
106 ### start表示从start开始累加
```

#### 2.2.4 sorted() reversed()
- sorted()：返回一个新的列表，其中的元素是从原序列中排序后的元素，注意sort函数是在原序列上进行排序，会改变原列表
```python
### sorted()
sorted([1,0,2,3])
[0, 1, 2, 3]
sorted([1,2,3],reverse=True)
[3, 2, 1] ### reverse=True表示降序排序
s = ['fish','cat','dog','apple','book','banana']
sorted(s)
['apple', 'banana', 'book', 'cat', 'dog', 'fish']
sorted(s,key=len)
['cat', 'dog', 'book', 'fish', 'apple', 'banana'] ### key表示排序的依据，这里是按字符串长度排序
sorted('FishC')
['C', 'F', 'h', 'i', 's']
```
- reversed()：返回一个参数的反向迭代器
```python
### reversed()
s = [1,2,5,8,0]
reversed(s)
<list_reverseiterator object at 0x0000021040904D90
list(reversed(s))
[0, 8, 5, 2, 1]
```

#### 2.2.5 all() any()
- all()：如果序列中的所有元素都为True，则返回True，否则返回False
- any()：如果序列中至少有一个元素为True，则返回True，否则返回False
```python
### all() any()
all([1,2,3])
True
all([0,1,2])
False
any([0,0,0])
False
any([1,0,0])
True
```

#### 2.2.6 enumerate() zip()
- enumerate()：返回一个枚举对象，它包含了序列中的元素和它们的索引
```python
### enumerate()
s = ['a','b','c']
list(enumerate(s))
[(0, 'a'), (1, 'b'), (2, 'c')]

### 可以接受一个参数，表示从什么开始计数索引
x = ["spring","summer","fall","winter"]
list(enumerate(x,10))
[(10, 'spring'), (11, 'summer'), (12, 'fall'), (13, 'winter')]
```
- zip()：创建一个聚合多个可迭代对象的迭代器，他会将作为参数传入的每个可迭代对象的每个元素依次组合成元组，即第i个元组包含来自每个参数的第i个元素 
```python
### zip()
x = [1,2,3]
y = ['a','b','c']
list(zip(x,y))
[(1, 'a'), (2, 'b'), (3, 'c')]
```
- 注意zip方法按照最短的可迭代对象的长度来聚合元素，如果不想丢失较长的可迭代对象中的元素，可以使用itertools.zip_longest()方法
```python
### zip_longest()
import itertools
x = [1,2,3]
y = ['a','b','c','d','e']
list(zip_longest(x,y))
[(1, 'a'), (2, 'b'), (3, 'c'), (None, 'd'), (None, 'e')]
```

#### 2.2.7 map()
- map()：对序列中的每个元素应用一个函数，返回运算结果的可迭代器
```python
### map()
mapped = map(ord,"love") ### ord()函数返回字符的ascii码
list(mapped)
[108, 111, 118, 101]
```
```python
mapped = map(pow,[2,3,10],[5,2,3]) ### pow()函数返回第一个参数的第二个参数次幂，如果map内的函数需要两个参数，就传入两个序列
list(mapped)
[32, 9, 1000]
```

#### 2.2.8 filter()
- filter()：对序列中的每个元素应用一个函数，将运算结果为真的元素以迭代器的形式返回
```python
### filter()
def is_odd(x):
    return x%2==1
list(filter(is_odd,[1,2,3,4,5]))
[1, 3, 5]

list(filter(str.islower,"AbcvS"))
['b', 'c', 'v']
```

### 2.3 注意事项
- 可迭代对象可以重复使用，迭代器是一次性的
```python
mapped = map(ord,"love")
for each in mapped:
    print(each)
108
111
118
101
list(mapped)
[] ### 迭代器是一次性的，第一次使用后就会被消耗掉
```

- 将可迭代对象转换为迭代器，iter()
```python
### iter()
s = [1,2,3]
i = iter(s)
type(s)
<class 'list'>
type(i)
<class 'list_iterator'>
next(i,"没有了")
1
next(i,"没有了")
2
next(i,"没有了")
3
next(i,"没有了")
'没有了' ### 迭代器是一次性的，第一次使用后就会被消耗掉，第二个参数在迭代器没有元素时返回
```