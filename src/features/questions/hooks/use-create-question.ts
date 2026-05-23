"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createQuestionSchema } from "@/features/questions/lib/schemas/create-question.schema";
import { IAnswerSchema, ICreateQuestionSchema } from "../lib/types/api";

interface IUseCreateQuestionProps {
  examId: string;
}

export function useCreateQuestion({ examId }: IUseCreateQuestionProps) {
  const queryClient = useQueryClient();

  const form = useForm<ICreateQuestionSchema>({
    resolver: zodResolver(createQuestionSchema),

    defaultValues: {
      examId,
      text: "",
      answers: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ICreateQuestionSchema) => {
      const res = await fetch(`/api/questions/exam/${values.examId}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: values.text,
          answers: values.answers.map((answer: IAnswerSchema) => ({
            text: answer.text,
            isCorrect: answer.isCorrect,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess: () => {
      toast.success("Question created successfully");

      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      form.reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: ICreateQuestionSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
