// Rendering Strategies — conceptual examples in plain JavaScript
// Run with: node examples.js
// These examples illustrate rendering ideas only.
// They do not implement CSR, SSR, SSG, ISR, streaming, or any real strategy.
// No React, JSX, Next.js, DOM, HTTP servers, fetch(), or external libraries.

// Rendering Concept
// data + rendering logic -> output
function renderProduct(product) {
  return `Product: ${product.name} - $${product.price}`;
}

const product = { name: "Notebook", price: 12 };

console.log("Rendering Concept:");
console.log(renderProduct(product));

// Rendering Location
// Conceptual simulations only — no browser or server APIs.
function renderInClient(data) {
  return {
    environment: "client",
    input: data,
    output: `Client representation of ${data.title}`,
  };
}

function renderInServer(data) {
  return {
    environment: "server",
    input: data,
    output: `Server representation of ${data.title}`,
  };
}

const pageData = { title: "Dashboard" };

console.log("Rendering Location:");
console.log(renderInClient(pageData));
console.log(renderInServer(pageData));

// Rendering Timing
// Timing values are conceptual moments — not named rendering strategies.
function renderAtTiming(timing, data) {
  return {
    timing,
    data,
    representation: `${data.label} rendered at ${timing}`,
  };
}

console.log("Rendering Timing:");
console.log(renderAtTiming("before-request", { label: "Marketing page" }));
console.log(renderAtTiming("request-time", { label: "Account summary" }));
console.log(renderAtTiming("after-load", { label: "Interactive panel" }));
console.log(
  renderAtTiming("after-state-change", { label: "Updated counter" })
);

// Data Freshness
// Different freshness requirements can influence rendering decisions.
// No caching or revalidation is introduced here.
const rarelyChangingContent = {
  kind: "rarely-changing",
  freshnessRequirement: "low",
  example: "About page copy",
};

const frequentlyChangingContent = {
  kind: "frequently-changing",
  freshnessRequirement: "high",
  example: "Live inventory count",
};

const personalizedContent = {
  kind: "personalized",
  freshnessRequirement: "user-specific",
  example: "Signed-in dashboard greeting",
};

console.log("Data Freshness:");
console.log(rarelyChangingContent);
console.log(frequentlyChangingContent);
console.log(personalizedContent);

// Client vs Server Work
const clientWork = {
  environment: "client",
  responsibilities: [
    "execute JavaScript",
    "react to interactions",
    "update visible state",
  ],
};

const serverWork = {
  environment: "server",
  responsibilities: [
    "process requests",
    "prepare data",
    "produce responses",
  ],
};

console.log("Client vs Server Work:");
console.log(clientWork);
console.log(serverWork);

// Rendering Trade-offs
// Identify requirements and balance them.
// Do not recommend a named rendering strategy.
const pageRequirements = {
  personalized: true,
  highlyInteractive: true,
  freshness: "high",
  searchVisibility: "important",
};

function describeTradeOffs(requirements) {
  console.log("Page requirements:", requirements);
  console.log(
    "Choosing a rendering approach means balancing these requirements."
  );
  console.log(
    "Improving one dimension may increase cost in another. No universal winner."
  );
}

console.log("Rendering Trade-offs:");
describeTradeOffs(pageRequirements);
