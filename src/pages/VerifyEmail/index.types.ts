export interface VerifyEmailSuccessResponse {
  data: {
    bearerToken: string;
    bearerExpire: string;
    user: {
      id: string;
      name: string;
      email: string;
      isVerified: boolean;
      rememberToken: string;
    };
  };
}

export interface VerifyEmailErrorResponse {
  error: {
    status: string;
    detail: ApiErrorResponse;
  };
}
