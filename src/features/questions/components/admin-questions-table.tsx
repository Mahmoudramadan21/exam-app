"use client";

import Link from "next/link";
import { memo } from "react";
import { Plus } from "lucide-react";
import {
  QuestionsDataTable,
  QuestionsTableColumns,
} from "@/features/questions/components";
import { useQuestions } from "@/features/questions/hooks";

function AdminQuestionsTable({ examId }: { examId: string }) {
  // ===== Fetch diplomas =====
  const { data } = useQuestions(examId);

  // ===== Current page data =====
  const questions = data?.payload?.questions ?? [];

  return (
    <section className="flex flex-col" aria-labelledby="questions-title">
      <div className="flex justify-between items-center gap-2 p-2.5 bg-blue-600">
        <h4 id="questions-title" className="text-base text-white font-semibold">
          Exam Questions
        </h4>

        <Link
          href={`/exams/create-new-question?examId=${examId}`}
          className="flex items-center gap-1.5 text-white font-medium text-base"
        >
          <Plus size={18} />
          Add Question
        </Link>
      </div>

      {/* ===== Data table ===== */}
      <QuestionsDataTable columns={QuestionsTableColumns} data={questions} />
    </section>
  );
}

export default memo(AdminQuestionsTable);
