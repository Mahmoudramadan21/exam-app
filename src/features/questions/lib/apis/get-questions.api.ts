import { IParams } from "@/shared/lib/types/params";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IExamQuestionsResponse } from "@/features/questions/lib/types/api";
import { buildQuestionsQuery } from "@/features/questions/lib/utils/get-filters";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export async function getExamQuestions(examId: string, params?: IParams) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const query = params ? buildQuestionsQuery(params) : "";

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/exam/${examId}${
    query ? `?${query}` : ""
  }`;

  // Perform Authenticated Request
  const result = await apiRequest<IExamQuestionsResponse>(url, {
    method: "GET",
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
