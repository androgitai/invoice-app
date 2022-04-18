import { createSlice } from '@reduxjs/toolkit';
import { emptyFormTemplate } from '../lib/invoice-utility';

const invoicesInitialState = {
  invoices: [],
  totalInvoices: 0,
  currentInvoice: emptyFormTemplate,
  currentInvoiceIndex: null,
  emptyFormTemplate,
  filterBy: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    updateInvoices(state, action) {
      state.invoices = action.payload;
      state.totalInvoices = action.payload.length;
    },
    getInvoice(state, action) {
      const requestedID = action.payload;
      const currentInvoice = state.invoices.find(item => item.id === requestedID);
      const currentInvoiceIndex = state.invoices.findIndex(item => item.id === requestedID);
      state.currentInvoice = currentInvoice ? currentInvoice : null;
      state.currentInvoiceIndex = currentInvoiceIndex ? currentInvoiceIndex : null;
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
      const { newInvoiceItem, id, submitType } = action.payload;

      if (id === 'new' && submitType === 'draft') {
        state.invoices.push(newInvoiceItem);
        console.log('Saved as draft...');
      }
      if (id === 'new' && submitType === 'send') {
        state.invoices.push(newInvoiceItem);
        console.log('Invoice sent...');
      }
      if (id !== 'new' && submitType === 'draft') {
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Saved as draft...');
      }
      if (id !== 'new' && submitType === 'send') {
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Invoice sent...');
      }
    },
    toggleFilter(state, action) {
      const filterTerm = action.payload;
      if (filterTerm === '') return;
      if (state.filterBy.includes(filterTerm)) {
        state.filterBy = state.filterBy.filter(item => item !== filterTerm);
      } else {
        state.filterBy.push(filterTerm);
      }
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
