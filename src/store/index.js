import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices-slice';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    invoices: invoicesSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
