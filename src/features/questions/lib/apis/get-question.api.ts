"use server";

import { cache } from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IQuestionResponse } from "@/features/questions/lib/types/api";

export const getQuestion = cache(async (questionId: string) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/${questionId}`;

  console.log("Date Now: ", new Date().toDateString());

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
