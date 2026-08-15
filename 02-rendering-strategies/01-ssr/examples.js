// Server-Side Rendering (SSR) — conceptual simulations in plain JavaScript
// Run with: node examples.js
// These examples simulate SSR ideas only. They are not a real server.
// No React, JSX, Next.js, DOM, HTTP servers, fetch(), or external libraries.

// Basic SSR Flow
// Simulation only: request → server render → response → browser
function renderPage(pageData) {
  return `Page: ${pageData.title}`;
}

const pageRequest = {
  path: "/about",
  title: "About",
};

console.log("Basic SSR Flow:");
console.log("1. Request received:", pageRequest.path);
console.log("2. Server rendering");
const pageResponse = renderPage(pageRequest);
console.log("3. Response generated:", pageResponse);
console.log("4. Browser receives response");

// Request-Time Rendering
// Representation is produced when the request is handled.
const request = {
  path: "/products",
  requestedAt: "request-time",
};

function renderAtRequestTime(currentRequest) {
  return `Rendered ${currentRequest.path} at ${currentRequest.requestedAt}`;
}

console.log("Request-Time Rendering:");
console.log(renderAtRequestTime(request));

// Request-Specific Content
// Different requests can produce different output at request time.
const requestA = {
  user: {
    name: "Alex",
  },
};

const requestB = {
  user: {
    name: "Jordan",
  },
};

function renderDashboard(currentRequest) {
  return `Dashboard for ${currentRequest.user.name}`;
}

console.log("Request-Specific Content:");
console.log(renderDashboard(requestA));
console.log(renderDashboard(requestB));

// Server and Browser Responsibilities
// Simplified conceptual model — not a complete architecture.
const serverResponsibilities = {
  receivesRequest: true,
  preparesInformation: true,
  rendersInitialOutput: true,
  sendsResponse: true,
};

const browserResponsibilities = {
  receivesResponse: true,
  displaysContent: true,
  mayHandleInteractions: true,
};

console.log("Server and Browser Responsibilities:");
console.log("Server:", serverResponsibilities);
console.log("Browser:", browserResponsibilities);

// SSR Trade-offs
// Neither list applies equally to every application.
const benefits = [
  "Meaningful initial content",
  "Request-specific rendering",
  "Access to server-side information",
];

const tradeOffs = [
  "Server rendering work",
  "Request-response latency",
  "Infrastructure load",
];

console.log("SSR Trade-offs:");
console.log("Benefits:", benefits);
console.log("Trade-offs:", tradeOffs);
console.log("SSR is one strategy — evaluate benefits against costs for each case.");
