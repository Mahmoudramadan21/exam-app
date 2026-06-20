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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import FolderCode from "@/assets/icons/folder-code.svg";
import { useSidebarAuth } from "@/features/dashboard/hooks/use-sidebar-auth";
import { cn } from "@/shared/lib/utils/tailwind-cn";
import { EllipsisVertical } from "lucide-react";

interface IAppSidebarProps {
  isAdmin: boolean;
}

function AppSidebar({ isAdmin }: IAppSidebarProps) {
  const { user, links, dropdownItems } = useSidebarAuth();

  // Get current route path
  const pathname = usePathname();

  return (
    <Sidebar className={cn(isAdmin ? "bg-gray-800" : "bg-blue-50")}>
      {/* ===== Sidebar Header (logo + app name) ===== */}
      <SidebarHeader className="px-8 pt-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="grid grid-cols-1 gap-2.5 h-fit cursor-pointer hover:bg-transparent">
              {/* I want reverse color of this image if isAdmin is true */}
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={192}
                height={237}
                className={cn(isAdmin && "invert")}
              />

              <div className="flex items-center gap-2.5">
                <FolderCode
                  className={cn("min-w-8 min-h-8", !isAdmin && "text-blue-600")}
                />
                <p
                  className={cn(
                    "font-semibold text-xl",
                    isAdmin ? "text-white" : "text-blue-600",
                  )}
                >
                  Exam App
                </p>
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
                    data-active={isActive}
                    className={cn(
                      "mb-2.5 text-base h-fit flex items-center gap-2 p-4 transition-colors duration-200 ease-in-out rounded-none data-active:border",
                      isAdmin
                        ? "text-white hover:text-gray-800 data-active:bg-gray-400/10 data-active:text-white data-active:border-gray-400"
                        : "text-gray-500 hover:text-gray-600 data-active:bg-blue-100 data-active:text-blue-600 data-active:border-blue-500",
                    )}
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
                <button className="flex items-center gap-3 w-full cursor-pointer p-2 rounded-md hover:bg-blue-100/40 transition">
                  <Image
                    src={user?.profilePhoto ?? "/images/logo.svg"}
                    alt="User"
                    width={54}
                    height={54}
                  />

                  <div className="flex flex-col min-w-0 leading-tight flex-1">
                    <span
                      className={cn(
                        "font-medium text-base truncate",
                        isAdmin ? "text-white" : "text-blue-600",
                      )}
                    >
                      {user?.firstName || user?.username}
                    </span>
                    <span
                      className={cn(
                        "text-sm truncate",
                        isAdmin ? "text-white/70" : "text-gray-500",
                      )}
                    >
                      {user?.email}
                    </span>
                  </div>

                  <EllipsisVertical
                    className={cn(
                      "w-5 h-5",
                      isAdmin ? "text-white/70" : "text-gray-500",
                    )}
                  />
                </button>
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
