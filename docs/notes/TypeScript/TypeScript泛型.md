---
title: TypeScript泛型
author: 怡然
createTime: 2024/11/06 16:14:38
permalink: /TypeScript/ao43k0gd/
---

## 1. 简介
- 泛型的特点就是带有“类型参数”（type parameter）。
```ts 
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```
> 上面示例中，函数`getFirst()`的函数名后面尖括号的部分`<T>`，就是类型参数，参数要放在一对尖括号（`<>`）里面。本例只有一个类型参数`T`，可以将其理解为类型声明需要的变量，需要在调用时传入具体的参数类型。
>
> 上例的函数`getFirst()`的参数类型是`T[]`，返回值类型是`T`，就清楚地表示了两者之间的关系。比如，输入的参数类型是`number[]`，那么 `T` 的值就是`number`，因此返回值类型也是`number`。

- 函数调用时，需要提供类型参数。
```ts
getFirst<number>([1, 2, 3]);
```
> 上面示例中，调用函数`getFirst()`时，需要在函数名后面使用尖括号，给出类型参数T的值，本例是`<number>`。

- 为了方便，函数调用时，往往省略不写类型参数的值，让 `TypeScript` 自己推断。
```ts
getFirst([1, 2, 3]);
```

- 有些复杂的使用场景，`TypeScript` 可能推断不出类型参数的值，这时就必须显式给出了。
```ts
function comb<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
comb([1, 2], ["a", "b"]); // 报错
comb<number | string>([1, 2], ["a", "b"]); // 正确
```
> 上面示例中，类型参数是一个联合类型，使得两个参数都符合类型参数，就不报错了。这种情况下，类型参数是不能省略不写的。

- 类型参数的名字，可以随便取，但是必须为合法的标识符。习惯上，类型参数的第一个字符往往采用大写字母。一般会使用`T`（`type` 的第一个字母）作为类型参数的名字。如果有多个类型参数，则使用 `T` 后面的 `U`、`V` 等字母命名，各个参数之间使用逗号（“`,`”）分隔。
```ts
function map<T, U>(arr: T[], f: (arg: T) => U): U[] {
  return arr.map(f);
}

// 用法实例
map<string, number>(["1", "2", "3"], (n) => parseInt(n)); // 返回 [1, 2, 3]
```

::: info 注意
总之，泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。
:::

## 2. 泛型的写法
### 2.1 函数的泛型写法
- `function`关键字定义的函数写法：
```ts
function id<T>(arg: T): T {
  return arg;
}
```

- 变量形式定义的函数
```ts
// 写法一
let myId: <T>(arg: T) => T = id;

// 写法二
let myId: { <T>(arg: T): T } = id;
```

### 2.2 接口的泛型写法
```ts
// 第一种写法
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;

// 第二种写法
interface Fn {
  <Type>(arg: Type): Type;
}

function id<Type>(arg: Type): Type {
  return arg;
}

let myId: Fn = id; 
```

### 2.3 类的泛型写法
- 泛型类的类型参数写在类名后面。
```ts
class Pair<K, V> {
  key: K;
  value: V;
}
```

- 下面是继承泛型类的例子。
```ts
class A<T> {
  value: T;
}

class B extends A<any> {}
```
> 上面示例中，类`A`有一个类型参数`T`，使用时必须给出`T`的类型，所以类B继承时要写成`A<any>`。

- 泛型也可以用在类表达式。
```ts
const Container = class<T> {
  constructor(private readonly data: T) {}
};

const a = new Container<boolean>(true);
const b = new Container<number>(0);
```

- `JavaScript` 的类本质上是一个构造函数，因此也可以把泛型类写成构造函数。
```ts
type MyClass<T> = new (...args: any[]) => T;

// 或者
interface MyClass<T> {
  new (...args: any[]): T;
}

// 用法实例
function createInstance<T>(AnyClass: MyClass<T>, ...args: any[]): T {
  return new AnyClass(...args);
}
```

- 泛型类描述的是类的实例，不包括静态属性和静态方法，因为这两者定义在类的本身。因此，它们不能引用类型参数。
```ts
class C<T> {
  static data: T; // 报错
  constructor(public value: T) {}
}
```

### 2.4 类型别名的泛型写法
- `type` 命令定义的类型别名，也可以使用泛型。
```ts
type Nullable<T> = T | undefined | null;
```

## 3. 类型参数的默认值
- 类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。
```ts
function getFirst<T = string>(arr: T[]): T {
  return arr[0];
}
```
> 上面示例中，`T = string`表示类型参数的默认值是`string`。调用`getFirst()`时，如果不给出`T`的值，`TypeScript` 就认为`T`等于`string`。

- 但是，因为 `TypeScript` 会从实际参数推断出`T`的值，从而覆盖掉默认值，所以下面的代码不会报错。
```ts
getFirst([1, 2, 3]); // 正确
```

- 类型参数的默认值，往往用在类中。
```ts
class Generic<T = string> {
  list: T[] = [];

  add(t: T) {
    this.list.push(t);
  }
}
```

- 一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。
```ts
<T = boolean, U> // 错误

<T, U = boolean> // 正确
```

## 4. 数组的泛型表示
- `Array`是 `TypeScript` 原生的一个类型接口，`T`是它的类型参数。声明数组时，需要提供`T`的值。
```ts
let arr: Array<number> = [1, 2, 3];
```
- 在 `TypeScript` 内部，数组类型的另一种写法`number[]`、`string[]`，只是`Array<number>`、`Array<string>`的简写形式。

- 在 `TypeScript` 内部，`Array`是一个泛型接口，类型定义基本是下面的样子。
```ts
interface Array<Type> {
  length: number;

  pop(): Type | undefined;

  push(...items: Type[]): number;

  // ...
}
```
> 上面代码中，`push()`方法的参数`item`的类型是`Type[]`，跟`Array()`的参数类型`Type`保持一致，表示只能添加同类型的成员。调用`push()`的时候，`TypeScript` 就会检查两者是否一致。

- 其他的 `TypeScript` 内部数据结构，比如`Map`、`Set`和`Promise`，其实也是泛型接口，完整的写法是`Map<K, V>`、`Set<T>`和`Promise<T>`。
- `TypeScript` 默认还提供一个`ReadonlyArray<T>`接口，表示只读数组。

## 5. 类型参数的约束条件
- 很多类型参数并不是无限制的，对于传入的类型存在约束条件。
```ts
function comp<Type>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}
```
> 上面示例中，类型参数 `Type` 有一个隐藏的约束条件：它必须存在`length`属性。如果不满足这个条件，就会报错。

- `TypeScript` 提供了一种语法，允许在类型参数上面写明约束条件，如果不满足条件，编译时就会报错。这样也可以有良好的语义，对类型参数进行说明。
```ts
function comp<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}
```
> 上面示例中，`T extends { length: number }`就是约束条件，表示类型参数 `T` 必须满足`{ length: number }`，否则就会报错。

- 类型参数的约束条件采用下面的形式：`TypeParameter`表示类型参数，`extends`是关键字，这是必须的，`ConstraintType`表示类型参数要满足的条件，即类型参数应该是`ConstraintType`的子类型。
```ts
<TypeParameter extends ConstraintType>
```

- 类型参数可以同时设置约束条件和默认值，前提是默认值必须满足约束条件。
```ts
type Fn<A extends string, B extends string = "world"> = [A, B];

type Result = Fn<"hello">; // ["hello", "world"]
```

- 如果有多个类型参数，一个类型参数的约束条件，可以引用其他参数。
```ts
<T, U extends T>
// 或者
<T extends U, U>
```

- 约束条件不能引用类型参数自身。
```ts
<T extends T>               // 报错
<T extends U, U extends T>  // 报错
```

- 多个类型参数也不能互相约束（即`T`的约束条件是`U`、`U`的约束条件是`T`），因为互相约束就意味着约束条件就是类型参数自身。

## 6. 使用注意点
- 尽量少用泛型：一般来说，只要使用了泛型，类型声明通常都不太易读，容易写得很复杂。因此，可以不用泛型就不要用。
- 类型参数越少越好。
- 类型参数需要出现两次。如果类型参数在定义后只出现一次，那么很可能是不必要的。
- 泛型可以嵌套。