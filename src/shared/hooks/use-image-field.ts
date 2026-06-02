import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { useUploadImage } from "@/shared/hooks";

type Props<T extends FieldValues> = {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultValue?: string | null;
};

interface IUploadedFile {
  file?: File;
  preview: string;
  name: string;
  size?: number;
  url?: string;
}

export function useImageField<T extends FieldValues>({
  name,
  setValue,
  defaultValue,
}: Props<T>) {
  // Upload hook
  const { upload, progress, isPending, isError, error } = useUploadImage();

  // Uploaded file state
  const [uploadedFile, setUploadedFile] = useState<IUploadedFile | null>(null);

  useEffect(() => {
    if (!defaultValue) return;

    setUploadedFile({
      preview: defaultValue,
      name: defaultValue.split("/").pop() || "Current image",
      url: defaultValue,
    });
  }, [defaultValue]);

  // File change handler
  async function handleFileChange(file: File) {
    // Create file preview
    const preview = URL.createObjectURL(file);

    setUploadedFile({
      file,
      preview,
      name: file.name,
      size: file.size,
    });

    try {
      // Upload file
      const response = await upload(file);

      // Set form value
      setValue(name, response.payload?.url as T[Path<T>], {
        shouldDirty: true,
        shouldValidate: true,
      });

      setUploadedFile((prev) =>
        prev
          ? {
              ...prev,
              url: response.payload?.url,
            }
          : null,
      );
    } catch {}
  }

  // Remove file handler
  function removeFile() {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }

    setUploadedFile(null);

    setValue(name, "" as T[Path<T>], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  // Download file handler
  async function downloadFile() {
    if (!uploadedFile) return;

    // if file is uploaded in form
    if (uploadedFile.file) {
      const blobUrl = URL.createObjectURL(uploadedFile.file);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = uploadedFile.name;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(blobUrl);
      return;
    }

    // if file is uploaded from server
    const res = await fetch(uploadedFile.url!);
    const blob = await res.blob();

    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = uploadedFile.name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobUrl);
  }

  // Clean up preview when component unmounts
  useEffect(() => {
    return () => {
      if (uploadedFile?.preview) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    };
  }, [uploadedFile]);

  return {
    uploadedFile,
    progress,
    isPending,
    isError,
    error,

    handleFileChange,
    removeFile,
    downloadFile,
  };
}
