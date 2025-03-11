---
title: JavaScript笔记
description: JavaScript笔记
dateFormatted: Jan 14 2025
---

## JavaScript 基础知识

### 数据类型

- js 中有 8 种基本的数据类型（7 种原始类型和 1 种引用类型）

#### Number 类型

- 任何对<code>NaN</code>的进一步数学运算都会返回<code>NaN</code>(只有一个例外：<code>NaN \*\* 0</code> 结果为 <code>1</code>)

#### BigInt 类型

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

| 值            | 变成    |
| ------------- | ------- |
| undefined     | NaN     |
| null          | 0       |
| true 和 false | 1 and 0 |

#### 布尔类型转换

| 值                          | 变成  |
| --------------------------- | ----- |
| 0, null, undefined, NaN, "" | false |
| 其他值                      | true  |

- "0" 是 true

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

- symbol 在 for...in 中会被跳过,Object.keys()也会忽略它们。Object.assign 会同时复制字符串和 symbol 属性。

#### 全局 symbol

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 symbol
alert(id === idAgain); // true
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

- 除 null 和 undefined 以外的原始类型都提供了许多有用的方法。
- 从形式上讲，这些方法通过临时对象工作，但 JavaScript 引擎可以很好地调整，以在内部对其进行优化，因此调用它们并不需要太高的成本。

> 如果想直接调用数字上的一个方法，需要在它的后面放置两个点..。

```js
alert((123456).toString()); // 等于(123456).toString()
```
### 字符串

#### 按位（bitwise）NOT技巧

将数字转换为32-bit整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反。

也就是：对于32-bit整数，<code>~n</code>等于<code>-(n+1)</code>

例如：
```js
alert( ~2 ); // -3，和 -(2+1) 相同
alert( ~1 ); // -2，和 -(1+1) 相同
alert( ~0 ); // -1，和 -(0+1) 相同
alert( ~-1 ); // 0，和 -(-1+1) 相同
```

用在<code>indexOf</code>检查：

```js
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 正常运行
}
```

### 数组方法

数组方法备忘单：

- 添加/删除元素：

  - push(...items) —— 向尾端添加元素，
  - pop() —— 从尾端提取一个元素，
  - shift() —— 从首端提取一个元素，
  - unshift(...items) —— 向首端添加元素，
  - splice(pos, deleteCount, ...items) —— 从 pos 开始删除 deleteCount 个元素，并插入 items。
  - slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
  - concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。

- 搜索元素：

  - indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，返回找到的第一个索引，如果没找到则返回 -1。
  - includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
  - find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
  - findIndex 和 find 类似，但返回索引而不是值。

- 遍历元素：

  - forEach(func) —— 对每个元素都调用 func，不返回任何内容。

- 转换元素：

  - map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
  - sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
  - reverse() —— 原位（in-place）反转数组，然后返回它。
  - split/join —— 将字符串拆分为数组并返回/将数组项组合成字符串并返回。
  - reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。

- 其他：

  - Array.isArray(value) 检查 value 是否是一个数组，如果是则返回 true，否则返回 false。

sort, reverse, splice 会修改原数组


### Map 和 Set

- Map 是一个带键的数据项的集合，键可以是任何类型。
- 迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。

### WeakMap 和 WeakSet

- WeakMap 的键必须是对象，不能是原始值。

### Date

- 在 JavaScript 中，日期和时间使用 Date 对象来表示。我们不能单独创建日期或时间，Date 对象总是同时创建两者。
- 月份从 0 开始计数（对，一月是 0）。
- 一周中的某一天 getDay() 同样从 0 开始计算（0 代表星期日）。
- 当设置了超出范围的组件时，Date 会进行自动校准。这一点对于日/月/小时的加减很有用。
- 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 Date 被转换为数字时，Date 对象会被转换为时间戳。
- 使用 Date.now() 可以更快地获取当前时间的时间戳。

## 函数

### new Function

一下三种声明的含义相同：

```js
new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号和空格分隔
```

## 对象属性配置

### 属性标志

- writable — 如果为 true，则值可以被修改，否则它是只可读的。
- enumerable — 如果为 true，则该属性在循环中可见，否则该属性在循环中不可见。
- configurable — 如果为 true，则该属性可以被删除，并且该属性的一些标志可以被修改，否则不可以。

## 原型

### F.prototype

- `F.prototype` 属性在`new F` 被调用时为新对象的`[[Prototype]]`赋值。
- `F.prototype` 的值要么是一个对象，要么就是 `null`，其他值都不可能。
- `"prototype"` 属性仅当设置在一个构造函数上，并通过`new` 调用时，才具有这种特殊的影响。

