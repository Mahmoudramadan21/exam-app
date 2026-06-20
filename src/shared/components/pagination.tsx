"use client";

import { memo } from "react";
import { Button } from "@/shared/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

function Pagination({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  canGoPrevious,
  canGoNext,
  isLoading = false,
  onPrevious,
  onNext,
}: IPaginationProps) {
  return (
    <div className="flex flex-col md:flex-row sm:items-center gap-4">
      {/* Page info */}
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {startItem} - {endItem} of {totalItems}
      </p>

      {/* Navigation buttons */}
      <div className="flex items-center border border-gray-200">
        {/* Previous page button */}
        <Button
          variant="secondary"
          className="w-10 h-10 border-none"
          aria-label="Previous page"
          disabled={!canGoPrevious}
          onClick={onPrevious}
        >
          <ChevronLeft className="w-1.5 text-gray-800" />
        </Button>

        {/* Page numbers */}
        <span className="font-geist-mono text-sm text-gray-400 px-4">
          {currentPage} of {totalPages}
        </span>

        {/* Next page button */}
        <Button
          variant="secondary"
          className="w-10 h-10 border-none"
          aria-label="Next page"
          disabled={!canGoNext || isLoading}
          onClick={onNext}
        >
          <ChevronRight className="w-1.5 text-gray-800" />
        </Button>
      </div>
    </div>
  );
}

export default memo(Pagination);
