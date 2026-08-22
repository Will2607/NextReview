import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This page is available through the /about route.</p>
      <p>Current route: /about</p>
      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  );
}
