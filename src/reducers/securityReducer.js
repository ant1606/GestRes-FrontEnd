import types from '../types/types.js';

export const initialState={
    userLogged: false,
    error: [],
    isLoading: false
};

/**
 * userLogged: Boolean, Flag indica si el usuario esta logeado o no
 * error: Array<Object>, Recibe errores de validacion de formulario (LoginForm, ResetPasswordForm)
 * isLoading: Boolean, valor que determina si se espera la respuesta del backend
 */

const securityReducer = (state = {}, action) => {
    switch (action.type){
        case types.securityAddError:
            return {
                ...state,
                error: {...state.error, [Object.keys(action.payload)]: Object.values(action.payload)[0] },
            };
            //TODO agregar caso cuando el usuario se logea
        default:
            return state;
    }
}

export default  securityReducer;