"use server";

import { cache } from "react";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IDiplomaResponse } from "@/features/diplomas/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export const getDiploma = cache(async (id: string) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas/${id}`;

  // Perform Authenticated Request
  const result = await apiRequest<IDiplomaResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle Not Found
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
});
