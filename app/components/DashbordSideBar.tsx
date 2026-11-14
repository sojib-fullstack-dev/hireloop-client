"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  isUserRole,
  menuitemsRole,
  type UserRole,
} from "@/app/components/sidebar-menu-items"
import { useSession } from "@/lib/auth-client"

function getRoleFromPath(
  pathname: string,
  sessionRole: string | undefined
): UserRole {
  const pathRole = pathname.split("/")[2]

  if (isUserRole(pathRole)) return pathRole
  if (isUserRole(sessionRole)) return sessionRole

  return "seeker"
}

const DashbordSideBar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role = getRoleFromPath(pathname, session?.user?.role)
  const menuItems = menuitemsRole[role]

  return (
    <Sidebar className="top-20 h-[calc(100svh-5rem)] border-white/10">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    render={<Link href={item.url} />}
                    className="text-zinc-400 data-active:bg-white/10 data-active:text-white"
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashbordSideBar
