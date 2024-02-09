import {
  type LoginSuccessResponse,
  type LoginErrorResponse,
  type LogoutSuccessResponse
} from '../index.types';

export const loginSuccessResponseAdapter = (user: any): LoginSuccessResponse => {
  return {
    status: user.status,
    code: user.code,
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

export const logoutSuccessResponseAdapter = (response: any): LogoutSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    message: response.message
  };
};

export const loginErrorResponseAdapter = (error: any): LoginErrorResponse => {
  // Detail contiene errores de validación de campos por parte del servidor
  return {
    status: error.status,
    message: error.message,
    code: error.code,
    details: {
      email: error.details.email ?? null,
      password: error.details.password ?? null
    }
  };
};
