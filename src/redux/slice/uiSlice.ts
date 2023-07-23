import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  loadingState: boolean;
  collapseSidebar: boolean;
  titleBarContent: string;
}

const initialState: LoadingState = {
  loadingState: false,
  collapseSidebar: false,
  titleBarContent: ''
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingState = action.payload;
    },
    toggleSidebar: (state) => {
      state.collapseSidebar = !state.collapseSidebar;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.titleBarContent = action.payload;
    }
  }
});

export const { isLoading, toggleSidebar, changeTitle } = uiSlice.actions;
export default uiSlice.reducer;
