---
title: TypeScript - React组件中的类型注解
date: 2022-01-26 15:02:32
tags: [TypeScript, React]
categories: [TypeScript, React Props]
---
#### `React` 中可能用到的 `TypeScript` 类型注解
<details>
<summary>code</summary>

```typescript
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```
</details>

#### 在对 `Props` 和 `State` 进行类型注解时，使用 `type` 还是 `interface`?
- 建议：
  - 总是使用 `interface` 来为公共库或者第三方环境进行类型定义，因为如果后续发现缺少定义，使用者可以通过声明合并来[扩展](#) `interface`
  - 考虑使用 `type` 来为 `React` 组件的 `Props` 和 `State` 进行类型定义，这样可以给它们增加更多的限制和提高一致性。
- 参考资料
  - [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)
  - [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- 类型定义对于使用联合类型更有帮助，如 `type MyType = TypeA | TypeB`，而 `interface` 更适合声明字典形状，然后实现或扩展它们
- `type` 和 `interface` 对比
  
  | 对比项 | `type` | `interface` |
  | --- | --- | --- |
  | Can describe functions	| ✅ | ✅ |
  | Can describe constructors	| ✅ | ✅| 
  | Can describe tuples	| ✅ | ✅ |
  | Interfaces can extend it	| ⚠️| ✅ |
  | Classes can extend it	| 🚫 | ✅ | 
  | Classes can implement it (implements)	| ⚠️| ✅ | 
  | Can intersect another one of its kind	| ✅ | ⚠️| 
  | Can create a union with another one of its kind	| ✅ | 🚫 |
  | Can be used to create mapped types	| ✅ | 🚫 | 
  | Can be mapped over with mapped types	| ✅ | ✅ | 
  | Expands in error messages and logs	| ✅ | 🚫 | 
  | Can be augmented	| 🚫 | ✅ | 
  | Can be recursive	| ⚠️| ✅ | 
- `type alias` 和 `interface` 的区别
  - 如果在 `type` 类型定义中使用了 `union` 操作符，即 `|`，则不能在具有此类型别名的类上使用 `implements`
  ```typescript
  type dog = {
    color: string
  }
  type bean = {
    fly: boolean
  }
  interface cat {
    sex: string
  }
  type animal1 = dog & cat;
  class cat1 implements animal1 {
    color = 'red';
    sex = '1';
  }
  // correct !
  
  type animal2 = (dog | bean) & cat;
  class cat2 implements animal2 {
    color = 'red';
    sex = '1';
    fly= true;
  }
  // Error! A class can only implement an object type or intersection of object types with statically known members.
  ```
  - 同理，如果在 `type` 类型定义中使用了 `union` 操作符，即 `|`，则不能在具有此类型别名的接口中使用 `extends`
  > 与类实现使用类似，接口是一个“静态”蓝图——它不能以一种或另一种形式存在，因此不能通过联合类型合并来扩展.
  ```typescript
  type dog = {
    color: string
  }
  type bean = {
    fly: boolean
  }
  interface cat {
    sex: string
  }
  type animal1 = dog & cat & bean;
  interface cat1 extends animal1 {}
  // correct !
  
  type animal2 = (dog | bean) & cat;
  interface cat2 extends animal2 {}
  // Error! An interface can only extend an object type or intersection of object types with statically known members.
  ```
  - 声明合并并不适用于类型别名
    - 在 `interface` 中的声明合并：可以多次定义同一个接口，其定义将最终合并为一个
    ```typescript
    interface cat {
        sex: string
    }
    interface cat {
        fat: true
    }
    const animal1: cat = {
        sex: '1',
        fat: true,
    }
    // correct !
    ```
    - 在 `type alias` 中，由于类型别名是全局或者模块中唯一的，因此不能重复定义相同名称的类型别名
    ```typescript
    type dog = {
        color: string
    }
    type dog = {
        fly: boolean
    }
    // Error! Duplicate identifier 'dog'.
    ```