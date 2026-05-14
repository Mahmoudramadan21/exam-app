import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IDiplomaCreateSchema, IDiplomaResponse } from "../types/api";

type Props = {
  diplomaId: string;
  data: IDiplomaCreateSchema;
};

export async function updateDiplomaAction({ diplomaId, data }: Props) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas/${diplomaId}`;

  // Perform Authenticated Request
  const result = await apiRequest<IDiplomaResponse>(url, {
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
