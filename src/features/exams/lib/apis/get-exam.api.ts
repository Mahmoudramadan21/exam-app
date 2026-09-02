"use server";

import { cache } from "react";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IExamResponse } from "@/features/exams/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export const getExam = cache(async (examId: string) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/exams/${examId}`;

  // Perform Authenticated Request
  const result = await apiRequest<IExamResponse>(url, {
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
