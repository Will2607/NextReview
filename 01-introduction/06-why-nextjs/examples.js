// Why Next.js — conceptual examples in plain JavaScript
// Run with: node examples.js
// These examples illustrate motivations only. They are not Next.js or React code.
// No React, JSX, Next.js, DOM, HTTP servers, or external libraries.

// Application Concerns
// A UI library addresses only part of a complete application architecture.
const applicationConcerns = {
  ui: true,
  routing: true,
  rendering: true,
  serverLogic: true,
  optimization: true,
  buildTooling: true,
};

console.log("Application Concerns:");
console.log(applicationConcerns);

// Manual Integration
// Simplified conceptual representation of assembling an application from
// separate concerns and independent architectural decisions.
const manualDecisions = [
  "UI library",
  "Routing solution",
  "Rendering approach",
  "Build tooling",
  "Server integration",
  "Optimization strategy",
];

function summarizeManualDecisions(decisions) {
  return `Manual integration decisions: ${decisions.join(" + ")}`;
}

console.log("Manual Integration:");
console.log(summarizeManualDecisions(manualDecisions));

// Integrated Framework
// Conceptual model only — not actual Next.js configuration.
const integratedFramework = {
  uiFoundation: "React",
  routing: "Integrated",
  rendering: "Integrated",
  serverCapabilities: "Integrated",
  tooling: "Integrated",
  optimizations: "Integrated",
};

console.log("Integrated Framework:");
console.log(integratedFramework);

// Conventions
// Conceptual team conventions — not actual Next.js folder or file rules.
const teamConventions = [
  "consistent project structure",
  "shared routing approach",
  "shared build process",
  "common development workflow",
];

function printConventions(conventions) {
  console.log("Conventions:");
  for (const convention of conventions) {
    console.log(`- ${convention}`);
  }
}

printConventions(teamConventions);
console.log("Shared conventions can reduce repeated architectural decisions.");

// Team Consistency
const fragmentedProject = {
  style: "each team chooses different approaches",
  onboarding: "slower — many local variations to learn",
  predictability: "low — patterns differ across areas",
  integrationEffort: "high — tools and approaches must be reconciled",
};

const sharedFrameworkProject = {
  style: "shared framework conventions",
  onboarding: "faster — common mental map across the codebase",
  predictability: "higher — familiar structure and tooling",
  integrationEffort: "lower — major concerns already coordinated",
};

console.log("Team Consistency:");
console.log("Fragmented approaches:", fragmentedProject);
console.log("Shared framework conventions:", sharedFrameworkProject);

// Trade-offs
const frameworkChoice = {
  benefits: [
    "integrated capabilities",
    "conventions",
    "reduced integration work",
    "common tooling",
  ],
  tradeOffs: [
    "framework-specific knowledge",
    "framework conventions",
    "dependency on framework decisions",
    "unnecessary complexity for small projects",
  ],
};

console.log("Trade-offs:");
console.log("Benefits:", frameworkChoice.benefits);
console.log("Trade-offs:", frameworkChoice.tradeOffs);
console.log("Framework fit depends on project needs, not labels alone.");
