// Isolated example that conceptually represents app/dashboard/@analytics/default.tsx.
// default.tsx provides fallback content when Next.js cannot resolve an active slot state.

export default function AnalyticsDefault() {
  return (
    <section>
      <p>No analytics view is currently selected.</p>
    </section>
  );
}
