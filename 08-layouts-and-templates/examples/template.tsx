// Isolated example that conceptually represents app/dashboard/template.tsx.
// Templates wrap child content but are recreated on navigation for the affected segment.

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <p>Dashboard Template</p>
      {children}
    </section>
  );
}
