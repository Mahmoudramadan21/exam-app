import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import {
  IExamCreateSchema,
  IExamResponse,
} from "@/features/exams/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export async function createExamAction(data: IExamCreateSchema) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/exams`;

  // Perform Authenticated Request
  const result = await apiRequest<IExamResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
