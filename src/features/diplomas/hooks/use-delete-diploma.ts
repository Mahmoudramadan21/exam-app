"use client";
import { IApiResponse } from "@/shared/lib/types/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteDiploma() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Deletion mutation
  const mutation = useMutation({
    mutationFn: async (diplomaId: string) => {
      const res = await fetch(`/api/diplomas/${diplomaId}`, {
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
