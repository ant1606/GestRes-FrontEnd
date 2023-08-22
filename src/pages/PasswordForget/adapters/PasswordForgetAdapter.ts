import {
  type PasswordForgetErrorResponse,
  type PasswordForgetSuccessResponse
} from '../index.types';

export const passwordForgetSuccessResponseAdapter = (
  response: any
): PasswordForgetSuccessResponse => {
  return {
    data: {
      message: response.data.message
    }
  };
};

export const passwordForgetErrorResponseAdapter = (error: any): PasswordForgetErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        email: error.error.detail.email ?? null
      }
    }
  };
};
