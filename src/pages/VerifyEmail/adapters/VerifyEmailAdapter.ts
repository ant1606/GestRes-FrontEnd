import { type VerifyEmailErrorResponse, type VerifyEmailSuccessResponse } from '../index.types';

export const verifyEmailSuccessResponseAdapter = (response: any): VerifyEmailSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    data: {
      bearerToken: response.data.bearer_token,
      bearerExpire: response.data.bearer_expire,
      user: {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        isVerified: response.data.user.is_verified,
        rememberToken: response.data.user.remember_token
      }
    }
  };
};

export const verifyEmailErrorResponseAdapter = (error: any): VerifyEmailErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message
  };
};
