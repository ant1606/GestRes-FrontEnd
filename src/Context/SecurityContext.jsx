import React, {createContext, useContext, useReducer} from 'react';
import securityReducer, {initialState} from "../reducers/securityReducer.js";
import types from '../types/types.js';
import {setCookie} from "../helpers/manageCookies.js";

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

    const logginUser = async (credentials) => {
        let success = true;

        await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then( res => {
            if(!res.ok)
                return Promise.reject(res.json());
            return res.json()
        }).then(data =>{
                success = true;
                setCookie("bearerToken", data.data.bearer_token, data.data.bearer_expire);
                localStorage.setItem('rememberToken',data.data.user.remember_token );
                setUserIsLogged(data.data.user);
        }).catch(async error => {
            const err = await error;
            const processError = err.error.reduce(
                (previous, currrent) => ({
                    ...previous,
                    [currrent.inputName]: currrent.detail
                }),
                {}
            );
            addNewError(processError);
            success = false;
        });

        return success;
    }

    const setUserIsLogged = (user) =>{
        dispatch({
            type: types.securityUserIsLogged,
            payload: user
        });
    };

    const securityActions = {
        securityError: state.error,
        securityUserIsLogged: state.userLogged,
        securityIsLoading: state.isLoading,
        addNewError,
        setIsLoading,
        logginUser,
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