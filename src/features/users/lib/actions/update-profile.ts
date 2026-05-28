import "server-only";

import {
  IProfileResponse,
  IUpdateProfileSchema,
} from "@/features/users/lib/types/api";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

export const updateProfileAction = async (data: IUpdateProfileSchema) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const url = `${BACKEND_URL}/users/profile`;

  const result = await apiRequest<IProfileResponse>(url, {
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
    throw new Error(result.message);
  }

  return result;
};
