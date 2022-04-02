import { createSlice } from '@reduxjs/toolkit';
import data from '../assets/data.json';

const emptyFormTemplate = {
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 0,
  clientName: '',
  clientEmail: '',
  status: '',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
};

const invoicesInitialState = {
  invoices: data,
  totalInvoices: data.length,
  currentInvoice: emptyFormTemplate,
  emptyFormTemplate,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    getInvoice(state, action) {
      const requestedID = action.payload;
      const currentInvoice = state.invoices.find(
        item => item.id === requestedID
      );
      state.currentInvoice = currentInvoice ? currentInvoice : null;
      state.totalInvoices = state.invoices.length;
    },
    markAsPaid(state, action) {
      const id = action.payload;
      const currentInvoiceIndex = state.invoices.findIndex(
        item => item.id === id
      );
      if (currentInvoiceIndex !== -1) {
        state.invoices[currentInvoiceIndex].status = 'paid';
        state.currentInvoice.status = 'paid';
        state.totalInvoices = state.invoices.length;
      }
    },
    deleteInvoice(state, action) {
      const id = action.payload;
      state.invoices = state.invoices.filter(item => item.id !== id);
      state.currentInvoice = null;
      state.totalInvoices = state.invoices.length;
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
