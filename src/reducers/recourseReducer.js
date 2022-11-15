/**
 * recourses: Array, Conjunto de Recourses
 * recourseActive: Object, Recourse a editar
 * recourseDelete: Object, Recourse a eliminar
 * recourseMeta: Object, Contiene los datos de la respuesta de Tags en paginacion
 * recourseLinks: Object, Contiene la informacion de los links para paginacion
 * error: Array<Object>, Recibe los errores de validacion del formulario
 *  */

export const initialState = {
    recourses: [],
    recourseActive : null,
    recourseDelete : null,
    recourseMeta: null,
    recourseLinks: null,
    error: [],
};

const recourseReducer = (state = initialState, action ) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default  recourseReducer;