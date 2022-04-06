import { createSlice } from '@reduxjs/toolkit';
import data from '../assets/data.json';
import { emptyFormTemplate, generateInvoice } from '../lib/invoice-utility';

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
      const currentInvoice = state.invoices.find(item => item.id === requestedID);
      state.currentInvoice = currentInvoice ? currentInvoice : null;
      state.totalInvoices = state.invoices.length;
    },
    markAsPaid(state, action) {
      const id = action.payload;
      const currentInvoiceIndex = state.invoices.findIndex(item => item.id === id);
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
    submittedInvoiceHandler(state, action) {
      const { id, submittedData, listItemsState, submitType, currentInvoiceStatus } =
        action.payload;

      const newInvoiceItem = generateInvoice(
        id,
        submittedData,
        listItemsState,
        submitType,
        currentInvoiceStatus
      );

      if (id === 'new' && submitType === 'draft') {
        state.invoices.push(newInvoiceItem);
        console.log('Saved as draft...');
      }
      if (id !== 'new' && submitType === 'draft') {
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Saved as draft...');
      }
      if (id === 'new' && submitType === 'send') {
        console.log('Validating...');
        state.invoices.push(newInvoiceItem);
        console.log('Invoice sent...');
      }
      if (id !== 'new' && submitType === 'send') {
        console.log('Validating...');
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Invoice sent...');
      }
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
