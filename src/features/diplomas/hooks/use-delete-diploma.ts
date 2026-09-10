"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteDiplomaAction } from "@/features/diplomas/lib/actions";

export function useDeleteDiploma() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Deletion mutation
  const mutation = useMutation({
    mutationFn: (diplomaId: string) => deleteDiplomaAction(diplomaId),

    onSuccess: (data) => {
      // Invalidate diplomas cache to refetch data
      queryClient.invalidateQueries({ queryKey: ["diplomas"] });

      // Show Success Toast Notification
      toast.success(data.message, { position: "bottom-right" });

      // Redirect to all diplomas page
      router.replace("/diplomas");
    },
  });

  // Return mutation
  return { mutation };
}
