"use client";

import {
  IAnswerSchema,
  IBulkQuestionSchema,
  ICreateBulkQuestionSchema,
} from "../lib/types/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBulkQuestionSchema } from "@/features/questions/lib/schemas/create-question.schema";

interface IUseCreateBulkQuestionsProps {
  examId: string;
}

export function useCreateBulkQuestions({
  examId,
}: IUseCreateBulkQuestionsProps) {
  const queryClient = useQueryClient();

  const form = useForm<ICreateBulkQuestionSchema>({
    resolver: zodResolver(createBulkQuestionSchema),

    defaultValues: {
      examId,
      questions: [{ id: crypto.randomUUID(), text: "", answers: [] }],
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ICreateBulkQuestionSchema) => {
      const res = await fetch(`/api/questions/exam/${values.examId}/bulk`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          questions: values.questions.map((question: IBulkQuestionSchema) => ({
            text: question.text,
            answers: question.answers.map((answer: IAnswerSchema) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
            })),
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

  function onSubmit(values: ICreateBulkQuestionSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
