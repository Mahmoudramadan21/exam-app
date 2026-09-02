"use client";

import { Loader2, Save, X } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { cn } from "@/shared/lib/utils/tailwind-cn";

interface IFormActionsProps {
  isPending: boolean;
  className?: string;
}

function FormActions({ isPending, className }: IFormActionsProps) {
  const router = useRouter();

  return (
    <div
      className={cn("px-3 md:px-6 flex justify-end gap-3 bg-white", className)}
    >
      {/* Back Button */}
      <Button
        type="button"
        variant="secondary"
        className="w-fit"
        onClick={() => router.back()}
      >
        <X size={18} />
        Cancel
      </Button>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-fit bg-emerald-500 hover:bg-emerald-600"
      >
        {isPending && <Loader2 className="animate-spin" />}
        <Save size={18} />
        Save
      </Button>
    </div>
  );
}

export default memo(FormActions);
