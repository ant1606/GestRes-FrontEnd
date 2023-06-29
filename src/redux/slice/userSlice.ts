import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

interface UserState {
  id: number;
  name: string;
  email: string;
  rememberToken: string | null;
  isVerified: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  rememberToken: null,
  isVerified: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userIsLogged: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.rememberToken = action.payload.rememberToken;
      state.isVerified = action.payload.isVerified;
    }
  }
});

export const { userIsLogged } = userSlice.actions;
// export const selectUser = (state: RootState) => state.user.id;
export default userSlice.reducer;
