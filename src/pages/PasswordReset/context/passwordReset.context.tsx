import { type ReactNode, createContext, useContext, useReducer, type Reducer } from 'react';

interface PasswordResetProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean;
}

type typeValidationError = 'email' | 'password' | 'passwordConfirmation';
interface InitialState {
  validationError: Record<typeValidationError, string | null | boolean>;
}

const ADD_VALIDATION_ERROR = 'add validation error';

const initialState: InitialState = {
  validationError: {
    email: null,
    password: null,
    passwordConfirmation: null
  }
};

const passwordResetReducer: Reducer<InitialState, ActionReducer> = (
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
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};

const PasswordResetContext = createContext({});

export const PasswordResetProvider = ({ children }: PasswordResetProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(passwordResetReducer, initialState);

  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const passwordResetActions = {
    passwordResetError: state.validationError,
    addValidationError
  };

  return (
    <PasswordResetContext.Provider value={passwordResetActions}>
      {children}
    </PasswordResetContext.Provider>
  );
};

export const usePasswordReset = (): Record<string, any> => {
  const context = useContext(PasswordResetContext);
  if (context === undefined) {
    throw new Error('usePasswordReset debe usarse junto a PasswordReset Context');
  }
  return context;
};
