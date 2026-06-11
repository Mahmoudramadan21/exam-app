"use client";

import { memo, Suspense } from "react";
import { usePagination } from "@/shared/hooks";
import { AppContainer, Pagination } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  ExamsTableColumns,
  ExamsDataTable,
  ExamsToolbar,
} from "@/features/exams/components";
import { useAdminExams } from "@/features/exams/hooks";
import { AdminExamsTableSkeleton } from "../lib/skeletons";

function AdminExamsTable() {
  // ===== Fetch diplomas =====
  const { data, isFetching, isPending } = useAdminExams();

  console.log("Data: ", data);

  // ===== Current page data =====
  const exams = data?.payload?.data ?? [];

  // ===== Pagination logic =====
  const {
    totalPages,
    totalItems,
    currentPage,
    startItem,
    endItem,
    canGoPrevious,
    canGoNext,
    goToPreviousPage,
    goToNextPage,
  } = usePagination(data?.payload?.metadata!);

  return (
    <>
      <AppContainer className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-between bg-white">
        {/* ===== Pagination ===== */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalItems={totalItems}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          isLoading={isFetching}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />

        <Button
          variant="default"
          className=" w-fit bg-emerald-500 hover:bg-emerald-500/80"
          asChild
        >
          <Link href={"/exams/create-new-exam"}>
            <Plus size={10} />
            Create Exam
          </Link>
        </Button>
      </AppContainer>

      <AppContainer>
        {/* ===== Toolbar ===== */}
        <ExamsToolbar />

        {/* ===== Data table ===== */}
        {isPending ? (
          <AdminExamsTableSkeleton />
        ) : (
          <ExamsDataTable columns={ExamsTableColumns} data={exams} />
        )}
      </AppContainer>
    </>
  );
}

export default memo(AdminExamsTable);
