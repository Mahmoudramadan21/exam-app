import { LucideIcon } from "lucide-react";

export interface ISidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export type SidebarDropdownItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  action?: "link" | "logout";
};
