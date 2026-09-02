"use client";

import { IDiploma } from "@/features/diplomas/lib/types/diploma";
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
import Image from "next/image";
import DiplomaSortHeader from "@/features/diplomas/components/ui/diploma-sort-header";
import Link from "next/link";
import { DIPLOMA_SORT_OPTIONS } from "@/shared/lib/constants/sort-options.constant";
import { DeleteDiplomaModal } from "@/features/diplomas/components";

export const DiplomasTableColumns: ColumnDef<IDiploma>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="font-geist-mono text-sm text-gray-500 leading-relaxed text-wrap">
        {row.getValue("description")}
      </p>
    ),
  },
  {
    id: "sort",
    header: () => <DiplomaSortHeader sortOptions={DIPLOMA_SORT_OPTIONS} />,

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
              <Link href={`/diplomas/${row.original.id}`}>
                <EyeIcon className="size-4 text-emerald-500" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/diplomas/${row.original.id}/edit`}>
                <PenLineIcon className="size-4 text-blue-600" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <DeleteDiplomaModal
                diplomaId={row.original.id}
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
