# Routing Patterns

The purpose of this lesson is to explain why routing patterns exist and what kinds of navigation and UI problems they address. Simple applications may only need a path mapped to a page. Larger applications often need richer navigation behavior. Routing patterns are reusable ways to model those situations.

This lesson is conceptual. It does not teach Parallel Routes or Intercepting Routes implementation.

## Overview

Simple applications may only need straightforward route-to-page mapping: `/about` shows About, `/products` shows Products.

As applications grow, developers may need more complex navigation behavior.

Examples:

- multiple UI regions active at once;
- modal-style navigation;
- preserving context while changing part of the screen;
- nested application sections;
- different navigation experiences depending on context.

Routing patterns provide structured ways to model these situations. They are architectural approaches, not a requirement for every page.

## What Is a Routing Pattern?

A **routing pattern** is a reusable architectural approach for organizing routes and navigation behavior.

A routing pattern is not only syntax. Folder names and conventions come later. First comes the recurring problem and the kind of solution it needs.

```text
Problem
↓
Navigation requirement
↓
Routing structure
↓
UI behavior
```

The problem might be “keep the gallery visible while a photo opens.” The navigation requirement is context-preserving overlay. The routing structure and UI behavior follow from that requirement. Syntax is how a framework expresses the pattern, not the pattern itself.

## Simple Routing vs Routing Patterns

**Simple routing** maps each location to one page:

```text
/about
/products
/contact
```

Each route maps directly to one page. That model is enough for many sites.

**More complex routing** may need several regions or a view that does not fully replace the current screen:

```text
Dashboard
├── Main content
├── Sidebar
└── Activity panel
```

or:

```text
Products page
↓
Open product
↓
Product appears as modal
↓
Background page remains visible
```

These scenarios require richer routing behavior than a single page swap. Routing patterns exist for that class of problems.

## Routing Patterns and UI Architecture

Routing decisions can influence UI structure. The URL and the screen layout are related when navigation should be shareable, restorable, or context-aware.

Examples of interfaces that often need richer routing:

- persistent navigation;
- modal overlays;
- split-screen interfaces;
- dashboards;
- master-detail interfaces.

This lesson does not reteach layouts. Layouts wrap shared UI. Routing patterns describe how navigation and route-driven regions compose. The focus here is routing architecture, not layout files.

## Context-Preserving Navigation

Some navigation should preserve the user’s current context.

Example:

```text
Product list
↓
Open product details
↓
Details appear without losing the product list context
```

The list remains the user’s place in the application. Details appear without throwing that place away. That can improve user experience because orientation is kept: where I was, what I opened, how I can go back.

This lesson does not introduce Intercepting Routes syntax. The requirement is the idea: keep surrounding context while showing related content.

## Multiple Active UI Regions

Some screens contain multiple independently meaningful areas.

Example:

```text
Dashboard
├── Main analytics
├── Team activity
└── Notifications
```

Each region can matter at the same time. A routing architecture may need to represent these regions simultaneously rather than treating the screen as one exclusive page.

This lesson does not introduce Parallel Routes syntax. The requirement is simultaneous, route-driven regions.

## Modal Navigation Pattern

A common conceptual pattern:

```text
Current page
↓
User opens item
↓
Overlay/modal appears
↓
Underlying page remains visible
```

Then a different entry path:

```text
Direct navigation to the same item
↓
Full page may be displayed
```

Opening a photo from a gallery can show a modal over the gallery. Visiting the photo URL directly can show a full page. Modern routing systems can support context-sensitive navigation like this: the same destination, different presentation depending on how the user arrived.

This lesson does not teach implementation.

## Master-Detail Pattern

A **master-detail** interface shows a list and a selected item together:

```text
Products
├── Product List
└── Product Details
```

or:

```text
Messages
├── Conversation List
└── Selected Conversation
```

Both regions may be important at once. Selecting a conversation should not have to destroy the list. Routing-aware UI composition can keep the list and the detail in sync with the location. This lesson does not introduce route slots.

## Dashboard Pattern

```text
Dashboard
├── Revenue
├── Users
├── Activity
└── Notifications
```

Multiple regions may update or navigate independently. Revenue and notifications can both be meaningful while the user stays “in the dashboard.” A routing pattern for this kind of screen treats those regions as part of the navigation model, not only as local widgets with no location.

Keep this conceptual. No implementation is required yet.

## Routing State and UI State

Routing can represent meaningful application state.

Examples:

```text
/products
/products/123
/settings/profile
```

`/products/123` is not only a file mapping. It can mean “the user is looking at product 123.” Using routes for meaningful navigation state can improve:

- shareable URLs;
- browser navigation;
- application structure;
- user orientation.

This lesson does not teach router APIs. The point is that some UI state is also location state.

## Why Not Use Only Local UI State?

Not every meaningful navigation transition should be represented only by local component state.

Compare:

- Opening a product purely through local state
- Representing the product through a URL

Local state can hide and show a panel. When the location does not change, refresh, sharing, and the Back button may not match what the user sees.

Routing-aware state can support:

- deep linking;
- refresh behavior;
- browser history;
- shareable locations.

Not all UI state belongs in the URL. Ephemeral toggles and temporary highlights often stay local. Meaningful places in the application often belong in routing. This lesson does not teach hooks or state management.

## Routing Pattern Selection

A routing pattern should be chosen based on UX and application requirements.

Questions may include:

- Should the URL change?
- Should the browser Back button work?
- Should the current page remain visible?
- Should multiple route-driven regions be visible at once?
- Should direct navigation behave differently from in-app navigation?

These questions identify the requirement. Implementation answers come in later subtopics.

## Routing Patterns Are Not Always Necessary

Simple pages do not need advanced routing patterns.

- **Simple informational site** → simple routes may be sufficient.
- **Complex application workflow** → advanced routing patterns may help.

Do not add advanced routing because it exists. Use it when the navigation problem is real. Unnecessary complexity is still complexity.

## Relationship to Parallel Routes

**Parallel Routes** are useful when multiple route-driven UI regions need to be rendered at the same time.

That is the conceptual relationship only. This lesson does not teach `@folder` syntax, slots, `default.tsx`, or layout slot props.

Parallel Routes is the next dedicated subtopic.

## Relationship to Intercepting Routes

**Intercepting Routes** can support navigation where a route is shown within the context of the current UI instead of always replacing the entire view.

Conceptual example:

```text
Gallery
↓
Open photo
↓
Photo appears as modal
```

The gallery stays; the photo appears in that context. Direct visits to the photo location can still be a full view. This lesson does not teach `(.)`, `(..)`, `(..)(..)`, `(...)`, or intercepting folder syntax.

Intercepting Routes will be studied separately.

## Routing Patterns and URLs

Routing patterns should still preserve understandable URL behavior.

Conceptual benefits include:

- navigation history;
- direct linking;
- bookmarking;
- predictable application locations.

Not every UI state must have a unique URL. A tooltip or a temporary highlight usually should not. Places the user might share, refresh, or return to often should.

## Routing Patterns and User Experience

Good routing architecture can make:

- navigation more predictable;
- context easier to preserve;
- application states easier to share;
- complex interfaces easier to organize.

Routing complexity can also increase implementation complexity. A better URL model is not automatic UX. The pattern has to match how people actually move through the product.

## Trade-offs

Advanced routing introduces costs as well as capabilities:

- additional routing complexity;
- a harder mental model;
- more route states to test;
- browser navigation behavior to get right;
- direct navigation behavior that may differ from in-app navigation;
- fallback behavior when a region has no matching content;
- maintainability over time.

Advanced routing should solve a real UX or architecture problem. If a simple page mapping is enough, keep the simple mapping.

## Conceptual Decision Examples

**Scenario 1: Simple About page**

Requirement: Display one page.

Conclusion: No advanced routing pattern is needed.

**Scenario 2: Analytics dashboard**

Requirement: Several route-driven UI regions visible simultaneously.

Conclusion: A pattern supporting parallel UI regions may be useful.

The implementation of that pattern is a later subtopic.

**Scenario 3: Photo gallery**

Requirement: Opening a photo from the gallery should preserve gallery context, while directly visiting the photo URL should still work.

Conclusion: A context-preserving routing pattern may be useful.

Interception syntax is not taught here.

## Common Misconceptions

**"Every application needs advanced routing patterns."**  
False. Many sites only need straightforward route-to-page mapping.

**"Routing patterns are only folder naming conventions."**  
False. A pattern is a recurring solution to a navigation problem. Folder conventions are how a framework may express that solution later.

**"A modal should always be controlled only by local state."**  
False. Some modals are purely local. Some represent a shareable or history-aware place and benefit from routing.

**"Routing only matters when changing the entire page."**  
False. Routing can also describe overlays, split views, and other partial updates that still have a location.

**"Parallel UI means multiple browser pages."**  
False. It means multiple meaningful regions in the same application view, not several browser tabs.

**"Complex routing automatically creates a better user experience."**  
False. Extra routing complexity can confuse users and developers if it does not match a real requirement.

**"Routing patterns replace application architecture."**  
False. They are part of navigation architecture. They do not replace the rest of how the application is designed.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Parallel Routes implementation
- slots
- `@folder` syntax
- Intercepting Routes implementation
- intercepting route conventions
- Route Groups
- Structuring Routes
- API Endpoints
- Middleware

## Key Takeaways

1. A **routing pattern** is a reusable architectural approach for organizing routes and navigation behavior.
2. Simple route-to-page mapping is not enough for every application.
3. Routing patterns solve recurring navigation problems, not only naming folders.
4. Routing can **preserve application context** while part of the screen changes.
5. Some interfaces need **multiple route-driven regions** visible at once.
6. Modal navigation can be **routing-aware**, including different behavior for direct visits.
7. Meaningful routing state can improve deep linking, refresh, and browser navigation.
8. Advanced routing patterns introduce complexity and should not be used by default.
9. **Parallel Routes** and **Intercepting Routes** are specific patterns that will be studied separately.
10. Routing patterns should be driven by real application requirements.
