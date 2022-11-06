import React, { createContext, useContext, useReducer } from 'react'
import tagReducer, { initialState } from '../reducers/tagReducer';
import types from '../types/types';
import Swal from 'sweetalert2';

const TagContext = createContext(initialState);

export const TagProvider = ({ children }) => {

  const [state, dispatch] = useReducer(tagReducer, initialState);

  const savingTagInDb = (sendData, queryParams = "") => {
    let _endpoint = '';
    let _body = {};
    let _method = ''

    if (state.tagActive) {
      /* ACTUALIZANDO TAG */
      _endpoint = `http://localhost/api/tag/${state.tagActive.identificador}`;
      _body = JSON.stringify({
        ...sendData,
        identificador: state.tagActive.identificador
      });
      _method = "PUT"

    } else {
      /* REGISTRANDO NUEVA TAG*/
      _endpoint = 'http://localhost/api/tag';
      _body = JSON.stringify(sendData);
      _method = "POST"
    }

    fetch(_endpoint, {
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
          timer: 2000,
          toast: true
        });

      })
      .catch(async error => {
        //TODO Ver como capturar el error para los mensajes de validacion 
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

  const loadTags = (queryParams = "") => {
    console.log("Entre");
    fetch(`http://localhost/api/tag?${queryParams}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch(setTags(data));
        // console.log({meta: data.meta, links: data.links})
      });
    // .then(data=> console.log(data));
  }

  const destroyTag = (queryParams) => {

    fetch(`http://localhost/api/tag/${state.tagDelete.identificador}`, {
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
        //TODO Ver como capturar el error para los mensajes de validacion 
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



  const tagActions = {
    tags: state.tags,
    tagActive: state.tagActive,
    tagDelete: state.tagDelete,
    tagLinks: state.tagLinks,
    tagMeta: state.tagMeta,
    savingTagInDb,
    selectedTag,
    updatedTag,
    deletedTag,
    loadTags,
    destroyTag,
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