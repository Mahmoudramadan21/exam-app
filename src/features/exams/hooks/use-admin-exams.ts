"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { buildQuery, getFilters } from "@/shared/lib/utils/get-filters";
import { IExamsResponse } from "@/features/exams/lib/types/api";

export function useAdminExams() {
  const searchParams = useSearchParams();

  // Get pagination and search parameters
  const queryParams = getFilters(searchParams);

  // ===== Fetch exams =====
  return useSuspenseQuery({
    queryKey: ["exams", buildQuery(queryParams).toString()],

    queryFn: async () => {
      const params = buildQuery(queryParams);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams?${params.toString()}`,
      );

      const data: IExamsResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },
  });
}
