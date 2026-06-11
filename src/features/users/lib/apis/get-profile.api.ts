import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IProfileResponse } from "@/features/users/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

/**
 * Sends password reset email to user.
 */
export const getProfile = async () => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/users/profile`;

  const result = await apiRequest<IProfileResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};
