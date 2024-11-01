---
title: TypeScript的interface接口
author: 怡然
createTime: 2024/11/01 10:43:20
permalink: /TypeScript/ws5v4gpu/
---

### 1. 简介
- `interface` 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构。
```ts
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```
> 上面示例中，定义了一个接口`Person`，它指定一个对象模板，拥有三个属性`firstName`、`lastName`和`age`。任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型。

- 方括号运算符可以取出 `interface` 某个属性的类型。
```ts
interface Foo {
  a: string;
}

type A = Foo["a"]; // string
```

- `interface` 可以表示对象的各种语法，它的成员有 5 种形式。
- - 对象属性
- - 对象的属性索引
- - 对象方法
- - 函数
- - 构造函数

（1） 对象属性
- 如果属性是只读的，需要加上`readonly`修饰符。
```ts
interface A {
  readonly a: string;
}
```

（2） 对象的属性索引
- 属性索引共有`string`、`number`和`symbol`三种类型。
- 属性的数值索引，其实是指定数组的类型。
- 一个接口中最多只能定义一个数值索引。数值索引会约束所有名称为数值的属性。
- 如果一个 `interface` 同时定义了字符串索引和数值索引，那么数值索引必须服从于字符串索引。因为在 `JavaScript` 中，数值属性名最终是自动转换成字符串属性名。
- 数值索引必须兼容字符串索引的类型声明。
```ts
interface A {
  [prop: string]: number;
}
```
```ts
interface A {
  [prop: number]: string;
}

const obj: A = ["a", "b", "c"];
```
```ts
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错
}

interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确
}
```

（3）对象的方法
```ts
// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string;
}

// 写法三
interface C {
  f: { (x: boolean): string };
}
```

- `interface` 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
```ts
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === "boolean" && y === undefined) return true;
  if (typeof x === "string" && typeof y === "string") return "hello";
  throw new Error("wrong parameters");
}

const a: A = {
  f: MyFunc,
};
```
> 上面示例中，接口`A`的方法`f()`有函数重载，需要额外定义一个函数`MyFunc()`实现这个重载，然后部署接口`A`的对象`a`的属性`f`等于函数`MyFunc()`就可以了。

（4）函数
- `interface` 也可以用来声明独立的函数。
```ts
interface Add {
  (x: number, y: number): number;
}

const myAdd: Add = (x, y) => x + y;
```

（5）构造函数
- `interface` 内部可以使用`new`关键字，表示构造函数。
```ts
interface ErrorConstructor {
  new (message?: string): Error;
}
```

### 2. `interface`的继承
继承有以下几种情况：
#### 2.1 `interface` 继承 `interface`
- `interface` 可以使用`extends`关键字，继承其他 `interface`。
```ts
interface Shape {
  name: string;
}

interface Circle extends Shape {
  radius: number;
}
```