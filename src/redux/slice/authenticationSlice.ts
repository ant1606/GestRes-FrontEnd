import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

interface UserState {
  id: number;
  name: string;
  email: string;
  rememberToken: string | null;
  isVerified: boolean;
  isLogged: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  rememberToken: null,
  isVerified: false,
  isLogged: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userIsLoggin: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.rememberToken = action.payload.rememberToken;
      state.isVerified = action.payload.isVerified;
      state.isLogged = true;
    },
    userIsLogout: (state) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.rememberToken = null;
      state.isVerified = false;
      state.isLogged = false;
    }
  }
});

export const { userIsLoggin, userIsLogout } = userSlice.actions;
// export const selectUser = (state: RootState) => state.user.id;
export default userSlice.reducer;
