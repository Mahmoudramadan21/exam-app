"use server";

import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { buildQuery } from "@/shared/lib/utils/get-filters";
import { IParams } from "@/shared/lib/types/params";

/**
 * Fetch diplomas list with optional filters & pagination
 */
export async function getAllDiplomas(params: IParams) {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const query = buildQuery(params);

  const url = `${BACKEND_URL}/diplomas?${query.toString()}`;

  const result = await apiRequest<IDiplomasResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
