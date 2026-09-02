import {
  IDiplomaSortable,
  IExamSortable,
  IQuestionSortable,
  ISortOption,
} from "@/shared/lib/types/sort-option";
import {
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp01,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

export const DIPLOMA_SORT_OPTIONS: ISortOption<IDiplomaSortable>[] = [
  {
    label: "Title (descending)",
    icon: ArrowDownAZ,
    sortBy: "title",
    sortOrder: "desc",
  },
  {
    label: "Title (ascending)",
    icon: ArrowUpAZ,
    sortBy: "title",
    sortOrder: "asc",
  },
  {
    label: "Newest (descending)",
    icon: CalendarArrowDown,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    label: "Newest (ascending)",
    icon: CalendarArrowUp,
    sortBy: "createdAt",
    sortOrder: "asc",
  },
];

export const EXAM_SORT_OPTIONS: ISortOption<IExamSortable>[] = [
  {
    label: "Title (descending)",
    icon: ArrowDownAZ,
    sortBy: "title",
    sortOrder: "desc",
  },
  {
    label: "Title (ascending)",
    icon: ArrowUpAZ,
    sortBy: "title",
    sortOrder: "asc",
  },
  {
    label: "Questions No (descending)",
    icon: ArrowDown01,
    sortBy: "questions",
    sortOrder: "desc",
  },
  {
    label: "Questions No (ascending)",
    icon: ArrowUp01,
    sortBy: "questions",
    sortOrder: "asc",
  },
  {
    label: "Newest (descending)",
    icon: CalendarArrowDown,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    label: "Newest (ascending)",
    icon: CalendarArrowUp,
    sortBy: "createdAt",
    sortOrder: "asc",
  },
];

export const QUESTIONS_SORT_OPTIONS: ISortOption<IQuestionSortable>[] = [
  {
    label: "Title (descending)",
    icon: ArrowDownAZ,
    sortBy: "title",
    sortOrder: "desc",
  },
  {
    label: "Title (ascending)",
    icon: ArrowUpAZ,
    sortBy: "title",
    sortOrder: "asc",
  },
  {
    label: "Newest (descending)",
    icon: CalendarArrowDown,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    label: "Newest (ascending)",
    icon: CalendarArrowUp,
    sortBy: "createdAt",
    sortOrder: "asc",
  },
];

export const IMMUTABLE_OPTIONS: {
  value: "none" | "true" | "false";
  label: string;
}[] = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "true",
    label: "Immutable",
  },
  {
    value: "false",
    label: "Mutable",
  },
];
