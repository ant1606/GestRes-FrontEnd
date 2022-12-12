/**
 * recourses: Array, Conjunto de Recourses
 * recourseActive: Object, Recourse a editar
 * recourseDelete: Object, Recourse a eliminar
 * recourseMeta: Object, Contiene los datos de la respuesta de Tags en paginacion
 * recourseLinks: Object, Contiene la informacion de los links para paginacion
 * error: Array<Object>, Recibe los errores de validacion del formulario
 *  */
import types from "../types/types.js";

//TODO Validar que el objeto error funcione como Object o como Array
export const initialState = {
    recourses: [],
    recourseActive : null,
    recourseMeta: null,
    recourseLinks: null,
    error: {},
    perPage: 0,
    isLoading: false
};

const recourseReducer = (state = initialState, action ) => {
    const {type, payload} = action;

    switch (type) {
        case types.recourseLoaded:
            return {
                ...state,
                recourses: [...action.payload.data],
                recourseMeta: action.payload.meta,
                recourseLinks: action.payload.links,
            };
        case types.recourseAddError:
            return {
                ...state,
                error: {...state.error, [Object.keys(payload)]: Object.values(payload)[0] },
            };
        case types.recourseSetPerPage:
            return {
                ...state,
                perPage: action.payload,
            }
        case types.recourseIsLoading:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state;
    }
};

export default  recourseReducer;