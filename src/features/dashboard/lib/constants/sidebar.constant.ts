import {
  GraduationCap,
  UserRound,
  BoltIcon,
  LogOut,
  LayoutGrid,
  BookOpen,
  FileText,
  Users,
  BookOpenCheck,
  Logs,
} from "lucide-react";

import { ISidebarLink, SidebarDropdownItem } from "../types/sidebar";

export const USER_SIDEBAR_LINKS: ISidebarLink[] = [
  {
    label: "Diplomas",
    href: "/diplomas",
    icon: GraduationCap,
  },
  {
    label: "Account Settings",
    href: "/account",
    icon: UserRound,
  },
];

export const USER_SIDEBAR_DROPDOWN_ITEMS: SidebarDropdownItem[] = [
  {
    label: "Account",
    href: "/account",
    icon: UserRound,
    action: "link",
  },
  {
    label: "Logout",
    icon: LogOut,
    action: "logout",
  },
];

export const ADMIN_SIDEBAR_LINKS: ISidebarLink[] = [
  {
    label: "Diplomas",
    href: "/diplomas",
    icon: GraduationCap,
  },
  {
    label: "Exams",
    href: "/exams",
    icon: BookOpenCheck,
  },
  {
    label: "Account Settings",
    href: "/account",
    icon: UserRound,
  },
  {
    label: "Audit Log",
    href: "/audit-log",
    icon: Logs,
  },
];

export const ADMIN_SIDEBAR_DROPDOWN_ITEMS: SidebarDropdownItem[] = [
  {
    label: "Account",
    href: "/account",
    icon: UserRound,
    action: "link",
  },
  {
    label: "Application",
    href: "/dashboard",
    icon: LayoutGrid,
    action: "link",
  },
  {
    label: "Logout",
    icon: LogOut,
    action: "logout",
  },
];
