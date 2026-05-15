"use server";

import { cache } from "react";
import { authOptions } from "@/auth";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { getServerSession } from "next-auth";
import { IDiplomaResponse } from "@/features/diplomas/lib/types/api";

export const getDiploma = cache(async (id: string) => {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas/${id}`;

  console.log("Date Now: ", new Date().toDateString());

  // Perform Authenticated Request
  const result = await apiRequest<IDiplomaResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle Not Found
  if (!result.status) {
    throw new Error(result.message);
  }

  console.log("Result: ", result);

  return result;
});
