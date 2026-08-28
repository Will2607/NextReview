import Link from "next/link";
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Pages Router</title>
      </Head>
      <main>
        <h1>Contact</h1>
        <p>This route is defined by pages/contact.tsx.</p>
        <p>Current route: /contact</p>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/about">About</Link>
        </nav>
      </main>
    </>
  );
}
