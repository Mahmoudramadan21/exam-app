"use client";

import { useSession } from "next-auth/react";

import {
  USER_SIDEBAR_LINKS,
  ADMIN_SIDEBAR_LINKS,
  USER_SIDEBAR_DROPDOWN_ITEMS,
  ADMIN_SIDEBAR_DROPDOWN_ITEMS,
  SUPER_ADMIN_SIDEBAR_LINKS,
} from "@/features/dashboard/lib/constants/sidebar.constant";
import { UserRole } from "@/features/auth/lib/types/user";
import { ISidebarLink } from "../lib/types/sidebar";

export function useSidebarAuth() {
  // Get session from NextAuth
  const { data: session, status } = useSession();

  const user = session?.user;

  // Get user role (default: user)
  const role = (session?.user?.role as UserRole) ?? "USER";

  // Loading state while session is being fetched
  const isLoading = status === "loading";

  const roles: Record<UserRole, ISidebarLink[]> = {
    USER: USER_SIDEBAR_LINKS,
    ADMIN: ADMIN_SIDEBAR_LINKS,
    SUPER_ADMIN: SUPER_ADMIN_SIDEBAR_LINKS,
  };

  // Get sidebar links based on user role
  const links = roles[role];

  // Get dropdown items based on user role
  const dropdownItems =
    role === "ADMIN" || role === "SUPER_ADMIN"
      ? ADMIN_SIDEBAR_DROPDOWN_ITEMS
      : USER_SIDEBAR_DROPDOWN_ITEMS;

  return {
    user,
    role,
    links,
    dropdownItems,
    isLoading,
  };
}
