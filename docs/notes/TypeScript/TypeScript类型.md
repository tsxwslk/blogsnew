---
title: TypeScript类型
author: 怡然
createTime: 2024/08/21 16:38:54
permalink: /TypeScript/8e6kvap9/
---

## 1. `any`类型
### 1.1 基本含义
- `any` 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。
- 变量类型一旦设为`any`，`TypeScript` 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错。
```ts
let x: any;

x = 1; // 正确
x = "foo"; // 正确
x = true; // 正确
```

### 1.2 类型推断问题
- 对于开发者没有指定类型、`TypeScript` 必须自己推断类型的那些变量，如果无法推断出类型，`TypeScript` 就会认为该变量的类型是`any`。
- `TypeScript` 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会报错。
- 即使打开了`noImplicitAny`，使用`let`和`var`命令声明变量，但不赋值也不指定类型，是不会报错的。由于这个原因，建议使用`let`和`var`声明变量时，如果不赋值，就一定要显式声明类型，否则可能存在安全隐患。
- `const`命令没有这个问题，因为 `JavaScript` 语言规定`const`声明变量时，必须同时进行初始化（赋值）。

### 1.3 污染问题
- `any`类型除了关闭类型检查，还会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。

## 2. `unknown`类型
- `unknown`跟`any`的相似之处，在于所有类型的值都可以分配给`unknown`类型。
```ts
let x: unknown;

x = true; // 正确
x = 42; // 正确
x = "Hello World"; // 正确
```

- `unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）。
```ts
let v: unknown = 123;

let v1: boolean = v; // 报错
let v2: number = v; // 报错
```

- 不能直接调用`unknown`类型变量的方法和属性。
```ts
let v1: unknown = { foo: 123 };
v1.foo; // 报错

let v2: unknown = "hello";
v2.trim(); // 报错

let v3: unknown = (n = 0) => n + 1;
v3(); // 报错
```

- `unknown`类型变量能够进行的运算是有限的，只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。
```ts
let a: unknown = 1;

a + 1; // 报错
a === 1; // 正确
```

- `unknown`类型变量通过类型缩小，才可以使用。
```ts
let a: unknown = 1;

if (typeof a === "number") {
  let r = a + 10; // 正确
}
```

- 总之，`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 `TypeScript` 的顶层类型。

## 3. `never`类型
- 为了保持与集合论的对应关系，以及类型运算的完整性，`TypeScript` 还引入了“空类型”的概念，即该类型为空，不包含任何值。由于不存在任何属于“空类型”的值，所以该类型被称为`never`，即不可能有这样的值。
- `never`类型的使用场景，主要是在一些类型运算之中，保证类型运算的完整性。另外，不可能返回值的函数，返回值的类型就可以写成`never`。如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于`never`类型。
```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    x; // never 类型
  }
}
```

- `never`类型的一个重要特点是，可以赋值给任意其他类型。
```ts
function f(): never {
  throw new Error("Error");
}

let v1: number = f(); // 不报错
let v2: string = f(); // 不报错
let v3: boolean = f(); // 不报错
```

- 空集是任何集合的子集。`TypeScript` 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，`TypeScript` 把这种情况称为“底层类型”（`bottom type`）。

:::info
总之，TypeScript 有两个“顶层类型”（any和unknown），但是“底层类型”只有never唯一一个。
:::

## 4. 基本类型
### 4.1 `boolean` 类型
```ts
const x: boolean = true;
const y: boolean = false;
```

### 4.2 `string` 类型
```ts
const x: string = "hello";
const y: string = `${x} world`;
```

### 4.3 `number` 类型
```ts
const x: number = 123;
const y: number = 3.14;
const z: number = 0xffff;
```

### 4.4 `bigint` 类型
```ts
const x: bigint = 123n;
const y: bigint = 0xffffn;
```
- 注意，`bigint`类型和`number`类型不兼容

### 4.5 `symbol` 类型
```ts
const x: symbol = Symbol();
```

### 4.6 `object` 类型
- `object` 类型包含了所有对象、数组和函数。
```ts
const x: object = { foo: 123 };
const y: object = [1, 2, 3];
const z: object = (n: number) => n + 1;
```

### 4.7 `undefined` 类型，`null` 类型
- `undefined`和`null`既是值，又是类型。
- 作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为`undefined`或`null`。
- `JavaScript` 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值。
```ts
let x: undefined = undefined;
const x: null = null;
```

- 如果没有声明类型的变量，被赋值为`undefined`或`null`，它们的类型会被推断为`any`。
- `TypeScript` 提供了一个编译选项`strictNullChecks`。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了any类型和unknown类型）。
- 打开`strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。
```ts
let a = undefined; // any 
const b = undefined; // any

let c = null; // any
const d = null; // any
// 打开编译设置 strictNullChecks
let a = undefined; // undefined
const b = undefined; // undefined

let c = null; // null
const d = null; // null
```

- 

## 5. 包装对象类型
### 5.1 包装对象的概念
> - `JavaScript` 的 8 种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值（`boolean`、`string`、`number`、`bigint`、`symbol`）。五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。
>

```js
"hello".charAt(1); // 'e'
```
- 上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 `JavaScript` 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

> - 五种包装对象之中，`symbol` 类型和 `bigint` 类型无法直接获取它们的包装对象（***即`Symbol()`和`BigInt()`不能作为构造函数使用***），但是剩下三种可以（`boolean`、`string`、`number`）。
>

```js
const s = new String("hello");
typeof s; // 'object'
s.charAt(1); // 'e'
```

- 上面示例中，s就是字符串`hello`的包装对象，`typeof`运算符返回`object`，不是`string`，但是本质上它还是字符串，可以使用所有的字符串方法。

> - `String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。



### 5.2 包装对象类型与字面量类型
由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。
```js
"hello"; // 字面量
new String("hello"); // 包装对象
```
> - 为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型（`Boolean 和 boolean`，`String 和 string`，`Number 和 number`，`BigInt 和 bigint`，`Symbol 和 symbol`）。
>
> - 其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```ts
const s1: String = "hello"; // 正确
const s2: String = new String("hello"); // 正确

const s3: string = "hello"; // 正确
const s4: string = new String("hello"); // 报错
```

## 6. `Object` 类型与 `object` 类型
### 6.1 `Object` 类型
- 大写的`Object`类型代表 `JavaScript` 语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。
```ts
let obj: Object;

obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
```

- 除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。
```ts
let obj: Object;

obj = undefined; // 报错
obj = null; // 报错
```

- 空对象`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替。
```ts
let obj: {};

obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
```

### 6.2 `object` 类型
- 小写的`object`类型代表 `JavaScript` 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。
```ts
let obj: object;

obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
obj = true; // 报错
obj = "hi"; // 报错
obj = 1; // 报错
```

```ts
const o1: Object = { foo: 0 };
const o2: object = { foo: 0 };

o1.toString(); // 正确
o1.foo; // 报错

o2.toString(); // 正确
o2.foo; // 报错
```
- 上面示例中，`toString()`是对象的原生方法，可以正确访问。`foo`是自定义属性，访问就会报错。

## 7. `undefined`和`null`的特殊性
> - `undefined`和`null`作为值有一个特殊的地方，任何其他类型的变量都可以赋值为`undefined`和`null`。
> - `JavaScript` 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。所以，`TypeScript` 就允许了任何类型的变量都可以赋值为这两个值。

```ts
let age: number = 24;

age = null; // 正确
age = undefined; // 正确
```
> - `TypeScript` 提供了一个编译选项`strictNullChecks`。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）。
> - 打开`strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。
```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```
## 8. 值类型
- `TypeScript` 规定，单个值也是一种类型，称为“值类型”。
- `TypeScript` 推断类型时，遇到`const`命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。
```ts
let x: "hello";

x = "hello"; // 正确
x = "world"; // 报错
```
```ts
// x 的类型是 "https"
const x = "https";

// y 的类型是 string
const y: string = "https";
```
- 注意，`const`命令声明的变量，如果赋值为对象，并不会推断为值类型。
```ts
// x 的类型是 { foo: number }
const x = { foo: 1 };
```
- 父类型不能赋值给子类型
```ts
let x: 5 = 5; // x属于子类型
let y: number = 4 + 1; // y属于父类型

x = y; // 报错
y = x; // 正确
```

## 9. 联合类型
- 联合类型指的是多个类型组成一个新类型，使用符号`|`|表示。

```ts
let x: string | number;

x = 123; // 正确
x = "abc"; // 正确
// 上面示例中，变量x就是联合类型string|number，表示它的值既可以是字符串，也可以是数值。
```

- 联合类型可以与值类型相结合，表示一个变量的值有若干种可能。
```ts
let setting: true | false;

let gender: "male" | "female";

let rainbowColor: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";
```

- 打开编译选项`strictNullChecks`后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量确实可能存在空值，可以采用联合类型的写法。
```ts
let name: string | null;

name = "John";
name = null;
```

- 如果一个变量有多种类型，处理时往往需要类型缩小，区分该值到底属于哪一种类型，然后再进一步处理。
```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

## 10. 交叉类型
- 指多个类型组成一个新的类型，用`&`表示
- 交叉类型`A&B`表示任何一个类型必须同时属于A和B，才属于交叉类型`A&B`。
```ts
let x: number & string;
// 上面示例中，变量x同时是数值和字符串，这当然是不可能的，
// 所以 TypeScript 会认为x的类型实际是never。
```

- 交叉类型的主要用途是表示对象的合成。
- 交叉类型常常用来给对象添加新属性。
```ts
let obj: { foo: string } & { bar: string };

obj = {
  foo: "hello",
  bar: "world",
};
```

```ts
type A = { foo: number };

type B = A & { bar: number };
```

## 11. `type`命令
- `type`命令用来定义一个类型的别名。
```ts
type Age = number;

let age: Age = 55;
// 使用Age作为number类型，增加代码可读性，使复杂类型使用更方便，以便于修改变量类型。
```

- 别名不允许重名。
- 别名的作用域是块级作用域，代码块内部定义的名称影响不到外部。
```ts
type Color = "red";

if (Math.random() < 0.5) {
  type Color = "blue";
}
```

- 别名支持使用表达式，支持嵌套
```ts
type World = "world";
type Greeting = `hello ${World}`;
```

## 12. `typeof`运算符
- `TypeScript`中的`typeof`运算符，返回的不是字符串，而是该值的`TypeScript`类型。
```ts
const a = { x: 0 };

type T0 = typeof a; // { x: number }  返回变量a的 TypeScript 类型
type T1 = typeof a.x; // number   返回属性x的类型
```

- 由于编译时不会进行 `JavaScript` 的值运算，所以 `TypeScript` 规定，`typeof` 的参数只能是标识符，不能是需要运算的表达式。
```ts
type T = typeof Date(); // 报错
```

- `typeof` 命令的参数不能是类型。
```ts
type Age = number;
type MyAge = typeof Age; // 报错
```

## 13. 块级类型声明
- `TypeScript` 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。
```ts
if (true) {
  type T = number;
  let v: T = 5;
} else {
  type T = string;
  let v: T = "hello";
}
```

## 14. 类型兼容
- `TypeScript` 的类型存在兼容关系，某些类型可以兼容其他类型。
- 如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的子类型（`subtype`）。
```ts
type T = number | string;

let a: number = 1;
let b: T = a;
// 变量a和b的类型是不一样的，但是变量a赋值给变量b并不会报错。b的类型兼容a的类型。
```
```ts
let a: "hi" = "hi";
let b: string = "hello";

b = a; // 正确
a = b; // 报错
// hi是string的子类型，string是hi的父类型。所以，变量a可以赋值给变量b，但是反过来就会报错。
```