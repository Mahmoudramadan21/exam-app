export interface IAnswer {
  id: string;
  text: string;
  isCorrect?: boolean;
}

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
