# Routing Terminology Examples

Documentation-only examples. These diagrams and breakdowns are for recognizing routing vocabulary. They are not executable application code.

## Example 1 — Root Route

URL:

```text
https://example.com/
```

Pathname:

```text
/
```

Route:

```text
/
```

This is the **root route**. There are no named path segments after the origin. The URL still identifies a location; the routing location is simply `/`.

## Example 2 — Single Segment

URL:

```text
https://example.com/products
```

Pathname:

```text
/products
```

Segments:

- `products`

The URL is the full identifier. The pathname is the routing portion. That path contains one named segment: `products`. The route is the application mapping for `/products`.

## Example 3 — Nested Route

URL:

```text
https://example.com/products/featured
```

Pathname:

```text
/products/featured
```

Segments:

- `products`
- `featured`

Parent segment:

- `products`

Child segment:

- `featured`

This is a **nested route** because `/products/featured` sits beneath `/products` in the path hierarchy. The child segment `featured` is nested under the parent segment `products`. The path is the full location; the segments are its parts.

## Example 4 — Route Tree

```text
/
├── about
├── products
│   ├── featured
│   └── categories
└── dashboard
    └── settings
```

Each branch maps to a pathname:

| Branch | Pathname |
| --- | --- |
| Root | `/` |
| `about` | `/about` |
| `products` | `/products` |
| `products` → `featured` | `/products/featured` |
| `products` → `categories` | `/products/categories` |
| `dashboard` | `/dashboard` |
| `dashboard` → `settings` | `/dashboard/settings` |

`/products/featured` and `/products/categories` are nested under `/products`. `/dashboard/settings` is nested under `/dashboard`. `/about` is a sibling of `/products` and `/dashboard` under the root.

This tree uses only fixed path names.

## Example 5 — App Router Representation

```text
app/
├── page.tsx
├── products/
│   ├── page.tsx
│   └── featured/
│       └── page.tsx
```

Terminology mapping:

| Pathname | File | Segments |
| --- | --- | --- |
| `/` | `app/page.tsx` | none (root route) |
| `/products` | `app/products/page.tsx` | `products` |
| `/products/featured` | `app/products/featured/page.tsx` | `products`, `featured` |

Folders can correspond to route segments. `page.tsx` can expose page content for a segment. The folder tree and the route tree describe the same hierarchy in different words.

This is a terminology exercise, not an App Router implementation lesson.

## Recognition Exercises

### Exercise 1

Given:

```text
/dashboard/settings
```

Question: How many named path segments are present?

**Answer:** Two: `dashboard` and `settings`.

### Exercise 2

Given:

```text
app/products/featured/page.tsx
```

Question: What pathname does this represent in the simplified example?

**Answer:** `/products/featured`

### Exercise 3

Given:

```text
https://example.com/about
```

Question: What is the URL, and what is the pathname?

**Answer:**  
URL: `https://example.com/about`  
Pathname: `/about`

### Exercise 4

Given these locations:

```text
/products
/products/featured
```

Question: Which is the nested route, and which segment is the child segment?

**Answer:**  
`/products/featured` is the nested route.  
`featured` is the child segment.  
`products` is the parent segment.

### Exercise 5

Given:

```text
/
```

Question: Is this the root route? Is `/index` the correct name for it?

**Answer:**  
Yes, `/` is the root route.  
No, the root route is not `/index`.
