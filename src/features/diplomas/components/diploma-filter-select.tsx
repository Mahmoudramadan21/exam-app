"use client";

import { memo, useMemo } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Field,
  FieldError,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { useDiplomas } from "@/features/diplomas/hooks";
import { useInfiniteScroll } from "@/shared/hooks";

// Props interface
interface IDiplomaFilterSelectProps {
  value: string;
  selectedTitle?: string;
  onChange: (value: string) => void;
  error?: string;
}

// ===== Diploma Filter Select =====
function DiplomaFilterSelect({
  value,
  selectedTitle,
  onChange,
  error,
}: IDiplomaFilterSelectProps) {
  // Fetch diplomas with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiplomas();

  // Flat diplomas data for infinite scroll
  const diplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page?.payload?.data || []) || [];
  }, [data]);

  // Infinite scroll trigger
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // Find selected diploma
  const selectedDiploma = diplomas.find((d) => d.id === value);

  return (
    <Field>
      <DropdownMenu>
        {/* ===== Dropdown Menu Trigger ===== */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-invalid={!!error}
            aria-describedby={error ? "diplomaId-error" : undefined}
            className="justify-between "
          >
            {selectedDiploma?.title ?? selectedTitle ?? "Select diploma"}{" "}
            <ChevronsUpDown className="size-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>

        {/* ===== Dropdown Menu Content ===== */}
        <DropdownMenuContent>
          {/* Diplomas List */}
          {diplomas.map((diploma) => (
            <DropdownMenuItem
              key={diploma.id}
              onClick={() => onChange(diploma.id)}
            >
              {diploma.title}
            </DropdownMenuItem>
          ))}

          {/* Infinite Scroll Trigger */}
          <div ref={ref} className="h-1" />

          {/* Loading State */}
          {isFetchingNextPage && (
            <div className="p-2 text-xs text-center text-gray-500">
              Loading...
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && <FieldError id="examId-error" errors={[{ message: error }]} />}
    </Field>
  );
}

export default memo(DiplomaFilterSelect);
