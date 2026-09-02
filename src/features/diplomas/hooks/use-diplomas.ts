"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/shared/lib/constants/pagination.constant";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";

export function useDiplomas() {
  // Fetch all diplomas with infinite query
  return useInfiniteQuery({
    queryKey: ["diplomas"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/diplomas?page=${pageParam}&limit=${DEFAULT_LIMIT}`,
      );

      const data: IDiplomasResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },

    getNextPageParam: (lastPage) => {
      const meta = lastPage?.payload?.metadata;

      if (!meta) return undefined;

      const page = Number(meta.page);
      const totalPages = Number(meta.totalPages);

      return page < totalPages ? page + 1 : undefined;
    },

    initialPageParam: 1,
  });
}
