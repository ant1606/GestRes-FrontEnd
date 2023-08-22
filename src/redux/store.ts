import { type PreloadedState, configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slice/uiSlice';
import authenticationReducer from './slice/authenticationSlice';
import settingsReducer from './slice/settingsSlice';
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    authentication: authenticationReducer,
    settings: settingsReducer
  }
});

// Segun la documentacion
const rootReducer = combineReducers({
  ui: uiReducer,
  authentication: authenticationReducer,
  settings: settingsReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = AppStore['dispatch'];
