import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLoading: false,
    isLogin: true,
    isLoggedIn: false,
    authToken: '',
  },
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    unSetIsLoading(state) {
      state.isLoading = false;
    },
    toggleIsLogin(state) {
      state.isLogin = !state.isLogin;
    },
    loginUser(state, action) {
      return;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
