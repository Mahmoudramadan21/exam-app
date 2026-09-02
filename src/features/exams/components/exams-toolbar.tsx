"use client";

import { Search } from "lucide-react";
import { memo } from "react";
import { FilterLayout } from "@/shared/layout";
import { Button, Input } from "@/shared/components/ui";
import { IMMUTABLE_OPTIONS } from "@/shared/lib/constants/sort-options.constant";
import { ImmutableFilterSelect } from "@/shared/components";
import { DiplomaFilterSelect } from "@/features/diplomas/components";
import { useExamsFilters } from "@/features/exams/hooks";

function ExamsToolbar() {
  const {
    search,
    setSearch,
    diplomaId,
    setDiplomaId,
    immutable,
    setImmutable,
    applyFilters,
    clearFilters,
    openCollapse,
    toggleCollapse,
  } = useExamsFilters();

  return (
    <FilterLayout isOpen={openCollapse} onToggle={toggleCollapse}>
      {/* ===== Search Input ===== */}
      <div className="relative">
        <Input
          placeholder="Search exam..."
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

      {/* ===== Filter Options ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {/* ===== Diploma Filter ===== */}
        <DiplomaFilterSelect value={diplomaId} onChange={setDiplomaId} />

        {/* ===== Immutable Filter ===== */}
        <ImmutableFilterSelect
          value={immutable}
          placeholder="Immutability"
          options={IMMUTABLE_OPTIONS}
          onChange={setImmutable}
        />
      </div>

      {/* ===== Actions Buttons ===== */}
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

export default memo(ExamsToolbar);
