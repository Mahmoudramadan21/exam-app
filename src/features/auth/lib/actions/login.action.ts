import "server-only";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { loginSchema } from "@/features/auth/lib/schemas/login.schema";
import { ILoginResponse, ILoginSchema } from "@/features/auth/lib/types/auth";

/**
 * Handles user login request.
 * Validates payload before sending it to backend.
 */
export const loginAction = async (payload: ILoginSchema) => {
  const validated = loginSchema.parse(payload);

  return apiRequest<ILoginResponse>(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated),
  });
};
