import { type ReactNode, createContext, useContext, useReducer, type Reducer } from 'react';

const ADD_VALIDATION_ERROR = 'add validation error';
const LoginContext = createContext({});

interface LoginProviderProps {
  children: ReactNode;
}

interface ActionReducer {
  type: string;
  payload: Record<string, unknown>;
}

interface InitialState {
  validationError: Record<string, string | null>;
}

const initialState: InitialState = {
  validationError: {}
};

const loginReducer: Reducer<InitialState, ActionReducer> = (
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
          // [Object.getOwnPropertyNames(action.payload)[0]]: Object.values(action.payload)[0]
        }
      };
  }
  throw Error(`Action desconocida del tipo ${action.type}`);
};

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
