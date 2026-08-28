import Link from "next/link";

export default function ContactPage() {
  return (
    <main>
      <h1>Contact</h1>
      <p>This route is defined by app/contact/page.tsx.</p>
      <p>Current route: /contact</p>
      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/about">About</Link>
      </nav>
    </main>
  );
}
