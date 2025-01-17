
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