"use client";

import { useSearchParams } from "next/navigation";
import DiplomaItem from "./diploma-item";
import { useDiplomas } from "@/features/diplomas/hooks/use-diplomas";
import { useInfiniteScroll } from "@/shared/hooks/use-infinte-scroll";
import DiplomaListSkeleton from "../lib/skeletons/diploma-list-skeleton";
import { useMemo } from "react";
import { DEFAULT_LIMIT } from "@/shared/lib/constants/pagination.constant";

function DiplomaList() {
  // Get pagination limit from URL (fallback to DEFAULT_LIMIT)
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

  // Fetch diplomas with infinite pagination
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useDiplomas({
    limit,
  });

  // Setup infinite scroll trigger
  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Flatten paginated response into a single array
  const diplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload?.data || []) || [];
  }, [data]);

  /* ===== Empty State ===== */
  if (!diplomas.length) {
    return (
      <p className="text-center mt-10" role="status">
        No diplomas found
      </p>
    );
  }

  return (
    <section aria-label="Diplomas list">
      {/* ===== Diplomas Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {diplomas.map((item, index) => (
          <DiplomaItem key={item.id} diploma={item} priority={index === 0} />
        ))}{" "}
      </div>

      {/* ===== Loading More (Skeleton) ===== */}
      {isFetchingNextPage && <DiplomaListSkeleton />}

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
