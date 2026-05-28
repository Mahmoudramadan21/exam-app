import "server-only";

import {
  IEmailStepSchema,
  IOtpStepSchema,
} from "@/features/auth/lib/types/auth";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { IProfileResponse } from "@/features/users/lib/types/api";

// Request to send update email
export const sendUpdateEmailAction = async (data: IEmailStepSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/email/request`;

  return await apiRequest<IApiResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newEmail: data.email,
    }),
  });
};

export const confirmUpdateEmailAction = async (data: IOtpStepSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/email/confirm`;

  const result = await apiRequest<IProfileResponse>(url, {
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
