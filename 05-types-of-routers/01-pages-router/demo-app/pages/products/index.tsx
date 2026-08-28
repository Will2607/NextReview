import Link from "next/link";
import Head from "next/head";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products | Pages Router</title>
      </Head>
      <main>
        <h1>Products</h1>
        <p>
          The index.tsx file inside the products directory maps to /products.
        </p>
        <p>Current route: /products</p>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/products/featured">Featured Product</Link>
        </nav>
      </main>
    </>
  );
}
