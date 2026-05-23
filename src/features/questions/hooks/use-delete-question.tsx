"use client";
import { IApiResponse } from "@/shared/lib/types/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (questionId: string) => {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
      });
      const data: IApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },

    onSuccess: (data) => {
      // Invalidate questions cache to refetch data
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      // Show Success Toast Notification
      toast.success(data.message, { position: "bottom-right" });

      // close modal if it is open
      router.refresh();
    },
  });

  // Return mutation
  return { mutation };
}
