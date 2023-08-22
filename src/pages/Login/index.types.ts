export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginSuccessResponse {
  data: {
    bearerToken: string;
    bearerExpire: string;
    user: User;
  };
}
export interface LoginErrorDetailResponse extends ApiErrorResponse {
  email: string | null;
  password: string | null;
  [key: string]: string | null; // Agrega esta firma de índice
}
export interface LoginErrorResponse {
  error: {
    status: string;
    detail: LoginErrorDetailResponse;
  };
}
