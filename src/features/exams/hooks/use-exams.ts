"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/shared/lib/constants/pagination.constant";
import { IExamsResponse } from "@/features/exams/lib/types/api";

export function useExams() {
  return useSuspenseInfiniteQuery({
    queryKey: ["exams"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams?page=${pageParam}&limit=${DEFAULT_LIMIT}`,
      );

      const data: IExamsResponse = await res.json();

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
