"use server";

import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";
import { buildQuery } from "@/shared/lib/utils/get-filters";
import { IParams } from "@/shared/lib/types/params";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

/**
 * Fetch diplomas list with optional filters & pagination
 */
export async function getAllDiplomas(params: IParams) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const query = buildQuery(params);

  const url = `${BACKEND_URL}/diplomas?${query.toString()}`;

  const result = await apiRequest<IDiplomasResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Result: ", result);

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
