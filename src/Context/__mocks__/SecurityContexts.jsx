import React, {createContext, useContext, useReducer} from 'react';
import types from "../../types/types.js";
import securityReducer, {initialState} from "../../reducers/securityReducer.js";

export const MockSecurityContext = createContext(initialState);

export const MockSecurityProvider = ({children}) => {
    const [state, dispatch] = useReducer(securityReducer, initialState);
    const logginUser = (credentials) => {
        return true;
    }
    const addNewError = (error) => {
        dispatch({
            type: types.securityAddError,
            payload: error,
        })
    }
    const setIsLoading = (isLoad) => {
        dispatch({
            type: types.securityIsLoading,
            payload: isLoad
        });
    };

    const securityActions = {
        setIsLoading,
        securityError: state.error,
        logginUser,
        addNewError,
    };

    return (
        <MockSecurityContext.Provider value={securityActions}>
            {children}
        </MockSecurityContext.Provider>
    )
}

export const MockuseSecurity = () => {
    const context = useContext(MockSecurityContext);
    if(context === undefined){
        throw new Error("useSecurity debe usarse junto a Security Context");
    }
    return context;

}