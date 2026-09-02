"use client";

import { Ban, TriangleAlert } from "lucide-react";
import { memo } from "react";
import { Button } from "@/shared/components/ui";
import { ConfirmDialog } from "@/shared/components";
import { useImmutableQuestion } from "@/features/questions/hooks";
import { IMMUTABLE_QUESTION_VARIANTS } from "@/shared/lib/constants/immutable-variants";

interface IImmutableQuestionModalProps {
  questionId: string;
  immutable: boolean;
}

function ImmutableQuestionModal({
  questionId,
  immutable,
}: IImmutableQuestionModalProps) {
  const { mutation } = useImmutableQuestion();
  const variant = IMMUTABLE_QUESTION_VARIANTS[immutable ? 1 : 0];

  return (
    <ConfirmDialog
      trigger={
        <Button variant="secondary">
          <Ban size={18} />
          {variant.label}
        </Button>
      }
      title={variant.title}
      description={variant.description}
      icon={<TriangleAlert size={50} className="text-red-600" />}
      confirmLabel={mutation.isPending ? "Updating..." : variant.confirmLabel}
      confirmVariant="destructive"
      loading={mutation.isPending}
      error={mutation.error?.message}
      onConfirm={() =>
        mutation.mutate({
          id: questionId,
          immutable,
        })
      }
    />
  );
}

export default memo(ImmutableQuestionModal);
