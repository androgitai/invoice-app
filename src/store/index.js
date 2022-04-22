import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    invoices: invoicesSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
