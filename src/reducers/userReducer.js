import types from '../types/types.js'

export const initialState={
    error:[],
    isLoading: false
}

/**
 * error: Array<Object>, Recibe errores de validacion de formularios de registro y password
 */

const userReducer = (state = {}, action) => {
    switch (action.type){
        case types.userAddError:
            return {
                ...state,
                error: {...state.error, [Object.keys(action.payload)]: Object.values(action.payload)[0] },
            };
        default:
            return state;
    }
}

export default userReducer;