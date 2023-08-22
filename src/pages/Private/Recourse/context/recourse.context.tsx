import { type ReactNode, createContext, useContext, type Reducer, useReducer } from 'react';
import { type RecoursesSuccessResponse } from '../index.types';

const RecourseContext = createContext({});

interface RecourseProviderProps {
  children: ReactNode;
}
type payloadReducerType =
  | Record<string, unknown>
  | boolean
  | number
  | Recourse
  | Recourse[]
  | RecoursesSuccessResponse
  | Status[]
  | Progress[];

interface ActionReducer {
  type: string;
  payload: payloadReducerType;
}

type typeValidationError =
  | 'name'
  | 'source'
  | 'author'
  | 'editorial'
  | 'typeId'
  | 'totalPages'
  | 'totalChapters'
  | 'totalVideos'
  | 'totalHours';

interface InitialState {
  recourses: Recourse[];
  recourseActive: Recourse | null;
  recourseMeta: PaginateResultMeta | null;
  recourseLinks: PaginateResultLinks | null;
  recoursePerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

const initialState: InitialState = {
  recourses: [],
  recourseActive: null,
  recourseMeta: null,
  recourseLinks: null,
  recoursePerPage: 0,
  validationError: {
    name: null,
    source: null,
    author: null,
    editorial: null,
    typeId: null,
    totalPages: null,
    totalChapters: null,
    totalVideos: null,
    totalHours: null
  }
};

const RECOURSE_LOADED = 'loaded Recourses from API';
const SET_RECOURSES_PER_PAGE = 'set recourses per page';
const ADD_VALIDATION_ERROR = 'add validation error';
const RESET_VALIDATION_ERROR = 'reset validation error';
const SELECT_RECOURSE_ACTIVE = 'select recourse active';
const CLEAN_SELECT_RECOURSE = 'clean select recourse active';
const GET_STATUS_PER_RECOURSE = 'get statuses from api per recourse active';
const GET_PROGRESS_PER_RECOURSE = 'get progresses from api per recourse active';

const recourseReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case RECOURSE_LOADED:
      payloadValue = action.payload as RecoursesSuccessResponse;
      return {
        ...state,
        recourses: [...payloadValue.data],
        recourseMeta: payloadValue.meta,
        recourseLinks: payloadValue.links
      };
    case SELECT_RECOURSE_ACTIVE:
      return {
        ...state,
        recourseActive: action.payload as Recourse
      };
    case SET_RECOURSES_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_RECOURSES_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        recoursePerPage: payloadValue
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
          name: null,
          source: null,
          author: null,
          editorial: null,
          typeId: null,
          totalPages: null,
          totalChapters: null,
          totalVideos: null,
          totalHours: null
        }
      };
    case CLEAN_SELECT_RECOURSE:
      return {
        ...state,
        recourseActive: null
      };
    case GET_STATUS_PER_RECOURSE:
      payloadValue = action.payload;
      if (payloadValue === null) {
        throw new Error('El valor a enviar en GET_STATUS_PER_RECOURSE no debe ser null');
      }
      return {
        ...state,
        recourseActive: {
          ...(state.recourseActive as Recourse),
          status: [...payloadValue.data] as Status[]
        }
      };
    case GET_PROGRESS_PER_RECOURSE:
      payloadValue = action.payload;
      if (payloadValue === null) {
        throw new Error('El valor a enviar en GET_PROGRESS_PER_RECOURSE no debe ser null');
      }
      return {
        ...state,
        recourseActive: {
          ...(state.recourseActive as Recourse),
          progress: [...payloadValue.data] as Progress[]
        }
      };
  }

  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const RecourseProvider = ({ children }: RecourseProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(recourseReducer, initialState);

  const setRecourses = (recourses: Recourse[]): void => {
    dispatch({
      type: RECOURSE_LOADED,
      payload: recourses
    });
  };
  const setRecoursePerPage = (perPage: number): void => {
    dispatch({
      type: SET_RECOURSES_PER_PAGE,
      payload: perPage
    });
  };
  const selectedRecourse = (recourse: Recourse): void => {
    dispatch({
      type: SELECT_RECOURSE_ACTIVE,
      payload: recourse
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

  const cleanSelectedRecourse = (): void => {
    dispatch({
      type: CLEAN_SELECT_RECOURSE,
      payload: true
    });
  };

  const setStatusesPerRecourse = (statuses: Status[]): void => {
    dispatch({
      type: GET_STATUS_PER_RECOURSE,
      payload: statuses
    });
  };

  const setProgressesPerRecourse = (progresses: Progress[]): void => {
    dispatch({
      type: GET_PROGRESS_PER_RECOURSE,
      payload: progresses
    });
  };

  const recourseActions = {
    recourses: state.recourses,
    recoursePerPage: state.recoursePerPage,
    recourseMeta: state.recourseMeta,
    recourseError: state.validationError,
    recourseActive: state.recourseActive,
    setRecourses,
    setRecoursePerPage,
    addValidationError,
    resetValidationError,
    selectedRecourse,
    cleanSelectedRecourse,
    setStatusesPerRecourse,
    setProgressesPerRecourse
  };
  return <RecourseContext.Provider value={recourseActions}>{children}</RecourseContext.Provider>;
};

export const useRecourse = (): Record<string, any> => {
  const context = useContext(RecourseContext);
  if (context === undefined) throw new Error('useRecourse debe usar junto a RecourseContext');
  return context;
};
