# Locale Routing

Documentation-only example. This is not executable application code.

```text
app/
└── [lang]/
    ├── layout.tsx
    ├── page.tsx
    ├── about/
    │   └── page.tsx
    └── products/
        └── page.tsx
```

`[lang]` is a **dynamic route segment**. Its value becomes the locale prefix in the URL.

| URL | Meaning |
| --- | --- |
| `/en` | English home |
| `/es` | Spanish home |
| `/fr` | French home |
| `/en/products` | English products |
| `/es/products` | Spanish products |

The same nested routes (`about`, `products`) exist once under `[lang]`. Each supported locale reuses that tree.

Supported locales:

```text
en
es
fr
```

Default locale:

```text
en
```

Locale-less navigation is ambiguous until a locale is chosen:

```text
/products
↓
detect/fallback locale
↓
/en/products
```

Proxy can perform that redirect before rendering. This file does not implement Proxy code. The routing contract is: public URLs include a supported locale prefix, and `/products` is not left without one.
