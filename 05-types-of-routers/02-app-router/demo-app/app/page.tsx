import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>App Router</h1>
      <p>This page represents the root route defined by app/page.tsx.</p>
      <p>Current route: /</p>
      <nav>
        <Link href="/about">About</Link>
        {" | "}
        <Link href="/contact">Contact</Link>
        {" | "}
        <Link href="/products">Products</Link>
      </nav>
    </main>
  );
}
