import { type ReactNode, createContext, useReducer, useContext, type Reducer } from 'react';

const TagContext = createContext({});

interface TagProviderProps {
  children: ReactNode;
}
interface ActionReducer {
  type: string;
  payload: Record<string, unknown> | boolean | number;
}

type typeValidationError = 'name';

interface InitialState {
  tags: Tag[];
  tagActive: Tag | null;
  tagMeta: PaginateResultMeta | null;
  tagLinks: Record<string, string | null> | null;
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

const SET_TAGS_PER_PAGE = 'set tags per page';

const tagReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  // const payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case SET_TAGS_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_TAGS_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        tagPerPage: action.payload as number
      };
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};

export const TagProvider = ({ children }: TagProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(tagReducer, initialState);

  const setTagPerPage = (perPage: number): void => {
    dispatch({
      type: SET_TAGS_PER_PAGE,
      payload: perPage
    });
  };

  const tagActions = {
    tagPerPage: state.tagPerPage,
    setTagPerPage
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
