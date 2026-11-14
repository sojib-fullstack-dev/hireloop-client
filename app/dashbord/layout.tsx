
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashbordSideBar from "../components/DashbordSideBar";


const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
      <DashbordSideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashbordLayout;