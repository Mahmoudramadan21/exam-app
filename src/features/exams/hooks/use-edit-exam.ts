"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { IExam } from "@/features/exams/lib/types/exam";
import type { IExamCreateSchema, IExamResponse } from "@/features/exams/lib/types/api";
import { createExamSchema } from "@/features/exams/lib/schemas/create-exam.schema";

interface IUseEditExamProps {
  exam: IExam;
}

export function useEditExam({
  exam,
}: IUseEditExamProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form State Management
  const form = useForm<IExamCreateSchema>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      title: exam.title,
      diplomaId: exam.diploma.id,
      description: exam.description ?? "",
      image: exam.image ?? "",
      duration: exam.duration,
    },
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: async (values: IExamCreateSchema) => {
      const res = await fetch(`/api/exams/${exam.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });

      const data: IExamResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }
    
      return data;
    },

    onSuccess: () => {
      toast.success("Exam updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });

      queryClient.invalidateQueries({
        queryKey: ["exam", exam.id],
      });

      router.push(`/exams/${exam.id}`);
      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: IExamCreateSchema) => {
    mutation.mutate(values);
  };

  return {
    form,
    mutation,
    onSubmit,
  };
}