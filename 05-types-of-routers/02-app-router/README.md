# App Router

## Overview

**App Router** is one of the two major routing systems available in Next.js. It uses the `app/` directory to define routes.

This lesson studies only the basic App Router structure: static routes, nested folders, `Link` navigation, and recognition of special files such as `layout.tsx`. It does not explain why App Router may be preferred.

## The app Directory

The `app/` directory contains route segments and special files used by the App Router. For this lesson, the file that exposes a route is `page.tsx`.

Basic structure:

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

Route mapping:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/contact/page.tsx` → `/contact`

This lesson focuses only on basic static routes. Other special files are recognized later, not implemented here.

## Root Route

`app/page.tsx` represents `/`.

That is the application’s root route. Visiting the site root shows the content defined in this file.

## Route Segments

Folders inside `app/` represent URL segments when they contain a `page.tsx` file.

Example:

```text
app/
└── products/
    └── page.tsx
```

This maps to `/products`.

The `products` folder is a route segment. This lesson uses that term only at this basic level.

## Static Routes

Adding `app/about/page.tsx` creates `/about`.

Adding `app/contact/page.tsx` creates `/contact`.

The folder name becomes the URL path segment. That is the basic folder-to-URL relationship in App Router for static routes.

## Nested Static Routes

Folders can be nested. Nested folders that contain `page.tsx` files create nested static routes.

Example:

```text
app/
└── products/
    ├── page.tsx
    └── featured/
        └── page.tsx
```

- `/products` → `app/products/page.tsx`
- `/products/featured` → `app/products/featured/page.tsx`

Dynamic segments are not introduced in this lesson.

## page.tsx

`page.tsx` defines the UI exposed for a route segment.

When the URL matches that segment, Next.js uses the corresponding `page.tsx` as the page content. This lesson treats `page.tsx` only as the file that makes a route visible.

## Basic Internal Navigation

Use Next.js `Link` for basic internal navigation:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```

`Link` connects routes inside the same application. This lesson does not use `useRouter`, `router.push`, or `redirect`.

## layout.tsx Recognition

App Router projects usually contain a root `app/layout.tsx`. It is a special App Router file that surrounds page content.

This demo keeps the generated root layout. Custom layout behavior, nested layouts, and shared navigation architecture are not part of this lesson.

**Layouts and Templates** is a later roadmap topic.

## Special Files

App Router supports special files beyond `page.tsx`. Examples include:

- `layout.tsx`
- `loading.tsx`
- `error.tsx`

This lesson only recognizes that those files exist. It does not explain their behavior and does not create `loading.tsx` or `error.tsx`. They belong to later roadmap lessons.

## Recognizing an App Router Project

A strong indicator is the presence of `app/` with route folders containing `page.tsx` files.

For example, `app/products/page.tsx` is an App Router route file.

App Router applications may contain other special files, but this lesson focuses only on `page.tsx` as the file that exposes a route.

## Basic Route Flow

```text
URL
↓
app/ route segment
↓
page.tsx
↓
Visible page
```

This model is intentionally simplified.

## App Router Structure

Actual simplified structure used in this lesson’s demo (`demo-app/`):

```text
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
└── products/
    ├── page.tsx
    └── featured/
        └── page.tsx
```

Routes demonstrated:

| URL | File |
| --- | ---- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/products` | `app/products/page.tsx` |
| `/products/featured` | `app/products/featured/page.tsx` |

## Pages Router vs App Router

Pages Router uses `pages/`.

App Router uses `app/`.

Their deeper architectural differences were intentionally not studied here. This lesson does not teach why App Router may be preferred.

## What We Are Not Learning Yet

These topics are outside this lesson:

- Why use App Router
- routing terminology
- dynamic routes
- route parameters
- route groups
- parallel routes
- intercepting routes
- layouts in depth
- templates
- loading
- streaming
- error states
- Server Components
- Client Components
- route handlers
- data fetching
- caching

## Common Misconceptions

**"Every folder inside app/ automatically creates a public route."**  
False. A folder becomes a public route when it contains a `page.tsx` file. Other files and folders follow App Router conventions and do not all define URLs.

**"page.tsx and layout.tsx have the same role."**  
False. `page.tsx` exposes the route content. `layout.tsx` is a special file that surrounds page content. Layouts are studied later.

**"App Router means every component must be a Client Component."**  
False. App Router is a routing system. Client Components are a later topic and are not required to define basic routes.

**"App Router is a separate framework from Next.js."**  
False. App Router is a routing model inside Next.js.

**"Using app/ means routing no longer depends on URLs."**  
False. App Router still maps URL paths to route segments and `page.tsx` files.

## Key Takeaways

1. App Router is a Next.js routing system.
2. It uses the `app/` directory.
3. `app/page.tsx` maps to `/`.
4. Folders inside `app/` can represent route segments.
5. `app/about/page.tsx` maps to `/about`.
6. Nested folders can create nested static routes such as `/products` and `/products/featured`.
7. `page.tsx` exposes the content for a route segment.
8. `Link` can navigate between internal routes.
9. `layout.tsx` is a special file and will be studied later.
10. Advanced App Router concepts are intentionally outside this lesson.

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
