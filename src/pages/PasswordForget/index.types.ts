export interface PasswordForgetFormData {
  email: string;
}

/** ADAPTERS**/
export interface PasswordForgetSuccessResponse {
  code: number;
  status: string;
  message: string;
}

export interface PasswordForgetErrorResponse {
  status: string;
  code: number;
  message: string;
  details: PasswordForgetErrorDetailResponse;
}

export interface PasswordForgetErrorDetailResponse {
  email: string | null;
  [key: string]: string | null;
}
