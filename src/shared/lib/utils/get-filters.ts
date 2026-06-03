import { DEFAULT_LIMIT } from "@/shared/lib/constants/pagination.constant";
import { IParams } from "@/shared/lib/types/params";

/**
 * Gets URL search parameters and returns them in a structured format
 * @param searchParams - The URL search parameters to filter
 * @returns An object containing the filtered parameters
 */
export function getFilters(searchParams: URLSearchParams) {
  return {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || DEFAULT_LIMIT,
    sortBy:
      (searchParams.get("sortBy") as "title" | "createdAt" | "questions") ||
      "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    immutable: searchParams.get("immutable") === "true" ? true : undefined,
    search: searchParams.get("search") || "",
    diplomaId: searchParams.get("diplomaId") || "",
  };
}

/**
 * Builds URL search parameters from a given parameters object
 * @param params - The parameters object to build the query from
 * @returns A URLSearchParams object containing the query parameters
 */
export function buildQuery(params: IParams) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);
  if (params.immutable !== undefined)
    query.set("immutable", String(params.immutable));
  if (params.search) query.set("search", params.search);
  if (params.diplomaId) query.set("diplomaId", params.diplomaId);

  return query;
}
