import { IDocumentFields } from "@/shared/lib/types/api";

// Question Answer Type
export interface IAnswer {
  id: string;
  text: string;
  isCorrect?: boolean;
}

// Question Type
export interface IQuestion extends IDocumentFields {
  id: string;
  text: string;
  examId: string;
  immutable?: boolean;
  exam?: {
    id: string;
    title: string;
    description: string;
  };

  answers: IAnswer[];
}
