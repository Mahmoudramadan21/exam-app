"use client";

import { memo, ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import FormError from "./form-error";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  icon?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: React.ComponentProps<typeof Button>["variant"];
  loading?: boolean;
  error?: string;
  onConfirm: () => void;
}

function ConfirmDialog({
  trigger,
  title,
  description,
  icon,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmVariant = "default",
  loading,
  error,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-center items-center pt-6 px-4">
          {/* ===== Icon Container ===== */}
          <div className="p-4 rounded-full bg-red-100 flex items-center justify-center relative before:absolute before:w-27 before:h-27 before:bg-red-50 before:rounded-full before:-z-10">
            {icon}
          </div>

          {/* ===== Title ===== */}
          <DialogTitle className="mt-5 font-geist-mono font-medium text-base lg:text-lg text-red-600">
            {title}
          </DialogTitle>

          {/* ===== Description ===== */}
          <DialogDescription className="font-geist-mono text-sm text-gray-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2">
          {/* ===== Error Message ===== */}
          {error && (
            <div className="col-span-2">
              <FormError message={error} className="my-2 md:my-3" />
            </div>
          )}

          {/* ===== Cancel Button ===== */}
          <DialogClose asChild>
            <Button variant="secondary">{cancelLabel}</Button>
          </DialogClose>

          {/* ===== Confirm Button ===== */}
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Loading..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ConfirmDialog);
