import { z } from "zod";

//  Validation schema for create diploma form
export const createDiplomaSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z.string().optional(),
  image: z.union([z.string().min(1, "Image is required"), z.instanceof(File)]),
});
