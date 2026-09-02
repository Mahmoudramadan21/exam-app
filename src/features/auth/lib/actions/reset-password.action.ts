import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

/**
 * Resets user password using secure token.
 */
export const resetPasswordAction = async (payload: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return apiRequest(`${BACKEND_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
