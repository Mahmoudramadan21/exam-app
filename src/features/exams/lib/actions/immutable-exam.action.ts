import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

interface IImmutableExamActionParams {
  id: string;
  immutable: boolean;
}

export async function immutableExamAction({
  id,
  immutable,
}: IImmutableExamActionParams) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/admin/exams/${id}/immutable`;

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
