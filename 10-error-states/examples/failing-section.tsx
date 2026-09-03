// Isolated educational example of a rendering failure.
// The thrown error exists only to demonstrate the error-state concept.
// Production code should throw only when an operation genuinely cannot continue correctly.

export default function FailingSection({
  shouldFail,
}: {
  shouldFail: boolean;
}) {
  if (shouldFail) {
    throw new Error("Unable to render the report section.");
  }

  return (
    <section>
      <h2>Report</h2>
      <p>The report is available.</p>
    </section>
  );
}
