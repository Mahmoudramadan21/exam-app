"use client";
import { IApiResponse } from "@/shared/lib/types/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteExam() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (examId: string) => {
      const res = await fetch(`/api/exams/${examId}`, {
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
      // Invalidate exams cache to refetch data
      queryClient.invalidateQueries({ queryKey: ["exams"] });

      // Show Success Toast Notification
      toast.success(data.message, { position: "bottom-right" });

      // Redirect to all exams page
      router.replace("/exams");
    },
  });

  // Return mutation
  return { mutation };
}
