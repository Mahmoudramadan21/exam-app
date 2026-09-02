import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AccountSidebar } from "@/features/dashboard/layout";
import { UserRoundCog } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full h-full min-w-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-6 w-full h-full lg:h-[calc(100svh-172px)]">
        {/* ===== Account Sidebar ===== */}
        <AccountSidebar />

        <div className="grow h-full bg-gray-50">
          {/* ===== Sidebar Trigger ===== */}
          <SidebarTrigger
            icon={<UserRoundCog className="size-5" />}
            className="absolute top-1 right-3"
            label="Open account settings"
          />

          {/* ===== Main Content ===== */}
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
