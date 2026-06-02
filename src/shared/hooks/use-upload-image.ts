import { useMutation } from "@tanstack/react-query";

import axios from "axios";

import { useState } from "react";

import { IUploadImageResponse } from "../lib/types/api";

export function useUploadImage() {
  // Progress state
  const [progress, setProgress] = useState(0);

  // Mutation
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("image", file);

      try {
        const response = await axios.post<IUploadImageResponse>(
          "/api/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },

            // Track upload progress
            onUploadProgress(progressEvent) {
              const percentage = Math.round(
                (progressEvent.loaded / (progressEvent.total || 1)) * 100,
              );

              setProgress(percentage);
            },
          },
        );

        // Check if upload failed
        if (!response.data.status) {
          throw new Error(response.data.message);
        }

        return response.data;
      } catch (error) {
        setProgress(0);

        // Axios error
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Upload failed");
        }

        // Native error
        if (error instanceof Error) {
          throw error;
        }

        // Unknown error
        throw new Error("Something went wrong");
      }
    },

    // Reset progress after mutation
    onSettled() {
      setTimeout(() => {
        setProgress(0);
      }, 100);
    },
  });

  return {
    upload: mutation.mutateAsync,

    progress,

    ...mutation,
  };
}
