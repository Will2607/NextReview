// Isolated educational page example.
// shouldFail={true} intentionally demonstrates a rendering failure.
// In a real App Router route with an appropriate error.tsx boundary,
// the fallback would handle the failure.

import FailingSection from "./failing-section";

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>This content represents the route page.</p>

      <FailingSection shouldFail={true} />
    </main>
  );
}
