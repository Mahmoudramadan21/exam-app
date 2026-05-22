"use client";

import { memo } from "react";
import { Plus, X } from "lucide-react";
import { Input, Button } from "@/shared/components/ui";

interface IAddAnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onClose: () => void;
  canAddMore: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function AddAnswerInput({
  value,
  onChange,
  onAdd,
  onClose,
  canAddMore,
  inputRef,
}: IAddAnswerInputProps) {
  return (
    <div className="flex items-center gap-3 bg-emerald-50 pl-0.5 pr-3 py-3">
      {/* ===== Close Button ===== */}
      <Button
        type="button"
        variant="ghost"
        onClick={onClose}
        aria-label="Close add answer input"
        className="w-fit rounded-full px-2 hover:bg-emerald-100"
      >
        <X className="size-7 rounded-full border p-1 text-gray-600" />
      </Button>

      {/* ===== Answer Text Input ===== */}
      <Input
        ref={inputRef}
        value={value}
        placeholder="Enter answer body"
        className="bg-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            onAdd();
          }

          if (e.key === "Escape") {
            onClose();
          }
        }}
      />

      {/* ===== Add Answer Button ===== */}
      <Button
        type="button"
        onClick={onAdd}
        disabled={!value.trim() || !canAddMore}
        className="w-fit min-w-39 bg-emerald-500 hover:bg-emerald-600"
      >
        <Plus className="size-4" />
        Add
      </Button>
    </div>
  );
}

export default memo(AddAnswerInput);
