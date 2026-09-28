# Feature-Oriented Route Structure

Documentation-only example. This is not executable application code.

```text
app/
└── products/
    ├── page.tsx
    ├── [id]/
    │   └── page.tsx
    ├── _components/
    │   ├── product-card.tsx
    │   └── product-list.tsx
    └── _lib/
        └── format-product.ts
```

What each part is for:

| Path | Role |
| --- | --- |
| `page.tsx` | Route entry for `/products` |
| `[id]` | Nested dynamic route for `/products/:id` |
| `_components` | Route-local UI organization |
| `_lib` | Route-local utility organization |

`_components` and `_lib` are **organizational conventions**. Next.js does not require those folder names. They are one way to keep product UI and product helpers next to the products routes without implying that those folders are URL segments.

The special routing files remain `page.tsx` (and, elsewhere, files such as `route.ts`). Colocated helpers do not become public routes merely by sitting under `app/products/`.

Compare with broadly reused code that may live outside the feature:

```text
components/
lib/
```

If `product-card.tsx` is used only by products, keeping it under `app/products/` is reasonable. If a component or helper is used across many route areas, moving it to a shared `components/` or `lib/` location may make more sense. Shared placement is about reuse, not about a rule that nothing may live under `app/`.
