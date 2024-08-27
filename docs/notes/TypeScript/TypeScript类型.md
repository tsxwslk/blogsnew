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
> - 五种包装对象之中，`symbol` 类型和 `bigint` 类型无法直接获取它们的包装对象（***即`Symbol()`和`BigInt()`不能作为构造函数使用***），但是剩下三种可以（`boolean`、`string`、`number`）。
>
> - `String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

```js
"hello"; // 字面量
new String("hello"); // 包装对象
```

### 5.2 包装对象类型与字面量类型
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

## 7. 值类型
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