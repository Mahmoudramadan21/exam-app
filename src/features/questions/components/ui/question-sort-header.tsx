"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { ArrowDownWideNarrow } from "lucide-react";
import { useQueryParams } from "@/shared/hooks";
import { IQuestionSortable, ISortOption } from "@/shared/lib/types/sort-option";

interface IQuestionSortHeaderProps {
  sortOptions: ISortOption<IQuestionSortable>[];
}

export default function QuestionSortHeader({
  sortOptions,
}: IQuestionSortHeaderProps) {
  const { setQueryParams } = useQueryParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-gray-300/40 aria-expanded:bg-gray-300/40">
          <span>Sort</span>

          <ArrowDownWideNarrow width={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-full">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const firstWord = option.label.split(" ")[0];
          const restOfWord = option.label
            .split(" ")
            .slice(1)
            .join(" ");
          return (
            <DropdownMenuItem
              key={option.label}
              className="font-geist-mono gap-1"
              onClick={() =>
                setQueryParams({
                  sortBy: option.sortBy,
                  sortOrder: option.sortOrder,
                })
              }
            >
              {Icon && <Icon width={18} />}

              <span className="ml-1.5 text-black text-sm">{firstWord}</span>
              <span className="text-gray-500 text-[10px]">{restOfWord}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
