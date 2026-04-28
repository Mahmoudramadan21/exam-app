"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";

import { signOut } from "next-auth/react";

import FolderCode from "@/assets/icons/folder-code.svg";

import { useSidebarAuth } from "@/features/dashboard/hooks/use-sidebar-auth";
import { memo } from "react";
import { usePathname } from "next/navigation";

function AppSidebar() {
  const { user, links, dropdownItems, isLoading } = useSidebarAuth();

  // Get current route path
  const pathname = usePathname();

  // Wait until session is loaded
  if (isLoading) return null;

  // Hide sidebar if user is not authenticated
  if (!user) return null;

  return (
    <Sidebar>
      {/* ===== Sidebar Header (logo + app name) ===== */}
      <SidebarHeader className="px-8 pt-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="grid grid-cols-1 gap-2.5 h-fit cursor-pointer">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={192}
                height={237}
              />

              <div className="flex items-center gap-2.5">
                <FolderCode className="min-w-8 min-h-8" />
                <p className="font-semibold text-xl text-blue-600">Exam App</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== Sidebar Content (Navigation Links) ===== */}
      <SidebarContent className="px-8 pt-10">
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => {
              const Icon = link.icon;

              // Check if current route matches link
              const isActive = link.href === pathname;

              return (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="mb-2.5 text-base h-fit flex items-center gap-2 p-4 text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-600 rounded-none data-active:bg-blue-100 data-active:text-blue-600 data-active:border data-active:border-blue-500"
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
        </SidebarGroup>
      </SidebarContent>

      {/* ===== Sidebar Footer (User info + Dropdown) ===== */}
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {/* ===== User info trigger ===== */}
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 w-full cursor-pointer p-2 rounded-md hover:bg-blue-100/40 transition">
                  <Image
                    src={user.profilePhoto ?? "/images/logo.svg"}
                    alt="User"
                    width={54}
                    height={54}
                  />

                  <div className="flex flex-col leading-tight flex-1">
                    <span className="font-medium text-base text-blue-600">
                      {user.firstName}
                    </span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>

                  <FolderCode className="w-5 h-5 text-gray-500" />
                </div>
              </DropdownMenuTrigger>

              {/* ===== Dropdown actions ===== */}
              <DropdownMenuContent align="end" className="w-66 rounded-none">
                {dropdownItems.map((item, index) => {
                  const Icon = item.icon;

                  // ===== Handle logout action =====
                  if (item.action === "logout") {
                    return (
                      <DropdownMenuItem
                        key={index}
                        variant="destructive"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        <Icon className="min-w-6 min-h-6" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  }

                  // Default navigation item
                  return (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={item.href ?? "#"}>
                        <Icon className="min-w-6 min-h-6" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default memo(AppSidebar);
