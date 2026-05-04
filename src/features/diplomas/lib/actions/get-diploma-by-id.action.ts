import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { authRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IDiplomaResponse } from "@/features/diplomas/lib/types/api";

export async function getDiplomaByIdAction(id: string) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas/${id}`;

  // Perform Authenticated Request
  const result = await authRequest<IDiplomaResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}
