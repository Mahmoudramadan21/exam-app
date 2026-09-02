"use server";

import { cache } from "react";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IQuestionResponse } from "@/features/questions/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export const getQuestion = cache(async (questionId: string) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/${questionId}`;

  // Fetch question data from API
  const result = await apiRequest<IQuestionResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status || !result.payload) {
    throw new Error(result.message);
  }

  return result;
});
