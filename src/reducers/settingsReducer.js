import types from "../types/types.js";

export const initialState = {
    settingsType: null,
    settingsStatus: null
};

const settingsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.settingsLoad:
            return {
                ...state,
                settingsType : action.payload.filter(val => val.type === import.meta.env.VITE_SETTINGS_TYPE),
                settingsStatus : action.payload.filter(val => val.type === import.meta.env.VITE_SETTINGS_STATUS),
            }
        default:
            return state;
    }
};

export default settingsReducer;