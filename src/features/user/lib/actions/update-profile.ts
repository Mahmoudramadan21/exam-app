import "server-only";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

import {
  IProfileResponse,
  IUpdateProfileSchema,
} from "@/features/user/lib/types/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const updateProfileAction = async (data: IUpdateProfileSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/profile`;

  const result = await authRequest<IProfileResponse>(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone.replace("+20", "0"),
    }),
  });

  if (!result.status) {
    throw new Error(result.message || "Request failed");
  }

  return result.payload;
};
