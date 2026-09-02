"use client";

import { memo } from "react";

import { Download, Loader2, Trash2 } from "lucide-react";

type Props = {
  isUploading: boolean;
  onDownload(): void;
  onRemove(): void;
};

function ImageActions({ isUploading, onDownload, onRemove }: Props) {
  return (
    <div className="pl-1 flex items-center gap-1.5">
      {/* Download button */}
      <button
        type="button"
        onClick={onDownload}
        className="rounded-md p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 hover:cursor-pointer"
      >
        <Download className="h-4.5 w-4.5" />
      </button>

      {/* Loader spinner */}
      {isUploading && (
        <Loader2 className="h-4.5 w-4.5 animate-spin text-blue-600" />
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
      >
        <Trash2 className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

export default memo(ImageActions);
