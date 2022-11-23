import React, { createContext, useContext, useReducer } from 'react'
import tagReducer, { initialState } from '../reducers/tagReducer';
import types from '../types/types';
import Swal from 'sweetalert2';
import {toastNotifications} from "../helpers/notificationsSwal.js";

const TagContext = createContext(initialState);

export const TagProvider = ({ children }) => {

  //Mejorar los nombres de las acciones y de los tipos, dar un estandar
  const [state, dispatch] = useReducer(tagReducer, initialState);

  const loadTags = (queryParams = "") => {
    fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag?${queryParams}`)
        .then(resp => resp.json())
        .then(data => {
          dispatch(setTags(data));
          // console.log({meta: data.meta, links: data.links})
        });
    // .then(data=> console.log(data));
  }

  const savingTag = async (tag, searchParams)=>{
    let success = true;

    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag`, {
      method: "POST",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
        .then(resp => {
          if (!resp.ok)
            return Promise.reject(resp.json());
          return resp.json();
        })
        .then(data => {
          success = true;
          loadTags(searchParams);
          toastNotifications().toastSucces();
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

          addNewError(processError);
          toastNotifications().toastError();
          success = false;
        });

    return success;
  };

  const updatingTag = async (tag)=>{
    let success = true;

    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag/${state.tagActive.identificador}`, {
      method: "PUT",
      body: JSON.stringify({
        ...tag,
        identificador: state.tagActive.identificador
      }),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
        .then(resp => {
          if (!resp.ok)
            return Promise.reject(resp.json());
          return resp.json();
        })
        .then(data => {
          success = true;
          toastNotifications().toastSucces();
          dispatch(updatedTag(data.data));
        })
        .catch(async error => {
          success = false;
          const err = await error;
          const processError = err.error.reduce(
              (previous, currrent) => ({
                ...previous,
                [currrent.inputName]: currrent.detail
              }),
              {}
          );

          addNewError(processError);

          if(Object.hasOwn(processError,'undefined')){
            toastNotifications().notificationError(processError[undefined]);
          }else {
            toastNotifications().toastError();
          }
        });

    return success;
  };

  const updatedTag = (tag) => ({
    type: types.tagUpdate,
    payload: tag,
  });

  const destroyTag = async (tag) => {
    let success = false;

    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag/${tag.identificador}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok)
          return Promise.reject(resp.json());

        return resp.json();
      })
      .then(data => {
        Swal.fire(
            'Registro Eliminado',
            'El registro fue eliminado satisfactoriamente.',
            'success'
        );
        success = true;
      }).catch(async error => {
          const err = await error;
          const processError = err.error.reduce(
              (previous, currrent) => ({
                ...previous,
                [currrent.inputName]: currrent.detail
              }),
              {}
          );
          success = false;

          addNewError(processError);

          //TODO Ver si podemos extraer las notificaciones fuera de la funcion de eliminar, actualizar y guardar
          if(Object.hasOwn(processError,'undefined')){
            toastNotifications().notificationError(processError[undefined]);
          }else {
            toastNotifications().toastError();
          }
      });

    return success;
  }

  const selectedTag = (tag) => {
    dispatch({
      type: types.tagSelect,
      payload: tag,
    })
  };

  const setTags = (tags) => ({
    type: types.tagLoaded,
    payload: tags
  });

  const addNewError = (error) => {
    dispatch({
      type: types.tagAddError,
      payload: error,
    })
  }

  const setTagPerPage = (perPage) => {
    dispatch({
      type: types.tagSetPerPage,
      payload: perPage
    });
  }

  const setIsLoading = (isLoad) => {
    dispatch({
    type: types.tagIsLoading,
     payload: isLoad
    });
  };

  const tagActions = {
    tags: state.tags,
    tagActive: state.tagActive,
    tagDelete: state.tagDelete,
    tagLinks: state.tagLinks,
    tagMeta: state.tagMeta,
    tagError: state.error,
    tagPerPage: state.perPage,
    tagIsLoading: state.isLoading,
    savingTag,
    updatingTag,
    selectedTag,
    loadTags,
    destroyTag,
    addNewError,
    setTagPerPage,
    setIsLoading
  };

  return (
    <TagContext.Provider value={tagActions}>
      {children}
    </TagContext.Provider>
  );
}

const useTag = () => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error("useTag debe usarse junto a TagContext");
  }

  return context;
}

export default useTag;