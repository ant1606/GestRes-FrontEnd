import { type ReactNode, createContext, useReducer, useContext, type Reducer } from 'react';
import { type TagsSuccessResponse } from '../index.types';

const TagContext = createContext({});

interface TagProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean | number | Tag | TagsSuccessResponse;
}

type typeValidationError = 'name';

interface InitialState {
  tags: Tag[];
  tagActive: Tag | null;
  tagMeta: PaginateResultMeta | null;
  tagLinks: PaginateResultLinks | null;
  tagPerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

const initialState: InitialState = {
  tags: [],
  tagActive: null,
  tagMeta: null,
  tagLinks: null,
  tagPerPage: 0,
  validationError: {
    name: null
  }
};

const ADD_VALIDATION_ERROR = 'add validation error';
const RESET_VALIDATION_ERROR = 'reset validation error';
const SET_TAGS_PER_PAGE = 'set tags per page';
const SELECT_TAG_ACTIVE = 'select tag active';
const CLEAN_SELECT_TAG = 'clean select tag active';
const TAG_LOADED = 'loaded Tags from API';

// TAG REDUCER
const tagReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case TAG_LOADED:
      payloadValue = action.payload as TagsSuccessResponse;
      return {
        ...state,
        tags: [...payloadValue.data],
        tagMeta: payloadValue.meta,
        tagLinks: payloadValue.links
      };
    case SET_TAGS_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_TAGS_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        tagPerPage: payloadValue
      };
    case SELECT_TAG_ACTIVE:
      return {
        ...state,
        tagActive: action.payload as Tag
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
          name: null
        }
      };
    case CLEAN_SELECT_TAG:
      return {
        ...state,
        tagActive: null
      };
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};

// TAG PROVIDER
export const TagProvider = ({ children }: TagProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(tagReducer, initialState);

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

  const setTagPerPage = (perPage: number): void => {
    dispatch({
      type: SET_TAGS_PER_PAGE,
      payload: perPage
    });
  };

  const setTags = (tags: TagsSuccessResponse): void => {
    dispatch({
      type: TAG_LOADED,
      payload: tags
    });
  };

  const selectedTag = (tag: Tag): void => {
    dispatch({
      type: SELECT_TAG_ACTIVE,
      payload: tag
    });
  };

  const cleanSelectedTag = (): void => {
    dispatch({
      type: CLEAN_SELECT_TAG,
      payload: true
    });
  };

  const tagActions = {
    tags: state.tags,
    tagMeta: state.tagMeta,
    tagError: state.validationError,
    tagPerPage: state.tagPerPage,
    tagActive: state.tagActive,
    setTagPerPage,
    selectedTag,
    addValidationError,
    setTags,
    resetValidationError,
    cleanSelectedTag
  };

  return <TagContext.Provider value={tagActions}>{children}</TagContext.Provider>;
};

export const useTag = (): Record<string, any> => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTag debe usarse junto a TagContext');
  }
  return context;
};
