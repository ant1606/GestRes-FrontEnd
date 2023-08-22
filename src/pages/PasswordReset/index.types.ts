export interface PasswordResetSuccessResponse {
  data: {
    message: string;
  };
}

export interface PasswordResetErrorDetailResponse extends ApiErrorResponse {
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  [key: string]: string | null;
}
export interface PasswordResetErrorResponse {
  error: {
    status: string;
    detail: PasswordResetErrorDetailResponse;
  };
}

export interface ResetPasswordFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}
