// Isolated example that conceptually represents a gallery route.
// Each destination URL represents the photo route, such as /photo/1.
// In-app navigation toward that URL may be intercepted and shown in context.
// Direct visits can still use the standalone photo page.

const photos = [
  { id: "1", title: "Mountain" },
  { id: "2", title: "City" },
  { id: "3", title: "Ocean" },
];

export default function GalleryPage() {
  return (
    <main>
      <h1>Gallery</h1>

      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <a href={`/photo/${photo.id}`}>
              {photo.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
