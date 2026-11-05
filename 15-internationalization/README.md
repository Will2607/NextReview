# Internationalization

The goal of this lesson is to understand how a Next.js App Router application can support multiple languages and locales. Internationalization is architecture. Localization is the actual content for a given locale. This lesson focuses on locale-prefixed routing, dictionaries, and localized rendering.

## Overview

**Internationalization**, commonly abbreviated as **i18n**, is the process of designing an application so that it can support multiple languages, regions, and formatting preferences.

**Localization**, commonly abbreviated as **l10n**, is the process of adapting actual content for a specific locale.

```text
Internationalization
→ architecture that supports multiple locales.

Localization
→ translated/adapted content for a specific locale.
```

i18n makes multiple languages possible. l10n fills in Spanish, English, or French for a given visitor.

## Why "i18n"?

**internationalization** starts with `i`, ends with `n`, and contains **18** characters between them. Therefore: **i18n**.

**localization** starts with `l`, ends with `n`, and contains **10** characters between them. Therefore: **l10n**.

The abbreviations are nicknames, not extra technologies.

## What Is a Locale?

A **locale** is an identifier representing language and optionally regional preferences.

Examples:

```text
en
es
fr
en-US
en-GB
es-PE
```

- `en` → English without a specific region.
- `en-US` → English as used in the United States.
- `en-GB` → English as used in the United Kingdom.
- `es-PE` → Spanish with Peruvian regional context.

This is not a language-standards lesson. Treat these as identifiers the application understands.

## Language vs Locale

Language and locale are related but not identical.

```text
Language:
English

Possible locales:
en-US
en-GB
```

The language is the same. Formatting and regional conventions may differ: dates, spelling, and currency presentation can still change.

## What Internationalization Can Affect

Conceptually, i18n can affect:

- translated text;
- dates;
- numbers;
- currencies;
- pluralization;
- routing;
- localized metadata;
- regional formatting.

This lesson stays primarily on **routing** and **translated content**. `Intl` APIs are not taught in depth.

## Localized Routes

Next.js applications can represent locales in the URL.

```text
/en/products
/es/products
/fr/products
```

Conceptual mapping:

```text
locale
+
route
```

In `/en/products`:

- `en` → locale
- `products` → application route

The path names both **which language** and **which page**.

## Why Put the Locale in the URL?

Potential benefits:

- shareable localized URLs;
- predictable routing;
- bookmarking;
- browser navigation;
- search-engine discoverability;
- server-side awareness of the selected locale.

This is not an SEO lesson. The useful idea is: the locale is part of the location, so the server and the user can see it.

## app/[lang]

App Router structure:

```text
app/
└── [lang]/
    ├── layout.tsx
    ├── page.tsx
    └── products/
        └── page.tsx
```

`[lang]` is a **dynamic route segment**.

```text
/en/products
→ lang = "en"

/es/products
→ lang = "es"
```

The folder name `lang` becomes the param name. The URL value becomes the param value.

## Localizing the Entire Route Tree

Next.js recommends nesting route files that should be localized inside `app/[lang]/`.

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

Routes:

```text
/en
/en/about
/en/products

/es
/es/about
/es/products
```

The same page tree exists once. Each locale is a prefix, not a duplicated copy of every folder for every language.

## Locale Parameter

A modern App Router page:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main>
      <p>Current locale: {lang}</p>
    </main>
  );
}
```

`params` is **asynchronous** in current App Router versions. Await it, then read `lang`. This lesson stays focused on locale handling, not on params APIs in general.

## Supported Locales

```ts
const locales = [
  "en",
  "es",
  "fr",
] as const;
```

An application should define which locales it **actually** supports. Do not accept arbitrary locale values without validation. `[lang]` can match `/zz` unless the app checks the list.

## Locale Type

```ts
export const locales = [
  "en",
  "es",
  "fr",
] as const;

export type Locale =
  (typeof locales)[number];
```

This produces the union `"en" | "es" | "fr"` conceptually. Functions that need a real locale can take `Locale` instead of any string.

## Default Locale

A **default locale** is used when the application cannot determine a preferred **supported** locale.

```ts
const defaultLocale = "en";
```

```text
unknown/unsupported preference
↓
fallback
↓
en
```

The default is a safety net, not a claim that English is universally preferred.

## Locale Detection

The user’s preferred language may be inferred from incoming request information.

One common signal is **`Accept-Language`**.

Conceptually:

```text
Accept-Language:
es-PE,es;q=0.9,en;q=0.8
```

The application can compare requested language preferences with supported locales. Complete `Accept-Language` parsing is **not** implemented manually in this lesson.

## Accept-Language

Browsers may send language preferences through the `Accept-Language` request header.

```text
Browser preferences
↓
Accept-Language
↓
Proxy
↓
Choose supported locale
↓
Localized route
```

Setting Headers is not re-taught. The header is a **signal**, not a command that must always win.

## Proxy and Locale Routing

The previous Proxy section is the natural place for “no locale in the URL yet.”

```text
Request:
/products

Proxy
↓
No locale prefix found
↓
Determine locale
↓
Redirect

Result:
/es/products
```

Proxy can handle this **before** route rendering. The full Proxy lesson is not rebuilt here.

Conceptual check:

```ts
const locales = ["en", "es", "fr"];

const pathnameHasLocale =
  locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname.startsWith(
        `/${locale}/`
      )
  );
```

If a locale exists → continue.

If a locale does not exist → choose a supported or default locale, then redirect to a locale-prefixed URL.

Do not create another `proxy.ts` example file. Proxy was already studied in depth.

## Locale Prefix Detection

```ts
const pathnameHasLocale = locales.some(
  (locale) =>
    pathname === `/${locale}` ||
    pathname.startsWith(`/${locale}/`)
);
```

```text
/en/products
→ locale already exists.

/products
→ locale prefix missing.
```

`/en` matches the exact prefix. `/en/products` matches the prefix plus a slash. `/energy` should not be treated as locale `en` without care; the `/${locale}/` form avoids that class of mistake for nested paths.

## Locale Redirect

```text
Incoming:
/products

Detected locale:
es

Redirect:
/es/products
```

This avoids rendering an **ambiguous locale-less** page. Advanced locale negotiation is not implemented.

## Sub-Path Routing

**Sub-path** locale routing encodes the locale inside the URL path.

```text
example.com/en/products
example.com/es/products
example.com/fr/products
```

This is the **primary strategy** used in this lesson.

## Domain Routing

Locale can also be represented using domains.

```text
example.com
example.fr
example.es
```

Domain-based routing is **not** implemented. This lesson uses sub-path routing because it is easier to demonstrate with the App Router `[lang]` segment.

## Internationalization vs Translation

i18n is **not** simply replacing strings.

It includes architecture for:

- locale selection;
- routing;
- translations;
- formatting;
- fallback behavior.

Translation is one part of localization. Dates, URLs, and `html lang` still matter.

## Dictionaries

**Dictionaries** are a simple translation strategy.

```text
dictionaries/
├── en.json
├── es.json
└── fr.json
```

English:

```json
{
  "products": {
    "addToCart": "Add to Cart"
  }
}
```

Spanish:

```json
{
  "products": {
    "addToCart": "Agregar al carrito"
  }
}
```

French:

```json
{
  "products": {
    "addToCart": "Ajouter au panier"
  }
}
```

Same keys. Different values. The UI looks up a key, not a hardcoded sentence.

## Dictionary Keys

Application code should usually work with **stable translation keys** rather than embedding conditional translations everywhere.

Key: `products.addToCart`

```text
en
→ Add to Cart

es
→ Agregar al carrito

fr
→ Ajouter au panier
```

The code says `products.addToCart`. The dictionary supplies the words.

## getDictionary()

Conceptual TypeScript:

```ts
const dictionaries = {
  en: () =>
    Promise.resolve({
      greeting: "Hello",
    }),

  es: () =>
    Promise.resolve({
      greeting: "Hola",
    }),

  fr: () =>
    Promise.resolve({
      greeting: "Bonjour",
    }),
};
```

The locale selects the appropriate translation dictionary. The required example in this lesson stays **dependency-free** and can use in-memory objects instead of JSON files.

## Dynamic Dictionary Loading

Real applications may use **dynamic imports**:

```text
en
→ load English dictionary.

es
→ load Spanish dictionary.

fr
→ load French dictionary.
```

This can avoid loading every language dictionary unnecessarily. Bundler internals are not introduced.

## Server Components and Dictionaries

App Router pages and layouts are Server Components by default.

Localized dictionaries can therefore be loaded **server-side**. Only rendered content needs to reach the client. Server Components are not re-taught here.

## Localized Page

```text
URL:
/es

↓
lang = "es"

↓
getDictionary("es")

↓
{
  greeting: "Hola"
}

↓
render localized UI
```

The URL, the param, the dictionary, and the UI should agree.

## Validate the Locale

`[lang]` can match **arbitrary strings** unless application logic validates it.

```text
/en
→ supported.

/es
→ supported.

/abc
→ unsupported.
```

Application logic should detect unsupported locales before treating them as `Locale`.

## hasLocale()

```ts
export function hasLocale(
  value: string
): value is Locale {
  return locales.includes(
    value as Locale
  );
}
```

It narrows arbitrary strings to supported locale values. After `hasLocale(lang)` is true, TypeScript can treat `lang` as `Locale`. Keep TypeScript details concise: this is a type guard.

## Unsupported Locales

Possible strategies:

```text
Unsupported locale
↓
404

or

Unsupported locale
↓
redirect to default locale
```

There is no universal strategy. For this lesson, returning `notFound()` is a **reasonable** approach. Error States are not re-taught. The isolated page example uses a simple unsupported message instead of importing `notFound()`, so it stays standalone.

## Locale Fallback

A **fallback locale** is used when the preferred locale is not supported.

```text
Supported:
en
es
fr

Incoming preference:
de

Fallback:
en
```

Fallback prevents the application from having **no** language choice.

## Regional Fallback

```text
User requests:
es-PE

Application supports only:
es

Possible locale resolution:
es-PE
↓
es
```

Complex negotiation is not implemented. The idea is: a region-specific tag can fall back to the language tag.

## Localized Root Layout

```text
app/
└── [lang]/
    └── layout.tsx
```

The locale can be used for:

```tsx
<html lang={lang}>
```

This provides the **document language** to browsers and assistive technologies.

## html lang Attribute

```html
<html lang="es">
```

It helps:

- accessibility tools;
- browsers;
- search engines;
- language-aware processing.

This is not an accessibility lesson. Matching `lang` to the active locale is the requirement.

## generateStaticParams()

At a basic level:

```ts
export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "es" },
    { lang: "fr" },
  ];
}
```

This can allow locale routes to be generated for **known supported locales**. Static rendering is not re-taught. Known locale route variants can be generated from supported locale values.

## Static Locale Generation

```text
Supported locales:
en
es
fr

↓
generateStaticParams()

↓
localized route variants
```

The app knows the three prefixes in advance. This stays basic.

## Language Switcher Concept

```text
Current URL:
/en/products

User selects Spanish

Desired URL:
/es/products
```

A language switcher usually changes the **locale portion** while preserving the rest of the route when appropriate. A Client Component is not built here.

## Preserving the Current Route

```text
Current:
/en/products/42

Switch locale:
/es/products/42
```

Changing the locale does **not** necessarily mean returning to the homepage. The product should stay the product; only the language prefix changes.

## Persisting Language Preference

Applications may remember a language preference using mechanisms such as cookies.

Cookies are not implemented again. Preference persistence is not created in this lesson.

## Browser Preference vs Explicit Choice

```text
Browser preference
→ useful initial signal.

Explicit user selection
→ often should take precedence after the user chooses a language.
```

Priority logic is not implemented. First visit may follow `Accept-Language`. After the user picks Spanish, that choice should usually win.

## Translation Completeness

Supported locales should ideally provide **compatible dictionary structures**.

English:

```json
{
  "navigation": {
    "home": "Home"
  }
}
```

Spanish:

```json
{
  "navigation": {
    "home": "Inicio"
  }
}
```

Stable keys simplify localized rendering. If English has `navigation.home`, Spanish should too.

## Missing Translation

Possible strategies:

- fallback translation;
- development error;
- missing-translation marker.

Advanced fallback systems are not implemented. The educational dictionaries in this lesson keep the same keys in every locale.

## Formatting Is Part of Localization

Translating text is **not** enough.

Example date:

```text
US:
11/04/2026

Other locales may use:
04/11/2026
```

Example currency:

```text
$1,234.50
```

may be formatted differently for other locales.

`Intl.DateTimeFormat` and `Intl.NumberFormat` are not taught in depth.

## Do Not Manually Concatenate Translations

Sentence fragments can become difficult to translate correctly.

Avoid conceptual patterns such as:

```text
"Hello " + user + ", you have " + count + " items"
```

when grammar may differ across languages. ICU MessageFormat is not taught. Keep whole messages in the dictionary when possible.

## URL Locale and Content Locale Must Agree

```text
URL:
/es/products
```

should generally produce **Spanish** localized content.

Avoid:

```text
/es/products
→ English content
```

because it makes routing semantics confusing. The prefix is a contract.

## Internationalization and SEO

Localized URLs make language variants explicit.

Search engines may need metadata describing alternate language versions. `hreflang` implementation is **not** taught yet.

## Internationalization and Accessibility

Correct `html lang` values help assistive technologies interpret content. Keep this concise: match the attribute to the locale.

## Internationalization and Performance

Loading every language dictionary everywhere may be unnecessary.

Loading only the required locale can reduce unnecessary translation data processing. Avoid precise performance claims.

## Locale Naming

Prefer standard locale identifiers:

```text
en
es
en-US
es-PE
```

Avoid arbitrary values such as `english` or `spanish-peru` unless the application has a specific internal reason.

## Keep Locale Configuration Centralized

Supported locales and the default locale should ideally have **one** clear source of truth.

Conceptually, a file such as `locales.ts` could contain `locales`, `defaultLocale`, and the `Locale` type.

That extra file is **not** created in the required structure. It is mentioned only as a pattern.

## Internationalization Libraries

Larger applications often use libraries such as:

- next-intl
- react-i18next
- Lingui
- other i18n solutions

This lesson does **not** install or implement them. The fundamentals remain important regardless of the chosen library.

## When a Library May Be Useful

Conceptual reasons:

- pluralization;
- message formatting;
- translation management;
- nested namespaces;
- locale switching;
- advanced fallback handling.

This stays introductory.

## When a Simple Dictionary May Be Enough

Examples:

- small educational app;
- few languages;
- limited translated content;
- simple server-rendered pages.

Architecture should match application complexity. Three greetings do not require a translation platform.

## Internationalization Decision Flow

```text
Does the application support multiple languages?

No
→ i18n routing may be unnecessary.

Yes
↓
Should locale be visible in the URL?

Yes
→ locale-prefixed routing may be appropriate.

↓
Define supported locales.

↓
Determine locale.

↓
Validate locale.

↓
Load localized content.

↓
Render using the correct locale.
```

## Common Misconceptions

**"Internationalization means only translating strings."**  
False. Routing, validation, fallback, `html lang`, and formatting are part of i18n.

**"Localization and internationalization are identical."**  
False. i18n is the architecture. l10n is adapting content for a locale.

**"Language and locale are always identical."**  
False. `en-US` and `en-GB` share a language and can differ regionally.

**"Every folder inside `[lang]` represents a language."**  
False. Nested folders such as `products/` are application routes. `[lang]` is the locale segment.

**"Any value passed to `[lang]` is automatically valid."**  
False. Validate against the supported list.

**"`Accept-Language` should always override the user's explicit language choice."**  
False. Browser preference is an initial signal. Explicit choice often should win afterward.

**"Every Next.js app needs an i18n library."**  
False. Small apps can use dictionaries. Libraries are optional.

**"All translation files must be sent to the browser."**  
False. Server Components can load one locale on the server.

**"The locale does not belong in routing architecture."**  
False. Locale-prefixed URLs make the locale part of the location.

**"Changing language should always return the user to the homepage."**  
False. Preserve the current route when appropriate (`/en/products/42` → `/es/products/42`).

**"English formatting rules work for every locale."**  
False. Dates, numbers, and currency presentation vary.

## What We Are Not Learning Yet

These topics appear later or elsewhere:

- next-intl implementation
- react-i18next implementation
- Lingui implementation
- ICU MessageFormat
- advanced pluralization
- `hreflang` configuration
- domain-based internationalization implementation
- translation management platforms
- localized metadata implementation
- advanced date formatting
- advanced number formatting
- translation fallback engines

## Key Takeaways

1. **Internationalization (i18n)** is architecture that supports multiple locales.
2. **Localization (l10n)** is translated or adapted content for a specific locale.
3. i18n and l10n are related; they are not identical.
4. A **locale** identifies language and optionally region (`en`, `es-PE`).
5. **Language** is not always identical to locale (`en-US` vs `en-GB`).
6. Locale-prefixed URLs look like `/es/products`: locale plus route.
7. **`app/[lang]`** is the dynamic segment that holds the locale.
8. **`lang`** comes from awaited App Router `params`.
9. Supported locales must be **validated**; `[lang]` can match junk.
10. A **default locale** is the fallback when preference is unknown or unsupported.
11. **`Accept-Language`** is a browser preference signal for detection.
12. **Proxy** can redirect locale-less paths such as `/products` → `/es/products`.
13. **Dictionaries** map stable keys to localized strings.
14. **`getDictionary(locale)`** selects that locale’s content.
15. **`<html lang={lang}>`** should match the active locale.
16. **`generateStaticParams()`** can emit known locale variants.
17. Changing locale should often **preserve** the current route, not jump home.
18. Translation is only **one part** of localization (formatting still matters).
19. A third-party i18n library is **optional**, not automatically required.
