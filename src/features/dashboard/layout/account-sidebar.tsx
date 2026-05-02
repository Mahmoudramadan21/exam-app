"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { memo } from "react";
import { usePathname } from "next/navigation";

import { CircleUserIcon, LockIcon, LogOut } from "lucide-react";

function AccountSidebar() {
  const pathname = usePathname();

  const links = [
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

  return (
    <Sidebar className="static w-full h-full">
      {/* ===== Content ===== */}
      <SidebarContent className="p-6 bg-white">
        <SidebarMenu>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="mb-2.5 text-base h-fit flex items-center gap-2 px-4 py-3 text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-600 rounded-none data-active:bg-blue-100 data-active:text-blue-600"
                >
                  <Link href={link.href}>
                    <Icon className="min-w-6 min-h-6" />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ===== Footer (Logout only) ===== */}
      <SidebarFooter className="p-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-600 flex items-center gap-2 h-11 px-6 w-full bg-red-50 hover:bg-red-100 hover:text-red-700 transition rounded-none cursor-pointer"
            >
              <LogOut className="min-w-6 min-h-6 rotate-180" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default memo(AccountSidebar);
