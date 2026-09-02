"use client";

import { memo, ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { ConfirmDialog } from "@/shared/components/";
import { useDeleteDiploma } from "@/features/diplomas/hooks";

// Props interface
interface IDeleteDiplomaModalProps {
  diplomaId: string;
  trigger: ReactNode;
}

// ===== Delete Diploma Modal =====
function DeleteDiplomaModal({ diplomaId, trigger }: IDeleteDiplomaModalProps) {
  const { mutation } = useDeleteDiploma();

  return (
    <ConfirmDialog
      trigger={trigger}
      title="Are you sure you want to delete this diploma?"
      description="This action cannot be undone."
      icon={<TriangleAlert size={50} className="text-red-600" />}
      confirmLabel={mutation.isPending ? "Deleting..." : "Delete"}
      confirmVariant="destructive"
      loading={mutation.isPending}
      error={mutation.error?.message}
      onConfirm={() => mutation.mutate(diplomaId)}
    />
  );
}

export default memo(DeleteDiplomaModal);
