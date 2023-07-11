import { type RegisterErrorResponse, type RegisterSuccessResponse } from '../index.types';

export const registerSuccessResponseAdapter = (response: any): RegisterSuccessResponse => {
  return {
    data: {
      message: response.data.message
    }
  };
};

export const registerErrorResponseAdapter = (error: any): RegisterErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        name: error.error.detail.name ?? null,
        email: error.error.detail.email ?? null,
        password: error.error.detail.password ?? null,
        passwordConfirmation: error.error.detail.password_confirmation ?? null
      }
    }
  };
};
