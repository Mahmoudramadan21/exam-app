"use client";

import { useMemo } from "react";
import { useInfiniteScroll } from "@/shared/hooks";
import { useDiplomas } from "@/features/diplomas/hooks";
import { DiplomaItem } from "@/features/diplomas/components";
import { DiplomaListSkeleton } from "@/features/diplomas/lib/skeletons";

function DiplomaList() {
  // Fetch diplomas with infinite pagination
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiplomas();

  // Setup infinite scroll trigger
  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Flatten paginated response into a single array
  const diplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page?.payload?.data || []) || [];
  }, [data]);

  // Initial Loading Skeleton
  if (isPending) {
    return <DiplomaListSkeleton />;
  }

  return (
    <section aria-label="Diplomas list">
      {/* ===== Diplomas Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {diplomas.map((item, index) => (
          <DiplomaItem key={item.id} diploma={item} priority={index === 0} />
        ))}
      </div>

      {/* ===== Loading More (Skeleton) ===== */}
      {isFetchingNextPage && <DiplomaListSkeleton count={3} />}

      {/* ===== Infinite Scroll Trigger ===== */}
      <div ref={ref} className="h-2" />

      {/* ===== End of List ===== */}
      {!hasNextPage && (
        <p className="text-center mt-4 text-gray-400">End of list</p>
      )}
    </section>
  );
}

export default DiplomaList;
