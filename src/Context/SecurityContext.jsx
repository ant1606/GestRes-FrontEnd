import React, {createContext, useContext, useReducer} from 'react';
import securityReducer, {initialState} from "../reducers/securityReducer.js";
import types from '../types/types.js';

const SecurityContext = createContext(initialState);

export const SecurityProvider = ({children}) => {
    const [state, dispatch] = useReducer(securityReducer, initialState);

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
        securityError: state.error,
        securityUserIsLogged: state.userLogged,
        securityIsLoading: state.isLoading,
        addNewError,
        setIsLoading
    };
    return (
        <SecurityContext.Provider value={securityActions}>
            {children}
        </SecurityContext.Provider>
    )
}

const useSecurity = () => {
    const context = useContext(SecurityContext);
    if(context === undefined){
        throw new Error("useSecurity debe usarse junto a Security Context");
    }
    return context;
}

export default useSecurity