import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface SettingsState {
  settingsType: Settings[];
  settingsStatus: Settings[];
  settingsUnitMeasureProgress: Settings[];
}

const initialState: SettingsState = {
  settingsType: [],
  settingsStatus: [],
  settingsUnitMeasureProgress: []
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadSettings: (state, action: PayloadAction<SettingsState>) => {
      state.settingsType = action.payload.settingsType;
      state.settingsStatus = action.payload.settingsStatus;
      state.settingsUnitMeasureProgress = action.payload.settingsUnitMeasureProgress;
    }
  }
});

export const { loadSettings } = settingsSlice.actions;
export const settings = (state: RootState): SettingsState => state.settings;
export default settingsSlice.reducer;
