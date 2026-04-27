import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

import AppSidebar from "@/features/dashboard/layout/app-sidebar";
import { AppBreadcrumb } from "@/features/dashboard/layout/app-breadcrumb";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex flex-col w-full">
        {/* Top Header */}
        <div className="flex items-center gap-4 p-4 bg-white">
          <SidebarTrigger />
          <AppBreadcrumb />
        </div>

        {/* Page Content */}
        <div className="p-4 bg-gray-50 grow">{children}</div>
      </main>
    </SidebarProvider>
  );
}
