import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This route is defined by app/about/page.tsx.</p>
      <p>Current route: /about</p>
      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  );
}
