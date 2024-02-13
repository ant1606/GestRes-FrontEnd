export interface ResetPasswordFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

/** ADAPTERS **/
export interface PasswordResetSuccessResponse {
  code: number;
  status: string;
  message: string;
}
export interface PasswordResetErrorResponse {
  code: number;
  status: string;
  message: string;
  details: PasswordResetErrorDetailResponse;
}
export interface PasswordResetErrorDetailResponse {
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  [key: string]: string | null;
}
