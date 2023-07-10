import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  loadingState: boolean;
  collapseSidebar: boolean;
}

const initialState: LoadingState = {
  loadingState: false,
  collapseSidebar: false
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
    }
  }
});

export const { isLoading, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
