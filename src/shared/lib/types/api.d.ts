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
