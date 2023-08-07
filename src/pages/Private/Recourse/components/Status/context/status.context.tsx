import { type ReactNode, createContext, useContext, type Reducer, useReducer } from 'react';
import { type StatusSuccessResponse } from '../index.types';

const StatusContext = createContext({});

interface StatusProviderProps {
  children: ReactNode;
}
type payloadReducerType =
  | Record<string, unknown>
  | boolean
  | number
  | Status
  | Status[]
  | StatusSuccessResponse;

interface ActionReducer {
  type: string;
  payload: payloadReducerType;
}

type typeValidationError = 'date' | 'statusId' | 'comment';

interface InitialState {
  statuses: Status[];
  statusActive: Status | null;
  statusMeta: PaginateResultMeta | null;
  statusLinks: PaginateResultLinks | null;
  statusPerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

const initialState: InitialState = {
  statuses: [],
  statusActive: null,
  statusMeta: null,
  statusLinks: null,
  statusPerPage: 0,
  validationError: {
    date: null,
    comment: null,
    statusId: null
  }
};

const STATUS_LOADED = 'loaded Statuses from API';
const SET_STATUSES_PER_PAGE = 'set statuses per page';
const ADD_VALIDATION_ERROR = 'add validation error';
const RESET_VALIDATION_ERROR = 'reset validation error';
const SELECT_STATUS_ACTIVE = 'select status active';
const CLEAN_SELECT_STATUS = 'clean select status active';

const statusReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case STATUS_LOADED:
      payloadValue = action.payload as StatusSuccessResponse;
      return {
        ...state,
        statuses: [...payloadValue.data],
        statusMeta: payloadValue.meta,
        statusLinks: payloadValue.links
      };
    case SELECT_STATUS_ACTIVE:
      return {
        ...state,
        statusActive: action.payload as Status
      };
    case SET_STATUSES_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_STATUSES_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        statusPerPage: payloadValue
      };
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
    case RESET_VALIDATION_ERROR:
      return {
        ...state,
        validationError: {
          comment: null,
          date: null,
          statusId: null
        }
      };
    case CLEAN_SELECT_STATUS:
      return {
        ...state,
        statusActive: null
      };
  }

  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const StatusProvider = ({ children }: StatusProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(statusReducer, initialState);

  const setStatuses = (statuses: Status[]): void => {
    dispatch({
      type: STATUS_LOADED,
      payload: statuses
    });
  };
  const setStatusPerPage = (perPage: number): void => {
    dispatch({
      type: SET_STATUSES_PER_PAGE,
      payload: perPage
    });
  };
  const selectedStatus = (status: Status): void => {
    dispatch({
      type: SELECT_STATUS_ACTIVE,
      payload: status
    });
  };
  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const resetValidationError = (): void => {
    dispatch({
      type: RESET_VALIDATION_ERROR,
      payload: true
    });
  };

  const cleanSelectedStatus = (): void => {
    dispatch({
      type: CLEAN_SELECT_STATUS,
      payload: true
    });
  };

  const statusActions = {
    statuses: state.statuses,
    statusPerPage: state.statusPerPage,
    statusMeta: state.statusMeta,
    statusError: state.validationError,
    statusActive: state.statusActive,
    setStatuses,
    setStatusPerPage,
    addValidationError,
    resetValidationError,
    selectedStatus,
    cleanSelectedStatus
  };
  return <StatusContext.Provider value={statusActions}>{children}</StatusContext.Provider>;
};

export const useStatus = (): Record<string, any> => {
  const context = useContext(StatusContext);
  if (context === undefined) throw new Error('useStatus debe usar junto a StatusContext');
  return context;
};
