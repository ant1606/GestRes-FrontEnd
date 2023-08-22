import { type LoginSuccessResponse, type LoginErrorResponse } from '../index.types';

export const loginSuccessResponseAdapter = (user: any): LoginSuccessResponse => {
  return {
    data: {
      bearerToken: user.data.bearer_token,
      bearerExpire: user.data.bearer_expire,
      user: {
        id: user.data.user.id,
        name: user.data.user.name,
        email: user.data.user.email,
        isVerified: user.data.user.is_verified,
        rememberToken: user.data.user.remember_token
      }
    }
  };
};

export const loginErrorResponseAdapter = (error: any): LoginErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        email: error.error.detail.email ?? null,
        password: error.error.detail.password ?? null
      }
    }
  };
};
