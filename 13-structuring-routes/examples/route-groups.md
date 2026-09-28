# Route Groups

Documentation-only example. This is not executable application code.

```text
app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── pricing/
│       └── page.tsx
└── (application)/
    ├── dashboard/
    │   └── page.tsx
    └── settings/
        └── page.tsx
```

URL mapping:

| File | URL |
| --- | --- |
| `app/(marketing)/page.tsx` | `/` |
| `app/(marketing)/about/page.tsx` | `/about` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/(application)/dashboard/page.tsx` | `/dashboard` |
| `app/(application)/settings/page.tsx` | `/settings` |

`(marketing)` and `(application)` **do not appear in the URL**. Parentheses mark organizational groups, not path segments.

Filesystem organization:

```text
(marketing)
(application)
```

Public route structure:

```text
/
/about
/pricing
/dashboard
/settings
```

Route Groups allow developers to organize routes without adding an extra URL segment. Marketing pages can live together. Application pages can live together. Visitors still see `/about` and `/dashboard`, not `/marketing/about` or `/application/dashboard`.

That split is useful when internal ownership and layout boundaries differ from the public path. The URL stays the navigation contract. The group folders stay an internal map.
