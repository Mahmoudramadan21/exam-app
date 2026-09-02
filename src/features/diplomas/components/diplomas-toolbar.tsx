"use client";

import {
  Input,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { memo } from "react";
import { FilterLayout } from "@/shared/layout";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import { useDiplomasFilters } from "@/features/diplomas/hooks";
import { IMMUTABLE_OPTIONS } from "@/shared/lib/constants/sort-options.constant";

function DiplomasToolbar() {
  const {
    search,
    setSearch,
    immutable,
    setImmutable,
    applyFilters,
    clearFilters,
    openCollapse,
    toggleCollapse,
  } = useDiplomasFilters();

  return (
    <FilterLayout isOpen={openCollapse} onToggle={toggleCollapse}>
      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />

        <Search
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            size-4 text-gray-400
          "
        />
      </div>

      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="justify-between">
          <Button variant="outline" className=" md:max-w-81.5">
            {IMMUTABLE_OPTIONS.find((o) => o.value === immutable)?.label ||
              "Immutability"}

            <ChevronsUpDown className="size-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {IMMUTABLE_OPTIONS.map((option) => {
            const selected = option.value === immutable;

            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setImmutable(option.value)}
                className="flex justify-between"
              >
                {option.label}

                {selected && <Check className="size-4" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Actions */}
      <div className="w-full sm:w-53 grid grid-cols-2 ml-auto gap-3">
        <Button variant="ghost" onClick={clearFilters}>
          Clear
        </Button>

        <Button variant="secondary" onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </FilterLayout>
  );
}

export default memo(DiplomasToolbar);
