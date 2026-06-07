import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AppSidebar } from "@/features/dashboard/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        {/* ===== App Sidebar ===== */}
        <AppSidebar />

        <main className="flex flex-col w-full">
          {/* ===== Sidebar Trigger ===== */}
          <SidebarTrigger>Sidebar</SidebarTrigger>

          {/* ===== Main Content ===== */}
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
