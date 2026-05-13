"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { IDiploma } from "@/features/diplomas/lib/types/diploma";
import type { IDiplomaCreateSchema, IDiplomaResponse } from "@/features/diplomas/lib/types/api";
import { createDiplomaSchema } from "@/features/diplomas/lib/schemes/create-diploma.schema";

// Props interface
interface UseEditDiplomaProps {
  diplomaId: string;
  diploma: IDiploma;
}

export function useEditDiploma({
  diplomaId,
  diploma,
}: UseEditDiplomaProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<IDiplomaCreateSchema>({
    resolver: zodResolver(createDiplomaSchema),
    defaultValues: {
      title: diploma.title,
      description: diploma.description ?? "",
      image: diploma.image ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: IDiplomaCreateSchema) => {
      const res = await fetch(`/api/diplomas/${diplomaId}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });

      const data: IDiplomaResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }
    
      return data;
    },

    onSuccess: () => {
      toast.success("Diploma updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["diplomas"],
      });

      queryClient.invalidateQueries({
        queryKey: ["diploma", diplomaId],
      });

      router.push(`/diplomas/${diplomaId}`);
      router.refresh();
    },
  });

  const onSubmit = (values: IDiplomaCreateSchema) => {
    mutation.mutate(values);
  };

  return {
    form,
    mutation,
    onSubmit,
  };
}