import Link from "next/link";

export default function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>
      <p>The products folder represents the /products route segment.</p>
      <p>Current route: /products</p>
      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/products/featured">Featured Products</Link>
      </nav>
    </main>
  );
}
