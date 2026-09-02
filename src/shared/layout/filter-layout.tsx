"use client";

import { ReactNode } from "react";
import { SlidersHorizontal, ChevronsDownUp } from "lucide-react";

interface FilterLayoutProps {
  title?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function FilterLayout({
  title = "Search & Filters",
  isOpen,
  onToggle,
  children,
}: FilterLayoutProps) {
  return (
    <div className="bg-white overflow-hidden my-6 border">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-2.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-5" />
          <h4 className="font-semibold text-base">{title}</h4>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"
        >
          <ChevronsDownUp size={14} />
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      {/* Body */}
      <div
        className={`
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-4 flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}
