import "server-only";

import { emailStepSchema } from "../schemas/email-step.schema";
import { IOtpStepSchema, IUserInfoSchema } from "../types/auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

/**
 * Sends email verification for signup flow.
 */
export const sendEmailStepAction = async (email: string) => {
  const parsedEmail = emailStepSchema.parse({ email });

  return authRequest<IApiResponse>(
    `${BACKEND_URL}/auth/send-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedEmail),
    },
  );
};

/**
 * Confirms OTP code sent to user's email.
 */
export const confirmOtpStepAction = async (payload: IOtpStepSchema) => {
  return authRequest<IApiResponse>(
    `${BACKEND_URL}/auth/confirm-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
};

/**
 * Final registration step after email verification.
 */
export const userInfoStepAction = async (payload: IUserInfoSchema) => {
  const result = await authRequest<IApiResponse>(
    `${BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  return result;
};
