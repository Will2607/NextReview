"use client";

// Isolated example that conceptually represents app/dashboard/error.tsx.
// This file provides route-level error fallback UI for the dashboard segment.
// reset() asks Next.js to attempt rendering the affected content again.
// Production UI should not directly expose sensitive error details.
// The error parameter is received but intentionally unused in the UI.

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We could not display this section.</p>

      <button onClick={reset}>
        Try again
      </button>
    </main>
  );
}
