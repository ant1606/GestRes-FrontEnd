export interface PasswordForgetFormData {
  email: string;
}

export interface PasswordForgetSuccessResponse {
  data: {
    message: string;
  };
}

export interface PasswordForgetErrorDetailResponse extends ApiErrorResponse {
  email: string | null;
  [key: string]: string | null;
}

export interface PasswordForgetErrorResponse {
  error: {
    status: string;
    detail: PasswordForgetErrorDetailResponse;
  };
}
