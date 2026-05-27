import { IParams } from "@/shared/lib/types/params";

/**
 * Build query params for questions
 * @param params - Params to build query from
 * @returns Query params for questions
 */
export function buildQuestionsQuery(params: IParams) {
  const query = new URLSearchParams();

  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);
  if (params.immutable !== undefined)
    query.set("immutable", String(params.immutable));
  if (params.search) query.set("search", params.search);

  return query;
}
