// Static Site Generation (SSG) — conceptual simulations in plain JavaScript
// Run with: node examples.js
// These examples simulate SSG ideas only. They are not a real static site generator.
// No React, JSX, Next.js, DOM, HTTP servers, fetch(), filesystem APIs, or external libraries.

// Build-Time Generation
// Represents generation before user requests.
function generatePage(pageData) {
  return `Page: ${pageData.title}`;
}

const pageData = {
  title: "Documentation",
  version: "1.0",
};

console.log("Build-Time Generation:");
console.log("Build started");
const generatedPage = generatePage(pageData);
console.log("Page generated");
console.log("Build completed");

// Generated Output
// Conceptually represents output already produced during a build.
console.log("Generated Output:");
console.log(generatedPage);

// Serving Pre-Generated Content
// Multiple conceptual requests can receive already-generated output
// without running generatePage() again.
function serveGeneratedPage(generatedOutput) {
  return generatedOutput;
}

console.log("Serving Pre-Generated Content:");
console.log("Request 1:", serveGeneratedPage(generatedPage));
console.log("Request 2:", serveGeneratedPage(generatedPage));
console.log("Request 3:", serveGeneratedPage(generatedPage));
console.log("generatePage() was not called again for these requests.");

// Content Freshness
// Already-generated output still represents earlier data until another generation occurs.
const buildTimeContent = {
  title: "Product",
  price: 100,
};

const productPage = generatePage(buildTimeContent);

const updatedSourceContent = {
  title: "Product",
  price: 120,
};

console.log("Content Freshness:");
console.log("Generated page:", productPage);
console.log("Updated source content:", updatedSourceContent);
console.log(
  "The generated page still reflects build-time data until regeneration."
);

// SSG vs SSR
// Comparison limited to rendering timing.
const ssg = {
  renderingTime: "before-request",
};

const ssr = {
  renderingTime: "request-time",
};

console.log("SSG vs SSR:");
console.log("SSG:", ssg);
console.log("SSR:", ssr);

// SSG Trade-offs
// Neither list applies equally to every project.
const benefits = [
  "Pre-generated content",
  "Reduced request-time rendering work",
  "Reusable generated output",
  "Meaningful initial content",
];

const tradeOffs = [
  "Build-time generation cost",
  "Content may become outdated",
  "Regeneration may be required after source changes",
  "Less natural fit for request-specific content",
];

console.log("SSG Trade-offs:");
console.log("Benefits:", benefits);
console.log("Trade-offs:", tradeOffs);
console.log(
  "SSG is one rendering strategy — evaluate fit against content requirements."
);
