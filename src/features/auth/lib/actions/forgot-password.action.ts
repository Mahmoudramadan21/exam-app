import "server-only";
import { emailStepSchema } from "../schemas/email-step.schema";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

/**
 * Sends password reset email to user.
 */
export const forgotPasswordAction = async (email: string) => {
  const parsed = emailStepSchema.parse({ email });

  return authRequest(`${BACKEND_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed),
  });
};
