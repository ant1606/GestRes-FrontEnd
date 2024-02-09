import { type ReactNode } from 'react';

export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginSuccessResponse {
  status: string;
  code: number;
  data: {
    bearerToken: string;
    bearerExpire: string;
    user: User;
  };
}
export interface LogoutSuccessResponse {
  status: string;
  code: number;
  message: string;
}
export interface LoginErrorDetailResponse {
  email: string | null;
  password: string | null;
  [key: string]: string | null; // Agrega esta firma de índice
}
export interface LoginErrorResponse {
  status: string;
  code: number;
  message: string;
  details: LoginErrorDetailResponse;
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
