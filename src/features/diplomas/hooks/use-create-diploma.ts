"use client";
import { useMutation } from "@tanstack/react-query";
import {
  IDiplomaCreateSchema,
  IDiplomaResponse,
} from "@/features/diplomas/lib/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createDiplomaSchema } from "@/features/diplomas/lib/schemes/create-diploma.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateDiploma() {
  const queryClient = useQueryClient();
  const router = useRouter();

  //  Form with validation schema
  const form = useForm<IDiplomaCreateSchema>({
    resolver: zodResolver(createDiplomaSchema),
    defaultValues: {
      title: "",
      image: "",
      description: "",
    },
  });

  // Creation mutation
  const mutation = useMutation({
    mutationFn: async (values: IDiplomaCreateSchema) => {
      const res = await fetch(`/api/diplomas`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data: IDiplomaResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success("Diploma created successfully", {
        position: "bottom-right",
      });

      queryClient.invalidateQueries({ queryKey: ["diplomas"] });

      router.refresh();
    },
  });

  function onSubmit(values: IDiplomaCreateSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
