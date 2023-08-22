import { type ReactNode, createContext, useContext, useReducer, type Reducer } from 'react';

interface RegisterProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean;
}

type typeValidationError = 'name' | 'email' | 'password' | 'passwordConfirmation';
interface InitialState {
  userWasRegistered: boolean;
  validationError: Record<typeValidationError, string | null | boolean>;
}

const ADD_VALIDATION_ERROR = 'add validation error';
const SET_USER_WAS_REGISTERED = 'set if user was registered';

const initialState: InitialState = {
  userWasRegistered: false,
  validationError: {
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null
  }
};

const registerReducer: Reducer<InitialState, ActionReducer> = (
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
    case SET_USER_WAS_REGISTERED:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'boolean') {
        throw new Error('El valor en SET_RESET_LINK_WAS_GENERATED a enviar debe ser boolean.');
      }
      return {
        ...state,
        userWasRegistered: payloadValue
      };
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};

const RegisterContext = createContext({});

export const RegisterProvider = ({ children }: RegisterProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const setUserWasRegistered = (value: boolean): void => {
    dispatch({
      type: SET_USER_WAS_REGISTERED,
      payload: value
    });
  };

  const registerActions = {
    registerError: state.validationError,
    userWasRegister: state.userWasRegistered,
    addValidationError,
    setUserWasRegistered
  };

  return <RegisterContext.Provider value={registerActions}>{children}</RegisterContext.Provider>;
};

export const useRegister = (): Record<string, any> => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error('useRegister debe usarse junto a RegisterContext');
  }
  return context;
};
