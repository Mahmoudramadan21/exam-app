import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

export async function deleteQuestionAction(questionId: string) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/${questionId}`;

  // Perform Authenticated Request
  const result = await apiRequest<IApiResponse>(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
