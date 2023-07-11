export interface RegisterSuccessResponse {
  data: {
    message: string;
  };
}

export interface RegisterErrorDetailResponse extends ApiErrorResponse {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  [key: string]: string | null;
}
export interface RegisterErrorResponse {
  error: {
    status: string;
    detail: RegisterErrorDetailResponse;
  };
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type ValidationMessage = string | null;
