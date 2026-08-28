# Pages Router

## Overview

**Pages Router** is one of the two major routing systems available in Next.js. It uses the `pages/` directory to define routes.

This lesson studies only the basic Pages Router structure: static routes, nested folders, `Link` navigation, and recognition of special files such as `_app.tsx` and `_document.tsx`. It does not compare Pages Router in depth with App Router.

## The pages Directory

Files inside `pages/` can define application routes. Basic structure:

```text
pages/
├── index.tsx
├── about.tsx
└── contact.tsx
```

Route mapping:

- `pages/index.tsx` → `/`
- `pages/about.tsx` → `/about`
- `pages/contact.tsx` → `/contact`

This lesson focuses only on basic static routes.

## Root Route

`pages/index.tsx` represents `/`.

Within a directory, `index.tsx` is special: it maps to the directory’s path itself rather than to a path segment named `index`. At the root of `pages/`, that means the site root `/`.

## Static Routes

Adding `pages/about.tsx` creates `/about`.

Adding `pages/contact.tsx` creates `/contact`.

The file name (without extension) becomes the URL path segment. That is the basic file-to-URL relationship in Pages Router.

## Nested Static Routes

Folders under `pages/` create nested path segments.

Example:

```text
pages/
└── products/
    └── index.tsx
```

- `pages/products/index.tsx` → `/products`

With a nested child file:

```text
pages/
└── products/
    ├── index.tsx
    └── featured.tsx
```

- `/products` → `pages/products/index.tsx`
- `/products/featured` → `pages/products/featured.tsx`

Dynamic segments are not introduced in this lesson.

## page Files

Each route file exports a React component that represents the page content for that URL. When the route matches, Next.js renders that component as the page.

This lesson does not reteach React component theory or rendering strategies.

## Internal Navigation

Use Next.js `Link` for basic internal navigation:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```

`Link` connects routes inside the same application. Do not use `useRouter` or navigation events in this lesson.

## _app.tsx

Pages Router projects may include `pages/_app.tsx` as a shared application entry point around page components. It can be used for application-wide concerns.

In this demo, `_app.tsx` stays minimal: it loads global styles and renders the active page component. Providers, global state, authentication, and advanced customization are outside this lesson.

`_app.tsx` is **not** a normal route. It does not map to a URL such as `/_app`.

## _document.tsx

Pages Router can use `pages/_document.tsx` to customize the overall HTML document structure.

This demo keeps the generated `_document.tsx` unchanged. Implementation details and customization are outside this lesson.

Like `_app.tsx`, `_document.tsx` is **not** a normal route.

## Recognizing a Pages Router Project

One strong indicator is the presence of `pages/` with route files such as `pages/index.tsx`.

Projects may contain additional directories (`styles/`, `public/`, configuration files, and so on), but route definitions in `pages/` indicate Pages Router usage.

## Basic Route Flow

```text
URL
↓
pages/ file
↓
Page component
↓
Visible page
```

This model is intentionally simplified.

## Pages Router Structure

Actual simplified structure used in this lesson’s demo (`demo-app/`):

```text
pages/
├── _app.tsx
├── _document.tsx
├── index.tsx
├── about.tsx
├── contact.tsx
└── products/
    ├── index.tsx
    └── featured.tsx
```

Routes demonstrated:

| URL | File |
| --- | ---- |
| `/` | `pages/index.tsx` |
| `/about` | `pages/about.tsx` |
| `/contact` | `pages/contact.tsx` |
| `/products` | `pages/products/index.tsx` |
| `/products/featured` | `pages/products/featured.tsx` |

## What We Are Not Learning Yet

These topics are outside this lesson:

- App Router
- Why use App Router
- dynamic routes
- route parameters
- catch-all routes
- `getServerSideProps`
- `getStaticProps`
- `getStaticPaths`
- API routes
- routing terminology
- layouts
- loading
- streaming
- error states
- data fetching

## Common Misconceptions

**"Every .tsx file in a Next.js project becomes a route."**  
False. In Pages Router, route files live under `pages/`. Other folders are not automatically routes.

**"Pages Router requires App Router."**  
False. Pages Router is its own routing model.

**"index.tsx creates an /index URL."**  
False. `index.tsx` maps to the directory path itself (`/` or `/products`, not `/index` or `/products/index`).

**"_app.tsx is a normal route."**  
False. It is a special application entry point, not a URL route.

**"_document.tsx is a normal route."**  
False. It customizes the HTML document shell and is not a URL route.

**"Pages Router is the same thing as the pages themselves."**  
False. Pages Router is the routing system; the page files are the route definitions within that system.

## Key Takeaways

1. Pages Router is a Next.js routing system based on `pages/`.
2. It uses the `pages/` directory to define routes.
3. `pages/index.tsx` maps to `/`.
4. `pages/about.tsx` maps to `/about`.
5. Nested folders can create nested static routes such as `/products` and `/products/featured`.
6. Route files export page components.
7. `Link` can navigate between internal routes.
8. `_app.tsx` has a special application-level role.
9. `_document.tsx` has a special document-level role.
10. Advanced Pages Router features are intentionally outside this lesson.

## Commands

### Development

```bash
cd demo-app
npm run dev
```

Then open:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/contact`
- `http://localhost:3000/products`
- `http://localhost:3000/products/featured`

### Validate

```bash
npm run build
npm run lint
```

### Production

```bash
npm run start
```
