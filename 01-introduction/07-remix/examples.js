// Remix — conceptual examples in plain JavaScript
// Run with: node examples.js
// These examples illustrate application concerns only.
// They are not Remix, React, React Router, or Next.js code.
// No frameworks, DOM, HTTP servers, fetch(), or external libraries.

// Application Framework Concerns
// Conceptual model only — not Remix configuration.
const applicationConcerns = {
  routing: true,
  dataLoading: true,
  dataMutations: true,
  serverLogic: true,
  rendering: true,
  navigation: true,
};

console.log("Application Framework Concerns:");
console.log(applicationConcerns);

// Request and Response Flow
// Conceptual lifecycle simulation — not a real HTTP server.
function simulateRequestLifecycle(path) {
  const stages = [
    `browser request: ${path}`,
    "application processing",
    "response prepared",
    "browser display",
  ];

  return stages;
}

console.log("Request and Response Flow:");
for (const stage of simulateRequestLifecycle("/products")) {
  console.log(`- ${stage}`);
}

// Data Loading Concept
// Shows that data is available before a representation is produced.
// No network requests are made here.
function renderProduct(product) {
  return `Product: ${product.name}`;
}

const product = { name: "Notebook", price: 12 };

console.log("Data Loading Concept:");
console.log("Data available:", product);
console.log("UI representation:", renderProduct(product));

// Data Mutation Concept
// Represents the idea of application data changing — not framework mutation APIs.
const appState = {
  user: {
    name: "Alex",
    role: "member",
  },
};

function updateUserName(state, name) {
  return {
    ...state,
    user: {
      ...state.user,
      name,
    },
  };
}

console.log("Data Mutation Concept:");
console.log("Before:", appState);

const nextAppState = updateUserName(appState, "Sam");
console.log("After:", nextAppState);
console.log("Original unchanged:", appState);

// Server and Client Responsibilities
const serverResponsibilities = {
  environment: "server",
  responsibilities: [
    "process requests",
    "execute server logic",
    "prepare responses",
  ],
};

const clientResponsibilities = {
  environment: "client",
  responsibilities: [
    "display output",
    "respond to user interactions",
    "enhance the experience",
  ],
};

console.log("Server and Client Responsibilities:");
console.log(serverResponsibilities);
console.log(clientResponsibilities);

// Framework Comparison
// Multiple frameworks can solve similar categories of problems
// using different philosophies. This is not a feature benchmark
// and does not declare a winner.
const frameworkA = {
  scope: "application framework",
  routing: "integrated",
  serverClientCoordination: true,
};

const frameworkB = {
  scope: "application framework",
  routing: "integrated",
  serverClientCoordination: true,
};

console.log("Framework Comparison:");
console.log("Framework A:", frameworkA);
console.log("Framework B:", frameworkB);
console.log(
  "Similar problem categories; philosophies and conventions may differ."
);
