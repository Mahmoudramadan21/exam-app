// Core API response types for backend interactions
export interface IErrorResponse {
  status: false;
  code: number;
  message: string;
  errors?: Array<{ path: string; message: string }>;
}

// Successful API response with optional payload
export interface ISuccessResponse<T = unknown> {
  status: true;
  code: number;
  message?: string;
  payload?: T;
}

// Combined API response type (error or success)
export type IApiResponse<T = unknown> = IErrorResponse | ISuccessResponse<T>;

// Pagination metadata
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Common database document fields
export interface IDocumentFields {
  createdAt: string;
  updatedAt: string;
}

// Image upload response payload
export interface IUploadImagePayload {
  url: string;
}

// Image upload API response
export type IUploadImageResponse = ISuccessResponse<IUploadImagePayload>;
