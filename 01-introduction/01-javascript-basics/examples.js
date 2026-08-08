// JavaScript Basics — executable examples
// Run with: node examples.js

// Variables
const appName = "NextReview";
let score = 0;
score = 10;
console.log("Variables:", appName, score);
// var is avoided in modern JavaScript (function-scoped, confusing hoisting)
// var oldStyle = "avoid";

// Primitive Data Types
const title = "JavaScript Basics";
const count = 3;
const isReady = true;
let notSetYet;
const empty = null;
const big = 123n;
const uniqueKey = Symbol("key");

console.log("Primitives:", title, count, isReady, notSetYet, empty, big, typeof uniqueKey);

// Objects
const user = {
  name: "Ada",
  role: "developer",
};
const dynamicKey = "role";

console.log("Objects:", user.name, user["role"], user[dynamicKey]);

// Arrays
const skills = ["html", "css", "javascript"];
skills.push("typescript");
const upperSkills = skills.map((skill) => skill.toUpperCase());
const shortSkills = skills.filter((skill) => skill.length <= 4);

console.log("Arrays:", skills[0], skills);
console.log("map():", upperSkills);
console.log("filter():", shortSkills);

// Functions
function greet(name) {
  return `Hello, ${name}`;
}

const shout = function (name) {
  return `${name}!`.toUpperCase();
};

const add = (a, b) => a + b;

console.log("Functions:", greet("Ada"), shout("ready"), add(2, 3));

// Conditionals
const examScore = 85;

if (examScore >= 90) {
  console.log("Conditionals: Excellent");
} else if (examScore >= 70) {
  console.log("Conditionals: Good");
} else {
  console.log("Conditionals: Keep practicing");
}

const label = examScore >= 70 ? "pass" : "retry";
console.log("Ternary:", label);

// Loops
console.log("for loop:");
for (let i = 0; i < 3; i++) {
  console.log(i);
}

const colors = ["red", "green", "blue"];
console.log("for...of:");
for (const color of colors) {
  console.log(color);
}

// Destructuring
const product = { id: 1, title: "Notebook", price: 12 };
const { title: productTitle, price } = product;

const coords = [10, 20];
const [x, y] = coords;

console.log("Destructuring:", productTitle, price, x, y);

// Spread Syntax
const base = { theme: "light", lang: "en" };
const settings = { ...base, lang: "es" };

const front = [1, 2];
const all = [...front, 3, 4];

console.log("Spread object:", settings);
console.log("Spread array:", all);

// Template Literals
const learner = "Ada";
const message = `Welcome, ${learner}. Score: ${80 + 5}`;
console.log("Template Literals:", message);

// Optional Chaining
const profile = { user: { name: "Ada" } };
const missing = {};

console.log("Optional Chaining:", profile.user?.name, missing.user?.name);

// Nullish Coalescing
const input = null;
const displayName = input ?? "Guest";
const zeroCount = 0;
const shown = zeroCount ?? 10;

console.log("Nullish Coalescing:", displayName, shown);

// Asynchronous JavaScript
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Done after ${ms}ms`), ms);
  });
}

async function runAsyncExample() {
  const result = await wait(100);
  console.log("Async/Await:", result);
}

runAsyncExample();
