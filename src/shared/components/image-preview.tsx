"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ImageActions } from "@/shared/components";

interface IUploadedFile {
  file?: File;
  preview: string;
  name: string;
  size?: number;
  url?: string;
}

type Props = {
  file: IUploadedFile;
  isUploading: boolean;
  onDownload(): void;
  onRemove(): void;
};

function ImagePreview({ file, isUploading, onDownload, onRemove }: Props) {
  return (
    <div className="flex w-full items-center justify-between px-0.5">
      {/* ===== File info ===== */}
      <div className="flex items-center gap-3 lg:w-full overflow-hidden">
        {/* Preview */}
        <div className="relative h-21 w-21 shrink-0 rounded-md bg-gray-100">
          <Image
            src={file.preview}
            alt={file.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center min-w-0 w-full">
          {/* File name */}
          <p className="text-sm text-gray-600 truncate">{file.name}</p>

          {/* File size */}
          <p className="lg:pr-2.5 lg:border-r lg:border-gray-300 text-xs text-gray-400 truncate">
            {file.size && `${(file.size / 1024 / 1024).toFixed(2)} MB`}
          </p>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <ImageActions
        isUploading={isUploading}
        onDownload={onDownload}
        onRemove={onRemove}
      />
    </div>
  );
}

export default memo(ImagePreview);
