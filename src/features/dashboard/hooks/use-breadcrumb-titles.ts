"use client";

import { useEffect, useState } from "react";
import { IExam } from "@/features/exams/lib/types/exam";

type Titles = {
  diploma: string | null;
  exam: string | null;
};

export function useBreadcrumbTitles(
  diplomaId: string | null,
  examId: string | null,
) {
  // Store resolved breadcrumb titles (diploma + exam)
  const [titles, setTitles] = useState<Titles>({
    diploma: null,
    exam: null,
  });

  useEffect(() => {
    if (!diplomaId) return;

    const fetchData = async () => {
      try {
        // Fetch diploma details including exams
        const res = await fetch(`/api/diplomas/${diplomaId}`);
        const data = await res.json();
        const diploma = data?.diploma;

        let examTitle: string | null = null;

        // Try to resolve exam title from diploma exams list
        if (examId && diploma?.exams?.length) {
          const exam: IExam | undefined = diploma.exams.find(
            (e: IExam) => e.id === examId,
          );

          examTitle = exam?.title ?? examId;
        }

        // Set resolved titles for breadcrumb display
        setTitles({
          diploma: diploma?.title ?? diplomaId,
          exam: examTitle,
        });
      } catch {
        // Fallback to IDs if fetch fails
        setTitles({
          diploma: diplomaId,
          exam: examId,
        });
      }
    };

    fetchData();
  }, [diplomaId, examId]);

  return titles;
}
