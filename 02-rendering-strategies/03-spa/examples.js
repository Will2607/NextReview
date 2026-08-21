// Single Page Application (SPA) — conceptual simulations in plain JavaScript
// Run with: node examples.js
// These examples simulate SPA architecture ideas only.
// They are not a real SPA, browser app, or routing implementation.
// No React, JSX, Next.js, React Router, DOM, History API, fetch(), or external libraries.

// Initial Application Load
// Conceptual simulation only.
const application = {
  loaded: true,
  currentView: "home",
};

console.log("Initial Application Load:");
console.log("Application resources loaded");
console.log("Application started");
console.log(`Current view: ${application.currentView}`);

// Application Views
// An SPA can contain multiple conceptual views while the app remains loaded.
const views = {
  home: "Home View",
  dashboard: "Dashboard View",
  settings: "Settings View",
};

console.log("Application Views:");
console.log(views);

// Client-Side Navigation
// Changing the visible view without replacing the entire conceptual application.
// This is not routing implementation.
function navigate(state, nextView) {
  return {
    ...state,
    currentView: nextView,
  };
}

const initialState = {
  currentView: "home",
};

const dashboardState = navigate(initialState, "dashboard");

console.log("Client-Side Navigation:");
console.log("Before:", initialState);
console.log("After:", dashboardState);
console.log("Application remains conceptually loaded while the view changes.");

// Application State
// Relevant state can remain available across view changes.
const appState = {
  currentView: "products",
  selectedCategory: "books",
  cartCount: 2,
};

const nextState = {
  ...appState,
  currentView: "cart",
};

console.log("Application State:");
console.log("Before navigation:", appState);
console.log("After navigation:", nextState);
console.log(
  "Category and cart count remained available while the view changed."
);

// SPA vs CSR
// SPA and CSR answer different architectural questions.
const spa = {
  concern: "Application navigation and view updates",
};

const csr = {
  concern: "Where rendering primarily occurs",
};

console.log("SPA vs CSR:");
console.log("SPA:", spa);
console.log("CSR:", csr);
console.log(
  "They are related and often used together, but they are not synonyms."
);

// SPA Trade-offs
// Neither list applies equally to every SPA.
const benefits = [
  "Application-like navigation",
  "State can remain active between views",
  "Fewer complete document reloads",
  "Highly interactive workflows",
];

const tradeOffs = [
  "JavaScript dependency",
  "Initial application loading cost",
  "Browser-side application complexity",
  "Client resource usage",
];

console.log("SPA Trade-offs:");
console.log("Benefits:", benefits);
console.log("Trade-offs:", tradeOffs);
console.log(
  "SPA is an application architecture — evaluate fit against product needs."
);
