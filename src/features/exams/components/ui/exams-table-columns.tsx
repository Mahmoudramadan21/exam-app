"use client";

import { IExam } from "@/features/exams/lib/types/exam";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import {
  EyeIcon,
  MoreHorizontal,
  PenLineIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import ExamSortHeader from "@/features/exams/components/ui/exam-sort-header";
import Link from "next/link";
import { EXAM_SORT_OPTIONS } from "@/shared/lib/constants/sort-options.constant";
import DeleteExamModal from "../delete-exam-modal";

export const ExamsTableColumns: ColumnDef<IExam>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-17.5 h-20">
        <Image
          src={row.getValue("image")}
          alt={row.original.title}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return (
        <p className="font-geist-mono text-sm text-gray-800 leading-relaxed text-wrap">
          {title}
        </p>
      );
    },
  },
  {
    accessorKey: "diploma",
    header: "Diploma",
    cell: ({ row }) => (
      <p className="font-geist-mono text-sm text-gray-500 max-w-[20ch] truncate">
        {row.original.diploma.title}
      </p>
    ),
  },
  {
    accessorKey: "questionsCount",
    header: "No. of Questions",
    cell: ({ row }) => (
      <p className="font-geist-mono text-sm text-gray-500 leading-relaxed text-wrap">
        {row.original.questionsCount}
      </p>
    ),
  },
  {
    id: "sort",
    header: () => <ExamSortHeader sortOptions={EXAM_SORT_OPTIONS} />,

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
              <Link href={`/exams/${row.original.id}`}>
                <EyeIcon className="size-4 text-emerald-500" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/exams/${row.original.id}/edit`}>
                <PenLineIcon className="size-4 text-blue-600" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/exams/${row.original.id}/questions`}>
                <PlusIcon className="size-4 text-blue-600" />
                Add Questions
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <DeleteExamModal
                examId={row.original.id}
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
