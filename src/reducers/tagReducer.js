import types from '../types/types';

export const initialState = {
  tags: [],
  tagActive: null,
};

/**
 * tags: Array, Conjunto de Tags
 * tagActive: Object, Tag a editar o eliminar
 */

const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case types.tagLoaded:
      return {
        ...state,
        tags: [...action.payload],
      };

    case types.tagSave:
      console.log('Guardando Tags');
      return {
        ...state,
        tags: [action.payload, ...state.tags],
      };

    case types.tagSelect:
      console.log('Seleccionando tag a actualizar/eliminar');
      return {
        ...state,
        tagActive: action.payload,
      };

    case types.tagUpdate:
      console.log('Actualizando tag');
      return {
        ...state,
        tagActive: null,
        tags: state.tags.map((tag) =>
          tag.identificado === action.payload.identificador
            ? action.payload
            : tag
        ),
      };

    case types.tagDelete:
      console.log('Eliminando Tag');
      return {
        ...state,
        tagActive: null,
        tags: state.tags.filter((tag) => tag.identificador !== action.payload),
      };

    default:
      return state;
  }
};

export default tagReducer;
