import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices-slice';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import profileSlice from './profile-slice';

const store = configureStore({
  reducer: {
    invoices: invoicesSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
