"use client";

import { memo } from "react";
import { Button } from "@/shared/components/ui";
import { Pagination } from "@/shared/components";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePagination } from "@/shared/hooks";
import { useAdminDiplomas } from "@/features/diplomas/hooks";
import {
  DiplomasToolbar,
  DiplomasDataTable,
  DiplomasTableColumns,
} from "@/features/diplomas/components";
import { AdminDiplomasTableSkeleton } from "@/features/diplomas/lib/skeletons";

function AdminDiplomasTable() {
  // ===== Fetch diplomas =====
  const { data, isFetching, isPending } = useAdminDiplomas();

  // ===== Current page data =====
  const diplomas = data?.payload?.data ?? [];

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
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-between bg-white">
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

        {/* Create New Diploma Button */}
        <Button
          variant="default"
          className=" w-fit bg-emerald-500 hover:bg-emerald-500/80"
          asChild
        >
          <Link href={"/diplomas/create-new-diploma"}>
            <Plus size={10} />
            Create Diploma
          </Link>
        </Button>
      </div>

      {/* ===== Toolbar ===== */}
      <DiplomasToolbar />

      {/* ===== Data table ===== */}
      {isPending ? (
        <AdminDiplomasTableSkeleton />
      ) : (
        <DiplomasDataTable columns={DiplomasTableColumns} data={diplomas} />
      )}
    </>
  );
}

export default memo(AdminDiplomasTable);
