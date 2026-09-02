"use client";

import { Skeleton } from "@/shared/components/ui";

export default function DiplomaListSkeleton({ count = 6 }: { count?: number }) {
  return (
    /* ===== Skeleton Grid (Loading State) ===== */
    <div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-busy={true}
      aria-live="polite"
    >
      {/* Placeholder items */}
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-112" />
      ))}
    </div>
  );
}
