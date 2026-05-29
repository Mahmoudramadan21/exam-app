import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IProfileResponse } from "@/features/users/lib/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

/**
 * Sends password reset email to user.
 */
export const getProfile = async () => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/users/profile`;

  const result = await apiRequest<IProfileResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(result);

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};
