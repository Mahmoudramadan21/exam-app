import {
  IQuestionResponse,
  ICreateQuestionSchema,
} from "@/features/questions/lib/types/api";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

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
  const session = await getServerSession(authOptions);
  const token = session?.token;

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
