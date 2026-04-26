// features/auth/actions/login.action.ts

// import "server-only";
import { loginSchema } from "../schemas/login.schema";
import { ILoginResponse, ILoginSchema } from "../types/auth";
import { authRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";

/**
 * Handles user login request.
 * Validates payload before sending it to backend.
 */
export const loginAction = async (payload: ILoginSchema) => {
  const validated = loginSchema.parse(payload);

  return authRequest<ILoginResponse>(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated),
  });
};
