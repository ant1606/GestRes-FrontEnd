import React, { createContext } from 'react'
import { initialState } from '../reducers/tagReducer';

const TagContext = createContext(initialState);
