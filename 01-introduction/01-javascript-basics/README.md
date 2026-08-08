# JavaScript Basics

## Overview

Modern web applications rely heavily on JavaScript. Before you build interfaces with React or applications with Next.js, you need a solid grasp of the language itself: how values are stored, how data is shaped, how functions return results, and how asynchronous work is expressed.

This lesson covers the core JavaScript features you will see constantly in modern codebases. Everything here is plain JavaScript—no framework concepts—so you can focus on the language fundamentals.

## Variables

Use `const` when a binding should not be reassigned. Use `let` when you need to reassign a value later. Prefer `const` by default.

```js
const appName = "NextReview";
let score = 0;

score = 10; // allowed with let
// appName = "Other"; // Error: cannot reassign a const binding
```

`var` is generally avoided in modern JavaScript because it is function-scoped (not block-scoped) and can lead to confusing behavior with hoisting and accidental reuse of names. Stick to `const` and `let`.

## Primitive Data Types

JavaScript has seven primitive types:

| Type | Example | Notes |
|------|---------|--------|
| `string` | `"hello"` | Text values |
| `number` | `42`, `3.14` | Integers and floats |
| `boolean` | `true`, `false` | Logical yes/no |
| `undefined` | `undefined` | A variable declared but not assigned |
| `null` | `null` | An intentional empty value |
| `bigint` | `9007199254740993n` | Integers beyond the safe number range |
| `symbol` | `Symbol("id")` | Unique identifiers |

```js
const title = "JavaScript Basics";
const count = 3;
const isReady = true;
let notSetYet; // undefined
const empty = null;
const big = 123n;
const uniqueKey = Symbol("key");
```

## Objects

Objects store related data as named properties. Create them with object literals.

```js
const user = {
  name: "Ada",
  role: "developer",
};

console.log(user.name);      // dot notation
console.log(user["role"]);  // bracket notation
```

Dot notation is common when the property name is a valid identifier. Bracket notation is useful when the key is dynamic or not a valid identifier.

```js
const key = "role";
console.log(user[key]); // "developer"
```

## Arrays

Arrays hold ordered lists of values.

```js
const skills = ["html", "css", "javascript"];

console.log(skills[0]); // "html"

skills.push("typescript"); // add an item at the end

const upper = skills.map((skill) => skill.toUpperCase());
const short = skills.filter((skill) => skill.length <= 4);
```

- `push()` adds one or more items to the end of an array.
- `map()` creates a new array by transforming each item.
- `filter()` creates a new array with items that pass a test.

## Functions

Functions group reusable logic. You will see three common forms:

```js
// Function declaration
function greet(name) {
  return `Hello, ${name}`;
}

// Function expression
const shout = function (name) {
  return `${name}!`.toUpperCase();
};

// Arrow function
const add = (a, b) => a + b;

console.log(greet("Ada"));
console.log(shout("ready"));
console.log(add(2, 3));
```

- **Parameters** are the names listed in the function definition (`name`, `a`, `b`).
- **Arguments** are the values you pass when calling the function.
- A `return` statement sends a value back to the caller. Without `return`, a function returns `undefined`.

## Conditionals

Conditionals choose different paths based on a condition.

```js
const score = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 70) {
  console.log("Good");
} else {
  console.log("Keep practicing");
}

const label = score >= 70 ? "pass" : "retry";
```

The ternary operator `condition ? valueIfTrue : valueIfFalse` is a compact alternative for simple choices.

## Loops

Loops repeat work. For basics, focus on `for` and `for...of`.

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}

const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}
```

`for` is useful when you need an index. `for...of` walks through the values of an iterable (such as an array) directly.

## Destructuring

Destructuring extracts values from objects or arrays into variables.

```js
const product = { id: 1, title: "Notebook", price: 12 };
const { title, price } = product;

const coords = [10, 20];
const [x, y] = coords;
```

This keeps assignments short and makes it clear which pieces of data you care about.

## Spread Syntax

The spread operator `...` copies or combines items from objects and arrays.

```js
const base = { theme: "light", lang: "en" };
const settings = { ...base, lang: "es" };

const front = [1, 2];
const all = [...front, 3, 4];
```

Spreading creates a shallow copy and is commonly used to build updated objects or arrays without mutating the original.

## Template Literals

Template literals use backticks (`` ` ``) and allow embedding expressions with `${}`.

```js
const name = "Ada";
const message = `Welcome, ${name}. Score: ${80 + 5}`;
```

They are the preferred way to build readable strings that mix text and values.

## Optional Chaining

Optional chaining (`?.`) safely reads a nested property when the value in the middle might be `null` or `undefined`.

```js
const profile = { user: { name: "Ada" } };
const missing = {};

console.log(profile.user?.name); // "Ada"
console.log(missing.user?.name); // undefined (no error)
```

Without `?.`, accessing a property on `undefined` would throw an error.

## Nullish Coalescing

The nullish coalescing operator (`??`) provides a fallback only when the left side is `null` or `undefined`.

```js
const input = null;
const displayName = input ?? "Guest";

const count = 0;
const shown = count ?? 10; // 0 — because 0 is not nullish
```

Use `??` when you want a default for missing values, without replacing other valid values such as `0` or `""`.

## Modules

Modules let you split code across files and share only what you choose.

```js
// math.js
export const PI = 3.14;
export function multiply(a, b) {
  return a * b;
}

// app.js
import { PI, multiply } from "./math.js";

console.log(multiply(PI, 2));
```

- `export` makes a value available to other files.
- `import` brings exported values into the current file.

You do not need to run module examples for this lesson; the syntax above is enough to recognize how code is shared between files.

## Asynchronous JavaScript

Some work finishes later. A **Promise** represents a value that will be available in the future. `async` and `await` make promise-based code easier to read.

```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Done after ${ms}ms`), ms);
  });
}

async function run() {
  const result = await wait(100);
  console.log(result);
}

run();
```

- A Promise eventually settles with a result (`resolve`) or an error.
- An `async` function always returns a Promise.
- `await` pauses inside an `async` function until the Promise settles, then continues with the resolved value.

Keep this mental model simple for now: asynchronous code schedules work and continues when that work finishes—without needing network requests yet.

## Key Takeaways

- Prefer `const`, use `let` only when reassignment is needed, and avoid `var`.
- Know the primitive types and when to use objects and arrays for structured data.
- Functions (declarations, expressions, and arrows) organize reusable logic with parameters and return values.
- Conditionals and loops control flow; destructuring and spread keep data updates clear.
- Template literals, optional chaining, and nullish coalescing make everyday code safer and more readable.
- Modules share code with `export` / `import`.
- Promises with `async` / `await` express local asynchronous work in a straightforward way.
