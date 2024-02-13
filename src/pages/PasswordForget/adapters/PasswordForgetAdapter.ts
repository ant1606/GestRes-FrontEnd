import {
  type PasswordForgetErrorResponse,
  type PasswordForgetSuccessResponse
} from '../index.types';

export const passwordForgetSuccessResponseAdapter = (
  response: any
): PasswordForgetSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    message: response.message
  };
};

export const passwordForgetErrorResponseAdapter = (error: any): PasswordForgetErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      email: error.details.email ?? null
    }
  };
};
