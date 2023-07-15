import { type PasswordResetErrorResponse, type PasswordResetSuccessResponse } from '../index.types';

export const passwordResetSuccessResponseAdapter = (
  response: any
): PasswordResetSuccessResponse => {
  return {
    data: {
      message: response.data.message
    }
  };
};

export const passwordResetErrorResponseAdapter = (error: any): PasswordResetErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        email: error.error.detail.email ?? null,
        password: error.error.detail.password ?? null,
        passwordConfirmation: error.error.detail.password_confirmation ?? null
      }
    }
  };
};
