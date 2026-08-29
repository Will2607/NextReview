// Isolated example that conceptually represents app/products/details/page.tsx.
// PageTitle is a local helper used only to show simple page composition.

function PageTitle() {
  return <h1>Product Details</h1>;
}

export default function ProductDetailsPage() {
  return (
    <main>
      <PageTitle />
      <p>This page represents the /products/details route.</p>
    </main>
  );
}
