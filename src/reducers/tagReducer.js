import types from '../types/types';

export const initialState = {
  tags: [],
  tagActive: null,
  tagMeta: null,
  tagLinks: null,
  error: [],
  perPage: 0,
};

/**
 * tags: Array, Conjunto de Tags
 * tagActive: Object, Tag a editar
 * tagMeta: Object, Contiene los datos de la respuesta de Tags en paginacion
 * tagLinks: Object, Contiene la informacion de los links para paginacion
 * error: Array<Object>, Recibe los errores de validacion del formulario
 * perPage: Number, Recibe el valor de registros por paginas a mostrar
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

    case types.tagAddError:
      return {
        ...state,
        error: action.payload,
      };

    case types.tagSetPerPage:
      return {
        ...state,
        perPage: action.payload,
      }

    default:
      return state;
  }
};

export default tagReducer;
