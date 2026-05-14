import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import {
  IDiplomaCreateSchema,
  IDiplomaResponse,
} from "@/features/diplomas/lib/types/api";

export async function createDiplomaAction(data: IDiplomaCreateSchema) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas`;

  // Perform Authenticated Request
  const result = await apiRequest<IDiplomaResponse>(url, {
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
