import "server-only";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  IEmailStepSchema,
  IOtpStepSchema,
} from "@/features/auth/lib/types/auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { IProfileResponse } from "../types/user";

// Request to send update email
export const sendUpdateEmailAction = async (data: IEmailStepSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/email/request`;

  const result = await authRequest<IApiResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newEmail: data.email,
    }),
  });

  if (!result.status) {
    throw new Error(result.message || "Request failed");
  }

  return result;
};

export const confirmUpdateEmailAction = async (data: IOtpStepSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/email/confirm`;

  const result = await authRequest<IProfileResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!result.status) {
    throw new Error(result.message || "Request failed");
  }

  return result;
};
