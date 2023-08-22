import { type ReactNode, createContext, useContext, type Reducer, useReducer } from 'react';
import { type ProgressesSuccessResponse, type ProgressSuccessResponse } from '../indext.types';

const ProgressContext = createContext({});

interface ProgressProviderProps {
  children: ReactNode;
}
type payloadReducerType =
  | Record<string, unknown>
  | boolean
  | number
  | Progress
  | Progress[]
  | ProgressSuccessResponse
  | ProgressesSuccessResponse;

interface ActionReducer {
  type: string;
  payload: payloadReducerType;
}

type typeValidationError = 'date' | 'done' | 'pending' | 'comment';

interface InitialState {
  progresses: Progress[];
  progressActive: Progress | null;
  progressMeta: PaginateResultMeta | null;
  progressLinks: PaginateResultLinks | null;
  progressPerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

const initialState: InitialState = {
  progresses: [],
  progressActive: null,
  progressMeta: null,
  progressLinks: null,
  progressPerPage: 0,
  validationError: {
    date: null,
    comment: null,
    done: null,
    pending: null
  }
};

const PROGRESS_LOADED = 'loaded Progresses from API';
const SET_PROGRESSES_PER_PAGE = 'set progresses per page';
const ADD_VALIDATION_ERROR = 'add validation error';
const RESET_VALIDATION_ERROR = 'reset validation error';
const SELECT_PROGRESS_ACTIVE = 'select progress active';
const CLEAN_SELECT_PROGRESS = 'clean select progress active';

const progressReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case PROGRESS_LOADED:
      payloadValue = action.payload as ProgressesSuccessResponse;
      return {
        ...state,
        progresses: [...payloadValue.data],
        progressMeta: payloadValue.meta,
        progressLinks: payloadValue.links
      };
    case SELECT_PROGRESS_ACTIVE:
      return {
        ...state,
        progressActive: action.payload as Progress
      };
    case SET_PROGRESSES_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_PROGRESSES_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        progressPerPage: payloadValue
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
          done: null,
          pending: null
        }
      };
    case CLEAN_SELECT_PROGRESS:
      return {
        ...state,
        progressActive: null
      };
  }

  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const ProgressProvider = ({ children }: ProgressProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  const setProgresses = (progresses: Progress[]): void => {
    dispatch({
      type: PROGRESS_LOADED,
      payload: progresses
    });
  };
  const setProgressPerPage = (perPage: number): void => {
    dispatch({
      type: SET_PROGRESSES_PER_PAGE,
      payload: perPage
    });
  };
  const selectedProgress = (progress: Progress): void => {
    dispatch({
      type: SELECT_PROGRESS_ACTIVE,
      payload: progress
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

  const cleanSelectedProgress = (): void => {
    dispatch({
      type: CLEAN_SELECT_PROGRESS,
      payload: true
    });
  };

  const progressActions = {
    progresses: state.progresses,
    progressPerPage: state.progressPerPage,
    progressMeta: state.progressMeta,
    progressError: state.validationError,
    progressActive: state.progressActive,
    setProgresses,
    setProgressPerPage,
    addValidationError,
    resetValidationError,
    selectedProgress,
    cleanSelectedProgress
  };
  return <ProgressContext.Provider value={progressActions}>{children}</ProgressContext.Provider>;
};

export const useProgress = (): Record<string, any> => {
  const context = useContext(ProgressContext);
  if (context === undefined) throw new Error('useProgress debe usar junto a ProgressContext');
  return context;
};
