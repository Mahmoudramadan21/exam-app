"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getFilters } from "@/shared/lib/utils/get-filters";
import { IExamQuestionsResponse } from "../lib/types/api";
import { buildQuestionsQuery } from "@/features/questions/lib/utils/get-filters";

export function useQuestions(examId: string) {
  const searchParams = useSearchParams();

  // Get pagination and search parameters
  const queryParams = getFilters(searchParams);

  // ===== Fetch diplomas =====
  return useSuspenseQuery({
    queryKey: [
      "questions",
      examId,
      buildQuestionsQuery(queryParams).toString(),
    ],

    queryFn: async () => {
      const params = buildQuestionsQuery(queryParams);

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/questions/exam/${examId}?${params.toString()}`,
      );

      const data: IExamQuestionsResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },
  });
}
