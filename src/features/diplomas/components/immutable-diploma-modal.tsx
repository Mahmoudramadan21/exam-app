"use client";

import { memo } from "react";
import { Button } from "@/shared/components/ui";
import { Ban, TriangleAlert } from "lucide-react";
import { ConfirmDialog } from "@/shared/components";
import { useImmutableDiploma } from "@/features/diplomas/hooks";
import { IMMUTABLE_DIPLOMA_VARIANTS } from "@/shared/lib/constants/immutable-variants";

// Props interface
interface IImmutableDiplomaModalProps {
  diplomaId: string;
  immutable: boolean;
}

// Immutable Diploma Modal
function ImmutableDiplomaModal({
  diplomaId,
  immutable,
}: IImmutableDiplomaModalProps) {
  const { mutation } = useImmutableDiploma();
  const variant = IMMUTABLE_DIPLOMA_VARIANTS[immutable ? 1 : 0];

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
          id: diplomaId,
          immutable: !immutable,
        })
      }
    />
  );
}

export default memo(ImmutableDiplomaModal);
