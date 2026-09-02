import {
  IExamSubmissionRequest,
  IExamSubmissionResponse,
} from "@/features/exams/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export async function submitExamAction(examSubmission: IExamSubmissionRequest) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/submissions`;

  // Perform Authenticated Request
  const result = await apiRequest<IExamSubmissionResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(examSubmission),
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
