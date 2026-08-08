// Why Frontend Frameworks — executable conceptual examples
// Run with: node examples.js
// Plain JavaScript only (no DOM, no frameworks)

// Manual UI Synchronization
const state = {
  count: 0,
  message: "Ready",
};

function showCount(currentState) {
  return `Count display: ${currentState.count}`;
}

function showMessage(currentState) {
  return `Message display: ${currentState.message}`;
}

function showBadge(currentState) {
  return `Badge: ${currentState.count} updates`;
}

function incrementManually() {
  state.count += 1;
  state.message = "Updated";

  // Each state change requires several manual UI updates
  const countView = showCount(state);
  const messageView = showMessage(state);
  const badgeView = showBadge(state);

  console.log("Manual UI Synchronization:");
  console.log(countView);
  console.log(messageView);
  console.log(badgeView);
}

incrementManually();
incrementManually();

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

// State-Driven Rendering
function renderCounter(currentState) {
  return `Count: ${currentState.count}`;
}

const counterState = { count: 0 };
console.log("State-Driven Rendering:");
console.log(renderCounter(counterState));

counterState.count = 5;
console.log(renderCounter(counterState));

counterState.count = 12;
console.log(renderCounter(counterState));

// Imperative Approach
let visibleCountText = "Count: 0";
let visibleStatusText = "Status: idle";
let visiblePanelText = "Panel: hidden";

function applyImperativeUpdates(nextCount) {
  // Explicit step-by-step operations after a state change
  visibleCountText = `Count: ${nextCount}`;
  visibleStatusText = nextCount > 0 ? "Status: active" : "Status: idle";
  visiblePanelText = nextCount >= 3 ? "Panel: visible" : "Panel: hidden";

  console.log("Imperative Approach:");
  console.log(visibleCountText);
  console.log(visibleStatusText);
  console.log(visiblePanelText);
}

applyImperativeUpdates(1);
applyImperativeUpdates(3);

// Declarative Approach
function renderFromState(currentState) {
  return [
    `Count: ${currentState.count}`,
    currentState.count > 0 ? "Status: active" : "Status: idle",
    currentState.count >= 3 ? "Panel: visible" : "Panel: hidden",
  ].join(" | ");
}

const declarativeState = { count: 1 };
console.log("Declarative Approach:");
console.log(renderFromState(declarativeState));

declarativeState.count = 3;
console.log(renderFromState(declarativeState));

// Growing Application State
const appState = {
  user: {
    name: "Ada",
    isAuthenticated: true,
  },
  cart: {
    items: ["Notebook", "Pen"],
    total: 17,
  },
  notifications: {
    unread: 2,
    latest: "Order confirmed",
  },
};

function renderApp(currentState) {
  const authLabel = currentState.user.isAuthenticated
    ? "signed in"
    : "signed out";
  const itemList = currentState.cart.items.join(", ");

  return [
    `User: ${currentState.user.name} (${authLabel})`,
    `Cart (${currentState.cart.items.length}): ${itemList}`,
    `Total: $${currentState.cart.total}`,
    `Notifications: ${currentState.notifications.unread} unread`,
    `Latest: ${currentState.notifications.latest}`,
  ].join("\n");
}

console.log("Growing Application State:");
console.log(renderApp(appState));

appState.cart.items.push("Eraser");
appState.cart.total += 2;
appState.notifications.unread += 1;
appState.notifications.latest = "Item added to cart";

console.log("After updates:");
console.log(renderApp(appState));
