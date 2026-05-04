import { IApiResponse } from "@/shared/lib/types/api";
import { IExam, IExamSubmission, IExamAnalytics } from "./exam";

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
