import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

interface IImmutableQuestionActionParams {
  id: string;
  immutable: boolean;
}

export async function immutableQuestionAction({
  id,
  immutable,
}: IImmutableQuestionActionParams) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/admin/questions/${id}/immutable`;

  // Perform Authenticated Request
  const result = await apiRequest<IApiResponse>(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ immutable: !immutable }),
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
