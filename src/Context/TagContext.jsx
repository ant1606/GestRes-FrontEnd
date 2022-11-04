import React, { createContext, useContext, useReducer } from 'react'
import tagReducer, { initialState } from '../reducers/tagReducer';
import types from '../types/types';

const TagContext = createContext(initialState);

export const TagProvider = ({children}) => {
  const [state, dispatch] = useReducer(tagReducer, initialState);

  //Generando acciones para manejar reducer
  const saveTag = (tag) => {
    dispatch({
      type: types.tagSave,
      payload: tag
    });
  }

  const selectedTag = (tag) => {
    dispatch({
      type: types.tagSelect,
      payload: tag
    });
  }

  const updatedTag = (tag) => {
    dispatch({
      type: types.tagUpdate,
      payload: tag
    });
  }

  const deletedTag = (idTag) => {
    dispatch({
      type: types.deletedTag,
      payload: idTag
    });
  }

  const value = {
    ...state, 
    saveTag, 
    selectedTag, 
    updatedTag, 
    deletedTag
  }
  

  return <TagContext.Provider value={ value}> {children} </TagContext.Provider>
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