---
title: SQL基础
author: 怡然
createTime: 2025/10/17 13:55:19
permalink: /sql/2rg0g2hl/
---

## 1. 基础查询语句
### 1.1 简单查询
```sql
SELECT column1, column2, ... FROM table_name;


# 查全部字段
SELECT * FROM table_name;
```

### 1.2 查询字段重命名，AS 关键字
```sql
# 查指定字段并且起别名
SELECT column1 AS alias1, column2 AS alias2, ... FROM table_name;
SELECT `dateTime` AS 日期 FROM `销售表`
```

### 1.3 去重查询，DISTINCT 关键字
```sql
# 查指定字段并且去重
SELECT DISTINCT column1, column2, ... FROM table_name;
SELECT DISTINCT `商品编码` FROM `销售表`
```

### 1.4 字段连接`CONCAT`函数
```sql
# 查指定字段并且连接
SELECT CONCAT(column1, column2, ...) FROM table_name;
SELECT CONCAT(`店号`, `店名`) AS `店铺名称` FROM `店铺表`
```

### 1.5 字段中的null值处理
```sql
# 查指定字段并且处理null值
SELECT IFNULL(column1, 'default_value') FROM table_name;
SELECT IFNULL(`销售数量`, 0) AS `新销量` FROM `销售表`
```

### 1.6 条件查询
|条件运算|说明|逻辑运算|说明|模糊查询|说明|
|:--:|:--:|:--:|:--:|:--:|:--:|
|`=`|等于|`&&`|与|`LIKE`|通配搜索|
|`<>`|不等于| `\|\|` |或|`between`|范围查询|
|`<=>`|安全等于| | | | |
|`!=`|不等于|`\|`|非|`in`|指定条件范围|
|`<`|小于|`and` |与 |`is null` |为`null`值|
|`<=`|小于等于|`or` |或 |||
|`>`|大于|`not`|非| | |
|`>=`|大于等于| | | | |

- 示例
```sql
# 查指定字段并且满足条件
SELECT column1, column2, ... FROM table_name WHERE condition AND condition2;
SELECT * FROM `销售表` WHERE `销售数量` >= 150 and `销售数量` <= 250 
```

#### 1.6.1 通配搜索
```sql
# 查指定字段并且满足通配搜索条件
SELECT column1, column2, ... FROM table_name WHERE column LIKE 'pattern';
SELECT * FROM `销售表` WHERE `商品编码` LIKE '%a%'
```
- 如果指定查询第几个字符，使用`_`，例如查询第2个字符为`a`第五个字符为`b`的商品编码
```sql
SELECT * FROM `销售表` WHERE `商品编码` LIKE '_a__b%'
```

#### 1.6.2 范围查询
```sql
# 查指定字段并且满足范围查询条件,包含边界值
SELECT column1, column2, ... FROM table_name WHERE column BETWEEN value1 AND value2;
SELECT * FROM `销售表` WHERE `销售数量` BETWEEN 150 AND 250 
```

- `NOT`可以用来对`between and`的范围进行取反
```sql
# 查指定字段并且满足范围查询条件,不包含边界值
SELECT column1, column2, ... FROM table_name WHERE column NOT BETWEEN value1 AND value2;
SELECT * FROM `销售表` WHERE `销售数量` NOT BETWEEN 150 AND 250 
```

#### 1.6.3 指定条件范围
```sql
# 查指定字段并且满足指定条件范围
SELECT column1, column2, ... FROM table_name WHERE column IN (value1, value2, ...);
SELECT * FROM `销售表` WHERE `商品编码` IN ('a123', 'b456', 'c789')
```

#### 1.6.4 is null
```sql
# 查指定字段并且满足为null值条件
SELECT column1, column2, ... FROM table_name WHERE column IS NULL;
SELECT * FROM `销售表` WHERE `销售数量` IS NULL
# 此处也可以使用<=>运算符来判断空值
SELECT * FROM `销售表` WHERE `销售数量` <=> NULL
```

## 2. 排序查询
### 2.1 升序
```sql
# 查指定字段并且升序排序,默认是升序排序,可以省略ASC
SELECT column1, column2, ... FROM table_name ORDER BY column1 ASC, column2 ASC, ...;
SELECT * FROM `销售表` ORDER BY `销售数量` ASC
```

### 2.2 降序
```sql
# 查指定字段并且降序排序
SELECT column1, column2, ... FROM table_name ORDER BY column1 DESC, column2 DESC, ...;
SELECT * FROM `销售表` ORDER BY `销售数量` DESC
```

- 注意，同时使用order by和where子句时，order by子句必须在where子句之后

### 2.3 排序优先级
- 可以在order by子句中指定多个排序字段，每个字段之间用逗号隔开
- 每个字段可以指定升序排序（ASC）或降序排序（DESC）
- 可以在order by子句中使用别名来排序
```sql
# 查指定字段并且根据别名排序
SELECT column1 AS alias1, column2 AS alias2, ... FROM table_name ORDER BY alias1, alias2, ...;
SELECT `商品编码` AS 编码, `销售数量` AS 数量 FROM `销售表` ORDER BY 数量 DESC, 编码 ASC
```

### 2.4 按长度排序
```sql
# 查指定字段并且根据长度排序
SELECT column1, column2, ... FROM table_name ORDER BY LENGTH(column1) ASC, LENGTH(column2) ASC, ...;
SELECT * FROM 商品表 ORDER BY LENGTH(商品名称) DESC
```

### 2.5 中文列排序`INSTR`
```sql
# 查指定字段并且根据中文列排序
SELECT column1 FROM table_name ORDER BY INSTR('中文序列', column1)
SELECT * FROM 商品表 ORDER BY INSTR('一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月', 月份) ASC
```

### 2.6 按列的位置排序
```sql
# 查指定字段并且根据列的位置排序
SELECT column1,column2,column3,... FROM table_name ORDER BY columnIndex,columnIndex
SELECT 商品名称,进价,售价 FROM 商品表 ORDER BY 2,3 # 先按进价排序,再按售价排序
```

## 3. SQL函数
### 3.1 常用文本函数
#### 3.1.1 返回字符串左边的字符`left`
```sql
# 查指定字段并且返回字符串左边的字符
SELECT LEFT(column, length) FROM table_name;
SELECT LEFT(`商品名称`, 3) AS `商品名称前3个字符` FROM `商品表`
```
- 同理，`right`函数返回字符串右边的字符

#### 3.1.2 返回字符串长度`length`
```sql
# 查指定字段并且返回字符串长度 utf8英文字符1个字节，中文字符3个字节；GBK中文字符2个字节
SELECT LENGTH(column) FROM table_name;
SELECT LENGTH(`商品名称`) AS `商品名称长度` FROM `商品表`
```

#### 3.1.3 字符串连接`CONCAT`
```sql
# 查指定字段并且连接字符串
SELECT CONCAT(column1, column2, ...) FROM table_name;
SELECT CONCAT(`商品名称`, `商品编码`) AS `商品名称编码` FROM `商品表`
```

#### 3.1.4 大小写转换`UPPER`和`LOWER`
```sql
# 查指定字段并且转换为大写或小写
SELECT UPPER(column) FROM table_name;
SELECT LOWER(column) FROM table_name;
SELECT UPPER(`商品名称`) AS `商品名称大写` FROM `商品表`
SELECT LOWER(`商品名称`) AS `商品名称小写` FROM `商品表`
```

#### 3.1.5 去掉空格
- `TRIM`函数去掉字符串两端的空格
- `LTRIM`函数去掉字符串左边的空格
- `RTRIM`函数去掉字符串右边的空格
```SQL
# 查指定字段并且去掉字符串两端的空格
SELECT TRIM(column) FROM table_name;
SELECT TRIM(`商品名称`) AS `商品名称去掉空格` FROM `商品表`
```

#### 3.1.6 截取字符`substr`
```sql
# 查指定字段并且截取字符串，没有第二个参数指从截取位置到结束
SELECT SUBSTR(column, start, length) FROM table_name;
SELECT SUBSTR(`商品名称`, 2, 3) AS `商品名称第2个字符开始截取3个字符` FROM `商品表`
```

#### 3.1.7 返回字符串第一次出现的位置`INSTR`
```sql
# 查指定字段并且返回字符串第一次出现的位置
SELECT INSTR(column, substring) FROM table_name;
SELECT INSTR(`商品名称`, '货') AS `商品名称货字第一次出现的位置` FROM `商品表`
```

#### 3.1.8 左填充和右填充`LPAD`和`RPAD`
```sql
# 查指定字段并且左填充或右填充字符串，注意length是总长度，不是填充的个数
SELECT LPAD(column, length, pad_string) FROM table_name;
SELECT RPAD(column, length, pad_string) FROM table_name;
SELECT LPAD(`商品名称`, 10, '*') AS `商品名称左填充*` FROM `商品表`
SELECT RPAD(`商品名称`, 10, '*') AS `商品名称右填充*` FROM `商品表`
```

#### 3.1.9 替换字符串`REPLACE`
```sql
# 查指定字段并且替换字符串
SELECT REPLACE(column, old_substring, new_substring) FROM table_name;
SELECT REPLACE(`商品名称`, '货', '货号') AS `商品名称货字替换为货号` FROM `商品表`
```

### 3.2 数学函数
#### 3.2.1 四舍五入`ROUND`
```sql
# 查指定字段并且四舍五入，第二个参数表示保留的小数位数
SELECT ROUND(column, decimal_places) FROM table_name;
SELECT ROUND(`售价`, 2) AS `售价保留2位小数` FROM `商品表`
```

#### 3.2.2 取整
- 向上取整`ceil`
```sql
# 查指定字段并且取整
SELECT CEIL(column) FROM table_name;
SELECT CEIL(`售价`) AS `售价取整保留2位小数` FROM `商品表`
```

- 向下取整`floor`
```sql
# 查指定字段并且取整
SELECT FLOOR(column) FROM table_name;
SELECT FLOOR(`售价`) AS `售价取整保留2位小数` FROM `商品表`
```

#### 3.2.3 截断`TRUNCATE`
```sql
# 截取小数点后几位，第二个参数表示保留的小数位数
SELECT TRUNCATE(column, decimal_places) FROM table_name;
SELECT TRUNCATE(`售价`, 2) AS `售价截断保留2位小数` FROM `商品表`
```

#### 3.2.4 取余`MOD`
```sql
# 查指定字段并且取余，第一个参数表示被除数，第二个参数表示除数
SELECT MOD(column, divisor) FROM table_name;
SELECT MOD(`售价`, 2) AS `售价取余2` FROM `商品表`
```

### 3.3 日期函数
#### 3.3.1 返回当前系统日期
- 日期和时间
```sql
# 查当前系统日期 格式为`YYYY-MM-DD HH:MM:SS`
SELECT NOW() FROM table_name;
SELECT NOW() AS `当前系统日期` FROM `商品表` 
```
- 日期
```sql
# 查当前系统日期 格式为`YYYY-MM-DD`
SELECT CURDATE() FROM table_name;
SELECT CURDATE() AS `当前系统日期` FROM `商品表` 
```
- 时间
```sql
# 查当前系统时间 格式为`HH:MM:SS`
SELECT CURTIME() FROM table_name;
SELECT CURTIME() AS `当前系统时间` FROM `商品表` 
```

#### 3.3.2 返回年月日
```sql
# 查当前系统日期 格式为`YYYY-MM-DD`
SELECT YEAR(NOW()) FROM table_name;
SELECT YEAR(日期) AS `当前系统日期年` FROM `销售表` 
```
- 月
```sql
# 查当前系统日期 格式为`YYYY-MM-DD`
SELECT MONTH(NOW()) FROM table_name;
SELECT MONTH(日期) AS `当前系统日期月` FROM `销售表` 
```
- 月份的英文
- 日
```sql  
# 查当前系统日期 格式为`YYYY-MM-DD`
SELECT DAY(NOW()) FROM table_name;
SELECT DAY(日期) AS `当前系统日期日` FROM `销售表` 
```
- 小时hour，分钟minute，秒second

#### 3.3.3 转换指定日期格式
- `str_to_date`
```sql
# 查指定格式的日期并且转换为日期类型 第二个参数和第一个参数的格式要对应
SELECT STR_TO_DATE('2025-10-14', '%Y-%m-%d') FROM table_name;
SELECT STR_TO_DATE('3-20-2015', '%m-%d-%Y') AS `转换日期` FROM `销售表`  
# 转换后为 2015-03-20
```

- `date_format`
```sql
# 查指定日期并且转换为指定格式的字符串 第二个参数为日期格式
SELECT DATE_FORMAT('2025/10/14', '%Y-%m-%d') FROM table_name;
SELECT DATE_FORMAT('2025/10/14', '%Y年%m月%d日') AS `转换日期` FROM `销售表`  
# 转换后为 2025年10月14日
```
#### 3.3.4 格式符
|格式符|说明|示例|
|--|--|--|
|%Y|四位数的年份|2025|
|%y|两位数的年份|25|
|%m|月份，01-12|10|
|%c|月份，1-12|1|
|%d|日，01-31|14|
|%H|24小时，00-23|15|
|%h|12小时，01-12|03|
|%i|分钟，00-59|24|
|%s|秒，00-59|06|
|%p|AM或PM|PM|

### 3.4 流程控制函数
#### 3.4.1 条件判断函数`if`
```sql
# 查指定字段并且根据条件判断返回不同的值
SELECT IF(condition, value_if_true, value_if_false) FROM table_name;
SELECT IF(`售价` > 100, ' expensive', ' cheap') AS `商品价格等级` FROM `商品表`
```

#### 3.4.2 条件判断函数`case`
```sql
# 查指定字段并且根据条件判断返回不同的值
CASE condition 
  WHEN value1 THEN result1 
  WHEN value2 THEN result2 
  ELSE default_result 
  END 
FROM table_name;

SELECT `商品名称`,`进价`,`售价`, 
CASE `大类编码`
  WHEN 01 THEN 售价*1.1 
  WHEN 02 THEN 售价*1.2
  WHEN 03 THEN 售价*1.05
  ELSE 售价
  END AS `新售价`
FROM `商品表`

SELECT `店号`,`商品编码`,`销售数量`, 
CASE 
  WHEN `销售数量`>250 THEN '优'
  WHEN `销售数量`>200 THEN '良'
  WHEN `销售数量`>150 THEN '中'
  ELSE '差'
  END AS `评价`
FROM `销售表`
```

## 4. 聚合函数
### 4.1 简单聚合函数
- 对一组数据进行处理返回单个结果，如sum、avg、max、min、count
```sql
# 查指定字段的总和
SELECT SUM(销售数量) AS `售价总和` FROM `销售表`
SELECT AVG(销售数量) AS `售价总和` FROM `销售表`
SELECT MAX(销售数量) AS `最高售价` FROM `销售表`
SELECT MIN(销售数量) AS `最低售价` FROM `销售表`
SELECT COUNT(销售数量) AS `销售数量总数` FROM `销售表`

# 或者写成一行
SELECT SUM(销售数量) AS `售价总和`, AVG(销售数量) AS `平均售价`, MAX(销售数量) AS `最高售价`, MIN(销售数量) AS `最低售价`, COUNT(销售数量) AS `销售数量总数` FROM `销售表`
```

### 4.2 分组聚合函数
- 对分组后的数据进行处理返回单个结果，如sum、avg、max、min、count
```sql
# 查每个店铺的销售数量总和
SELECT `店号`, SUM(销售数量) AS `销售数量总和` FROM `销售表` GROUP BY `店号`
# 加查询条件
SELECT `店号`, SUM(销售数量) AS `销售数量总和` FROM `销售表` 
WHERE 日期 BETWEEN '2020-01-01' AND '2020-01-03' 
GROUP BY `店号` 
ORDER BY `销售数量总和` ASC

# 筛选哪个商品小类的商品种类个数>2
SELECT `小类名`, COUNT(*) AS `商品个数` FROM `商品表` GROUP BY `小类名` HAVING `商品个数` > 2

# 查询某个日期区间每个店铺最大销量超过200的店铺
SELECT 店号,MAX(销售数量) AS `最大销量` FROM `销售表`
WHERE `日期` BETWEEN '2020-01-01' AND '2020-01-03'
GROUP BY 店号 
HAVING `最大销量` > 250

# 查询1,3,7三个店铺在某个日期区间最低销量低于120的店铺
SELECT 店号,MIN(销售数量) AS `最低销量` FROM `销售表`
WHERE `日期` BETWEEN '2020-01-01' AND '2020-01-03'
AND 店号 IN (1,3,7)
GROUP BY 店号
HAVING `最低销量` < 120
```

- 总结
```SQL
SELECT 字段名,聚合函数(字段名) AS `别名`
FROM 表名
WHERE 条件
GROUP BY 字段名
HAVING 聚合函数(字段名) 条件
ORDER BY 字段名 排序方式
```

- 多字段分组
```sql
# 查每个店铺每个商品小类的销售数量总和
SELECT 字段名1,字段名2,聚合函数(字段名) AS `别名`
FROM 表名
WHERE 条件
GROUP BY 字段名1,字段名2
HAVING 聚合函数(字段名) 条件
ORDER BY 字段名1 排序方式,字段名2 排序方式
```

### 4.3 查询topN
- 使用limit查询
- 注意使用limit时，要先排序再查询
- 查每个店铺销售数量前3高的商品
```sql
SELECT 店号,商品编码,销售数量
FROM `销售表`
WHERE 日期 BETWEEN '2020-01-01' AND '2020-01-03'
GROUP BY 店号,商品编码
ORDER BY 销售数量 DESC
LIMIT 3
```

### 4.4 分页查询
```sql
# 将销售表所有数据分页查询，每页显示5条
SELECT 店号,商品编码,销售数量
FROM `销售表`
LIMIT 0,5 # 第一页
LIMIT 5,5 # 第二页 
```

## 5. 多表合并
### 5.1 多表合并union
- 不去重
```sql
SELECT column1, column2, ... FROM table1 UNION ALL
SELECT column1, column2, ... FROM table2
```

- 去重
```sql
SELECT column1, column2, ... FROM table1 UNION
SELECT column1, column2, ... FROM table2
```

## 6. 连接查询
### 6.1 多表配合使用
- 两张表有同样字段的情况下，选取字段生成新表
```sql
SELECT 表1.字段1, 表1.字段2, 表2.字段3, 表2.字段4
FROM 表1,表2
WHERE 表1.字段1 = 表2.字段1

# 或者给表1，表2起别名，AS可以省略，用空格代替
SELECT a.字段1, a.字段2, b.字段3, b.字段4
FROM 表1 AS `a`,表2 AS `b`
WHERE a.字段1 = b.字段1
```

### 6.2 内部连接（推荐）
- 只返回两张表中满足连接条件的行
```sql
SELECT a.字段1, a.字段2, b.字段3, b.字段4
FROM 表1 AS `a`
INNER JOIN 表2 AS `b`
ON a.字段1 = b.字段1
```

### 6.3 自然连接
- 所有父子分类均在同一张表中，本质为树状结构，根据子类父类某个字段相同进行连接
```sql
SELECT a.`名字`AS 著作,b.`名字` AS 人物 FROM `自然连接` a,`自然连接` b WHERE a.`子分类`=b.`父分类`
```

### 6.4 左外连接（推荐）
- 返回左表所有行，右表满足连接条件的行
```sql
SELECT a.字段1, a.字段2, b.字段3, b.字段4
FROM 表1 AS `a`
LEFT JOIN 表2 AS `b`
ON a.字段1 = b.字段1
```

- 案例：查询不同店铺1-3日的销售数量、销售金额、毛利润总和，并按照金额的升序排列
```sql
SELECT `销售表`.`店号`,`店铺表`.`店名`,
  sum(`销售表`.`销售数量`) AS 总销量,
  sum(`销售表`.`销售数量`*`商品表`.`售价`) AS 销售金额,
  sum(`销售表`.`销售数量`*(`商品表`.`售价`-`商品表`.`进价`)) AS 毛利润
FROM `销售表`
LEFT JOIN `商品表`
ON `销售表`.`商品编码`=`商品表`.`商品编码`
LEFT JOIN `店铺表` 
ON `店铺表`.`店号`=`销售表`.`店号`
WHERE 日期 BETWEEN '2020-01-01' AND '2020-01-03'
GROUP BY `销售表`.`店号`,`店铺表`.`店名`
ORDER BY 销售金额	
# 注意 group by 中要包含所有查询非聚合字段，否则会报错
```

### 6.5 右外连接
- 返回右表所有行，左表满足连接条件的行，具体操作方式与左外连接一致

### 6.6 全外连接
- 返回左右表所有行
```sql
SELECT * FROM 表1 LEFT JOIN 表2 ON 表1.字段1 = 表2.字段1
UNION
SELECT * FROM 表1 RIGHT JOIN 表2 ON 表1.字段1 = 表2.字段1
```

### 6.6 交叉连接
- 返回连接表中所有数据行的笛卡尔积
- 笛卡尔积举例：表1是所有店铺名称，表2是1-12月，新建表3是所有店铺在每个月的销售记录
```sql
SELECT 字段1,字段2,字段3 FROM 表a CROSS JOIN 表b
# CROSS JOIN 也可以省略用逗号表示
SELECT 字段1,字段2,字段3 FROM 表a,表b
```

## 7. 子查询和嵌套查询
- 子查询需要包含在小括号内
- 子查询通常放在筛选条件右侧
- 单行子查询一般搭配条件运算符使用
- 多行子查询，一般搭配多行操作符使用，如in、any、all
- 子查询执行优先于主查询，主查询的条件用到了子查询的结果

- 示例一：查询平均销量大于3号店铺的其他店铺
```sql
SELECT 店号,AVG(销售数量) AS `平均销量`
FROM `销售表`
GROUP BY 店号
HAVING `平均销量` > (SELECT AVG(销售数量) FROM `销售表` WHERE 店号 = 3)
ORDER BY `平均销量` DESC
```

## 8. 数据的增删改
### 8.1 插入数据
- 插入数据
```sql
# 方法一，支持插入多行数据，支持子查询
INSERT INTO 表名 (字段1,字段2,字段3) VALUES (值1,值2,值3)
INSERT INTO 表名 (字段1,字段2,字段3) VALUES (值1,值2,值3),(值1,值2,值3)
# 方法二，空值用null代替，支持插入多行数据，支持子查询
INSERT INTO 表名 VALUES (值1,值2,值3)
# 方法三，不支持插入多行数据，不支持子查询
INSERT INTO 表名 SET 字段1=值1,字段2=值2,字段3=值3
# 添加子查询的插入数据
INSERT INTO 表名 (字段1,字段2,字段3)
SELECT 字段1,字段2,字段3 FROM 表名 WHERE 条件
```

### 8.2 更新数据
- 更新单表数据
```sql
# 方法一，更新指定字段的值
UPDATE 表名 SET 字段1=值1,字段2=值2,字段3=值3 WHERE 条件
```

- 更新多表数据
```sql
UPDATE 表1 别名
INNER/LEFT/RIGHT JOIN 表2 别名
ON 条件
SET 字段1 = 值1, 字段2 = 值2,...
WHERE 条件
```

### 8.3 删除数据
- 条件删除
```sql
# 单表删除
DELETE FROM 表名 WHERE 条件
# 多表删除
DELETE 表1的别名,表2的别名
FROM 表1 别名
INNER/LEFT/RIGHT JOIN 表2 别名
ON 条件
WHERE 条件
```

- 示例：只删除孙悟空的师傅
```sql
DELETE b
FROM 表b b
INNER JOIN 表a a
ON b.序号 = a.师傅编码
WHERE a.徒弟 = '孙悟空'
```

- 示例：孙悟空和师傅都删除
```sql
DELETE b,a
FROM 表b b
INNER JOIN 表a a
ON b.序号 = a.师傅编码
WHERE a.徒弟 = '孙悟空'
```

- 整表删除
```sql
TRUNCATE TABLE 表名
```