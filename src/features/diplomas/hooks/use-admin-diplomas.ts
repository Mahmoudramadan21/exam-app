"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";
import { buildQuery, getFilters } from "@/shared/lib/utils/get-filters";

export function useAdminDiplomas() {
  const searchParams = useSearchParams();

  // Get pagination and search parameters
  const queryParams = getFilters(searchParams);

  // ===== Fetch diplomas =====
  return useQuery({
    queryKey: ["diplomas", buildQuery(queryParams).toString()],

    queryFn: async () => {
      const params = buildQuery(queryParams);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/diplomas?${params.toString()}`,
      );

      const data: IDiplomasResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },
  });
}
