"use client";

import { useEffect, useState } from "react";
import { useQueryParams } from "@/shared/hooks";

export function useDiplomasFilters() {
  const { searchParams, setQueryParams } = useQueryParams();

  // applied (from URL)
  const appliedSearch = searchParams.get("search") || "";
  const appliedImmutable = searchParams.get("immutable") || "";

  // draft state
  const [search, setSearch] = useState(appliedSearch);
  const [immutable, setImmutable] = useState(appliedImmutable);

  const [openCollapse, setOpenCollapse] = useState<boolean>(true);

  // sync if URL changes externally
  useEffect(() => {
    setSearch(appliedSearch);
    setImmutable(appliedImmutable);
  }, [appliedSearch, appliedImmutable]);

  function applyFilters() {
    setQueryParams({
      search,
      immutable,
    });
  }

  function clearFilters() {
    setSearch("");
    setImmutable("");

    setQueryParams({
      search: "",
      immutable: "",
    });
  }

  function toggleCollapse() {
    setOpenCollapse((prev) => !prev);
  }

  return {
    search,
    setSearch,
    immutable,
    setImmutable,
    applyFilters,
    clearFilters,

    openCollapse,
    toggleCollapse,
  };
}
