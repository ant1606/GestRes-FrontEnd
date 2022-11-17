import {createContext, useContext, useReducer, useState} from "react";
import recourseReducer, {initialState} from "../reducers/recourseReducer.js";

const RecourseContext = createContext(initialState);

export const RecourseProvider = ({children}) => {
    const [state, dispatch] = useReducer(recourseReducer, initialState);

    // Acciones INICIO
    const recourseSaveDB = (recourse) => {

        let tmpTotalPaginas =  parseInt(recourse.totalPaginas === '' ? 0 : recourse.totalPaginas);
        let tmpTotalCapitulos =  parseInt(recourse.totalCapitulos === '' ? 0 : recourse.totalCapitulos);
        let tmpTotalVideos =  parseInt(recourse.totalVideos === '' ? 0 : recourse.totalVideos);
        let tmpTotalHoras =  recourse.totalHoras.trim() === '' ? "00:00:00" : recourse.totalHoras.trim();

        recourse.totalPaginas = tmpTotalPaginas === 0 ? null : tmpTotalPaginas;
        recourse.totalCapitulos = tmpTotalCapitulos === 0 ? null : tmpTotalCapitulos
        recourse.totalVideos = tmpTotalVideos === 0 ? null : tmpTotalVideos;
        recourse.totalHoras= tmpTotalHoras === "00:00:00" ? null : tmpTotalHoras;

        console.log(recourse);
        // fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/recourse/${state.tagActive.identificador}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify(recourse)
        // })
        //     .then( resp => resp.json)
        //     .then( data => console.log(data.data));
    }
    // Acciones FIN

    const recourseActions = {
        recourses: state.recourses,
        recourseActive : state.recourseActive ,
        recourseDelete : state.recourseDelete ,
        recourseMeta: state.recourseMeta,
        recourseLinks: state.recourseLinks,
        error: state.error,
        recourseSaveDB
    };

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
