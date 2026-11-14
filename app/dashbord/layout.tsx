import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashbordSideBar from "@/app/components/DashbordSideBar"

const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashbordSideBar />
      <main className="flex min-h-svh w-full flex-1 flex-col bg-[#0b0b0c]">
        <header className="sticky top-20 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-[#0b0b0c]/95 px-4 backdrop-blur">
          <SidebarTrigger className="text-zinc-400 hover:bg-white/10 hover:text-white" />
        </header>
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default DashbordLayout
