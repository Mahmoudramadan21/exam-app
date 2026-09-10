"use client";

import { useMutation } from "@tanstack/react-query";
import { immutableDiplomaAction } from "@/features/diplomas/lib/actions";

interface IUseImmutableDiplomaParams {
  id: string;
  immutable: boolean;
}

export function useImmutableDiploma() {
  // Patch mutation for immutable diploma
  const mutation = useMutation({
    mutationFn: ({ id, immutable }: IUseImmutableDiplomaParams) =>
      immutableDiplomaAction({ id, immutable }),
  });

  // Return mutation
  return { mutation };
}
