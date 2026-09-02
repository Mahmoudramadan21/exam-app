"use client";

import { memo, useMemo } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldError,
} from "@/shared/components/ui";
import { useExams } from "@/features/exams/hooks";
import { useInfiniteScroll } from "@/shared/hooks";

// Component Props
interface IExamFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function ExamFilterSelect({ value, onChange, error }: IExamFilterSelectProps) {
  // Initialize exam hook
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useExams();

  // Flattern the exams data
  const exams = useMemo(() => {
    return data?.pages.flatMap((page) => page?.payload?.data || []) || [];
  }, [data]);

  // Initialize infinite scroll hook
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <Field>
      <DropdownMenu>
        {/* ===== Dropdown Menu Trigger ===== */}
        <DropdownMenuTrigger asChild>
          <Button
            id="examId"
            variant="outline"
            aria-invalid={!!error}
            aria-describedby={error ? "examId-error" : undefined}
            className="justify-between"
          >
            {exams.find((d) => d.id === value)?.title || "Select Exam"}

            <ChevronsUpDown className="size-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>

        {/* ===== Dropdown Menu Content ===== */}
        <DropdownMenuContent>
          {/* List of Exams */}
          {exams.map((exam) => (
            <DropdownMenuItem key={exam.id} onClick={() => onChange(exam.id)}>
              {exam.title}
            </DropdownMenuItem>
          ))}

          {/* Infinite scroll loader */}
          <div ref={ref} className="h-1" />

          {/* Loading indicator */}
          {isFetchingNextPage && (
            <div className="p-2 text-xs text-center text-gray-500">
              Loading...
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Error Message */}
      {error && <FieldError id="examId-error" errors={[{ message: error }]} />}
    </Field>
  );
}

export default memo(ExamFilterSelect);
