import AccountSidebar from "@/features/dashboard/layout/account-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full h-full min-w-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-6 w-full h-full">
        {/* Account Sidebar */}
        <AccountSidebar />

        <div className="grow">
          <SidebarTrigger />
          {/* Main Content */}
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
