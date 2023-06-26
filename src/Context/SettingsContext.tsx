import {createContext, useContext, useReducer} from "react";
import settingsReducer, {initialState} from "../reducers/settingsReducer.js";
import types from "../types/types.js";

const SettingsContext = createContext(initialState);

export const SettingsProvider = ({children})=>{
    const [state, dispatch] = useReducer(settingsReducer, initialState);

    const loadSettings = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/settings`)
            .then(resp => resp.json())
            .then(data =>
                    dispatch({
                    type: types.settingsLoad,
                    payload: data.data
                    })
            );
    }

    const settingsActions = {
        settingsType: state.settingsType,
        settingsStatus: state.settingsStatus,
        loadSettings,
    }

    return (
        <SettingsContext.Provider value={settingsActions}>
            {children}
        </SettingsContext.Provider>
    )
}

const useSettings = () => {
    const context = useContext(SettingsContext);
    if(context === undefined){
        throw new Error("useSettings debe usarse junto a SettingsContext");
    }
    return context;
}

export default useSettings;