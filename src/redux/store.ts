import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/testSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});
