import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { authRequest } from "@/shared/lib/utils/request.util";
import { IExamQuestionsResponse } from "@/features/questions/lib/types/api";

export async function getExamQuestions(examId: string) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/exam/${examId}`;

  // Perform Authenticated Request
  const result = await authRequest<IExamQuestionsResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status || !result.payload) {
    throw new Error(result.message);
  }

  return result.payload;
}
