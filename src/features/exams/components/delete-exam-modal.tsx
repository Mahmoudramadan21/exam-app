"use client";

import { TriangleAlert } from "lucide-react";
import { memo, ReactNode } from "react";
import { ConfirmDialog } from "@/shared/components";
import { useDeleteExam } from "@/features/exams/hooks";

// Component Props
interface IDeleteExamModalProps {
  examId: string;
  trigger: ReactNode;
}

// Delete Exam Modal Component
function DeleteExamModal({ examId, trigger }: IDeleteExamModalProps) {
  // Initialize delete exam hook
  const { mutation } = useDeleteExam();

  return (
    <ConfirmDialog
      trigger={trigger}
      title="Are you sure you want to delete this exam?"
      description="This action cannot be undone."
      icon={<TriangleAlert size={50} className="text-red-600" />}
      confirmLabel="Delete"
      confirmVariant="destructive"
      loading={mutation.isPending}
      error={mutation.error?.message}
      onConfirm={() => mutation.mutate(examId)}
    />
  );
}

export default memo(DeleteExamModal);
