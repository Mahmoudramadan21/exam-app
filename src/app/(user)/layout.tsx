import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import AppSidebar from "@/features/dashboard/layout/app-sidebar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
