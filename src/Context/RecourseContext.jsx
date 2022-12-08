import {createContext, useContext, useReducer} from "react";
import recourseReducer, {initialState} from "../reducers/recourseReducer.js";
import GLOBAL_CONSTANTES from "../const/globalConstantes.js";
import useSettings from "./SettingsContext.jsx";
import types from "../types/types.js";
import {toastNotifications} from "../helpers/notificationsSwal.js";

const RecourseContext = createContext(initialState);

export const RecourseProvider = ({children}) => {
    const {settingsType} =useSettings();
    const [state, dispatch] = useReducer(recourseReducer, initialState);

    const loadRecourses = (queryParams = "") => {
        fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/recourses?${queryParams}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                dispatch(setRecourses(data));
                // console.log({meta: data.meta, links: data.links})
            });
        // .then(data=> console.log(data));
    }
    const savingRecourse = async (recourse) => {
        let success = false;

        if(parseInt(recourse.tipoId) === settingsType.find(val => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id){
            recourse.totalVideos = null;
            recourse.totalHoras = null;
        }else {
            recourse.totalPaginas = null;
            recourse.totalCapitulos = null;
        }

        await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/recourses`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(recourse)
        })
            .then( resp => {
                if (!resp.ok)
                    return Promise.reject(resp.json());
                return resp.json();
            })
            .then( data => {
                success = true;
                toastNotifications().toastSucces();
                console.log(data.data);
            })
            .catch(async error => {
                const err = await error;
                const processError = err.error.reduce(
                    (previous, currrent) => ({
                        ...previous,
                        [currrent.inputName]: currrent.detail
                    }),
                    {}
                );
                //TODO Verificar que se esta generando entradas
                // new entry: "undefined"
                // Tratar de replicar el error al generar los registros en el formulario
                console.log(processError);

                addNewError(processError);
                toastNotifications().toastError();
                success = false;
            });

        return success;
    }

    const addNewError = async (error)=>{
        await dispatch({
            type: types.recourseAddError,
            payload: error,
        });
    }

    const setRecourses = (recourses) => ({
        type: types.recourseLoaded,
        payload: recourses,
    })

    const recourseActions = {
        recourses: state.recourses,
        recourseActive : state.recourseActive ,
        recourseDelete : state.recourseDelete ,
        recourseMeta: state.recourseMeta,
        recourseLinks: state.recourseLinks,
        recourseError: state.error,
        savingRecourse,
        addNewError,
        loadRecourses
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
