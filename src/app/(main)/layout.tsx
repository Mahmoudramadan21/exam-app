import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AppSidebar } from "@/features/dashboard/layout";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session
  const jwt = await getNextAuthToken();
  const isAdmin = jwt?.user.role === "ADMIN";

  return (
    <>
      <SidebarProvider>
        {/* ===== App Sidebar ===== */}
        <AppSidebar isAdmin={isAdmin} />

        <main className="w-full bg-gray-50">
          {/* ===== Sidebar Trigger ===== */}
          <SidebarTrigger>Sidebar</SidebarTrigger>

          {/* ===== Main Content ===== */}
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
