import { LucideIcon } from "lucide-react";

// Sortable fields for different entities
export type IDiplomaSortable = "title" | "createdAt";
export type IExamSortable = "title" | "questions" | "createdAt";
export type IQuestionSortable = "title" | "createdAt";

// Sort option structure for UI
export interface ISortOption<T> {
  label: string;
  icon?: LucideIcon;
  sortBy: T;
  sortOrder: "asc" | "desc";
}
