import React, { createContext, useContext, useReducer } from 'react'
import tagReducer, { initialState } from '../reducers/tagReducer';
import types from '../types/types';

const TagContext = createContext(initialState);

export const TagProvider = ({children}) => {

  const [state, dispatch] = useReducer(tagReducer, initialState);

  const savingTagInDb = (sendData) => {
    if(state.tagActive){
    fetch(`http://localhost/api/tag/${state.tagActive.identificador}`,{
        method: 'PUT',       
        body: JSON.stringify({
          ...sendData, 
          identificador:state.tagActive.identificador
        }),
        headers: {
          "Content-Type": "application/json",
          "accept" : "application/json"
        }
      })
      .then(resp => resp.json())
      .then(data => dispatch(updatedTag(data.data)))
      .catch(err => console.log(err) );
      //TODO Ver como capturar el error para los mensajes de validacion
    } else {
      fetch('http://localhost/api/tag',{
          method: 'POST',       
          body: JSON.stringify(sendData),
          headers: {
            "Content-Type": "application/json",
            "accept" : "application/json"
          }
        })
        .then(resp => resp.json())
        .then(data=> dispatch(saveTag(data.data)))
        .catch(err => console.log(err));
    }
  }

  const loadTags = (filter = "") => {
    fetch(`http://localhost/api/tag?searchNombre=${filter}`)
    .then(resp => resp.json())
    .then(data=> dispatch(setTags(data.data)));
    // .then(data=> console.log(data));
  }

  const saveTag = (tag) => ({ 
      type: types.tagSave,
      payload: tag,
  });

  const setTags = (tags) => ({
      type: types.tagLoaded,
      payload: tags
  });

  const selectedTag = (tag) => {
    dispatch({
      type: types.tagSelect,
      payload: tag, 
    })
  };

  const updatedTag = (tag) => ({
      type: types.tagUpdate,
      payload: tag,
  });

  const deletedTag = (idTag) => {
    dispatch({
      type: types.deletedTag,
      payload: idTag,
    });
  };

  const tagActions  = {
    tags: state.tags,
    tagActive: state.tagActive,
    savingTagInDb,
    selectedTag,
    updatedTag,
    deletedTag,
    loadTags
  };

  return (
    <TagContext.Provider value={ tagActions }>
      {children} 
    </TagContext.Provider>
  );
}

const useTag = () => {
  const context = useContext(TagContext);
// console.log(context);
  if(context === undefined){
    throw new Error("useTag debe usarse junto a TagContext");
  }
  
  return context;
}

export default useTag;