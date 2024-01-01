import { createContext, useContext, type Reducer, useReducer } from 'react';
import {
  type WebPagesSuccessResponse,
  type ActionReducer,
  type InitialState,
  type WebPageProviderProps
} from '../index.types';

const WebPageContext = createContext({});

const initialState: InitialState = {
  webPages: [],
  webPageActive: null,
  webPageMeta: null,
  webPageLinks: null,
  webPagePerPage: 0,
  validationError: {
    url: null,
    name: null,
    description: null
  }
};

const WEB_PAGE_LOADED = 'loaded WebPages from API';
const SET_WEB_PAGES_PER_PAGE = 'set webPages per page';
const ADD_VALIDATION_ERROR = 'add validation error';
const RESET_VALIDATION_ERROR = 'reset validation error';
const SELECT_WEB_PAGE_ACTIVE = 'select webPage active';
const CLEAN_SELECT_WEB_PAGE = 'clean select webPage active';

const webPageReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case WEB_PAGE_LOADED:
      payloadValue = action.payload as WebPagesSuccessResponse;
      return {
        ...state,
        webPages: [...payloadValue.data],
        webPageMeta: payloadValue.meta,
        webPageLinks: payloadValue.links
      };
    case SELECT_WEB_PAGE_ACTIVE:
      return {
        ...state,
        webPageActive: action.payload as WebPage
      };
    case SET_WEB_PAGES_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_WEB_PAGES_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        webPagePerPage: payloadValue
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
          url: null,
          name: null,
          description: null
        }
      };
    case CLEAN_SELECT_WEB_PAGE:
      return {
        ...state,
        webPageActive: null
      };
  }

  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const WebPageProvider = ({ children }: WebPageProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(webPageReducer, initialState);

  const setWebPages = (webPagees: WebPage[]): void => {
    dispatch({
      type: WEB_PAGE_LOADED,
      payload: webPagees
    });
  };
  const setWebPagePerPage = (perPage: number): void => {
    dispatch({
      type: SET_WEB_PAGES_PER_PAGE,
      payload: perPage
    });
  };
  const selectedWebPage = (webPage: WebPage): void => {
    dispatch({
      type: SELECT_WEB_PAGE_ACTIVE,
      payload: webPage
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

  const cleanSelectedWebPage = (): void => {
    dispatch({
      type: CLEAN_SELECT_WEB_PAGE,
      payload: true
    });
  };

  const webPageActions = {
    webPages: state.webPages,
    webPagePerPage: state.webPagePerPage,
    webPageMeta: state.webPageMeta,
    webPageError: state.validationError,
    webPageActive: state.webPageActive,
    setWebPages,
    setWebPagePerPage,
    addValidationError,
    resetValidationError,
    selectedWebPage,
    cleanSelectedWebPage
  };
  return <WebPageContext.Provider value={webPageActions}>{children}</WebPageContext.Provider>;
};

export const useWebPage = (): Record<string, any> => {
  const context = useContext(WebPageContext);
  if (context === undefined) throw new Error('useWebPage debe usar junto a WebPageContext');
  return context;
};
