import { type ReactNode } from 'react';

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

export interface LoginProviderProps {
  children: ReactNode;
}
export interface ActionReducer {
  type: string;
  payload: Record<string, unknown>;
}

export type typeValidationError = 'email' | 'password';
export type loginValidationError = Record<typeValidationError, string | null>;
export interface InitialState {
  validationError: loginValidationError;
}
