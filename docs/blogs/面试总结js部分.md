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

### 7. AMD和CommonJS、ES6模块的区别
> AMD和CommonJS、ES6模块是JavaScript模块化编程中三种主要的模块系统。

1. CommonJS：
   - 同步加载：CommonJS模块是同步加载执行的，意味着当一个模块被加载时，其所有的代码都会被立即执行，并且阻塞其他代码的执行。
   - 导入和导出：CommonJS使用`module.exports`导出模块接口，并使用`require`动态加载模块。
   - 单次执行：每个模块在第一次加载时只执行一次，并且其导出的值会被缓存。
   ```js
   // 模块文件：math.js
   module.exports = {
   add: function(x, y) {
      return x + y;
   }
   };

   // 主文件：index.js
   const math = require('./math');
   console.log(math.add(1, 2)); // 输出 "3"
   ```

2. AMD：
   - 异步加载：AMD模块式异步加载的，这意味着模块加载不会阻塞其他代码的执行。
   - 定义模块：使用`define`函数定义模块，模块定义是一个立即执行的函数表达式，可以接收依赖项作为参数。
   - 加载模块：使用`require`函数加载模块，通常需要一个模块加载器。
   ```js
   // 定义一个模块
   define(['dependency'], function(dependency) {
      return {
         doSomething: function() {
            dependency.doSomethingElse();
         }
      };
   });

   // 加载模块
   require(['myModule'], function(myModule) {
      myModule.doSomething();
   });
   ```

3. ES6 Modules:
   - 静态导入/导出：ES6模块使用`import`和`export`关键字来声明模块依赖关系和导出成员。这些导入和导出都是静态解析的，意味着编译器可以在编译阶段确定所有依赖关系。
   - 异步加载：虽然ES6模块本身是静态解析的，但在运行时他们可以被异步加载。在支持动态导入的环境下，可以使用`import()`表达式来异步加载模块。
   - 顶层作用域：ES6模块具有自己的顶层作用域，不同于全局作用域，因此`import`和`export`不能在脚本的任何地方使用，只能在顶级作用域使用。
   ```js
   // 模块文件：math.js
   export const add = (x, y) => {
      return x + y;
   };

   // 主文件：index.js
   import { add } from './math';
   console.log(add(1, 2)); // 输出 "3"
   ```

### 7. let, const, var的区别
| 区别               | `var` | `let` | `const` |
| ------------------ | ----- | ----- | ------- |
| 是否有块级作用域   | 否    | 是    | 是      |
| 是否存在变量提升   | 是    | 否    | 否      |
| 是否添加全局属性   | 是    | 否    | 否      |
| 能否重复声明变量   | 能    | 否    | 否      |
| 是否存在暂时性死区 | 否    | 是    | 是      |
| 是否必须设置初始值 | 否    | 否    | 是      |
| 能否改变指针指向   | 能    | 能    | 否      |

### 8. new操作符的实现原理
1. 首先创建一个新的空对象。
2. 设置原型，将对象的原型设置为函数的prototype对象。
3. 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象；如果是引用类型，就返回这个引用类型的对象。

```js
function Person(name, age) {
   this.name = name;
   this.age = age;
}

Person.prototype.sayHello = function() {
   console.log("Hello, my name is " + this.name);
};

// 使用 new 操作符创建对象
let alice = new Person('Alice', 30);
alice.sayHello(); // 输出 "Hello, my name is Alice"
// 模拟new操作符
function _new(Constructor, ...args) {
   // 创建一个新的对象
   const newObj = {};

   // 将新对象的原型设置为构造函数的 prototype
   newObj.__proto__ = Constructor.prototype;

   // 绑定 this 到新对象，并执行构造函数
   const result = Constructor.apply(newObj, args);

   // 检查构造函数是否返回一个对象
   return result instanceof Object ? result : newObj;
}

// 使用自定义的_new函数创建对象
let bob = _new(Person, 'Bob', 25);
bob.sayHello(); // 输出 "Hello, my name is Bob"
```

### 9. 常用的数组的方法
1. 操作方法
   - `push`：向数组末尾添加一个或多个元素，并返回新的长度。
      ```js
      let arr = [1, 2, 3];
      arr.push(4); // arr 现在是 [1, 2, 3, 4]
      ```
   - `pop`：移除数组末尾的元素，并返回被移除的元素。
      ```js
      let arr = [1, 2, 3];
      arr.pop(); // 返回 3, arr 现在是 [1, 2]
      ``` 
   - `shift`：移除数组开头的元素，并返回被移除的元素。
      ```js
      let arr = [1, 2, 3];
      arr.shift(); // 返回 1, arr 现在是 [2, 3]
      ```
   - `unshift`：向数组开头添加一个或多个元素，并返回新的长度。
      ```js
      let arr = [1, 2, 3];
      arr.unshift(0); // arr 现在是 [0, 1, 2, 3]
      ```
   - `splice`：用于添加或删除数组中的元素。
      ```js
      let arr = [1, 2, 3, 4];
      arr.splice(1, 2); // 删除索引1开始的两个元素，arr 现在是 [1, 4]
      arr.splice(1, 0, 2, 3); // 在索引1处插入2, 3，arr 现在是 [1, 2, 3, 4]
      ```
   - `concat`：将一个或多个数组合并为一个新数组，并返回该数组。
      ```js
      let arr1 = [1, 2], arr2 = [3, 4];
      let newArr = arr1.concat(arr2); // newArr 现在是 [1, 2, 3, 4]
      ```
   - `slice`：返回数组的一部分，并不会修改原数组。
      ```js
      let arr = [1, 2, 3, 4];
      let newArr = arr.slice(1, 3); // newArr 现在是 [2, 3]
      ```   
   - `reverse`：反转数组中元素的顺序，并返回原数组。
      ```js
      let arr = [1, 2, 3];
      arr.reverse(); // arr 现在是 [3, 2, 1]
      ```
   - `sort`：对数组元素进行排序，默认按照转换为字符串后的字典顺序。
      ```js
      let arr = [3, 1, 2];
      arr.sort(); // arr 现在是 [1, 2, 3] （默认按字符串比较）
      arr.sort((a, b) => a - b); // 数字排序
      ```
   - `fill`：用指定的值填充数组的一部分或全部。
      ```js
      let arr = [1, 2, 3, 4];
      arr.fill(0); // arr 现在是 [0, 0, 0, 0]
      ```

2. 查询方法：
   - `indexOf`/`lastIndexOf`：返回数组中第一个匹配项的索引或最后一个匹配项的索引。
      ```js
      let arr = [1, 2, 3, 2];
      arr.indexOf(2); // 返回 1
      arr.lastIndexOf(2); // 返回 3
      ```
   - `includes`：检查数组是否包含某个元素。
      ```js
      let arr = [1, 2, 3];
      arr.includes(2); // 返回 true
      ```

3. 迭代方法：
   - `forEach`：对数组中的每个元素执行一个方法。
      ```js
      let arr = [1, 2, 3];
      arr.forEach(item => console.log(item));
      ```
   - `map`：创建一个新数组，其结果是该数组中的每个元素执行方法的结果。
      ```js
      let arr = [1, 2, 3];
      let newArr = arr.map(item => item * 2); // newArr 现在是 [2, 4, 6]
      ```
   - `filter`：创建一个新数组，其结果是该数组中满足条件的元素。
      ```js
      let arr = [1, 2, 3, 4];
      let even = arr.filter(item => item % 2 === 0); // even 现在是 [2, 4]
      ```
   - `reduce`/`reduceRight`：对数组中的每个元素执行方法，将其结果汇总为单个值。
      ```js
      let arr = [1, 2, 3, 4];
      let sum = arr.reduce((acc, cur) => acc + cur, 0); // sum 现在是 10
      ```
   - `some`/`every`：`some` 检查数组中是否有至少一个元素满足条件；`every` 检查数组中的所有元素是否都满足条件。
      ```js
      let arr = [1, 2, 3, 4];
      arr.some(item => item > 2); // 返回 true
      arr.every(item => item < 5); // 返回 true
      ```

### 10. 数组与字符串的转换方法
1. 字符串转数组：
   - `split`：用于将字符串分割成字符串数组，第一个参数是分隔符，可以是字符串或正则表达式。
      ```js
      let str = "hello world";
      let arr = str.split(" "); // ["hello", "world"]
      ```
   - 扩展运算符`...`
      ```js
      let str = "hello";
      let arr = [...str]; // ["h", "e", "l", "l", "o"]
      ```
   - `Array.from`：用于将类数组对象或可迭代对象转换为数组。
      ```js
      let str = "hello";
      let arr = Array.from(str); // ["h", "e", "l", "l", "o"]
      ```

2. 数组转字符串：
   - `join`：用于将数组的所有元素连接成一个字符串，第一个参数是连接符，默认为空字符串。
      ```js
      let arr = ["hello", "world"];
      let str = arr.join(" "); // "hello world"
      ```
   - `toString`：用于将数组转换为逗号分隔的字符串。
      ```js
      let arr = ["hello", "world"];
      let str = arr.toString(); // "hello,world"
      ```

### 11. for in和for of的区别
- 时间点不同：for in 在js出现之初就有，for of出现在ES6之后
- 遍历的内容不同：for in用于遍历对象的可枚举属性(包括原型链上的可枚举属性)，for of用于遍历可迭代对象的值
- for-in 循环适用于遍历对象，包括普通对象、数组、函数等，而 for-of 循环适用于遍历可迭代对象，包括数组、字符串、Map、Set、TypedArray 等。
- for-in 循环的迭代顺序是不确定的，因为对象的属性没有固定的顺序。而 for-of 循环的迭代顺序是确定的，因为可迭代对象的值是按照一定顺序排列的。
- for-in 循环遍历对象时，会遍历对象的原型链，并且会包含从原型链继承的属性。而 for-of 循环遍历的对象是可迭代对象，它们的值是可枚举的。
```js
// for in
const arr = ['a','b','c','d']
for(const index in arr) {
  console.log(index) 
}
// 打印结果：'0' '1' '2' '3'，可以发现打印的是数组的下标，数组是特殊的对象，下标是数组对象身上的可枚举属性，打印的就是这个可枚举属性

// for of
for(const item of arr) {
  console.log(item)
}
// 打印结果：'a' 'b' 'c' 'd'，for of打印的就是数组里的每一项元素的值
```
> 总结：for of遍历键值对的值，for in 遍历键值对的键。