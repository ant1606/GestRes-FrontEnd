import types from '../types/types';

export const initialState = {
  tags: [],
  tagActive: null,
  tagDelete: null,
  tagMeta: null,
  tagLinks: null,
};

/**
 * tags: Array, Conjunto de Tags
 * tagActive: Object, Tag a editar
 * tagDelete: Object, Tag a eliminar
 * tagMeta: Object, Contiene los datos de la respuesta de Tags en paginacion
 * tagLinks: Object, Contiene la informacion de los links para paginacion
 *  */

const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case types.tagLoaded:
      return {
        ...state,
        tags: [...action.payload.data],
        tagMeta: action.payload.meta,
        tagLinks: action.payload.links,
      };

    case types.tagSave:
      return {
        ...state,
        tags: [action.payload, ...state.tags],
      };

    case types.tagSelect:
      return {
        ...state,
        tagActive: action.payload,
      };

    case types.tagUpdate:
      return {
        ...state,
        tagActive: null,
        tagDelete: null,
        tags: state.tags.map((tag) =>
          tag.identificador === action.payload.identificador
            ? action.payload
            : tag
        ),
      };

    case types.tagDelete:
      return {
        ...state,
        tagDelete: action.payload,
      };

    case types.tagDestroy:
      return {
        ...state,
        tagActive: null,
        tagDelete: null,
        tags: state.tags.filter((tag) => tag.identificador !== action.payload),
      };

    default:
      return state;
  }
};

export default tagReducer;
