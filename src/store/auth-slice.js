import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLoading: false,
    isLogin: true,
    isLoggedIn: false,
    idToken: '',
    userId: '',
    tokenExpiresIn: 0,
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
      const { idToken, localId, expiresIn } = action.payload;
      state.idToken = idToken;
      state.userId = localId;
      state.tokenExpiresIn = expiresIn;
      state.isLoggedIn = !!idToken;
    },
    logoutUser(state) {
      state.idToken = '';
      state.isLoggedIn = false;
      state.isLogin = true;
      state.userId = '';
      state.tokenExpiresIn = 0;
    },
    userPasswordChange(state, action) {
      const { idToken, expiresIn } = action.payload;
      state.idToken = idToken;
      state.expiresIn = expiresIn;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
