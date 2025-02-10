
---
title: JavaScript笔记
description: JavaScript笔记
dateFormatted: Jan 14 2025
---

## JavaScript基础知识

### 数据类型

- js中有8种基本的数据类型（7种原始类型和1种引用类型）

#### Number类型

- 任何对<code>NaN</code>的进一步数学运算都会返回<code>NaN</code>(只有一个例外：<code>NaN ** 0</code> 结果为 <code>1</code>)

#### BigInt类型

- 在 JavaScript 中，"number" 类型无法安全地表示大于 $$(2^{53} - 1)$$（即 9,007,199,254,740,991），或小于 $$-(2^{53} - 1)$$ 的整数。
- 可以通过将 n 附加到整数字段的末尾来创建 BigInt 值。
```JavaScript
// 尾部的"n" 表示这是一个BigInt类型
const bigInt = 1234567890123456789012345678901234567890n;
```

#### null & undefined

- 通常，使用 null 将一个“空”或者“未知”的值写入变量中，而 undefined 则保留作为未进行初始化的事物的默认初始值。

#### typeof 运算符

```JavaScript
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)
```

- typeof null 的结果为 "object"。这是官方承认的 typeof 的错误，这个问题来自于 JavaScript 语言的早期阶段，并为了兼容性而保留了下来。null 绝对不是一个 object。null 有自己的类型，它是一个特殊值。typeof 的行为在这里是错误的。

- typeof 会对函数区分对待，并返回 "function"。

#### 数字型转换

| 值  | 变成 |
| --- | --- |
| undefined | NaN |
| null | 0 |
| true 和 false | 1 and 0 |

#### 布尔类型转换


| 值  | 变成 |
| --- | --- |
| 0, null, undefined, NaN, "" | false |
| 其他值 | true |

- "0" 是true

## 对象

### 垃圾回收

- **分代收集（Generational collection）**—— 对象被分成两组：“新的”和“旧的”。在典型的代码中，许多对象的生命周期都很短：它们出现、完成它们的工作并很快死去，因此在这种情况下跟踪新对象并将其从内存中清除是有意义的。那些长期存活的对象会变得“老旧”，并且被检查的频次也会降低。
- **增量收集（Incremental collection）**—— 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。因此，引擎将现有的整个对象集拆分为多个部分，然后将这些部分逐一清除。这样就会有很多小型的垃圾收集，而不是一个大型的。这需要它们之间有额外的标记来追踪变化，但是这样会带来许多微小的延迟而不是一个大的延迟。
- **闲时收集（Idle-time collection）**—— 垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。

### 构造函数

#### 约定

- 它们的命名以大写字母开头。
- 它们只能由<code>new</code>操作符来执行。

### Symbol

- symbol在for...in中会被跳过,Object.keys()也会忽略它们。Object.assign会同时复制字符串和symbol属性。

#### 全局symbol

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 symbol
alert( id === idAgain ); // true
```

### 对象--原始值转换

#### hint

- "string": 对象到字符串的转换
- "number": 对象到数字的转换
- "default": 当运算符”不确定“期望值的类型时

为了进行转换，JavaScript 尝试查找并调用三个对象方法：

1. 调用 <code>obj\[Symbol.toPrimitive\](hint)</code> —— 带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，如果这个方法存在的话，
2. 否则，如果 hint 是 "string" —— 尝试调用 obj.toString() 或 obj.valueOf()，无论哪个存在。
3. 否则，如果 hint 是 "number" 或 "default" —— 尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在。

## 数据类型