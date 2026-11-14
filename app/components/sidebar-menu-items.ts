import type { ComponentType } from "react"
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  Plus,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

export type UserRole = "seeker" | "recruiter" | "admin"

export function isUserRole(value: string | undefined): value is UserRole {
  return value === "seeker" || value === "recruiter" || value === "admin"
}

export type SidebarMenuItem = {
  id: string
  name: string
  url: string
  icon: ComponentType<{ className?: string }>
}

export const menuitemsRole: Record<UserRole, SidebarMenuItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashbord/seeker",
      icon: LayoutDashboardIcon,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashbord/seeker/jobs",
      icon: BriefcaseBusinessIcon,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved Jobs",
      url: "/dashbord/seeker/saved-jobs",
      icon: BookmarkIcon,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashbord/seeker/applications",
      icon: FileTextIcon,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashbord/seeker/billing",
      icon: CreditCardIcon,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashbord/seeker/settings",
      icon: SettingsIcon,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashbord/recruiter",
      icon: LayoutDashboardIcon,
    },
    {
      id: "recruiter-add-job",
      name: "Add Job",
      url: "/dashbord/recruiter/jobs/new",
      icon: Plus,
    },
    {
      id: "recruiter-manage-jobs",
      name: "Manage Jobs",
      url: "/dashbord/recruiter/jobs",
      icon: BriefcaseBusinessIcon,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashbord/recruiter/applications",
      icon: FileTextIcon,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashbord/recruiter/settings",
      icon: SettingsIcon,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashbord/admin",
      icon: LayoutDashboardIcon,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashbord/admin/users",
      icon: UsersIcon,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashbord/admin/companies",
      icon: Building2Icon,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashbord/admin/jobs",
      icon: BriefcaseBusinessIcon,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashbord/admin/payments",
      icon: CreditCardIcon,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashbord/admin/settings",
      icon: SettingsIcon,
    },
  ],
}
