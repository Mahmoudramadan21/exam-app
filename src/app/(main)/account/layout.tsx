import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AccountSidebar } from "@/features/dashboard/layout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full h-full min-w-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-6 w-full h-full">
        {/* ===== Account Sidebar ===== */}
        <AccountSidebar />

        <div className="grow">
          {/* ===== Sidebar Trigger ===== */}
          <SidebarTrigger className="absolute top-0 right-0">
            Account Settings
          </SidebarTrigger>

          {/* ===== Main Content ===== */}
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
