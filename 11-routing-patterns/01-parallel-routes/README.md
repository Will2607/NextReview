# Parallel Routes

The goal of this lesson is to understand Parallel Routes in the Next.js App Router. Some screens contain several meaningful UI regions that should be visible at the same time. Parallel Routes let those regions be represented as route-driven slots composed by a layout.

This lesson focuses only on Parallel Routes. It does not teach Intercepting Routes.

## Overview

Some application screens contain multiple meaningful UI regions that should be rendered at the same time.

Example:

```text
Dashboard
├── Team
├── Analytics
└── Notifications
```

**Parallel Routes** allow multiple route-driven UI regions to be represented simultaneously. Instead of treating the screen as one exclusive child page, the routing model can compose several named regions together.

This lesson introduces:

- slots;
- the `@folder` convention;
- layout composition of those slots.

Intercepting Routes are a separate later subtopic.

## The Problem Parallel Routes Solve

Normal nested routing often focuses on one child route location at a time. `/dashboard` shows one page. `/dashboard/reports` replaces that page with reports.

Some interfaces need several independently meaningful regions visible together.

Conceptual example:

```text
Dashboard
├── Main analytics
├── Team activity
└── Notifications
```

Modeling these regions as independent route-driven areas can be useful because each region can have its own content, its own nested locations, and its own place in the navigation model. The dashboard stays one screen. The regions stay separately addressable inside that screen.

## What Is a Slot?

A **slot** is a named UI region that can be provided to a layout.

```text
Dashboard Layout
├── children
├── team
└── analytics
```

Each slot represents a separate route-driven region. `team` is not “a component imported by hand.” It is a region the routing system can fill. `children` is still the default route content. Named slots sit beside it.

## @folder Convention

Parallel Routes use folders prefixed with `@` to define named slots.

```text
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    ├── @team/
    │   └── page.tsx
    └── @analytics/
        └── page.tsx
```

Meaning:

- `@team` → slot named `team`
- `@analytics` → slot named `analytics`

`@folder` names are **not** URL segments. The `@` prefix marks a slot folder for layout composition. It does not add `/team` or `/analytics` to the path just because those folders exist.

## Slots Are Not URL Segments

`@team` does **not** create `/team` just because the folder is named `@team`.

Slots participate in **layout composition** rather than directly becoming URL path segments. The dashboard URL still belongs to the `dashboard` segment. The `@team` folder fills the `team` prop of the dashboard layout.

This lesson does not introduce advanced route matching. The important distinction is: slot folder ≠ path segment.

## Layout Receives Slots

A simplified conceptual layout:

```tsx
export default function DashboardLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <main>
      {children}
      {team}
      {analytics}
    </main>
  );
}
```

Named slots become **props** passed to the layout. Next.js matches `@team` to `team` and `@analytics` to `analytics`. The layout decides how those regions are arranged on the screen.

## children as the Default Slot

`children` acts conceptually as the default route content.

```text
Layout
├── children
├── team
└── analytics
```

Named slots supplement the normal `children` content. `app/dashboard/page.tsx` still provides the default page for the dashboard segment. `@team` and `@analytics` add extra regions beside that page. This is Parallel Routes composition, not a new layouts lesson.

## Multiple Regions at the Same Time

Parallel Routes allow multiple UI regions to appear simultaneously.

Example:

```text
Dashboard
├── Main content
├── Team panel
└── Analytics panel
```

Each region can represent independent route content. The user can see main content, team, and analytics together. The layout renders all three instead of choosing only one child page.

## Independent Navigation

Different slots can maintain independent navigation states.

Example:

```text
Dashboard
├── Team
│   └── Members
└── Analytics
    └── Revenue
```

Changing one region does not necessarily require replacing all other regions. Team can show members while analytics still shows revenue. This lesson stays conceptual and does not teach router APIs.

## Active State

At a high level, Next.js can keep track of active subpages for slots.

```text
@team
└── members

@analytics
└── revenue
```

Each slot can conceptually maintain its own currently active route state. Team may be on members while analytics is on revenue. This lesson does not teach internal router state.

## Unmatched Slots

When Next.js cannot determine content for a slot during some navigation situations, fallback behavior may be needed.

That is the reason this lesson introduces **`default.tsx`**, only to the extent necessary.

## default.tsx

`default.tsx` can provide fallback content for a slot when Next.js does not have a matching active state for that slot.

```text
@analytics/
├── page.tsx
└── default.tsx
```

Conceptually:

- matching slot state → `page.tsx`
- no matching slot state → `default.tsx` fallback

`default.tsx` is optional in the sense that not every slot always needs one, but unmatched situations are why it exists. This lesson does not discuss advanced refresh behavior.

## Basic Parallel Route Structure

```text
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    ├── @team/
    │   ├── page.tsx
    │   └── default.tsx
    └── @analytics/
        ├── page.tsx
        └── default.tsx
```

The dashboard layout can render all regions together: default page content, the team slot, and the analytics slot. Each `@` folder supplies one named region. Each `default.tsx` can cover unmatched slot state.

## Dashboard Example

Conceptual UI:

```text
Dashboard
├── Main Dashboard
├── Team Panel
└── Analytics Panel
```

Mapping:

- `children` → Main Dashboard
- `team` → Team Panel
- `analytics` → Analytics Panel

This is a natural Parallel Routes use case because the dashboard is one place with several independently meaningful panels. The layout composes those panels. The routing model owns each panel’s content.

## Split View Example

Conceptual UI:

```text
Workspace
├── File List
└── File Preview
```

Both regions may be route-driven and visible simultaneously. Selecting a file can update preview without discarding the list. The parallel-region idea is enough here. Further implementation detail is outside this lesson.

## Master-Detail Example

Conceptual UI:

```text
Messages
├── Conversation List
└── Selected Conversation
```

Independently routed regions can be useful because the list and the selected conversation are both meaningful at once. Each can have its own slot. This lesson does not introduce Intercepting Routes. Master-detail here is simultaneous regions, not modal interception.

## Conditional Slot Rendering

A layout may decide where or whether to display a slot.

Conceptual example:

```text
if user has access
→ show admin panel slot

else
→ omit it
```

The layout receives the slot prop and can choose not to render it. This lesson does not introduce authentication or permission implementation.

## Parallel Routes and Layouts

Parallel Routes depend heavily on **layout composition**. Layouts receive slot content and decide how to arrange it.

The layout is still a shared wrapper. Parallel Routes add named regions to that wrapper. This is not a repeat of Layouts and Templates. The new idea is slots as layout props.

## Parallel Routes and URLs

Parallel Routes do not simply create multiple URLs at once.

They allow **one route hierarchy** to compose multiple route-driven regions. The dashboard remains a location in the application. Slots fill regions inside that location. Slot folder names do not become extra path segments by themselves.

Do not overcomplicate URL behavior here. Remember: `@team` is a slot name, not `/team`.

## When Parallel Routes May Be Useful

Parallel Routes **may** help for:

- dashboards;
- admin consoles;
- analytics interfaces;
- split-screen tools;
- master-detail applications;
- interfaces with multiple independently meaningful panels.

They **can** model those screens when regions should be route-driven, not only locally composed.

## When Parallel Routes May Be Unnecessary

Parallel Routes **may** be unnecessary for:

- simple informational pages;
- pages with one primary content region;
- applications where normal nested routing is sufficient.

Parallel Routes introduce complexity and should solve a real UI requirement. A single About page does not need slots.

## Advantages

Potential benefits include:

- multiple route-driven UI regions;
- independent navigation states;
- clearer modeling of complex dashboards;
- flexible layout composition;
- better organization of multi-panel interfaces.

These are possible outcomes when the pattern matches the interface. They are not automatic.

## Trade-offs

Costs include:

- a more complex route structure;
- more states to reason about;
- more fallback behavior;
- increased testing requirements;
- developers must understand slot behavior.

Parallel Routes are not necessary for every application. Use them when simultaneous route-driven regions are a real requirement.

## Parallel Routes Are Not Multiple Browser Pages

Parallel Routes do **not** mean multiple tabs or browser windows.

They describe multiple route-driven regions **inside one application UI**. The user still has one page view. The layout arranges several routed panels in that view.

## Parallel Routes Are Not Just Components

Developers could always render several React components manually. A dashboard component can import `TeamPanel` and `AnalyticsPanel`.

Parallel Routes are specifically about representing those regions through the **routing architecture**. The distinction matters: a slot is a route-driven region composed by the layout, not only a child component.

## Parallel Routes vs Normal Composition

**Normal composition:**

```text
Dashboard component
├── TeamComponent
└── AnalyticsComponent
```

**Parallel route composition:**

```text
Dashboard route
├── @team route slot
└── @analytics route slot
```

Parallel Routes move those regions into routing structure. Local composition can still be the right choice for simple panels. Neither approach is universally better. Choose based on whether the regions need to be route-driven.

## Common Misconceptions

**"`@team` creates a `/team` URL."**  
False. `@team` names a slot. It does not become a URL path segment.

**"Parallel Routes mean multiple browser pages."**  
False. They mean multiple route-driven regions in one application UI.

**"Every dashboard should use Parallel Routes."**  
False. Some dashboards are ordinary pages with local components. Use Parallel Routes when regions should be route-driven.

**"A slot is just a React component."**  
False. A slot is a named route-driven region provided to a layout. Components can fill it; the slot itself is a routing concept.

**"Parallel Routes replace layouts."**  
False. They depend on layouts. The layout receives slots and arranges them.

**"`default.tsx` is always required for every slot."**  
False. It provides fallback content when a slot has no matching active state. Not every slot always needs one.

**"Parallel Routes and Intercepting Routes are the same thing."**  
False. Parallel Routes compose simultaneous regions. Intercepting Routes are a separate later topic.

**"Parallel Routes automatically improve performance."**  
False. They change how regions are modeled in routing. They do not automatically make work faster.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Intercepting Routes
- `(.)`
- `(..)`
- `(...)`
- modal interception
- Structuring Routes
- API Endpoints
- Middleware
- advanced data fetching
- caching

## Key Takeaways

1. **Parallel Routes** let multiple route-driven UI regions render at the same time.
2. They solve screens where several independently meaningful regions should stay visible together.
3. A **slot** is a named UI region provided to a layout.
4. The **`@folder`** convention defines a named slot, such as `@team` → `team`.
5. An `@folder` does **not** create a URL segment.
6. Layouts receive named slots as **props**.
7. **`children`** represents the default route content; named slots supplement it.
8. Multiple slots can be **visible simultaneously**.
9. Slots can maintain **independent navigation states** conceptually.
10. **`default.tsx`** can provide fallback content when a slot has no matching active state.
11. Parallel Routes **may** be useful for dashboards, split views, and similar multi-panel UIs—and are unnecessary for simple pages.
12. **Intercepting Routes** are a separate upcoming topic.
