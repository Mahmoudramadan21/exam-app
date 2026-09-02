"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createQuestionSchema } from "@/features/questions/lib/schemas/create-question.schema";
import { IAnswerSchema, ICreateQuestionSchema } from "../lib/types/api";
import { IQuestion } from "../lib/types/question";
import { useRouter } from "next/navigation";

interface IUseEditQuestionProps {
  question: IQuestion;
}

export function useEditQuestion({ question }: IUseEditQuestionProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ICreateQuestionSchema>({
    resolver: zodResolver(createQuestionSchema),

    defaultValues: {
      examId: question.examId,
      text: question.text,
      answers: question.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ICreateQuestionSchema) => {
      const res = await fetch(`/api/questions/${question.id}`, {
        method: "PUT",

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
      toast.success("Question updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["questions", question.examId],
      });

      queryClient.invalidateQueries({
        queryKey: ["question", question.id],
      });

      router.back();
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
