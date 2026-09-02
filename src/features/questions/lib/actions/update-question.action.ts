import {
  IQuestionResponse,
  ICreateQuestionSchema,
} from "@/features/questions/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

//  Update Question Action Props
interface IUpdateQuestionActionProps {
  questionId: string;
  data: ICreateQuestionSchema;
}

export async function updateQuestionAction({
  questionId,
  data,
}: IUpdateQuestionActionProps) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/questions/${questionId}`;

  // Perform Authenticated Request
  const result = await apiRequest<IQuestionResponse>(url, {
    method: "PUT",
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
