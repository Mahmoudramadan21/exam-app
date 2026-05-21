"use server";

import { cache } from "react";
import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IExamResponse } from "@/features/exams/lib/types/api";

export const getExam = cache(async (examId: string) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

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
