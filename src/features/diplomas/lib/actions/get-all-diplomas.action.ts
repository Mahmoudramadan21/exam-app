import { authOptions } from "@/auth";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { authRequest } from "@/shared/lib/utils/request.util";
import { getServerSession } from "next-auth";
import { IDiplomasResponse } from "@/features/diplomas/lib/types/api";

interface IGetAllDiplomasParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
}

/**

* Fetch diplomas list with optional filters & pagination
  */
export async function getAllDiplomasAction(params?: IGetAllDiplomasParams) {
  // Get Auth Token
  const session = await getServerSession(authOptions);
  const token = session?.token;

  // Build Query Params
  const query = new URLSearchParams();

  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.sortOrder) query.set("sortOrder", params.sortOrder);

  if (params?.immutable !== undefined) {
    query.set("immutable", String(params.immutable));
  }

  if (params?.search) query.set("search", params.search);

  // Construct Request URL
  const url = `${BACKEND_URL}/diplomas?${query.toString()}`;

  // Perform Authenticated Request
  const result = await authRequest<IDiplomasResponse>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}
