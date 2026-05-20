import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IExamCreateSchema } from "@/features/exams/lib/types/api";
import { IExamResponse } from "@/features/exams/lib/types/api";

type Props = {
  examId: string;
  data: IExamCreateSchema;
};

export async function updateExamAction({ examId, data }: Props) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/exams/${examId}`;

  console.log(url);
  console.log(data);

  // Perform Authenticated Request
  const result = await apiRequest<IExamResponse>(url, {
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
