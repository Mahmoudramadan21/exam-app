"use client";
import { IApiResponse } from "@/shared/lib/types/api";
import { useMutation } from "@tanstack/react-query";

interface IUseImmutableDiplomaParams {
  id: string;
  immutable: boolean;
}

export function useImmutableDiploma() {
  // Patch mutation for immutable diploma
  const mutation = useMutation({
    mutationFn: async ({ id, immutable }: IUseImmutableDiplomaParams) => {
      const res = await fetch(`/api/diplomas/${id}/immutable`, {
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
