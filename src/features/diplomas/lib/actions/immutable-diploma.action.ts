import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IApiResponse } from "@/shared/lib/types/api";

interface IImmutableDiplomaActionParams {
  id: string;
  immutable: boolean;
}

export async function immutableDiplomaAction({
  id,
  immutable,
}: IImmutableDiplomaActionParams) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/admin/diplomas/${id}/immutable`;

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
