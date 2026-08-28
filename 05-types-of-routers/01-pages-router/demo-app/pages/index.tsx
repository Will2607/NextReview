import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pages Router</title>
        <meta name="description" content="A minimal Pages Router demo" />
      </Head>
      <main>
        <h1>Pages Router</h1>
        <p>This page represents the root route defined by pages/index.tsx.</p>
        <p>Current route: /</p>
        <nav>
          <Link href="/about">About</Link>
          {" | "}
          <Link href="/contact">Contact</Link>
          {" | "}
          <Link href="/products">Products</Link>
        </nav>
      </main>
    </>
  );
}
