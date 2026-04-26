import "server-only";

import { HEADERS } from "@/shared/lib/constants/api.constant";
import { ILoginPayload, ILoginResponse, ILoginSchema } from "../types/auth";
import { IApiResponse } from "@/shared/lib/types/api";

export const login = async (loginFields: ILoginSchema) => {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginFields),
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  const payload: ILoginResponse = await response.json();

  if (payload.status === false) return;

  return payload;
};
