"use client";
import { IApiResponse } from "@/shared/lib/types/api";
import { useMutation } from "@tanstack/react-query";

interface IUseImmutableQuestionParams {
  id: string;
  immutable: boolean;
}

export function useImmutableQuestion() {
  const mutation = useMutation({
    mutationFn: async ({ id, immutable }: IUseImmutableQuestionParams) => {
      const res = await fetch(`/api/questions/${id}/immutable`, {
        method: "PATCH",
        body: JSON.stringify({ immutable }),
      });
      const data: IApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },
  });

  // Return mutation
  return { mutation };
}
