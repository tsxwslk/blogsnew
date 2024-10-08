---
title: 面试总结js部分
author: 怡然
createTime: 2024/09/03 16:32:18
permalink: /article/8m47akpr/
---

### 1. js数据类型
- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `bigInt`
- `symbol`
- `object`

> 除object为引用数据类型外，其他几种均属于基本数据类型

### 2. Map、Set、WeakMap、WeakSet
> `Map`, `Set`, `WeakMap`, 和 `WeakSet` 是ES6（ECMAScript 2015）引入的内置对象，它们提供了不同的数据结构用于存储键值对或者元素集合。

1. Map与WeakMap
- `Map` 对象保存键值对，并且可以是任何类型的值（包括函数、对象、基本类型）。与对象字面量不同的是，`Map` 的值可以是任意类型的数据。`Map` 中的元素是有序的，元素按照插入顺序排序。
- `WeakMap` 类似于 `Map`，但是它的键必须是对象，而且这些键是弱引用的。这意味着如果一个对象作为 `WeakMap` 的键并且这个对象没有其他引用了，那么它可以被垃圾回收。这使得 `WeakMap` 适合用来存储临时的数据关联。

2. Set与WeakSet
- `Set` 是一个集合，它只包含唯一的值作为元素。`Set` 可以用来确保每个值都是唯一的，并且可以通过迭代器访问这些值。
- `WeakSet` 类似于 `Set`，但是它的值必须是对象，并且这些值也是弱引用的。它主要用于存储一组对象，并允许在不阻止垃圾回收的情况下持有对这些对象的引用。

3. 相同点
   - `Map`和`Set`都是一种数据结构，可以作为存放内容的容器；
   - `Map`和`Set`相较于普通的数组`array`来说，查找效率更快；
   - `Map`和`Set`都通过`delete`方法来删除数据；
   - `Map`和`Set`都通过`has`方法来获取元素是否在集合中。
  
4. 不同点
   - `Map`的值类似于一个二维数组，而`Set`的值是一个伪数组（其实是一个对象，但是可以通过索引去访问）；
   - `Map`更像是一个字典，存储的数据由`key: value`的格式组成，而Set更像是一个集合，里面存储了一个个的值；
   - `Map`的键名不会重复，`Set`则是值不会重复；
   - `Map`通过`get`方法访问数据，`Set`则只能通过遍历或者转成数组，再去访问；
   - `Map`通过`set`方法去添加数据，`Set`则是通过`add`方法去添加数据。

### 3. `bigInt`和`number`的区别
1. 值范围
   - `Number`: JavaScript中的 `Number` 类型可以存储从 -`1e308` 到 `1e308` 之间的值（即大约从-10的308次方到10的308次方）。对于整数来说，`Number` 类型只能精确表示从 `-2^53+1` 到 `2^53-1` 之间的所有整数。
   - `BigInt`: `BigInt` 类型用于表示任意精度的**整数**。这意味着它可以准确地表示远远超过 `Number` 类型所能表示的最大值或最小值的整数。
2. 语法
   - `Number`: 普通数字直接量，如 `123` 或 `3.14`。
   - `BigInt`: `BigInt` 数字直接量需要在整数后面加上 `n` 后缀，例如 `1234567890123456789012345678901234567890n`，或者通过 `BigInt()` 函数创建，如 `BigInt(123)`。
3. 操作
   - 对于 `Number` 类型的操作，如果操作超出了 `Number` 能表示的范围，则会得到 `Infinity` 或 `-Infinity`，或者由于精度丢失导致的结果不准确。
   - `BigInt` 类型的操作则不会溢出，并且能够保持大整数的精确度。但是，`BigInt` 不支持任何非整数的数学运算，比如浮点运算或使用 `%`（取模）运算符。
4. 互操作性
   - 当 `Number` 和 `BigInt` 在某些情况下混合使用时，如果无法进行类型转换来维持精度，将会抛出错误。例如，当你试图将一个 `BigInt` 和一个 `Number` 相加时，`JavaScript` 会抛出一个类型错误（TypeError），因为 `BigInt` 不能自动转换为 `Number`，反之亦然。
5. 性能与存储
   - `Number` 类型通常比 `BigInt` 类型在处理速度上更快，因为大多数现代处理器对双精度浮点数有很好的支持。
   - `BigInt` 占用更多的内存空间，并且可能在执行效率上不如 `Number` 类型，尤其是在处理不太大的数值时。
6. 相同点：
   - 在`if`条件语句中，`BigInt`和`Number`类似；
   - 在`Boolean`转换时，`BigInt`和`Number`类似；
   - `BigInt`类型的数据可以和`Number`类型的数据进行比较，但是结果是宽松相等（`==` 才成立， `===` 不行）的；
   - `BigInt`和`Number`类似，可以使用`+、-、*、/、%`等运算；
   - `BigIn`t可以和`Number`类型的数据放在同一数组进行排序。
7. 不同点：
   - 类型不同：进行类型判断时，二者类型不同；
   - `BigInt`不能使用`Math`对象：不能使用`Math`对象的一些方法，比如`Math.floor`、`Math.ceil`等；
   - 不能和`Number`运算：不能和`Number`类型的数据进行运算，必须要转换成同一类型才可以，但是转换的过程可能会精度丢失；
   - `BigInt`的数据不能使用`JSON.stringify()`。

### 4. 如何判断数据类型
1. `typeof`：`typeof null`的值是`object`，这是由于在`JavaScript`最初的实现中，`js`的值是由表示类型的标签和实际数值表示的，而恰好`object`的类型标签是`0`，`null`又代表空指针，在大多数平台下解析到的类型标签也是`0`，所以`typeof`的值也就变成了`object`。
2. `instanceof`：所有的引用类型用`instanceof Object`判断时，结果都为`true`。
3. `toString()`：需要对返回值进行匹配。
```js
function myTypeof(data) {
  return Object.prototype.toString
    .call(data) // eg:[object Number]
    .slice(8, -1) // 正序索引为八的字符到倒序索引为-1的字符
    .toLowerCase(); // 转小写
}
```

### 5. 简述`JavaScript`中的`this`
> `this` 是执行上下文中的一个属性，指向最后一次调用这个方法的对象。

- 当函数不是对象的一个属性，直接作为函数来调用时，`this`指向全局对象。
- 函数作为一个对象的方法来调用时，`this`指向这个对象。
- 如果一个函数用`new`调用时，函数执行前会新创建一个对象，`this`指向这个新创建的对象。
- `apply`、`call`和`bind`三个方法可以显式得指定调用函数的`this`指向。
  - `apply`方法接受两个参数，一个是`this`绑定的对象，一个是参数数组。
  - `call`方法接收的第一个参数是`this`绑定的对象，后面的其余参数是传入函数执行的参数。
  - `bind`方法通过传入一个对象，返回一个`this`绑定了传入对象的新函数，这个函数的`this`指向除了使用`new`时会被改变，其他情况下都不会改变。
 ```js
function greet(phrase, time) {
  console.log(phrase + ', ' + time + ' ' + this.name);
}

let person = {
  name: 'Alice'
};

// 绑定this值，并预设参数
let morningGreet = greet.bind(person, 'Good morning', 'in the morning');

// 输出 "Good morning, in the morning Alice"
morningGreet();
```

### 6. 箭头函数与普通函数的区别
1. 语法不同，箭头函数的语法相对更加简洁。
2. `this`：箭头函数不会创造自己的`this`上下文，而是从外围的作用域中继承`this`值，无论箭头函数在哪里被调用，它的`this`指向始终与定义时所在的上下文相同。
3. `arguments`：箭头函数内部的`arguments`对象实际上是一个由剩余参数操作符(`...`)提供的数组，而普通函数的`arguments`是一个类数组对象。
4. `new`操作符：箭头函数不能作为构造函数使用，因此不能使用`new`关键字来调用，否则会报`TypeError`的错。