"use client";

import { AppContainer } from "@/shared/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui";
import Link from "next/link";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type AppBreadcrumbProps = {
  items: BreadcrumbItemType[];
};

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <AppContainer className="bg-white py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div key={item.label + index} className="contents">
                <BreadcrumbItem className="flex items-center">
                  {isLast || !item.href ? (
                    <BreadcrumbPage className="text-blue-600">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="text-gray-400 hover:text-blue-600"
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator className="text-gray-400" />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </AppContainer>
  );
}
