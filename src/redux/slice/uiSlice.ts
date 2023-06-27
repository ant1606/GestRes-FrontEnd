import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  value: boolean;
}

const initialState: LoadingState = {
  value: false
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    }
  }
});

export const { isLoading } = uiSlice.actions;
export default uiSlice.reducer;
