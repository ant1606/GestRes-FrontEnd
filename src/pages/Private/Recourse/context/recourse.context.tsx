import { type ReactNode, createContext, useContext, type Reducer, useReducer } from 'react';

const RecourseContext = createContext({});

interface RecourseProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean | number;
}

type typeValidationError = 'name';

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
    name: null
  }
};

const RECOURSE_LOADED = 'loaded Recourses from API';
const SET_RECOURSES_PER_PAGE = 'set recourses per page';

const recourseReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  const payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case RECOURSE_LOADED:
      payloadValue = action.payload;
      return {
        ...state,
        recourses: [...payloadValue.data],
        recourseMeta: payloadValue.meta,
        recourseLinks: payloadValue.links
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
  }

  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const RecourseProvider = ({ children }: RecourseProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(recourseReducer, initialState);

  const setRecourses = (recourses): void => {
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

  const recourseActions = {
    recourses: state.recourses,
    recoursePerPage: state.recoursePerPage,
    recourseMeta: state.recourseMeta,
    setRecourses,
    setRecoursePerPage
  };
  return <RecourseContext.Provider value={recourseActions}>{children}</RecourseContext.Provider>;
};

export const useRecourse = (): Record<string, any> => {
  const context = useContext(RecourseContext);
  if (context === undefined) throw new Error('useRecourse debe usar junto a RecourseContext');
  return context;
};
