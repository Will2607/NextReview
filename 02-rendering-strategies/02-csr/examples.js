// Client-Side Rendering (CSR) — conceptual simulations in plain JavaScript
// Run with: node examples.js
// These examples simulate CSR ideas only. They are not a real browser application.
// No React, JSX, Next.js, DOM, HTTP servers, fetch(), or external libraries.
// Node.js is only the runtime used to print these conceptual examples.

// Basic CSR Flow
// Simulation only: initial response → JavaScript → client render
console.log("Basic CSR Flow:");
console.log("1. Initial application received");
console.log("2. JavaScript loaded");
console.log("3. JavaScript executed");

const appState = {
  userName: "Alex",
  view: "home",
};

console.log("4. UI rendered from application state:", appState);

// Client-Side Rendering
// Conceptually represents rendering work performed by application code
// that would run in the client. This is not a browser implementation.
function renderProfile(profile) {
  return `Profile: ${profile.name}`;
}

console.log("Client-Side Rendering:");
console.log(renderProfile({ name: "Jordan" }));

// State Changes
// New state can produce new visible output.
const initialState = {
  count: 0,
};

function renderCounter(state) {
  return `Count: ${state.count}`;
}

const updatedState = {
  ...initialState,
  count: 1,
};

console.log("State Changes:");
console.log(renderCounter(initialState));
console.log(renderCounter(updatedState));

// Data Arriving After Load
// Conceptual only — no real asynchronous request and no fetch().
const loadingState = {
  data: null,
};

const loadedState = {
  data: {
    name: "Dashboard",
  },
};

function renderAfterLoad(state) {
  if (state.data === null) {
    return "Waiting for data";
  }

  return `Loaded view: ${state.data.name}`;
}

console.log("Data Arriving After Load:");
console.log(renderAfterLoad(loadingState));
console.log(renderAfterLoad(loadedState));

// Client Responsibilities
// CSR still involves a server conceptually for resources and often data.
const clientResponsibilities = {
  loadJavaScript: true,
  executeApplicationLogic: true,
  renderInterface: true,
  respondToInteractions: true,
};

const serverResponsibilities = {
  deliverApplicationResources: true,
  mayProvideData: true,
};

console.log("Client Responsibilities:");
console.log("Client:", clientResponsibilities);
console.log("Server (still present):", serverResponsibilities);

// CSR Trade-offs
// Neither list applies equally to every application.
const benefits = [
  "Interactive browser-side updates",
  "Client-driven UI rendering",
  "Reduced need for complete page reloads for many interactions",
];

const tradeOffs = [
  "JavaScript download cost",
  "Client execution cost",
  "Device performance differences",
  "Initial content considerations",
];

console.log("CSR Trade-offs:");
console.log("Benefits:", benefits);
console.log("Trade-offs:", tradeOffs);
console.log(
  "CSR is a rendering strategy — evaluate benefits against costs for each case."
);
console.log(
  "Note: CSR is not the same as SPA (SPA is a separate architecture topic)."
);
