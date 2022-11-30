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
    recourseDelete : null,
    recourseMeta: null,
    recourseLinks: null,
    error: {},
};

const recourseReducer = (state = initialState, action ) => {
    const {type, payload} = action;

    switch (type) {
        case types.recourseAddError:
            return {
                ...state,
                error: {...state.error, [Object.keys(payload)]: Object.values(payload)[0] },
            };
        default:
            return state;
    }
};

export default  recourseReducer;