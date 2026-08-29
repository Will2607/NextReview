# Routing Terminology

The goal of this lesson is to introduce the core vocabulary used when discussing routing. These terms appear throughout Next.js documentation, tutorials, and code reviews. Understanding them first makes later routing lessons easier to follow.

This lesson is conceptual. It does not teach advanced routing implementation.

## Overview

Routing discussions use several related terms that are easy to confuse. People often say “URL,” “path,” and “route” as if they were interchangeable. They describe related ideas, but they are not the same thing.

Terms such as:

- route
- path
- URL
- segment
- page
- nested route

describe different parts of the routing model. A single address like `https://example.com/products` can be discussed as a full URL, as a path, as a route, or as a collection of segments. Each term highlights a different aspect of the same structure.

## Route

A **route** is the application mapping between a URL location and the content or behavior associated with it.

Simple examples:

- `/` → Home
- `/about` → About
- `/products` → Products

The path `/about` is the location. The route is the application’s decision that this location corresponds to About content (and any related routing behavior). The mapping is what makes a location meaningful inside the app.

## URL

A **URL** identifies a resource or location.

Example:

```text
https://example.com/products
```

A URL contains more information than only the routing path. It can include a protocol (`https`), a host (`example.com`), and a path (`/products`). Later lessons do not depend on parsing URLs in code. The useful point here is that the full identifier is broader than the part used for routing.

## Path

The **path** is the portion of a URL that describes the location after the host.

For:

```text
https://example.com/products
```

the path is:

```text
/products
```

For:

```text
https://example.com/products/featured
```

the path is:

```text
/products/featured
```

Routing conversations usually focus on this portion, not on the protocol or hostname.

## Pathname

**Pathname** commonly refers to the path portion of a URL used for routing. In practice, “path” and “pathname” are often used for the same idea.

URL:

```text
https://example.com/products/featured
```

Pathname:

```text
/products/featured
```

This lesson treats pathname as the routing location string. It does not cover browser APIs for reading it.

## Route Segment

A route can be composed of **segments**. Each segment is one named part of the path.

Example:

```text
/products/featured
```

contains the conceptual segments:

- `products`
- `featured`

App Router commonly organizes route segments using directories. A folder name can correspond to one segment. Advanced segment conventions are later topics.

## Root Route

`/` represents the **root route**.

It is the starting location of the application: no additional path segments after the origin. In App Router, that root route is conceptually related to `app/page.tsx`. This lesson only uses that file as a terminology anchor. It is not another App Router implementation lesson.

## Parent and Child Segments

Consider these paths:

- `/products`
- `/products/featured`

Conceptually:

- `products` → **parent segment**
- `featured` → **child segment**

The child sits beneath the parent in the path hierarchy. `featured` is meaningful as a child of `products`, not as a standalone description of the full location.

This lesson uses only fixed, named segments. Dynamic segments are a later topic.

## Nested Route

A **nested route** has a hierarchical relationship with another route.

Example:

- `/dashboard`
- `/dashboard/settings`

The second route is nested beneath the dashboard path hierarchy. `/dashboard/settings` lives under `/dashboard`; it is not a sibling of `/dashboard` at the same level.

Nested routes describe path hierarchy. They do not, by themselves, require nested layouts. Layouts are a later topic.

## Route Hierarchy

Routing can form a tree-like structure:

```text
/
├── about
├── products
│   └── featured
└── dashboard
    └── settings
```

That hierarchy maps to these locations:

- `/`
- `/about`
- `/products`
- `/products/featured`
- `/dashboard`
- `/dashboard/settings`

Each branch adds a segment under a parent. The result is a **route hierarchy**: routes arranged by containment, not as a flat list of unrelated paths.

## Page

A **page** represents content exposed at a route.

In App Router, `page.tsx` can expose page content for a route segment. The page is the content. The route is the mapping that makes that content available at a location.

This is terminology only. How pages are rendered belongs to a later lesson.

## Folder and Segment Relationship

A simplified App Router example:

```text
app/
├── page.tsx
├── products/
│   ├── page.tsx
│   └── featured/
│       └── page.tsx
```

Mapping:

- `app/page.tsx` → `/`
- `app/products/page.tsx` → `/products`
- `app/products/featured/page.tsx` → `/products/featured`

Folders can participate in the route hierarchy. In this simplified model, a folder name can correspond to a route segment, and a `page.tsx` file can expose content for that segment.

Not every folder automatically becomes a public route. Folders participate in the hierarchy; exposing a page still follows routing conventions. Special routing folders are later topics.

## Route vs Path

These terms are related but not identical.

**Path:**  
The URL pathname, such as `/products`.

**Route:**  
The application mapping and behavior associated with that path.

`/products` is a path. The route is the application’s association of that path with Products content and routing behavior.

Developers sometimes use these terms informally. The distinction is still useful: a path is a location string; a route is how the application treats that location.

## Segment vs Path

**Path:**

```text
/products/featured
```

**Segments:**

- `products`
- `featured`

A full path can contain multiple route segments. A segment is one part. The path is the complete location formed by those parts.

## Route Tree

A **route tree** is a hierarchical representation of routes.

```text
Root
├── Products
│   └── Featured
└── About
```

The same hierarchy can be read as `/`, `/products`, `/products/featured`, and `/about`. Visualizing routes as a tree makes parent, child, and nested relationships easier to see.

This is a routing diagram, not React component-tree terminology.

## Navigation

**Navigation** is moving from one route or location to another.

Examples:

- `/` → `/about`
- `/products` → `/products/featured`

The first movement changes the location from the root to About. The second stays inside the products hierarchy and moves to a nested route.

This lesson defines the word only. It does not revisit `Link` in depth or introduce navigation APIs.

## Static Route

A **static route** has a fixed path. The location does not change from request to request.

Examples:

- `/about`
- `/contact`
- `/products`

These paths are known in advance. Other route forms exist later in the roadmap. This lesson only needs recognition of the term “static route.”

## Common Terminology Relationships

| Term | Meaning |
| --- | --- |
| URL | Full resource/location identifier |
| Path / Pathname | Routing portion such as `/products` |
| Route | Application mapping for a location |
| Segment | One part of a route path |
| Root route | `/` |
| Parent segment | Higher segment in the hierarchy |
| Child segment | Segment nested below another |
| Nested route | Route deeper in the hierarchy |
| Page | Content exposed for a route |
| Route tree | Hierarchical representation of routes |

## Example Breakdown

Use this full address:

```text
https://example.com/dashboard/settings
```

Broken down conceptually:

| Aspect | Value |
| --- | --- |
| URL | `https://example.com/dashboard/settings` |
| Pathname | `/dashboard/settings` |
| Segments | `dashboard`, `settings` |
| Root | `/` |
| Parent segment | `dashboard` |
| Child segment | `settings` |
| Route | `/dashboard/settings` |

These terms describe different aspects of the same navigation structure. The URL is the full identifier. The pathname is the routing location. The segments are the parts of that location. The route is the application mapping for that location.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- rendering pages
- layouts
- templates
- loading states
- streaming
- error states
- dynamic routes
- route parameters
- route groups
- parallel routes
- intercepting routes
- routing patterns
- API endpoints

## Common Misconceptions

**"A URL and a path are exactly the same thing."**  
False. A URL is the full identifier. A path is only the routing portion, such as `/products`.

**"A route segment is always the complete path."**  
False. A segment is one part of a path. `/products/featured` is one path made of two segments.

**"Nested routes require dynamic routes."**  
False. Nested routes describe hierarchy. `/products/featured` is nested and still uses fixed path names.

**"The root route is `/index`."**  
False. The root route is `/`. In App Router, `app/page.tsx` maps to `/`, not to `/index`.

**"Every folder automatically becomes a public route."**  
False. Folders can participate in the route hierarchy, but a folder does not by itself expose a public page. Route exposure follows conventions such as a `page` file.

**"A page and a route are exactly the same concept."**  
False. A route is the mapping for a location. A page is the content exposed at that location.

## Key Takeaways

1. A **route** is the application mapping between a location and the content or behavior associated with it.
2. A **URL** is the full resource or location identifier.
3. A **path** or **pathname** is the routing portion of a URL, such as `/products`.
4. A **route segment** is one part of a route path.
5. The **root route** is `/`.
6. **Parent** and **child** segments describe higher and lower parts of a path hierarchy.
7. A **nested route** sits deeper in that hierarchy, such as `/dashboard/settings` beneath `/dashboard`.
8. A **route hierarchy** (or **route tree**) arranges routes by containment.
9. A **page** is the content exposed for a route; it is not the same concept as the route itself.
10. URL, path, route, segment, and page are related terms. They describe different aspects of routing and should not be treated as identical.
