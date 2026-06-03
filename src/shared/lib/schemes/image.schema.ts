import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/shared/lib/constants/image.constant";

export const imageSchema = z.object({
  file: z
    .custom<File>((file) => file instanceof File, {
      message: "Image is required",
    })

    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: `File size should be less than ${MAX_IMAGE_SIZE /
        1024 /
        1024}MB`,
    })

    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "File must be JPEG, PNG or WEBP",
    }),
});

export type IImageSchema = z.infer<typeof imageSchema>;
