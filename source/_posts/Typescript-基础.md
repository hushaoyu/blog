---
title: Typescript - 基础
date: 2022-01-25 14:34:15
tags: [TypeScript]
categories: [TypeScript]
---
#### 什么是 `TypeScript`
> `TypeScript` 是 `JavaScript` 的一个超集。

#### 学习文档
- `TypeScript with React` [Link](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/)

#### 类型注解
- 在变量名后面接着一个冒号，冒号后面跟着类型表达式，表达式描述了这个变量可以具有的值。
 ```typescript
 let x: number;
 ```
- 上述表达式，定义了一个数字类型的变量 `x`。你也许会有疑问，`x` 在定义时，没有指定具体的值，按理值应该是 `undefined`，这就与定义的 `number` 类型不一样了。`TypeScript` 针对这种变量定义未赋值的情况，是不允许程序后续读取的。
```typescript
let a: number;
alert(a);
// Variable 'a' is used before being assigned.
```

#### 类型表达式
- 针对 `JavaScript` 设定的类型可选表达式
  - `undefined`、`null`
  - `boolean`、`number`、`string`
  - `symbol`
  - `object`
- `TypeScript` 特有的
  - `Array`
  - `any`
  - `...`
- 除了上述的单一类型，有很多方法可以将这些类型组合成新的复合类型，如使用交并集符号 `(U)`、`(∩)`。[更多](#)

#### 类型别名
- 可以针对某一个类型，使用 `type` 关键字创建别名
```typescript
type Age = number;
let age: Age = 2;
```

#### 类型推断
- 并不是在任何时候都需要显示地指定定义变量的类型，`TypeScript` 会依照类型推断的规则，推断出变量的类型
  - 如下代码，根据类型推断规则，变量 `a` 被推断为 `number` 类型，如果后续更改为其他类型，将报错
```typescript
let a = 1;
console.log(typeof a);
// "number"
a = 'a';
// Type 'string' is not assignable to type 'number'.
```

#### `TypeScript` 中的类型
> &ensp;&ensp;`JavaScript` 中有8中[数据类型](#)，分别是 `Undefined`、`Null`、`Boolean`、`String`、`Number`、`BigInt`、`Symbol`、`Object`。所有这些数据的类型是动态的，可以再程序运行时修改数据的类型。
- 布尔值：使用 `boolean` 定义的值
  - 定义
    ```typescript
    let isDone: boolean = false;
    ```
  - 当修改成其他类型的值时，会报错
    ```typescript
    let isDone: boolean = false;
    isDone = 3;
    // .code.tio.ts(2,1): error TS2322: Type '3' is not assignable to type 'boolean'.
    ```
  - 通过构造函数 `Boolean` 创建的实例对象不是 `boolean` 类型的值，而是一个 `Boolean` 对象，因此不能通过 `Boolean` 创建实例对象赋值给 `boolean` 定义的变量
    ```typescript
    let a: boolean = false;
    a = new Boolean(1);
    // Type 'Boolean' is not assignable to type 'boolean'.
    // 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
    ```
- 数值型：使用 `number` 定义的值
  - 定义
    ```typescript
    let num: number = 4;
    ```
  - 同样的，无法通过构造函数 `Number` 创建的实例对象赋值给 `number` 类型的变量
  - 特别的，可以将十六进制、二进制、八进制、`NaN` 及 `Infinity`【表示无穷大的数值，超出 1.7976931348623157E+103088 的数值】赋值给 `number` 类型的变量
    ```typescript
    let num: number = 4;
    num = 0xf00d;
    num = 0b1010;
    num = 0o744;
    num = NaN;
    num = Infinity;
    ```
- 字符串类型：使用 `string` 定义的值
  - 定义
    ```typescript
    let str: string = '2';
    let stri = `String is ${str}`;
    ```
- 数组
  - `JavaScript` 数组在 `TypeScript` 中有两种表现形式，`List` 和 `Tuple`
  - `List`：集合捏所有元素的类型相同，但是集合的长度不固定
    - 定义
      - 两种定义方式
      ```typescript
      let arr1: number[] = [];
      let arr2: Array<number> = [];
      ```
  - `Tuple`：元组内元素的类型不一定都一样，但是元组的长度是固定的
    - 定义
    ```typescript
    let point: [number, number] = [7, 5];
    let points: [string, number] = ['a', 1];
    ```