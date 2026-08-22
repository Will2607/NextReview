# Router Structure Examples

Documentation-only examples comparing the basic route structures of the Pages Router and the App Router. These are conceptual diagrams, not runnable application code.

## Pages Router Example

```text
pages/
├── index.tsx
├── about.tsx
└── contact.tsx
```

Route mapping:

| URL | File |
| --- | ---- |
| `/` | `pages/index.tsx` |
| `/about` | `pages/about.tsx` |
| `/contact` | `pages/contact.tsx` |

In the Pages Router, files under `pages/` define routes. No component implementations are shown here.

## App Router Example

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

Route mapping:

| URL | File |
| --- | ---- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

In the App Router, folders plus `page.tsx` files define routes. Layouts and other special files are intentionally omitted.

## Side-by-Side Mental Model

```text
Pages Router
URL
↓
pages/ file
↓
Page

App Router
URL
↓
app/ route segment
↓
page.tsx
↓
Page
```

Both models start from a URL and end at page content. They differ in how that mapping is organized.

## Recognition Exercise

Identify which router each structure belongs to.

### Structure A

```text
pages/
└── products.tsx
```

**Answer:** Pages Router

### Structure B

```text
app/
└── products/
    └── page.tsx
```

**Answer:** App Router

### Structure C

```text
pages/
├── index.tsx
└── team.tsx
```

**Answer:** Pages Router  
(`/` from `index.tsx`, `/team` from `team.tsx`)

### Structure D

```text
app/
├── page.tsx
└── team/
    └── page.tsx
```

**Answer:** App Router  
(`/` from `app/page.tsx`, `/team` from `app/team/page.tsx`)
