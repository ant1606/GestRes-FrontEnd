import types from '../typing/types/types.js';

export const initialState = {
  userLogged: false,
  error: {},
  isLoading: false,
  user: {}
};

/**
 * userLogged: Boolean, Flag indica si el usuario esta logeado o no
 * error: Array<Object>, Recibe errores de validacion de formulario (LoginForm, ResetPasswordForm)
 * isLoading: Boolean, valor que determina si se espera la respuesta del backend
 */

const securityReducer = (state = {}, action) => {
  switch (action.type) {
    case types.securityAddError:
      return {
        ...state,
        error: { ...state.error, [Object.keys(action.payload)]: Object.values(action.payload)[0] }
      };
    case types.securityUserIsLogged:
      return {
        ...state,
        userLogged: true,
        user: action.payload
      };
    case types.securityUserIsLogout:
      return {
        ...state,
        userLogged: false,
        user: {}
      };
    default:
      return state;
  }
};

export default securityReducer;
