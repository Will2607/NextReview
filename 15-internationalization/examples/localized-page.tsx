// Isolated educational page that conceptually represents app/[lang]/page.tsx.
// lang conceptually comes from app/[lang].
// params is asynchronous in the current App Router.
// The locale is validated before dictionary access.
// The selected dictionary controls localized content.
// A real application may use notFound() or another fallback strategy
// for unsupported locales.

import {
  getDictionary,
  hasLocale,
} from "./dictionaries";

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return (
      <main>
        <h1>Unsupported locale</h1>
      </main>
    );
  }

  const dictionary =
    getDictionary(lang);

  return (
    <main>
      <h1>{dictionary.greeting}</h1>
      <p>{dictionary.products}</p>
    </main>
  );
}
