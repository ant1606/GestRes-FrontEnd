import { createContext, useContext, useReducer } from 'react';
import { type InitialState, type LoginProviderProps } from '../index.types';

import { ADD_VALIDATION_ERROR } from './types';
import { loginReducer } from './login.reducer';

const initialState: InitialState = {
  validationError: {
    email: null,
    password: null
  }
};

const LoginContext = createContext({});

export const LoginProvider = ({ children }: LoginProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const loginActions = {
    loginError: state.validationError,
    addValidationError
  };

  return <LoginContext.Provider value={loginActions}>{children}</LoginContext.Provider>;
};

export const useLogin = (): Record<string, any> => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useSecurity debe usarse junto a Security Context');
  }
  return context;
};
