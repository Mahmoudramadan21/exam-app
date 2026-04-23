export type IApiResponse<T = unknown> = IErrorResponse | ISuccessResponse<T>;

export interface IErrorResponse {
  status: false;
  code: number;
  message: string;
  errors?: Array<{ path: string; message: string }>;
}

export interface ISuccessResponse<T = unknown> {
  status: true;
  code: number;
  message?: string;
  payload?: T;
}

export interface IPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface IDocumentFields {
  createAt: string;
  updatedAt: string;
}
