import { IApiResponse } from "@/shared/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IChangePasswordSchema } from "@/features/users/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

// Request to send update email
export const updatePasswordAction = async (data: IChangePasswordSchema) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const url = `${BACKEND_URL}/users/change-password`;

  const result = await apiRequest<IApiResponse>(url, {
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
};
