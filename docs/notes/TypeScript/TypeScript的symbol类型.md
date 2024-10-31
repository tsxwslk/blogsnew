---
title: TypeScript的symbol类型
author: 怡然
createTime: 2024/10/30 09:25:09
permalink: /TypeScript/cvewq51g/
---

### 1. 简介
- `Symbol` 是 `ES2015` 新引入的一种原始类型的值。它类似于字符串，但是每一个 `Symbol` 值都是独一无二的，与其他任何值都不相等。
```ts
let x: symbol = Symbol();
let y: symbol = Symbol();

x === y; // false
```

### 2. `unique symbol`
- `symbol`类型包含所有的 `Symbol` 值，但是无法表示某一个具体的 `Symbol` 值。
- `Symbol` 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 `Symbol` 值的那种值类型。
- `TypeScript` 设计了`symbol`的一个子类型`unique symbol`，它表示单个的、某个具体的 `Symbol` 值。
- 因为`unique symbol`表示单个值，所以这个类型的变量是不能修改值的，只能用`const`命令声明，不能用`let`声明。
```ts
// 正确
const x: unique symbol = Symbol();

// 报错
let y: unique symbol = Symbol();
```

- `const`命令为变量赋值 `Symbol` 值时，变量类型默认就是`unique symbol`，所以类型可以省略不写。
```ts
const x: unique symbol = Symbol();
// 等同于
const x = Symbol();
```

- `unique symbol` 类型是 `symbol` 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行。
- `unique symbol` 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 `Symbol` 值当作属性名，那么它的类型只能是 `unique symbol`，不能是 `symbol`。
```ts
const x: unique symbol = Symbol();
const y: symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}
```

- `unique symbol`类型也可以用作类（`class`）的属性值，但只能赋值给类的`readonly static`属性。
```ts
class C {
  static readonly foo: unique symbol = Symbol();
}
```

### 3. 类型推断
- 如果变量声明时没有给出类型，`TypeScript` 会推断某个 `Symbol` 值变量的类型。
- `let`命令声明的变量，推断类型为 `symbol`。
- `const`声明的变量，推断类型为`unique symbol`。
```ts
// 类型为 symbol
let x = Symbol();

// 类型为 unique symbol
const x = Symbol();
```

- `const`声明的变量，如果被赋值为另一个`symbol`类型的变量，则推断类型为`symbol`。
```ts
let x = Symbol();

// 类型为 symbol
const y = x;
```

- `let`声明的变量，如果被赋值为另一个`unique symbol`类型的变量，则推断类型还是`symbol`。
```ts
const x = Symbol();

// 类型为 symbol
let y = x;
```