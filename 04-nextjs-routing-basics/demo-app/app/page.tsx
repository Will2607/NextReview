import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Routing Basics</h1>
      <p>This is the home route of the routing basics demo.</p>
      <p>Current route: /</p>
      <nav>
        <Link href="/about">About</Link>
        {" | "}
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  );
}
