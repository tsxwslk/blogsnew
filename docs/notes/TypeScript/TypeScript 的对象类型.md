---
title: TypeScript 的对象类型
author: 怡然
createTime: 2024/10/31 15:11:09
permalink: /TypeScript/lfdbyqwg/
---

### 1. 简介
- 对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。
```ts
const obj: {
  x: number;
  y: number;
} = { x: 1, y: 1 };
```

- 一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。
- 读写不存在的属性也会报错。
- 不能删除类型声明中存在的属性，修改属性值是可以的。
- 对象的方法使用函数类型描述。
```ts
const obj: {
  x: number;
  y: number;
  add(x: number, y: number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) {
    return x + y;
  },
};
```

- 对象类型可以使用方括号读取属性的类型。
```ts
type User = {
  name: string;
  age: number;
};
type Name = User["name"]; // string
```

- `interface`命令，可以把对象类型提炼为一个接口。
```ts
// 写法一
type MyObj = {
  x: number;
  y: number;
};

const obj: MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}

const obj: MyObj = { x: 1, y: 1 };
```

- `TypeScript` 不区分对象自身的属性和继承的属性，一律视为对象的属性。
```ts
interface MyInterface {
  toString(): string; // 继承的属性
  prop: number; // 自身的属性
}

const obj: MyInterface = {
  // 正确
  prop: 123,
};
```

### 2. 可选属性
- 如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。
```ts
const obj: {
  x: number;
  y?: number;
} = { x: 1 };
```

- 可选属性等同于允许赋值为`undefined`，下面两种写法是等效的。
```ts
type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName: string | undefined;
};
```

- 读取可选属性之前，必须检查一下是否为`undefined`。
```ts
const user: {
  firstName: string;
  lastName?: string;
} = { firstName: "Foo" };
// 写法一
let firstName = user.firstName === undefined ? "Foo" : user.firstName;
let lastName = user.lastName === undefined ? "Bar" : user.lastName;

// 写法二
let firstName = user.firstName ?? "Foo";
let lastName = user.lastName ?? "Bar";
```

### 3. 只读属性
- 属性名前面加上`readonly`关键字，表示这个属性是只读属性，不能修改。
```ts
const person: {
  readonly age: number;
} = { age: 20 };

person.age = 21; // 报错
```

- 如果属性值是一个对象，`readonly`修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。
```ts
interface Home {
  readonly resident: {
    name: string;
    age: number;
  };
}

const h: Home = {
  resident: {
    name: "Vicky",
    age: 42,
  },
};

h.resident.age = 32; // 正确
h.resident = {
  name: "Kate",
  age: 23,
}; // 报错
```

- 如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。
```ts
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let w: Person = {
  name: "Vicky",
  age: 42,
};

let r: ReadonlyPerson = w;

w.age += 1;
r.age; // 43
```

- 如果希望属性值是只读的，除了声明时加上`readonly`关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言`as const`。
```ts
const myUser = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 报错
```

- 如果变量明确地声明了类型，那么 `TypeScript` 会以声明的类型为准。
```ts
const myUser: { name: string } = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 正确
```

### 4. 属性名的索引类型
- `TypeScript` 允许采用属性名表达式的写法来描述类型，称为“属性名的索引类型”。
```ts
type MyObj = {
  [property: string]: string;
};

const obj: MyObj = {
  foo: "a",
  bar: "b",
  baz: "c",
};
```
> 上面示例中，类型`MyObj`的属性名类型就采用了表达式形式，写在方括号里面。`[property: string]`的`property`表示属性名，这个是可以随便起的，它的类型是`string`，即属性名类型为`string`。也就是说，不管这个对象有多少属性，只要属性名为字符串，且属性值也是字符串，就符合这个类型声明。

- `JavaScript` 对象的属性名（即上例的`property`）的类型有三种可能，除了上例的`string`，还有`number`和`symbol`。
```ts
type T1 = {
  [property: number]: string;
};

type T2 = {
  [property: symbol]: string;
};
```

- 对象可以同时有多种类型的属性名索引，比如同时有数值索引和字符串索引。但是，数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在 `JavaScript` 语言内部，所有的数值属性名都会自动转为字符串属性名。
```ts
type MyType = {
  [x: number]: boolean; // 报错
  [x: string]: string;
};
```

- 可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名符合属性名索引的范围，两者不能有冲突，否则报错。
```ts
type MyType = {
  foo: boolean; // 报错
  [x: string]: string;
};
```

### 5. 解构赋值
- 解构赋值的类型写法，跟为对象声明类型是一样的。
```ts
const {
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
} = product;
```