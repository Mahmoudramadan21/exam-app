"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

import {
  formatLabel,
  getPathSegments,
  findDiplomaId,
  findExamId,
} from "@/features/dashboard/lib/utils/breadcrumb.util";

import { useBreadcrumbTitles } from "@/features/dashboard/hooks/use-breadcrumb-titles";

export function AppBreadcrumb() {
  const pathname = usePathname();

  // Split current URL into path segments
  const segments = useMemo(() => getPathSegments(pathname), [pathname]);

  // Extract diploma ID from URL structure
  const diplomaId = useMemo(() => findDiplomaId(segments), [segments]);

  // Extract exam ID based on diploma context
  const examId = useMemo(() => findExamId(segments, diplomaId), [
    segments,
    diplomaId,
  ]);

  // Resolve human-readable titles for diploma and exam
  const titles = useBreadcrumbTitles(diplomaId, examId);

  // Position of "diplomas" segment in URL
  const diplomaIndex = segments.indexOf("diplomas");

  const getLabel = (segment: string, index: number) => {
    // Replace diploma segment with fetched diploma title
    if (index === diplomaIndex + 1 && diplomaId) return titles.diploma;

    // Replace last segment with exam title if exists
    if (index === segments.length - 1 && examId) return titles.exam;

    // Default fallback label formatting
    return formatLabel(segment);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = getLabel(segment, index);
          const isLast = index === segments.length - 1;

          return (
            <span key={href} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <>
                    {/* Navigable breadcrumb link */}
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>

                    {/* Visual separator between segments */}
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
