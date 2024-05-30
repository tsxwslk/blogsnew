---
title: JS基础
author: 怡然
createTime: 2024/05/27 15:01:16
permalink: /JavaScript/ewr4nfz5/
---

## 1. 语法和数据类型
- JavaScript 是区分大小写的，并使用 Unicode 字符集。
- 三种声明方式：`var` ,`const` ,`let`
- 一共8种数据类型，其中前7种为基本数据类型，最后1种是对象：
  * 布尔值（`Boolean`），有 2 个值分别是：`true` 和 `false`。
  * `null`，一个表明 `null` 值的特殊关键字。JavaScript 是大小写敏感的，因此 `null` 与 `Null`、`NULL`或变体完全不同。
  * `undefined`，和 `null` 一样是一个特殊的关键字，`undefined` 表示变量未赋值时的属性。
  * 数字（`Number`），整数或浮点数，例如： 42 或者 3.14159。
  * 任意精度的整数（`BigInt`），可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
  * 字符串（`String`），字符串是一串表示文本值的字符序列，例如："Howdy"。
  * 代表（`Symbol`，在 ECMAScript 6 中新添加的类型）。一种实例是唯一且不可改变的数据类型。
  * 对象（`Object`）。
- 可以使用`typeof`来判断 6 种原始类型:
  ::: details 点击查看代码
  ```js
  typeof 0; //number
  typeof "wenbo"; //string
  typeof true; //boolean
  typeof undefined; //undefined
  typeof Symbol(1); //symbol
  typeof 1n; //bigint
  ```
  ::: 
  因为`typeof`判断对象的类型为 Object，不会精确到哪种对象，会不准确。推荐使用`Object.prototype.toString.call()`代替以上进行判断数据类型。
- 字面量：字面量是脚本中按字面意思给出的固定的值。
  * 数组字面量：数组字面值是一个封闭在方括号对 ([]) 中的包含有零个或多个表达式的列表，其中每个表达式代表数组的一个元素。
    ```js
    var coffees = ["French Roast", "Colombian", "Kona"];
    var a = [3];
    ```
  * 布尔字面量：`true`和`false`。
  * 数字字面量：
    | 类型 | 特点 |
    |------------|-----------|
    |整数字面量|整数可以用十进制（基数为 10）、十六进制（基数为 16）、八进制（基数为 8）以及二进制（基数为 2）表示。|
    |浮点数字面量|浮点数字面值可以有以下的组成部分：一个十进制整数，可以带正负号（即前缀“+”或“-”），小数点（“.”），小数部分（由一串十进制数表示），指数部分。|
  * 对象字面量：对象字面值是封闭在花括号对（{}）中的一个对象的零个或多个“属性名—值”对的（元素）列表。
  * RegExp 字面值：一个正则表达式是字符被斜线围成的表达式。
  * 字符串字面量：字符串字面量是由双引号（"）对或单引号（'）括起来的零个或多个字符。

## 2. 流程控制与错误处理
### 2.1 语句块
> 最基本的语句是用于组合语句的语句块。该块由一对大括号界定，通常用于流程控制：
  ```js
  {
    statement_1;
    statement_2;
    statement_3;
    .
    .
    .
    statement_n;
  }
  ```

### 2.2 条件判断语句
#### 2.2.1 if...else 语句
> 当一个逻辑条件为真，用 `if` 语句执行一个语句。当这个条件为假，使用可选择的 `else` 从句来执行这个语句，也可以组合语句通过使用 `else if` 来测试连续多种条件判断。
#### 2.2.2 switch 语句
> `switch` 语句允许一个程序求一个表达式的值并且尝试去匹配表达式的值到一个 `case` 标签。如果匹配成功，这个程序执行相关的语句。
  ::: details 点击查看代码
  ```js
  switch (fruittype) {
    case "Oranges":
      document.write("Oranges are $0.59 a pound.<br>");
      break;
    case "Apples":
      document.write("Apples are $0.32 a pound.<br>");
      break;
    case "Bananas":
      document.write("Bananas are $0.48 a pound.<br>");
      break;
    case "Cherries":
      document.write("Cherries are $3.00 a pound.<br>");
      break;
    case "Mangoes":
    case "Papayas":
      document.write("Mangoes and papayas are $2.79 a pound.<br>");
      break;
    default:
      document.write("Sorry, we are out of " + fruittype + ".<br>");
  }
  document.write("Is there anything else you'd like?<br>");
  ```
  :::

### 2.3 异常处理语句
#### 2.3.1 throw 语句
> 可以抛出任意表达式而不是特定一种类型的表达式。
::: details  点击查看代码
```js
throw "Error2"; // String type
throw 42; // Number type
throw true; // Boolean type
throw {
  toString: function () {
    return "I'm an object!";
  },
};
```
:::
#### 2.3.2 try...catch 语句
> `try...catch` 语句标记一块待尝试的语句，并规定一个以上的响应应该有一个异常被抛出。

> `finally`块包含了在 `try` 和 `catch` 块完成后、下面接着 `try...catch` 的语句之前执行的语句。`finally`块无论是否抛出异常都会执行。如果抛出了一个异常，就算没有异常处理，finally块里的语句也会执行。
::: details  点击查看代码
```js
openMyFile();
try {
  writeMyFile(theData); //This may throw a error
} catch (e) {
  handleError(e); // If we got a error we handle it
} finally {
  closeMyFile(); // always close the resource
}
```
:::

#### 2.3.3 使用Error对象
> 在抛出你个人所为的异常时，为了充分利用那些属性（比如你的`catch`块不能分辨是你个人所为的异常还是系统的异常时），你可以使用 `Error` 构造函数。
::: details  点击查看代码
```js
function doSomethingErrorProne () {
  if (ourCodeMakesAMistake()) {
    throw (new Error('The message'));
  } else {
    doSomethingToGetAJavascriptError();
  }
}
....
try {
  doSomethingErrorProne();
}
catch (e) {
  console.log(e.name); // logs 'Error'
  console.log(e.message); // logs 'The message' or a JavaScript error message)
}
```
:::

## 3. 循环与迭代
### 3.1 `for` 语句
> 一个 `for` 循环会一直重复执行，直到指定的循环条件为 `false`

### 3.2 `do...while` 语句
> `do...while` 语句一直重复直到指定的条件求值得到假值（false）。
::: details  点击查看代码
```js
var i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5);
```
:::

### 3.2 `while` 语句
> 一个 `while` 语句只要指定的条件求值为真（true）就会一直执行它的语句块。
::: details  点击查看代码
```js
var n = 0;
var x = 0;
while (n < 3) {
  n++;
  x += n;
}
```
:::

### 3.3 `label` 语句，`break`语句，`continue`语句
- 一个 `label` 提供了一个让你在程序中其他位置引用它的标识符。例如，你可以用 `label` 标识一个循环，然后使用 `break` 或者 `continue` 来指出程序是否该停止循环还是继续循环。
- 使用 `break` 语句来终止循环。 
- `continue` 语句可以用来继续执行（跳过代码块的剩余部分并进入下一循环）一个 `while`、`do-while`、`for`，或者 `label` 语句

::: details  点击查看代码
```js
var num = 0;
outPoint: for (var i = 0; i < 10; i++) {  // outPoint为label
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outPoint; // 在 i = 5，j = 5 时，跳出所有循环，
      // 返回到整个 outPoint 下方，继续执行
    }
    num++;
  }
}
alert(num); // 输出 55
```
:::
::: details  点击查看代码
```js
var num = 0;
outPoint: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outPoint;
    }
    num++;
  }
}
alert(num); // 95
```
:::

### 3.3 `for...in `语句和`for...of` 语句
- `for in`用于遍历对象的可枚举属性(包括原型链上的可枚举属性)，`for of`用于遍历可迭代对象的值
::: details  点击查看代码
```js
let arr = [3, 5, 7];
arr.foo = "hello";
for (let i in arr) {
  console.log(i); // 输出 "0", "1", "2", "foo"
}
for (let i of arr) {
  console.log(i); // 输出 "3", "5", "7"
}
// 注意 for...of 的输出没有出现 "hello"
```
:::

## 4. 函数基础
### 4.1 定义函数
#### 4.1.1 函数声明
- 一个函数定义（也称为函数声明，或函数语句）由 `function` 关键字，并跟随以下部分组成：
  * 函数名称。
  * 函数参数列表，包围在括号中并由逗号分隔。
  * 定义函数的 JavaScript 语句，用大括号括起来，`{ /* … */ }`。
```js
function square(number) {
  return number * number;
}
```
#### 4.1.2 函数表达式
- 这样的函数可以是匿名的；它不必有一个名称。
```js
const square = function (number) {
  return number * number;
};
console.log(square(4)); // 16
```
- 也可以为函数表达式提供名称，并且可以用于在函数内部代指其本身，或者在调试器堆栈跟踪中识别该函数：
```js
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};
console.log(factorial(3)); // 6
```
### 4.2 调用函数
- 定义的函数并不会自动执行它。定义了函数仅仅是赋予函数以名称并明确函数被调用时该做些什么。调用函数才会以给定的参数真正执行这些动作。
- 函数提升: JavaScript 解释器会将整个函数声明提升到当前作用域的顶部
```js
// 所有函数声明实际上都位于作用域的顶部
function square(n) {
  return n * n;
}
console.log(square(5)); // 25
```
### 4.3 函数作用域
- 定义在全局域中的函数可以访问所有定义在全局域中的变量。在另一个函数中定义的函数也可以访问在其父函数中定义的所有变量和父函数有权访问的任何其他变量。
### 4.4 作用域和函数栈
#### 4.4.1 递归
- 一个函数可以指向并调用自身。有三种方法可以达到这个目的：
  1. 函数名
  2. arguments.callee
  3. 作用域内一个指向该函数的变量名
- 递归本身使用了栈：函数栈。类似栈的行为可以在以下示例中看到：
```js
function foo(i) {
  if (i < 0) {
    return;
  }
  console.log(`开始：${i}`);
  foo(i - 1);
  console.log(`结束：${i}`);
}
foo(3);
// 打印：
// 开始：3
// 开始：2
// 开始：1
// 开始：0
// 结束：0
// 结束：1
// 结束：2
// 结束：3
```
#### 4.4.2 嵌套函数和闭包
- 内部函数只可以在外部函数中访问。
- 内部函数形成了一个闭包：它可以访问外部函数的参数和变量，但是外部函数却不能使用它的参数和变量。
```js
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
console.log(addSquares(2, 3)); // 13
console.log(addSquares(3, 4)); // 25
console.log(addSquares(4, 5)); // 41
```
- 由于内部函数形成了闭包，因此你可以调用外部函数并为外部函数和内部函数指定参数：
```js
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
const fnInside = outside(3); // 可以这样想：给我一个可以将提供的值加上 3 的函数
console.log(fnInside(5)); // 8
console.log(outside(3)(5)); // 8
```
#### 4.3.3 保存变量
> 注意到上例中 `inside` 被返回时 `x` 是怎么被保留下来的。一个闭包必须保存它可见作用域中所有参数和变量。因为每一次调用传入的参数都可能不同，每一次对外部函数的调用实际上重新创建了一遍这个闭包。只有当返回的 `inside` 没有再被引用时，内存才会被释放。
#### 4.3.4 多层嵌套函数
- 函数可以被多层嵌套。例如：
  1. 函数（`A`）可以包含函数（`B`），后者可以再包含函数（`C`）。
  2. 这里的函数 `B` 和 `C` 都形成了闭包，所以 `B` 可以访问 `A`，`C` 可以访问 `B`。
  3. 此外，因为 `C` 可以访问 `B`（而 `B` 可以访问 `A`），所以 `C` 也可以访问 `A`。
- 因此，闭包可以包含多个作用域；它们递归地包含了所有包含它的函数作用域。这个称之为作用域链。
#### 4.3.5 命名冲突
- 当同一个闭包作用域下两个参数或者变量同名时，就会产生命名冲突。更近的作用域有更高的优先权，所以最近的优先级最高，最远的优先级最低。这就是作用域链。链的第一个元素就是最里面的作用域，最后一个元素便是最外层的作用域。
```js
function outside() {
  const x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}
console.log(outside()(10)); // 20（而不是 10）
```
### 4.4 使用 `arguments` 对象
- 函数的实际参数会被保存在一个类似数组的 `arguments` 对象中。在函数内，你可以按如下方式找出传入的参数：`arguments[i]`
- `arguments` 变量只是“类数组”，而不是数组。它与数组类似，有索引编号和 `length` 属性。尽管如此，它并不具备 `Array` 对象的所有数组操作方法。
### 4.5 箭头函数
- 箭头函数表达式相比函数表达式具有较短的语法且没有它自己的 `this`、`arguments`、`super` 和 `new.target`。
- 箭头函数总是匿名的。
### 4.6 预定义函数
> JavaScript 语言有几个顶级的内置函数
|函数|用途|
|--------|----------|
|`eval()`|执行方法计算以字符串表示的 JavaScript 代码。|
|`isFinite()`|全局函数判断传入的值是否是有限的数值。如果需要的话，其参数首先被转换为一个数值。|
|`isNaN()`|判断一个值是否是 `NaN`。注意：`isNaN` 函数内部的强制转换规则十分有趣。你也可以使用 `Number.isNaN()` 来判断该值是否为 NaN。|
|`parseFloat()`|解析字符串参数，并返回一个浮点数。|
|`parseInt()`|解析字符串参数，并返回指定的基数（基础数学中的数制）的整数。|
|`decodeURI()`|对先前经过 `encodeURI`函数或者其他类似方法编码过的统一资源标志符（URI）进行解码。|
|`decodeURIComponent()`|对先前经过 `encodeURIComponent` 函数或者其他类似方法编码的统一资源标志符（URI）进行解码。|
|`encodeURI()`|通过以表示字符的 UTF-8 编码的一个、两个、三个或四个转义序列替换统一资源标识符（URI）的某些字符来进行编码（对于由两个“代理（surrogate）”字符组成的字符，只会编码为四个转义序列）。|
|`encodeURIComponent()`|通过以表示字符的 UTF-8 编码的一个、两个、三个或四个转义序列替换统一资源标识符（URI）的某些字符来进行编码（对于由两个“代理”字符组成的字符，只会编码为四个转义序列）。|

## 5. 解构赋值

> 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。

### 5.1 数组解构
::: details 点击查看代码
```js
//数组
var [a, b] = [1, 2, 3];
console.log(a, b); // 1 2

var [c, ,b] = [4, 5, 6];
console.log(c, b); // 4 6

var arr = [1, 2, 3];
console.log(...arr); // 1 2 3
console.log([...arr]); // [1,2,3]
```
:::

### 5.2 对象解构
::: details 点击查看代码
```js
var { name, skill } = {
  name: "yiran",
  age: 18,
  skill: "sleep",
};
console.log(name, skill); //yiran  sleep

//无声明复制  需要加小括号
var name, skill;
({ name, skill } = {
  name: "yiran",
  age: 18,
  skill: "sleep",
});
console.log(name, skill); //yiran  sleep
```
::: 

### 5.3 `...`展开

> `...`语法，可以适用于迭代器对象
::: details 点击查看代码
```js
let arr = [1, 2, 3];
console.log(...arr); // 1 2 3

let [a, ...b] = [1, 2, 3];
console.log(a, b); // 1   [2,3]

let set = new Set([1, 2, 3]);
console.log(...set); // 1 2 3
```
::: 



<!-- ### 原始类型
## ECMAScript6 相关


### let 与 const

- `var`：定义变量会挂载到`window`上，变量会被提升
- `let`：定义变量不会挂载到`window`上，变量虽然会被提升，但是不允许访问，访问受限
- `const`：与`let`基本一致，但声明后的变量不允许再次赋值
  - `Object.freeze()` 可以冻结一个对象，对象不能再被修改，添加和删除

### 变量提升

- 变量提升只会把声明挪到作用域顶部
- 为了解决函数间相互调用的情况
- 函数提升高于变量提升

### 暂时性死区

- 在使用 `let`和 `const`定义变量时，在声明之前是不可以使用变量的，在语法上称为暂时性死区

### 继承
> 原型链继承  借用构造函数实现继承 组合继承 寄生式组合继承 class 实现继承


::: details 点击查看更多

#### 原型链继承

原型链继承

存在问题：原型中的引用对象会被所有的实例共享，子类在实例化的时候不能给父类构造函数传参
```js
function Father() {
  this.hobby = ["coding", "eat"];
}
Father.prototype.skill = function() {
  console.log("i will javascript");
};
function Son() {}
Son.prototype = new Father();

var father = new Father();
var son = new Son();
var son1 = new Son();
console.log(father.hobby); //[ 'coding', 'eat' ]

father.hobby.push("play");
console.log(father.hobby, son.hobby, son1.hobby);
//[ 'coding', 'eat', 'play' ] [ 'coding', 'eat' ] [ 'coding', 'eat' ]

son.hobby.push("hei");
console.log(father.hobby, son.hobby, son1.hobby);
//[ 'coding', 'eat', 'play' ] [ 'coding', 'eat', 'hei' ] [ 'coding', 'eat', 'hei' ]

son.skill(); //i will javascript
```

#### 借用构造函数继承
借用构造函数继承

存在问题：方法需要定义在构造函数内，因此每次创建子类实例都会创建一边方法
```js
function Father(name) {
  this.name = name;
  this.sayNmae = function() {
    return this.name;
  };
}

function Son(name) {
  Father.call(this, name);
}
Son.prototype = new Father();

var father = new Father("wenbo");
var son = new Son("zhijian");

console.log(father.name, son.name); //wenbo zhijian
console.log(father.sayNmae(), son.sayNmae()); //wenbo zhijian
```

#### 组合继承
组合继承
- 在子类的构造函数中通过`Parent.call(this,)`继承父类的属性
- 然后改变之类的原型为`new Parent()`来继承父类的函数

存在问题：组合继承会导致调用两次父类构造函数,存在内存上的浪费

```javascript
function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}
Son.prototype = new Father();
Son.prototype.constructor = Son;

var son = new Son("yewen", 18);
console.log(son); //Son { name: 'yewen', age: 18 }
console.log(son.sayName()); //yewen
```

#### 寄生组合继承

- `Object.create(proto，[propertiesObject])`：创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`
  - `proto`：新创建对象的原型对象
  - `propertiesObjec`：可选，需要传入一个对象
寄生组合继承

解决组合继承会导致调用两次父类构造函数
```javascript

function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;

var son = new Son("yewen", 18);
console.log(son); //Son { name: 'yewen', age: 18 }
console.log(son.sayName()); //yewen
```

#### Class 继承

```js
class Father {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Son extends Father {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  getAge() {
    return this.age;
  }
}
var son = new Son("heihei", 18);
console.log(son); //Son { name: 'heihei', age: 18 }
console.log(son.getName(), son.getAge()); //heihei 18
```
:::

### Promise 
实现一个Promise
:::details 点击查看代码

1111
:::

## JavaScript 内置函数

> 详情见 JavaScript 内置函数部分

## JavaScript 原型链

> 详情见 JavaScript 深入理解部分

## instanceof 和 typeof

### `typeof`：

> 判断一个变量的类型，可以利用`typeof`,来判断`number`，`bight`，`string`，`object`，`boolean`，`function`，`undefined`，`symbol`八种类型

- 注意：

  - `typeof`只能判断`object`数据类型为`object`，不能具体到是哪一种`object`

  - `typeof`不能判断`null`，会把`null`判定为`object`

  -  `console.log(typeof null); //object`



### `instanceof`：
`object instanceof constructor`

> `instanceof` 运算符用来检测 `constructor.prototype`是否存在于参数 `object` 的原型链上。

- 判定一个实例是否属于某种类型

- 判定一个实例是否是其父类型或者祖先类型的实例
::: details 点击查看代码
```javascript
function Person() {}
function Child() {}
Child.prototype = new Person();
var child = new Child();
var person = new Person();
console.log(person instanceof Person); //true
console.log(child instanceof Person); //true
```
::: 
`instanceof` 实现原理：
::: details 点击查看代码
```javascript
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false;
    }
    if (leftVaule === rightProto) {
      return true;
    }
    leftVaule = leftVaule.__proto__;
  }
}
```
:::

`Object.prototype.toString`

> `Object.prototype.toString.call()` 一个不错的判断方法，可以对一个变量的类型来进行比较准确的判断


::: details 点击查看代码
```javascript
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call("hi"); // "[object String]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(() => {}); // "[object Function]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
```
::: 

## call，apply 和 bind

### call

- 调用 call 的对象，必须是个函数 Function。
- call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。
- 第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，之后参数都为空。

### apply
- 它的调用者必须是函数 Function，并且只接收两个参数，第一个参数的规则与 call 一致。
- 第二个参数，必须是数组或者类数组，它们会被转换成类数组，传入 Function 中，并且会被映射到 Function 对应的参数上。这也是 call 和 apply 之间，很重要的一个区别。

### bind

- bind 方法 与 apply 和 call 比较类似，也能改变函数体内的 this 指向。
- 不同的是，bind 方法的返回值是函数，并且需要稍后调用，才会执行。而 apply 和 call 则是立即调用。 -->

