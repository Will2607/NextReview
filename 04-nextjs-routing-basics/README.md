# Next.js Routing Basics

## Overview

Routing determines which application content is associated with a URL. Simple examples:

- `/`
- `/about`
- `/contact`

Next.js provides built-in routing so these paths can map to application pages without assembling a separate routing library for basic cases. This lesson focuses only on that basic behavior. It does not compare router implementations.

## URL and Route

A route associates a URL path with application content. Examples:

| URL path | Application content |
| -------- | ------------------- |
| `/` | Home |
| `/about` | About |
| `/contact` | Contact |

When the browser visits a path, Next.js matches that path to the corresponding page content. A dedicated Routing Terminology lesson comes later; this lesson only needs the basic URL-to-content relationship.

## File-System Routing

Next.js uses the application's file and directory structure to define routes. For this lesson, only simple static routes are used:

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

What this means for basic routing:

- `app/page.tsx` corresponds to `/`
- `app/about/page.tsx` corresponds to `/about`
- `app/contact/page.tsx` corresponds to `/contact`

Advanced folder conventions are intentionally out of scope.

## The Root Route

`app/page.tsx` represents the application's root route: `/`.

Visiting the site root shows the content defined in that file.

## Creating a Static Route

Adding `app/about/page.tsx` creates content available at `/about`.

Likewise, `app/contact/page.tsx` corresponds to `/contact`.

A directory under `app/` plus a `page.tsx` file is enough to create a basic static route in this lesson. Dynamic route syntax is not introduced here.

## page.tsx

At a high level, `page.tsx` provides the UI for a route.

In this lesson, that is its only responsibility: when a URL matches a route, the corresponding `page.tsx` supplies the visible page content. Rendering models and component types are later topics.

## Basic Navigation

Next.js `Link` is used for basic internal navigation between application routes.

Minimal example:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```

`Link` connects one route to another inside the same application. Prefetching internals and router APIs are outside this lesson. Do not use `useRouter` here.

## Internal Navigation

Application links can connect routes such as:

- Home → About
- Home → Contact
- About → Home

Use `Link` for those internal transitions. This demo places minimal navigation links directly inside each page. Shared navigation through layouts is a later roadmap lesson.

## Direct URL Access

Routes can also be visited directly in the browser. Examples:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/contact`

Navigation is not limited to clicking `Link` components. Typing or opening a URL can reach the same routes.

## Unknown Routes

Visiting a route that does not exist does not match one of the pages created in this lesson (`/`, `/about`, `/contact`).

Custom not-found pages and error handling belong to later lessons and are not taught here.

## Basic Routing Flow

```text
URL
↓
Next.js routing
↓
Matching route
↓
page.tsx
↓
Visible page
```

This model is intentionally simplified: a URL is matched to a route, and that route’s `page.tsx` becomes the visible page.

## Demo Application

This lesson includes a real Next.js app at `04-nextjs-routing-basics/demo-app/`.

Routes intentionally created for this lesson:

```text
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
└── contact/
    └── page.tsx          → /contact
```

Each page shows its current route and uses `Link` for internal navigation to the other pages.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- App Router vs Pages Router
- routing terminology
- dynamic routes
- route parameters
- catch-all routes
- layouts
- templates
- loading states
- streaming
- error states
- parallel routes
- intercepting routes
- API endpoints

## Key Takeaways

1. Routing associates application content with a URL.
2. A URL path can correspond to specific page content.
3. Next.js includes built-in routing.
4. Basic routes can be represented by directories and `page.tsx` files.
5. `app/page.tsx` represents `/`.
6. `app/about/page.tsx` represents `/about`.
7. `app/contact/page.tsx` represents `/contact`.
8. `Link` can navigate between internal routes.
9. Routes can also be visited directly in the browser.
10. Advanced routing concepts are intentionally outside this lesson.

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

### Validate

```bash
npm run build
npm run lint
```

### Production

```bash
npm run start
```
