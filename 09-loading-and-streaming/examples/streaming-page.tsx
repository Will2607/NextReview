// Isolated example that conceptually represents app/dashboard/page.tsx.
// Account Summary is immediately available content.
// SlowSection is delayed content.
// Suspense shows fallback UI while SlowSection is not ready.
// Together, this demonstrates the streaming mental model.

import { Suspense } from "react";

import SlowSection from "./slow-section";

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <h2>Account Summary</h2>
        <p>This content is immediately available.</p>
      </section>

      <Suspense fallback={<p>Loading recommendations...</p>}>
        <SlowSection />
      </Suspense>
    </main>
  );
}
