export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type ValidationMessage = string | null;

/** ADAPTERS **/
export interface RegisterSuccessResponse {
  code: number;
  status: string;
  message: string;
}
export interface RegisterErrorResponse {
  code: number;
  message: string;
  status: string;
  details: RegisterErrorDetailResponse;
}
export interface RegisterErrorDetailResponse {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  [key: string]: string | null;
}
