import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AppSidebar } from "@/features/dashboard/layout";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { redirect } from "next/navigation";
import { Menu } from "lucide-react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session
  const jwt = await getNextAuthToken();
  const isAdmin = jwt?.user.role === "ADMIN";

  const isAuthenticated = !!jwt;

  // Redirect unauthenticated users to login page
  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        {/* App Sidebar */}
        <AppSidebar isAdmin={isAdmin} />

        <main className="w-full bg-gray-50">
          {/* Sidebar Trigger */}
          <div className="w-full bg-white">
            <SidebarTrigger
              icon={<Menu className="size-5 ml-1.5" />}
              label="Open navigation"
            />
          </div>

          {/* Main Content */}
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
