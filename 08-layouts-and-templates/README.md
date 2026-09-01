# Layouts and Templates

The goal of this lesson is to understand how layouts and templates organize shared UI in the Next.js App Router. Routes often need the same surrounding interface. Layouts and templates are the files that provide that shared structure.

This lesson focuses only on layouts and templates. It does not teach loading, streaming, or error handling.

## Overview

Routes often share interface structure.

Examples:

- navigation;
- sidebar;
- header;
- footer;
- section-specific UI.

Duplicating that structure in every `page.tsx` would be brittle. App Router provides **layouts** and **templates** to organize shared UI around route segments.

Loading and error behavior are later topics. This lesson stays on shared wrappers.

## What Is a Layout?

A **layout** is shared UI that wraps route content.

Conceptual structure:

```text
Layout
└── Page
```

The page is provided through `children`. The layout supplies the surrounding interface; the nested route supplies the inner content.

Minimal conceptual example:

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>Dashboard</h1>
      {children}
    </section>
  );
}
```

The heading is shared structure. `{children}` is the nested route content, such as a page. This lesson focuses on that wrapping structure, not on additional layout features.

## layout.tsx

`layout.tsx` is a special App Router file.

Example:

```text
app/
├── layout.tsx
└── page.tsx
```

The layout wraps page content. `page.tsx` still provides the route UI. `layout.tsx` provides the shared wrapper around it.

Other special route files exist later. This lesson covers `layout.tsx` and `template.tsx` only.

## children

Layouts receive nested route content through **`children`**.

```text
Layout
↓
children
↓
Page content
```

`children` represents the content rendered inside the layout. For a simple case, that content is the matching page. For nested layouts, `children` can be another layout plus a page.

This is the same React `children` idea used as a slot. This lesson does not teach React children in depth.

## Root Layout

The root App Router layout is commonly:

```text
app/layout.tsx
```

It wraps the application route tree. Every route sits inside this outermost layout.

The root layout includes the document structure required by Next.js, such as:

```text
<html>
<body>
```

Those elements belong in the root layout, not in every page. Metadata is a later topic; this lesson only notes the document wrapper.

## Root Layout Example

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

This is the outermost shared layout. Nested routes render inside `{children}`. The root layout stays around the rest of the application structure.

## Nested Layouts

Route segments can have their own layouts.

```text
app/
├── layout.tsx
├── page.tsx
└── dashboard/
    ├── layout.tsx
    └── page.tsx
```

Conceptual nesting:

```text
Root Layout
└── Dashboard Layout
    └── Dashboard Page
```

The root layout still wraps the application. The dashboard layout adds shared UI only for routes under `dashboard`. Nested layouts compose; they do not replace the root layout.

Route groups are a later topic.

## Shared UI

Layouts are useful because shared elements do not need to be duplicated in each page.

Typical shared UI:

- navigation bars;
- sidebars;
- section headers;
- common page structure.

A dashboard sidebar can live in `app/dashboard/layout.tsx`. Pages under `/dashboard` reuse that sidebar without repeating it.

## Layout Persistence

Layouts can **persist** across navigation between routes that share the same layout.

Example:

- `/dashboard`
- `/dashboard/settings`

If both sit under the same dashboard layout, the shared layout can remain while the page content changes. The sidebar or section header can stay in place. Only the inner page UI swaps.

This lesson stays conceptual. It does not cover implementation internals or client state.

## What Is a Template?

A **template** is similar to a layout because it wraps child content.

The key conceptual distinction:

- **Layouts persist** across navigation.
- **Templates create a new instance** for navigation within the affected segment.

Both wrap nested route content. They differ in whether the wrapper stays in place or is created again when navigation happens inside that segment.

This lesson does not discuss React keys or reconciliation internals.

## template.tsx

`template.tsx` is a special App Router file.

Minimal example:

```tsx
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
```

It wraps route content similarly to a layout, but it has different lifecycle behavior: a new instance is created on navigation for the affected segment.

## Layout vs Template

| Aspect | Layout | Template |
| --- | --- | --- |
| Wraps child content | Yes | Yes |
| Shared across routes | Yes | Yes |
| Persists across navigation | Typically yes | No |
| Creates a new instance on navigation | No | Yes |
| Common use | Persistent shared UI | UI that should reset/reinitialize |

Both files wrap `children`. The practical difference is persistence versus a fresh instance. This comparison stays conceptual.

## Why Persistence Matters

Persistence is useful when shared UI should remain stable while page content changes.

Conceptual examples:

- sidebar;
- navigation;
- section header.

Those pieces can stay visible as the user moves between related routes. The surrounding structure does not need to remount for every page change. This lesson does not introduce state preservation mechanisms.

## Why Templates Exist

Sometimes wrapped UI should be recreated when navigation occurs.

Conceptual examples:

- resettable UI;
- effects or animations that need a fresh instance;
- route-specific wrapper behavior.

A template is the tool for that “start again on navigation” wrapping. This lesson does not teach effects or animations in depth.

## Layout Hierarchy

```text
app/
├── layout.tsx
└── dashboard/
    ├── layout.tsx
    └── settings/
        └── page.tsx
```

Conceptual hierarchy:

```text
Root Layout
└── Dashboard Layout
    └── Settings Page
```

Layouts compose hierarchically. The settings page is nested inside the dashboard layout, which is nested inside the root layout. Shared UI at each level wraps the levels below it.

## Layout and Page Relationship

Keep these roles distinct:

- `layout.tsx` → shared wrapper
- `page.tsx` → route content
- `template.tsx` → wrapper that is recreated on navigation

The page still exposes the UI for a route. The layout wraps that UI and can persist. The template also wraps content, but it does not persist in the same way.

## Layout Does Not Create a Route by Itself

`layout.tsx` provides shared UI. It does not itself expose a page route.

A route still requires page content where appropriate. A dashboard layout can wrap `/dashboard` only when a page (or nested route content) exists for that location.

Route groups and advanced route behavior are later topics.

## Template Does Not Replace Layout

Templates and layouts solve related but different problems. One wraps persistently. The other wraps with a new instance on navigation.

`template.tsx` is not a required file. Many applications may not need templates at all. Use a layout for stable shared UI. Use a template only when a fresh wrapper instance is the desired behavior.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- `loading.tsx`
- streaming
- `error.tsx`
- error boundaries
- parallel routes
- intercepting routes
- routing patterns
- data fetching
- caching
- Server Actions

## Common Misconceptions

**"`layout.tsx` is a normal page."**  
False. A layout is a shared wrapper. A page is the route content. They are different special files with different roles.

**"Every route needs its own layout."**  
False. Nested layouts are optional. Routes can inherit a parent layout, including the root layout, without defining another `layout.tsx`.

**"`template.tsx` and `layout.tsx` behave exactly the same."**  
False. Both wrap child content. Layouts typically persist across navigation. Templates create a new instance on navigation for the affected segment.

**"A template is required whenever a layout exists."**  
False. Templates are optional. Many applications use layouts and never add `template.tsx`.

**"A nested layout replaces the root layout."**  
False. Nested layouts compose inside the root layout. The root layout remains the outermost wrapper.

**"Layouts automatically create routes."**  
False. A layout wraps nested content. It does not by itself expose a page route.

## Key Takeaways

1. A **layout** is shared UI that wraps route content.
2. `layout.tsx` is the special App Router file for that wrapper.
3. The **root layout** is commonly `app/layout.tsx` and includes the document structure (`html`, `body`).
4. **`children`** represents nested route content rendered inside the layout.
5. **Nested layouts** add shared UI for a route segment without replacing the root layout.
6. Layouts are useful for shared UI such as navigation, sidebars, and section structure.
7. Layouts can **persist** across navigation between routes that share the same layout.
8. A **template** also wraps child content, using `template.tsx`.
9. The key difference is lifecycle: layouts typically persist; templates create a new instance on navigation.
10. Loading and error handling are separate later topics.
