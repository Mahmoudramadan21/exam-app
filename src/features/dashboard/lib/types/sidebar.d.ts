import { LucideIcon } from "lucide-react";

// Sidebar Link Interface
export interface ISidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Sidebar Dropdown Item Interface
export type SidebarDropdownItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  action?: "link" | "logout";
};
