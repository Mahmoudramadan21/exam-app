import "server-only";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { IApiResponse } from "@/shared/lib/types/api";

export const deleteAccountAction = async () => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/account`;

  const result = await authRequest<IApiResponse>(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message || "Request failed");
  }

  return result;
};
