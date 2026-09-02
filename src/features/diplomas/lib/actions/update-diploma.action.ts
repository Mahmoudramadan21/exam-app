import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import {
  IDiplomaCreateSchema,
  IDiplomaResponse,
} from "@/features/diplomas/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

type Props = {
  diplomaId: string;
  data: IDiplomaCreateSchema;
};

export async function updateDiplomaAction({ diplomaId, data }: Props) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

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
