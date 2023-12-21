import { type Reducer } from 'react';
import { type ActionReducer, type InitialState } from '../index.types';
import { ADD_VALIDATION_ERROR } from './types';

export const loginReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case ADD_VALIDATION_ERROR:
      payloadKey = Object.getOwnPropertyNames(action.payload)[0];
      payloadValue = Object.values(action.payload)[0];
      return {
        ...state,
        validationError: {
          ...state.validationError,
          [payloadKey]: payloadValue as string | null
        }
      };
    default:
      return state;
  }
  // throw Error(`Action desconocida del tipo ${action.type}`);
};
