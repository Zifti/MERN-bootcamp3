import { createSlice } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const persistConfig = {
    key: 'auth',
    storage,
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.id;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    }
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer)
