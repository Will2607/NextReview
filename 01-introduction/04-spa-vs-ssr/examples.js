// SPA vs SSR — conceptual simulations in plain JavaScript
// Run with: node examples.js
// These are simplified models only — not real SPA or SSR implementations.
// No React, Next.js, DOM, HTTP servers, or external libraries.

// SPA Initial Load
// Conceptual simulation: the browser receives an application shell, then
// JavaScript produces the application representation.
function receiveSpaShell() {
  return {
    initialContent: "Application shell",
    javascriptLoaded: true,
  };
}

function renderSpaWithJavaScript(shell) {
  if (!shell.javascriptLoaded) {
    return "Waiting for JavaScript";
  }

  return "SPA UI: Home dashboard ready";
}

console.log("SPA Initial Load:");
console.log("1. Browser requests application");
const spaShell = receiveSpaShell();
console.log("2. Server returns HTML + JavaScript:", spaShell);
console.log("3. Browser executes JavaScript");
console.log("4. Application representation:", renderSpaWithJavaScript(spaShell));

// SPA Client-Side Update
// After the initial application is loaded, the client can change the visible
// representation from state without simulating a full document reload.
const appState = {
  page: "home",
};

function renderSpaView(state) {
  return `Visible view: ${state.page}`;
}

console.log("SPA Client-Side Update:");
console.log(renderSpaView(appState));

const nextAppState = {
  ...appState,
  page: "settings",
};

console.log(renderSpaView(nextAppState));
console.log("Client updated the view from application state");

// SSR Request
// Conceptual simulation: the server generates the representation for a request.
function renderOnServer(pageData) {
  return `Page: ${pageData.title}`;
}

console.log("SSR Request:");
console.log("1. Request received");
const pageData = { title: "About" };
console.log("2. Server renders");
const ssrHtml = renderOnServer(pageData);
console.log("3. Response returned:", ssrHtml);
console.log("4. Browser displays response");

// Client vs Server Work
function performClientWork() {
  return {
    environment: "client",
    responsibilities: [
      "display the UI",
      "run browser-side JavaScript",
      "respond to user interactions",
    ],
  };
}

function performServerWork() {
  return {
    environment: "server",
    responsibilities: [
      "receive requests",
      "process server-side logic",
      "generate responses",
      "potentially generate HTML",
    ],
  };
}

console.log("Client vs Server Work:");
console.log(performClientWork());
console.log(performServerWork());

// SPA vs SSR Comparison
// Simplified conceptual models — not real implementations.
function simulateSpa() {
  return {
    approach: "SPA",
    initialRequest: "HTML shell + JavaScript",
    representationProduced: "primarily in the browser after JavaScript runs",
    subsequentWork: "primarily client-side UI updates from application state",
  };
}

function simulateSsr() {
  return {
    approach: "SSR",
    initialRequest: "request for a page",
    representationProduced: "primarily on the server as generated HTML",
    subsequentWork: "additional requests may return newly generated HTML",
  };
}

console.log("SPA vs SSR Comparison:");
console.log(simulateSpa());
console.log(simulateSsr());
console.log(
  "Note: these objects are teaching models only, not production architecture."
);
