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

- 空类不包含任何成员，任何其他类都可以看作与空类结构相同。因此，凡是类型为空类的地方，所有类（包括对象）都可以使用。
```ts
class Empty {}

function fn(x: Empty) { // 任何对象都可以用作fn()的参数。
  // ...
}

fn({});
fn(window);
fn(fn);
```

- 确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法。
```ts
class Point {
  x: number;
  y: number;
  static t: number;
  constructor(x: number) {}
}

class Position {
  x: number;
  y: number;
  z: number;
  constructor(x: string) {}
}

const point: Point = new Position("");
```

- 如果类中存在私有成员（`private`）或保护成员（`protected`），那么确定兼容关系时，`TypeScript` 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系。
```ts
// 情况一
class A {
  private name = "a";
}

class B extends A {}

const a: A = new B();

// 情况二
class A {
  protected name = "a";
}

class B extends A {
  protected name = "b";
}

const a: A = new B();
```

## 4. 类的继承
- 类（这里又称“子类”）可以使用 `extends` 关键字继承另一个类（这里又称“基类”）的所有属性和方法。
```ts
class A {
  greet() {
    console.log("Hello, world!");
  }
}

class B extends A {}

const b = new B();
b.greet(); // "Hello, world!"
```

- 子类可以覆盖基类的同名方法。
```ts
class B extends A {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();  // 使用super关键字指代基类
    } else {
      console.log(`Hello, ${name}`);
    }
  }
}
```

- 子类的同名方法不能与基类的类型定义相冲突。
```ts
class A {
  greet() {
    console.log("Hello, world!");
  }
}

class B extends A {
  // 报错
  greet(name: string) {
    console.log(`Hello, ${name}`);
  }
}
```

- 如果基类包括保护成员（`protected`修饰符），子类可以将该成员的可访问性设置为公开（`public`修饰符），也可以保持保护成员不变，但是不能改用私有成员（`private`修饰符）。
```ts
class A {
  protected x: string = "";
  protected y: string = "";
  protected z: string = "";
}

class B extends A {
  // 正确
  public x: string = "";

  // 正确
  protected y: string = "";

  // 报错
  private z: string = "";
}
```

- `extends`关键字后面不一定是类名，可以是一个表达式，只要它的类型是构造函数就可以了。
```ts
// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

// 例三
class A {
  greeting() {
    return "Hello from A";
  }
}
class B {
  greeting() {
    return "Hello from B";
  }
}

interface Greeter {
  greeting(): string;
}

interface GreeterConstructor {
  new (): Greeter;
}

function getGreeterBase(): GreeterConstructor {
  return Math.random() >= 0.5 ? A : B;
}

class Test extends getGreeterBase() {
  sayHello() {
    console.log(this.greeting());
  }
}
```

- `ES2022` 标准的 `Class Fields` 部分，与早期的 `TypeScript` 实现不一致，子类的那些只设置类型、没有设置初值的顶层成员在基类中被赋值后，会在子类被重置为`undefined`。
```ts
interface Animal {
  animalStuff: any;
}

interface Dog extends Animal {
  dogStuff: any;
}

class AnimalHouse {
  resident: Animal;

  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  resident: Dog;

  constructor(dog: Dog) {
    super(dog);
  }
}
```
- 如果编译设置的`target`设成大于等于`ES2022`，或者`useDefineForClassFields`设成`true`，那么下面代码的执行结果是不一样的。
```ts
const dog = {
  animalStuff: "animal",
  dogStuff: "dog",
};

const dogHouse = new DogHouse(dog);

console.log(dogHouse.resident); // undefined
```
- 解决方法就是使用`declare`命令，去声明顶层成员的类型，告诉 `TypeScript` 这些成员的赋值由基类实现。
```ts
class DogHouse extends AnimalHouse {
  declare resident: Dog;

  constructor(dog: Dog) {
    super(dog);
  }
}
```

## 5. 可访问性修饰符
- 类的内部成员的外部可访问性，由三个可访问性修饰符（access modifiers）控制：`public`、`private`和`protected`。

### 5.1 public
- `public`修饰符表示这是公开成员，外部可以自由访问。
- `public`是默认修饰符，一般情况下可以省略不写。
```ts
class Greeter {
  public greet() {
    console.log("hi!");
  }
}

const g = new Greeter();
g.greet();
```

### 5.2 private
- `private`修饰符表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员。
```ts
class A {
  private x: number = 0;
}

const a = new A();
a.x; // 报错

class B extends A {
  showX() {
    console.log(this.x); // 报错
  }
}
```

- 子类不能定义父类私有成员的同名成员。
```ts
class A {
  private x = 0;
}

class B extends A {
  x = 1; // 报错
}
```

- 如果在类的内部，当前类的实例可以获取私有成员。
```ts
class A {
  private x = 10;

  f(obj: A) {
    console.log(obj.x);
  }
}

const a = new A();
a.f(a); // 10
```

-  `ES6` 引入了自己的私有成员写法`#propName`。因此建议不使用`private`，改用 `ES6` 的写法，获得真正意义的私有成员。
```ts
class A {
  #x = 1;
}

const a = new A();
a["x"]; // 报错
```

- 构造方法也可以是私有的，这就直接防止了使用`new`命令生成实例对象，只能在类的内部创建实例对象。这时一般会有一个静态方法，充当工厂函数，强制所有实例都通过该方法生成。
```ts
class Singleton {
  private static instance?: Singleton;

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const s = Singleton.getInstance();
```

### 5.3 protected
- `protected`修饰符表示该成员是保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用。
```ts
class A {
  protected x = 1;
}

class B extends A {
  getX() {
    return this.x;
  }
}

const a = new A();
const b = new B();

a.x; // 报错
b.getX(); // 1
```

- 子类不仅可以拿到父类的保护成员，还可以定义同名成员。
```ts
class A {
  protected x = 1;
}

class B extends A {
  x = 2;
}
```

- 在类的外部，实例对象不能读取保护成员，但是在类的内部可以。
```ts
class A {
  protected x = 1;

  f(obj: A) {
    console.log(obj.x);
  }
}

const a = new A();

a.x; // 报错
a.f(a); // 1
```

### 5.4 实例属性的简写形式
- 实际开发中，很多实例属性的值，是通过构造方法传入的。
```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
```

- 这样的写法等于对同一个属性要声明两次类型，一次在类的头部，另一次在构造方法的参数里面。这有些累赘，`TypeScript` 就提供了一种简写形式。\
```ts
class Point {
  constructor(public x: number, public y: number) {}
}

const p = new Point(10, 10);
p.x; // 10
p.y; // 10
```

> 上面示例中，构造方法的参数`x`前面有`public`修饰符，这时 `TypeScript` 就会自动声明一个公开属性x，不必在构造方法里面写任何代码，同时还会设置x的值为构造方法的参数值。注意，这里的public不能省略。
>
> 除了`public`修饰符，构造方法的参数名只要有`private`、`protected`、`readonly`修饰符，都会自动声明对应修饰符的实例属性。

- `readonly`还可以与其他三个可访问性修饰符一起使用。
```ts
class A {
  constructor(
    public readonly x: number,
    protected readonly y: number,
    private readonly z: number
  ) {}
}
```

## 6. 静态成员
- 类的内部可以使用`static`关键字，定义静态成员。
- 静态成员是只能通过类本身使用的成员，不能通过实例对象使用。
```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}

MyClass.x; // 0
MyClass.printX(); // 0
```

- `static`关键字前面可以使用 `public`、`private`、`protected` 修饰符。
```ts
class MyClass {
  private static x = 0;
}

MyClass.x; // 报错
```

- 静态私有属性也可以用 `ES6` 语法的`#`前缀表示
```ts
class MyClass {
  static #x = 0;
}
```

- `public`和`protected`的静态成员可以被继承。
```ts
class A {
  public static x = 1;
  protected static y = 1;
}

class B extends A {
  static getY() {
    return B.y;
  }
}

B.x; // 1
B.getY(); // 1
```

## 7. 泛型类
- 类也可以写成泛型，使用类型参数。
```ts
class Box<Type> {
  contents: Type;

  constructor(value: Type) {
    this.contents = value;
  }
}

const b: Box<string> = new Box("hello!");
```

- 静态成员不能使用泛型的类型参数。
```ts
class Box<Type> {
  static defaultContents: Type; // 报错
}
```

## 8. 抽象类、抽象成员
- `TypeScript` 允许在类的定义前面，加上关键字`abstract`，表示该类不能被实例化，只能当作其他类的模板。这种类就叫做“抽象类”（abastract class）。
```ts
abstract class A {
  id = 1;
}

const a = new A(); // 报错
```

- 抽象类只能当作基类使用，用来在它的基础上定义子类。
```ts
abstract class A {
  id = 1;
}

class B extends A {
  amount = 100;
}

const b = new B();

b.id; // 1
b.amount; // 100
```

- 抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。
```ts
abstract class A {
  foo: number;
}

abstract class B extends A {
  bar: string;
}
```

- 抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做“抽象成员”（`abstract member`），即属性名和方法名有`abstract`关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。
```ts
abstract class A {
  abstract foo: string;
  bar: string = "";
}

class B extends A {
  foo = "b";
}
```

- 如果抽象类的属性前面加上`abstract`，就表明子类必须给出该方法的实现。
```ts
abstract class A {
  abstract execute(): string;
}

class B extends A {
  execute() {
    return `B executed`;
  }
}
```

::: info 注意
1. 抽象成员只能存在于抽象类，不能存在于普通类。
2. 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加`abstract`关键字。
3. 抽象成员前也不能有`private`修饰符，否则无法在子类中实现该成员。
4. 一个子类最多只能继承一个抽象类。

总之，抽象类的作用是，确保各种相关的子类都拥有跟基类相同的接口，可以看作是模板。其中的抽象成员都是必须由子类实现的成员，非抽象成员则表示基类已经实现的、由所有子类共享的成员。
:::

## 9. `this`问题
- 类的方法经常用到`this`关键字，它表示该方法当前所在的对象。
```ts
class A {
  name = "A";

  getName() {
    return this.name;
  }
}

const a = new A();
a.getName(); // 'A'

const b = {
  name: "b",
  getName: a.getName,
};
b.getName(); // 'b'
```

- 有些场合需要给出`this`类型，但是 `JavaScript` 函数通常不带有`this`参数，这时 `TypeScript` 允许函数增加一个名为`this`的参数，放在参数列表的第一位，用来描述函数内部的`this`关键字的类型。
```ts
// 编译前
function fn(this: SomeType, x: number) {
  /* ... */
}

// 编译后
function fn(x) {
  /* ... */
}
```

- `this`参数的类型可以声明为各种对象。
```ts
function foo(this: { name: string }) {
  this.name = "Jack";
  this.name = 0; // 报错
}

foo.call({ name: 123 }); // 报错
```

- `TypeScript` 提供了一个`noImplicitThis`编译选项。如果打开了这个设置项，如果`this`的值推断为`any`类型，就会报错。
```ts
// noImplicitThis 打开

class Rectangle {
  constructor(public width: number, public height: number) {}

  getAreaFunction() {
    return function () {
      return this.width * this.height; // 报错
    };
  }
}
```

- 在类的内部，`this`本身也可以当作类型使用，表示当前类的实例对象。
```ts
class Box {
  contents: string = "";

  set(value: string): this {
    this.contents = value;
    return this;
  }
}
```

- `this`类型不允许应用于静态成员。
```ts
class A {
  static a: this; // 报错 this类型表示实例对象，但是静态成员拿不到实例对象
}
```

- 有些方法返回一个布尔值，表示当前的`this`是否属于某种类型。这时，这些方法的返回值类型可以写成`this is Type`的形式，其中用到了`is`运算符。
```ts
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }

  isDirectory(): this is Directory {
    return this instanceof Directory;
  }

  // ...
}
```