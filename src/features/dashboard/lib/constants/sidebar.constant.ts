import {
  GraduationCap,
  UserRound,
  LogOut,
  LayoutGrid,
  BookOpenCheck,
  Logs,
  CircleUserIcon,
  LockIcon,
} from "lucide-react";
import {
  ISidebarLink,
  SidebarDropdownItem,
} from "@/features/dashboard/lib/types/sidebar";

// User Sidebar Navigation Links
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

// User Sidebar Dropdown Items
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

// Admin Sidebar Navigation Links
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

// Admin Sidebar Dropdown Items
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

// Account Sidebar Navigation Links
export const ACCOUNT_SIDEBAR_LINKS: ISidebarLink[] = [
  {
    label: "Profile",
    href: "/account",
    icon: CircleUserIcon,
  },
  {
    label: "Change Password",
    href: "/account/change-password",
    icon: LockIcon,
  },
];
