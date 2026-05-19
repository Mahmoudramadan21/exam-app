"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IExamCreateSchema,
  IExamResponse,
} from "@/features/exams/lib/types/api";
import { createExamSchema } from "@/features/exams/lib/schemas/create-exam.schema";

export function useCreateExam() {
  const router = useRouter();

  const form = useForm<IExamCreateSchema>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      diplomaId: "",
      title: "",
      image: "",
      description: "",
      duration: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: IExamCreateSchema) => {
      const res = await fetch(`/api/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data: IExamResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success("Diploma created successfully", {
        position: "bottom-right",
      });

      router.refresh();
    },
  });

  function onSubmit(values: IExamCreateSchema) {
    console.log("submit", values);
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
