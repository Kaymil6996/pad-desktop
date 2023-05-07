import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isAuthenticated: false,
    token: '',

    isError: false,
    errorMessage: '',
  },
  reducers: {
    authenticate(state, { payload }) {
      state.isAuthenticated = true;
      state.email = payload.email;
      state.token = payload.token;

      state.isError = false;
      state.errorMessage = '';
    },

    signout(state) {
      state.isAuthenticated = false;
      state.email = '';

      state.token = '';

      localStorage.removeItem('usr');
    },

    error(state, { payload }) {
      state.isAuthenticated = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});
