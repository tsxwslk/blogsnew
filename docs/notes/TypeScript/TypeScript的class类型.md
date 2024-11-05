---
title: TypeScript的class类型
author: 怡然
createTime: 2024/11/04 14:22:59
permalink: /TypeScript/n2nm5mgt/
---

## 1. 简介
- 类（`class`）是面向对象编程的基本构件，封装了属性和方法，`TypeScript` 给予了全面支持。

### 1.1 属性的类型
- 类的属性可以在顶层声明，也可以在构造方法内部声明。
- 对于顶层声明的属性，可以在声明时同时给出类型。
```ts
class Point {
  x: number;
  y: number;
}
// 如果不给出类型，TypeScript 会认为x和y的类型都是any。
```

- 如果声明时给出初值，可以不写类型，`TypeScript` 会自行推断属性的类型。
- `TypeScript` 有一个配置项`strictPropertyInitialization`，只要打开，就会检查属性是否设置了初值，如果没有就报错。
- 如果打开了这个设置，但是某些情况下，不是在声明时赋值或在构造方法里面赋值，为了防止这个设置报错，可以使用非空断言。
```ts
class Point {
  x!: number;
  y!: number;
}
```

### 1.2 `readonly`修饰符
- 属性名前面加上 `readonly` 修饰符，就表示该属性是只读的。实例对象不能修改这个属性。
- `readonly` 属性的初始值，可以写在顶层属性，也可以写在构造方法里面。
- 如果两个地方都设置了只读属性的值，以构造方法为准。在其他方法修改只读属性都会报错。
```ts
class A {
  readonly id = "foo";
}

const a = new A();
a.id = "bar"; // 报错
```

```ts
class A {
  readonly id: string = "foo";

  constructor() {
    this.id = "bar"; // 正确
  }
}
```

### 1.3 方法的类型
- 类的方法就是普通函数，类型声明方式与函数一致。
```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
```

- 构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

### 1.4 存取器方法
- 存取器（`accessor`）是特殊的类方法，包括取值器（`getter`）和存值器（`setter`）两种方法。
```ts
class C {
  _name = "";
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
```

- `TypeScript` 对存取器有以下规则:
- 1. 如果某个属性只有`get`方法，没有`set`方法，那么该属性自动成为只读属性。
```ts
class C {
  _name = "foo";

  get name() {
    return this._name;
  }
}

const c = new C();
c.name = "bar"; // 报错
```

- 2. `set`方法的参数类型，必须兼容`get`方法的返回值类型，否则报错。
```ts
class C {
  _name = "";
  get name(): string {
    return this._name;
  }
  set name(value: number) {
    this._name = value; // 报错
  }
}
```

- 3. `get`方法与`set`方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

### 1.5 属性索引
- 类允许定义属性索引。
```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  get(s: string) {
    return this[s] as boolean;
  }
}
```

## 2. 类的 `interface` 接口
### 2.1 `implements` 关键字
- `interface` 接口或 `type` 别名，可以用对象的形式，为 `class` 指定一组检查条件。然后，类使用 `implements` 关键字，表示当前类满足这些外部类型条件的限制。
```ts
interface Country {
  name: string;
  capital: string;
}
// 或者
type Country = {
  name: string;
  capital: string;
};

class MyCountry implements Country {
  name = "";
  capital = "";
}
```

- `interface` 只是指定检查条件，如果不满足这些条件就会报错。它并不能代替 `class` 自身的类型声明。
```ts
interface A {
  get(name: string): boolean;
}

class B implements A {
  get(s) {
    // s 的类型是 any
    return true;
  }
}
// B类依然需要声明参数s的类型
class B implements A {
  get(s: string) {
    return true;
  }
}
```

- 类可以定义接口没有声明的方法和属性。
```ts
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x = 1;
  y = 1;
  z: number = 1;
}
```

- `implements`关键字后面，不仅可以是接口，也可以是另一个类。这时，后面的类将被当作接口。
```ts
class Car {
  id: number = 1;
  move(): void {}
}

class MyCar implements Car {
  id = 2; // 不可省略
  move(): void {} // 不可省略
}
```

### 2.2 实现多个接口
- 类可以实现多个接口（其实是接受多重限制），每个接口之间使用逗号分隔。
```ts
class Car implements MotorVehicle, Flyable, Swimmable {
  // ...
}
```

- 同时实现多个接口并不是一个好的写法，容易使得代码难以管理，可以使用两种方法替代。
- 1. 第一种方法是类的继承。
```ts
class Car implements MotorVehicle {}

class SecretCar extends Car implements Flyable, Swimmable {}
```

- 2. 第二种方法是接口的继承。
```ts
interface A {
  a: number;
}

interface B extends A {
  b: number;
}
```

### 2.3 类与接口的合并
- `TypeScript` 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。
```ts
class A {
  x: number = 1;
}

interface A {
  y: number;
}

let a = new A();
a.y = 10;

a.x; // 1
a.y; // 10
```

## 3. Class类型
### 3.1 实例类型
- `TypeScript` 的类本身就是一种类型，但是它代表该类的实例类型，而不是 `class` 的自身类型。
```ts
class Color {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const green: Color = new Color("green");
```

- 对于引用实例对象的变量来说，既可以声明类型为 `Class`，也可以声明类型为 `Interface`，因为两者都代表实例对象的类型。
```ts
interface MotorVehicle {}

class Car implements MotorVehicle {}

// 写法一
const c1: Car = new Car();
// 写法二
const c2: MotorVehicle = new Car();
```

- 作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。
```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// 错误
function createPoint(PointClass: Point, x: number, y: number) {
  return new PointClass(x, y);
}
```

### 3.2 类的自身类型
- 要获得一个类的自身类型，一个简便的方法就是使用 `typeof` 运算符。
```ts
// 上述案例可以写为
function createPoint(PointClass: typeof Point, x: number, y: number): Point {
  return new PointClass(x, y);
} 
```

- 类的自身类型可以写成构造函数的形式。
```ts
function createPoint(
  PointClass: new (x: number, y: number) => Point,
  x: number,
  y: number
): Point {
  return new PointClass(x, y);
}
```

- 构造函数也可以写成对象形式，所以参数`PointClass`的类型还有另一种写法。
```ts
function createPoint(
  PointClass: {
    new (x: number, y: number): Point;
  },
  x: number,
  y: number
): Point {
  return new PointClass(x, y);
}
```

- 根据上面的写法，可以把构造函数提取出来，单独定义一个接口（`interface`），这样可以大大提高代码的通用性。
```ts
interface PointConstructor {
  new (x: number, y: number): Point;
}

function createPoint(
  PointClass: PointConstructor,
  x: number,
  y: number
): Point {
  return new PointClass(x, y);
}
```

:::info 注意
类的自身类型就是一个构造函数，可以单独定义一个接口来表示。
:::

### 3.3 结构类型原则
- `Class` 也遵循“结构类型原则”。一个对象只要满足 `Class` 的实例结构，就跟该 `Class` 属于同一个类型。
```ts
class Foo {
  id!: number;
}

function fn(arg: Foo) {
  // ...
}

const bar = { // 对象bar满足类Foo的实例结构,可以当作参数，传入函数fn()
  id: 10,
  amount: 100,
};

fn(bar); // 正确  
```

- 只要 `A` 类具有 `B` 类的结构，哪怕还有额外的属性和方法，`TypeScript` 也认为 `A` 兼容 `B` 的类型。
```ts
class Person {
  name: string;
  age: number;
}

class Customer {
  name: string;
}

// 正确
const cust: Customer = new Person();
```

- 如果某个对象跟某个 `class` 的实例结构相同，`TypeScript` 也认为两者的类型相同。
```ts
class Person {
  name: string;
}

const obj = { name: "John" };
const p: Person = obj; // 正确
```

- 由于这种情况，运算符`instanceof`不适用于判断某个对象是否跟某个 `class` 属于同一类型。
```ts
obj instanceof Person; // false
// 运算符instanceof确认变量obj不是 Person 的实例，但是两者的类型是相同的。
```