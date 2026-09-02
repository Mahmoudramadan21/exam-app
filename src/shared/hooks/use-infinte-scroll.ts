"use client";

import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

interface IUseInfiniteScrollProps {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IUseInfiniteScrollProps) {
  // Setup Intersection Observer
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  // Trigger Fetch on Scroll
  useEffect(() => {
    // Exit if element is not visible
    if (!entry?.isIntersecting) return;

    // Prevent unnecessary or duplicate requests
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}
