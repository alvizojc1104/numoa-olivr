export type SiteConfig = typeof siteConfig;
import { CalendarDays, LayoutDashboard, Users } from "lucide-react";

export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  secretaryNavLinks: [
    {
      label: "Dashboard",
      href: "/secretary/dashboard",
    },
    {
      label: "Accounts",
      href: "/secretary/accounts",
    },
    {
      label: "Notifications",
      href: "/secretary/notifications",
    },
    {
      label: "Products",
      href: "/secretary/products",
    },
    {
      label: "Medical Records",
      href: "/secretary/medical-records",
    },
    {
      label: "Patients",
      href: "/secretary/patients",
    },
    {
      label: "Appointments",
      href: "/secretary/appointments",
    },
    {
      label: "Billing",
      href: "/secretary/billing",
    },
    {
      label: "Reports",
      href: "/secretary/reports",
    },
    {
      label: "Activity Log",
      href: "/secretary/activity-log",
    },
  ],
  facultyLinks: [
    {
      label: "Dashboard",
      href: "/faculty/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      href: "/faculty/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      href: "/faculty/appointments",
      icon: CalendarDays,
    },
  ],
};
