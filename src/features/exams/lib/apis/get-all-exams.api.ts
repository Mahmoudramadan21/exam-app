"use server";

import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IExamsResponse } from "@/features/exams/lib/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { buildQuery } from "@/shared/lib/utils/get-filters";
import { IParams } from "@/shared/lib/types/params";

export async function getAllExams(params: IParams) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Build Query
  const query = buildQuery(params);

  // Build URL
  const url = `${BACKEND_URL}/exams?${query.toString()}`;

  // API Request
  const result = await apiRequest<IExamsResponse>(url, {
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
