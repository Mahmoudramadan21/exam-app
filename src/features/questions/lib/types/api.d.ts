export type IExamQuestionsPayload = {
  questions: IQuestion[];
};

// API Response For get exam questions
export type IExamQuestionsResponse = IApiResponse<IExamQuestionsPayload>;
