// Isolated example of contextual photo presentation.
// An intercepted route would decide when this presentation is used.
// Modal styling and accessibility implementation are outside this lesson.

export default function PhotoModal({
  id,
}: {
  id: string;
}) {
  return (
    <section role="dialog" aria-modal="true">
      <h2>Photo {id}</h2>
      <p>This represents a contextual photo presentation.</p>
    </section>
  );
}
