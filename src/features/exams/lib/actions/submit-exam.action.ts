import { getServerSession } from "next-auth";
import {
  IExamSubmissionRequest,
  IExamSubmissionResponse,
} from "@/features/exams/lib/types/api";
import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { authRequest } from "@/shared/lib/utils/request.util";

export async function submitExamAction(examSubmission: IExamSubmissionRequest) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/submissions`;

  // Perform Authenticated Request
  const result = await authRequest<IExamSubmissionResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(examSubmission),
  });

  return result;
}
