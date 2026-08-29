# Rendering Pages

The goal of this lesson is to understand how Next.js exposes page content for a route through `page.tsx`. Routing decides which location is matched. The page file defines the UI rendered for that location.

This lesson focuses only on page rendering. It does not teach layouts, loading, errors, or data fetching.

## Overview

Routing determines which route is matched. A page file defines the UI rendered for that route.

Simplified mental model:

```text
URL
↓
Route
↓
page.tsx
↓
Rendered UI
```

This lesson focuses on the `page.tsx` part of that flow: how a matched route becomes visible page content.

## What Is a Page?

In the App Router, a **page** is UI associated with a route.

A page is commonly defined using:

```text
page.tsx
```

The page file exports a React component. That component is the source of the visible content for the matching route. This lesson does not revisit React component theory.

## Root Page

`app/page.tsx` represents the page rendered for `/`.

Minimal example:

```tsx
export default function HomePage() {
  return <h1>Home</h1>;
}
```

The default exported component provides the visible page content for the root route. This lesson does not discuss rendering strategies.

## Static Route Page

`app/about/page.tsx` maps to `/about`.

Minimal example:

```tsx
export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the About page.</p>
    </main>
  );
}
```

When `/about` is matched, this page component provides the route content. The folder name `about` participates in the path. `page.tsx` supplies the UI.

## Nested Route Page

A page can sit deeper in the folder hierarchy:

```text
app/
└── products/
    └── details/
        └── page.tsx
```

This corresponds to `/products/details`.

Simple page implementation:

```tsx
export default function ProductDetailsPage() {
  return (
    <main>
      <h1>Product Details</h1>
      <p>This page represents the /products/details route.</p>
    </main>
  );
}
```

The nested folders form the path. The `page.tsx` file still has the same role: it exposes UI for that nested route. Dynamic segments are not introduced here.

## Route vs Page

These concepts are related but not identical.

**Route:**  
The application location associated with a pathname.

**Page:**  
The UI exposed for that route.

```text
/about
↓
route

app/about/page.tsx
↓
page implementation
```

`/about` is the location. `app/about/page.tsx` is the file that implements the UI for that location. Matching a route and rendering a page are two steps in the same flow.

## page.tsx

`page.tsx` is the special App Router file that exposes page content.

It:

- represents page content for a route segment;
- exports a React component;
- produces the UI for that route.

Other special files exist in later lessons. This lesson covers only `page.tsx`.

## Default Export

`page.tsx` uses a **default export** for the page component.

Example:

```tsx
export default function ProductsPage() {
  return <h1>Products</h1>;
}
```

Next.js looks for that default export when rendering the page for the matching route. The important convention here is the default export in a `page.tsx` file, not module systems in general.

## Rendering UI

A page component returns UI.

Example:

```tsx
export default function ProfilePage() {
  return (
    <main>
      <h1>Profile</h1>
      <p>User profile page.</p>
    </main>
  );
}
```

JSX describes the UI that Next.js renders for the route. The component return value is the page content. This lesson does not teach JSX syntax in depth.

## Simple Composition

A page can use small helper components. It does not need to contain all UI directly inside one function.

Conceptual example:

```tsx
function PageTitle() {
  return <h1>Products</h1>;
}

export default function ProductsPage() {
  return (
    <main>
      <PageTitle />
      <p>Available products.</p>
    </main>
  );
}
```

`PageTitle` is a local helper. The default export is still the page. This is simple composition inside one file, not application architecture or a component-folder convention.

## A Folder Alone Is Not a Page

Creating a normal route folder alone does not necessarily expose page UI.

Example:

```text
app/products/
```

Without a `page.tsx`, there is no page exposed for `/products` solely because the folder exists. The folder can participate in the route hierarchy. The page file is what exposes page UI for that segment.

This remains a conceptual rule. Special folder conventions are later topics.

## Page Hierarchy

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── products/
    └── details/
        └── page.tsx
```

Mapping:

- `/` → `app/page.tsx`
- `/about` → `app/about/page.tsx`
- `/products/details` → `app/products/details/page.tsx`

Each `page.tsx` provides UI for its corresponding route. The folder structure describes the locations. The page files describe the content.

## Rendering Does Not Mean Data Fetching

Rendering a page and fetching data are different concerns.

For this lesson, all page content is defined locally in the component. There are no remote sources.

This lesson does not teach:

- `fetch()`
- databases
- APIs
- async components
- data fetching patterns

## Rendering Does Not Mean Client Rendering

In this lesson, **rendering a page** simply means producing the page UI.

It does not revisit:

- CSR
- SSR
- SSG

Those rendering strategies were covered separately. This lesson also does not teach Server Components or Client Components.

## Page Naming

The exported function name may be descriptive:

- `HomePage`
- `AboutPage`
- `ProductsPage`

The special routing convention is the file name: `page.tsx`. Next.js uses the file name to recognize a page. The function name is for readability.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- layouts
- templates
- loading states
- streaming
- error states
- dynamic routes
- route params
- metadata
- data fetching
- async pages
- Server Components in depth
- Client Components
- caching

## Common Misconceptions

**"Every `.tsx` file inside `app/` becomes a route."**  
False. Route exposure follows conventions. `page.tsx` is the file that exposes page content for a route segment.

**"Every folder automatically renders a page."**  
False. A folder can participate in the hierarchy. Without a `page.tsx`, that folder does not by itself expose page UI.

**"`page.tsx` is the URL."**  
False. The URL or pathname is the location, such as `/about`. `page.tsx` is the file that implements the page UI for a matching route.

**"A route and a page are exactly the same thing."**  
False. A route is the location mapping. A page is the UI exposed for that route.

**"Rendering Pages means Client-Side Rendering."**  
False. In this lesson, rendering means producing the page UI. It is not a return to CSR, SSR, or SSG.

**"A page must contain all of its UI in one component."**  
False. A page can compose small helper components and still export one default page component.

## Key Takeaways

1. A **page** is UI associated with a route.
2. App Router uses `page.tsx` to expose page content.
3. `app/page.tsx` maps to `/`.
4. Nested `page.tsx` files can represent nested routes, such as `app/products/details/page.tsx` → `/products/details`.
5. A page exports a React component as its default export.
6. The page component returns the UI for the route.
7. **Route** and **page** are related but different concepts: location mapping versus exposed UI.
8. Folders alone do not necessarily expose page UI.
9. Pages can compose simple helper components.
10. Layouts, loading, errors, and data fetching are later topics.
