import { z } from "zod";
import { IApiResponse, IPagination } from "@/shared/lib/types/api";
import {
  IExam,
  IExamSubmission,
  IExamAnalytics,
} from "@/features/exams/lib/types/exam";
import { createExamSchema } from "@/features/exams/lib/schemas/create-exam.schema";

// =====================
// Get Exam
// =====================

export interface IExamPayload {
  exam: IExam;
}

export type IExamResponse = IApiResponse<IExamPayload>;

// =====================
// Submit Exam
// =====================

export interface IExamSubmissionRequest {
  examId: string;
  answers: IExamAnswer[];
  startedAt?: Date;
}

export interface IExamSubmissionPayload {
  submission: IExamSubmission;
  analytics: IExamAnalytics[];
}

export type IExamSubmissionResponse = IApiResponse<IExamSubmissionPayload>;

// =====================
// Exams
// =====================

// Exams Payload
export interface IExamsPayload {
  data: IExam[];
  metadata: IPagination;
}

// Exams API Response
export type IExamsResponse = IApiResponse<IExamsPayload>;

// =====================
// Create Exam
// =====================

export type IExamCreateSchema = z.infer<typeof createExamSchema>;
