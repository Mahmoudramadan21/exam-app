// Shred Params types for backend interactions
export interface IParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
  diplomaId?: string;
}
