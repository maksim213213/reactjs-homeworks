import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
