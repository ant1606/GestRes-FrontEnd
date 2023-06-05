import React, {createContext, useContext, useReducer} from 'react';
import securityReducer, {initialState} from "../reducers/securityReducer.js";
import types from '../types/types.js';
import {deleteCookie, setCookie} from "../helpers/manageCookies.js";

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
                localStorage.setItem('user',JSON.stringify(data.data.user) );
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



    const checkRememberToken = () => {
        let success = true;

        if( localStorage.getItem('rememberToken') === null || localStorage.getItem('rememberToken') === ""){
            return false;
        }

        fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/remember`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                "remember_me" : localStorage.getItem('rememberToken')
            })
        }).then( res => {
            if(!res.ok)
                return Promise.reject(res.json());
            return res.json()
        }).then(data =>{
            success = true;
            setCookie("bearerToken", data.data.bearer_token, data.data.bearer_expire);
            localStorage.setItem('rememberToken',data.data.user.remember_token );
            localStorage.setItem('user',JSON.stringify(data.data.user) );
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

    const logoutUser = () => {
        setUserIsLogout();
        localStorage.removeItem('rememberToken');
        localStorage.removeItem('user');
        deleteCookie("bearerToken");
    }

    const setUserIsLogout = () =>{
        dispatch({
            type: types.securityUserIsLogout
        })
    }

    const securityActions = {
        securityError: state.error,
        securityUserIsLogged: state.userLogged,
        securityIsLoading: state.isLoading,
        addNewError,
        setIsLoading,
        logginUser,
        setUserIsLogged,
        checkRememberToken,
        logoutUser,
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