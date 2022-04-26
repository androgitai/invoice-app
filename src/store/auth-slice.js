import { createSlice } from '@reduxjs/toolkit';
import { calculateExpiryTime, calculateRemainingTime } from '../lib/helper';

let initialIdToken = '';
let initialUserId = '';
let initialRefreshToken = '';
let initialRemainingTime = 0;

let localStorageTokenTime = +localStorage.getItem('idTokenExpiryTime');

if (localStorageTokenTime > 0 && +calculateRemainingTime(localStorageTokenTime) > 300000) {
  initialRemainingTime = +calculateRemainingTime(localStorageTokenTime);
  initialIdToken = localStorage.getItem('idToken');
  initialUserId = localStorage.getItem('userId');
  initialRefreshToken = localStorage.getItem('refreshToken');
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLoading: false,
    isLogin: true,
    isLoggedIn: initialIdToken && initialRemainingTime !== 0 ? true : false,
    idToken: initialIdToken,
    userId: initialUserId,
    tokenRemainingTime: initialRemainingTime,
    refreshToken: initialRefreshToken ? initialRefreshToken : '',
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
    logoutUser(state) {
      state.idToken = '';
      state.isLoggedIn = false;
      state.isLogin = true;
      state.userId = '';
      state.tokenExpiryTime = 0;
      state.tokenRemainingTime = 0;
      localStorage.removeItem('idToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('idTokenExpiryTime');
      localStorage.removeItem('refreshToken');
    },
    loginUser(state, action) {
      const { idToken, localId, expiresIn, refreshToken } = action.payload;
      state.idToken = idToken;
      state.userId = localId;
      state.isLoggedIn = !!idToken;
      state.refreshToken = refreshToken;
      const tokenExpiryTime = calculateExpiryTime(expiresIn);
      state.tokenExpiryTime = tokenExpiryTime;
      const tokenRemainingTime = calculateRemainingTime(tokenExpiryTime);
      state.tokenRemainingTime = tokenRemainingTime;

      localStorage.setItem('idToken', idToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('idTokenExpiryTime', tokenExpiryTime);
    },
    userPasswordChange(state, action) {
      const { idToken, expiresIn } = action.payload;
      state.idToken = idToken;
      state.expiresIn = expiresIn;
    },
    refreshToken(state, action) {
      const { id_token, refresh_token, expires_in } = action.payload;
      if (state.idToken !== id_token) {
        state.idToken = id_token;
        localStorage.setItem('idToken', id_token);
      }
      if (state.refreshToken !== refresh_token) {
        state.refreshToken = refresh_token;
        localStorage.setItem('refreshToken', id_token);
      }
      const tokenExpiryTime = calculateExpiryTime(expires_in);
      state.tokenExpiryTime = tokenExpiryTime;
      const tokenRemainingTime = calculateRemainingTime(tokenExpiryTime);
      state.tokenRemainingTime = tokenRemainingTime;

      localStorage.setItem('idTokenExpiryTime', tokenExpiryTime);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
