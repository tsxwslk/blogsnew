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
