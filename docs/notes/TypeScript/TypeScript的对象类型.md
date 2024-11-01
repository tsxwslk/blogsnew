---
title: TypeScript的对象类型
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

### 6. 结构类型原则
- 只要对象 `B` 满足 对象 `A` 的结构特征，`TypeScript` 就认为对象 `B` 兼容对象 `A` 的类型，这称为“结构类型”原则（structual typing）。
```ts
const A = {
  x: number;
};

const B = {
  x: number;
  y: number;
};
// B兼容A，可以使用A的地方，就可以使用B
```

- 示例：
```ts
type myObj = {
  x: number;
  y: number;
};

function getSum(obj: myObj) {
  let sum = 0;

  for (const n of Object.keys(obj)) {
    const v = obj[n]; // 报错
    sum += Math.abs(v);
  }

  return sum;
}
```
> 函数`getSum()`要求传入参数的类型是`myObj`，但是实际上所有与`myObj`兼容的对象都可以传入。这会导致`const v = obj[n]`这一行报错，原因是`obj[n]`取出的属性值不一定是数值（`number`），使得变量v的类型被推断为`any`。如果项目设置为不允许变量类型推断为`any`，代码就会报错。

### 7. 严格字面量检查
- 如果对象使用字面量表示，会触发 `TypeScript` 的严格字面量检查（strict object literal checking）。如果字面量的结构跟类型定义的不一样（比如多出了未定义的属性），就会报错。
- 如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。
```ts
const myPoint = {
  x: 1,
  y: 1,
  z: 1,
};

const point: {
  x: number;
  y: number;
} = myPoint; // 正确
```

- 规避严格字面量检查，可以使用中间变量。
```ts
let myOptions = {
  title: "我的网页",
  darkmode: true,
};

const Obj: Options = myOptions;
```

- 如果确认字面量没有错误，也可以使用类型断言规避严格字面量检查。
- 如果允许字面量有多余属性，可以像下面这样在类型里面定义一个通用属性。
```ts
let x: {
  foo: number;
  [x: string]: any;
};

x = { foo: 1, baz: 2 }; // Ok
```

- 编译器选项`suppressExcessPropertyErrors`，可以关闭多余属性检查。
```json
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```

### 8. 最小可选属性规则
- 如果一个对象的所有属性都是可选的，会触发最小可选属性规则。即对象必须至少存在一个可选属性，不能所有可选属性都不存在。

### 9. 空对象
- 空对象是 `TypeScript` 的一种特殊值，也是一种特殊类型。
- 空对象没有自定义属性，所以对自定义属性赋值就会报错。空对象只能使用继承的属性，即继承自原型对象`Object.prototype`的属性。
- `TypeScript` 不允许动态添加属性，所以对象不能分步生成，必须生成时一次性声明所有属性。
- 如果确实需要分步声明，一个比较好的方法是，使用扩展运算符（`...`）合成一个新对象。
```ts
const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0,
  ...pt1,
  ...pt2,
};
```

- 空对象作为类型，其实是Object类型的简写形式。各种类型的值（除了null和undefined）都可以赋值给空对象类型，跟Object类型的行为是一样的。
```ts
let d: {};
// 等同于
// let d:Object;

d = {};
d = { x: 1 };
d = "hello";
d = 2;
```