// Next.js introduction — conceptual examples in plain JavaScript
// Run with: node examples.js
// These examples illustrate ideas only. They are not React or Next.js code.
// No React, JSX, Next.js, DOM, HTTP servers, or external libraries.

// UI Library Responsibility
// Represents the UI layer conceptually — not actual React code.
function renderUser(user) {
  return `User: ${user.name}`;
}

console.log("UI Library Responsibility:");
console.log(renderUser({ name: "Ada" }));
console.log(renderUser({ name: "Grace" }));

// Framework Responsibility
// Broader responsibilities of an application framework around the UI layer.
const frameworkCapabilities = {
  routing: true,
  rendering: true,
  serverCapabilities: true,
  optimizations: true,
};

console.log("Framework Responsibility:");
console.log(frameworkCapabilities);

// Library vs Framework
const uiLibrary = {
  focus: "user interface",
  provides: ["reusable UI pieces", "composition", "declarative UI model"],
  applicationStructure: false,
};

const applicationFramework = {
  focus: "application structure",
  provides: [
    "routing capabilities",
    "rendering capabilities",
    "server-side capabilities",
    "production-oriented tooling",
  ],
  applicationStructure: true,
};

console.log("Library vs Framework:");
console.log(uiLibrary);
console.log(applicationFramework);

// Application Capabilities
function summarizeCapabilities(capabilities) {
  return `Application capabilities: ${capabilities.join(", ")}`;
}

const capabilities = [
  "routing",
  "rendering",
  "server logic",
  "optimization",
];

console.log("Application Capabilities:");
console.log(summarizeCapabilities(capabilities));
console.log("Note: listed only — none of these are implemented here.");

// Client and Server Responsibilities
const clientResponsibilities = {
  environment: "client",
  responsibilities: [
    "display interface",
    "respond to interactions",
  ],
};

const serverResponsibilities = {
  environment: "server",
  responsibilities: [
    "process requests",
    "execute server-side logic",
    "produce responses",
  ],
};

console.log("Client and Server Responsibilities:");
console.log(clientResponsibilities);
console.log(serverResponsibilities);
console.log(
  "Next.js applications can involve both environments conceptually."
);
