// features/auth/lib/request.ts

import { IApiResponse } from "@/shared/lib/types/api";

/**
 * Generic API request handler for auth endpoints.
 * Handles JSON parsing + basic error normalization.
 */
export const authRequest = async <TResponse>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<TResponse> => {
  const response = await fetch(input, init);

  const data: IApiResponse = await response.json();

  // Backend-level validation errors
  if (!data.status && data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  // HTTP + business logic failure fallback
  if (!response.ok || !data.status) {
    throw new Error(data.message || "Request failed");
  }

  return data as TResponse;
};
