"use client";

import React, { memo } from "react";
import { CloudUpload, FileImage } from "lucide-react";
import { Input } from "@/shared/components/ui";

type Props = {
  inputRef: React.Ref<any>;
  onSelect(file: File): void;
};

function ImageDropzone({ inputRef, onSelect }: Props) {
  return (
    <>
      {/* ===== Hidden input for file selection ===== */}
      <Input
        ref={inputRef}
        id="image-field"
        type="file"
        accept="image/*"
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          onSelect(file);
        }}
      />

      {/* ===== Empty state for image dropzone ===== */}
      <div className="flex w-full items-center justify-between gap-3 p-4 lg:p-6 text-center text-gray-500">
        {/* Image icon */}
        <FileImage className="size-10 text-gray-200" />

        <div className="flex flex-col md:flex-row items-center gap-1.5 mx-auto">
          {/* Upload icon */}
          <CloudUpload className="size-6 text-gray-600" />

          {/* Drop text */}
          <p className="text-sm text-gray-600">
            Drop an image here or{" "}
            <span className="text-blue-600">select from your computer</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default memo(ImageDropzone);
