import Link from "next/link";
import Head from "next/head";

export default function FeaturedProductsPage() {
  return (
    <>
      <Head>
        <title>Featured Products | Pages Router</title>
      </Head>
      <main>
        <h1>Featured Products</h1>
        <p>This file maps to /products/featured.</p>
        <p>Current route: /products/featured</p>
        <nav>
          <Link href="/products">Products</Link>
          {" | "}
          <Link href="/">Home</Link>
        </nav>
      </main>
    </>
  );
}
