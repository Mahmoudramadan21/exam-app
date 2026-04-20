"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface IPageBarProps {
  title: string;
  showBack?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function PageBar({
  title,
  showBack = false,
  icon,
  className = "",
}: IPageBarProps) {
  const router = useRouter();

  return (
    <div className={`flex items-center gap-3 h-18 mb-6 ${className}`}>
      {/* Back navigation button (optional) */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="h-full px-1 bg-white hover:bg-white/90 border border-blue-600 transition cursor-pointer"
          aria-label="Go back to the previous page"
        >
          <ChevronLeft className="size-5 text-blue-600" />
        </button>
      )}

      {/* Page title section */}
      <div className="h-full flex items-center gap-3 px-4 bg-blue-600 text-white grow">
        {/* Optional page icon */}
        {icon && <div className="text-xl">{icon}</div>}

        {/* Page title */}
        <h1 className="text-3xl font-inter font-semibold truncate">{title}</h1>
      </div>
    </div>
  );
}
