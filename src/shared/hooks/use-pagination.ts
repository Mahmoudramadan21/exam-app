"use client";

import { useCallback } from "react";
import { useQueryParams } from "@/shared/hooks";
import { DEFAULT_LIMIT } from "@/shared/lib/constants/pagination.constant";
import { IPagination } from "../lib/types/api";

export function usePagination(data: IPagination) {
  const { searchParams, setQueryParams } = useQueryParams();
  // ===== Pagination metadata =====
  const totalPages = data?.totalPages ?? 1;
  const pageSize = data?.limit ?? DEFAULT_LIMIT;
  const totalItems = data?.total ?? 0;

  const currentPage = Number(searchParams.get("page") || "1");

  // ===== Items range =====
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  // ===== Navigation state =====
  const canGoPrevious = currentPage > 1;

  const canGoNext = currentPage < totalPages;

  // ===== Handlers =====
  const goToPreviousPage = useCallback(() => {
    if (!canGoPrevious) return;

    setQueryParams({
      page: String(currentPage - 1),
    });
  }, [canGoPrevious, currentPage, setQueryParams]);

  const goToNextPage = useCallback(() => {
    if (!canGoNext) return;

    setQueryParams({
      page: String(currentPage + 1),
    });
  }, [canGoNext, currentPage, setQueryParams]);

  return {
    totalPages,
    pageSize,
    totalItems,
    currentPage,

    startItem,
    endItem,

    canGoPrevious,
    canGoNext,

    goToPreviousPage,
    goToNextPage,
  };
}
