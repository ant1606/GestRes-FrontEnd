import {createContext, useContext, useReducer, useState} from "react";
import recourseReducer, {initialState} from "../reducers/recourseReducer.js";

const RecourseContext = createContext(initialState);

export const RecourseProvider = ({children}) => {
    const [state, dispatch] = useReducer(recourseReducer, initialState);

    const recourseActions = {};

    return (
        <RecourseContext.Provider value={recourseActions}>
            {children}
        </RecourseContext.Provider>
    )
}

const useRecourse = () => {
    const context = useContext(RecourseContext);
    if(context=== undefined){
        throw new Error("useRecourse debe usarse junto a RecourseContext")
    }
    return context;
}

export default useRecourse;
