import { z } from "zod";

//  Validation schema for create exam form
export const createExamSchema = z.object({
  diplomaId: z.string().min(1, "Please select a diploma"),

  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  image: z.union([z.string().min(1, "Image is required"), z.instanceof(File)]),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration is required"),
});
