import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices-slice';

const store = configureStore({
  reducer: {
    invoices: invoicesSlice.reducer,
  },
});

export default store;
