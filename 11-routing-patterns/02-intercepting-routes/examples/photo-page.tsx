// Isolated example that conceptually represents the normal standalone destination.
// Direct navigation may render this full-page version.
// The exact App Router params API is outside this isolated example.

export default function PhotoPage({
  id,
}: {
  id: string;
}) {
  return (
    <main>
      <h1>Photo {id}</h1>
      <p>This represents the standalone photo page.</p>
    </main>
  );
}
