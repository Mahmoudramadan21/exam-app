"use client";

import { memo } from "react";
import { Button } from "@/shared/components/ui";
import { ConfirmDialog } from "@/shared/components";
import { Ban, TriangleAlert } from "lucide-react";
import { useImmutableExam } from "@/features/exams/hooks";
import { IMMUTABLE_EXAM_VARIANTS } from "@/shared/lib/constants/immutable-variants";

// Component Props
interface IImmutableExamModalProps {
  examId: string;
  immutable: boolean;
}

function ImmutableExamModal({ examId, immutable }: IImmutableExamModalProps) {
  const { mutation } = useImmutableExam();
  const variant = IMMUTABLE_EXAM_VARIANTS[immutable ? 1 : 0];

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
          id: examId,
          immutable,
        })
      }
    />
  );
}

export default memo(ImmutableExamModal);
