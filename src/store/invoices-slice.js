import { createSlice } from '@reduxjs/toolkit';
import data from '../assets/data.json';

const invoicesInitialState = {
  invoices: data,
  totalInvoices: data.length,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    getInvoices(state) {},
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
