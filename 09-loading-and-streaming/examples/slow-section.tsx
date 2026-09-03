// Isolated educational example of delayed content.
// The timeout exists only to demonstrate delayed rendering.
// Production applications should not intentionally delay content this way.

export default async function SlowSection() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <section>
      <h2>Recommendations</h2>
      <p>The slow section is now available.</p>
    </section>
  );
}
