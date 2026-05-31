"use client";

import {
  Controller,
  FieldValues,
  Path,
  UseFormSetValue,
  useForm,
} from "react-hook-form";

import {
  ImageProgress,
  ImageDropzone,
  ImagePreview,
} from "@/shared/components";

import { memo } from "react";
import { useImageField } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageSchema, IImageSchema } from "../lib/schemes/image.schema";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui";
import { Control } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
  setValue: UseFormSetValue<T>;
  label?: string;
};

function ImageField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  setValue,
  label = "Image",
}: Props<T>) {
  // Local form for validation
  const form = useForm<IImageSchema>({
    resolver: zodResolver(imageSchema),
    mode: "onChange",
    defaultValues: {
      file: undefined,
    },
  });

  console.log(defaultValue);

  // Extracted business logic
  const {
    uploadedFile,
    progress,

    isPending,
    isError,
    error,

    handleFileChange,
    removeFile,
    downloadFile,
  } = useImageField<T>({
    name,
    setValue,
    defaultValue,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* ===== Label ===== */}
          <FieldLabel htmlFor="image-field">{label}</FieldLabel>

          {/* ===== Upload Container ===== */}
          <div
            className="relative flex min-h-22 w-full border-2 border-gray-300 bg-white transition-colors hover:border-blue-500 aria-invalid:border-destructive"
            aria-invalid={fieldState.invalid}
          >
            {/* ===== Upload Progress ===== */}
            <ImageProgress isVisible={isPending} progress={progress} />

            {/* ===== Upload Dropzone ===== */}
            {!uploadedFile && (
              <ImageDropzone
                inputRef={field.ref}
                onSelect={(file) => {
                  field.onChange(file);

                  handleFileChange(file);
                }}
              />
            )}

            {/* ===== Image Preview ===== */}
            {uploadedFile && (
              <ImagePreview
                file={uploadedFile}
                isUploading={isPending}
                onDownload={downloadFile}
                onRemove={removeFile}
              />
            )}
          </div>

          {/* ===== Error Message ===== */}
          {fieldState.error && (
            <FieldError id="image-field-error" errors={[fieldState.error]} />
          )}

          {/* ===== API Error ===== */}
          {isError && !fieldState.error && (
            <FieldError
              id="image-field-error"
              errors={[{ message: (error as Error)?.message }]}
            />
          )}
        </Field>
      )}
    />
  );
}

export default memo(ImageField) as typeof ImageField;
