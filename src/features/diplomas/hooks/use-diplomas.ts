// hooks/useDiplomas.ts
"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";

export function useDiplomas({ limit }: { limit: number }) {
  return useSuspenseInfiniteQuery({
    queryKey: ["diplomas", limit],

    // Fetch diplomas with pagination
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/diplomas?page=${pageParam}&limit=${limit}`);

      const data: IDiplomasResponse = await res.json();

      // Let React Query handle errors
      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    // Determine next page based on API metadata
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.payload?.metadata;

      if (!meta) return undefined;

      const page = Number(meta.page);
      const totalPages = Number(meta.totalPages);

      if (!page || !totalPages) return undefined;

      return page < totalPages ? page + 1 : undefined;
    },

    // Start from first page
    initialPageParam: 1,
  });
}
