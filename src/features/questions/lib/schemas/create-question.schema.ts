import { z } from "zod";

// ==================
//  Answer Schema
// ==================
export const answerSchema = z.object({
  id: z.string(),

  text: z.string().min(1, "Answer is required"),

  isCorrect: z.boolean(),
});

// ==================
//  Create Question
// ==================
export const createQuestionSchema = z
  .object({
    examId: z.string().min(1, "Please select an exam"),

    text: z.string().min(5, "Question must be at least 5 chars"),

    answers: z
      .array(answerSchema)
      .length(4, "Each question must have 4 answers"),
  })
  .refine((data) => data.answers.filter((a) => a.isCorrect).length === 1, {
    path: ["answers"],
    message: "Select exactly one correct answer",
  });

// ==================
//  Question Schema
// ==================
export const questionSchema = z
  .object({
    id: z.string(),

    text: z.string().min(5, "Question must be at least 5 characters"),

    answers: z
      .array(answerSchema)
      .length(4, "Each question must have 4 answers"),
  })
  .refine(
    (question) => question.answers.filter((a) => a.isCorrect).length === 1,
    {
      path: ["answers"],
      message: "Exactly one correct answer is required",
    },
  );

// ==================
//  Create Bulk Question
// ==================
export const createBulkQuestionSchema = z.object({
  examId: z.string().min(1, "Please select an exam"),

  questions: z.array(questionSchema).min(1, "Add at least one question"),
});
