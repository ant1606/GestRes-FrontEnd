import {
  type ApiResponseAmountByState,
  type AmountByStateErrorResponse,
  type AmountByStateSuccessResponse,
  type AmountByStateData
} from '../index.type';

export const amountsByStateAdapter = (
  response: ApiResponseAmountByState
): AmountByStateSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    data: response.data.length === 0 ? [] : amountsData(response.data)
  };
};

const amountsData = (states: AmountByStateData[]): AmountByStateData[] => {
  return states.map((state: AmountByStateData) => ({
    status: state.status,
    amount: state.amount,
    styles: state.styles
  }));
};

export const amountByStateErrorResponseAdapter = (error: any): AmountByStateErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: error.details
  };
};
