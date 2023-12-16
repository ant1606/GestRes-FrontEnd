import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
// import type { RootState } from '../store';

interface AuthenticationState {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  isLogged?: boolean;
  isLoaded: boolean;
  isOAuthAccess: boolean;
  comeFromOAuthCallback: boolean;
}

const initialState: AuthenticationState = {
  id: 0,
  name: '',
  email: '',
  isVerified: false,
  isLogged: false,
  isLoaded: true,
  isOAuthAccess: false,
  comeFromOAuthCallback: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userIsLoggin: (state, action: PayloadAction<AuthenticationState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isVerified = action.payload.isVerified;
      state.isLogged = true;
      state.isLoaded = false;
    },
    userIsLogout: (state) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.isVerified = false;
      state.isLogged = false;
    },
    userAccessOAuthGoogle: (state, action: PayloadAction<boolean>) => {
      state.isOAuthAccess = action.payload;
      state.comeFromOAuthCallback = true;
    },
    resetOAuthGoogle: (state) => {
      state.isOAuthAccess = false;
      state.comeFromOAuthCallback = false;
    }
  }
});

// TODO EXtraer los métodos relacionados al OAuth en otro slice
export const { userIsLoggin, userIsLogout, userAccessOAuthGoogle, resetOAuthGoogle } =
  authenticationSlice.actions;
export const authenticatedUser = (state: RootState): AuthenticationState => state.authentication;
export default authenticationSlice.reducer;
