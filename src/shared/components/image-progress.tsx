"use client";

import React, { memo } from "react";

type Props = {
  progress: number;
  isVisible: boolean;
};

function ImageProgress({ progress, isVisible }: Props) {
  if (!isVisible) return null;

  return (
    // ===== Progress bar container =====
    <div
      className="absolute bottom-0 left-0 h-[3px] w-full bg-gray-200 z-100"
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-label="Upload progress"
    >
      {/* Progress */}
      <div
        className="h-full bg-blue-600 transition-all duration-200"
        style={{
          width: `${progress}%`,
        }}
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
}

export default memo(ImageProgress);
