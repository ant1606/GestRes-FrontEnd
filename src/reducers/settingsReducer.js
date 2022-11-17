import types from "../types/types.js";

export const initialState = {
    [import.meta.env.VITE_SETTINGS_TYPE]: null,
    [import.meta.env.VITE_SETTINGS_STATUS]: null
};

const settingsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.settingsLoad:
            return {
                ...state,
                [import.meta.env.VITE_SETTINGS_TYPE] : action.payload.filter(val => val.type === import.meta.env.VITE_SETTINGS_TYPE),
                [import.meta.env.VITE_SETTINGS_STATUS] : action.payload.filter(val => val.type === import.meta.env.VITE_SETTINGS_STATUS),
            }
        default:
            return state;
    }
};

export default settingsReducer;