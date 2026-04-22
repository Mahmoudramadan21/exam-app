import { IDocumentFields } from "@/shared/lib/types/api";

export interface IExam extends IDocumentFields {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  duration: number;
  createdAt: Date;
  questionsCount: number;
  diploma: {
    id: string;
    title: string;
    description: string;
  };
  immutable: boolean | null;
}

export interface IExamSubmission extends IDocumentFields {
  id: string;
  userId: string;
  examId: string;
  examTitle: string | null;
  exam: {
    id: string;
    title: string;
    description: string;
    duration: number;
  };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: Date;
  submittedAt: Date;
}

export interface IExamAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: {
    id: string;
    text: string;
  };
  correctAnswer: {
    id: string;
    text: string;
  };
  isCorrect: boolean;
}

export interface IExamAnswer {
  questionId: string;
  answerId: string;
}
