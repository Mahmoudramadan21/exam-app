import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export const deleteAccountAction = async () => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const url = `${BACKEND_URL}/users/account`;

  const result = await apiRequest<IApiResponse>(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};
