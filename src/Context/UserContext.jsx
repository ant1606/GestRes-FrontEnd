import React, {createContext, useContext, useReducer} from 'react';
import types from '../types/types.js';
import userReducer, {initialState} from "../reducers/userReducer.js";
import {setCookie} from "../helpers/manageCookies.js";

const UserContext = createContext(initialState);

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const addNewError = (error) => {
        dispatch({
            type: types.userAddError,
            payload: error,
        })
    }

    const savingUser = async(user) =>{
        let success = true;
        await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/register`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(user)
        }).then( res => {
            if(!res.ok)
                return Promise.reject(res.json());
            return res.json()
        }).then(data =>{
            success = true;
        }).catch(async error => {
            const err = await error;

            const processError = err.error.reduce(
                (previous, current) => ({
                    ...previous,
                    ...Object.entries(current.detail).reduce((acc, [key, value]) => ({
                        ...acc,
                        [key]: value[0]
                    }), {})
                }),
                []
            );
            console.log(err);
            console.log(processError);
            addNewError(processError);
            success = false;
        });

        return success;
    }

    const setIsLoading = (isLoad) => {
        dispatch({
            type: types.userIsLoading,
            payload: isLoad
        });
    };

    const userActions = {
        userError: state.error,
        userIsLoading: state.isLoading,
        addNewError,
        savingUser,
        setIsLoading
    };

    return (
        <UserContext.Provider value={userActions}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error("useUser debe usase junto a UserContext");
    }
    return context;
}

export default useUser;