// export type settingsDashboard = Settings & { amount: number };

export interface ApiResponseAmountByState {
  status: string;
  code: number;
  data: AmountByStateData[];
}

export interface AmountByStateData {
  status: string;
  amount: number;
  styles: string;
}

export interface AmountByStateSuccessResponse {
  status: string;
  code: number;
  data: AmountByStateData[];
}

export interface AmountByStateErrorResponse {
  status: string;
  code: number;
  message: string;
  details: ApiErrorResponse;
}
