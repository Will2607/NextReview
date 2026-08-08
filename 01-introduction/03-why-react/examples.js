// Why React — conceptual examples in plain JavaScript
// Run with: node examples.js
// No React, JSX, DOM, or external libraries

// Reusable UI
function createUserCard(user) {
  return `${user.name} - ${user.role}`;
}

const users = [
  { name: "Ada", role: "developer" },
  { name: "Grace", role: "engineer" },
  { name: "Alan", role: "researcher" },
];

console.log("Reusable UI:");
for (const user of users) {
  console.log(createUserCard(user));
}

// Composition
function createHeader() {
  return "Header: NextReview";
}

function createContent() {
  return "Content: Lesson list";
}

function createFooter() {
  return "Footer: Learn step by step";
}

function createAppLayout() {
  return [createHeader(), createContent(), createFooter()].join("\n");
}

console.log("Composition:");
console.log(createAppLayout());

// Declarative UI
// The return value describes what should be visible for a given state.
function renderStatus(isLoggedIn) {
  return isLoggedIn ? "Welcome back" : "Please sign in";
}

console.log("Declarative UI:");
console.log(renderStatus(false));
console.log(renderStatus(true));

// State-Driven UI
const appState = {
  user: {
    name: "Alex",
  },
  cartCount: 2,
  notifications: 1,
};

function renderApp(state) {
  return [
    `User: ${state.user.name}`,
    `Cart items: ${state.cartCount}`,
    `Notifications: ${state.notifications}`,
  ].join(" | ");
}

console.log("State-Driven UI:");
console.log(renderApp(appState));

const nextAppState = {
  ...appState,
  cartCount: appState.cartCount + 1,
  notifications: 0,
};

console.log(renderApp(nextAppState));

// One-Way Data Flow
// data -> render function -> output
// The render function must not modify its input.
function renderGreeting(data) {
  return `Hello, ${data.name}. Score: ${data.score}`;
}

const greetingData = { name: "Sam", score: 10 };
console.log("One-Way Data Flow:");
console.log(renderGreeting(greetingData));

const updatedGreetingData = {
  ...greetingData,
  score: 25,
};

console.log(renderGreeting(updatedGreetingData));
console.log("Input unchanged:", greetingData);

// Growing UI Complexity
const complexState = {
  user: {
    name: "Alex",
    isAuthenticated: true,
  },
  cart: {
    count: 3,
    total: 42,
  },
  notifications: 2,
  selectedCategory: "Books",
};

function renderComplexUI(state) {
  const authLabel = state.user.isAuthenticated ? "signed in" : "guest";

  return [
    `User: ${state.user.name} (${authLabel})`,
    `Category: ${state.selectedCategory}`,
    `Cart: ${state.cart.count} items ($${state.cart.total})`,
    `Notifications: ${state.notifications}`,
  ].join("\n");
}

console.log("Growing UI Complexity:");
console.log(renderComplexUI(complexState));

const nextComplexState = {
  ...complexState,
  selectedCategory: "Stationery",
  cart: {
    ...complexState.cart,
    count: complexState.cart.count + 1,
    total: complexState.cart.total + 5,
  },
  notifications: complexState.notifications + 1,
};

console.log("After updates:");
console.log(renderComplexUI(nextComplexState));
