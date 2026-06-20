"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontal, PenLineIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { QUESTIONS_SORT_OPTIONS } from "@/shared/lib/constants/sort-options.constant";
import { IQuestion } from "@/features/questions/lib/types/question";
import QuestionSortHeader from "./question-sort-header";
import DeleteQuestionModal from "../delete-question-modal";

export const QuestionsTableColumns: ColumnDef<IQuestion>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const shouldShowTooltip = title.length > 20;

      const content = (
        <p className="font-geist-mono text-sm text-gray-800 max-w-[20ch] truncate">
          {title}
        </p>
      );

      if (!shouldShowTooltip) {
        return content;
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    id: "sort",
    header: () => <QuestionSortHeader sortOptions={QUESTIONS_SORT_OPTIONS} />,

    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button
              variant="ghost"
              className="flex mx-auto w-8 h-8 bg-gray-200"
            >
              <MoreHorizontal aria-label="Open Menu" width={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-full">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link
                href={`/exams/${row.original.examId}/questions/${row.original.id}`}
              >
                <EyeIcon className="size-4 text-emerald-500" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link
                href={`/exams/${row.original.examId}/questions/${row.original.id}/edit`}
              >
                <PenLineIcon className="size-4 text-blue-600" />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" asChild>
              <DeleteQuestionModal
                questionId={row.original.id}
                trigger={
                  <Button variant="ghost" className="justify-start">
                    <Trash2 className="size-4 text-red-600" />
                    Delete
                  </Button>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
