import { type PasswordResetErrorResponse, type PasswordResetSuccessResponse } from '../index.types';

export const passwordResetSuccessResponseAdapter = (
  response: any
): PasswordResetSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    message: response.message
  };
};

export const passwordResetErrorResponseAdapter = (error: any): PasswordResetErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      email: error.details.email ?? null,
      password: error.details.password ?? null,
      passwordConfirmation: error.details.password_confirmation ?? null
    }
  };
};
