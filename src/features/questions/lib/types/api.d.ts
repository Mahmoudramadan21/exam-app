import { z } from "zod";
import { IQuestion } from "./question";
import { IApiResponse } from "@/shared/lib/types/api";
import {
  answerSchema,
  createBulkQuestionSchema,
  createQuestionSchema,
  questionSchema,
} from "@/features/questions/lib/schemas/create-question.schema";

// API Payload For get exam questions
export type IExamQuestionsPayload = {
  questions: IQuestion[];
};

// API Payload For get question
export type IQuestionPayload = {
  question: IQuestion;
};

// API Response For get exam questions
export type IExamQuestionsResponse = IApiResponse<IExamQuestionsPayload>;

// API Response For get question
export type IQuestionResponse = IApiResponse<IQuestionPayload>;

// Type for Create Question Schema
export type ICreateQuestionSchema = z.infer<typeof createQuestionSchema>;

// Type for Create Bulk Question Schema
export type ICreateBulkQuestionSchema = z.infer<
  typeof createBulkQuestionSchema
>;

// Type for Answer Schema
export type IAnswerSchema = z.infer<typeof answerSchema>;

export type IBulkQuestionSchema = z.infer<typeof questionSchema>;
