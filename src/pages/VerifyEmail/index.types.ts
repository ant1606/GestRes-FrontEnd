export interface VerifyEmailSuccessResponse {
  status: string;
  code: number;
  data: {
    bearerToken: string;
    bearerExpire: string;
    user: User;
  };
}

export interface VerifyEmailErrorResponse {
  status: string;
  code: number;
  message: string;
}
