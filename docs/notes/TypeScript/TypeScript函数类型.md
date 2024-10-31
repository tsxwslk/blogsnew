---
title: TypeScript函数类型
author: 怡然
createTime: 2024/10/30 10:40:23
permalink: /TypeScript/ekjpn4p3/
---

### 1. 简介
- 函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。返回值的类型通常可以不写，因为 `TypeScript` 自己会推断出来。
```ts
function hello(txt: string): void {
  console.log("hello " + txt);
}
// 参数txt的类型（string）
// void类型表示没有返回值
```

- 如果变量被赋值为一个函数，变量的类型有两种写法。
```ts
// 写法一
const hello = function (txt: string) {
  console.log("hello " + txt);
};

// 写法二
const hello: (txt: string) => void = function (txt) { //函数的参数要放在圆括号里面，不放会报错 
  //类型里面的参数名（本例是txt）是必须的
  console.log("hello " + txt);
};
```

- 如果函数的类型定义很冗长，或者多个函数使用同一种类型，可以用type命令为函数类型定义一个别名，便于指定给其他变量。
```ts
type MyFunc = (txt: string) => void;

const hello: MyFunc = function (txt) {
  console.log("hello " + txt);
};
```

- 函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于。
- 如果一个变量要套用另一个函数类型，可以使用typeof运算符。
```ts
function add(x: number, y: number) {
  return x + y;
}

const myAdd: typeof add = function (x, y) {
  return x + y;
};
```

- 函数类型还可以采用对象的写法。常用在函数本身存在属性的场合。
```ts
// {
//   (参数列表): 返回值
// }
let add: {
  (x: number, y: number): number;
};

add = function (x, y) {
  return x + y;
};
```
```ts
function f(x: number) {
  console.log(x);
}

f.version = "1.0";
// 可写成以下模式
let foo: {
  (x: number): void;
  version: string;
} = f;
```

- 函数类型也可以使用 `Interface` 来声明
```ts
interface myfn {
  (a: number, b: number): number;
}

var add: myfn = (a, b) => a + b;
```

### 2. Function类型
- `TypeScript` 提供 `Function` 类型表示函数，任何函数都属于这个类型。
- `Function` 类型的函数可以接受任意数量的参数，每个参数的类型都是`any`，返回值的类型也是`any`，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。
```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

### 3. 箭头函数
- 箭头函数的类型写法与普通函数类似
```ts
const repeat = (str: string, times: number): string => str.repeat(times);
```

- 类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同。
```ts
function greet(fn: (a: string) => void): void {
  fn("world");
}
```

```ts
type Person = { name: string };

const people = ["alice", "bob", "jan"].map((name): Person => ({ name }));
```
- 上面示例中，`Person`是一个类型别名，代表一个对象，该对象有属性`name`。变量`people`是数组的`map()`方法的返回值。
- `map()`方法的参数是一个箭头函数`(name):Person => ({name})`，该箭头函数的参数`name`的类型省略了，因为可以从`map()`的类型定义推断出来，箭头函数的返回值类型为`Person`。相应地，变量`people`的类型是`Person[]`。
- 至于箭头后面的`({name})`，表示返回一个对象，该对象有一个属性`name`，它的属性值为变量`name`的值。这里的圆括号是必须的，否则`(name):Person => {name}`的大括号表示函数体，即函数体内有一行语句`name`，同时由于没有`return`语句，这个函数不会返回任何值。

### 4. 可选参数
- 如果函数的某个参数可以省略，则在参数名后面加问号表示。
- 参数名带有问号，表示该参数的类型实际上是原始类型`|undefined`，它有可能为`undefined`。
- 类型显式设为`undefined`的参数，就不能省略。
```ts
function f(x?: number) { //实际上是number|undefined
  // ...
}

f(); // 正确
f(10); // 正确
f(undefined); // 正确
```

- 函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。
- 如果前部参数有可能为空，这时只能显式注明该参数类型可能为`undefined`。
```ts
let myFunc: (a: number | undefined, b: number) => number;
```

- 函数体内部用到可选参数时，需要判断该参数是否为`undefined`。
```ts
let myFunc: (a: number, b?: number) => number;

myFunc = function (x, y) {
  if (y === undefined) {
    return x;
  }
  return x + y;
};
```

### 5. 参数默认值
- 写法与JS一致，设置了默认值的参数为可选参数，不传入该参数的时候，等于默认值。
```ts
function createPoint(x: number = 0, y: number = 0): [number, number] {
  return [x, y];
}

createPoint(); // [0, 0]
```

- 可选参数与默认值不能同时使用。
```ts
// 报错
function f(x?: number = 0) {
  // ...
}
```

- 设有默认值的参数，如果传入`undefined`，也会触发默认值。
```ts
function f(x = 456) {
  return x;
}

f2(undefined); // 456
```

### 6. 参数解构
```ts
function f([x, y]: [number, number]) {
  // ...
}

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
// 参数结构可以结合类型别名（type 命令）一起使用
type ABC = { a: number; b: number; c: number };

function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

### 7. `rest`参数
- `rest` 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。
```ts
// rest 参数为数组
function joinNumbers(...nums: number[]) {
  // ...
}

// rest 参数为元组  元组需要声明每一个剩余参数的类型
function f(...args: [boolean, number]) {
  // ...
}
```

- 如果元组里面的参数是可选的，则要使用可选参数。
```ts
function f(...args: [boolean, string?]) {}
```

- `rest`参数可以嵌套。
- `rest`参数可以与变量解构结合使用。
```ts
// 嵌套
function f(...args: [boolean, ...string[]]) {
  // ...
}
// 解构
function repeat(...[str, times]: [string, number]): string {
  return str.repeat(times);
}

// 等同于
function repeat(str: string, times: number): string {
  return str.repeat(times);
}
```

### 8. `readonly`只读参数
- 如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上`readonly`关键字，表示这是只读参数。
```ts
function arraySum(arr: readonly number[]) {
  // ...
  arr[0] = 0; // 报错
}
```

### 9. `void`类型
- `void` 类型表示函数没有返回值。
- `void` 类型允许返回`undefined`或`null`。
- 如果打开了`strictNullChecks`编译选项，那么 `void` 类型只允许返回`undefined`。如果返回`null`，就会报错。这是因为 `JavaScript` 规定，如果函数没有返回值，就等同于返回`undefined`。
- 如果变量、对象方法、函数参数的类型是 `void` 类型的函数，那么并不代表不能赋值为有返回值的函数。该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。
```ts
type voidFunc = () => void;

const f: voidFunc = () => {
  return 123;
};
// TypeScript 认为，这里的 void 类型只是表示该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。
// 只要不用到这里的返回值，就不会报错。
// 如果后面使用了这个函数的返回值，就违反了约定，则会报错。
type voidFunc = () => void;

const f: voidFunc = () => {
  return 123;
};

f() * 2; // 报错
```

- 下面示例中，`push()`有返回值，表示新插入的元素在数组里面的位置。但是，对于`forEach()`方法来说，这个返回值是没有作用的，根本用不到，所以 `TypeScript` 不会报错。
```ts
const src = [1, 2, 3];
const ret = [];

src.forEach((el) => ret.push(el));
```

### 10. `never`类型
- `never`类型表示肯定不会出现的值，他用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
- 1. 抛出错误函数
  ```ts
  function fail(msg: string): never {
    throw new Error(msg);
  }
  ```
- 2. 无限执行的函数
  ```ts
  const sing = function (): never {
    while (true) {
      console.log("sing");
    }
  };
  ```

::: info 注意
`never`类型不同于`void`类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回`undefined`。
:::

### 11. 局部类型
- 函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型。
```ts
function hello(txt: string) {
  type message = string;
  let newTxt: message = "hello " + txt;
  return newTxt;
}

const newTxt: message = hello("world"); // 报错
``` 

### 12. 高阶函数
- 一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。
```ts
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

### 13. 函数重载
- 有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。
```JavaScript
reverse("abc"); // 'cba'
reverse([1, 2, 3]); // [3, 2, 1]
// reverse函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。
```

- `TypeScript` 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。
```ts
function reverse(str: string): string;
function reverse(arr: any[]): any[];
function reverse(stringOrArray: string | any[]): string | any[] {
  if (typeof stringOrArray === "string")
    return stringOrArray.split("").reverse().join("");
  else return stringOrArray.slice().reverse();
}
```

- 重载声明的排序很重要，因为 `TypeScript` 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。
```ts
function f(x: any): number;
function f(x: string): 0 | 1;
function f(x: any): any {
  // ...
}

const a: 0 | 1 = f("hi"); // 报错
```

- 由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载。

### 14. 构造函数
- 构造函数的最大特点，就是必须使用`new`命令调用。
```ts
const d = new Date();
```

- 构造函数的类型写法，就是在参数列表前面加上`new`命令。
```ts
class Animal {
  numLegs: number = 4;
}

type AnimalConstructor = new () => Animal;

function create(c: AnimalConstructor): Animal {
  return new c();
}

const a = create(Animal);
```

- 构造函数还有另一种类型写法，就是采用对象形式。
```ts
type F = {
  new (s: string): object;
};
```

- 某些函数既是构造函数，又可以当作普通函数使用，比如`Date()`。这时，类型声明可以写成下面这样。
```ts
type F = {
  new (s: string): object;
  (n?: number): number;
};
```