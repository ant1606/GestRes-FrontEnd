import { type RegisterErrorResponse, type RegisterSuccessResponse } from '../index.types';

export const registerSuccessResponseAdapter = (response: any): RegisterSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    message: response.message
  };
};

export const registerErrorResponseAdapter = (error: any): RegisterErrorResponse => {
  return {
    code: error.code,
    message: error.message,
    status: error.status,
    details: {
      name: error.details.name ?? null,
      email: error.details.email ?? null,
      password: error.details.password ?? null,
      passwordConfirmation: error.details.password_confirmation ?? null
    }
  };
};
