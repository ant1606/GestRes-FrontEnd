import React, { createContext, useContext, useReducer } from 'react'
import tagReducer, { initialState } from '../reducers/tagReducer';
import types from '../types/types';
import Swal from 'sweetalert2';

const TagContext = createContext(initialState);

export const TagProvider = ({ children }) => {

  //Mejorar los nombres de las acciones y de los tipos, dar un estandar
  const [state, dispatch] = useReducer(tagReducer, initialState);

  const savingTagInDb = async (sendData, queryParams = "") => {
    let _endpoint = '';
    let _body = {};
    let _method = ''

    if (state.tagActive) {
      /* ACTUALIZANDO TAG */
      _endpoint = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tag/${state.tagActive.identificador}`;
      _body = JSON.stringify({
        ...sendData,
        identificador: state.tagActive.identificador
      });
      _method = "PUT"

    } else {
      /* REGISTRANDO NUEVA TAG*/
      _endpoint = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tag`;
      _body = JSON.stringify(sendData);
      _method = "POST"
    }

    let success = true;
    await fetch(_endpoint, {
      method: _method,
      body: _body,
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
        if (state.tagActive) {
          dispatch(updatedTag(data.data));
        } else {
          loadTags(queryParams);
        }

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });

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

        // console.log(stateError);
        addNewError(processError);
        // const msg = Object.values(err.error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Ocurrio un error en el formulario.`,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });

        success = false;
      });

    return success;
  }

  const loadTags = (queryParams = "") => {
    fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag?${queryParams}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch(setTags(data));
        // console.log({meta: data.meta, links: data.links})
      });
    // .then(data=> console.log(data));
  }

  const destroyTag = (queryParams) => {

    fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/tag/${state.tagDelete.identificador}`, {
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
        dispatch({
          type: types.tagDestroy,
          payload: data.data.identificador
        });

        loadTags(queryParams);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó el registro satisfactoriamente',
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }).catch(async error => {
        const err = await error;

        const msg = Object.values(err.error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Ocurrio un error durante el proceso.\n ${msg}`,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      });
  }

  const selectedTag = (tag) => {
    dispatch({
      type: types.tagSelect,
      payload: tag,
    })
  };

  const deletedTag = (tag) => {
    dispatch({
      type: types.tagDelete,
      payload: tag,
    });
  };

  const saveTag = (tag) => ({
    type: types.tagSave,
    payload: tag,
  });

  const setTags = (tags) => ({
    type: types.tagLoaded,
    payload: tags
  });

  const updatedTag = (tag) => ({
    type: types.tagUpdate,
    payload: tag,
  });

  const addNewError = (error) => {
    dispatch({
      type: types.tagAddError,
      payload: error,
    })
  }

  const tagActions = {
    tags: state.tags,
    tagActive: state.tagActive,
    tagDelete: state.tagDelete,
    tagLinks: state.tagLinks,
    tagMeta: state.tagMeta,
    tagError: state.error,
    savingTagInDb,
    selectedTag,
    updatedTag,
    deletedTag,
    loadTags,
    destroyTag,
    addNewError
  };

  return (
    <TagContext.Provider value={tagActions}>
      {children}
    </TagContext.Provider>
  );
}

const useTag = () => {
  const context = useContext(TagContext);
  // console.log(context);
  if (context === undefined) {
    throw new Error("useTag debe usarse junto a TagContext");
  }

  return context;
}

export default useTag;