import { IExam } from "@/features/exams/lib/types/exam";
import { IDiploma } from "./diploma";

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
