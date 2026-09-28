# Basic Route Structure

Documentation-only example. This is not executable application code.

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
├── products/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── account/
    └── page.tsx
```

URL mapping:

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/products/page.tsx` | `/products` |
| `app/products/[id]/page.tsx` | `/products/:id` |
| `app/account/page.tsx` | `/account` |

This structure is easy to understand because the folders match the public navigation model. Home, About, Products, one product, and Account sit where a reader would expect them. There are no extra organizational layers in the URL. A developer who knows `/products/42` can find `app/products/[id]/page.tsx` without guessing `misc/` or `pages2/`.

A small application can stay this simple. Additional groups, private folders, and shared trees become useful when ownership and reuse actually need them.
