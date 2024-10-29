---
title: TypeScript数组
author: 怡然
createTime: 2024/10/29 11:22:31
permalink: /TypeScript/1bht1am4/
---

## 一、数组
### 1. 简介
> ts数组有一个基本特征，所有成员的类型必须相同，但是数量是不确定的。
> ts中数组的写法主要有以下两种：

```ts
// 第一种
let arr: number[] = [1, 2, 3];
let arr: (number | string)[];
// 第二种写法：ts内置的Array接口，这种写法本质上属于泛型
let arr: Array<number> = [1, 2, 3];
let arr: Array<number | string>;
```

- `TypeScript` 允许使用方括号读取数组成员的类型。

```ts
type Names = string[];
type Name = Names[0]; // string    
// 类型Names是字符串数组，那么Names[0]返回的类型就是string。
type Name = Names[number]; // string   
// Names[number]表示数组Names所有数值索引的成员类型，所以返回string。
```

### 2. 数组的类型推断
- 数组若没有声明类型，ts会根据数组成员类型推断。若初始值为空数组，则会推断为`any[]`。
- 类型推断的自动更新只发生初始值为空数组的情况。
```ts
const arr = [];
arr; // 推断为 any[]

arr.push(123);
arr; // 推断类型为 number[]

arr.push("abc");
arr; // 推断类型为 (string|number)[]
```

### 3. 只读数组，`const` 断言
- js中允许修改const声明的数组成员，ts允许声明只读数组，方法是在数组类型前面加上`readonly`关键字。
```ts
const arr: readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错
```

- `readonly`关键字不能与数组的泛型写法一起使用。
- `TypeScript` 提供了两个专门的泛型，用来生成只读数组的类型。
```ts
const a1: ReadonlyArray<number> = [0, 1];

const a2: Readonly<number[]> = [0, 1];
```

- 只读数组还有一种声明方法，就是使用`const`断言。
```ts
const arr = [0, 1] as const;

arr[0] = [2]; // 报错
```

### 4. 多维数组
- `TypeScript` 使用`T[][]`的形式，表示二维数组，T是最底层数组成员的类型。
```ts
var multi: number[][] = [
  [1, 2, 3],
  [23, 24, 25],
];
```

## 二、元组
### 1. 简介

> 元组（tuple）是 `TypeScript` 特有的数据类型，表示成员类型可以自由设置的数组。
>
> 元组必须声明每个成员的类型。

```ts
const s: [string, string, boolean] = ["a", "b", true];
```

- 元组类型的写法，与数组有一个重大差异。数组的成员类型写在方括号外面（`number[]`），元组的成员类型是写在方括号里面（`[number]`）。
- 元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的。
- 问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。
```ts
let a: [number, number?] = [1];
```

- 使用扩展运算符（`...`），可以表示不限成员数量的元组。
```ts
type NamedNums = [string, ...number[]];

const a: NamedNums = ["A", 1, 2];
const b: NamedNums = ["B", 1, 2, 3];
```

- 由于元组的成员都是数值索引，即索引类型都是`number`
```ts
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // string|number|Date 这个类型是三种值的联合类型。
```

### 2. 只读元组
- 元组也可以是只读的，不允许修改，有两种写法。
```ts
// 写法一
type t = readonly [number, string];

// 写法二
type t = Readonly<[number, string]>;
```

- 跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。
```ts
type t1 = readonly [number, number];
type t2 = [number, number];

let x: t2 = [1, 2];
let y: t1 = x; // 正确

x = y; // 报错
```

### 3. 成员数量的推断
- 如果没有可选成员和扩展运算符，`TypeScript` 会推断出元组的成员数量（即元组长度）。
```ts
function f(point: [number, number]) {
  if (point.length === 3) {
    // 报错
    // TypeScript 发现元组point的长度是2，不可能等于3，这个判断无意义
  }
}
```

### 4. 扩展运算符与成员数量
- 如果函数调用时，使用扩展运算符传入函数参数，由于ts认为这个序列的成员数量是不确定的，所以会报参数数量与数组长度不匹配的错。
- 解决此问题可以使用成员数量确定的元组
```ts
const arr = [1, 2];

function add(x: number, y: number) {
  // ...
}

add(...arr); // 报错
```

```ts
const arr: [number, number] = [1, 2];

function add(x: number, y: number) {
  // ...
}

add(...arr); // 正确
```