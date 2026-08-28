import Link from "next/link";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Pages Router</title>
      </Head>
      <main>
        <h1>About</h1>
        <p>This route is defined by pages/about.tsx.</p>
        <p>Current route: /about</p>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/contact">Contact</Link>
        </nav>
      </main>
    </>
  );
}
