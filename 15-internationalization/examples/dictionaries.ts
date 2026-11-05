// Isolated educational dictionaries for en, es, and fr.
// locales defines supported locale identifiers.
// Locale becomes a TypeScript union.
// All dictionaries use the same shape.
// hasLocale validates arbitrary route values.
// getDictionary selects localized content.
// The example uses in-memory objects to remain dependency-free.

export const locales = [
  "en",
  "es",
  "fr",
] as const;

export type Locale =
  (typeof locales)[number];

const dictionaries = {
  en: {
    greeting: "Hello",
    products: "Products",
  },
  es: {
    greeting: "Hola",
    products: "Productos",
  },
  fr: {
    greeting: "Bonjour",
    products: "Produits",
  },
} satisfies Record<
  Locale,
  {
    greeting: string;
    products: string;
  }
>;

export function hasLocale(
  value: string
): value is Locale {
  return locales.includes(
    value as Locale
  );
}

export function getDictionary(
  locale: Locale
) {
  return dictionaries[locale];
}
