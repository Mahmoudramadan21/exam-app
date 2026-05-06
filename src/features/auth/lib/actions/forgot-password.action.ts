import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { emailStepSchema } from "@/features/auth/lib/schemas/email-step.schema";

/**
 * Sends password reset email to user.
 */
export const forgotPasswordAction = async (email: string) => {
  const parsed = emailStepSchema.parse({ email });

  return apiRequest(`${BACKEND_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.email,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    }),
  });
};
