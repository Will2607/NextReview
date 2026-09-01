// Isolated example that conceptually represents app/dashboard/layout.tsx.
// This layout wraps routes under /dashboard.

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <h1>Dashboard</h1>
      <nav>Dashboard Navigation</nav>
      {children}
    </section>
  );
}
