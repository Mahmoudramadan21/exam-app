import { z } from "zod";
import { IExam } from "@/features/exams/lib/types/exam";
import { IDiploma } from "@/features/diplomas/lib/types/diploma";
import { IApiResponse, IPagination } from "@/shared/lib/types/api";
import { createDiplomaSchema } from "@/features/diplomas/lib/schemes/create-diploma.schema";

// Diplomas Payload
export interface IDiplomasPayload {
  data: IDiploma[];
  metadata: IPagination;
}

// Diplomas API Response
export type IDiplomasResponse = IApiResponse<IDiplomasPayload>;

export interface IDiplomaPayload {
  diploma: IDiploma & { exams: IExam[] };
}

export type IDiplomaResponse = IApiResponse<IDiplomaPayload>;

export type IDiplomaCreateSchema = z.infer<typeof createDiplomaSchema>;
