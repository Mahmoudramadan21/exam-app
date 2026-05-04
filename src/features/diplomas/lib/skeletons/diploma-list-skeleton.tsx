"use client";

export default function DiplomaListSkeleton() {
  return (
    /* ===== Skeleton Grid (Loading State) ===== */
    <div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-busy={true}
      aria-live="polite"
    >
      {/* Placeholder items */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-112 bg-gray-200 animate-pulse rounded-md"
          role="status"
        />
      ))}
    </div>
  );
}
