"use client";

import { TriangleAlert } from "lucide-react";
import { memo, ReactNode } from "react";
import { ConfirmDialog } from "@/shared/components";
import { useDeleteQuestion } from "@/features/questions/hooks";

function DeleteQuestionModal({
  questionId,
  trigger,
}: {
  questionId: string;
  trigger: ReactNode;
}) {
  const { mutation } = useDeleteQuestion();

  return (
    <ConfirmDialog
      trigger={trigger}
      title="Are you sure you want to delete this question?"
      description="This action cannot be undone."
      icon={<TriangleAlert size={50} className="text-red-600" />}
      confirmLabel="Delete"
      confirmVariant="destructive"
      loading={mutation.isPending}
      error={mutation.error?.message}
      onConfirm={() => mutation.mutate(questionId)}
    />
  );
}

export default memo(DeleteQuestionModal);
