// Isolated example that conceptually represents app/dashboard/layout.tsx.
// children is the default route content.
// team represents the @team slot.
// analytics represents the @analytics slot.
// All three regions can be rendered by the same layout.

export default function DashboardLayout({
  children,
  team,
  analytics,
}: Readonly<{
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}>) {
  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <h2>Main Content</h2>
        {children}
      </section>

      <section>
        <h2>Team</h2>
        {team}
      </section>

      <section>
        <h2>Analytics</h2>
        {analytics}
      </section>
    </main>
  );
}
