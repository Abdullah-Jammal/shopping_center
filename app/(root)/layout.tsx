import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row-reverse h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4">{children}</main>
      </SidebarProvider>
    </div>
  );
}
