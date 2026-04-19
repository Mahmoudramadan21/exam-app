"use client";

import { useSession } from "next-auth/react";

import {
  USER_SIDEBAR_LINKS,
  ADMIN_SIDEBAR_LINKS,
  USER_SIDEBAR_DROPDOWN_ITEMS,
  ADMIN_SIDEBAR_DROPDOWN_ITEMS,
} from "@/features/dashboard/lib/constants/sidebar.constant";

export function useSidebarAuth() {
  // Get session from NextAuth
  const { data: session, status } = useSession();

  const user = session?.user;

  // Get user role (default: user)
  const role = session?.user?.role ?? "user";

  // Loading state while session is being fetched
  const isLoading = status === "loading";

  // Get sidebar links based on user role
  const links = role === "ADMIN" ? ADMIN_SIDEBAR_LINKS : USER_SIDEBAR_LINKS;

  // Get dropdown items based on user role
  const dropdownItems =
    role === "ADMIN"
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
