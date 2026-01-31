import DashboardBreadcrumb from "@/components/dashboard/breadcrumb";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar session={session} />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 z-10 items-center gap-2 border-b px-4">
            <SidebarTrigger className="ml-1" />
            <DashboardBreadcrumb />
          </header>
          <main className="flex flex-1 gap-4 p-4">{children}</main>
        </SidebarInset>
      </div>
      <Toaster richColors />
    </SidebarProvider>
  );
}
