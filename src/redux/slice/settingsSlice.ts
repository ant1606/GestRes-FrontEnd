import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface SettingsState {
  settingsType: [];
  settingsStatus: [];
}

const initialState: SettingsState = {
  settingsType: [],
  settingsStatus: []
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadSettings: (state, action: PayloadAction<SettingsState>) => {
      state.settingsType = action.payload.settingsType;
      state.settingsStatus = action.payload.settingsStatus;
    }
  }
});

export const { loadSettings } = settingsSlice.actions;
export const settings = (state: RootState): SettingsState => state.settings;
export default settingsSlice.reducer;
