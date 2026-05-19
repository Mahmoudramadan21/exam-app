"use client";

import { useEffect, useState } from "react";
import { useQueryParams } from "@/shared/hooks";

export function useExamsFilters() {
  const { searchParams, setQueryParams } = useQueryParams();

  // applied (from URL)
  const appliedSearch = searchParams.get("search") || "";
  const appliedDiplomaId = searchParams.get("diplomaId") || "";
  const appliedImmutable = searchParams.get("immutable") || "";

  // draft state
  const [search, setSearch] = useState(appliedSearch);

  const [diplomaId, setDiplomaId] = useState(appliedDiplomaId);

  const [immutable, setImmutable] = useState(appliedImmutable);

  const [openCollapse, setOpenCollapse] = useState(true);

  // sync if URL changes externally
  useEffect(() => {
    setSearch(appliedSearch);
    setDiplomaId(appliedDiplomaId);
    setImmutable(appliedImmutable);
  }, [appliedSearch, appliedDiplomaId, appliedImmutable]);

  function applyFilters() {
    setQueryParams({
      search,
      diplomaId,
      immutable,
    });
  }

  function clearFilters() {
    setSearch("");
    setDiplomaId("");
    setImmutable("");

    setQueryParams({
      search: "",
      diplomaId: "",
      immutable: "",
    });
  }

  function toggleCollapse() {
    setOpenCollapse((prev) => !prev);
  }

  return {
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
  };
}
