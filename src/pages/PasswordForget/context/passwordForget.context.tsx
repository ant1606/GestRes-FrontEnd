import { type ReactNode, createContext, useContext, useReducer, type Reducer } from 'react';

interface PasswordForgetProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean;
}

type typeValidationError = 'email';
interface InitialState {
  validationError: Record<typeValidationError, string | null | boolean>;
  resetUrlIsGenerated: boolean;
}

const ADD_VALIDATION_ERROR = 'add validation error';
const SET_RESET_LINK_WAS_GENERATED = 'set if reset link password was generated';

const initialState: InitialState = {
  validationError: {
    email: null
  },
  resetUrlIsGenerated: false
};

const passwordForgetReducer: Reducer<InitialState, ActionReducer> = (
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
    case SET_RESET_LINK_WAS_GENERATED: {
      payloadValue = action.payload;
      if (typeof payloadValue !== 'boolean') {
        throw new Error('El valor en SET_RESET_LINK_WAS_GENERATED a enviar debe ser boolean.');
      }
      return {
        ...state,
        resetUrlIsGenerated: payloadValue
      };
    }
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};

const PasswordForgetContext = createContext({});

export const PasswordForgetProvider = ({ children }: PasswordForgetProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(passwordForgetReducer, initialState);

  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const setIfResetLinkWasGenerated = (value: boolean): void => {
    dispatch({
      type: SET_RESET_LINK_WAS_GENERATED,
      payload: value
    });
  };

  const passwordForgetActions = {
    passwordForgetError: state.validationError,
    resetUrlIsGenerated: state.resetUrlIsGenerated,
    setIfResetLinkWasGenerated,
    addValidationError
  };

  return (
    <PasswordForgetContext.Provider value={passwordForgetActions}>
      {children}
    </PasswordForgetContext.Provider>
  );
};

export const usePasswordForget = (): Record<string, any> => {
  const context = useContext(PasswordForgetContext);
  if (context === undefined) {
    throw new Error('useSecurity debe usarse junto a Security Context');
  }
  return context;
};
