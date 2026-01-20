import DashboardBreadcrumb from "@/components/dashboard/breadcrumb";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <DashboardBreadcrumb />
          </header>
          <main className="flex flex-1 gap-4 p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
