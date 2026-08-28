import Link from "next/link";

export default function FeaturedProductsPage() {
  return (
    <main>
      <h1>Featured Products</h1>
      <p>Nested folders produce the /products/featured route.</p>
      <p>Current route: /products/featured</p>
      <nav>
        <Link href="/products">Products</Link>
        {" | "}
        <Link href="/">Home</Link>
      </nav>
    </main>
  );
}
